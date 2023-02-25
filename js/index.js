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
let slidevalue=1

setInterval(() => {
    if(slideIndex<3){
        showSlides(slideIndex);
        slideIndex++
    }else{
        slideIndex=1
    }
},1500);

// ===========================================================================================
let createaccountbtn=document.getElementById("createaccountbtn")
let Div1=document.getElementById("id01")
let Div2=document.getElementById("id02")

var modal = document.getElementById('id01');

let accesskey=[]

console.log(accesskey)

window.onload = function(event) {
    if(accesskey.length==0){
        setTimeout(() => {
            modal.style.display="block"
        }, 3000);
    }else{
        Div1.style.display="none"
        Div2.style.display="none"
    }
}

// ==========================================================================================

createaccountbtn.onclick=function(e){
    e.preventDefault()
    Div1.style.display="none";
    Div2.style.display="block"
}
let clearlocal=document.getElementById("account")
clearlocal.addEventListener("change",(e)=>{
        localStorage.clear()
        alert("Logout successfully")
        window.location.reload()
})

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//========================================================================================

let loginEmail=document.getElementById("loginUser")
let loginPassword=document.getElementById("loginPass")
let loginBtn=document.getElementById("loginbtn")

loginBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    
    if(checkEmployees()){
        Div1.style.display="none"
        Div2.style.display="none"
        // window.location.reload()
    }
})

let showName=document.querySelector("#showname")
function checkEmployees(){
    let user=[]
    let userObj={
        email:loginEmail.value,
        password:loginPassword.value
    };

    fetch(`https://nutritious-sugared-fur.glitch.me/users`,{
      method:"GET",
      headers:{
        'Content-type':'application/json'
      }
    })

    .then ((res) => res.json ())
    .then ( (data) => {
        data.filter(ele =>{
            if(ele.email==userObj.email && ele.password == userObj.password){
                // Swal.fire('Login Successful')
                alert("Login successful")
                showName.innerHTML=`Hello,${ele.name}`
                user.push(ele.id)
                localStorage.setItem("key",JSON.stringify(user))
                return true
            }
        })
    })
    return fetch
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
    // Swal.fire('Account Created')
    alert("Account created")
    window.location.reload()
})
 
function fetchAndAddEmployees(){
    let userObj={

        name:signName.value,
        email:signUsername.value,
        address:signAddress.value,
        password:signPassword.value,
        cart:[]
    };
    
    console.log(userObj)

    fetch(`https://nutritious-sugared-fur.glitch.me/users`,{
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

  //=====================================================================

