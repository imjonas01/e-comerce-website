// this is for hamburger menu


const hamburger = document.querySelector('.hamburger');
const mobileNavContainer = document.querySelector('.mobileNavContainer');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle("active");
    mobileNavContainer.classList.toggle("active");
})

document.querySelectorAll(".x-btn").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileNavContainer.classList.remove("active");

}))

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileNavContainer.classList.remove("active");

}))



//shop cart container  

let shop = document.getElementById('cartContainer');


let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {

    return (cartContainer.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || []
        return `
<div class="white-space" id="shopContainer">
<div class="img-container">           
<img class="product-image" src="${img}" alt="">
</div>
<div class="cart-details">
    <p class="product-name">${name}</p>
    <p class="product-categories">${desc}</p>
</div>
<div class="price-and-add-btn">
    <p class="price">₱ ${price}</p>
    <div class="add-button">
        <i onClick='decrement(${id})' class="bi bi-dash-lg"></i>
        <div onClick='update(${id})' class="quantity" id=${id}>${search.item === undefined ? 0 : search.item}</div>
        <i onClick='increment(${id})' class="bi bi-plus-lg"></i>
    </div>
</div>

</div>  
`
    }).join(""));

};
generateShop();


//this is for incrementing the quantity

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    }
    else {
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket))
    // console.log(basket);
    update(selectedItem.id)
};


//this is for decrementing the quantity
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) return
    else if (search.item === 0) return;

    else {
        search.item -= 1;
    }

    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0)
    // console.log(basket);
    
    localStorage.setItem("data", JSON.stringify(basket))
};

//for updating the quantity
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

//updating the cart quantity icon on the top 

let calculation = () => {
    let cartIcon = document.getElementById("cartQuantity");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();