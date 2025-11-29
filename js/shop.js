import {
  buy,
  updateCartItemPrice,
  applyPromotionsCart,
  calculateTotal,
  cleanCartLogic,
  updateCartList,
  cartList,
  incrementQuantity,
  decrementQuantity,
  removeProduct,
} from "./cartLogic.js";

import { cleanCartUi, printCartUi } from "./cartUi.js";

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

const cleanButton = document.getElementById("clean-cart");
if (cleanButton) {
  cleanButton.addEventListener("click", () => {
    cleanCartLogic();
    cleanCartUi();
  });
}

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

        if (elementoCliqueado.classList.contains("btn-sumar")) {
          incrementQuantity(idElementoCliqueado);
          printCartUi();
        } else if (elementoCliqueado.classList.contains("btn-restar")) {
          if (product.quantity === 1) {
            removeProduct(idElementoCliqueado);
          } else {
            decrementQuantity(idElementoCliqueado);
          }
          printCartUi();
        }
      }
    });
  }
};

const open_modal = () => {
  calculateTotal();
  printCartUi();
};

export function disableCheckoutButton() {
  const checkoutButton = document.getElementById("checkoutButton");
  if (!checkoutButton) return;

  if (cartList.length === 0) {
    checkoutButton.setAttribute("disabled", "");
  } else {
    checkoutButton.removeAttribute("disabled");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  disableCheckoutButton();

  const checkoutButton = document.getElementById("checkoutButton");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      if (!checkoutButton.hasAttribute("disabled")) {
        window.location.href = "./checkout.html";
      }
    });
  }
});

removeFromCart();
open_modal();

window.open_modal = open_modal;
