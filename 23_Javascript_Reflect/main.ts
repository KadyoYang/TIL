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
