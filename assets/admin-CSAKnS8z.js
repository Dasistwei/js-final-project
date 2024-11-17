import{a as c}from"./index-DTstCwtB.js";c3.generate({bindto:"#chart",data:{type:"pie",columns:[["Louvre 雙人床架",1],["Antony 雙人床架",2],["Anty 雙人床架",3],["其他",4]],colors:{"Louvre 雙人床架":"#DACBFF","Antony 雙人床架":"#9D7FEA","Anty 雙人床架":"#5434A7",其他:"#301E5F"}}});let o={};const i=document.querySelector(".orderPage-table").children[0].nextElementSibling,g=document.querySelector(".discardAllBtn"),s="https://livejs-api.hexschool.io/api/livejs/v1/admin/wei8659/orders",h="cdMKnYbSFCXDKSdP8u7sQI03jin2";let d=[],l={headers:{accept:"application/json",authorization:h}};function f(t){t.forEach(e=>{e.products.forEach(n=>{const{category:a,quantity:r}=n;o[a]=(o[a]||0)+r})})}function A(){i.innerHTML="",m()}A();function m(){c.get(s,l).then(t=>{d=t.data.orders,f(d),S(),u(d)}).catch(t=>{console.log(t)})}function $(t){c.delete(s+`/${t}`,l).then(e=>{e.data.status&&u(e.data.orders)}).catch(e=>{console.log(e)})}function y(){c.delete(s,l).then(t=>{t.data.status&&u([])}).catch(t=>{console.log(t)})}function u(t){let e="";t.length===0?e="":t.forEach(n=>{const a=n.products.reduce((r,p)=>r+=`<p>${p.title}</p>`,"");e+=`
         <tr>
            <td>${n.id}</td>
            <td>
              <p>${n.user.name}</p>
              <p>${n.user.tel}</p>
            </td>
            <td>${n.user.address}</td>
            <td>${n.user.email}</td>
            <td>
              ${a}
            </td>
            <td>${D(n.createdAt)}</td>
            <td class="orderStatus">
              <a href="#">${n.paid?"已付款":"未付款"}</a>
            </td>
            <td>
              <input data-id=${n.id} type="button" class="delSingleOrder-Btn" value="刪除" />
            </td>
          </tr>
        `}),i.innerHTML=e}function D(t){const e=new Date(t*1e3);return`${e.getFullYear()}/${(e.getMonth()+1).toString().padStart(2,"0")}/${e.getDate().toString().padStart(2,"0")}`}function S(){let t={bindto:"#chart",data:{type:"pie",columns:[],colors:{床架:"#DACBFF",收納:"#9D7FEA",窗簾:"#5434A7"}}};t.data.columns=Object.entries(o),c3.generate(t)}g.addEventListener("click",t=>{t.preventDefault(),y()});i.addEventListener("click",t=>{if(t.target.getAttribute("class")==="delSingleOrder-Btn"){const e=t.target.getAttribute("data-id");$(e)}});
