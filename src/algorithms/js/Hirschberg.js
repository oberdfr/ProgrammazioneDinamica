/**
 * Implementazione dell'algoritmo di Hirschberg
 * Utilizza O(min(m,n)) spazio invece di O(m*n) dividendo ricorsivamente il problema
 */
export function hirschbergAlignment(seq1, seq2, gapPenalty = 1, mismatchPenalty = 1) {
    // Funzione per calcolare l'ultima riga della matrice di programmazione dinamica
    function lastRow(seqA, seqB) {
        const m = seqA.length;
        const n = seqB.length;
        
        // Inizializza due array per memorizzare solo le ultime due righe
        let prevRow = Array(n + 1).fill(0);
        let currRow = Array(n + 1).fill(0);
        
        // Inizializza la prima riga
        for (let j = 1; j <= n; j++) {
            prevRow[j] = j * gapPenalty;
        }
        
        // Calcola la DP per ogni riga
        for (let i = 1; i <= m; i++) {
            currRow[0] = i * gapPenalty;
            
            for (let j = 1; j <= n; j++) {
                const match = seqA[i - 1] === seqB[j - 1] ? 0 : mismatchPenalty;
                
                currRow[j] = Math.min(
                    prevRow[j - 1] + match,     // diagonale
                    prevRow[j] + gapPenalty,    // su
                    currRow[j - 1] + gapPenalty // sinistra
                );
            }
            
            // Scambia le righe per la prossima iterazione
            [prevRow, currRow] = [currRow, prevRow];
        }
        
        return prevRow; // L'ultima riga calcolata
    }
    
    // Algoritmo di Hirschberg ricorsivo
    function hirschbergRecursive(A, B) {
        const m = A.length;
        const n = B.length;
        
        // Casi base
        if (m === 0) {
            return { alignedA: '-'.repeat(n), alignedB: B };
        }
        if (n === 0) {
            return { alignedA: A, alignedB: '-'.repeat(m) };
        }
        if (m === 1 || n === 1) {
            // Per sequenze molto corte, usa l'algoritmo bottom-up standard
            const result = simpleAlignment(A, B);
            return { alignedA: result.alignedSeq1, alignedB: result.alignedSeq2 };
        }
        
        // Dividi la prima sequenza
        const mid = Math.floor(m / 2);
        const A1 = A.substring(0, mid);
        const A2 = A.substring(mid);
        
        // Calcola le score per A1 e B
        const scoreL = lastRow(A1, B);
        
        // Calcola le score per A2 (rovesciato) e B (rovesciato)
        const scoreR = lastRow(A2.split('').reverse().join(''), 
                              B.split('').reverse().join(''));
        
        // Trova il punto di divisione ottimale di B
        let bestScore = Infinity;
        let cut = 0;
        
        for (let j = 0; j <= n; j++) {
            const score = scoreL[j] + scoreR[n - j];
            if (score < bestScore) {
                bestScore = score;
                cut = j;
            }
        }
        
        // Dividi ricorsivamente
        const B1 = B.substring(0, cut);
        const B2 = B.substring(cut);
        
        // Risolvi i sottoproblemi
        const resultLeft = hirschbergRecursive(A1, B1);
        const resultRight = hirschbergRecursive(A2, B2);
        
        // Combina i risultati
        return {
            alignedA: resultLeft.alignedA + resultRight.alignedA,
            alignedB: resultLeft.alignedB + resultRight.alignedB
        };
    }
    
    // Algoritmo NW semplice per casi base
    function simpleAlignment(seqA, seqB) {
        const m = seqA.length;
        const n = seqB.length;
        
        // Inizializza la matrice DP
        const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
        const backtrack = Array(m + 1).fill().map(() => Array(n + 1).fill(''));
        
        // Inizializza prima riga e colonna
        for (let i = 0; i <= m; i++) {
            dp[i][0] = i * gapPenalty;
            backtrack[i][0] = 'up';
        }
        
        for (let j = 0; j <= n; j++) {
            dp[0][j] = j * gapPenalty;
            backtrack[0][j] = 'left';
        }
        
        // Riempi la matrice
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                const match = seqA[i - 1] === seqB[j - 1] ? 0 : mismatchPenalty;
                
                const costDiag = dp[i - 1][j - 1] + match;
                const costUp = dp[i - 1][j] + gapPenalty;
                const costLeft = dp[i][j - 1] + gapPenalty;
                
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
                aligned2 = seqB[j - 1] + aligned2;
                j--;
            } else if (j === 0) {
                aligned1 = seqA[i - 1] + aligned1;
                aligned2 = '-' + aligned2;
                i--;
            } else {
                const dir = backtrack[i][j];
                
                if (dir === 'diag') {
                    aligned1 = seqA[i - 1] + aligned1;
                    aligned2 = seqB[j - 1] + aligned2;
                    i--; j--;
                } else if (dir === 'up') {
                    aligned1 = seqA[i - 1] + aligned1;
                    aligned2 = '-' + aligned2;
                    i--;
                } else {
                    aligned1 = '-' + aligned1;
                    aligned2 = seqB[j - 1] + aligned2;
                    j--;
                }
            }
        }
        
        return {
            alignedSeq1: aligned1,
            alignedSeq2: aligned2,
            score: dp[m][n]
        };
    }
    
    // Avvia l'algoritmo Hirschberg
    const result = hirschbergRecursive(seq1, seq2);
    
    // Calcola lo score finale
    let score = 0;
    for (let i = 0; i < result.alignedA.length; i++) {
        if (result.alignedA[i] === '-' || result.alignedB[i] === '-') {
            score += gapPenalty;
        } else if (result.alignedA[i] !== result.alignedB[i]) {
            score += mismatchPenalty;
        }
    }
    
    return {
        score: score,
        alignedSeq1: result.alignedA,
        alignedSeq2: result.alignedB
    };
}

// Esempio d'uso:
// const result = hirschbergAlignment("AGTACGCA", "TATGC");
// console.log(result.alignedSeq1);
// console.log(result.alignedSeq2);
// console.log("Score:", result.score);