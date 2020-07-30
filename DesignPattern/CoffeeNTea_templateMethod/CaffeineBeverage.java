package DesignPattern.CoffeeNTea_templateMethod;

public abstract class CaffeineBeverage {

    final void prepareRecipe(){
        boilWater(); // 커피와 차의 공통점
        brew(); // 커피와 차의 차이점 각자 서브클래스에 구현을 강제하자!
        pourInCup(); // 공통
        addCondiments(); // 차이점 구현 강제하자!
    }

    abstract void brew();
    
    abstract void addCondiments();

    void boilWater(){
        System.out.println("물 끓이는 중");
    }

    void pourInCup(){
        System.out.println("컵에 따르는 중");
    }
    
}