let toggle=document.querySelector('.toggle')

toggle.addEventListener("click",toggleMenue);

function toggleMenue(){
toggle.classList.toggle('active');
let navigation=document.querySelector('.navigation');
navigation.classList.toggle('active');
let main=document.querySelector('.main');
main.classList.toggle('active');
}


let tbody=document.querySelector('tbody');
let url='https://nutritious-sugared-fur.glitch.me/ordered';


async function fetchdata(){
  try {
      let adminfetch= await fetch(`https://nutritious-sugared-fur.glitch.me/ordered`)
        let data=await adminfetch.json();
        // console.log(data);
        // console.log(data.length);
        productdata.innerHTML=null;
        productdata.innerHTML=data.length;

        
        adminDisplay(data)

  } catch (error) {
    console.log(error);
  }
}
window.addEventListener('load',fetchdata);

function adminDisplay(data){
    tbody.innerHTML=null;
    tbody.innerHTML=cardlist(data);

}
function cardlist(data){
    return` 
    ,
    ${ data.map((item)=>{
        return card(
            item.name,
            item.total,
            item.payment,
            item.status,

        )
    }).join('')
}
    
    `
}
let arr=['Pending','Delivered','Return','Progress'];
let pay=['Card','Net Banking','Cash','Postpay'];
let diliverystatus;
function card(name,total,payment,status){
return `
<tr>
<td>${name} </td>
<td> $ ${total} </td>
<td>${payment} </td>
<td><span class="status ${status}">${status}</span></td>
</tr>
`
}

// let dispro='https://nutritious-sugared-fur.glitch.me/data';

// console.log(dispro.length)


// display on card no two ( Totalproduct )

let card2=document.querySelector('#productdata')
let card3=document.querySelector('#customerdata')
async function lengthpro(){
    try {
        let adminfetch= await fetch(`https://nutritious-sugared-fur.glitch.me/data`)
          let data=await adminfetch.json();
        //   console.log(data);
          console.log(data.length);
        //   card2 append
          card2.innerHTML=null;
          card2.innerHTML=data.length;

       } catch (error) {
      console.log(error);
    }
  }

lengthpro();




// // card3 aapending 
// let productData= await fetch(`https://nutritious-sugared-fur.glitch.me/ordered`)
// let data2=await productData.json();
// //   console.log(card3);
// console.log(data2.length);
// card3.innerHTML=null;
// card3.innerHTML=data2.length;