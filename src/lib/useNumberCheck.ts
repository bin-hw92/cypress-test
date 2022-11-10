
//현재 사용 안 함.. 추후에 정리 필요
const useNuberCheck = (value:string) => {
    const newValue = value.replace(/[^0-9]/g, '');
    return newValue;
};

export default useNuberCheck;