let Name1,Name2,Name3;
let Na1 = 'Amr',Na2='Mostafa',Na3='Alaa';

let first,second,third;
let fi=500,se=400,th=33;


Name1=localStorage.getItem("username"+0)
first=localStorage.getItem("userScore"+0)
Name2=localStorage.getItem("username"+1)
second=localStorage.getItem("userScore"+1)
Name3=localStorage.getItem("username"+2)
third=localStorage.getItem("userScore"+2)

let firstHighScore = document.getElementById('first');
firstHighScore.innerHTML = "1-" +  Name1+ ' : ' + first ;
let secondHighScore = document.getElementById('second');
secondHighScore.innerHTML = "2-" +Name2 +" : " + second;
let thirdHighScore = document.getElementById('third');
thirdHighScore.innerHTML = "3-" +Name3 +" : "+ third;



