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


let viewallbtn=document.querySelector('#viewallbtn');
viewallbtn.addEventListener("click",()=>{
console.log("clicked")
fetchdata();

});


async function fetchdata(){
  try {
      let adminfetch= await fetch(`https://nutritious-sugared-fur.glitch.me/ordered`)
        let data=await adminfetch.json();
              
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
            item.username,
            item.totalAmount,
            item.type.toUpperCase(),
            item.days,

        )
    }).join('')
}
    
    `
}
let arr=['Pending','Delivered','Return','Progress'];
let pay=['Card','Net Banking','Cash','Postpay'];
let diliverystatus;
function card(name,totalAmount,type,days){
return `
<tr>
<td>${name} </td>
<td> <span class="yellow">$</span> <b>${totalAmount} </b></td>
<td><b>${type}</b> </td>
<td>Accepted Delivery In <b>${days}</b> Day's</td>
</tr>
`
}


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


          // // card3 aapending 
          let productData= await fetch(`https://nutritious-sugared-fur.glitch.me/ordered`)
          let data2=await productData.json();
          //   console.log(card3);
          console.log(data2.length);
          card3.innerHTML=null;
          card3.innerHTML=data2.length;

       } catch (error) {
      console.log(error);
    }
  }

  lengthpro();
  

let cardtotalhtml=document.querySelector("#displaytotalcard");
let profithtml=document.querySelector("#profit");

 async function displayamt(){
  let cardtotal= await fetch(`https://nutritious-sugared-fur.glitch.me/ordered`)
  let data3=await cardtotal.json();
  console.log(data3.length);
   cardamt=data3.reduce((acc,item)=>{
    let sum=0;
    sum+=item.totalAmount;


    acc.push(sum)
    return acc
  },[])

      let sum=0;
  for(let i=0;i<cardamt.length;i++){
    sum+=+cardamt[i]

  }
  cardtotalhtml.innerHTML=null;
  cardtotalhtml.innerHTML=sum;

  let pro=Math.floor(sum/10);
  profithtml.innerHTML=null;
  profithtml.innerHTML=pro;

}

displayamt()
