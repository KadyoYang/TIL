# NextJS
> https://nextjs.org/docs

### Getting Started
```
npx create-next-app 
or
Manual Setup 
yarn init -y
yarn add next react react-dom


yarn next dev/ yarn dev 개발모드로 가동
yarn next build / yarn build 프로덕션용으로 빌드
yarn next start / yarn start 프로덕션용 가동
```

### Basic Features
* Pages
```
페이지 관련 두가지 옵션이 있음
Static Generation, Server side rendering
전자는 build타임때 html생성, 후자는 요청이 왔을때 생성
전자가 권장되나 후자가 쓰여져야할 상황이 있음, 적절히 사용해야함, 성능상문제로는 전자가 많이 유리함
그리고 꼭 Page 파일에서만 export 되어져야한다
# Static Generation{
    default로 next는 페이지를 static generation을 사용해서 생성함 아무 데이터도 페칭하지않는
    build타임에 외부에서 미리 패칭받고싶은거는 getStaticProps이나 또는
    pathvariable에 따른 미리 패치하고싶은거 ex) /posts/{id} 역시 getStaticProps써도 되는데 getStaticPaths 도 써야함 
    두 힘수를 async로 쓰고 export

    써야할때 : 생각하기에 이거 유저한테 주기전에 pre render해도 되겠다 싶은것
    - Marketing pages
    - Blog posts
    - E-commerce product listings
    - Help and documentaiton
}

# Server-side Rendering{
    만약 서버사이드렌더링을 사용하면 각각 요청마다 HTML이 생성된다
    async getServerSideProps를 export하면 된다 
    성능이 느리게 되니까 꼭 필요할때만 사용해야한다
}

```