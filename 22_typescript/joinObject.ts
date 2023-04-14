export const joinArrayValueWithComma = (queryObj: {
  [key: string]: any;
}): { [key: string]: any } => {
  // @ts-ignore
  return Object.entries(queryObj).reduce((prev, curr: any) => {
    return Object.assign(prev, {
      [curr[0]]: Array.isArray(curr[1]) ? curr[1].join(",") : curr[1],
    });
  }, {} as { [key: string]: any });
};

const obj = {
  a: 1,
  b: [1, 2, 3, 4],
  c: ["a", "b", "c"],
  d: "wowowo",
};

console.log(joinArrayValueWithComma(obj));
