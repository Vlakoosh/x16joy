let result1 = "😂😂 😂😂 😂😂 😂😂 😂😂 😂😂 😂😂 😂😂 😂😂 😂😂 😂😂 😂😂";
let result2 = "😂";
let result3 = "😂😂 😂😂 😂😂 😂😂   😂😂 😂😂 😂😂";

const x16joy_writer = require("../x16joy-writer.js");

test('should return a correct joyCode value', () => {
    expect(x16joy_writer.convertNumberToJoyCode(4096)).toBe(result1);
});

test('should return a correct joyCode value', () => {
    expect(x16joy_writer.convertNumberToJoyCode(1)).toBe(result2);
});

test('should return a correct joyCode value', () => {
    expect(x16joy_writer.convertNumberToJoyCode(24)).toBe(result3);
});
