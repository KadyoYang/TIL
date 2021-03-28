package DesignPattern.CoffeeNTea_templateMethod;

public class TestDriver {
    public static void main(String[] args){
        CaffeineBeverage coffee = new Coffee();
        CaffeineBeverage tea = new Tea();

        coffee.prepareRecipe();
        tea.prepareRecipe();
    }
    
}