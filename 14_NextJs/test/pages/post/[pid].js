import {useRouter} from 'next/router';


const Post = () => {
    const router = useRouter();
    const {pid, foo} = router.query;
    
    // http://localhost:3000/post/1?foo=bar
    return <p>pid : {pid + " foo : " + foo}</p>
}


export default Post;