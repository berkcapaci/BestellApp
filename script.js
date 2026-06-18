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
    basketContentRef.innerHTML = getBasketTemplate();
}

renderPizzas();
renderBasket();