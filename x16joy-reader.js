function doOperation(operation, values, currentValue){
    switch (operation){
        case "multiply":
            values[currentValue] = values[currentValue] * values[currentValue - 1];
            values[currentValue - 1] = 0;
            break;
        case "add":
            values[currentValue] = values[currentValue] + values[currentValue - 1];
            values[currentValue - 1] = 0;
            break;
        case "subtract":
            values[currentValue] = values[currentValue] - values[currentValue - 1];
            values[currentValue - 1] = 0;
            break;
    }
}

function calculateCodeSums(code){
    let instructions = code.split("\n");
    let instructionSums = [];
    for (let i = 0; i < instructions.length; i++){
        instructionSums.push(0);
        instructionSums[i] = calculateCommandSum(instructions[i]);
    }
    return instructionSums
}

function calculateCommandSum(codeInput){
    let sum = 0;
    let codeLine = codeInput
    codeLine = codeLine.replaceAll("😂😂😂😂😂😂😂😂😂😂", '10');
    codeLine = codeLine.replaceAll("😂😂😂😂😂😂😂😂😂", '9');
    codeLine = codeLine.replaceAll("😂😂😂😂😂😂😂😂", '8');
    codeLine = codeLine.replaceAll("😂😂😂😂😂😂😂", '7');
    codeLine = codeLine.replaceAll("😂😂😂😂😂😂", '6');
    codeLine = codeLine.replaceAll("😂😂😂😂😂", '5');
    codeLine = codeLine.replaceAll("😂😂😂😂", '4');
    codeLine = codeLine.replaceAll("😂😂😂", '3');
    codeLine = codeLine.replaceAll("😂😂", '2');
    codeLine = codeLine.replaceAll("😂", '1');
    codeLine = codeLine.replace(/     /g, '\n');
    codeLine = codeLine.replace(/   /g, '+');
    codeLine = codeLine.replace(/ /g, '*');
    codeLine = codeLine.replaceAll(/[a-zA-Z]/g, '');
    console.log(codeLine);

    sum = eval(codeLine)

    return sum;
}

let code = "😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂   😂😂😂😂 😂😂😂😂 😂😂   😂😂😂😂 😂😂😂😂   😂😂😂😂";
let code2 = "😂😂😂😂😂😂😂😂   😂😂😂😂 😂😂😂😂";

console.log(calculateCommandSum(code2));


//exporting
module.exports = { calculateCommandSum, calculateCodeSums };
