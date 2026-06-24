function getPizzaTemplate(currentPizza) {
    return `
        <div class="pizza-card">
            <img
                class="pizza-image"
                src="assets/img/${currentPizza.image}"
                alt="${currentPizza.name}"
            >
            <div class="pizza-info">
                <div class="pizza-top-row">
                    <h2>${currentPizza.name}</h2>
                    <span class="pizza-price">
                        ${currentPizza.price.toFixed(2)} €
                    </span>
                </div>
                <p>${currentPizza.description}</p>
                <div class="pizza-actions">
                    <button class="add-button" onclick="addToBasket(${currentPizza.id})">
                        Add to basket
                    </button>
                </div>
            </div>
        </div>
    `;
}


function getBasketTemplate(){
    return `
    <div class="empty-basket">
            <h2>Your Basket</h2>

            <p>
                Nothing here yet.<br>
                Go ahead and choose something delicious!
            </p>
            <img src="assets/icons/empty_basket.png" alt="Empty Basket Icon">
    </div>
    `;
}

function getBasketItemTemplate (currentBasketItem, pizzaData){
    let totalPrice = currentBasketItem.amount * pizzaData.price ;

    return`
        <div class="basket-item">
            <div class="basket-title">${currentBasketItem.amount} x ${pizzaData.name}</div>
            <div class="basket-footer">
                <div class="basket-controls">
                    <button onclick="decreaseAmount(${currentBasketItem.id})">-</button>
                    <span>${currentBasketItem.amount}</span>
                    <button onclick="increaseAmount(${currentBasketItem.id})">+</button>
                </div>      
                <span class="basket-price">${totalPrice.toFixed(2)} €</span>    
            </div>    
            
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
        <div class="basket-summary">
            <div class="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)} €</span>
            </div>   
            <div class="summary-row">
                <span>Delivery</span>
                <span>${deliveryCost.toFixed(2)} €</span>
            </div>   
            <div class="summary-row total-row ">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)} €</span>
            </div>
        </div>
    `;
}

function getBuyNowButtonTemplate(){
    return `
        <button class="buy-now-btn" onclick="orderNow()">
        Buy Now
        </button>
    `;
}