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


setInterval(() => {
    let imageData = ctx.createImageData(1,1);
    data = imageData.data;
    data[0] = Math.random() * (255 - 0) + 0;
    data[1] = Math.random() * (255 - 0) + 0;
    data[2] = Math.random() * (255 - 0) + 0;
    data[3] = 255;
    ctx.putImageData(imageData, Math.floor(Math.random() * (16)) , Math.floor(Math.random() * (16)));
}, 17)

