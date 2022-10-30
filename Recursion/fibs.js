function fibs(n = 0) {
    const fibSeq = [0, 1];

    if (n == 1) { 
        return [0];
    };

    if (n == 0) { 
        return [];
    };

    for (let i = fibSeq.length - 1; i <= n - 2; i++) {
        fibSeq.push(fibSeq[i] + fibSeq[i - 1]);
    };

    return fibSeq;
}

fibs(8); // [0, 1, 1, 2, 3, 5, 8, 13]