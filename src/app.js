const scores = {
    Anna: 10,
    Olga: 1,
    Ivan: 5,
    Oleg: 8
}

/**
 * Sum of scores
 * 
 * @param {Object.<string, number>} scores Scores of people from the list
 * @example getTotal({Anna: 10, Olga: 1, Ivan: 5,}) // 16
 * @returns {number} sum - Sum of scores of people from the list
 */

function getScore() {
    let sum = 0
    for (let key in scores) {
        sum += scores[key]
    }
    return sum
}

console.log(getScore(scores))