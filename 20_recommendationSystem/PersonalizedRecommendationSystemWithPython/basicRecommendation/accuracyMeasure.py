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