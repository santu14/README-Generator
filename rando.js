const numArray = [1, 2, 3];
const num = 1;


const elemetInArray = () => {
    for(i = 0; i < numArray.length; i++){
        if (numArray[i] === num){
            return true;
        }
    }
};