import axios from 'axios';

const productList = document.querySelector(".productWrap");
const productSelect = document.querySelector(".productSelect");
const cart = document.querySelector(".shoppingCart-table");
const orderForm = document.querySelector(".orderInfo-form");
const orderFormBtn = document.querySelector(".orderInfo-btn");
const errMessages = document.querySelectorAll(".orderInfo-message");
let productDatas = [];
let cartData = [];
const url = import.meta.env.VITE_CLIENT_URL;
let formData = {};
// fix
// 可使用 alert 或其他彈出視窗讓使用者得知操作完成或失敗 ok
// 若購物車沒商品，不可送出訂單，可在發出請求前先加入判斷，減少 API 請求次數 ok
// 送出訂單後，可重新渲染購物車，目前送出後購物車狀態沒有刷新 ok
// 可加入表單驗證：全部欄位必填、電話號碼八碼、信箱格式 ok

function init() {
  getProducts();
  getCart();
  errMessages.forEach((errMessage) => {
    errMessage.style.display = "none";
  });
}
init();

function getProducts() {
  axios
    .get(url + "/products")
    .then((res) => {
      // console.log(res.data.products);
      productDatas = res.data.products;
      renderProduct(res.data.products);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getCart() {
  axios
    .get(url + "/carts")
    .then((res) => {
      const { carts, finalTotal } = res.data;
      cartData = carts;
      renderCart(carts, finalTotal);
    })
    .catch((err) => {
      console.log(err);
    });
}

function addToCart(id) {
  axios
    .post(url + "/carts", {
      data: {
        productId: id,
        quantity: 1,
      },
    })
    .then((res) => {
      // console.log(res.data.carts);
      const { carts, finalTotal } = res.data;
      cartData = carts;
      renderCart(carts, finalTotal);
    })
    .catch((err) => {
      console.log(err);
    });
}

function editCart(cartItemId, quantity) {
  axios
    .patch(
      url + "/carts",
      {
        data: {
          id: cartItemId,
          quantity: quantity,
        },
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      const { carts, finalTotal } = res.data;
      renderCart(carts, finalTotal);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeOneFromCart(cartItemId) {
  axios
    .delete(url + "/carts/" + cartItemId, {
      data: {
        id: cartItemId,
      },
    })
    .then((res) => {
      const { carts, finalTotal } = res.data;
      cartData = carts;
      renderCart(carts, finalTotal);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeAllFromCart() {
  axios
    .delete(url + "/carts")
    .then((res) => {
      const { carts, finalTotal } = res.data;
      cartData = carts;
      renderCart(carts, finalTotal);
    })
    .catch((err) => {
      console.log(err);
    });
}

function createOrder() {
  axios
    .post(
      url + "/orders",
      {
        data: {
          user: {
            name: formData.customerName,
            tel: formData.customerPhone,
            email: formData.customerEmail,
            address: formData.customerAddress,
            payment: formData.tradeWay,
          },
        },
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        alert("訂購成功！");
        getCart()
        formData = {};
        orderForm.reset();
      } else {
        alert("訂購失敗！");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderProduct(products) {
  let str = "";
  products.forEach((product) => {
    str += `
                  <li class="productCard" data-category=${product.category}>
                    <h4 class="productType">新品</h4>
                    <img
                      src=${product.images}
                      alt=""
                    />
                    <a href="#" data-id=${product.id} class="addCardBtn">加入購物車</a>
                    <h3>${product.title}</h3>
                    <del class="originPrice">NT$${product.origin_price}</del>
                    <p class="nowPrice">NT$${product.price}</p>
                  </li>
                `;
  });

  productList.innerHTML = str;
}

function renderCart(cartItems, finalTotal) {
  let str = "";
  cartItems.forEach((cartItem) => {
    let cartItemTotalPrice = cartItem.product.price * cartItem.quantity;
    str += `
            <tr data-cartItem-id=${cartItem.id}>
              <td>
                <div class="cardItem-title">
                  <img src=${cartItem.product.images} alt="" />
                  <p>${cartItem.product.title}</p>
                </div>
              </td>
              <td>NT$${cartItem.product.price}</td>
              <td><input type="number" id="product-quantity" min="1" max="100" value=${cartItem.quantity} /></td>
              <td>NT$${cartItemTotalPrice}</td>
              <td class="discardBtn">
                <a href="#" data-cartItem-id=${cartItem.id} class="material-icons"> clear </a>
              </td>
            </tr>
          `;
  });

  cart.innerHTML =
    `
              <tr>
                <th width="40%">品項</th>
                <th width="15%">單價</th>
                <th width="15%">數量</th>
                <th width="15%">金額</th>
                <th width="15%"></th>
              </tr>` +
    str +
    `<td>
                  <a href="#" class="discardAllBtn">刪除所有品項</a>
                </td>
                <td></td>
                <td></td>
                <td>
                  <p>總金額</p>
                </td>
                <td>NT$${finalTotal}</td>
              </tr>
        `;
}

productList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.getAttribute("class") === "addCardBtn") {
    let productId = e.target.getAttribute("data-id");
    addToCart(productId);
  }
});

productSelect.addEventListener("change", (e) => {
  e.preventDefault();
  if (e.target.value === "全部") {
    return renderProduct(productDatas);
  }
  const result = productDatas.filter((productData) => {
    return e.target.value === productData.category;
  });
  renderProduct(result);
});

cart.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    e.target.textContent.trim() === "clear" &&
    e.target.hasAttribute("data-cartitem-id")
  ) {
    let cartItemId = e.target.getAttribute("data-cartitem-id");
    removeOneFromCart(cartItemId);
  }

  if (e.target.getAttribute("class") === "discardAllBtn") {
    removeAllFromCart();
  }
});
cart.addEventListener("change", (e) => {
  let newQuantity = e.target.value * 1;
  let cartItemId = e.target.closest("tr").getAttribute("data-cartitem-id");
  // console.log(cartItemId, newQuantity);
  editCart(cartItemId, newQuantity);
});

orderForm.addEventListener("change", (e) => {
  e.preventDefault();
  formData[e.target.id] = e.target.value;

  if (!formData["tradeWay"]) {
    formData["tradeWay"] = document.querySelector("#tradeWay").value;
  }
});


function validateForm(data) {
  // 可加入表單驗證：全部欄位必填、電話號碼八碼、信箱格式
  let constraints = {
    customerName: {
      presence: { message: "必填" },
    },
    tradeWay: {
      presence: { message: "必填" },
    },
    customerPhone: {
      presence: { message: "必填" },
      length: {
        is: 8,
        message: "電話必須為 8 碼"
      },
      format: {
        pattern: "^[0-9]+$",
        message: "請輸入正確的電話格式"
      }
    },
    customerEmail: {
      presence: { message: "必填" },
      email: {
        message: "email格式有誤"
      }
    },
    customerAddress: {
      presence: { message: "必填" },
    },
  };
  return validate(data, constraints)
}
function showFormErrors(errors) {
  orderForm
    .querySelectorAll(".orderInfo-inputWrap > input")
    .forEach((input) => {
      if (errors[input.id]) {
        let key = input.id.replace("customer", "").toLocaleLowerCase()
        let error = errors[input.id][0].replace(`Customer ${key}`, "")
        input.nextElementSibling.style.display = "block";
        input.nextElementSibling.textContent = error
      } else {
        input.nextElementSibling.style.display = "none";
      }
    });
}
// 若購物車沒商品，不可送出訂單，可在發出請求前先加入判斷，減少 API 請求次數
orderFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // 若購物車沒商品，不可送出訂單
  if (cartData.length === 0) {
    alert("購物車無商品，無法送出訂單")
    return;
  }
  const errors = validateForm(formData)

  if (errors) {
    showFormErrors(errors)
  } else {
    showFormErrors({})
    createOrder();
  }
});


