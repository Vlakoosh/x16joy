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

function calculateCommandSum(codeLine){
    let sum = 0;
    let values = [0];
    let currentValue = 0;
    let currentOperation = "";
    let space = 0;

    for (let i = 0; i < codeLine.length; i++) {
        if (codeLine.at(i) + codeLine.at(i+1) === "😂" && space === 0){
            values[currentValue]++;
        }
        else if (codeLine.at(i) + codeLine.at(i+1) === "😂" && space === 1){
            currentOperation = "multiply";
            values.push(0);
            currentValue++
            values[currentValue]++;
            space = 0;
        }
        else if (codeLine.at(i) + codeLine.at(i+1) === "😂" && space === 3){
            currentOperation = "add";
            values.push(0);
            values.push(0);
            currentValue+=2;
            values[currentValue]++;
            space = 0;
        }
        else if (codeLine.at(i) === " " && space === 0){
            doOperation(currentOperation, values, currentValue);
            space++;
        }
        else if (codeLine.at(i) === " " && space > 0){
            space++;
            if (space === 3){
                currentOperation = "add";
            }
        }
    }

    doOperation();

    values.forEach(value => {
        sum += value;
    })

    return sum;
}

let code = "instruction😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂   😂😂😂😂 😂😂😂😂 😂😂   😂😂😂😂 😂😂😂😂   😂😂😂😂";


console.log(calculateCommandSum(code));


//exporting
module.exports = { calculateCommandSum, calculateCodeSums };