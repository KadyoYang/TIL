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
* DataFetching
```
빌드타임 (페이지에서 특정 async getStaticProps 를 export)
서버사이드 (페이지에서 특정 async getServerSideProps 를 export)
클라이언트사이드 (라이브러리 아무거나 가능 swr 추천)

자세한건 test/datafetching 코드 참고

```


### Routing
* Introduction
```
# Routing
pages안에 있는 파일을 페이지로 간주하고 라우팅함
Index routes : index.js 는 해당 디렉토리를 대표하는 페이지로
Nested Routes : 디렉토리 여러개 만들고 할 수 있음
Dynamic route segments : 브라켓 구문을 사용해서 동적 세그먼트를 매칭할 수 있음 ex{
    pages/blog[slug].js -> /blog/:slug (/blog/helloworld)
    pages/[username]/settings.js -> /:username/settings (/foo/settings)
    pages/post/[...all].js -> /post/* (/post/2020/id/title)
}

# 페이지들을 연결하기
Next.js 라우터는 spa와 비슷하게 클라이언트 사이드에서 페이지간 트랜지션을 할 수 있게 해준다
import Link from 'next/link'; <Link href="/boards/posts">
viewport안에 있는 <Link /> 들은 기본적으로 static Generation으로 preFetch 된다(초기 또는 스크롤을 통해서 & 일치하는 데이터를 포함해서 preFetch), 서버렌더링되는 routes의 일치 데이터는 preFetch 되지 않는다(서버렌더링에 만들어지는 동적경로같은거 말하는 듯)
    
* 동적 생성 링크
<Link href={`/blog/${encodeURIComponent(post.slug)}`}>
    <a>{post.title}</a>
</Link>
path의 utf8 compatibility를 위해 encodeURIComponent() 함수를 사용

* 리액트 컴포넌트 안에서 Router 오브젝트에 직접 접근은 useRouter를 사용 
```

* Dynamic Routes
```
복잡한 어플리케이션에서 
미리 정의된 경로를 가지고만 routes를 정의하는것은 충분하지않다!

Next.js에서 브라켓을 이용해서 동적(다이나믹) 라우트를 추가할수있다
aka : url slugs, pretty urls, and others

import {useRouter} from 'next/router';

pages/post/[pid].js
const {pid, name} router.query
-> /post/1?name=nine
```