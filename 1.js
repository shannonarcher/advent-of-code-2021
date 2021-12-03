const fs = require('fs');

function main() {
    let depths = fs.readFileSync('1-input.txt', 'utf-8');
    depths = depths.split('\n').map(Number);

    let count = 0;
    for (let i = 1; i < depths.length; i++) {
        if (depths[i-1] < depths[i]) count++;
    }

    console.log("Single measurement count: " + count);

    count = 0;
    for (let i = 1; i < depths.length-2; i++) {
        let prevSum = depths[i-1] + depths[i] + depths[i+1];
        let currSum = depths[i] + depths[i+1] + depths[i+2];

        if (prevSum < currSum) count++;
    }

    console.log("Three measurement count: " + count);
}

main();