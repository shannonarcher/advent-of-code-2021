const fs = require('fs');

function main() {
    let pos = [0, 0];

    let instructions = fs.readFileSync('2-input.txt', 'utf-8');
    instructions = instructions.split('\n')
        .map((instruction) => instruction.split(' '))
        .map(([i, n]) => [i, Number(n)]);

    let iMap = {
        'forward': [0, 1],
        'up': [-1, 0],
        'down': [1, 0],
        'backward': [0, -1],
    }

    instructions.forEach(([i, n]) => {
        pos[0] += iMap[i][0] * n;
        pos[1] += iMap[i][1] * n;

        pos[0] = Math.max(0, pos[0]);
    });

    console.log(`Location: ${pos[0]}, ${pos[1]}. ${pos[0] * pos[1]}`);

    pos = [0, 0];
    aim = 0;

    instructions.forEach(([i, n]) => {
        aim += iMap[i][0] * n;

        pos[0] += iMap[i][1] * n * aim;
        pos[1] += iMap[i][1] * n;

        pos[0] = Math.max(0, pos[0]);
    });

    console.log(`Location: ${pos[0]}, ${pos[1]}. ${pos[0] * pos[1]}`);
}

main();