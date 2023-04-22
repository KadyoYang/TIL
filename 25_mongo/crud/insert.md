# Insert Methods

- 몽고DB는 컬렉션에 데이터 입력을 위해 다음 두개 메소드를 지원한다

```ts
db.collection.insertOne(); // Inserts a single document into a collection
db.collection.insertMany(); // Inserts multiple documents into a collection
```

- 다음 메소드들도 특정한 상황일때 새로운 document를 collection에 입력하는 동작을 한다

```ts
db.collection.updateOne(); // upsert: true 로 호출했을때
db.collection.updateMany(); // upsert: true 로 호출했을때

db.collection.findAndModify(); // upsert: true 로 호출했을때
db.collection.findOneAndUpdate(); // upsert: true 로 호출했을때
db.collection.findOneAndReplace(); // upsert: true로 호출했을때
db.collection.bulkWrites();
```
