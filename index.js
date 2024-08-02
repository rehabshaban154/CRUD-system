let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let dis=document.getElementById('dis');
let Total=document.getElementById('Total');
let category=document.getElementById('category');
let submit=document.getElementById('submit');

 
let mood='create';
let temp;
//total
function gettotal(){
   if(price.value !=''){
    let result= (+price.value+ +taxes.value+ +ads.value) - +dis.value;
    Total.innerHTML=result;
    Total.style.backgroundColor ='#040';
   }
   else{
    Total.innerHTML='';
    Total.style.backgroundColor ='#d22b2b'
   }
}
let data;
//creat product

//save in localstorage
if(localStorage.product !=null){
   data=JSON.parse(localStorage.product);
}
else{
   data=[];
}

submit.onclick= function(){
let newpro={
title:title.value.toLowerCase(),
price:price.value,
ads:ads.value,
taxes:taxes.value,
dis:dis.value,
Total:Total.innerHTML,
count:count.value,
category:category.value.toLowerCase(),
}
if(title.value !='' && price.value !='' && category.value !='' && newpro.count<100){
   if(mood=='create'){
      if(newpro.count > 1){
         for(let i=0;i< newpro.count; i++){
            data.push(newpro);
         }
      }
         else{
            data.push(newpro);
         }
         clear();
   }
   else{
      data[temp]=newpro;
      mood='create';
      submit.innerHTML='create';
      count.style.display='block';
   }
}


localStorage.setItem('product',  JSON.stringify(data));
show();
}
//clear inputs
function clear(){
title.value='';
count.value='';
category.value='';
taxes.value='';
price.value='';
ads.value='';
Total.innerHTML='';
}
//read
function show(){
let tabel='';
for(let i=0; i< data.length;i++){
   tabel += `
   <tr>
   <td>${i+1}</td>
   <td>${data[i].title}</td>
   <td>${data[i].price}</td>
   <td>${data[i].taxes}</td>
   <td>${data[i].ads}</td>
   <td>${data[i].dis}</td>
   <td>${data[i].Total}</td>
   <td>${data[i].category}</td>
   <td><button style="    background-color: #0b97c8; color: white;" onclick="update(${i})">Updata</button></td>
   <td><button style="    background-color: #ff0000c9; color: white;" onclick="delet(${i})">Delete</button></td>
</tr>
 `
}
document.getElementById('tbody').innerHTML=tabel;
let btndel=document.getElementById('deletall');
if(data.length > 0){
btndel.innerHTML=`<button style="background-color: #ff0000c9; color: white;" onclick="delall()">Delete ALL(${data.length})</button>`;
}
else{
   btndel.innerHTML='';
}
}
show();
//delete
function delet(i){
data.splice(i,1);
localStorage.product=JSON.stringify(data);
show();
// gettotal();
}
//delete all 
function delall(){
   localStorage.clear();
   data.splice(0);
   show();
}
//count
update
function update(i){
   mood='update';
   title.value=data[i].title;
   price.value=data[i].price;
   taxes.value=data[i].taxes;
   ads.value=data[i].ads;
   dis.value=data[i].dis;
   category.value=data[i].category;
   gettotal();
   count.style.display='none';
   submit.innerHTML='update';
   temp=i;
   scroll({
      top:0,
      behavior:"smooth",
   })
   
}
//search
//placeholder
let sermood='title';
function getsearchmood(id){
   let search=document.getElementById('search');
if(id =='searchtitle'){
   sermood='title';
}
else{
   sermood ='category';
}
search.Placeholder='Search By'+sermood;
search.focus();
search.value='';
show();
}
function searchdata(value){
   let tabel='';
   for(let i=0;i<data.length;i++){
      if(sermood == 'title'){
         if(data[i].title.includes(value.toLowerCase())){
          
            tabel += `
            <tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].dis}</td>
            <td>${data[i].Total}</td>
            <td>${data[i].category}</td>
            <td><button onclick="update(${i})">Updata</button></td>
            <td><button onclick="delet(${i})">Delete</button></td>
         </tr>
          `
         }
      }
      else{
        
            if(data[i].category.includes(value.toLowerCase())){
             
               tabel += `
               <tr>
               <td>${i+1}</td>
               <td>${data[i].title}</td>
               <td>${data[i].price}</td>
               <td>${data[i].taxes}</td>
               <td>${data[i].ads}</td>
               <td>${data[i].dis}</td>
               <td>${data[i].Total}</td>
               <td>${data[i].category}</td>
               <td><button onclick="update(${i})">Updata</button></td>
               <td><button onclick="delet(${i})">Delete</button></td>
            </tr>
             `
            }
      }
   }
document.getElementById('tbody').innerHTML=tabel;
}



//clean
