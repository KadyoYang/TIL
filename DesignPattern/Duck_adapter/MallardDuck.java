package DesignPattern.Duck_adapter;

public class MallardDuck implements Duck{

    @Override
    public void quack() {
        // TODO Auto-generated method stub
        System.out.println("quack! quack!");

    }

    @Override
    public void fly() {
        // TODO Auto-generated method stub
        System.out.println("im flying!");
    }
    
    
}