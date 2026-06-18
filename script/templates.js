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
    let basketItem = basket.find(item => item.id ===id);
    if (basketItem) {
        basketItem.amount++;
    } else {
        basket.push({
            id: id,
            amount : 1
        });
    }    
}

function getBasketTemplate(){
    return `
        <h2> Your Basket </h2>    
        <p> Basket is empty </p>
    `;
}