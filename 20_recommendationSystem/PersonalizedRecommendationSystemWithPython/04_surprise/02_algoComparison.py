import numpy as np
import surprise




# movie lens 100k 데이터 로딩
data = surprise.Dataset.load_builtin('ml-100k')

# train test 분리
trainset, testset = surprise.model_selection.train_test_split(data, test_size=0.25)



# 알고리즘 비교
algorithms = [surprise.BaselineOnly, surprise.KNNWithMeans, surprise.SVD, surprise.SVDpp]
names = []
results = []

for option in algorithms:
    algo = option()
    names.append(option.__name__)
    algo.fit(trainset)
    predictions = algo.test(testset)
    results.append(surprise.accuracy.rmse(predictions))
names = np.array(names)
results = np.array(results)

# 결과 그래프 표시
import matplotlib.pyplot as plt
index = np.argsort(results)
plt.ylim(0.8, 1)
plt.plot(names[index], results[index])
results[index]
