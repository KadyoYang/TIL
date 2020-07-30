package DesignPattern.CoffeeNTea_templateMethod;

public class Tea extends CaffeineBeverage{

    @Override
    void brew() {
        // TODO Auto-generated method stub
        System.out.println("차를 우려낸다");
    }

    @Override
    void addCondiments() {
        // TODO Auto-generated method stub
        System.out.println("레몬 추가하는중");
    }
    
}