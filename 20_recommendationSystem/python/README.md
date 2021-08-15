# PYTHON

### 리스트
```python
[] # 빈 리스트
[1, 2, 3, "sad"]
# 다른 자료형도 이렇게 들어갈 수 있음 
```

### 논리연산
```python
and or not
```


### 시퀀스 자료형
```python

# 순서가 있는 자료형
# String , List가 포함
a = "String" #문자열 
b = ["A", "B", "C"] #리스트
c = (1,2,3,4) #튜플

# 순서가 있으면 
# 인덱싱 슬라이싱이 가능
a = "once"
b = ['a', 'b', 'c', 'd', 'e']
print(a[1]) # n
print(b[2:4]) # ['c', 'd']
a[-1] # e 뒤에서 1번째 원소
b[:3] # 처음부터 3번째까지 슬라이싱 

# 멤버조회도 가능
print('o' in a) # true
# length도 가능
len(a)
# 이어붙이기 연산도 가능 
c = a + b 
```

### 딕셔너리
```
Map하고 똑같고 json하고 똑같다 
```

### 함수
```python
# 파이썬 규약은 스네이크 
def my_test_func(a, b):
    return a+b
```


### 모듈
```python
# a.py 에다가 적절한 유틸함수 넣고 
import a
# 모듈 임포트
```

### 패키지 
```python
모듈을 폴더단위로 구분하여 관리하는것
ex ) import a.b
```


### Numpy
```python
"""
파이썬에서 대규모 다차원 배열을 다룰수 있게 해주는 라이브러리

"""

import numpy as np

test = np.array(range(5))
# 이것의 타입은
print(type(test)) # class 'numpy.ndarray'
# 파이썬 리스트와 달리 한가지 데이터 타입만 저장가능
test = np.array([0,1,2,3], dtype=float)
test.astype(int)

### 인덱싱
x = np.arange(5)
print(x) # [0 1 2 3 4]
print(x[1]) # 1

x = np.arange(1,13,1)
x.shape = 3,4
print(x[2,3]) # 12


### 슬라이싱
x = np.arange(5)
# [0 1 2 3 4]

print(x[1:4]) # 123
print(x[::2]) # 0 2 4 

x = np.arange(1,13,1)
x.shape = 3,4

print(x[1:2, :2:3])
print(x[1:, :2]) # 행 1번째부터 끝까지 열 2번째 전까지 


### Boolean Mask
x = np.arange(7)
print(x < 3) # True True Ture False False False....

### Boolean Indexing
x = np.arange(1,30,4)
print(x)
print(x[x<5])
print(x[x%2 == 0])

### Fancy indexing 
# 인덱스 배열을 전달해서 그거 가져와라
print(x[[0,1,2]]) # 1,5,9
```

### Pandas
```python
# 구조화된 데이터를 효과적으로 처리, 저장
# Array 계산에 특화된 Numpy를 기반으로 설계 

# Series
# Numpy의 array가 보강된 형태
# Data와 Index를 가지고있음
import pandas as pd
data = pd.Series([1,2,3,4])
print(data) # 자체 인덱스가 있기때문에 인덱스 0,1,2,3 나오고 데이터 1,2,3,4

# Series는 값(values)를 numpy.ndarray 형태로 가지고 있음
data = pd.Series([1,2,3,4], index=['a', 'b', 'c', 'd'])
data['c'] = 5 # 이런식으로 인덱스 따로 설정 가능 

# Dictionalry를 활용하여 Series생성 가능
dic = {
    'a' : 100, 
    'b' : 200,
    'c' : 150,
    'd' : 230
}
test = pd.Series(dic) #인덱스는 딕셔너리 키 


# DataFrame 
# 여러개의 Series가 모여서 행과 열을 이룬 데이터
gdp_dict = {
    'korea' : 1111,
    'japan' : 2222, 
    'usa' : 3333
}

gdp = pd.Series(gdp_dict)

# 인구 는 생략
country_dat = pd.DataFrame({
    'gdp' : gdp,
    'population': population
})

# 딕셔너리 통체로 DataFrame생성 가능
data = {
    'country' : ['korea', 'japan', 'usa'],
    'gdp' : [1,2,3],
    'pop' : [5,6,7]
}

country = pd.DataFrame(data)
country = country.set_index('country')


# 데이터 선택 
# .loc 명시적인 인덱스를 참조하는 인덱싱/슬라이싱
country.loc['korea'] # 한국의 gdp, pop
country.loc['japan':'usa', :'pop'] # 일본, 미국, gdp, pop

# .iloc 숫자로
country.iloc[0] # 한국의 gdp, pop
country.iloc[1,3, :2] # 일본 미국 gdp pop

country['gdp'] # 국가gdp Series 형태로
country[['gdp']] # 국가 gdp DataFrame형태 온전하게 


country[country['pop'] < 1000] # masking연산 DataFrame 리턴
country.query("pop > 1000") # query함수 활용 DataFrame 리턴 

# 시리즈 연산 및 DF에 컬럼 추가 
gdp_per_capita = country['gdp'] / country['pop']
country['gdp per capita'] = gdp_per_capita

# 데이터 수정
df = pd.DataFrame(columns = ['name', 'age', 'add'])
df.loc[0] = ['john', 22, 'usa']
df.loc[1] = {'name' : "dua", 'age' : 30, 'add':'cro'}
df.loc[0, 'name'] = 'riley'

df['call'] = np.nan # 새로운 컬럼 추가 및 초기화
df.loc[0, 'call'] = '01022223333'

df.drop('call', axis=1, inplace=True) # inplace 원본 변경할거냐? axis = 1 열방향으로 지울거다 컬럼 
```


### The Deep Pandas
```python

# 인덱스 정렬
df.sort_index(axis=0) # 행 인덱스 기준으로 정렬 
df.sort_index(axis=1, ascending=False) # 열 컬럼이름 기준으로 정렬 name, age 요거 자체가 사전순으로 내림차순으로 된다 

# 값 정렬
df.sort_values('age', ascending=True) # 오름차순으로 나이컬럼 기준으로 정렬 
df.sort_values(['age', 'name'], ascending=True) # 오름차순으로 나이컬럼 기준으로 정렬 그다음 이름기준으로 정렬 

# 그외 count min max sum 함수 등등 사용 가능 

# nan 값 대체 
df['math'] = df['math'].fillna(20)

# 조건부 집계
groupby
df.groupby('key').sum()
df.groupby(['key', 'data']).sum()

# 묶인거를 기준으로 저 람다함수 적용한다
df.groupby('key').apply(lambda x: x.max() - x.min())

# 묶인거를 key로 조회해서 가져올수 있다
df.groupby("시도").get_group("충남)

```