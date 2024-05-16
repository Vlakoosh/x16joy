const input = document.getElementById("codeInput");
const output = document.getElementById("codeOutput");
const canvas = document.getElementById("canvas");

let joyCodePrint = "";
const CANVAS_WIDTH = 16;
const CANVAS_HEIGHT = 16;

const ctx = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const mode = "joy"; //joy or sad

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
    let instructions;
    if (mode === "joy") instructions = calculateCodeSums(code1);
    if (mode === "sad") instructions = code1.split("\n");

    runCode(instructions);

})

function runCode(instructions){
    for (let i = 0; i < instructions.length; i++) {
        let instructionBinary;
        if(mode === "joy") instructionBinary = numberToBinaryString(instructions[i]);
        if(mode === "sad") instructionBinary = codeToBinaryString(instructions[i]);
        runCommand(instructionBinary);
    }
    console.log(joyCodePrint);
}

function runCommand(instruction){


    if (instruction===undefined) return;
    joyCodePrint = joyCodePrint + convertBinaryToJoyCode(instruction) + "\n";
    console.log(instruction);
    console.log(convertBinaryToJoyCode(instruction));
    // sv_ instruction
    if (instruction.startsWith("0001")){
        let value = parseInt(instruction.substring(4,12), 2);
        let reg = parseInt(instruction.substring(12), 2);

        registers[reg] = value;
        console.log(registers[reg]);
    }
    // ALU

    //OR_ logical operator
    if (instruction.startsWith("01000001")) {
        let reg1 = parseInt(instruction.substring(8,12), 2);
        let reg2 = parseInt(instruction.substring(12), 2);

        registers[reg1] |= registers[reg2];
        console.log(registers[reg1]);
    }
    //AND logical operator
    if (instruction.startsWith("01000010")) {
        let reg1 = parseInt(instruction.substring(8,12), 2);
        let reg2 = parseInt(instruction.substring(12), 2);

        registers[reg1] &= registers[reg2];
        console.log(registers[reg1]);
    }
    //XOR logical operator
    if (instruction.startsWith("01000011")) {
        let reg1 = parseInt(instruction.substring(8,12), 2);
        let reg2 = parseInt(instruction.substring(12), 2);

        registers[reg1] ^= registers[reg2];
        console.log(registers[reg1]);
    }
    //ADD - addition
    if (instruction.startsWith("01000100")) {
        //TODO add a check that doesn't allow the number to go past 16 bits
        let reg1 = parseInt(instruction.substring(8,12), 2);
        let reg2 = parseInt(instruction.substring(12), 2);

        registers[reg1] = registers[reg1] + registers[reg2];
        console.log(registers[reg1])
    }
    //SUB - subtraction
    if (instruction.startsWith("01000101")) {
        //TODO add a check that doesn't allow the number to go past 16 bits
        let reg1 = parseInt(instruction.substring(8,12), 2);
        let reg2 = parseInt(instruction.substring(12), 2);

        registers[reg1] = registers[reg1] - registers[reg2];
        console.log(registers[reg1]);
    }
    //LSL - logical shift left
    if (instruction.startsWith("01000110")) {
        //TODO add a check that doesn't allow the number to go past 16 bits
        let reg1  = parseInt(instruction.substring(8,12), 2 );
        let reg2 = parseInt(instruction.substring(12), 2);

        registers[reg1] = (registers[reg1] << registers[reg2]);
        console.log(registers[reg1]);
    }
    //LSR - logical shift right
    if (instruction.startsWith("01000111")) {
        //TODO add a check that doesn't allow the number to go past 16 bits
        let reg1 = parseInt(instruction.substring(8,12), 2);
        let reg2 = parseInt(instruction.substring(12), 2);

        registers[reg1] = (registers[reg1] >> registers[reg2]);
        console.log(registers[reg1]);
    }
    //ld_
    if (instruction.startsWith("10000000")) {
        let reg1 = parseInt(instruction.substring(8,12), 2);
        let reg2 = parseInt(instruction.substring(12), 2);

        registers[reg1] = memory[registers[reg2]];
        console.log(registers[reg1]);
    }
    //st_
    if (instruction.startsWith("10100000")) {
        let reg1 = parseInt(instruction.substring(8,12), 2);
        let reg2 = parseInt(instruction.substring(12), 2);

        memory[registers[reg2]] = registers[reg1];
        console.log(registers[reg1]);
    }
    //jp_
    //jpcc
    //end
    if (instruction.startsWith("0000000000000001")){
        let end = 1/0;
    }

    //co_
    if (instruction.startsWith("0101")){
        let clearImage = ctx.createImageData(1, 1);
        let clearData = clearImage.data;
        clearData[0] = 255;
        clearData[1] = 255;
        clearData[2] = 255;
        clearData[3] = 255;
        for (let x = 0; x < CANVAS_WIDTH; x++){
            for (let y = 0; y < CANVAS_HEIGHT; y++) {
                ctx.putImageData(clearImage, x, y);
            }
        }
    }

    //dp_
    //dpc // dpc rg ba s
    if (instruction.startsWith("0111")) {
        let rg_reg = parseInt(instruction.substring(4,8), 2);
        let ba_reg = parseInt(instruction.substring(8,12), 2);
        let xy_reg = parseInt(instruction.substring(12), 2);

        //rrrr rrrr gggg gggg
        let red = registers[rg_reg] >> 8;
        let green = registers[rg_reg] - (red << 8);
        console.log("red", red, "green", green);
        let blue = registers[ba_reg] >> 8;
        let alpha = registers[ba_reg] - (blue << 8);
        console.log("blue", blue, "alpha", alpha);
        let x = registers[xy_reg] >> 8;
        let y = registers[xy_reg] - (x << 8);
        let pixel = ctx.createImageData(1,1);
        let pixelData = pixel.data;
        pixelData[0] = red;
        pixelData[1] = green;
        pixelData[2] = blue;
        pixelData[3] = alpha;
        ctx.putImageData(pixel, x, y);

    }

    //prc
    if (instruction.startsWith("10010000000")) {
        let reg = parseInt(instruction.substring(12), 2);

        output.textContent = output.value + String.fromCharCode(registers[reg]);
        console.log(String.fromCharCode(registers[reg]));
    }

    //prv - print value
    if (instruction.startsWith("1011000")) {
        let num_sys = parseInt(instruction.substring(7,12), 2);
        let reg1 = parseInt(instruction.substring(12), 2);

        output.textContent = output.value + registers[reg1].toString(num_sys) + " ";

    }
    //gik
}

function codeToBinaryString(instruction){
    let result = "";
    if (instruction.startsWith("sv_")){
        result += "0001";
        let value = parseInt(instruction.substring(8)).toString(2);
        while (value.length < 8){
            value = "0" + value;
        }
        result += value;
        let reg = parseInt(instruction.substring(5,7)).toString(2);
        while (reg.length < 4){
            reg = "0" + reg;
        }
        result += reg;
        return result;
    }
    if (instruction.toLowerCase().startsWith("nop")){
        result += "01000000";
        let reg1 = parseInt(instruction.substring(5,7)).toString(2);
        while (reg1.length < 4){
            reg1 = "0" + reg1;
        }
        result += reg1;
        let reg2 = parseInt(instruction.substring(9, 11)).toString(2);
        while (reg2.length < 4){
            reg2 = "0" + reg2;
        }
        result += reg2;

        return result;
    }
    if (instruction.toLowerCase().startsWith("or_")){
        result += "01000001";
        let reg1 = parseInt(instruction.substring(5,7)).toString(2);
        while (reg1.length < 4){
            reg1 = "0" + reg1;
        }
        result += reg1;
        let reg2 = parseInt(instruction.substring(9, 11)).toString(2);
        while (reg2.length < 4){
            reg2 = "0" + reg2;
        }
        result += reg2;

        return result;
    }
    if (instruction.toLowerCase().startsWith("and")){
        result += "01000010";
        let reg1 = parseInt(instruction.substring(5,7)).toString(2);
        while (reg1.length < 4){
            reg1 = "0" + reg1;
        }
        result += reg1;
        let reg2 = parseInt(instruction.substring(9, 11)).toString(2);
        while (reg2.length < 4){
            reg2 = "0" + reg2;
        }
        result += reg2;

        return result;
    }
    if (instruction.toLowerCase().startsWith("xor")){
        result += "01000011";
        let reg1 = parseInt(instruction.substring(5,7)).toString(2);
        while (reg1.length < 4){
            reg1 = "0" + reg1;
        }
        result += reg1;
        let reg2 = parseInt(instruction.substring(9, 11)).toString(2);
        while (reg2.length < 4){
            reg2 = "0" + reg2;
        }
        result += reg2;

        return result;
    }
    if (instruction.toLowerCase().startsWith("add")){
        result += "01000100";
        let reg1 = parseInt(instruction.substring(5,7)).toString(2);
        while (reg1.length < 4){
            reg1 = "0" + reg1;
        }
        result += reg1;
        let reg2 = parseInt(instruction.substring(9, 11)).toString(2);
        while (reg2.length < 4){
            reg2 = "0" + reg2;
        }
        result += reg2;

        return result;
    }
    if (instruction.toLowerCase().startsWith("sub")){
        result += "01000101";
        let reg1 = parseInt(instruction.substring(5,7)).toString(2);
        while (reg1.length < 4){
            reg1 = "0" + reg1;
        }
        result += reg1;
        let reg2 = parseInt(instruction.substring(9, 11)).toString(2);
        while (reg2.length < 4){
            reg2 = "0" + reg2;
        }
        result += reg2;

        return result;
    }
    if (instruction.toLowerCase().startsWith("lsl")){
        result += "01000110";
        let reg1 = parseInt(instruction.substring(5,7)).toString(2);
        while (reg1.length < 4){
            reg1 = "0" + reg1;
        }
        result += reg1;
        let reg2 = parseInt(instruction.substring(9, 11)).toString(2);
        while (reg2.length < 4){
            reg2 = "0" + reg2;
        }
        result += reg2;

        return result;
    }
    if (instruction.toLowerCase().startsWith("ld_")){
        result += "10000000";
        let reg1 = parseInt(instruction.substring(5,7)).toString(2);
        while (reg1.length < 4){
            reg1 = "0" + reg1;
        }
        result += reg1;
        let reg2 = parseInt(instruction.substring(9, 11)).toString(2);
        while (reg2.length < 4){
            reg2 = "0" + reg2;
        }
        result += reg2;

        return result;
    }
    if (instruction.toLowerCase().startsWith("st_")){
        result += "10100000";
        let reg1 = parseInt(instruction.substring(5,7)).toString(2);
        while (reg1.length < 4){
            reg1 = "0" + reg1;
        }
        result += reg1;
        let reg2 = parseInt(instruction.substring(9, 11)).toString(2);
        while (reg2.length < 4){
            reg2 = "0" + reg2;
        }
        result += reg2;

        return result;
    }
    if (instruction.toLowerCase().startsWith("co_")){
        result += "0101000000000000";
        return result;
    }
    if (instruction.toLowerCase().startsWith("prv")){
        result += "1011000";
        let num_sys = parseInt(instruction.substring(8)).toString(2);
        while (num_sys.length < 5){
            num_sys = "0" + num_sys;
        }
        result += num_sys;

        let reg1 = parseInt(instruction.substring(5,7)).toString(2);
        while (reg1.length < 4){
            reg1 = "0" + reg1;
        }
        result += reg1;

        return result;
    }
    if (instruction.toLowerCase().startsWith("dpc")){
        result += "0111";
        let reg1 = parseInt(instruction.substring(5,7)).toString(2);
        while (reg1.length < 4){
            reg1 = "0" + reg1;
        }
        result += reg1; //reg / green
        let reg2 = parseInt(instruction.substring(9, 11)).toString(2);
        while (reg2.length < 4){
            reg2 = "0" + reg2;
        }
        result += reg2; //blue / alpha
        let reg3 = parseInt(instruction.substring(13, 15)).toString(2);
        while (reg3.length < 4){
            reg3 = "0" + reg3;
        }
        result += reg3; //coordinates

        return result;
    }
    if (instruction.toLowerCase().startsWith("prc")){
        result += "100100000000";
        let reg = parseInt(instruction.substring(5,7)).toString(2);
        while (reg.length < 4){
            reg = "0" + reg;
        }
        result += reg;

        return result;
    }
}



function generateRandomPixels(){
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
    codeLine = codeLine.trim();
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


function multiplyString(string, amount){
    let output = "";
    for (let i = 0; i < amount; i++){
        output += "😂😂 ";
    }
    return output;
}

function convertNumberToJoyCode(number) {
    //convert the number to a binary string
    let numberBinaryString = number.toString(2);
    //
    while (numberBinaryString.length < 16){
        numberBinaryString = "0" + numberBinaryString;
    }

    let output = "";
    let exponent = 15;
    let initSpace = "";
    for (let i = 0; i < 16; i++) {

        if (numberBinaryString.at(i) === "1" && exponent === 0){
            output += initSpace + "😂";
            initSpace = "   ";
        }
        else if (numberBinaryString.at(i) === "1" && exponent > 0){
            output += initSpace + multiplyString("😂😂 ", exponent-1) + "😂😂";
            initSpace = "   ";
        }
        exponent--;
    }

    output= output.replaceAll("😂😂 😂😂", '😂😂😂😂');

    return output;
}

function convertBinaryToJoyCode(binaryString){
    let number = parseInt(binaryString, 2);
    return convertNumberToJoyCode(number);
}
