import { cartList, total } from "./cartLogic.js";

export const cartTable = document.getElementById("cart_list");
export const totalPrice = document.getElementById("total_price");
export const cartCount = document.getElementById("count_product");

export const cleanCartUi = () => {
  cartTable.innerHTML = "";
  totalPrice.textContent = "0.00";
  cartCount.textContent = 0;
};

export function printCartUi() {
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
                <button class="btn btn-modalPrimary btn-sm me-2 btn-restar" data-id="${
                  product.id
                }">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="cantidad">${product.quantity}</span>
                <button class="btn btn-modalPrimary btn-sm ms-2 btn-sumar" data-id="${
                  product.id
                }">
                    <i class="fas fa-plus"></i>
                </button>
              </div>
            </td>
            <td>$ ${product.totalPriceElement.toFixed(2)}</td>
          </tr>`;
    }
  }

  cartTable.innerHTML = carritoProductosHTML;
  totalPrice.textContent = total;
  cartCount.textContent = cartItems;
}
