const input = document.getElementById("codeInput");
const output = document.getElementById("codeOutput");
const canvas = document.getElementById("canvas");


const ctx = canvas.getContext("2d");
canvas.width = 16;
canvas.height = 16;

input.textContent = "";
output.textContent = "";

//automatically update the input register on key press
document.onkeydown = (e) => {
    inputRegister = e.keyCode;
};

document.onkeyup = (e) => {
    if (inputRegister === e.keyCode){
        inputRegister = 0;
    }
};

//memory and registers
const registers = new Array(16);
const memory = new Array(10000);
let inputRegister = 0;

/*
setInterval(() => {
    let imageData = ctx.createImageData(1,1);
    data = imageData.data;
    data[0] = Math.random() * (255 - 0) + 0;
    data[1] = Math.random() * (255 - 0) + 0;
    data[2] = Math.random() * (255 - 0) + 0;
    data[3] = 255;
    ctx.putImageData(imageData, Math.floor(Math.random() * (16)) , Math.floor(Math.random() * (16)));
}, 17)
 */

input.addEventListener("change", (event)=> {
    let code1 = input.value;
    let instructions = calculateCodeSums(code1);
    output.textContent = instructions;

    runCode(instructions);

})

function runCode(instructions){
    for (let i = 0; i < instructions.length; i++) {
        let instructionBinary = numberToBinaryString(instructions[i]);
        runCommand(instructionBinary);
    }
}

function runCommand(instruction){
    if (instruction.startsWith("0001")){
        setInterval(() => {
            let imageData = ctx.createImageData(1,1);
            data = imageData.data;
            data[0] = Math.random() * (255);
            data[1] = Math.random() * (255);
            data[2] = Math.random() * (255);
            data[3] = 255;
            ctx.putImageData(imageData, Math.floor(Math.random() * (16)) , Math.floor(Math.random() * (16)));
        }, 17)
    }
}



function numberToBinaryString(number){
    //convert the number to a binary string
    let numberBinaryString = number.toString(2);
    //
    while (numberBinaryString.length < 16){
        numberBinaryString = "0" + numberBinaryString;
    }
    return numberBinaryString;
}

function calculateCodeSums(code){
    code = code.replace(/     /g, '\n');
    let instructions = code.split("\n");
    let instructionSums = [];
    for (let i = 0; i < instructions.length; i++){
        instructionSums.push(0);
        instructionSums[i] = calculateCommandSum(instructions[i]);
    }
    return instructionSums
}

function calculateCommandSum(codeLine){
    //remove comments
    codeLine = codeLine.replace(/😐([^😐]*)😐/g, '');
    //convert emojis and spaces to signs and numbers

    //TODO: shorten this with a for loop
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

    sum = eval(codeLine)

    return sum;
}