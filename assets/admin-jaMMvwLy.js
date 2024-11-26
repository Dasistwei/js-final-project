import{a as d}from"./index-DTstCwtB.js";const u=document.querySelector(".orderPage-table").children[0].nextElementSibling,g=document.querySelector(".discardAllBtn"),o="https://livejs-api.hexschool.io/api/livejs/v1/admin/wei8659/orders",f="cdMKnYbSFCXDKSdP8u7sQI03jin2";let l=[],i={headers:{accept:"application/json",authorization:f}};function h(t){let e={};return t.forEach(a=>{a.products.forEach(n=>{const{category:r,quantity:s}=n;e[r]=(e[r]||0)+s})}),e}function m(){u.innerHTML="",$()}m();function $(){d.get(o,i).then(t=>{l=t.data.orders,p(l),c(l)}).catch(t=>{console.log(t)})}function S(t,e){let a={data:{id:t,paid:e}};d.put(o,a,i).then(n=>{c(n.data.orders)}).catch(n=>{console.log(n)})}function A(t){d.delete(o+`/${t}`,i).then(e=>{e.data.status&&(c(e.data.orders),p(e.data.orders))}).catch(e=>{console.log(e)})}function D(){d.delete(o,i).then(t=>{t.data.status&&(c([]),p([]))}).catch(t=>{console.log(t)})}function c(t){let e="";t.length===0?e="":t.forEach(a=>{const n=a.products.reduce((r,s)=>r+=`<p>${s.title}</p>`,"");e+=`
         <tr data-id=${a.id}>
            <td>${a.id}</td>
            <td>
              <p>${a.user.name}</p>
              <p>${a.user.tel}</p>
            </td>
            <td>${a.user.address}</td>
            <td>${a.user.email}</td>
            <td>
              ${n}
            </td>
            <td>${b(a.createdAt)}</td>
            <td class="orderStatus">
              <a data-isPaid=${a.paid} href="#">${a.paid?"已處理":"未處理"}</a>
            </td>
            <td>
              <input type="button" class="delSingleOrder-Btn" value="刪除" />
            </td>
          </tr>
        `}),u.innerHTML=e}function b(t){const e=new Date(t*1e3);return`${e.getFullYear()}/${(e.getMonth()+1).toString().padStart(2,"0")}/${e.getDate().toString().padStart(2,"0")}`}function p(t){let e=h(t),a={bindto:"#chart",data:{type:"pie",columns:[],colors:{床架:"#DACBFF",收納:"#9D7FEA",窗簾:"#5434A7"}}};a.data.columns=Object.entries(e),c3.generate(a)}g.addEventListener("click",t=>{t.preventDefault(),D()});u.addEventListener("click",t=>{t.preventDefault();const e=t.target.parentElement.parentElement.getAttribute("data-id");if(t.target.getAttribute("class")==="delSingleOrder-Btn"){A(e);return}if(t.target.parentElement.getAttribute("class")==="orderStatus"){const a=JSON.parse(t.target.getAttribute("data-ispaid"));S(e,!a)}});
