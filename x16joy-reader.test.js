
let code1 = "😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂   😂😂😂😂 😂😂😂😂 😂😂   😂😂😂😂 😂😂😂😂   😂😂😂😂";
let code2 = "😂😂😂😂😂😂😂😂   😂😂😂😂 😂😂😂😂"
let code3 = "😂😂😂😂 😂😂😂😂   😂😂😂😂😂😂😂😂"

const x16joy_reader = require("./x16joy-reader.js");

test('should return 7796 if input is written correctly', () => {
    expect(x16joy_reader.calculateCommandSum(code1)).toBe(7796);
});

test('should return 24 if input is written correctly', () => {
    expect(x16joy_reader.calculateCommandSum(code2)).toBe(24);
});

test('should return 24 if input is written correctly', () => {
    expect(x16joy_reader.calculateCommandSum(code3)).toBe(24);
});
