package Starbuz_decorater;

public class Whip extends CondimentDecorator{
    Beverage beverage;
    public Whip(Beverage beverage){
        this.beverage = beverage;
    }
    public String getDescription(){
        return beverage.getDescription() + ", 모카";
    }
    public double cost(){
        return 0.1 + beverage.cost();
    }
}