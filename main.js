const pizzas = [
    {},
    {
        "id": 1,
        "nombre": "Muza",
        "ingredientes": ["Tomate", "Mozzarella", "Oregano"],
        "precio": 500,
        "img": "muza"
    },
    {
        "id": 2,
        "nombre": "Margarita",
        "ingredientes": ["Tomate", "Mozzarella", "Albahaca"],
        "precio": 600,
        "img": "margarita"
    },
    {
        "id": 3,
        "nombre": "Cuatro Quesos",
        "ingredientes": ["Mozzarella", "Gorgonzola", "Fontina", "Parmesano"],
        "precio": 800,
        "img": "cuatro-quesos"
    },
    {
        "id": 4,
        "nombre": "Fugazzeta",
        "ingredientes": ["Mozzarella", "Cebolla"],
        "precio": 600,
        "img": "fugazzeta"
    },
    {
        "id": 5,
        "nombre": "Calabresa",
        "ingredientes": ["Tomate", "Mozzarella", "Calabresa"],
        "precio": 700,
        "img": "calabresa"
    },
    {
        "id": 6,
        "nombre": "Jamon Y Morron",
        "ingredientes": ["Tomate", "Mozzarella", "Jamon", "Morron"],
        "precio": 700,
        "img": "jamonymorron"      
    }
]

const pizzasCont = document.getElementById('pizzas-cont');
const form = document.getElementById("form")
const falla = document.getElementById("falla")
const input = document.getElementById("pizzas-input");
const clear = document.getElementById("clear")

let menu = JSON.parse(localStorage.getItem('menu')) || []; // obtenemos los datos del localstorage o creamos un arreglo vacio

const saveLocalStorage = (menu) => { // funcion para guardar en el localstorage
    localStorage.setItem('menu', JSON.stringify(menu)) // guardamos el arreglo enu en el localstorage
};

const saveData = () => {
    const num = input.value 
    menu = [ // creamos un nuevo arreglo
        ...menu, // con los datos anteriores
        { // y agregamos la nueva pizza
            id: menu.length + 1,
            img: pizzas[num]["img"],
            nombre: pizzas[num]["nombre"],
            ingredientes: pizzas[num]["ingredientes"],
            precio: pizzas[num]["precio"],
        }
    ]
}

const renderPizza = (pizza) => {
    const {id, img, nombre, ingredientes, precio} = pizza; // destructuring
    return ` 
        <div class="pizzas" id="pizzas">
            <img class="delete" src="/img/close.png" alt="borrar" data-id="${id}">
            <img class="pizzas-img" src="/img/${img}.jpg" alt="imagen pizza">
            <div class="pizzas-text">
                <h2 class="pizzas-name">${nombre}</h2>
                <p class="pizzas-ing">${ingredientes}</p>
                <h4 class="pizzas-price">$${precio}</h4>
            </div> 
        </div>

    `
}

const renderMenu = () => {
    pizzasCont.innerHTML = menu.map((pizza) => renderPizza(pizza)).join('');
}

const hideDeleteAll = menu => {
    if(!menu.length){
      clear.classList.add('hidden');
      return
    }
    clear.classList.remove('hidden');
}

const submitForm = (e) => {
    e.preventDefault();
    let inputForm = input.value
    if(inputForm === "") {
        falla.innerHTML = `
            El campo esta vacio
        `
        falla.classList.remove("ok")
    } else if (inputForm > 6) {
        falla.innerHTML = `
            El ID ingresado no existe
        `
        falla.classList.remove("ok")
    }
    else {
        falla.classList.add("ok");
        saveData(); // guardamos los datos
        renderMenu(); // renderizamos el menu
        saveLocalStorage(menu); // guardamos en el localstorage
        hideDeleteAll(menu);
        input.value = ""
    }
}

const removePizza = (e) => {
    if(!e.target.classList.contains("delete")) return;
    const filterId = Number(e.target.dataset.id);
    menu = menu.filter((pizza) => pizza.id !== filterId)
    renderMenu();
    saveLocalStorage(menu)
    hideDeleteAll(menu);
}

const removeAll = () => {
    menu = [];
    renderMenu();
    saveLocalStorage(menu);
    hideDeleteAll(menu);
}

const init = () => {
    renderMenu();
    form.addEventListener('submit', submitForm); // al enviar el formulario se ejecuta la funcion submitForm
    pizzasCont.addEventListener("click", removePizza)
    clear.addEventListener("click", removeAll)
    hideDeleteAll(menu);
}

init();