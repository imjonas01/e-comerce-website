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

//updating the cart quantity icon on the top 
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartQuantity");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

