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
let i=0
let time=3000
let slideImage=[]

slideImage[0]="Level up.png"
slideImage[1]="Mega Sale.png"
slideImage[2]="puma.png"

let bannerEl=document.getElementById("ss2")

function changeImg(){
    bannerEl.src=slideImage[i]

    if(i<slideImage.length-1){
        i++
    }else{
        i=0
    }

    setTimeout("changeImg()",time)
}

window.onload=changeImg;

//================================================
