
let code1 = "instruction😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂😂😂 😂😂   😂😂😂😂 😂😂😂😂 😂😂😂😂   😂😂😂😂 😂😂😂😂 😂😂   😂😂😂😂 😂😂😂😂   😂😂😂😂";
let code2 = "😂😂😂😂😂😂😂😂   😂😂😂😂 😂😂😂😂"

const { calculateCommandSum } = require("./x16joy-reader");
describe
test('should return 7796 if input is written correctly', () => {
    expect(calculateCommandSum(code1)).toBe(7796);
});

test('should return 7796 if input is written correctly', () => {
    expect(calculateCommandSum(code2)).toBe(24);
});
