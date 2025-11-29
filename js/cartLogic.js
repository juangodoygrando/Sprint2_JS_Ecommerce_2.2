import { products } from "./products.js";
import { disableCheckoutButton } from "./shop.js";

export let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
export let total = JSON.parse(localStorage.getItem("totalNumber")) || 0;

export function updateCartList(newList) {
  cartList = newList;
  localStorage.setItem("cartList", JSON.stringify(cartList));
}

export function updateTotal(totalNum) {
  total = totalNum;
  localStorage.setItem("totalNumber", JSON.stringify(total));
}

export const buy = (id) => {
  for (let product of products) {
    if (id === product.id) {
      for (let productCart of cartList) {
        if (productCart.id === id) {
          productCart.quantity++;
          updateCartList(cartList);

          return;
        }
      }
      cartList.push({
        ...product,
        quantity: 1,
        totalPriceElement: product.price,
      });
      updateCartList(cartList);

      return;
    }
  }
};

export const updateCartItemPrice = () => {
  for (let productCart of cartList) {
    productCart.totalPriceElement = productCart.quantity * productCart.price;
  }
  updateCartList(cartList);
};

export const applyPromotionsCart = () => {
  for (let productCart of cartList) {
    if (
      "offer" in productCart &&
      productCart.quantity >= productCart.offer.number
    ) {
      productCart.totalPriceElement =
        productCart.totalPriceElement * (1 - productCart.offer.percent / 100);
    }
  }
  updateCartList(cartList);
};
export const calculateTotal = () => {
  let accumulator = 0;
  for (let product of cartList) {
    if (cartList.length != 0) {
      accumulator = accumulator + product.totalPriceElement;
    }
  }

  updateCartList(cartList);
  updateTotal(accumulator.toFixed(2));

  disableCheckoutButton();
};

export const cleanCartLogic = () => {
  cartList.splice(0, cartList.length);
  updateCartList(cartList);
  calculateTotal();
};

export const incrementQuantity = (idNumber) => {
  let product = cartList.find((item) => item.id === idNumber);
  product.quantity++;
  updateCartItemPrice();
  applyPromotionsCart();
  calculateTotal();
};

export const decrementQuantity = (idNumber) => {
  let product = cartList.find((item) => item.id === idNumber);
  product.quantity--;
  updateCartItemPrice();
  applyPromotionsCart();
  calculateTotal();
};

export const removeProduct = (idNumber) => {
  let indice = cartList.findIndex((product) => product.id === idNumber);

  cartList.splice(indice, 1);
  updateCartItemPrice();
  applyPromotionsCart();
  calculateTotal();
};
