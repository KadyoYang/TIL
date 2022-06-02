import {useEffect} from 'react';
import {useRouter} from 'next/router';


export default function Shallow(){
    const router = useRouter();

    useEffect(()=>{
        router.push('/shallow?counter=10', undefined, {shallow: true});
    }, []);


    // useEffect(()=>{
    //     console.log(router.query.counter);
    //     router.push('/shallow?counter=12', undefined, {shallow: true});
    // }, [router.query.counter]);

    
    const inc = () =>{
        var count = Number.parseInt(router.query.counter) + 1;
        router.push('/shallow?counter='+ count, undefined, {shallow: true});
    }
    const dec = () =>{
        var count = Number.parseInt(router.query.counter) - 1;
        router.push('/shallow?counter='+ count, undefined, {shallow: true});
    }
    return(
        <div>
            <h1>{router.query.counter}</h1>
            <button onClick={()=>{inc()}}>inc</button>
            <button onClick={()=>{dec()}}>dec</button>

        </div>
        
        
    )
}