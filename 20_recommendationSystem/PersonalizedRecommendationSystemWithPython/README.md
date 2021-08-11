# 교재 
> Python을 이용한 개인화 추천 시스템 

# 라이브러리 설치
```bash
python -m pip install pandas

```


# 추천 시스템 정확도 측정 
```
데이터에서 일부를 때어낸다 -> test-set
나머지 데이터 -> train-set 으로 test-set에 대한 예측값을 계산한다. 
train-set으로 예측값 계산후 때어놓았던 test-set과 비교 -> 이 차이를 정확도로 본다


가장 많이 사용되는 정확도 지표 RMSE(Root Mean Squared Error)
식은 차이(Error)의 제곱(Squared)의 평균(Mean)의 제곱근(Root)값 

루트씌우고 시그마i=1에서부터 n까지 (yi - y(hat)i)^2 나누기 n