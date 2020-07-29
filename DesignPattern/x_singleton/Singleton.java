package x_singleton;

public class Singleton {
    private static Singleton uniqueInstance;

    private Singleton(){
    }

    /*
    다중스레드에서 getInstance 로 인스턴스 가져갈때 동기화관련해서 문제가 발생할수있어서
    synchronized 를 걸 수 있는데 이렇게 하면 문제는 해결되지만,,
    getInstance의 동작속도가 중요한 프로그램에서는 문제가 될 수 있다....

    만약에 속도가 중요하다하면 
    private static Singleton uniqueInstance = new Singleton();
    이렇게 해줄수있다.
    클래스가 로딩될때 JVM에서 유일한 인스턴스를 만들어 준다.
    */


    public static synchronized Singleton getInstance(){
        if(uniqueInstance == null){
            uniqueInstance = new Singleton();
        }
        return uniqueInstance;
    }
}


    /*
        또는 DCL(Double Checking Locking)을 사용해서 getInstance()에서 동기화 되는 부분을 줄인다

    */
class VolatileSingleton{
    private volatile static VolatileSingleton uniqueInsntance;
    // volatile 키워드는 자바 변수를 메인메모리에 저장하겠다고 명시하는 것이다.
    // 매번 변수의 값을 read write할때마다 CPU cache가 아닌 메인메모리에서 한다.

    /*
    왜 쓰냐.
    다양한 쓰레드에서 하나의 변수를 가져올때 메모리에서 캐시로 저장되서 사용되는데
    각각의 캐시에 저장된 값이 다를수있기때문이다

    하나의 쓰레드가 쓰기읽기하고 나머지 쓰레드가 읽기만 할때 좋다.
    너도나도 쓰고읽기하는거면은 volatile 보다 synchronized 를 사용해서 원자성을 보장하자
    */

    private VolatileSingleton(){}

    public static VolatileSingleton getInstance(){
        if(uniqueInsntance == null){
            synchronized (Singleton.class){
                if(uniqueInsntance == null){
                    uniqueInsntance = new VolatileSingleton();
                }
            }
        }
        return uniqueInsntance;
    }
}