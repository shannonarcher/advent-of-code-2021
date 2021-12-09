const fs = require('fs');

function main(distanceStrat) {
    let crabs = fs.readFileSync('7-input.txt', 'utf-8');
    crabs = crabs.split(',').map(Number);

    // do thing
    const max = Math.max(...crabs);
    const min = Math.min(...crabs);

    const d = {};
    let minPos = 0;
    let minVal = null;
    for (let i = min; i < max; i++) {
        d[i] = crabs.reduce((acc, curr) => acc + distanceStrat(curr, i), 0);
        if (minVal == null || minVal > d[i]) {
            minPos = i;
            minVal = d[i];
        }
    }

    console.log(`Crabs should go to: ${minPos} (Fuel: ${minVal})`);
}

function linear(start, end) {
    return Math.abs(start - end);
}

function triangle(start, end) {
    const ld = linear(start, end);
    return (ld ** 2 + ld) / 2;
}

main(linear);
main(triangle);