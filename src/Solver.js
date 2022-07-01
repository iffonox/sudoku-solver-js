import {Result} from "./Result.js";

const quadrants = [
    [
        0, 1, 2,
        9, 10, 11,
        18, 19, 20
    ],
    [
        3, 4, 5,
        12, 13, 14,
        21, 22, 23
    ],
    [
        6, 7, 8,
        15, 16, 17,
        24, 25, 26
    ],

    [
        27, 28, 29,
        36, 37, 38,
        45, 46, 47
    ],
    [
        30, 31, 32,
        39, 40, 41,
        48, 49, 50
    ],
    [
        33, 34, 35,
        42, 43, 44,
        51, 52, 53
    ],

    [
        54, 55, 56,
        63, 64, 65,
        72, 73, 74
    ],
    [
        57, 58, 59,
        66, 67, 68,
        75, 76, 77
    ],
    [
        60, 61, 62,
        69, 70, 71,
        78, 79, 80
    ],
];
const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function rowForIndex(index) {
    return Math.floor(index / 9)
}

function columnForIndex(index) {
    return index % 9;
}

function quadrantForIndex(index) {
    return quadrants.find(quad => quad.includes(index))
}

function validatePart(field, indexFunction) {
    const numbers = new Set();

    for (const i of indices) {
        const index = indexFunction(i);
        const value = field[index];

        if (value === -1) {
            return false;
        }

        if (numbers.has(value)) {
            return false;
        }

        numbers.add(value)
    }

    return true
}

function validateField(field) {
    for (const i of indices) {
        if (!validatePart(field, j => j + i * 9)) {
            const ind = indices.map(j => j + i * 9)
            return false;
        }

        if (!validatePart(field, j => j * 9 + i)) {
            const ind = indices.map(j => j * 9 + i)
            return false;
        }

        if (!validatePart(field, j => quadrants[i][j])) {
            return false;
        }
    }

    return true;
}

function constraintsForColumn(col, field) {
    return constraintsForPart(field, i => i * 9 + col)
}

function constraintsForRow(row, field) {
    return constraintsForPart(field, i => i + row * 9)
}

function constraintsForQuadrant(quad, field) {
    return constraintsForPart(field, i => quad[i])
}

function constraintsForPart(field, indexFunction) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (const i of indices) {
        const index = indexFunction(i);
        const value = field[index];

        if (value !== -1) {
            numbers[value - 1] = null;
        }
    }

    return numbers.filter(n => n !== null)
}

function constraintsForPos(pos, field) {
    const rowConstraint = constraintsForRow(rowForIndex(pos), field)
    const colConstraint = constraintsForColumn(columnForIndex(pos), field)
    const quadConstraint = constraintsForQuadrant(quadrantForIndex(pos), field)

    return rowConstraint
        .filter(number => colConstraint.includes(number))
        .filter(number => quadConstraint.includes(number))
}

/**
 * @param {array} field
 * @param {array} result
 * @param {int} pos
 * @return {Result}
 */
function solveImpl(field, result, pos = 0) {
    if (pos < 0) return Result.unsolvable();
    if (pos > field.length) return Result.deadend();
    if (pos === field.length && validateField(result)) return Result.solved(result);

    let constraints;

    if (field[pos] !== -1) {
        constraints = [field[pos]]
    } else {
        constraints = constraintsForPos(pos, result);
    }

    if (constraints.length === 0) return Result.deadend();

    for (const constraint of constraints) {
        result[pos] = constraint;

        const res = solveImpl(field, [...result], pos + 1);

        if (res.type !== Result.DEAD_END) return res;
    }

    return Result.deadend();
}

/**
 *
 * @param {array} field
 * @return {Result}
 */
export function solve(field) {
    const res = solveImpl(field, [...field]);

    if (res.type === Result.DEAD_END) {
        return null;
    } else {
        return res.value;
    }
}
