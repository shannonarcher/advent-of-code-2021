const fs = require('fs');

function main() {
    let report = fs.readFileSync('3-input.txt', 'utf-8');
    report = report.split(/\r?\n/);

    let common = report.reduce((acc, curr) => {
       let bits = curr.split(''); 
       bits.forEach((bit, index) => {
           if (!acc[index]) acc[index] = [0, 0];
           acc[index][bit]++;
       });
       return acc;
    }, {});

    let gamma = Object.values(common).reduce((commonBits, bit) => commonBits + (bit[0] > bit[1] ? 0 : 1), '');
    let epsilon = invert(gamma);

    console.log(`Answer: ${bin2dec(gamma) * bin2dec(epsilon)}`);

    let ogr = report;
    for (let i = 0; i < ogr[0].length && ogr.length > 1; i++) {
        const bitCount = ogr.reduce((acc, curr) => {
            acc[curr[i]]++;
            return acc; 
        }, [0, 0]);
        const commonBit = bitCount[0] > bitCount[1] ? 0 : 1;
        ogr = ogr.filter((curr) => Number(curr[i]) === commonBit);
    }
    ogr = ogr[0];

    let csr = report;
    for (let i = 0; i < csr[0].length && csr.length > 1; i++) {
        const bitCount = csr.reduce((acc, curr) => {
            acc[curr[i]]++;
            return acc;
        }, [0, 0]);
        const commonBit = bitCount[1] < bitCount[0] ? 1 : 0;
        csr = csr.filter((curr) => Number(curr[i]) === commonBit);
    }
    csr = csr[0];
    
    console.log(`Answer: ${bin2dec(ogr) * bin2dec(csr)}`);
}

function invert(bin) {
    return bin.split('').map((x) => Number(x) ? 0 : 1).join('');
}

function bin2dec(bin) {
    return bin
        .split('')
        .reduce((value, bit, index) => {
            return value + Number(bit) * 2 ** (bin.length - index - 1);
        }, 0);
}

main();