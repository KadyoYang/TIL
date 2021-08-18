import numpy as np
import pandas as pd
import random
from sklearn.utils import shuffle


# csv
r_cols = ['user_id', 'movie_id', 'rating', 'timestamp']
ratings = pd.read_csv('./data/u.data', names=r_cols,  sep='\t',encoding='latin-1')
print(ratings)
ratings = ratings[['user_id', 'movie_id', 'rating']].astype(int)
print(ratings)


# train test set 분리
TRAIN_SIZE = 0.75
ratings = shuffle(ratings, random_state=1)
cutoff = int(TRAIN_SIZE * len(ratings))
ratings_train = ratings.iloc[:cutoff]
ratings_test = ratings.iloc[cutoff:]


# rmse func
def RMSE(y_true, y_pred):
    return np.sqrt(np.mean((np.array(y_true) - np.array(y_pred))**2))


# dummy recommender 0 
def recommender0(recomm_list):
    recommendations = []
    for pair in recomm_list:
        recommendations.append(random.random() * 4 + 1)
    return np.array(recommendations)


# dummy recommender 1
def recommender1(recomm_list):
    recommendations = []
    for pair in recomm_list:
        recommendations.append(random.random() * 4 + 1)
    return np.array(recommendations)


# hybrid 결과 
weight = [0.8, 0.2]
recomm_list = np.array(ratings_test)
predictions0 = recommender0(recomm_list)
predictions1 = recommender1(recomm_list)
predictions = predictions0 * weight[0] + predictions1 * weight[1]
print(RMSE(recomm_list[:, 2], predictions))
