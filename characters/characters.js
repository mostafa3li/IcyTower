let hero1 = document.getElementById('hero1');
let hero2 = document.getElementById('hero2');
var hero;
hero1Click = function()
{
    hero =1;
    localStorage.setItem('hero',hero);
}
hero2Click = function()
{
    hero =2;
    localStorage.setItem('hero',hero);
}
hero1.addEventListener('click', hero1Click);
hero2.addEventListener('click', hero2Click);



