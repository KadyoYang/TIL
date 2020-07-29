package PizzaStore_factory;

public class NYPizzaStore extends PizzaStore{

    protected Pizza createPizza(String type){
        Pizza pizza;
        if(type.equals("cheese")){
            pizza = new NYStyleCheesePizza();
        }else if(type.equals("pepperoni")){
            pizza = new NYStyleCheesePizza();
        }else if(type.equals("clam")){
            pizza = new NYStyleCheesePizza();
        }else if(type.equals("veggie")){
            pizza = new NYStyleCheesePizza();
        }else{
            pizza = new NYStyleCheesePizza();
        }
        return pizza;
    }

}