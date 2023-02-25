let baseServerURL = "https://nutritious-sugared-fur.glitch.me";

//Remove this code after integration
let key = [1];
localStorage.setItem('key', JSON.stringify(key));
//Till here
let userId = localStorage.getItem('key');
if(userId != null) {
    userId = JSON.parse(userId)[0];
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