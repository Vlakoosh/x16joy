
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
    console.log(output);

    return output;
}


//exporting
module.exports = { convertNumberToJoyCode };