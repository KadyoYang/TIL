package PizzaStore_factory;

public class ChicagoStyleCheesePizza extends Pizza{
    public ChicagoStyleCheesePizza(){
        name = "Chicago Style Deep Dish Cheese Pizza";
        dough = "Extra Thick Crust Dough";
        sauce = "Plum Tomato Sauce";

        toppings.add("Shredded Mozzarella Cheese");
    }

    void cut(){// 시카고풍은 네모낫게 자르기 때문에 cut메소드를 오버라이드 한다
        System.out.println("Cutting the pizza into square slices");
    }
}