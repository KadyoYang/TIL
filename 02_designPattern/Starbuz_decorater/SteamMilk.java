package DesignPattern.Starbuz_decorater;

public class SteamMilk extends CondimentDecorator{
    Beverage beverage;
    public SteamMilk(Beverage beverage){
        this.beverage = beverage;
    }
    public String getDescription(){
        return beverage.getDescription() + ", 모카";
    }
    public double cost(){
        return 0.05 + beverage.cost();
    }
}