/**
 * Implementazione Bottom-Up per allineamento di sequenze
 * Usa una matrice 2D completa come nel tuo codice originale ma con logica semplificata
 */
export function calcola(seq1, seq2, gapPenalty = 1, mismatchPenalty = 1) {
    const m = seq1.length;
    const n = seq2.length;

    // Inizializza matrice DP
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    const backtrack = Array(m + 1).fill().map(() => Array(n + 1).fill(''));

    // Inizializza prima riga e colonna
    for (let i = 1; i <= m; i++) {
        dp[i][0] = i * gapPenalty;
        backtrack[i][0] = 'up';
    }

    for (let j = 1; j <= n; j++) {
        dp[0][j] = j * gapPenalty;
        backtrack[0][j] = 'left';
    }

    // Riempi la matrice
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const match = seq1[i - 1] === seq2[j - 1] ? 0 : mismatchPenalty;

            // Calcola i tre possibili costi
            const costDiag = dp[i - 1][j - 1] + match;
            const costUp = dp[i - 1][j] + gapPenalty;
            const costLeft = dp[i][j - 1] + gapPenalty;

            // Trova il costo minimo
            if (costDiag <= costUp && costDiag <= costLeft) {
                dp[i][j] = costDiag;
                backtrack[i][j] = 'diag';
            } else if (costUp <= costLeft) {
                dp[i][j] = costUp;
                backtrack[i][j] = 'up';
            } else {
                dp[i][j] = costLeft;
                backtrack[i][j] = 'left';
            }
        }
    }

    // Ricostruisci l'allineamento
    let aligned1 = '';
    let aligned2 = '';
    let i = m, j = n;

    while (i > 0 || j > 0) {
        if (i === 0) {
            aligned1 = '-' + aligned1;
            aligned2 = seq2[j - 1] + aligned2;
            j--;
        } else if (j === 0) {
            aligned1 = seq1[i - 1] + aligned1;
            aligned2 = '-' + aligned2;
            i--;
        } else {
            const direction = backtrack[i][j];

            if (direction === 'diag') {
                aligned1 = seq1[i - 1] + aligned1;
                aligned2 = seq2[j - 1] + aligned2;
                i--; j--;
            } else if (direction === 'up') {
                aligned1 = seq1[i - 1] + aligned1;
                aligned2 = '-' + aligned2;
                i--;
            } else { // left
                aligned1 = '-' + aligned1;
                aligned2 = seq2[j - 1] + aligned2;
                j--;
            }
        }
    }

    return {
        score: dp[m][n],
        alignedSeq1: aligned1,
        alignedSeq2: aligned2,
        matrix: dp // Ritorna anche la matrice per scopi didattici
    };
}

// Esempio d'uso:
// const result = bottomUpAlignment("AGCTA", "ACGTA");
// console.log(result.alignedSeq1);
// console.log(result.alignedSeq2);
// console.log("Score:", result.score);