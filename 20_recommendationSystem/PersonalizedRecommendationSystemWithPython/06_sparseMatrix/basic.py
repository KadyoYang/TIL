import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix

ratings = {
    'user_id':[0, 1, 2, 4],
    'movie_id':[24, 24, 13, 10],
    'rating':[4, 3, 5, 2]
    }
ratings = pd.DataFrame(ratings)
print(ratings)

# Pandas Pivot을 이용해서 full matrix로 변환
rating_matrix = ratings.pivot(index = 'user_id', columns='movie_id', values='rating').fillna(0)
print(rating_matrix)

full_matrix1 = np.array(rating_matrix)
print(full_matrix1)
# 아무 데이터도 없는 부분이 많다 

# Sparse matrix를 이용해서 full matrix로 변환

# 레이팅 값 
data = np.array(ratings['rating'])
row_indices = np.array(ratings['user_id'])
col_indices = np.array(ratings['movie_id'])

rating_matrix = csr_matrix((data, (row_indices, col_indices)), dtype=int)
print(rating_matrix)

full_matrix2 = rating_matrix.toarray()
print(full_matrix2)

print(rating_matrix * 2)
print(rating_matrix.T)
print(rating_matrix.dot(rating_matrix.T))