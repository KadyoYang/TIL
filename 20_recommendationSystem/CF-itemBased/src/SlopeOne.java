package src;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

public class SlopeOne {

    private static Map<Item, Map<Item, Double>> diff = new HashMap<>();
    private static Map<Item, Map<Item, Integer>> freq = new HashMap<>();

    private static Map<User, HashMap<Item, Double>> inputData;
    private static Map<User, HashMap<Item, Double>> outputData = new HashMap<>();

    public static void slopeOne(int numberOfUsers){
        inputData = InputData.initializeData(numberOfUsers);
        
        System.out.println("Slope One - Before the Predication");
        buildDifferencesMatrix(inputData);

        System.out.println("Slope One - With Predication");
        predict(inputData);
    }

    private static void buildDifferencesMatrix(Map<User, HashMap<Item, Double>> data){
        // 유저를 순회한다.
        for(HashMap<Item, Double> users : data.values()){
            
            // 특정 유저의 평가데이터 순회
            for(Entry<Item, Double> evaluation : users.entrySet()){
                if(!diff.containsKey(evaluation.getKey())){
                    diff.put(evaluation.getKey(), new HashMap<Item, Double>());
                    freq.put(evaluation.getKey(), new HashMap<Item, Integer>());
                }


                for(Entry<Item, Double> evaluation2 : users.entrySet()){
                    int oldCount = 0;
                    if(freq.get(evaluation.getKey()).containsKey(evaluation2.getKey())){
                        oldCount = freq.get(evaluation.getKey()).get(evaluation2.getKey()).intValue();
                    }

                    double oldDiff = 0.0;
                    if(diff.get(evaluation.getKey()).containsKey(evaluation2.getKey())){
                        oldDiff = diff.get(evaluation.getKey()).get(evaluation2.getKey()).doubleValue();
                    }
                    // 각 컬럼마다의 차 평균을 구하기 위해!
                    // 현재행 현재열 - 열(0~n)
                    // 그리고 모든 연산뒤에 밑에 평균 나누기 위해 count도 1 증가
                    double observedDiff = evaluation.getValue() - evaluation2.getValue();
                    freq.get(evaluation.getKey()).put(evaluation2.getKey(), oldCount+1);
                    diff.get(evaluation.getKey()).put(evaluation2.getKey(), oldDiff + observedDiff);
                }
            } 
        }

        // 평균으로 계산해서 diff에 다시 put
        for(Item j : diff.keySet()){
            for(Item i : diff.get(j).keySet()){
                double oldValue = diff.get(j).get(i).doubleValue();
                int count = freq.get(j).get(i).intValue();
                diff.get(j).put(i, oldValue / count);
            }
        }
        printData(data);

    }

    private static void predict(Map<User, HashMap<Item, Double>> data){
        HashMap<Item, Double> uPred = new HashMap<Item, Double>();
        HashMap<Item, Integer> uFreq = new HashMap<Item, Integer>();

        for(Item j : diff.keySet()){
            uFreq.put(j, 0);
            uPred.put(j, 0.0);
        }

        for(Entry<User, HashMap<Item, Double>> evaluation : data.entrySet()){
            for(Item j : evaluation.getValue().keySet()){
                for(Item k : diff.keySet()){
                    try{
                        double predictedValue = diff.get(k).get(j).doubleValue() + evaluation.getValue().get(j).doubleValue();
                        double finalValue = predictedValue * freq.get(k).get(j).intValue();
                        uPred.put(k, uPred.get(k) + finalValue);
                        uFreq.put(k, uFreq.get(k) + freq.get(k).get(j).intValue());
                    }catch(NullPointerException e1){

                    }
                }
            }

            HashMap<Item, Double> clean = new HashMap<Item, Double>();

            for(Item j : uPred.keySet()){
                if(uFreq.get(j) > 0){
                    clean.put(j, uPred.get(j).doubleValue() / uFreq.get(j).intValue());
                }
            }

            for(Item j : InputData.items){
                if(evaluation.getValue().containsKey(j)){
                    clean.put(j, evaluation.getValue().get(j));
                }else if(!clean.containsKey(j)){
                    clean.put(j, -1.0);
                }
            }
            outputData.put(evaluation.getKey(), clean);
        }

        printData(outputData);


    }




    private static void printData(Map<User, HashMap<Item, Double>> data){
        for(User user : data.keySet()){
            System.out.println(user.userName + ":");
            print(data.get(user));
        }
    }

    private static void print(HashMap<Item, Double> hashMap){
        NumberFormat formatter = new DecimalFormat("#0.000");
        
        for(Item item : hashMap.keySet()){
            System.out.println(" " + item.itemName + " --> " + formatter.format(hashMap.get(item).doubleValue()));
        }
    }
}
