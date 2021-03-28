package DesignPattern.PizzaStore_factory;


// 이런방법도 있고 ... 메소드를 팩토리처럼 돌리는 방법도있고 하하하하하하하하하하하하하하
public class SimplePizzaFactory{
    protected Pizza createPizza(String type){
        Pizza pizza = null;

        if(type.equals("cheese")){
            pizza = new ChicagoStyleCheesePizza();
        }else if(type.equals("pepperoni")){
            pizza = new ChicagoStyleCheesePizza();
        }else if(type.equals("clam")){
            pizza = new ChicagoStyleCheesePizza();
        }else if(type.equals("veggie")){
            pizza = new ChicagoStyleCheesePizza();
        }
        return pizza;
    }
}