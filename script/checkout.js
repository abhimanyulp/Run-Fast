let LSkeyData = "Abhimanyu"

// let LSkeyData = JSON.parse(localStorage.getItem("key"))

const URL = "https://userlogin-nxh8.onrender.com/users";

let address = document.querySelector("#address-box > h1")

let UserData;
let UserAdd;



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
        UserAdd = UserData[0].address

        address.innerText = UserAdd;

    })






//Filtering data with LS key to specific user
function FilterUser(data) {
    let filtered = data.filter((element) => {
        if (LSkeyData == element.username) {
            return true
        } else {
            return false;
        }
    })
    return filtered;
}