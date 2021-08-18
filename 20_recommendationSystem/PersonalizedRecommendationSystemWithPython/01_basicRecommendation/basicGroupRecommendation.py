import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

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

print(x_train.head())
print(x_test.head())
print(y_train.head())
print(y_test.head())


# 정확도 RMSE 계산 
def RMSE(y_true, y_pred):
    return np.sqrt(np.mean((np.array(y_true) - np.array(y_pred))**2))

# 모델별 RMSE 계산 
# 예측모델 model을 가져와서 예측한 예측치의 rmse를 계산
# model 이거 함수
def score(model):
    id_pairs = zip(x_test['user_id'], x_test['movie_id'])
    y_pred = np.array([model(user,movie) for (user, movie) in id_pairs])
    y_true = np.array(x_test['rating'])
    return RMSE(y_true, y_pred)

# train데이터로 Full matrix 구한다
# pandas DataFrame 의 pivot() 메소드로 train-set의 Full matrix를 구한다 
# 사용자 특성정보를 평점데이터에 합칠 필요가 있다
# 합칠려면 일단 평점데이터의 full matrix를 구성해야한다
# full matrix는 현재 그냥 컬럼에 user_id, movie_id, rating 있는 그냥 쭈욱 내려가는 열데이터면은 이거를
# 매트릭스로 행에는 userId 1,2,3,4, 열에는 movie_id 1,2,3,4,5 매트릭스 안에 데이터는 rating 물론 평가 안한것은 NaN으로 설정
rating_matrix = x_train.pivot(index='user_id', columns='movie_id', values='rating')
print(rating_matrix)


# 전체 평균으로 예측값을 계산하는 모델 
# basic.py보다 값이 더 안좋게 나올거다 train-set test-set 나누었기 때문 
def best_seller(user_id, movie_id):
    try:
        rating = train_mean[movie_id]
    except:
        rating = 3.0
    return rating

train_mean = x_train.groupby(['movie_id'])['rating'].mean()
print(score(best_seller))


# 성별로 집단을 나누어서 예측값 계산
# Full matrix를 사용자 데이터와 합병
# pd.merge는 공통된 키를 기준으로 작동 여기서는 user_id
merged_ratings = pd.merge(x_train, users)
users = users.set_index('user_id')
print(merged_ratings)

# Gender별 평점평균
g_mean = merged_ratings[['movie_id', 'sex', 'rating']].groupby(['movie_id', 'sex'])['rating'].mean()
print(g_mean)

# Gender기준 추천
# gender별 평균을 예측값으로 리턴한다
def cf_gender(user_id, movie_id):
    if movie_id in rating_matrix:
        gender = users.loc[user_id]['sex']
        if gender in g_mean[movie_id]:
            gender_rating = g_mean[movie_id][gender]
        else:
            gender_rating = 3.0
    else:
        gender_rating = 3.0
    return gender_rating
print("성별로 추천")
print(score(cf_gender))



# 직업으로 추천
# 직업별 평점 평균
o_mean = merged_ratings[['movie_id', 'occupation', 'rating']].groupby(['movie_id', 'occupation'])['rating'].mean()
def cf_occupation(user_id, movie_id):
    if movie_id in rating_matrix:
        occupation = users.loc[user_id]['occupation']
        if occupation in o_mean[movie_id]:
            rating = o_mean[movie_id][occupation]
        else:
            rating = 3.0
    else:
        rating = 3.0
    return rating
print("직업으로 추천")
print(score(cf_occupation))


# 직업과 성별로 추천 
go_mean = merged_ratings[['movie_id', 'occupation', 'sex', 'rating']].groupby(['movie_id', 'sex', 'occupation'])['rating'].mean()
def cf_occupation_and_gender(user_id, movie_id):
    if movie_id in rating_matrix:
        occupation = users.loc[user_id]['occupation']
        gender = users.loc[user_id]['sex']

        if gender in go_mean[movie_id] and occupation in go_mean[movie_id][gender]:
            rating = go_mean[movie_id][gender][occupation]
        else:
            rating = 3.0
    else:
        rating = 3.0
    return rating
print("둘다로 추천")
print(score(cf_occupation_and_gender))


# 직업 성별 더 안좋게 나오는데 직업 없을때는 성별 평균 떤지게하자
def cf_occupation_and_gender2(user_id, movie_id):
    if movie_id in rating_matrix:
        occupation = users.loc[user_id]['occupation']
        gender = users.loc[user_id]['sex']

        if gender in go_mean[movie_id] and occupation in go_mean[movie_id][gender]:
            if occupation in go_mean[movie_id][gender]:
                rating = go_mean[movie_id][gender][occupation]
            else:
                rating = g_mean[movie_id][gender]
        else:
            rating = train_mean[movie_id]
    else:
        rating = 3.0
    return rating
print("내식대로 고친 추천")
print(score(cf_occupation_and_gender2))