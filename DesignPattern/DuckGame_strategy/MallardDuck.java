package DuckGame_strategy;

public class MallardDuck extends Duck {

    public MallardDuck(){
        this.flyBehavior = new FlyWithWings();
        this.quackBehavior = new Quack();
    }

    public void display(){
        System.out.println("보인다");
    }
}