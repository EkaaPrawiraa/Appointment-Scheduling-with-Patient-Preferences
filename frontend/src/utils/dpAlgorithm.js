const findBestCombination = (matrix) => {
	const n = matrix.length;
	const dp = Array.from({ length: n }, () => ({}));
	function calculateScore(array, index) {
		return array.length - index;
	}
	for (let i = 0; i < matrix[0][1].length; i++) {
		for (let j = 0; j < matrix[0][2].length; j++) {
			const score =
				calculateScore(matrix[0][1], i) + calculateScore(matrix[0][2], j);
			const combinationKey = `${matrix[0][1][i]}-${matrix[0][2][j]}`;
			dp[0][combinationKey] = {
				score,
				combination: [
					{
						name: matrix[0][0],
						doctor: matrix[0][1][i],
						timeSlot: matrix[0][2][j],
					},
				],
				usedValues: new Set([combinationKey]),
			};
		}
	}
	for (let k = 1; k < n; k++) {
		for (let i = 0; i < matrix[k][1].length; i++) {
			for (let j = 0; j < matrix[k][2].length; j++) {
				const doctor = matrix[k][1][i];
				const timeSlot = matrix[k][2][j];
				const newKey = `${doctor}-${timeSlot}`;
				const newScore =
					calculateScore(matrix[k][1], i) + calculateScore(matrix[k][2], j);
				for (const prevKey in dp[k - 1]) {
					if (!dp[k - 1][prevKey].usedValues.has(newKey)) {
						const totalScore = dp[k - 1][prevKey].score + newScore;
						const newCombination = [
							...dp[k - 1][prevKey].combination,
							{
								name: matrix[k][0],
								doctor,
								timeSlot,
							},
						];
						const newUsedValues = new Set(dp[k - 1][prevKey].usedValues);
						newUsedValues.add(newKey);
						if (!dp[k][newKey] || dp[k][newKey].score < totalScore) {
							dp[k][newKey] = {
								score: totalScore,
								combination: newCombination,
								usedValues: newUsedValues,
							};
						}
					}
				}
			}
		}
	}
	let bestResult = { score: -Infinity, combination: [] };
	for (const key in dp[n - 1]) {
		if (dp[n - 1][key].score > bestResult.score) {
			bestResult = dp[n - 1][key];
		}
	}

	return bestResult;
};

export default findBestCombination;
