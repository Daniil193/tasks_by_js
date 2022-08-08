
// рекурсивная функция возведения в степень

function pow(n, p) {
    return (p < 1) ? null: (p == 1) ? n: n * pow(n, p-1)
};





// функция для преобразования массива в плоскую версию

function flatArr(arr) {
    const flattedArr = [];

    arr.forEach(elem => {
        if (typeof elem == "number") {
            flattedArr.push(elem);
        } else {
            flattedArr.push(...flatArr(elem));
          }
    });
    return flattedArr
};




// функция для преобразования чисел в слова

function splitNumToWholeFractional (num, divisor) {
    let wholeValue = Math.trunc(num / divisor);
    let fractionalValue = (num - (wholeValue * divisor));
    return [wholeValue, fractionalValue]
};

function str_for_less_100(num, map_less_20, map_more_20) {
    let [init_int_value, init_remainder] = splitNumToWholeFractional(num, 10);
    return (num < 20) ? map_less_20.get(num): `${map_more_20.get(init_int_value)} ${map_less_20.get(init_remainder)}`;
};

function str_for_less_1000(num, map_less_20, map_more_20, map_more_100) {
    let [init_int_value, init_remainder] = splitNumToWholeFractional(num, 100);
    return [map_more_100.get(init_int_value), str_for_less_100(init_remainder, map_less_20, map_more_20),
            ].filter(Boolean).join(" ");
};

function replace_1_2(stroka) {
    stroka = stroka.endsWith("один") ? stroka.replace("один", "одна"): stroka;
    stroka = stroka.endsWith("два") ? stroka.replace("два", "две"): stroka;
    return stroka
};

function init_mappers() {
    const map_less_20 = new Map([[0, ""], [1, "один"], [2, "два"], [3, "три"], [4, "четыре"], [5, "пять"], [6, "шесть"], 
                                 [7, "семь"], [8, "восемь"], [9, "девять"], [10, "десять"], [11, "одиннадцать"], [12, "двенадцать"], 
                                 [13, "тринадцать"], [14, "четырнадцать"], [15, "пятнадцать"], [16, "шестнадцать"], [17, "семнадцать"], 
                                 [18, "восемнадцать"], [19, "девятнадцать"]]);

    const map_more_20 = new Map([[2, "двадцать"], [3, "тридцать"], [4, "сорок"], [5, "пятьдесят"], [6, "шестьдесят"], [7, "семьдесят"], 
                                 [8, "восемьдесят"], [9, "девяносто"],]);

    const map_more_100 = new Map([[0, ""], [1, "сто"], [2, "двести"], [3, "триста"], [4, "четыреста"], [5, "пятьсот"], [6, "шестьсот"], [7, "семьсот"], 
                                  [8, "восемьсот"], [9, "девятьсот"],]);
    return [map_less_20, map_more_20, map_more_100];

};

function numToWords(num) {
    
    const [map_less_20, map_more_20, map_more_100] = init_mappers()
              
    if (num == 0) {
        return "ноль";

    } else if (num < 20) {
        return map_less_20.get(num);

    } else if (num < 100) {
        return str_for_less_100(num, map_less_20, map_more_20)

    } else if (num < 1000) {
        return str_for_less_1000(num, map_less_20, map_more_20, map_more_100)

    } else {

        let [int_value, remainder] = splitNumToWholeFractional(num, 1000);
        let left_part = (int_value < 100) ? str_for_less_100(int_value, map_less_20, map_more_20): 
                                            str_for_less_1000(int_value, map_less_20, map_more_20, map_more_100);

        left_part = replace_1_2(left_part)

        let right_part = str_for_less_1000(remainder, map_less_20, map_more_20, map_more_100);
        let thousand_ = left_part.endsWith("одна") ? "тысяча": 
                        (left_part.endsWith("две") || left_part.endsWith("три")) ? "тысячи": "тысяч";

        return [left_part, thousand_, right_part].filter(Boolean).join(" ")
    }
};





// функция для форматирования массива чисел с интервалами

function numSeq(arr) {

    let lastValue = arr[0];
    let result = [];
    let temp_arr = [lastValue];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] == lastValue + 1) {
            temp_arr.push(arr[i])
            lastValue = arr[i]

        } else {
            result.push((temp_arr.length > 2) ? [temp_arr[0], temp_arr.at(-1)].join("-"): temp_arr.join(","))
            lastValue = arr[i]
            temp_arr = [lastValue]
        }
    };
    result.push((temp_arr.length > 2) ? [temp_arr[0], temp_arr.at(-1)].join("-"): temp_arr.join(","))
    return result.join(",")
};





// функция для форматирования маски из 2-х матриц

let matShape = (matrix) => [matrix.length, matrix[0]?.length];
let compareArr = (matrix1, matrix2) => matrix1.length === matrix2.length && matrix1.every((value, index) => value === matrix2[index]);
let matSlice = (matrix, sx, ex, sy, ey) => matrix.slice(sx, ex + 1).map(i => i.slice(sy, ey + 1));

function compareMatrices(matrix1, matrix2) {

    let m1Shape = matShape(matrix1);
    let m2Shape = matShape(matrix2);

    for (let i = 0; i < m1Shape[0]; i++) {
        if (compareArr(matrix1[i], matrix2[i])) {
            return false;
        };
    }
    return true;
};

function maskMatrix(init_m, compare_m) {

    let result = [];
    let init_m_shape = matShape(init_m);
    let compare_m_shape = matShape(compare_m);
    for (let i = 0; i < init_m_shape[1] - compare_m_shape[1]+1; i++) {
        let sliced_m = matSlice(init_m, 0, 2, i, i + compare_m_shape[1] - 1);
        result.push(compareMatrices(sliced_m, compare_m));
    }
    return result;
};



let res = "одна тысяча двадцать пять"

let realRes = numToWords(1025)





// let n = +prompt("Enter number", 0);
// let p = +prompt("Enter power of number", 0);
// alert( pow(n, p) );




// let arr1 = [1,2, [3,4, [5,6, [7,8, [9,10]]]]];
// let arr2 = [[[[[1,2,3]]]]];
// let flattedArr = flatArr(arr1)
// alert( flattedArr );



// alert( numToWords(441) );




// let arr = [-6, -3, -2, -1, 0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]
// alert( numSeq(arr) )




// const matrix = [[1, 2, 3, 2, 3, 7, 9, 1, 2, 3],
//                 [4, 5, 6, 5, 7, 8, 9, 4, 5, 6],
//                 [7, 8, 9, 4, 6, 3, 1, 7, 8, 9]]


// const matrix_3_3 = [[1, 2, 3],
//                     [4, 5, 6],
//                     [7, 8, 9]]

//alert( compareArr(matShape(matrix_slice), matShape(matrix_3_3)) )

//alert( matShape(matrix_slice) )

//alert( maskMatrix(matrix, matrix_3_3) )