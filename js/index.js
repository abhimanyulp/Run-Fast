function sideScroll(element,direction,speed,distance,step){
    scrollAmount=0
    let slideTimer=setInterval(function(){
        if(direction=="left"){
            element.scrollLeft-=step
        }else{
            element.scrollLeft+=step
        }
        scrollAmount+=step
        if(scrollAmount>=distance){
            window.clearInterval(slideTimer)
        }
    },speed)
}
//upperbox=======================================1
let fowardButton=document.getElementById("right")
fowardButton.onclick=function(){
    let conatiner=document.getElementById("box")
    sideScroll(conatiner,"right",20,100,10)
}

let backwardButton=document.getElementById("left")
backwardButton.onclick=function(){
    let conatiner=document.getElementById("box")
    sideScroll(conatiner,"left",20,100,10)
}
//=================================================2
let minEl=document.getElementById("btn21")
minEl.onclick=function(){
    let conatiner=document.getElementById("box2")
    sideScroll(conatiner,"right",20,200,10)
}

let plusEl=document.getElementById("btn12")
plusEl.onclick=function(){
    let conatiner=document.getElementById("box2")
    sideScroll(conatiner,"left",20,200,10)
}
//==================================================3
let bb2El=document.getElementById("bb2")
bb2El.onclick=function(){
    let conatiner=document.getElementById("box3")
    sideScroll(conatiner,"right",20,200,10)
}

let bb1El=document.getElementById("bb1")
bb1El.onclick=function(){
    let conatiner=document.getElementById("box3")
    sideScroll(conatiner,"left",20,200,10)
}
//slideshow===========================================

//================================================slideshow======================================
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

// ===========================================================================================
var modal = document.getElementById('id01');

window.onload = function(event) {
    setTimeout(() => {
        modal.style.display="block"
    }, 3000);
}

// window.onclick=function(){
//     if(modal==)
// }

// ==========================================================================================

let createaccountbtn=document.getElementById("createaccountbtn")
let Div1=document.getElementById("id01")
let Div2=document.getElementById("id02")

createaccountbtn.onclick=function(e){
    e.preventDefault()
    Div1.style.display="none";
    Div2.style.display="block"
}

//========================================================================================

let loginUsername=document.getElementById("loginUser")
let loginPassword=document.getElementById("loginPass")
let loginBtn=document.getElementById("loginbtn")

loginBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    checkEmployees()
})
let user=[]
function checkEmployees(){
    let userObj={
        username:loginUsername.value,
        password:loginPassword.value
    };

    fetch(`https://userlogin-nxh8.onrender.com/users`,{
      method:"GET",
      headers:{
        'Content-type':'application/json'
      }
    })
    .then ((res) => res.json ())
    .then ( (data) => {
        data.filter(ele =>{
            if(ele.username==userObj.username && ele.password == userObj.password){
                alert("Login Successful")
                user.push(ele.username)
                localStorage.setItem("username",JSON.stringify(user))
                return true
            }
        })
    })
  }

////////////////////////////////////////////////////////////////////////////
let signUsername=document.getElementById("signUser")
let signName=document.getElementById("signName")
let signAddress=document.getElementById("signAddress")
let signPassword=document.getElementById("signPass")
let signupbtn=document.getElementById("signupbtn")

signupbtn.addEventListener("click",(e)=>{
    e.preventDefault()
    fetchAndAddEmployees()
})
 
function fetchAndAddEmployees(){
    let userObj={
        name:signName.value,
        username:signUsername.value,
        address:signAddress.value,
        password:signPassword.value
    };
    
    console.log(userObj)

    fetch(`https://userlogin-nxh8.onrender.com/users`,{
      method:"POST",
      body:JSON.stringify(userObj),
      headers:{
        'Content-type':'application/json'
      }
    })
    .then ((res) => res.json ())
    .then ( (data) => {
    console. log (data);
    })
  }
  