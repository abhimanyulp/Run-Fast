let toggle=document.querySelector('.toggle')

toggle.addEventListener("click",toggleMenue);

function toggleMenue(){
toggle.classList.toggle('active');
let navigation=document.querySelector('.navigation');
navigation.classList.toggle('active');
let main=document.querySelector('.main');
main.classList.toggle('active');
}