
export default function StaticProps({testList}){
    return(
        
        <ul>
            <li>흠터레스팅 문구</li>
            <li>build타임에 생성 후후,</li>
            {testList.map((str, key) => (
                <li>{key + " : " + str}</li>
            ))}    
        </ul>
    )
}




export async function getStaticProps(context){
    
    // 데이터를 얻기위해 외부 API 를 호출
    // data fetching 하는 라이브러리 아무거나 다 사용가능
    // const res = await fetch('https://.../posts');
    // const posts = await res.json();

    // return {props:{posts,}}

    let temp = Date.now().toString();
    return {
        props:{
            testList : [
                "Nothing is true", "everything is permitted", temp,
            ],
        },
        revalidate: 3, // in seconds
    }
}