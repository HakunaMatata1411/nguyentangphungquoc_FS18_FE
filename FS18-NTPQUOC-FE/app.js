// // Nguyễn An
// let numberOne=document.querySelector("#number-one")
// let numberTwo=document.querySelector("#number-two")
// let result=document.querySelector("#result")

// // Check number
// numberOne.onclick=() =>{
//   if (numberOne.value < 0) {
//       numberOne.value = 0
//   }
// }
// numberTwo.onclick=() =>{
//   if (numberTwo.value < 0) {
//       numberTwo.value = 0
//   }
// }

// // Caculator
// let btn=document.querySelectorAll("button") //--> element []

// for(const i of btn) {
//   i.onclick=() =>{
//     if (i.id=="btn-sum"){ // +
//       sum= parseInt(numberOne.value)+parseInt(numberTwo.value)
//       result.innerHTML="Result: "+ sum
//     }
//     else if (i.id=="btn-subtract"){
//       sub=parseInt(numberOne.value)-parseInt(numberTwo.value)
//       result.innerHTML="Result: "+ sub
//     }
//     else if(i.id=="btn-multiply"){
//       mul=parseInt(numberOne.value)*parseInt(numberTwo.value)
//       result.innerHTML="Result: "+ mul
//     }
//     else if (i.id=="btn-divide"){
//       div=parseInt(numberOne.value)/parseInt(numberTwo.value)
//       result.innerHTML="Result: "+ div
//     }
//   }
// }

// An

// element caculate
const btn_sum = document.querySelector("#btn-sum")
const btn_subtract = document.querySelector("#btn-subtract")
const btn_multiply = document.querySelector("#btn-multiply")
const btn_divide = document.querySelector("#btn-divide")

// element num
const number_one = document.querySelector("#number-one")
const number_two = document.querySelector("#number-two")

// Element result
const result = document.querySelector("#result")

// Check number
// const checkNum = (numA,numB) =>{
//     if (numA<0 || numB<0 || numA*1!==numA|| numB*1!==numB) {numA=0;numB=0;}
//     return {a:numA,b:numB}
// }

// // caculator
// btn_sum.onclick = () =>{
//     const check = checkNum(number_one.value*1,number_two.value*1)
//     result.innerText = check.a + check.b
// }
// btn_subtract.onclick = () =>{
//     const check = checkNum(number_one.value*1,number_two.value*1)
//     result.innerText = check.a - check.b
// }
// btn_multiply.onclick = () =>{
//     const check = checkNum(number_one.value*1,number_two.value*1)
//     result.innerText = check.a * check.b
// }
// btn_divide.onclick = () =>{
//     const check = checkNum(number_one.value*1,number_two.value*1)
//     if(check.b === 0) check.b = 1
//     result.innerText = check.a / check.b
// }

// 
// let btn=document.querySelectorAll(".btn")
// console.log(btn);
// for (let i = 0; i < btn.length; i++) {
//     btn[i].onclick = function (e){
//         let math = e.target.innerText
//         switch (math) {
//             case (+):
                
//                 break;
//                 case - :
                
//                 break;
//             default:
//                 break;
//         }
//         console.log();
//     }
   
    
// }
// btn.forEach((element)=>{
//    element.onclick = function(e){
//     console.log(e.target.innerText);
//    }
// })

// Long

let arrBtn = document.querySelectorAll('.action .btn');
let getResult = document.getElementById('result');
arrBtn.forEach(element => {
    element.onclick = () => {
        let numOne = parseFloat(document.getElementById('number-one').value);
        let numTwo = parseFloat(document.getElementById('number-two').value);
        if(isNaN(numOne) || isNaN(numTwo))//false
            getResult.innerText = 'Error';
        else  // true
        {
            let result = 'Result:';
            switch (element.id)
            { 
                case 'btn-sum': //+
                    result += `${numOne + numTwo}`;
                    break;
                case 'btn-subtract': //-
                    result += `${numOne - numTwo}`;
                    break;
                case 'btn-multiply': // *
                    result += `${numOne * numTwo}`;
                    break;
                default :
                    if(numTwo === 0) 
                        result += 'Error';
                    else 
                        result += `${numOne / numTwo}`;
                    break;
            }
            getResult.innerText = ` ${result}`;
        }    
    }   
    return;
});