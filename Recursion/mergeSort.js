function mergeSort(arr) {
    if(arr.length === 1) return arr;

    let firstHalf = arr.slice(0, Math.floor(arr.length / 2));
    let secondHalf = arr.slice(Math.floor(arr.length / 2));

    firstHalf = mergeSort(firstHalf);
    secondHalf = mergeSort(secondHalf);

    return merge(firstHalf, secondHalf);
}

function merge(firstHalf, secondHalf) {

    const sortedArray = [];

    let fIndex = 0;
    let sIndex = 0;

    while (fIndex < firstHalf.length && sIndex < secondHalf.length) {
        if (firstHalf[fIndex] < secondHalf[sIndex]) {
            sortedArray.push(firstHalf[fIndex]);
            fIndex++;
        } else {
            sortedArray.push(secondHalf[sIndex]);
            sIndex++;
        }
    }

    while (fIndex < firstHalf.length) {
		sortedArray.push(firstHalf[fIndex]);
		fIndex++;
	}

	while (sIndex < secondHalf.length) {
		sortedArray.push(secondHalf[sIndex]);
		sIndex++;
	}

    return sortedArray;
}

mergeSort([20,40,60,80,10,90,75,35]) // [10, 20, 35, 40, 60, 75, 80, 90]


