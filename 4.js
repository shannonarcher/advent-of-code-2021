const fs = require('fs');

function main() {
    let game = fs.readFileSync('4-input.txt', 'utf-8');
    game = game.split(/(\r?\n){2}/).filter(x => x.match(/\d+/));

    const numbers = game.shift().split(',');
    const boards = game.map((x) => new Board(x));

    let calledNumbers = [];
    let bingo = null;

    for (let i = 0; i < numbers.length && !bingo; i++) {
        calledNumbers.push(numbers[i]);

        for (let j = 0; j < boards.length; j++) {
            if (boards[j].hasBingo(calledNumbers)) {
                bingo = boards[j];
            }
        }
    }

    const sumOfUncalled = bingo.getUncalledSum(calledNumbers);

    console.log(sumOfUncalled * calledNumbers.pop());

    calledNumbers = [];
    let antiBingo = boards;

    for (let i = 0; i < numbers.length; i++ ) {
        calledNumbers.push(numbers[i]);
        if (antiBingo.length > 1) {
            antiBingo = antiBingo.filter(x => !x.hasBingo(calledNumbers));
        } else if (antiBingo[0].hasBingo(calledNumbers)) {
            break;
        }
    }

    const sumOfAntiBingo = antiBingo[0].getUncalledSum(calledNumbers);
    console.log(sumOfAntiBingo * calledNumbers.pop());
}

class Board {
    constructor(boardAsString) {
        this.board = boardAsString
            .split(/\r?\n/)
            .map(x => x.split(/\s+/).filter(x => x.match(/\d+/)).map(Number));

        this.horizontals = this.board;
        this.verticals = [];
        for (let i = 0; i < this.board[0].length; i++) {
            const vertical = [];
            for (let j = 0; j < this.board.length; j++) {
                vertical.push(this.board[j][i]);
            }
            this.verticals.push(vertical);
        }
        
        this.matches = [
            ...this.horizontals,
            ...this.verticals,
        ];
    }

    hasBingo(numbers) {
        const map = numbers.reduce((acc, n) => ({ ...acc, [n]: true }), {});
        return this.matches.some((line) => {
            const bingo = line.every((n) => map[n]);
            return bingo;
        });
    }

    getUncalledSum(numbers) {
        const map = numbers.reduce((acc, n) => ({ ...acc, [n]: true }), {});
        const allNumbers = this.board.flat();
        return allNumbers.reduce((acc, curr) => {
            if (!map[curr]) return acc + curr;
            return acc;
        }, 0);
    }
}

main();