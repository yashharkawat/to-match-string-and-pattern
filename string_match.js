//It returns an array which has contains starting and end index of all tags {{}}  
//also I am putting "/ before all dots in the string"
//These are used in regular expression calculation.
const fun=(string)=>{
    let n=string.length;
    let str="";
    for(let i=0;i<n;i++)
    {
        if(string[i]==='.'){
            str+="\\";
        }
        str+=string[i];
    }
    let k=-1;
    let arr=[];
    for(let i=1;i<str.length-1;i++)
    {
        if(str[i]==='{'&&str[i-1]==='{') k=i-1;
        if(str[i]==='}'&&str[i+1]==='}')
        {
            if(k>=0) 
            {
                arr.push([k,i+1]);
                k=-1;        
            } 
        }

    }
    return [str,arr];
}
//returns all string which has the same pattern as the corresponding string. 
const patternMatch=(mapOfStrings,string)=>{
    let [str,arr]=fun(string);
    let newStr="";
    let k=0;

    arr.forEach((item)=>{
        newStr+=str.slice(k,item[0]);
        newStr+="\\w*";
        k=item[1]+1;
    })
    newStr+=str.slice(k,str.length);
    
    let regEx=new RegExp(`${newStr}`);
    let array=[];

    for(let key in mapOfStrings)
    {
        if(regEx.test(key)) array.push(key);
    }
    return array;
}
// let string="My name is {{name}} ";
// let array={
//     'My name is Raghav ': [],
//     'My name is Yash': [],
//     'My name is Parth': [],
//     'My name is Parth. I am 18 years old': []
// };
// console.log(patternMatch(array,string));