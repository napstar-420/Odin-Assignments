function fibsRec(n = 0, seq = [0, 1], i = seq.length - 1) {
    return n <= 1 ? n == 1 ? [0] : [] : seq.length === n ? seq : fibsRec(n,[...seq, seq[i] + seq[i - 1]]);
}

fibsRec(13) // [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ]