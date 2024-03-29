# 쿼리 문서

## Qeury on Embedded/Nested Documents

- 테스트 데이터를 입력

```js
// 먼저 테스트 데이터를 입력
await db.collection("inventory").insertMany([
  {
    item: "journal",
    qty: 25,
    size: { h: 14, w: 21, uom: "cm" },
    status: "A",
  },
]);
```

- Match an embedded/Nested Document

```js
// {field:value} 식으로 쿼리
// 다음 쿼리는 size 필드가 {h:14, w:21, uom:"cm"} 인 것을 쿼리한다
const cursor = db.collection("inventory").find({
  size: { h: 14, w: 21, uom: "cm" },
});

// 동등 검사는 진짜로 value가 일치하는지 본다, field order 도 포함해서!!!!!!!
const cursor = db.collection("inventory").find({
  size: { h: 14, w: 21, uom: "cm" },
});
const cursor = db.collection("inventory").find({
  size: { uom: "cm", h: 14, w: 21 },
});
// 두 쿼리는 다른 놈이다
```

- nestedField 에 동등검사 & queryOperator 사용 & AND Condition

```js
const cursor = db.collection("inventory").find({
  "size.uom": "in",
});
// dot notation 들어가면 문자열로 해야하는게 상당히 불편하단 말이지 스아아....

// Query Operator를 사용해볼까?
// 문법은 다음과 같다
// {<Field> : {<Operator> : <Value>}, ...}
const cursor = db.collection("inventory").find({
  "size.h": { $lt: 15 },
});

// AND 다음에서는 $and 안해도 된다
const cursor = db.collection("inventory").find({
  "size.h": { $lt: 15 },
  "size.uom": "in",
  status: "D",
});
// 사이즈h가 15보다 작고 size.uom이 in이고 status 가 D 인 다큐먼트를 가져와랏!
```

<br />
<hr />
<br />

## Query an Array

```ts
// test 데이터 넣기 좀 그러니까 그냥 타입으로 하자
type DATA = {
  item: string;
  qty: number;
  tags: Array<string>;
  dim_cm: Array<number>;
};
```

- Match an Array

```js
const cursor = db.collection("inventory").find({
  tags: ["red", "blank"],
});
// 이랑
const cursor = db.collection("inventory").find({
  tags: ["blank", "red"],
});
// 은 다르다 절대로 다르다 다르다 다르다 다르다
// 어레이 엘레먼트 순서도 보고 암튼 완전히 똑같아야한다

// 대신에 단순히 "red"랑 "blank" 를 포함하는지, 순서나 다른 엘레먼트의 유무 상관없이
// $all 오퍼레이터를 사용하면 된다
const cursor = db.collection("inventory").find({
  tags: { $all: ["red", "blnak"] },
}); // 이러면 red, blank 든지 blank, red 든지 red, blank, plain, someshit이든지 다 검색 됨 허헣
```

- Query an Array for an Element

```js
// 어레이 필드에 적어도 하나의 엘레먼트가 제공한 value 에 맞는게 있는지 쿼리하려면
// {<filed> : value} 하면 된다 value는 element value이다
const cursor = db.collection("inventory").find({
  tags: "red",
}); // tags Array의 elemnt가 red인것 하나만 있어도 그 document를 반환한다
// plain을 가지고 있는 놈은 하나밖에 없어서 plain을 쿼리하면 하나만 반환하네

// operator도 적용할 수 있는데
// 다음 쿼리는 dim_cm 어레이 안에 있는 엘레먼트중 단 하나라도 25보다 크면 반환한다
const cursor = db.collection("inventory").find({
  dim_cm: { $gt: 25 },
}); // 아니 그러면 $elemMatch 랑 다른게 뭔데 진짜!!!!!!!!!!!!!으아아아악 답을 줘 답을...왜 전부 보여주지않는거야..
```

- Specify Multiple Conditions for Array Elements

```js
// Query an Array with Compound Filter Conditions on the Array Elements
// 배열 element에 대한 복합 필터 조건으로 배열 쿼리
// dim_cm 배열이 주어진 콤비네이션 조건을 만족하는 element를 포함할때
const cursor = db.collection("inventory").find({
  dim_cm: { $gt: 15, $lt: 20 },
});
// element 중에 하나라도 gt: 15를 만족해야하고
// element 중에 하나라도 lt: 20을 만족해야한다
// EX) 14, 21, 70 일때
// {dim_cm: { $gt: 60, $lt: 13 }} 이면 검색 안된다 왜냐하면 13 아래인 놈이 없기때문에
// {dim_cm: { $gt: 60, $lt: 15 }} 이면 검색 검색 된다

// Query for an Array Element that meets Multipe criteria
// 여러 기준을 충족하는 배열 element에 대한 쿼리
// 명시한 여러 조건을 적어도 하나의 element 가 충족하는 지 쿼리하려면 $elemMatch를 사용해라
const cursor = db.collection("inventory").find({
  dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } },
});
// 주어진 조건을 다 만족하는 element가 하나라도 있어야한다
// dim_cm = [14, 21, 70] 일때
// {dim_cm: { $elemMatch: { $gt: 65, $lt: 40 } }} 하면 안걸린다 65이상이면서 40보다 작은것은 number값은 없어 이 3차원 세계에
// {dim_cm: { $elemMatch: { $gt: 60, $lt: 72 } }} 하면 걸린다 70 하나 가지고 있는
```

- Additional Query Tutorials

```js
// 특정한 배열 엘레먼트에 대한 쿼리
const cursor = db.collection("inventory").find({
  "dim_cm.1": { $gt: 25 },
});
// dim_cm 배열의 두번째 엘레먼트가 25보다 큰지

// 배열 크기에 대한 쿼리
const cursor = db.collection("inventory").find({
  tags: { $size: 3 },
}); // tags 배열 크기가 3인 것을 조회
```

<br />
<hr />
<br />

## Query an Array of Embedded Documents

- Example data

```js
// 이 부분은 중첩객체 Array에 대한 쿼리를 알려줍니다
const inventoryCollection = [
  {
    item: "journal",
    instock: [
      { warehouse: "A", qty: 5 },
      { warehouse: "C", qty: 15 },
    ],
  },
  { item: "notebook", instock: [{ warehouse: "C", qty: 5 }] },
  {
    item: "paper",
    instock: [
      { warehouse: "A", qty: 60 },
      { warehouse: "B", qty: 15 },
    ],
  },
  {
    item: "planner",
    instock: [
      { warehouse: "A", qty: 40 },
      { warehouse: "B", qty: 5 },
    ],
  },
  {
    item: "postcard",
    instock: [
      { warehouse: "B", qty: 15 },
      { warehouse: "C", qty: 35 },
    ],
  },
];
```

- Query for a Document Nested in an Array

```js
// 다음 예제는 instock array안의 엘레먼트가 주어진 document와 일치하는 다큐먼트를 리턴
const cursor = db.collection("inventory").find({
  instock: { warehouse: "A", qty: 5 },
});
// 동등검사기 때문에 {warehouse : "A", qty: 5} 하고 완전히 일치하는 엘레먼트 있으면 리턴
// {qty:5, warehouse: "A"} 처럼 순서 뒤바뀌어버리거나 그러면 조회 안됨
```

- Specify a Query Condition on a Field in an Array of Documents

```js
// 어레이 엘레먼트 다큐먼트의 특정 필드의 index position을 모를경우 다음과 같이 할 수 있다
// dot notation을 사용

// 다음 예제는 qty 필드가 20보다 작은 값을 가지고 있는 엘레먼트가 instock 어레이에 적어도 하나가 있을 경우를 조회한다
const cursor = db.collection("inventory").find({
  "instock.qty": { $lte: 20 },
});

// 배열의 특정 index의 필드의 값을 처리
const cursor = db.collection("inventory").find({
  "instcok.0.qty": { $lte: 20 },
});
```

- Specify Multiple Conditions for Array of Documents

```js
// 진짜 개복잡하네 정말로!!!
// 원본 description
// When specifying conditions on more than one field nested in array of documents,
// you can specify the query such that either a single document meets these condition
// or any combination of documents(including a single document) in  the array meets the conditions

// instock array 가 적어도 하나의 내장 document를 포함하는지 그 내장 document는 필드 두개 다
// qty 가 5이고 warehouse 가 A여야한다
const cursor = db.collection("inventory").find({
  instock: { $elemMatch: { qty: 5, warehouse: "A" } }, // qty warehouse의 필드 순서는 상관없다
});
// instock 어레이 안에 있는 엘레먼트중 하나가 qty가5이고 warehouse가 A이면 만족한다

// 다음 쿼리는 instock 어레이 안에 내장 document 중 하나라도 qty 가 10보다 크고 20보다 작거나 같으면 만족한다
const cursor = db.collection("inventory").find({
  instock: { $elemMatch: { qty: { $gt: 10, $lte: 20 } } },
});

// 실험으로 다음을 해보았더니
const query = {
  instock: { $elemMatch: { $or: [{ qty: { $lt: 6 } }, { qty: { $gt: 14 } }] } },
};
// 6이하거나 14이상인것이 하나라도 있으면 리턴하는듯
```

- Combination of Elements Satisfies the Criteria

```js
/*!SECTION
만약에 어레이 필드에 대한 합성 쿼리 컨디션이 $elemMatch 오퍼레이터를 사용하지않으면
쿼리는 해당 컨디션을 만족하는 조합을 가지는 어레이의 document를 반환
*/
const cursor = db.collection('inventory').find({
    'instock.qty' : {$gt: 10, %lte: 20}
})
// qty [{warehouse:"A", qty: 5}] 인것은 조회 안된다 gt:10 인 것이 없기때문
// qty [{warehouse:"A", qty: 11}, {warehouse:"A", qty: 15}] 는 조회된다
// qty [{warehouse:"A", qty: 5}, {warehouse:"A", qty: 80}] 는 조회된다

//{'instock.qty': { $gt: 14, $lte: 6 }}
// 이거는 아마 이렇게 동작하는듯
// instock.qty 중에 14보다 큰게 있나?
// instock.qty 중에 6보다 작은게 있나?
// 둘다 있으면 리턴


// 다음 쿼리는 instock 어레이에서 주어진 조건을 확인하는데
// qty 가 5 인것이 있어야한다
// warehouse A 인것이 있어야한다
// 똑같은 element에서 만족할 필요없다
const cursor = db.collection('inventory').find({
    'instock.qty' : 5,
    'instock.warehouse' : 'A'
})
// instock : [{qty: 5, warehouse: "B"}, {qty:99, warehouse:"A"}] 가 검색이 된다는 것이다
```

<br />
<hr />
<br />

# Array 에 대한 섭리를 느낄 수 있다 다른 링크

`https://www.mongodb.com/community/forums/t/difference-between-elemmatch-and-by-querying-with-dot-notation/12079`

```ts
const example = [
{ _id : 1 , array : [ { a : 1 , b : 2 } , { a : 3 , b : 3 } ] }
{ _id : 2 , array : [ { a : 1 , b : 3 } , { a : 3 , b : 4 } ] }
]

find( { array.a : 1 , array.b : 3 }) // 두개 다 조회할것
// 막 array.a 돌면서 1인거 있냐? 있다!
// 막 array.b 돌면서 3인거 있냐? 있다!
// 그러면 리턴

find( { array : { $elemMatch : { a:1, b:3 }}} ) // _id 2인것을 조회할것
find( { array : { $elemMatch : { b:3, a:1 }}} ) // _id 2인것을 조회할것
// elemMatch를 쓰면 필드순서따위는 생각 안하는듯
// 밑에 있는 예제는 필드 순서를 신경쓰네 ㅎㅎ

find( { array : {a:1, b:3}} ) // {a:1, b:3} 인 element가지고 있는 id:2만 조회할것
find( { array : {b:3, a:1}} ) // 이렇게 하면 객체안에 필드 순서 맞는게 없기때문에 아무것도 조회못함

// 어느정도 섭리가 느껴진다
```

# 추가 자료

`I need to match all documents where every element of an array matches some predicate. Can that be done?`
http://www.askasya.com/post/matchallarrayelements/

```js
const testSet = [
    {
      "_id": {"$oid": "644244ee3977e2e1b57332ce"},
      "order": [
        {"status": "A", "qty": 7},
        {"status": "B", "qty": 2},
        {"status": "C", "qty": 1}
      ]
    },
    {
      "_id": {"$oid": "644244ee3977e2e1b57332cd"},
      "order": [
        {"status": "A","qty": 10},
        {"status": "B","qty": 7}
      ]
    }
]

{$nor:[   {"order.status":"C"}    ]}
{$nor:[   {"order.status":{$in: ["C"]}}    ]}
// order<Array>.status
// status에 C 가 없는 것만 리턴해준다

// 음 elemMatch를 쓸거면 Array : {$elemMatch} 로 해야하고
// 그냥 dotNotation으로 할거면 Array.column 으로 해야하나보다

{"order.status": {$in: ["A", "B"]}}
// A랑 B만 있으면 C가 있든 D가 있든 다 가져온다
// {"order": {status : {$in: ["A", "B"]}}}
// 이거는 동작을 안하는데 no result다 이거는 동작안한다

{"order.status": {$nin: ["A", "B"]}}
// 아무것도 안가져온다
// 내가 테스트로 넣은 데이터에는 A, B가 다 있기때문
// {"order": {status: {   $nin: ["A", "B"]}}}
// 이것도 아무것도 안가져온다 위에있는거랑 문법적으로 다를게 없어보이기도하고..
// 이것도 동작안한다


{"order" : {$elemMatch: {status: {$nin: ["A", "B"]}}}}
// A 랑 B 이외의 것이 하나라도 있는게 element에 있으면 반환한다
// C 가 포함된 element가 있는 document를 리턴
// 동작가정::내생각::order를 하나씩 도는데, order[n]status 가 [A, B] 에 없는게 있으면 리턴하라
// {"order.status" : {$elemMatch: {$nin: ["A", "B"]}}}
// 이거는 작동을 안해 아무것도 결과 안줘 그냥 order에다가 elemMatch를 해야겠다

// 위에 있는 쿼리를 negate 하면
{"$nor": [{"order" : {$elemMatch: {status: {$nin: ["A", "B"]}}}}]}
// A, B 이외의 값이 있는것이 있으면 반환하지않는다 오직 A, B 만이다
// 우리가 원하던 쿼리


```
