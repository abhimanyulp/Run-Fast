

let baseServerURL = "https://nutritious-sugared-fur.glitch.me";
let paginationWrapperGlobal = document.getElementById("pagination-wrapper");
let userId = localStorage.getItem('key');
if(userId != null) {
    userId = JSON.parse(userId)[0];
} else {
  userId = 1;
}

if(localStorage.getItem('localCartData') != null) {
  let url = `${baseServerURL}/users`;
fetch(url)
    .then(res => {
        return res.json();
    })
    .then(data => {
        getActualUser(data);
    })
    .catch(e => {
        console.log(e);
    })
}


function getActualUser(users) {
    let currentUser = users.filter(user => {
        if(user.id == userId) {
            return true;
        }
        return false;
    })
    if(currentUser.length > 0) {
        let user = currentUser[0];
        localStorage.setItem('localCartData', JSON.stringify(user));
    }
}


let filter1 = document.getElementById("sort");
filter1.addEventListener('change', (event) => {
  let value = event.target.value;
  if(value == 'sort') {
    let url = `${baseServerURL}/data?_limit=12&_page=1`;
    fetchShoes(url);
    return;
  }
    let url = `${baseServerURL}/data?_limit=12&_page=1&_sort=price&_order=${value}`;
    fetchSortedData(url, value);
})


function fetchSortedData(url, order){
  fetch(url)
  .then((res)=>{
    let total = res.headers.get("X-Total-Count");
    createButtonForSorting(total, order);
    return res.json();
  })  
  .then((data)=>{
    arr = data;
    display(data);
  })
  .catch((error)=>{
    console.log(error);
  })
}

let btnPrice = document.getElementById("btnPrice");
btnPrice.addEventListener(("click"),event=>{
  let value = document.getElementById("inputPrice").value;
  if(value == '' || value == undefined) {
    let url = `${baseServerURL}/data?_limit=12&_page=1`;
    fetchShoes(url)
    return;
  }
  let url = `${baseServerURL}/data`;
  getFilteredData(url);
})

function getFilteredData(url){
  fetch(url)
  .then((res)=>{
    return res.json();
  })
  .then((data)=>{
    let filteredData = filterTheData(data);
    if(filteredData.length == 0){
      alert("The price for which you are searching is not available,please Enter other amount")
      let url = `${baseServerURL}/data`;
      fetchShoes(url);
    }
    paginationWrapperGlobal.innerHTML = null;
    display(filteredData);
  })
  .catch((error)=>{
    console.log(error)
  })
}


function filterTheData(data){
  let inputPrice = document.getElementById("inputPrice");
  let filteredData = data.filter((element)=>{
    if(element.price <= inputPrice.value){
      return true;
    } else {
      return false;
    }
  })
  return filteredData;
}

let btnBrand = document.getElementById('btnBrand');
btnBrand.addEventListener("click",(event)=>{
  let value = document.getElementById("inputBrand").value;
  if(value == '' || value == undefined) {
    alert('Please enter the brand');
    return;
  }
  let url = `${baseServerURL}/data`;
  fetchFilter(url, 'brand', value);
})

let colorFilter = document.getElementById('colorSelect');
colorFilter.addEventListener("change",(event)=>{
  let value = event.target.value
  if(value == '') {
    return;
  }
  let url = `${baseServerURL}/data`;
  fetchFilter(url, 'color', value);
})


let btnRating = document.getElementById("btnRating");
btnRating.addEventListener("click",(event)=>{
  let value = document.getElementById("ratingValue").value;
  if(value == '' || value == undefined || value > 5) {
    alert("Please Enter The Rating value Greater Than Equal To 1 And Less Than Equal To 5")
    return;
  }
  let url = `${baseServerURL}/data`;
  fetchFilter(url, 'rating', value);
})

function fetchFilter(url, filterWith, value){
  fetch(url)
  .then((res)=>{
    return res.json();
  })
  .then((data)=>{
    let filteredRatingData = filterData(data, filterWith, value);
    paginationWrapperGlobal.innerHTML = null;
    display(filteredRatingData);
  })
  .catch((error)=>{
    console.log(error)
  })
}

function filterData(data, filterWith, value){
  let filteredData = data.filter((element)=>{
    if(filterWith == 'rating') {
      if(element[filterWith] == value){
        return true;
      } else {
        return false;
      }
    } else {
      if(element[filterWith] && element[filterWith].toUpperCase() == value.toUpperCase()){
        return true;
      } else {
        return false;
      }
    }
  })
  return filteredData;
}


// let obj =[3];

// keyData.push(obj);
// localStorage.setItem("key",JSON.stringify(keyData));
// let  localCart=[]
//  function putrequestCart(obj){
//     let url = `${baseServerURL}/users/${obj}`
//     fetch(url)
//     .then((res)=>{
//       // console.log(res)
//       return res.json();
//     })
//     .then((data)=>{
//      localCart=data;
//      localStorage.setItem("localCartData",JSON.stringify(localCart));
//     // console.log(localCart);
//       // console.log(data);
//     })
//     .catch((error)=>{
//       console.log(error);
//     })
//   }
//   putrequestCart(obj)

  // localStorage.setItem("obj",JSON.stringify(obj));
  //Remove only obj code
  ///Remove the above code, warna khela ho jayega presentation time hahahahahah


let mainSection = document.getElementById("data-list-wrapper");
let arr = [];
window.addEventListener("load", (event) => {
  let url = `${baseServerURL}/data?_limit=12&_page=1`;
  fetchShoes(url);
});

function fetchShoes(url) {
    
    fetch(url)
    .then((res)=>{
      let total = res.headers.get("X-Total-Count");
      createButton(total);
      // console.log(total);
      return res.json();
    })  
    .then((data)=>{
      arr = data;
      // console.log(data);
      display(data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  function checkIfProductAlreadyExists(id) {
    let x = localStorage.getItem("localCartData");
    let cart = JSON.parse(x).cart;
    if(cart == undefined) {
      return false;
    }
    let filterData = cart.filter(element => {
      if(element.id == id) {
        return true;
      } 
      return false;
    })
    if(filterData.length > 0) {
      return true;
    }
    return false;
  }

  function disableAllCartButton() {
    let x = localStorage.getItem("localCartData");
    let cart = JSON.parse(x).cart;
    if(cart == undefined || cart.length <= 0) {
      return;
    }
    for(let i = 0; i < cart.length; ++ i) {
      let id = cart[i].id;
      let button = document.getElementById(id);
      button.disabled = true;
      button.innerText = 'Product Added To Cart'
      button.setAttribute('class', 'alreadyAddedButton');
    }
  }

  function display(data) {
    mainSection.innerHTML = null;
    mainSection.innerHTML = cardList(data);
    let buttonElement = document.getElementsByClassName("btnCart");
    for(let i = 0; i < buttonElement.length; ++ i) {
      buttonElement[i].addEventListener('click', event => {
        let id = event.target.id;
        if(checkIfProductAlreadyExists(id)) {
          alert('Product Already Added to Card');
          return;
        }
        let filteredData = arr.filter(element => {
          if(element.id == id) {
            return true;
          } else {
            return false;
          }
        })
        addToLS(filteredData);
        let button = document.getElementById(id);
        button.disabled = true;
        button.setAttribute('class', 'alreadyAddedButton');
        button.innerText = 'Product Added To Cart'
        console.log(filteredData);       
      })
    }
    disableAllCartButton();
    
  }

  function changeInJsonServer(loggedInUser,id){
    let url = `${baseServerURL}/users/${id}`;
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
        let x = localStorage.getItem("localCartData");
        
        let loggedInUser = JSON.parse(x);
        let id = loggedInUser.id;
        console.log(id);
        if(loggedInUser.cart !== undefined){
            loggedInUser.cart.push(filteredData[0]);
        } else {
          loggedInUser.cart = filteredData;
        }

        localStorage.setItem("localCartData", JSON.stringify(loggedInUser));
        changeInJsonServer(loggedInUser,id);
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
      <p>Price :${price}</p>
      <p>Size :${size}</p>
      <p>Color :${color}</p>
      <p>Brand :${brand}</p>
      <p>Rating :${rating}</p>
      <button class="btnCart" id=${id}>Add To Cart</button>
    </div>  
    `
  }

  function createButtonForSorting(total, order) {
    let limit = 12;
    let str = "";
    let paginationWrapper = document.getElementById("pagination-wrapper");
    paginationWrapper.innerHTML = null;
    let numberOfButtons = Math.ceil(total/limit);
    for(let i = 0; i < numberOfButtons; i ++){
      str = str + `<button class="paginationBtn">${i+1}</button>`
    }
    paginationWrapper.innerHTML = str;
    let buttonArray = document.getElementsByClassName("paginationBtn");
    for(let i = 0; i < buttonArray.length; i ++){
      buttonArray[i].addEventListener("click",(event)=>{
        let buttonNumber = event.target.innerText;
        let url = `${baseServerURL}/data?_limit=12&_page=${buttonNumber}&_sort=price&_order=${order}`;
        fetchSortedData(url, order);
      })
    }
  }


  function createButton(total){
    let limit = 12;
    let str = "";
    let numberOfButtons = Math.ceil(total/limit);
    for(let i = 0; i < numberOfButtons; i ++){
      str = str + `<button class="paginationBtn">${i+1}</button>`
    }
    let paginationWrapper = document.getElementById("pagination-wrapper");
    paginationWrapper.innerHTML = str;
    let buttonArray = document.getElementsByClassName("paginationBtn");
    for(let i = 0; i < buttonArray.length; i ++){
      buttonArray[i].addEventListener("click",(event)=>{
        let buttonNumber = event.target.innerText;
        let url = `${baseServerURL}/data?_limit=12&_page=${buttonNumber}`;
        fetchShoes(url);
      })
    }
    
  }


  

 