function getPizzaTemplate (currentPizza) {
    return `
        <div class="pizza-card">
            <img class="pizza-image" src="assets/img/${currentPizza.image}" alt="${currentPizza.name}">
            <div class="pizza-info">
                <div class="pizza-header"> 
                    <h2>${currentPizza.name}</h2>
                    <button class="add-button" onclick="addToBasket(${currentPizza.id})">+</button>
                </div>    
                <p>${currentPizza.description}</p>
                <span>${currentPizza.price.toFixed(2)} €</span>
            </div>    
        </div>    
    `;
}

function addToBasket(id){

    let basketItem = basket.find(item => item.id === id);

    if (basketItem) {
        basketItem.amount++;
    } else {
        basket.push({
            id: id,
            amount : 1
        });
    }
    renderBasket();    
}

function getBasketTemplate(){
    return `
        <h2> Your Basket </h2>    
        <p> Basket is empty </p>
    `;
}

function getBasketItemTemplate (currentBasketItem, pizzaData){
    let totalPrice = currentBasketItem.amount * pizzaData.price ;

    return`
        <div class="basket-item">
            <span>${currentBasketItem.amount}x ${pizzaData.name}</span>
            <span>${totalPrice.toFixed(2)} €</span>
        </div>
    `;
}

function getBasketSubtotalTemplate (subtotal){
    return`
        <div class="basket-item">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)} €</span>
        </div>    
    `;
}

function getBasketSummaryTemplate (subtotal, deliveryCost, totalPrice){
    return`
        <div class="basket-item">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)} €</span>
        </div>   
        <div class="basket-item">
            <span>Delivery</span>
            <span>${deliveryCost.toFixed(2)} €</span>
        </div>   
        <div class="basket-item">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)} €</span>
        </div>   
    `;
}

function getBuyNowButtonTemplate(){
    return `
        <button onclick="orderNow()">
        Buy Now
        </button>
    `;
}