import json

def needleman_wunsch(seq1, seq2, gap_penalty, mismatch_penalty):
    m = len(seq1)
    n = len(seq2)

    # Initialize DP table: Store tuples (value, source)
    # Sources: 0=diag, 1=up, 2=left
    dp = [[(0, 0) for _ in range(n + 1)] for _ in range(m + 1)]

    # Initialize first row and column
    for i in range(1, m + 1):
        dp[i][0] = (i * gap_penalty, 1) # Source 'up'
    for j in range(1, n + 1):
        dp[0][j] = (j * gap_penalty, 2) # Source 'left'

    # Fill DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            match_score = 0 if seq1[i - 1] == seq2[j - 1] else mismatch_penalty
            diag = dp[i - 1][j - 1][0] + match_score
            up = dp[i - 1][j][0] + gap_penalty
            left = dp[i][j - 1][0] + gap_penalty

            # Tie-breaking: Diag > Up > Left
            best_val = diag
            best_source = 0 # diag

            if up < best_val:
                 best_val = up
                 best_source = 1 # up
            elif up == best_val:
                 best_source = 1 # prefer up over left if diag equal

            if left < best_val:
                best_val = left
                best_source = 2 # left
            elif left == best_val and best_source != 1: # prefer left only if up wasn't chosen
                best_source = 2

            dp[i][j] = (best_val, best_source)

    # Traceback
    aligned1 = ""
    aligned2 = ""
    i, j = m, n

    while i > 0 or j > 0:
        if i == 0: # Only left possible
            source = 2
        elif j == 0: # Only up possible
            source = 1
        else:
           source = dp[i][j][1]

        if source == 0: # diag
            aligned1 = seq1[i - 1] + aligned1
            aligned2 = seq2[j - 1] + aligned2
            i -= 1
            j -= 1
        elif source == 1: # up
            aligned1 = seq1[i - 1] + aligned1
            aligned2 = "-" + aligned2
            i -= 1
        else: # source == 2 (left)
            aligned1 = "-" + aligned1
            aligned2 = seq2[j - 1] + aligned2
            j -= 1

    score = dp[m][n][0]

    # Return as a JSON string for react-py
    result = {
        "score": score,
        "alignedSeq1": aligned1,
        "alignedSeq2": aligned2
    }
    print(json.dumps(result)) # Output JSON

# Example of how react-py might call it (will be wrapped in Demo.jsx)
# seq1_arg = "PALETTE"
# seq2_arg = "PALATE"
# gap_arg = 2
# mismatch_arg = 1
# needleman_wunsch(seq1_arg, seq2_arg, gap_arg, mismatch_arg)