
// рекурсивная функция возведения в степень

function pow(n, p) {
    return (p < 1) ? null: (p == 1) ? n: n * pow(n, p-1)
};





// функция для преобразования массива в плоскую версию

function flatArr(arr) {
    const flattedArr = [];

    arr.forEach(elem => {
        if (Array.isArray(elem)) {
            flattedArr.push(...flatArr(elem));
        } else {
            flattedArr.push(elem);
          }
    });
    return flattedArr
};




// функция для преобразования чисел в слова

function splitNumToWholeFractional (num, divisor) {
    const wholeValue = Math.trunc(num / divisor);
    const fractionalValue = (num - (wholeValue * divisor));
    return [wholeValue, fractionalValue]
};

function strForLess100(num, map_less_20, map_more_20) {
    const [initIntValue, initRemainder] = splitNumToWholeFractional(num, 10);
    return (num < 20) ? map_less_20[num]: `${map_more_20[initIntValue]} ${map_less_20[initRemainder]}`;
};

function strForLess1000(num, map_less_20, map_more_20, map_more_100) {
    const [initIntValue, initRemainder] = splitNumToWholeFractional(num, 100);
    return [map_more_100[initIntValue], strForLess100(initRemainder, map_less_20, map_more_20),
            ].filter(Boolean).join(" ");
};

function replaceStrNameFor1And2(stroka) {
    stroka = stroka.endsWith("один") ? stroka.replace("один", "одна"): stroka;
    stroka = stroka.endsWith("два") ? stroka.replace("два", "две"): stroka;
    return stroka
};

function init_mappers() {
    const strNameTo20 = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять", "десять", "одиннадцать", "двенадцать", 
                         "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];

    const strNameTenths = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];

    const strNameHundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];
    
    return [strNameTo20, strNameTenths, strNameHundreds];
};

function numToWords(num) {
    
    const [strNameTo20, strNameTenth, strNameHundreds] = init_mappers()
              
    if (num == 0) {
        return "ноль";

    } else if (num < 20) {
        return strNameTo20.get(num);

    } else if (num < 100) {
        return strForLess100(num, strNameTo20, strNameTenth)

    } else if (num < 1000) {
        return strForLess1000(num, strNameTo20, strNameTenth, strNameHundreds)

    } else {

        const [intValue, remainder] = splitNumToWholeFractional(num, 1000);
        let resLeftPart = (intValue < 100) ? strForLess100(intValue, strNameTo20, strNameTenth): 
                                            strForLess1000(intValue, strNameTo20, strNameTenth, strNameHundreds);

        resLeftPart = replaceStrNameFor1And2(resLeftPart)

        const resRightPart = strForLess1000(remainder, strNameTo20, strNameTenth, strNameHundreds);
        const thousand_ = resLeftPart.endsWith("одна") ? "тысяча": 
                        (resLeftPart.endsWith("две") || resLeftPart.endsWith("три")) ? "тысячи": "тысяч";

        return [resLeftPart, thousand_, resRightPart].filter(Boolean).join(" ")
    }
};





// функция для форматирования массива чисел с интервалами

function numSeq(arr) {

    let lastValue = arr[0];
    const result = [];
    let tempArr = [lastValue];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] == lastValue + 1) {
            tempArr.push(arr[i])
            lastValue = arr[i]

        } else {
            result.push((tempArr.length > 2) ? [tempArr[0], tempArr[tempArr.length - 1]].join("-"): tempArr.join(","))
            lastValue = arr[i]
            tempArr = [lastValue]
        }
    };
    result.push((tempArr.length > 2) ? [tempArr[0], tempArr[tempArr.length - 1]].join("-"): tempArr.join(","))
    return result.join(",")
};





// функция для формирования маски из 2-х матриц

const matShape = (matrix) => [matrix.length, matrix[0]?.length];
const compareArr = (matrix1, matrix2) => matrix1.length === matrix2.length && matrix1.every((value, index) => value === matrix2[index]);
const matSlice = (matrix, sx, ex, sy, ey) => matrix.slice(sx, ex + 1).map(i => i.slice(sy, ey + 1));

function compareMatrices(matrix1, matrix2) {

    const m1Shape = matShape(matrix1);
    const m2Shape = matShape(matrix2);

    for (let i = 0; i < m1Shape[0]; i++) {
        if (compareArr(matrix1[i], matrix2[i])) {
            return false;
        };
    }
    return true;
};

function maskMatrix(init_m, compare_m) {

    let result = [];
    const initMatrixShape = matShape(init_m);
    const compareMatrixShape = matShape(compare_m);
    for (let i = 0; i < initMatrixShape[1] - compareMatrixShape[1]+1; i++) {
        let sliced_m = matSlice(init_m, 0, 2, i, i + compareMatrixShape[1] - 1);
        result.push(compareMatrices(sliced_m, compare_m));
    }
    return result;
};
