package DesignPattern.remoteController_command;

public class GarageDoor {
    public void up(){
        System.out.println("차고 문 올라감");
    }
    public void down(){
        System.out.println("차고 문 내려감");
    }
    public void stop(){
        System.out.println("차고 문 멈춤");
    }
    public void lightOn(){
        System.out.println("차고 불 켜짐");
    }
    public void lightOff(){
        System.out.println("차고 불 꺼짐");
    }
    
}