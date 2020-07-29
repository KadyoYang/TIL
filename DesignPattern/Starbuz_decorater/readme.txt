데코레이터 패턴은 객체에 추가 요소를 동적으로 더할 수 있다
데코레이터를 사용하면 서브 클래스를 만드는 경우에 비해 훨씬 유연하게 
기능을 확장할 수 있다.

자바의 대부분의 io가 데코레이터 패턴
new BufferedInputStream(new FileInputStream("a.txt"));