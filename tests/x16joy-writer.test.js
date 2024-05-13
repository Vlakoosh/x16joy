let result1 = "😂😂 😂😂 😂😂 😂😂 😂😂 😂😂 😂😂 😂😂 😂😂 😂😂 😂😂 😂😂";
let result2 = "😂";
let result3 = "😂😂 😂😂 😂😂 😂😂   😂😂 😂😂 😂😂";

const x16joy_writer = require("../x16joy-writer.js");
const x16joy_reader = require("../x16joy-reader.js");

test('should return a correct joyCode value', () => {
    expect(x16joy_reader.calculateCommandSum(x16joy_writer.convertNumberToJoyCode(4096))).toBe(x16joy_reader.calculateCommandSum(result1));
});

test('should return a correct joyCode value', () => {
    expect(x16joy_reader.calculateCommandSum(x16joy_writer.convertNumberToJoyCode(1))).toBe(x16joy_reader.calculateCommandSum(result2));
});

test('should return a correct joyCode value', () => {
    expect(x16joy_reader.calculateCommandSum(x16joy_writer.convertNumberToJoyCode(24))).toBe(x16joy_reader.calculateCommandSum(result3));
});
