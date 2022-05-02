class A {
    constructor(name){
        this.name = name;
    }
}
class B extends A {
    constructor(name,  age){
       super(name);
       this.age = age;
    }
}


let a = new A('a name');

console.log(a.name);

let b = new B('b name', 55);
console.log(b.name, b.age);