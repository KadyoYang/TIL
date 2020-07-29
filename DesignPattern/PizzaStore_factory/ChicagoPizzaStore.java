package PizzaStore_factory;

public class ChicagoPizzaStore extends PizzaStore{
    
    protected Pizza createPizza(String type){
        Pizza pizza;
        if(type.equals("cheese")){
            pizza = new ChicagoStyleCheesePizza();
        }else if(type.equals("pepperoni")){
            pizza = new ChicagoStyleCheesePizza();
        }else if(type.equals("clam")){
            pizza = new ChicagoStyleCheesePizza();
        }else if(type.equals("veggie")){
            pizza = new ChicagoStyleCheesePizza();
        }else{
            pizza = new ChicagoStyleCheesePizza();
        }
        return pizza;
    }

}