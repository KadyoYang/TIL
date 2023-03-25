(function () {
  console.log("hello");
  apply();
})();

function apply() {
  Reflect.apply(
    (a: any, b: any, c: any) => {
      console.log(a, b, c);
    },
    undefined,
    [1, 2, 3]
  );

  console.log(Reflect.apply("".charAt, "abcdef", [3]));
  console.log(Reflect.apply(String.prototype.trim, " aaabbb ", []));
}

callMe.call({ a: "나야나나야나" });

function callMe(...args: any) {
  //@ts-ignore
  console.log(this.a);
}

class ABC {
  service: string = "asdasd";

  callMe() {
    console.log(this.service);
    //@ts-ignore
    console.log(this.a);
  }
}

const abc = new ABC();

abc.callMe.call({ a: "aaaa" });
