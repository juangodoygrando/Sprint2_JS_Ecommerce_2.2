// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
// Si tienes tiempo, puedes mover esta variable "products" a un archivo json o js y cargar los datos en este js. Se verá más profesional
const products = [
  {
    id: 1,
    name: "Cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];

// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration.
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.
// => Recordatorio: es extremadamente importante que depures tu código.
// ** Te ahorrará mucho tiempo y frustración.
// ** Entenderás el código mejor que usando console.log(), y también encontrarás errores más rápido.
// ** No dudes en pedir ayuda a tus compañeros o a tu mentor si todavía tienes problemas con la depuración.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
// Versión mejorada de cartList. El carrito es un array de productos (objetos), pero cada uno tiene un campo "quantity" para definir su cantidad, así que los productos no se repiten.

let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
let total = 0;

// Exercise 1

const productButton = document.querySelectorAll("[data-product-id]");
let id;
for (let product of productButton) {
  product.addEventListener("click", () => {
    id = Number(product.getAttribute("data-product-id"));

    buy(id);
    updateCartItemPrice();
    applyPromotionsCart();
    calculateTotal();
    open_modal();
  });
}

const buy = (id) => {
  // 2. Add found product to the cart array
  // 2. Agregar el producto encontrado al array cart

  for (let product of products) {
    if (id === product.id) {
      for (let productCart of cartList) {
        if (productCart.id === id) {
          productCart.quantity++;
          localStorage.setItem("cartList", JSON.stringify(cartList));

          return;
        }
      }
      cartList.push({
        ...product,
        quantity: 1,
        totalPriceElement: product.price,
      });
      localStorage.setItem("cartList", JSON.stringify(cartList));

      return;
    }
  }
};

const updateCartItemPrice = () => {
  for (let productCart of cartList) {
    productCart.totalPriceElement = productCart.quantity * productCart.price;
  }
  localStorage.setItem("cartList", JSON.stringify(cartList));
};

// Exercise 2

const cleanButton = document.getElementById("clean-cart");
if (cleanButton) {
  cleanButton.addEventListener("click", () => {
    cleanCart();
  });
}

const cleanCart = () => {
  cartList.splice(0, cartList.length);
  localStorage.setItem("cartList", JSON.stringify(cartList));

  total = 0;
  cartTable.innerHTML = "";
  totalPrice.textContent = 0;
  cartCount.textContent = 0;
};

// Exercise 3

const calculateTotal = () => {
  // Calculate total price of the cart using the "cartList" array
  let accumulator = 0;
  for (let product of cartList) {
    if (cartList.length != 0) {
      accumulator = accumulator + product.totalPriceElement;
    }
  }
  total = accumulator.toFixed(2);
  localStorage.setItem("cartList", JSON.stringify(cartList));
};

// Exercise 4
// Ejercicio 4
const applyPromotionsCart = () => {
  // Apply promotions to each item in the array "cart"
  // Aplicar promociones a cada elemento del array "cart"

  for (let productCart of cartList) {
    if (
      "offer" in productCart &&
      productCart.quantity >= productCart.offer.number
    ) {
      productCart.totalPriceElement =
        productCart.totalPriceElement * (1 - productCart.offer.percent / 100);
    }
  }
  localStorage.setItem("cartList", JSON.stringify(cartList));
};

// Exercise 5

const cartTable = document.getElementById("cart_list");
const totalPrice = document.getElementById("total_price");
const cartCount = document.getElementById("count_product");

const printCart = () => {
  // Fill the shopping cart modal manipulating the shopping cart dom

  let carritoProductosHTML = "";
  let cartItems = 0;

  if (cartTable && totalPrice) {
    for (let product of cartList) {
      cartItems += product.quantity;
      carritoProductosHTML += `<tr>
									<th scope="row">${product.name}</th>
									<td>$${product.price}</td>
									<td>
                    <div class="pl-1">
                      <button class="btn btn-outline-secondary btn-sm me-2 btn-restar" data-id="${
                        product.id
                      }">
                          <i class="fas fa-minus"></i>
                      </button>

                        <span class="cantidad">${product.quantity}</span>

                      <button class="btn btn-outline-secondary btn-sm ms-2 btn-sumar"  data-id="${
                        product.id
                      }">
                          <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </td>
									<td>$ ${product.totalPriceElement.toFixed(2)}</td>
								</tr>`;
    }
    cartTable.innerHTML = carritoProductosHTML;
    totalPrice.innerHTML = ` ${total}`;
    cartCount.textContent = cartItems;
  }

  localStorage.setItem("cartList", JSON.stringify(cartList));
};

// ** Nivell II **

// Exercise 7

const removeFromCart = () => {
  const parentElement = document.getElementById("cart_list");

  if (parentElement) {
    parentElement.addEventListener("click", (e) => {
      const elementoCliqueado = e.target.closest(".btn");
      let idElementoCliqueado = "";
      let product = "";

      if (elementoCliqueado != null) {
        idElementoCliqueado = parseInt(elementoCliqueado.dataset.id);
        product = cartList.find((item) => item.id === idElementoCliqueado);
      }

      if (elementoCliqueado.classList.contains("btn-sumar")) {
        product.quantity++;
        updateCartItemPrice();
        applyPromotionsCart();
        calculateTotal();
        printCart();
      } else if (elementoCliqueado.classList.contains("btn-restar")) {
        if (product.quantity === 1) {
          let indice = cartList.findIndex(
            (product) => product.id === idElementoCliqueado
          );
          cartList.splice(indice, 1);
          updateCartItemPrice();
          applyPromotionsCart();
          calculateTotal();
          printCart();
        } else {
          product.quantity--;
          updateCartItemPrice();
          applyPromotionsCart();
          calculateTotal();
          printCart();
        }
      }
    });
  }
  localStorage.setItem("cartList", JSON.stringify(cartList));
};

const open_modal = () => {
  calculateTotal();
  printCart();
};

removeFromCart();
open_modal();
