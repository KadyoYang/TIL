
function classToSomething(cls: { new (...args: any[]): any }): any {
    let a = Object.getOwnPropertyNames(cls.prototype);
    let result: { [a: string]: any } = {};
    for (let n of a) {
      console.log(n);
      result[n] = function () {
        console.log(`하하하${n}`);
      };
    }
    return result;
  }

  export default classToSomething;