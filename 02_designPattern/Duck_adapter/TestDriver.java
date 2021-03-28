package DesignPattern.Duck_adapter;

public class TestDriver {

    public static void main(String[] args){
        Duck mallardDuck = new MallardDuck();
        Turkey wildTurkey = new WildTurkey();

        mallardDuck.quack();
        mallardDuck.fly();

        wildTurkey.gobble();
        wildTurkey.fly();

        // 덕객체가 모자라서 터키 객체를 대신 써야한다.
        // 어댑터를 만들어서 사용하자
        TurkeyAdapter testDuck = new TurkeyAdapter(wildTurkey);

        // 오리의 탈을 쓴 칠면조
        testDuck.quack();
        testDuck.fly();

    }
}