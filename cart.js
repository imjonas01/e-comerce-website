

//main cart 

let label = document.getElementById('label');
let ShoppingCart = document.getElementById('shopping-cart');


//updating the cart quantity icon on the top 
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartQuantity");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);

};

calculation();

//main cart js

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (ShoppingCart.innerHTML = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItemsData.find((y) => y.id === id) || [];
                return `
        <main>        
        <div class="cart-item">
          <img width="100" src=${search.img} alt="" />
          <div class="details">
            <div class="title-price-x">
                <h4 class="title-price">
                  <p>${search.name}</p>
                  <p class="cart-item-price">₱ ${search.price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi1 bi-x-lg"></i>
            </div>
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            <h3>₱ ${item * search.price}</h3>
           </div>
        </div>
        </main>
        `;
            })
            .join(""));
    } else {
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
      <h2> Your Cart is Empty</h2>
      <a href="index.html">
        <button class="HomeBtn">Back to home</button>
      </a>
      `;
    }
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    calculation();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};


let modal = document.querySelector('.modal')

let checkOut = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));

    document.querySelector('.modal').style.display = 'flex'
}
let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket
            .map((x) => {
                let { item, id } = x;
                let search = shopItemsData.find((y) => y.id === id) || [];

                return item * search.price;
            })
            .reduce((x, y) => x + y, 0);
        // console.log(amount);
        label.innerHTML = `
      <h2>Total Bill : ₱ ${amount}</h2>
      <button onclick="checkOut()" class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
    } else return;
};

TotalAmount();




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
    document.querySelector('.modal').style.display = 'none'

}))

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileNavContainer.classList.remove("active");

}))

