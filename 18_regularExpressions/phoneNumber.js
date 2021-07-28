let regex = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/;


console.log("000-2222-3333".match(regex) && true);

console.log("00-3333-3333".match(regex)&& true);
console.log("000-333-3333".match(regex)&& true);
console.log("000-3333-333".match(regex)&& true);

console.log("00-333-333".match(regex) && true);

console.log("-2222-3333".match(regex) && true);

console.log("2222-3333".match(regex) && true);
console.log("00022223333".match(regex) && true);
console.log("=000-2222-3333".match(regex) && true);
console.log("000-2222-3333--".match(regex) && true);
console.log("000-2222-333d".match(regex) && true);