let basket = [];

let pizzaContentRef = document.getElementById('pizza-content');

let basketContentRef = document.getElementById('basket-content');

function init() {
    pizzaContentRef =
        document.getElementById('pizza-content');

    basketContentRef =
        document.getElementById('basket-content');

    renderPizzas();
    renderBasket();
}

function renderPizzas(){
    pizzaContentRef.innerHTML ='';
    for (let i = 0; i < pizzas.length; i++) {
        let currentPizza = pizzas[i];
        pizzaContentRef.innerHTML += getPizzaTemplate(currentPizza);
    }
}

function renderBasketItems(basketItemsRef) {
    let subtotal = 0;
    for (let i = 0; i < basket.length; i++) {
        let currentBasketItem = basket[i];
        let pizzaData = pizzas.find(
            pizza => pizza.id === currentBasketItem.id
        );
        let itemTotalPrice =
            currentBasketItem.amount * pizzaData.price;
        subtotal += itemTotalPrice;
        basketItemsRef.innerHTML += getBasketItemTemplate(
            currentBasketItem,
            pizzaData,
            itemTotalPrice
        );
    }
    return subtotal;
}

function getDeliveryCost(subtotal) {
    if (subtotal >= 49.99) {
        return 0;
    }
    return 5.00;
}

function renderBasket() {
    if (basket.length === 0) {
        basketContentRef.innerHTML = getBasketTemplate();
    } else {
        basketContentRef.innerHTML =
            getBasketHeaderTemplate();
        let basketItemsRef =
            document.getElementById('basket-list');
        let subtotal =
            renderBasketItems(basketItemsRef);
        let deliveryCost =
            getDeliveryCost(subtotal);
        let finalPrice =
            subtotal + deliveryCost;
        basketContentRef.innerHTML +=
            getBasketSummaryTemplate(
                subtotal,
                deliveryCost,
                finalPrice
            );
        basketContentRef.innerHTML +=
            getBuyNowButtonTemplate();
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

function updateBasketItem(id, callback) {
    let basketList = document.getElementById('basket-list');
    let scrollPosition = basketList ? basketList.scrollTop : 0;

    let basketItem = basket.find(item => item.id === id);
    if (basketItem) {
        callback(basketItem);
    }
    renderBasket();
    let newBasketList = document.getElementById('basket-list');
    if (newBasketList) {
        newBasketList.scrollTop = scrollPosition;
    }
}

function increaseAmount(id) {
    updateBasketItem(id, basketItem => {
        basketItem.amount++;
    });
}

function decreaseAmount(id) {
    updateBasketItem(id, basketItem => {
        if (basketItem.amount > 1) {
            basketItem.amount--;
        } else {
            let index = basket.findIndex(
                item => item.id === id
            );
            basket.splice(index, 1);
        }
    });
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
    if (basketContentRef.classList.contains('mobile-open')) {
        basketContentRef.classList.remove('mobile-open');
        pizzaContentRef.classList.remove('d-none');
    } else {
        basketContentRef.classList.add('mobile-open');
        pizzaContentRef.classList.add('d-none');
    }
}

function showMenu() {
    pizzaContentRef.classList.remove('d-none');
    basketContentRef.classList.remove('mobile-open');
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

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.getElementById('basket-content')
            .classList.remove('mobile-open');

        document.getElementById('pizza-content')
            .classList.remove('d-none');
    }
});