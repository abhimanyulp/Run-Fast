// <-------------------Catching & Declaring---------------->


//Getting key from local storage
let fetchedData = JSON.parse(localStorage.getItem("key"));

let LSkeyData = fetchedData[0];
// let LSkeyData = 2;



const URL = "https://nutritious-sugared-fur.glitch.me/users";



let container = document.getElementById("container-product");
let checkoutbtn = document.getElementById("checkout");
let couponSel = document.getElementById("coupon-sel");


let userIdTag = document.getElementById("user-id-tag")


let totalEl = document.getElementById("total");
let subtotalEl = document.getElementById("subtotal");
let subtotal = 0;
let total = 0;


let UserData;
let UserCart;
let OrderData;
let UserName;



// <--------------Fetching and Display user cart------------>


//Fetching cart data
fetch(URL, {
    method: "GET",
    headers: {
        'Content-type': 'application/json'
    }
})
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        UserData = FilterUser(data)
        UserName = UserData[0].name

        UserCart = UserData[0].cart;

        // console.log(UserData)
        // console.log(UserData[0].cart.length)

        Display(UserCart);
        userIdTag.innerText = `User: ${UserName}`;
    })





    



// <---------------addEventListener----------------->



//Apply coupon selector and changing total amount only once
let flag = true;
couponSel.addEventListener("change", () => {

    if (couponSel.value == 10 && flag == true) {
        total = total - ((total / 100) * 10)
        totalEl.innerText = `$${total}`;
        flag = false
    }
})



//Temperoly saving order data to local stroage
checkoutbtn.addEventListener("click", () => {
    OrderData = {
        username: UserName,
        totalAmount: total,
        type: "none",
        days: "none"
    }
    localStorage.setItem("order", JSON.stringify(OrderData));
})










// <--------------Functions-------------->



//Filtering data with LS key to specific user
function FilterUser(data) {
    let filtered = data.filter((element) => {
        if (LSkeyData == element.id) {
            return true
        } else {
            return false;
        }
    })
    return filtered;
}





//Display Function
function Display(data) {
    container.innerHTML = null;

    data.forEach((element) => {


        let card = document.createElement("div");
        card.setAttribute("id", "card");

        let card_box = document.createElement("div")
        card_box.setAttribute("id", "card-box");

        let img = document.createElement("img")
        img.src = element.image;

        let details = document.createElement("div");
        details.setAttribute("id", "details")


        let title = document.createElement("p")
        title.innerText = element.name;

        let color = document.createElement("p")
        color.innerText = element.color;


        let price = document.createElement("p")
        price.innerText = `$${element.price}`;

        total += element.price;
        subtotal += element.price;
        totalEl.innerText = `$${total}`;
        subtotalEl.innerText = `$${subtotal}`;


        let quantity = document.createElement("div");
        quantity.setAttribute("id", "quantity")

        let btm_dec = document.createElement("button")
        btm_dec.innerText = "-"


        let value = document.createElement("p")
        value.innerText = 1

        let btm_inc = document.createElement("button")
        btm_inc.innerText = "+"



        btm_dec.addEventListener("click", () => {

            if (value.innerText > 1) {
                total -= element.price;
                totalEl.innerText = `$${total}`;

                subtotal -= element.price;
                subtotalEl.innerText = `$${subtotal}`;

                value.innerText--
            }
        })

        btm_inc.addEventListener("click", () => {

            total += element.price;
            totalEl.innerText = `$${total}`;

            subtotal += element.price;
            subtotalEl.innerText = `$${subtotal}`;

            value.innerText++
        })


        let id = element.id;


        let remove = document.createElement("button");
        remove.innerText = "x"
        remove.setAttribute("id", "removeBtn")


        remove.addEventListener("click",()=>{

            let filtered = filterWithID(id)

            UserData[0].cart = filtered;

            cartUpdate(UserData[0],LSkeyData)

            total = 0;
            subtotal = 0;

            Display(filtered)

            setTimeout(()=>{
                window.location.reload()
            },2000)


        })


        card.append(card_box, price, quantity, remove);
        card_box.append(img, details);
        details.append(title, color);
        quantity.append(btm_dec, value, btm_inc);

        container.append(card);
    })
}



//Removing the element from cart
function filterWithID(id){
    let filtered = UserCart.filter((element)=>{
        if (id != element.id) {
            return true
        } else {
            return false;
        }
    })
    return filtered;
}


//Replacing the user with updated cart
function cartUpdate(updated,id){
    let url = `https://nutritious-sugared-fur.glitch.me/users/${id}`;
    fetch(url,{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(updated)
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