let basket = [];

let pizzaContentRef = document.getElementById('pizza-content');

let basketContentRef = document.getElementById('basket-content')

function renderPizzas(){
    pizzaContentRef.innerHTML ='';
    for (let i = 0; i < pizzas.length; i++) {
        let currentPizza = pizzas[i];
        pizzaContentRef.innerHTML += getPizzaTemplate(currentPizza);
    }
}

function renderBasket(){
    if (basket.length === 0){
    basketContentRef.innerHTML = getBasketTemplate();
    } else {
        basketContentRef.innerHTML = '<h2>Your Basket</h2>';
        let subtotal = 0;
        
        for (let i = 0; i < basket.length; i++) {
            let currentBasketItem = basket[i];
            let pizzaData = pizzas.find(
                pizza => pizza.id ===currentBasketItem.id
            );
            subtotal += currentBasketItem.amount * pizzaData.price;
            basketContentRef.innerHTML += getBasketItemTemplate(
                currentBasketItem, pizzaData
            );   
        }
        let deliveryCost = 5.00 ;
        if (subtotal>=49.99){
            deliveryCost = 0;
        }
        let totalPrice = subtotal + deliveryCost;
        basketContentRef.innerHTML += getBasketSummaryTemplate(
            subtotal, deliveryCost , totalPrice
        );
        basketContentRef.innerHTML += getBuyNowButtonTemplate();
    }
}

renderPizzas();
renderBasket();

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

function increaseAmount(id){
    let basketItem = basket.find(item => item.id === id);

    if (basketItem) {
        basketItem.amount++;
    }
    renderBasket();
}

function decreaseAmount(id){
    let basketItem = basket.find(item => item.id === id);

    if (basketItem.amount > 1) {
        basketItem.amount--;
    } else {
        let index = basket.findIndex(item => item.id === id);
        basket.splice(index, 1);
    }
    renderBasket();
}

function orderNow(){
    basket= [];
    renderBasket();
    showOrderDialog();
}

function showOrderDialog(){
    document.getElementById('order-dialog').classList.remove('d-none');
    setTimeout(() =>{
        closeOrderDialog();
    }, 3000);
}

function closeOrderDialog(){
    document.getElementById('order-dialog').classList.add('d-none');
}