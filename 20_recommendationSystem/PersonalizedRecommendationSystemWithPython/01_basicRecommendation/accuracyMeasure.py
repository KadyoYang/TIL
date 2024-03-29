import numpy as np
import pandas as pd

### 유저정보 가져오기
u_cols = ['user_id', 'age', 'sex', 'occupation', 'zip_code']
users = pd.read_csv("./data/u.user", sep="|", names=u_cols, encoding='latin-1')
users = users.set_index('user_id')
print(users.head())

### 영화정보 가져오기
i_cols = ['movie_id', 'title', 'release date', 'video release date', 'IMDB URL', 'unknown', 
'Action', 'Adventure', 'Animation', 'Children\s', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Fantasy', 'Film-Noir', 'Horror', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'war', 'western']
movies = pd.read_csv("./data/u.item", sep='|', names=i_cols, encoding='latin-1')
movies = movies.set_index('movie_id')
print(movies.head())

### 레이팅평가데이터 가져오기 
r_cols = ['user_id', 'movie_id', 'rating', 'timestamp']
ratings = pd.read_csv("./data/u.data", sep='\t', names=r_cols, encoding='latin-1')
ratings = ratings.set_index('user_id')
print(ratings.head())




### 데이터에서 일부를 때어낸다 -> test-set
### 나머지 데이터 -> train-set 으로 test-set에 대한 예측값을 계산한다. 
### train-set으로 예측값 계산후 때어놓았던 test-set과 비교 -> 이 차이를 정확도로 본다


### 가장 많이 사용되는 정확도 지표 RMSE(Root Mean Squared Error)
### 식은 차이(Error)의 제곱(Squared)의 평균(Mean)의 제곱근(Root)값 

### 루트씌우고 시그마i=1에서부터 n까지 (yi - y(hat)i)^2 나누기 n

def RMSE(y_true, y_pred):
    return np.sqrt(np.mean( (np.array(y_true) - np.array(y_pred))**2 ))

movie_mean = ratings.groupby(['movie_id'])['rating'].mean()
rmse = []
for user in set(ratings.index):
    y_true = ratings.loc[user]['rating']
    y_pred = movie_mean[ratings.loc[user]['movie_id']]
    accuracy = RMSE(y_true, y_pred)
    rmse.append(accuracy)

print(np.mean(rmse))