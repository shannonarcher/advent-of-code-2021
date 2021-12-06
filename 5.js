const fs = require('fs');

function main(inBetweenStrat) {
    let lines = fs.readFileSync('5-input.txt', 'utf-8');
    lines = lines.split(/\r?\n/)
                 .map(x => x.split(' -> '));

    // filter out ones that aren't vertical or horizontal
    lines = lines.map(x => x.map(y => y.split(',').map(Number)));

    // map out vents in 2d array
    const ventMap = [];
    const bounds = getBounds(lines);

    for (let y = 0; y < bounds[1] + 1; y++) {
        ventMap[y] = [];
        for (let x = 0; x < bounds[0] + 1; x++) {
            ventMap[y].push(0);

            for (let a = 0; a < lines.length; a++) {
                const [sx, sy] = lines[a][0];
                const [ex, ey] = lines[a][1];

                if (inBetweenStrat(x, y, sx, sy, ex, ey)) {
                    ventMap[y][x]++;
                }
            }
        }
    }

    const flatMap = ventMap.flat();
    const dangerZone = 2;
    const dangerZones = flatMap.reduce((acc, curr) => {
        if (curr >= dangerZone) return acc + 1;
        return acc;
    }, 0);

    fs.writeFileSync('5-output.txt', printMap(ventMap));

    console.log("Danger! " + dangerZones);
}

function printMap(map) {
    let print = '';
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            print += map[y][x] === 0 ? '.' : map[y][x];
        }
        print += '\n';
    }
    return print;
}

function inBetweenVH(x1, y1, x2, y2, x3, y3) {
    return (y1 === y2 && y2 === y3 && x1 >= x2 && x1 <= x3) || 
        (x1 === x2 && x2 === x3 && y1 >= y2 && y1 <= y3) || 
        (y1 === y2 && y2 === y3 && x1 >= x3 && x1 <= x2) ||
        (x1 === x2 && x2 === x3 && y1 >= y3 && y1 <= y2);
}

function inBetween(x, y, x1, y1, x2, y2) {
    const dx = x - x1;
    const dy = y - y1;

    const dx1 = x2 - x1;
    const dy1 = y2 - y1;

    const onLine = dx * dy1 - dy * dx1;

    if (onLine != 0) return false;
    
    if (Math.abs(dx1) >= Math.abs(dy1)) {
        return dx1 > 0 ?
            x1 <= x && x <= x2 :
            x2 <= x && x <= x1;
    } else {
        return dy1 > 0 ?
            y1 <= y && y <= y2 :
            y2 <= y && y <= y1;
    }
}

function getBounds(lines) {
    return lines.reduce((acc, curr) => {
        const start = curr[0];
        const end = curr[1];

        return  [
            Math.max(start[0], end[0], acc[0]),
            Math.max(start[1], end[1], acc[1])
        ];
    }, [0, 0]);
}

main(inBetweenVH);
main(inBetween);