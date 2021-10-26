let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()]{8,20}$/


console.log("qwer1234!".match(regex) && true);
console.log("qwerqweqweqw1".match(regex) && true);
console.log("q1238712937".match(regex) && true);
console.log("123Asdasd!@#$%^&*()".match(regex) && true);


console.log("qwe!!!!!!!".match(regex) && true);
console.log("qwerqweqweqw".match(regex)&& true);
console.log("qwerqweqwe!".match(regex)&& true);
console.log("Qqqqweqwe".match(regex)&& true);
console.log("123asdasdasda1231312312312312".match(regex) && true);