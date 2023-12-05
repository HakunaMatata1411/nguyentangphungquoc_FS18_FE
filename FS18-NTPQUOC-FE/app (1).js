// Nguyễn An
// let score=document.querySelector(".box-score") // element
// console.log(score.innerText) // -->number String

// let btn=document.querySelectorAll(".btn") //nodeList[3]

// for (const i of btn){
//   if (i.id=="btnHome1"){
//     i.onclick=() =>{
//     score.innerText=(parseInt(score.innerText)+1).toString().padStart(2,'0')
//   //  (parseInt(score.innerText)+1) < 10 ? '0'+ score.innerText)+1 : score.innerText)+1
//   }
// }
//   else if (i.id=="btnHome2"){
//     i.onclick=() =>{
//       score.innerText=(parseInt(score.innerText)+2).toString().padStart(2,'0')
//     }
//   }
//   else {
//     i.onclick=() =>{
//       score.innerText=(parseInt(score.innerText)+3).toString().padStart(2,'0')
//     }
//   }
// }
// let num = 2
// let number = num.toString().padStart(5,'0');

// AN

// const btnHome1 = document.querySelector("#btnHome1")
// const btnHome2 = document.querySelector("#btnHome2")
// const btnHome3 = document.querySelector("#btnHome3")
// const boxScoreHome = document.querySelector("#box-score-home")
// let count = boxScoreHome.innerText*1

// const print=()=>{
//     count<10?boxScoreHome.innerText = `0${count}` :
//     boxScoreHome.innerText = `${count}`
// }

// btnHome1.onclick = () =>{
//     count = count +1
//     print()
// }
// btnHome2.onclick = () =>{
//     count = count +2
//     print()
// }
// btnHome3.onclick = () =>{
//     count = count +3
//     print()
// }

// Long

// let boxScoreAway = document.getElementById('box-score-away');
// let btnScoreAway = document.querySelectorAll('.btn.away');
// let scoreAway = 0;
// let boxScoreHome = document.getElementById('box-score-home');
// let btnScoreHome = document.querySelectorAll('.btn.home');
// let scoreHome = 0;

// btnScoreAway.forEach(element => { //BE
//     element.onclick = ()=> {
//         scoreAway += parseInt(element.innerText);
//         if(scoreAway < 10) 
//             boxScoreAway.innerText = `0${scoreAway}`;
//         else
//             boxScoreAway.innerText = scoreAway;
//     };
// });

// btnScoreHome.forEach(element => { //FE
//     element.onclick = ()=> {
//         scoreHome += parseInt(element.innerText);
//         if(scoreHome < 10) 
//             boxScoreHome.innerText = `0${scoreHome}`;
//         else
//             boxScoreHome.innerText = scoreHome;
//     };
// });

// Phú
const btn_home=document.querySelectorAll(".action .home")
const btn_away=document.querySelectorAll(".action .away")
const box_score_home=document.querySelector("#box-score-home")
const box_score_away=document.querySelector("#box-score-away")
let sum_home = 0;
let sum_away = 0;

for (let i = 0; i < btn_home.length; i++) {
    btn_home[i].onclick = ()=>{
        sum_home+=i + 1;
        if (sum_home<10) {box_score_home.innerText='0'+ sum_home}
        else
            box_score_home.innerText = sum_home;
    }   
}


for (let i = 0; i < btn_away.length; i++) {
    btn_away[i].onclick = ()=>{
        sum_away+=i + 1;
        if (sum_away<10) {box_score_away.innerText='0'+ sum_away}
        else
            box_score_away.innerText = sum_away;
    }   
}