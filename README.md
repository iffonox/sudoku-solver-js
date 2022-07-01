# sudoku-solver-js
A simple JavaScript Sudoku solver. This was just an exercise in constraint propagation and backtracking.

## Data structures
The field is represented as an array of 81 integers.
-1 represents an empty cell.

## Example
````javascript
import {solve} from "./src/Solver.js";

const field = [
    9, 4, 5, -1, -1, 8, -1, -1, 6,
    2, -1, 3, -1, 6, -1, -1, -1, 5,
    -1, -1, -1, 5, 4, 7, -1, 3, 2,

    7, -1, -1, -1, -1, 3, 2, 6, 9,
    3, -1, 4, -1, -1, 2, -1, -1, -1,
    -1, -1, 6, -1, 1, 9, 8, 4, -1,

    -1, -1, -1, 8, -1, -1, 5, 7, 1,
    6, 8, -1, -1, -1, -1, -1, -1, -1,
    -1, 5, -1, 3, 2, -1, -1, -1, 8,
]

const result = solve(field);

console.log(result)
````
