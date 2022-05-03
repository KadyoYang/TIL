


type Expression1 = any;
type Expression2 = number | string | any[];

type FnName = '+' | '-' | '*' | '/' | '>' | '<' | 'case' | 'rgb';
type CallExpression = [FnName, ...any[]];
type Expression3 = number | string | CallExpression;


type Expression4 = number | string | NewCallExpression;
type NewCallExpression = MathCall | CaseCall | RGBCall;
interface MathCall { 
    0: '+' | '-' | '*' | '/' | '>' | '<';
    1: Expression4;
    2: Expression4;
    length: 3;
}
interface CaseCall{
    0: 'case';
    1: Expression4;
    2: Expression4;
    3: Expression4;
    length: 4 | 6 | 8 | 10 | 12 | 14| 16;
}
interface RGBCall {
    0: 'rgb';
    1: Expression4;
    2: Expression4;
    3:Expression4;
    length: 4;
}
const tests: Expression4[] = [
    10, 
    "red",
    //true,
    ["+", 10, 5],
    // ["case", [">", 20, 10], "red", "blue", "green"],
    // ["**", 2, 31],
    ["rgb", 255, 128, 64],
    // ["rgb", 255, 0, 127, 0]
];

