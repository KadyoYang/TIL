
let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_-]{4,20}$/
// 문자열있는거를 가져오고 거기에 문자있는지 보고 기본문자열에 속하는지 확인 

console.log("aaaa".match(regex) && true);
console.log("Aaaa".match(regex) && true);
console.log("Aaabba".match(regex) && true);
console.log("1111".match(regex) && true);


console.log("A111".match(regex) && true);
console.log("aaa1".match(regex) && true);
console.log("aaaaaaa2aasd22".match(regex) && true);
console.log("aaaa123_-".match(regex) && true)
