package src;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class InputData{
    protected static List<Item> items = Arrays.asList(
        new Item("Car"), 
        new Item("Coffe"), 
        new Item("Gun"), 
        new Item("Game"), 
        new Item("Anime"), 
        new Item("Meat"), 
        new Item("Money"));


    public static Map<User, HashMap<Item, Double>> initializeData(int numberOfUsers){
        Map<User, HashMap<Item, Double>> data = new HashMap<>();

        HashMap<Item, Double> newUser;
        Set<Item> newRecommendationSet;

        for(int i = 0; i < numberOfUsers; i++){
            newUser = new HashMap<Item, Double>();
            newRecommendationSet = new HashSet<>();
            for(int j = 0;j<4; j++){
                newRecommendationSet.add(items.get((int) (Math.random() * items.size())));
            }

            for(Item item: newRecommendationSet){
                newUser.put(item, Math.random());
            }

            data.put(new User("User-"+i), newUser);
        }

        return data;
    }
}