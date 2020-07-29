package DuckGame_strategy;

public abstract class Duck{
    protected IFlyBehavior flyBehavior;
    protected IQuackBehavior quackBehavior;

    public Duck(){
    }

    public void setFlyBehavior(IFlyBehavior behavior){
        this.flyBehavior = behavior;
    }
    public void setQuackBehavior(IQuackBehavior behavior){
        this.quackBehavior = behavior;
    }

    public abstract void display();

    public void performFly(){
        flyBehavior.fly();
    }

    public void performQuack(){
        quackBehavior.quack();
    }

    public void swim(){
        System.out.println("모든 오리는 물에 뜬다. 고무도 뜬다");
    }
}


