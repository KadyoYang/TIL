package remoteController_command;

public class GarageDoorOpenCommand implements Command{
    GarageDoor garageDoor;
    public GarageDoorOpenCommand(GarageDoor garageDoor){
        this.garageDoor = garageDoor;
    }

    @Override
    public void execute() {
        // TODO Auto-generated method stub
        this.garageDoor.lightOn();
        this.garageDoor.up();
        this.garageDoor.stop();
    }
    
}