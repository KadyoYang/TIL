package DesignPattern.HomeTheater_facade;

import DesignPattern.HomeTheater_facade.machine.*;

public class HomeTheaterFacade {
    Amplifier amp;
    Tuner tuner;
    DvdPlayer dvd;
    CdPlayer cd;
    Projector projector;
    TheaterLights lights;
    Screen screen;
    PopcornPopper popper;

    public HomeTheaterFacade(
        Amplifier amp, 
        Tuner tuner,
        DvdPlayer dvd,
        CdPlayer cd,
        Projector projector,
        TheaterLights lights,
        Screen screen,
        PopcornPopper popper
    ){
        this.amp = amp;
        this.tuner = tuner;
        this.dvd = dvd;
        this.cd = cd;
        this.projector = projector;
        this.lights = lights;
        this.screen = screen;
        this.popper = popper;

    }

    // 기타 메쏘드

    void watchMovie(){
        // 스크린 키고 팝콘 튀기고 등등
    }

    void endMovie(){
        // 스크린 끄고 등등
    }
    
}