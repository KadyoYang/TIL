package DesignPattern.WeatherORama_observer;

public class WeatherStation {
    public static void main(String[] args){
        WeatherData weatherData = new WeatherData();

        CurrentConditionsDisplay currentConditionsDisplay = new CurrentConditionsDisplay(weatherData);
        // StatisticsDisplay staticticsDisplay = new StatisticsDisplay(weatherData);
        // ForcastDisplay forcastDisplay = new ForcastDisplay(weatherData);

        weatherData.setMeasurements(80, 56, 30.4f);
        weatherData.setMeasurements(30, 50, 20.5f);
        weatherData.setMeasurements(20, 30, 30.9f);
        
    }
    
}