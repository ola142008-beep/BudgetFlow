// ==============================
// BudgetFlow - script.js
// ==============================


// SALDO STARTOWE
const START_BALANCE = 25323.35;



let transactions =
JSON.parse(localStorage.getItem("transactions"))
||
[
   
{
date:"15.12.2025",
name:"Nike",
category:"Zakupy",
amount:-599
},

{
date:"03.11.2025",
name:"Apart - biżuteria",
category:"Biżuteria",
amount:-850
},

{
date:"28.10.2025",
name:"Wpłata gotówki",
category:"Wpłata",
amount:1500
},

{
date:"12.09.2025",
name:"Wypłata z bankomatu",
category:"Wypłata",
amount:-400
},

{
date:"25.08.2025",
name:"Zara",
category:"Ubrania",
amount:-320
},

{
date:"14.07.2025",
name:"Media Expert",
category:"Elektronika",
amount:-1299
},

{
date:"30.06.2025",
name:"Biedronka",
category:"Jedzenie",
amount:-186.45
},

{
date:"18.05.2025",
name:"Orlen",
category:"Transport",
amount:-280
},

{
date:"07.04.2025",
name:"Allegro",
category:"Zakupy",
amount:-245
},

{
date:"22.03.2025",
name:"Wpłata wynagrodzenia",
category:"Przychód",
amount:5200
},

{
date:"11.02.2025",
name:"H&M",
category:"Ubrania",
amount:-199
},

{
date:"05.01.2025",
name:"Restauracja",
category:"Jedzenie",
amount:-120
},


{
date:"10.07.2026",
name:"Wynagrodzenie",
category:"Przychód",
amount:7560
},

{
date:"08.07.2026",
name:"Zakupy spożywcze",
category:"Jedzenie",
amount:-340
},

{
date:"05.07.2026",
name:"Paliwo",
category:"Transport",
amount:-220
},

{
date:"02.07.2026",
name:"Internet",
category:"Rachunki",
amount:-79
},

{
date:"28.06.2026",
name:"Sprzedaż",
category:"Dodatkowy dochód",
amount:450
},

{
date:"20.06.2026",
name:"Rozrywka",
category:"Inne",
amount:-150
}

];





// FORMAT PLN

function money(value){

return value.toLocaleString(
"pl-PL",
{
style:"currency",
currency:"PLN"
}
);

}





// LICZENIE FINANSÓW

function updateFinance(){


let income =
transactions
.filter(t=>t.amount>0)
.reduce(
(sum,t)=>sum+t.amount,
0
);



let expense =
Math.abs(
transactions
.filter(t=>t.amount<0)
.reduce(
(sum,t)=>sum+t.amount,
0
)
);



let balance =
START_BALANCE
+
income
-
expense;



document.getElementById("balance")
.textContent =
money(balance);



document.getElementById("income")
.textContent =
money(income);



document.getElementById("expense")
.textContent =
money(expense);



localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);


}





// TABELA

// ==============================
// IKONY TRANSAKCJI
// ==============================

function getIcon(category){

if(category==="Biżuteria")
return "💎";

if(category==="Zakupy")
return "🛍️";

if(category==="Ubrania")
return "👗";

if(category==="Elektronika")
return "📱";

if(category==="Jedzenie")
return "🍔";

if(category==="Transport")
return "⛽";

if(category==="Wpłata")
return "💰";

if(category==="Wypłata")
return "💸";

if(category==="Przychód")
return "💵";


return "💳";



}



function renderTable(data){


const table =
document.getElementById("transactions");


if(!table) return;



table.innerHTML="";



data.forEach((t,index)=>{


let tr =
document.createElement("tr");



tr.innerHTML = `

<td>${t.date}</td>

<td>${getIcon(t.category)} ${t.name}</td>

<td>${t.category}</td>

<td class="${t.amount>=0?'plus':'minus'}">

${money(t.amount)}

</td>

<td>

<button onclick="deleteTransaction(${index})">
🗑️
</button>

</td>

`;



table.appendChild(tr);


});


}





renderTable(transactions);

updateFinance();
// ==============================
// USUWANIE TRANSAKCJI
// ==============================


function deleteTransaction(index){

transactions.splice(index,1);


renderTable(transactions);


updateFinance();


toast(
"🗑️ Usunięto transakcję"
);

}





// ==============================
// DODAWANIE TRANSAKCJI
// ==============================


const addButton =
document.getElementById(
"addTransaction"
);


if(addButton){


addButton.onclick=function(){


const name =
document.getElementById("newName")
.value;


const type =
document.getElementById("newType")
.value;


const amount =
Number(
document.getElementById("newAmount")
.value
);



if(!name || !amount){

toast(
"⚠️ Uzupełnij dane"
);

return;

}



transactions.unshift({

date:
new Date().toLocaleDateString("pl-PL"),


name:name,


category: category,


amount:
type==="income"
?
amount
:
-amount


});



renderTable(transactions);


updateFinance();



document.getElementById("newName")
.value="";


document.getElementById("newAmount")
.value="";



toast(
"💎 Dodano: " + name + " (" + money(Math.abs(amount)) + ")"
);

};


}






// ==============================
// WYSZUKIWANIE
// ==============================


const search =
document.getElementById(
"search"
);



if(search){


search.addEventListener(
"input",
function(){


const text =
this.value.toLowerCase();



const result =
transactions.filter(t=>

t.name
.toLowerCase()
.includes(text)

||

t.category
.toLowerCase()
.includes(text)

);



renderTable(result);



});


}

window.addEventListener("load",()=>{


const chart =
document.getElementById("expenseChart");


if(chart){


new Chart(chart,{

type:"line",

data:{

labels:[
"Styczeń",
"Luty",
"Marzec",
"Kwiecień",
"Maj",
"Czerwiec"
],

datasets:[{

label:"Wydatki miesięczne",

data:[
900,
1200,
700,
1500,
800,
1100
],

borderWidth:3,

tension:0.4

}]

},


options:{

responsive:true

}


});


}


});

// ==============================
// MENU STRON
// ==============================

document.addEventListener("DOMContentLoaded",()=>{

const buttons = document.querySelectorAll(".nav");
const pages = document.querySelectorAll(".page");


buttons.forEach(btn=>{

btn.addEventListener("click",()=>{


buttons.forEach(b=>{
b.classList.remove("active");
});


btn.classList.add("active");


pages.forEach(page=>{
page.classList.add("hidden");
});


const target =
document.getElementById(
btn.dataset.page
);


if(target){
target.classList.remove("hidden");
}


});


});

});
// ==============================
// WYKRES STATYSTYK KATEGORII
// ==============================

window.addEventListener("load",()=>{


const categoryCanvas =
document.getElementById("categoryChart");


if(categoryCanvas && typeof Chart !== "undefined"){


const categories = {};


transactions
.filter(t=>t.amount < 0)
.forEach(t=>{


if(!categories[t.category]){

categories[t.category]=0;

}


categories[t.category] += Math.abs(t.amount);


});



new Chart(categoryCanvas,{

type:"doughnut",

data:{

labels:Object.keys(categories),

datasets:[{

label:"Wydatki według kategorii",

data:Object.values(categories),

borderWidth:2

}]

},


options:{

responsive:true

}


});


}


});

// ==============================
// DODAWANIE TRANSAKCJI - MODAL
// ==============================


const modal = document.getElementById("transactionModal");

const openBtn = document.getElementById("addTransactionBtn");

const closeBtn = document.getElementById("closeModal");

const saveBtn = document.getElementById("saveTransaction");



if(openBtn){

openBtn.onclick = ()=>{

modal.style.display="flex";

};

}



if(closeBtn){

closeBtn.onclick = ()=>{

modal.style.display="none";

};

}




if(saveBtn){


saveBtn.onclick = ()=>{


const name =
document.getElementById("transName").value;


const type =
document.getElementById("transType").value;

const category =
document.getElementById("transCategory").value;

const amount =
Number(
document.getElementById("transAmount").value
);



if(!name || !amount){

toast("⚠️ Uzupełnij dane");

return;

}

transactions.unshift({

date:
new Date().toLocaleDateString("pl-PL"),

name:name,

category: category,

amount:
type==="income"
?
amount
:
-amount

});


renderTable(transactions);

updateFinance();



modal.style.display="none";



document.getElementById("transName").value="";
document.getElementById("transAmount").value="";


toast("✅ Dodano transakcję");


};


}
// ==============================
// LOGIN PIN PREMIUM
// ==============================

const loginBtn = document.getElementById("loginBtn");
const pinInput = document.getElementById("pinInput");
const loginScreen = document.getElementById("loginScreen");
const loginError = document.getElementById("loginError");


if(loginBtn){

loginBtn.onclick = ()=>{


const pin = pinInput.value;


if(pin === "0204"){


loginScreen.style.display="none";


localStorage.setItem(
"logged",
"true"
);


toast("💎 Witamy w BudgetFlow Premium");


}else{


loginError.textContent =
"❌ Nieprawidłowy PIN";


}


};


}


// sprawdzenie zapamiętanego logowania
   

localStorage.removeItem("logged");

if(
localStorage.getItem("logged")==="true"
){

if(loginScreen){

loginScreen.style.display="none";

}

}
// ==============================
// AUTOMATYCZNE BUDŻETY
// ==============================


function updateBudgets(){


const limits = {

"Jedzenie":1000,

"Zakupy":800,

"Transport":500,

"Rachunki":600

};



const spent = {};



transactions
.filter(t=>t.amount < 0)
.forEach(t=>{


if(!spent[t.category]){

spent[t.category]=0;

}


spent[t.category]+=Math.abs(t.amount);


});



function setProgress(id,category){


const bar =
document.getElementById(id);


if(bar){


let percent =
(spent[category] || 0)
/
limits[category]
*
100;


if(percent>100){

percent=100;

}


bar.style.width =
percent+"%";


}


}



setProgress(
"foodProgress",
"Jedzenie"
);


setProgress(
"shopProgress",
"Zakupy"
);


setProgress(
"transportProgress",
"Transport"
);


setProgress(
"billsProgress",
"Rachunki"
);



}



window.addEventListener(
"load",
updateBudgets
);