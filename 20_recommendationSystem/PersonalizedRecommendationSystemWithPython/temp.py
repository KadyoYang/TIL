import numpy as np
import pandas as pd


df = pd.DataFrame({
    "name" : ["a", "b", "c", "d"],
    "age" : [10, 20, 30, 40],
    "level" : [1,2,3,4]

})

print(df)
print(df.loc[1, 'age'])
print(df['age'])

dfnparray = np.array(df)
print(dfnparray)
print(dfnparray[0])
print(dfnparray[1][1])