let Username=document.querySelector('#admin-username')
let Pass=document.querySelector('#admin-password')
let form=document.querySelector('#adminform')

form.addEventListener('submit',adminfetch)


 function adminfetch(e){
    e.preventDefault()

const username=Username.value;
const pass=Pass.value;

if(username!==pass){
    alert('wrong credintials please check')
}else{
    window.location.href = "adminpage.html";
    
}



adminget(username,pass)
console.log(username,pass)
}

async function adminget(username,pass){

    let adminData=await fetch('https://nutritious-sugared-fur.glitch.me/admin',{
    method:'GET',
    headers:{
        "Content-Type":"application/json"
    },
    })
    let admindata=await adminData.json();
    console.log(admindata)
   
   
       
    

}