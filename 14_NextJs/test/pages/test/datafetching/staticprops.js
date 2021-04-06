
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



/*
# context 파라미터는 다음의 키를 가지고있는 객체다
params :  contains the route parameters for pages using dynamic routes. For example, if the page name is [id].js , then params will look like { id: ... }. To learn more, take a look at the Dynamic Routing documentation. You should use this together with getStaticPaths, which we’ll explain later.
preview : is true if the page is in the preview mode and undefined otherwise. See the Preview Mode documentation.
previewData : contains the preview data set by setPreviewData. See the Preview Mode documentation.
locale : contains the active locale (if enabled).
locales : contains all supported locales (if enabled).
defaultLocale : contains the configured default locale (if enabled).


# getStaticProps는 다음 오브젝트를 리턴해야한다
props : A required object with the props that will be received by the page component. It should be a serializable object
revalidate : An optional amount in seconds after which a page re-generation can occur. More on Incremental Static Regeneration
notFound : An optional boolean value to allow the page to return a 404 status and page. Below is an example of how it works
redirect - An optional redirect value to allow redirecting to internal and external resources. 
*/
export async function getStaticProps(context){
    
    // 데이터를 얻기위해 외부 API 를 호출
    // data fetching 하는 라이브러리 아무거나 다 사용가능
    // const res = await fetch('https://.../posts');
    // const posts = await res.json();

    // return {props:{posts,}}
    return {
        props:{
            testList : [
                "Nothing is true", "everything is permitted",
            ],
        }
    }
}