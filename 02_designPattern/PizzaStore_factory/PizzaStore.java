package DesignPattern.PizzaStore_factory;

import sun.java2d.pipe.SpanShapeRenderer.Simple;

public abstract class PizzaStore {


    public Pizza orderPizza(String type){
        Pizza pizza;

        pizza = createPizza(type);

        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();
        return pizza;
    }
    
    abstract Pizza createPizza(String type);
}