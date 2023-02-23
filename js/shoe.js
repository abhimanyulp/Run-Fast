
let baseServerURL = "https://userlogin-nxh8.onrender.com";


//In reality ,this data I will get from local storage which is being done by Pranay
let obj = {
  userid: "3iyejk",
  username: "omkar21143",
  name: "omkar walvalkar",
  email: "omkar21143@gmail.com",
  password: "omkar",
  address: "122 3rd cross MG road Belgaum Karnataka "
  }
  localStorage.setItem("obj",JSON.stringify(obj));
  //Remove only obj code
  ///Remove the above code, warna khela ho jayega presentation time hahahahahah


let mainSection = document.getElementById("data-list-wrapper");
let arr = [];
window.addEventListener("load", (event) => {
  fetchUsers(1);
});

function fetchUsers(pageNumber) {
    let url = `${baseServerURL}/data?_limit=12&_page=${pageNumber}`;
    fetch(url)
    .then((res)=>{
      let total = res.headers.get("X-Total-Count");
      createButton(total);
      console.log(total);
      return res.json();
    })  
    .then((data)=>{
      arr = data;
      console.log(data);
      display(data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  function display(data) {
    mainSection.innerHTML = cardList(data);
    let buttonElement = document.getElementsByClassName("btnCart");
    for(let i = 0; i < buttonElement.length; ++ i) {
      buttonElement[i].addEventListener('click', event => {
        let id = event.target.id;
        let filteredData = arr.filter(element => {
          if(element.id == id) {
            return true;
          } else {
            return false;
          }
        })
        
        addToLS(filteredData);
        console.log(filteredData);
       
      })
    }
  }

  function changeInJsonServer(loggedInUser){
    let url = "https://userlogin-nxh8.onrender.com/users";
    fetch((url),{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(loggedInUser)
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  function addToLS(filteredData){
        let x = localStorage.getItem("obj");
        let loggedInUser = JSON.parse(x);
        if(loggedInUser.cart !== undefined){
            loggedInUser.cart.push(filteredData[0]);
        } else {
          loggedInUser.cart = filteredData;
        }

        localStorage.setItem("obj", JSON.stringify(loggedInUser));
        changeInJsonServer(loggedInUser);
  }


  function addToUser(filteredData){
    let url = "https://userlogin-nxh8.onrender.com/users";
    
  }

  function cardList(data) {
    return `
      <div id="card-list">
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
    <div class="smallCard">
      <img src="${imageURL}"/>
      <p>${name}</p>
      <p>${price}</p>
      <p>${size}</p>
      <p>${color}</p>
      <p>${brand}</p>
      <p>${rating}</p>
      <button class="btnCart" id=${id}>Add To Cart</button>
    </div>  
    `
  }






  function createButton(total){
    let limit = 12;
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


  

 