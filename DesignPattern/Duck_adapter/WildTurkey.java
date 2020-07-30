package DesignPattern.Duck_adapter;

public class WildTurkey implements Turkey{

    @Override
    public void gobble() {
        // TODO Auto-generated method stub
        System.out.println("gooble...gobble...");

    }

    @Override
    public void fly() {
        // TODO Auto-generated method stub
        System.out.println("flying little distance");
    }
    
}