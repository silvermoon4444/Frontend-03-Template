// let num = 52, str = ''
// // let ss = []
// const ss = ['A','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','+Z+']
// // const ss2 = [null,null,'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
// function parse(num) {
//     let res = '', rate, i;
//     for (i = 0; i < num; i++) {
//         if (num >= Math.pow(27, i) && num < Math.pow(27, i + 1)) {
//             break;
//         }
//     }
//     // if (i === 0) {
//     //     ss = ss1
//     // }
//     // else {
//     //     ss = ss1
//     // }

//     while (i >= 0) {
//         console.log('num', num);
//         rate = Math.floor(num / Math.pow(27, i))
//         // console.log('✔', rate, '✔');
//         // console.log('*', ss[rate], '*');
//         console.log('i', i, rate);
//         // if (i === 0) {
//         //     // if (rate === 0) {
//         //     //     res += 'A'
//         //     // } else {
//         //     //     res += ss[rate + 1]
//         //     // }
//         //     res += ss[rate+1]
//         // }
//         // else {
//         //     res += ss[rate+1]
//         // }
//         res += ss[rate]
//         num -= rate * Math.pow(27, i)
//         i--
//     }
//     return res
// }
// console.log(parse(num));

const ss = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
function parse(num) {
    const rate = 26;
    let i = 1;
    while (num - Math.pow(rate, i) > 0) {
        i++
    }
    // num = num + Math.pow(rate, i)
    let yu = num % rate
    let shang =(num - yu) / rate
    var str = ''
    for (let j = 1; j <= i; j++) {
        if (i === j) {
            if (yu === 0) {
                str += 'Z'
            }
            else {
                str += ss[yu - 1]
            }
        }
        else {
            for (let k = 0; k < i - j; k++) {
                shang = shang / rate
            }
            str += ss[ Math.floor(shang)]
        }
    }
    return str
}

console.log(parse(26));
// let num = 52, str = ''
// let ss = []
// const ss = ['Z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y']

// function parse(num){

// }
// function translateChar(num){
//  return num%26
// }