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

### 인기순 추천 best-seller
def recom_movie1(n_items):
    movie_sort = movie_mean.sort_values(ascending=False)[:n_items]
    recom_movies = movies.loc[movie_sort.index]
    recommendation = recom_movies['title']
    return recommendation;

def recom_movie2(n_items):
    return movies.loc[movie_mean.sort_values(ascending=False)[:n_items].index]['title']


movie_mean = ratings.groupby(['movie_id'])['rating'].mean()
print("### 무비id로 groupby한 영화 레이팅 평균 ")
print(movie_mean.sort_values(ascending=False).head(5))

print("### 인기제품 추천방식")
print(recom_movie1(5))