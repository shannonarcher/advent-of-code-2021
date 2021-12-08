const fs = require('fs');

function main(days) {
    const totalFish = {
        0: 1 + simulate(0, days, 7),
        1: 1 + simulate(1, days, 7),
        2: 1 + simulate(2, days, 7),
        3: 1 + simulate(3, days, 7),
        4: 1 + simulate(4, days, 7),
        5: 1 + simulate(5, days, 7),
        6: 1 + simulate(6, days, 7),
    };


    let fish = fs.readFileSync('6-input.txt', 'utf-8');
    fish = fish.split(',')
        .map(Number);

    let total = fish.reduce((acc, curr) => acc + totalFish[curr], 0);

    console.log(`Total: ${total}`);
}

function simulate(initial, days, growthRate) {
    if (days <= initial) return 0;

    let totalChildren = 0;
    let children = Math.ceil((days - initial) / growthRate);

    totalChildren += children;
    for (let i = 0; i < children; i++) {
        totalChildren += simulate(8, days - (i * growthRate) - initial - 1, growthRate);
    }

    return Math.floor(totalChildren);
}

function fastMain(days) {
    let fish = fs.readFileSync('6-input.txt', 'utf-8');
    fish = fish.split(',')
        .map(Number);

    const generations = [];
    for (let i = 0; i < 9; i++) {
        generations.push(0);
    }

    for (let i = 0; i < fish.length; i++) {
        generations[fish[i]]++;
    }

    for (let i = 0; i < days; i++) {
        let parents = generations[0];
        for (let n = 1; n < generations.length; n++) {
            generations[n-1] = generations[n];
        }

        generations[6] += parents;
        generations[8] = parents;
    }

    console.log(`Total: ${generations.reduce((acc, curr) => acc + curr, 0)}`)
}

fastMain(80);
main(80);
fastMain(256);
main(256);