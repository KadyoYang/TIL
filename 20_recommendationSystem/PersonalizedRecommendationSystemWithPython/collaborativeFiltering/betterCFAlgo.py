# 기본적인 CF 알고리즘
# 모든 사용자 간의 평가 유사도 계산
# 현재 추천 대상이 되는 사람과 다른 사용자의 유사도를 추출
# 현재 사용자가 평가하지않은 모든아이템에대해 유사도가 높은 사용자와의 유사도로 가중해서 평균을 낸다
# 그중 예상 평가값이 가장 높은 N개의 아이템을 추천 

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity


### 유저정보 가져오기
u_cols = ['user_id', 'age', 'sex', 'occupation', 'zip_code']
users = pd.read_csv("./data/u.user", sep="|", names=u_cols, encoding='latin-1')
# users = users.set_index('user_id')
print(users.head())

### 영화정보 가져오기
i_cols = ['movie_id', 'title', 'release date', 'video release date', 'IMDB URL', 'unknown', 
'Action', 'Adventure', 'Animation', 'Children\s', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Fantasy', 'Film-Noir', 'Horror', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'war', 'western']
movies = pd.read_csv("./data/u.item", sep='|', names=i_cols, encoding='latin-1')
# movies = movies.set_index('movie_id')
print(movies.head())

### 레이팅평가데이터 가져오기 
r_cols = ['user_id', 'movie_id', 'rating', 'timestamp']
ratings = pd.read_csv("./data/u.data", sep='\t', names=r_cols, encoding='latin-1')
# ratings = ratings.set_index('user_id')
print(ratings.head())


# timestamp 제거
ratings = ratings.drop('timestamp', axis=1)

# movie ID와 title 빼고 다른 데이터 제거 
movies = movies[["movie_id", "title"]]

# 테스트셋과 트레인셋은 분리해야한다. 
# 테스트셋이 포함된 트레인셋의 평균값으로 테스트셋을 예측하도록한다? 말이 안됨
# sklearn 라이브러리의 model_selection.train_test_split 사용 
x = ratings.copy()
y = ratings['user_id']
# 25퍼센트의 데이터가 x_test에 저장된다
# x_train x_test 에는 데이터가 y_train y_test에는 userId가
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25, stratify=y)


# 정확도 RMSE 계산 
def RMSE(y_true, y_pred):
    return np.sqrt(np.mean((np.array(y_true) - np.array(y_pred))**2))

# 모델별 RMSE 계산 
# 예측모델 model을 가져와서 예측한 예측치의 rmse를 계산
# model 이거 함수
def score(model, neighbor_size=0):
    id_pairs = zip(x_test['user_id'], x_test['movie_id'])
    y_pred = np.array([model(user,movie, neighbor_size) for (user, movie) in id_pairs])
    y_true = np.array(x_test['rating'])
    return RMSE(y_true, y_pred)

# full matrix
rating_matrix = x_train.pivot(index='user_id', columns='movie_id', values='rating')
print(rating_matrix)


# train set의 모든 사용자 pair 의 코사인유사도 계산 
# 풀매트릭스의 NaN 은 0으로 치환 
matrix_dummy = rating_matrix.copy().fillna(0)

# 코사인 상관분석
user_similarity = cosine_similarity(matrix_dummy, matrix_dummy)
print(user_similarity)
user_similarity = pd.DataFrame(user_similarity, index=rating_matrix.index, columns=rating_matrix.index)
print(user_similarity)


# 모든 user의 rating 평균과 영화의 평점편차 계산
# 각 유저마다의 평점의 평균
rating_mean = rating_matrix.mean(axis=1)
print("rating_mean")
print(rating_mean)
# T는 np의 transpose 이런걸 왜 줄여서 해놨을까
rating_bias = (rating_matrix.T - rating_mean).T
print("rating_bias")
print(rating_matrix.T)
print(rating_bias)



def cf_knn_bias(user_id, movie_id, neighbor_size=0):
    if movie_id in rating_bias:
        sim_scores = user_similarity[user_id].copy()
        movie_ratings = rating_bias[movie_id].copy()
        none_rating_idx = movie_ratings[movie_ratings.isnull()].index
        movie_ratings = movie_ratings.dropna()
        sim_scores = sim_scores.drop(none_rating_idx)
        # NeighborSize가 0인경우 기본적으로 전체 가중평균
        if neighbor_size == 0:
            prediction = np.dot(sim_scores, movie_ratings) / sim_scores.sum()
            prediction = prediction + rating_mean[user_id]
        else:
            if len(sim_scores) > 1:
                neighbor_size = min(neighbor_size, len(sim_scores))
                sim_scores = np.array(sim_scores)
                movie_ratings = np.array(movie_ratings)
                user_idx = np.argsort(sim_scores)
                sim_scores = sim_scores[user_idx][-neighbor_size:]
                movie_ratings = movie_ratings[user_idx][-neighbor_size:]
                prediction = np.dot(sim_scores, movie_ratings) / sim_scores.sum()
                prediction = prediction + rating_mean[user_id]
            else:
                prediction = rating_mean[user_id]
    else:
        prediction = rating_mean[user_id]

    return prediction


print(score(cf_knn_bias))


def recom_movie(user_id, n_items, neighbor_size=30):
    user_movie = rating_matrix.loc[user_id].copy()
    for movie in rating_matrix:
        if pd.notnull(user_movie.loc[movie]):
            user_movie.loc[movie] = 0
        else:
            user_movie.loc[movie] = cf_knn_bias(user_id, movie, neighbor_size)
    
    movie_sort = user_movie.sort_values(ascending=False)[:n_items]
    recom_movies = movies.loc[movie_sort.index]
    recoomendations = recom_movies['title']
    return recoomendations

print(recom_movie(user_id=2, n_items=5, neighbor_size=30))