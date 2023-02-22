
let baseServerURL = "https://userlogin-nxh8.onrender.com";

let mainSection = document.getElementById("data-list-wrapper");

window.addEventListener("load", (event) => {
  fetchUsers(1);
});

function fetchUsers(pageNumber) {
    let url = `${baseServerURL}/data?_limit=10&_page=${pageNumber}`;
    fetch(url)
    .then((res)=>{
      let total = res.headers.get("X-Total-Count");
      createButton(total);
      console.log(total);
      return res.json();
    })  
    .then((data)=>{
      console.log(data);
      display(data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  function display(data) {
    mainSection.innerHTML = cardList(data);
  }

  function cardList(data) {
    return `
      <div class="card-list">
        ${data.map((obj) => {
      return cardElement(obj.id,
        obj.price,
        obj.size,
        obj.color,
        obj.brand,
        obj.rating,
        obj.name,
        obj.image);
    }).join("")
      }
   `
  }

  function cardElement(id,price,size,color,brand,rating,name,imageURL) {
    return `
      <div>
        <img src="${imageURL}"
      </div>
      <p>${name}</p>
      <br>
      <p>${price}</p>
      <br>
      <p>${size}</p>
      <br>
      <p>${color}</p>
      <br>
      <p>${brand}</p>
      <br>
      <p>${rating}</p>
    `
  }



  function createButton(total){
    let limit = 10;
    let str = "";
    let numberOfButtons = Math.ceil(total/limit);
    for(let i = 0; i < numberOfButtons; i ++){
      str = str + `<button>${i+1}</button>`
    }
    let paginationWrapper = document.getElementById("pagination-wrapper");
    paginationWrapper.innerHTML = str;
    let buttonArray = document.getElementsByTagName("button");
    for(let i = 0; i < buttonArray.length; i ++){
      buttonArray[i].addEventListener("click",(event)=>{
        let buttonNumber = event.target.innerText;
        fetchUsers(buttonNumber);
      })
    }
    
  }
  

 