import{a as n}from"./index-DTstCwtB.js";const h=document.querySelector(".productWrap"),g=document.querySelector(".productSelect"),p=document.querySelector(".shoppingCart-table"),i=document.querySelector(".orderInfo-form"),f=document.querySelectorAll(".orderInfo-message");let s=[];const o="https://livejs-api.hexschool.io/api/livejs/v1/customer/wei8659";let c={};function m(){y(),v(),f.forEach(t=>{t.style.display="none"})}m();function y(){n.get(o+"/products").then(t=>{s=t.data.products,u(t.data.products)}).catch(t=>{console.log(t)})}function v(){n.get(o+"/carts").then(t=>{const{carts:e,finalTotal:a}=t.data;d(e,a)}).catch(t=>{console.log(t)})}function $(t){n.post(o+"/carts",{data:{productId:t,quantity:1}}).then(e=>{const{carts:a,finalTotal:r}=e.data;d(a,r)}).catch(e=>{console.log(e)})}function T(t,e){n.patch(o+"/carts",{data:{id:t,quantity:e}},{headers:{accept:"application/json","Content-Type":"application/json"}}).then(a=>{const{carts:r,finalTotal:l}=a.data;d(r,l)}).catch(a=>{console.log(a)})}function C(t){n.delete(o+"/carts/"+t,{data:{id:t}}).then(e=>{const{carts:a,finalTotal:r}=e.data;d(a,r)}).catch(e=>{console.log(e)})}function b(){n.delete(o+"/carts").then(t=>{const{carts:e,finalTotal:a}=t.data;d(e,a)}).catch(t=>{console.log(t)})}function A(){n.post(o+"/orders",{data:{user:{name:c.customerName,tel:c.customerPhone,email:c.customerEmail,address:c.customerAddress,payment:c.tradeWay}}},{headers:{accept:"application/json","Content-Type":"application/json"}}).then(t=>{console.log(t),c={},i.reset()}).catch(t=>{console.log(t)})}function u(t){let e="";t.forEach(a=>{e+=`
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
          `}),p.innerHTML=`
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
        `}h.addEventListener("click",t=>{if(t.preventDefault(),t.target.getAttribute("class")==="addCardBtn"){let e=t.target.getAttribute("data-id");$(e)}});g.addEventListener("change",t=>{if(t.preventDefault(),t.target.value==="全部")return u(s);const e=s.filter(a=>t.target.value===a.category);u(e)});p.addEventListener("click",t=>{if(t.preventDefault(),t.target.textContent.trim()==="clear"&&t.target.hasAttribute("data-cartitem-id")){let e=t.target.getAttribute("data-cartitem-id");C(e)}t.target.getAttribute("class")==="discardAllBtn"&&b()});p.addEventListener("change",t=>{let e=t.target.value*1,a=t.target.closest("tr").getAttribute("data-cartitem-id");T(a,e)});i.addEventListener("change",t=>{t.preventDefault(),c[t.target.id]=t.target.value,c.tradeWay||(c.tradeWay=document.querySelector("#tradeWay").value)});i.addEventListener("click",t=>{if(t.preventDefault(),t.target.getAttribute("class")==="orderInfo-btn"){let e=0;i.querySelectorAll(".orderInfo-inputWrap > input").forEach(a=>{a.value?a.nextElementSibling.style.display="none":(a.nextElementSibling.style.display="block",e+=1)}),e===0&&A()}});
