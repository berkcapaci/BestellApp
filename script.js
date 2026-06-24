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
        basketContentRef.innerHTML = `
            <h2>Your Basket</h2>
            <div id="basket-list"></div>
        `;
        let basketItemsRef = document.getElementById('basket-list');
        let subtotal = 0;
        
        for (let i = 0; i < basket.length; i++) {
            let currentBasketItem = basket[i];
            let pizzaData = pizzas.find(
                pizza => pizza.id ===currentBasketItem.id
            );
            subtotal += currentBasketItem.amount * pizzaData.price;
             basketItemsRef.innerHTML += getBasketItemTemplate(
                currentBasketItem,
                pizzaData
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
    updateBasketBadge();
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

function increaseAmount(id) {
    let basketList = document.getElementById('basket-list');
    let scrollPosition = basketList ? basketList.scrollTop : 0;
    let basketItem = basket.find(item => item.id === id);
    if (basketItem) {
        basketItem.amount++;
    }
    renderBasket();
    document.getElementById('basket-list').scrollTop = scrollPosition;
}

function decreaseAmount(id) {
    let basketList = document.getElementById('basket-list');
    let scrollPosition = basketList ? basketList.scrollTop : 0;
    let basketItem = basket.find(item => item.id === id);
    if (basketItem.amount > 1) {
        basketItem.amount--;
    } else {
        let index = basket.findIndex(item => item.id === id);
        basket.splice(index, 1);
    }
    renderBasket();
    let newBasketList = document.getElementById('basket-list');
    if (newBasketList) {
        newBasketList.scrollTop = scrollPosition;
    }
}

function orderNow(){
    showOrderDialog();

    setTimeout(() => {
        basket = [];
        renderBasket();
        showMenu();
    }, 3000);
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

function toggleMobileBasket() {
    let basket = document.getElementById('basket-content');
    let pizzaContent = document.getElementById('pizza-content');

    basket.classList.toggle('mobile-open');
    pizzaContent.classList.toggle('d-none');
}

function showMenu() {
    document.getElementById('pizza-content').classList.remove('d-none');
    document.getElementById('basket-content').classList.remove('mobile-open');
}

function scrollToMenu() {
    document.querySelector('.menu-banner').scrollIntoView({ behavior: 'smooth' });
}

function showProfile() { alert('Profile page coming soon'); }

function updateBasketBadge() {
    let totalAmount = 0;

    for (let i = 0; i < basket.length; i++) {
        totalAmount += basket[i].amount;
    }

    document.querySelector('.basket-badge').innerHTML = totalAmount;
}



function deleteItem(id) {
    let basketItemIndex = basket.findIndex(
        currentBasketItem => currentBasketItem.id === id
    );

    basket.splice(basketItemIndex, 1);

    renderBasket();
}