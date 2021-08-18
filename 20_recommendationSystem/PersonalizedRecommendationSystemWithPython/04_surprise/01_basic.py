import numpy as np
import surprise



# movie lens 100k 데이터 로딩
data = surprise.Dataset.load_builtin('ml-100k')

# train test 분리
trainset, testset = surprise.model_selection.train_test_split(data, test_size=0.25)


# 학습
algo = surprise.KNNWithMeans()
algo.fit(trainset)

# 예측 및 rmse 계산
predictions = algo.test(testset)
surprise.accuracy.rmse(predictions)



