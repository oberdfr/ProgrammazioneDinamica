// Implementazione semplice per dimostrazione di esecuzione (deve corrispondere alla logica del visualizzatore per coerenza)
export function calcola(seq1, seq2, penalitaGap, penalitaMismatch) {
    const m = seq1.length;
    const n = seq2.length;

    // Inizializza matrice: Memorizza valore e puntatore di origine ('diag', 'su', 'sinistra')
    const dp = Array(m + 1).fill(null).map(() =>
        Array(n + 1).fill(null).map(() => ({ valore: 0, origine: null }))
    );

    // Inizializza prima riga e colonna
    for (let i = 1; i <= m; i++) dp[i][0] = { valore: i * penalitaGap, origine: 'su' };
    for (let j = 1; j <= n; j++) dp[0][j] = { valore: j * penalitaGap, origine: 'sinistra' };

    // Riempi la tabella DP
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const punteggioMatch = seq1[i - 1] === seq2[j - 1] ? 0 : penalitaMismatch;
            const diag = dp[i - 1][j - 1].valore + punteggioMatch;
            const su = dp[i - 1][j].valore + penalitaGap;
            const sinistra = dp[i][j - 1].valore + penalitaGap;

            let valMigliore = diag;
            let origineMigliore = 'diag';

            // Priorità in caso di parità: Diagonale > Su > Sinistra (coerente con il visualizzatore)
            if (su < valMigliore) {
                valMigliore = su;
                origineMigliore = 'su';
            } else if (su === valMigliore) { // Considera Su solo se è uguale E migliore della Diagonale predefinita
                origineMigliore = 'su'; // Preferisci Su rispetto a Sinistra se la diagonale non è il minimo
            }


            if (sinistra < valMigliore) {
                valMigliore = sinistra;
                origineMigliore = 'sinistra';
            } else if (sinistra === valMigliore && origineMigliore !== 'su') { // Preferisci sinistra solo se uguale e su non è già stato scelto
                origineMigliore = 'sinistra';
            }


            dp[i][j] = { valore: valMigliore, origine: origineMigliore };
        }
    }

    // Tracciamento all'indietro
    let allineato1 = '';
    let allineato2 = '';
    let i = m;
    let j = n;

    while (i > 0 || j > 0) {
        if (i === 0) { // L'unica opzione è sinistra
            allineato1 = '-' + allineato1;
            allineato2 = seq2[j - 1] + allineato2;
            j--;
        } else if (j === 0) { // L'unica opzione è su
            allineato1 = seq1[i - 1] + allineato1;
            allineato2 = '-' + allineato2;
            i--;
        } else {
            const origine = dp[i][j].origine;
            if (origine === 'diag') {
                allineato1 = seq1[i - 1] + allineato1;
                allineato2 = seq2[j - 1] + allineato2;
                i--;
                j--;
            } else if (origine === 'su') {
                allineato1 = seq1[i - 1] + allineato1;
                allineato2 = '-' + allineato2;
                i--;
            } else { // origine === 'sinistra'
                allineato1 = '-' + allineato1;
                allineato2 = seq2[j - 1] + allineato2;
                j--;
            }
        }
    }

    return {
        score: dp[m][n].valore,
        alignedSeq1: allineato1,
        alignedSeq2: allineato2,
    };
}; 