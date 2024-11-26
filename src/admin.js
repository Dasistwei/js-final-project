import axios from 'axios';
// C3.js
let chart = {}
// let chart = c3.generate({
//   bindto: "#chart", // HTML 元素綁定
//   data: {
//     type: "pie",
//     columns: [
//       ["Louvre 雙人床架", 1],
//       ["Antony 雙人床架", 2],
//       ["Anty 雙人床架", 3],
//       ["其他", 4],
//     ],
//     colors: {
//       "Louvre 雙人床架": "#DACBFF",
//       "Antony 雙人床架": "#9D7FEA",
//       "Anty 雙人床架": "#5434A7",
//       其他: "#301E5F",
//     },
//   },
// });


const orderList =
  document.querySelector(".orderPage-table").children[0].nextElementSibling;
const deleteAllBtn = document.querySelector(".discardAllBtn");
const url = import.meta.env.VITE_ADMIN_URL;
const token = import.meta.env.VITE_API_TOKEN;

let orders = [];

let headers = {
  headers: {
    accept: "application/json",
    authorization: token,
  },
};

// 修改
// 刪除訂單後圖表也需要更改 ok
// 目前缺少修改訂單狀態的功能，可再嘗試看看 ok

function countCategory(orders) {
  let categoryCount = {}
  orders.forEach((order) => {
    order.products.forEach((product) => {
      const { category, quantity } = product;
      categoryCount[category] = (categoryCount[category] || 0) + quantity;
    });
  });
  return categoryCount;
}

function init() {
  orderList.innerHTML = "";
  getOrders();
}

init();

// 取得訂單
function getOrders() {
  axios
    .get(url, headers)
    .then((res) => {
      orders = res.data.orders;
      renderChart(orders);
      renderOrders(orders);
    })
    .catch((err) => {
      console.log(err);
    });
}

// 修改訂單狀態
function updateOrder(orderId, status) {
  let data = {
    data: {
      id: orderId,
      paid: status
    }
  }
  axios.put(url, data, headers)
    .then((res) => {
      renderOrders(res.data.orders)
    })
    .catch(err => {
      console.log(err)
    })
}
// 刪除單筆訂單
function deleteOneOrder(orderId) {
  axios
    .delete(url + `/${orderId}`, headers)
    .then((res) => {
      if (res.data.status) {
        renderOrders(res.data.orders);
        renderChart(res.data.orders);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 刪除全部訂單
function deleteAllOrders() {
  axios
    .delete(url, headers)
    .then((res) => {
      if (res.data.status) {
        renderOrders([]);
        renderChart([])
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 渲染訂單資料
function renderOrders(orders) {
  let str = "";
  if (orders.length === 0) {
    str = "";
  } else {
    orders.forEach((order) => {
      const productItems = order.products.reduce((acc, product) => {
        return (acc += `<p>${product.title}</p>`);
      }, "");
      str += `
         <tr data-id=${order.id}>
            <td>${order.id}</td>
            <td>
              <p>${order.user.name}</p>
              <p>${order.user.tel}</p>
            </td>
            <td>${order.user.address}</td>
            <td>${order.user.email}</td>
            <td>
              ${productItems}
            </td>
            <td>${formattedDate(order.createdAt)}</td>
            <td class="orderStatus">
              <a data-isPaid=${order.paid} href="#">${order.paid ? "已處理" : "未處理"}</a>
            </td>
            <td>
              <input type="button" class="delSingleOrder-Btn" value="刪除" />
            </td>
          </tr>
        `;
    });
  }
  orderList.innerHTML = str;
}

function formattedDate(timestamp) {
  const date = new Date(timestamp * 1000);
  // 格式化為 YYYY/MM/DD
  const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
  return formattedDate;
}

function renderChart(orders) {
  let categoryCount = countCategory(orders);

  let chatData = {
    bindto: "#chart", // HTML 元素綁定
    data: {
      type: "pie",
      columns: [],
      colors: {
        床架: "#DACBFF",
        收納: "#9D7FEA",
        窗簾: "#5434A7",
      },
    },
  };
  chatData.data.columns = Object.entries(categoryCount);

  chart = c3.generate(chatData);
}

deleteAllBtn.addEventListener("click", (e) => {
  e.preventDefault();
  deleteAllOrders();
});

orderList.addEventListener("click", (e) => {
  e.preventDefault()
  const orderId = e.target.parentElement.parentElement.getAttribute("data-id");

  // 刪除單筆訂單
  if (e.target.getAttribute("class") === "delSingleOrder-Btn") {
    deleteOneOrder(orderId);
    return
  }

  //修改訂單狀態
  if (e.target.parentElement.getAttribute("class") === "orderStatus") {
    const isPaid = JSON.parse(e.target.getAttribute("data-ispaid"))
    updateOrder(orderId, !isPaid)
  }
});
