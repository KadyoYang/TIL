package remoteController_command;

public class SimpleRemoteControll {
    Command slot;

    /*
    Command slot[] onCommand;
    Command slot[] offCommand;
    해서 여러 커맨드를 넣어넣고 선택해서 사용하게 할 수 있다.

    처음에 초기화할때 없는 커맨드에는 
    Null 커맨드를 넣어놓고 명령어가 설정되지않았습니다 같은거 출력되게 할 수 있다.
    */

    public void setCommand(Command command){
        slot = command;
    }

    public void buttonWasPressed(){
        slot.execute();
    }
}