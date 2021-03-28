package DesignPattern.CoffeeNTea_templateMethod;

public class Coffee extends CaffeineBeverage{

    @Override
    void brew() {
        // TODO Auto-generated method stub
        System.out.println("커피를 우려내자");
    }

    @Override
    void addCondiments() {
        // TODO Auto-generated method stub
        System.out.println("설탕 추가중");
    }
    
    
}