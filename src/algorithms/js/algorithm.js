// Simple implementation for execution demonstration (must match visualizer's logic for consistency)
export function calculate(seq1, seq2, gapPenalty, mismatchPenalty) {
    const m = seq1.length;
    const n = seq2.length;

    // Initialize matrix: Store value and source pointer ('diag', 'up', 'left')
    const dp = Array(m + 1).fill(null).map(() =>
        Array(n + 1).fill(null).map(() => ({ value: 0, source: null }))
    );

    // Initialize first row and column
    for (let i = 1; i <= m; i++) dp[i][0] = { value: i * gapPenalty, source: 'up' };
    for (let j = 1; j <= n; j++) dp[0][j] = { value: j * gapPenalty, source: 'left' };

    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const matchScore = seq1[i - 1] === seq2[j - 1] ? 0 : mismatchPenalty;
            const diag = dp[i - 1][j - 1].value + matchScore;
            const up = dp[i - 1][j].value + gapPenalty;
            const left = dp[i][j - 1].value + gapPenalty;

            let bestVal = diag;
            let bestSource = 'diag';

            // Tie-breaking priority: Diagonal > Up > Left (consistent with visualizer)
            if (up < bestVal) {
                 bestVal = up;
                 bestSource = 'up';
            } else if (up === bestVal) { // Only consider Up if it's equal AND better than default Diag
                 bestSource = 'up'; // Prefer Up over Left if diagonal is not the minimum
            }


            if (left < bestVal) {
                bestVal = left;
                bestSource = 'left';
            } else if (left === bestVal && bestSource !== 'up') { // Only prefer left if equal and up wasn't already chosen
                bestSource = 'left';
            }


            dp[i][j] = { value: bestVal, source: bestSource };
        }
    }

    // Traceback
    let aligned1 = '';
    let aligned2 = '';
    let i = m;
    let j = n;

    while (i > 0 || j > 0) {
         if (i === 0) { // Only option is left
             aligned1 = '-' + aligned1;
             aligned2 = seq2[j - 1] + aligned2;
             j--;
         } else if (j === 0) { // Only option is up
             aligned1 = seq1[i - 1] + aligned1;
             aligned2 = '-' + aligned2;
             i--;
         } else {
            const source = dp[i][j].source;
            if (source === 'diag') {
                aligned1 = seq1[i - 1] + aligned1;
                aligned2 = seq2[j - 1] + aligned2;
                i--;
                j--;
            } else if (source === 'up') {
                aligned1 = seq1[i - 1] + aligned1;
                aligned2 = '-' + aligned2;
                i--;
            } else { // source === 'left'
                aligned1 = '-' + aligned1;
                aligned2 = seq2[j - 1] + aligned2;
                j--;
            }
         }
    }

    return {
        score: dp[m][n].value,
        alignedSeq1: aligned1,
        alignedSeq2: aligned2,
    };
};