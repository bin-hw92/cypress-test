const useDebounce = <Params extends any[]>(callback:(...args: Params) => any, delay:number) => {
    let timer:NodeJS.Timeout;
    return (...args:Params) => {
        //실행한 함수(setTimeout())취소
        clearTimeout(timer);
        //delay가 지나면 callback 함수 실행
        timer = setTimeout(() => callback(...args), delay);
    };
};

export default useDebounce;