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

let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
let total = 0;



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

const calculateTotal = () => {
  let accumulator = 0;
  for (let product of cartList) {
    if (cartList.length != 0) {
      accumulator = accumulator + product.totalPriceElement;
    }
  }
  total = accumulator.toFixed(2);
  localStorage.setItem("cartList", JSON.stringify(cartList));
};

const applyPromotionsCart = () => {
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

const cartTable = document.getElementById("cart_list");
const totalPrice = document.getElementById("total_price");
const cartCount = document.getElementById("count_product");

const printCart = () => {
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
