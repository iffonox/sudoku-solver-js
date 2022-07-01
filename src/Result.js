const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function formatField(field) {
    return indices
        .map(row => {
            const ind = indices.map(i => i + row * 9)

            return field.filter((_, j) => ind.includes(j)).join(' ');
        })
        .join("\n")
}

export class Result {
    static DEAD_END = Symbol('DEAD_END')
    static SOLVED = Symbol('SOLVED')
    static UNSOLVABLE = Symbol('UNSOLVABLE')

    type;
    value = null

    constructor(type, value = null) {
        this.type = type
        this.value = value
    }

    format() {
        if (this.type !== Result.SOLVED) {
            return this.type
        } else {
            return formatField(this.value)
        }
    }

    static deadend() {
        return new Result(Result.DEAD_END)
    }

    static solved(solution) {
        return new Result(Result.SOLVED, solution)
    }

    static unsolvable() {
        return new Result(Result.UNSOLVABLE)
    }
}