package DesignPattern.Duck_adapter;

public class TurkeyAdapter implements Duck{

    private Turkey turkey;
    public TurkeyAdapter(Turkey turkey){
        this.turkey = turkey;
    }

    @Override
    public void quack() {
        // TODO Auto-generated method stub
        this.turkey.gobble();

    }

    @Override
    public void fly() {
        // TODO Auto-generated method stub
        for(int i = 0; i < 5; i++){
            this.turkey.fly();
        }
    }
    
}