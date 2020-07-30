package DesignPattern.remoteController_command;

public class TestDriver {
    public static void main(String[] args){
        SimpleRemoteControll remote = new SimpleRemoteControll();
        Light light = new Light();
        LightOnCommand lightOn = new LightOnCommand(light);

        remote.setCommand(lightOn);
        remote.buttonWasPressed();


        // 차고 문 열기 커맨드 생성
        GarageDoorOpenCommand garageDoorOpen = new GarageDoorOpenCommand(new GarageDoor());
        // 리모트컨트롤러에 전달
        remote.setCommand(garageDoorOpen);
        // 실행
        remote.buttonWasPressed();
    }
}