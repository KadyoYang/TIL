
type SortedList<T> = T[] & {_brand : 'sorted'};

function binarySearch<T>(xs: SortedList<T>, x:T) :boolean {
    let low = 0, high = xs.length - 1;

    while(high >= low){
        const mid = low + Math.floor((high - low) / 2);
        const v = xs[mid];
        if(v === x) return true;
        [low, high] = x > v ? [mid+1, high] : [low, mid -1 ];
    }
    return false;
}

function isSorted<T>(xs: T[]): xs is SortedList<T>{
    for(let i = 1; i < xs.length; i++){
        if(xs[i] < xs[i - 1]){
            return false;
        }
    }
    return true;
}

function test(){
    const a = [1,2,3,4,5,6,7];

    if(isSorted(a)){
        console.log(a);
        console.log(binarySearch(a, 2));
        
    }else{
        console.log(a);
        // binarySearch(a, 2);
    }
}

test();