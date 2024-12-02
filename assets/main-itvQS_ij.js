import{a as n}from"./index-DTstCwtB.js";const h=document.querySelector(".productWrap"),y=document.querySelector(".productSelect"),m=document.querySelector(".shoppingCart-table"),p=document.querySelector(".orderInfo-form"),v=document.querySelector(".orderInfo-btn"),$=document.querySelectorAll(".orderInfo-message");let i=[],s=[];const o="https://livejs-api.hexschool.io/api/livejs/v1/customer/wei8659";let c={};function T(){C(),f(),$.forEach(t=>{t.style.display="none"})}T();function C(){n.get(o+"/products").then(t=>{i=t.data.products,u(t.data.products)}).catch(t=>{console.log(t)})}function f(){n.get(o+"/carts").then(t=>{const{carts:e,finalTotal:a}=t.data;s=e,d(e,a)}).catch(t=>{console.log(t)})}function E(t){n.post(o+"/carts",{data:{productId:t,quantity:1}}).then(e=>{const{carts:a,finalTotal:r}=e.data;s=a,d(a,r)}).catch(e=>{console.log(e)})}function b(t,e){n.patch(o+"/carts",{data:{id:t,quantity:e}},{headers:{accept:"application/json","Content-Type":"application/json"}}).then(a=>{const{carts:r,finalTotal:l}=a.data;d(r,l)}).catch(a=>{console.log(a)})}function A(t){n.delete(o+"/carts/"+t,{data:{id:t}}).then(e=>{const{carts:a,finalTotal:r}=e.data;s=a,d(a,r)}).catch(e=>{console.log(e)})}function S(){n.delete(o+"/carts").then(t=>{const{carts:e,finalTotal:a}=t.data;s=e,d(e,a)}).catch(t=>{console.log(t)})}function q(){n.post(o+"/orders",{data:{user:{name:c.customerName,tel:c.customerPhone,email:c.customerEmail,address:c.customerAddress,payment:c.tradeWay}}},{headers:{accept:"application/json","Content-Type":"application/json"}}).then(t=>{t.status===200?(alert("訂購成功！"),f(),c={},p.reset()):alert("訂購失敗！")}).catch(t=>{console.log(t)})}function u(t){let e="";t.forEach(a=>{e+=`
                  <li class="productCard" data-category=${a.category}>
                    <h4 class="productType">新品</h4>
                    <img
                      src=${a.images}
                      alt=""
                    />
                    <a href="#" data-id=${a.id} class="addCardBtn">加入購物車</a>
                    <h3>${a.title}</h3>
                    <del class="originPrice">NT$${a.origin_price}</del>
                    <p class="nowPrice">NT$${a.price}</p>
                  </li>
                `}),h.innerHTML=e}function d(t,e){let a="";t.forEach(r=>{let l=r.product.price*r.quantity;a+=`
            <tr data-cartItem-id=${r.id}>
              <td>
                <div class="cardItem-title">
                  <img src=${r.product.images} alt="" />
                  <p>${r.product.title}</p>
                </div>
              </td>
              <td>NT$${r.product.price}</td>
              <td><input type="number" id="product-quantity" min="1" max="100" value=${r.quantity} /></td>
              <td>NT$${l}</td>
              <td class="discardBtn">
                <a href="#" data-cartItem-id=${r.id} class="material-icons"> clear </a>
              </td>
            </tr>
          `}),m.innerHTML=`
              <tr>
                <th width="40%">品項</th>
                <th width="15%">單價</th>
                <th width="15%">數量</th>
                <th width="15%">金額</th>
                <th width="15%"></th>
              </tr>`+a+`<td>
                  <a href="#" class="discardAllBtn">刪除所有品項</a>
                </td>
                <td></td>
                <td></td>
                <td>
                  <p>總金額</p>
                </td>
                <td>NT$${e}</td>
              </tr>
        `}h.addEventListener("click",t=>{if(t.preventDefault(),t.target.getAttribute("class")==="addCardBtn"){let e=t.target.getAttribute("data-id");E(e)}});y.addEventListener("change",t=>{if(t.preventDefault(),t.target.value==="全部")return u(i);const e=i.filter(a=>t.target.value===a.category);u(e)});m.addEventListener("click",t=>{if(t.preventDefault(),t.target.textContent.trim()==="clear"&&t.target.hasAttribute("data-cartitem-id")){let e=t.target.getAttribute("data-cartitem-id");A(e)}t.target.getAttribute("class")==="discardAllBtn"&&S()});m.addEventListener("change",t=>{let e=t.target.value*1,a=t.target.closest("tr").getAttribute("data-cartitem-id");b(a,e)});p.addEventListener("change",t=>{t.preventDefault(),c[t.target.id]=t.target.value,c.tradeWay||(c.tradeWay=document.querySelector("#tradeWay").value)});function L(t){let e={customerName:{presence:{message:"必填"}},tradeWay:{presence:{message:"必填"}},customerPhone:{presence:{message:"必填"},length:{is:8,message:"電話必須為 8 碼"},format:{pattern:"^[0-9]+$",message:"請輸入正確的電話格式"}},customerEmail:{presence:{message:"必填"},email:{message:"email格式有誤"}},customerAddress:{presence:{message:"必填"}}};return validate(t,e)}function g(t){p.querySelectorAll(".orderInfo-inputWrap > input").forEach(e=>{if(t[e.id]){let a=e.id.replace("customer","").toLocaleLowerCase(),r=t[e.id][0].replace(`Customer ${a}`,"");e.nextElementSibling.style.display="block",e.nextElementSibling.textContent=r}else e.nextElementSibling.style.display="none"})}v.addEventListener("click",t=>{if(t.preventDefault(),s.length===0){alert("購物車無商品，無法送出訂單");return}const e=L(c);e?g(e):(g({}),q())});
