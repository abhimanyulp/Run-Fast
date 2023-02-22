let users = [{
    username:"abhilp",
    password:"1234",
    address:"123/4 some road, some locallity, new delhi",
    cart:[{
        item: "MEN'S NIKE AIR FORCE",
        price: "100",
        color: "white",
        img: "https://media.finishline.com/s/finishline/CW2288_111?$Main$&bg=rgb(237,237,237)&fmt=webp&h=245&w=245"
    },
    {
        item: "AIR JORDAN RETRO 5",
        price: "200",
        color: "black",
        img: "https://media.finishline.com/s/finishline/DD0587_047?$Main$&bg=rgb(237,237,237)&fmt=webp&h=245&w=245"
    },
    {
        item: "WOMEN'S AIR JORDAN RETRO",
        price: "200",
        color: "red",
        img: "https://media.finishline.com/s/finishline/DD9336_800?$Main$&bg=rgb(237,237,237)&fmt=webp&h=245&w=245"
    }]
}
// continue..................
]




let container = document.getElementById("container-product");

Display(users[0].cart)



function Display(data) {
    container.innerHTML = null;

    data.forEach((element) => {


        let card = document.createElement("div");
        card.setAttribute("id", "card");

        let card_box = document.createElement("div")
        card_box.setAttribute("id", "card-box");

        let img = document.createElement("img")
        img.src = element.img;

        let details = document.createElement("div");
        details.setAttribute("id", "details")


        let title = document.createElement("p")
        title.innerText = element.item;

        let color = document.createElement("p")
        color.innerText = element.color;


        let price = document.createElement("p")
        price.innerText = `$${element.price}`;

        let quantity = document.createElement("div");
        quantity.setAttribute("id", "quantity")

        let btm_dec = document.createElement("button")
        btm_dec.innerText = "-"

        let value = document.createElement("p")
        value.innerText = 1

        let btm_inc = document.createElement("button")
        btm_inc.innerText = "+"

        let remove = document.createElement("button");
        remove.innerText = "x"
        remove.setAttribute("id", "removeBtn")


        card.append(card_box, price, quantity, remove);
        card_box.append(img, details);
        details.append(title, color);
        quantity.append(btm_dec, value, btm_inc);

        container.append(card);
    })
}