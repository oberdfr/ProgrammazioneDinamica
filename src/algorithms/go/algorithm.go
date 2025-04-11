package main

import (
	"encoding/json"
	"syscall/js"
)

type DPInfo struct {
	Value  int
	Source int // 0: diag, 1: up, 2: left
}

type AlignmentResult struct {
	Score       int    `json:"score"`
	AlignedSeq1 string `json:"alignedSeq1"`
	AlignedSeq2 string `json:"alignedSeq2"`
}

func calculate(seq1, seq2 string, gapPenalty, mismatchPenalty int) AlignmentResult {
	m := len(seq1)
	n := len(seq2)

	// DP table
	dp := make([][]DPInfo, m+1)
	for i := range dp {
		dp[i] = make([]DPInfo, n+1)
	}

	// Initialize
	for i := 1; i <= m; i++ {
		dp[i][0] = DPInfo{Value: i * gapPenalty, Source: 1} // up
	}
	for j := 1; j <= n; j++ {
		dp[0][j] = DPInfo{Value: j * gapPenalty, Source: 2} // left
	}

	// Fill table
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			matchScore := mismatchPenalty
			if seq1[i-1] == seq2[j-1] {
				matchScore = 0
			}
			diag := dp[i-1][j-1].Value + matchScore
			up := dp[i-1][j].Value + gapPenalty
			left := dp[i][j-1].Value + gapPenalty

			bestVal := diag
			bestSource := 0 // diag

			// Tie-breaking: Diag > Up > Left
			if up < bestVal {
				bestVal = up
				bestSource = 1 // up
			} else if up == bestVal {
				bestSource = 1 // prefer up over left
			}

			if left < bestVal {
				bestVal = left
				bestSource = 2 // left
			} else if left == bestVal && bestSource != 1 {
				bestSource = 2 // prefer left only if up wasn't chosen
			}

			dp[i][j] = DPInfo{Value: bestVal, Source: bestSource}
		}
	}

	// Traceback
	aligned1 := ""
	aligned2 := ""
	i, j := m, n

	for i > 0 || j > 0 {
		source := 0
		if i == 0 {
			source = 2 // Must be left
		} else if j == 0 {
			source = 1 // Must be up
		} else {
			source = dp[i][j].Source
		}

		if source == 0 { // diag
			aligned1 = string(seq1[i-1]) + aligned1
			aligned2 = string(seq2[j-1]) + aligned2
			i--
			j--
		} else if source == 1 { // up
			aligned1 = string(seq1[i-1]) + aligned1
			aligned2 = "-" + aligned2
			i--
		} else { // source == 2 (left)
			aligned1 = "-" + aligned1
			aligned2 = string(seq2[j-1]) + aligned2
			j--
		}
	}

	return AlignmentResult{
		Score:       dp[m][n].Value,
		AlignedSeq1: aligned1,
		AlignedSeq2: aligned2,
	}
}

// WASM Export Wrapper
func runAlignment(this js.Value, args []js.Value) interface{} {
	if len(args) != 4 {
		return "Invalid number of arguments" // Or return an error object
	}
	seq1 := args[0].String()
	seq2 := args[1].String()
	gapPenalty := args[2].Int()
	mismatchPenalty := args[3].Int()

	result := calculate(seq1, seq2, gapPenalty, mismatchPenalty)
	resultJSON, err := json.Marshal(result)
	if err != nil {
		return "Error marshalling result: " + err.Error()
	}
	return string(resultJSON) // Return result as JSON string
}

func main() {
	c := make(chan struct{}, 0)
	println("Go WASM Initialized for Needleman-Wunsch")
	js.Global().Set("runGoCalculate", js.FuncOf(runAlignment))
	<-c // Keep the program running
}
