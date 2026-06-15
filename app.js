//const today = new Date().toISOString().split("T")[0];

//document.getElementById("date").min = today;
const resetnull=()=>{

    document.getElementById("desc").value=""
    document.getElementById("amount").value=""
    document.getElementById("date").value=""
    document.getElementById("category").value=""

}
const load=()=>{
    let expenses;//made a new object list 
    const stored=localStorage.getItem("expenses")//if present 
    if(stored){
        expenses=JSON.parse(stored)
    }
    else{
        expenses=[]
    }
    return expenses
    
}
const expenseBtn=document.getElementById("save")
expenseBtn.addEventListener("click",function(){
    const expense_desc=    document.getElementById("desc").value
    const expense_amount=  document.getElementById("amount").value
    const expense_date=    document.getElementById("date").value
    const expense_category=document.getElementById("category").value
    //object expense 
    if(expense_desc==="" || expense_amount<=0 || expense_amount>=10000000){
        alert("No desc provided!!")
        return
    }
    document.getElementById("amount").min=1;
    document.getElementById("amount").max=100000000;
    

    const expense={

        desc:    expense_desc,
        amount:  expense_amount,
        date:    expense_date,
        category:expense_category

    }
    let expenses=load();
    
    expenses.push(expense)
    localStorage.setItem("expenses",JSON.stringify(expenses))
    alert("Expense added!!")
    resetnull();
    renderlist(expenses);
    expenseUpdate();
    expenseperweek();
})

//new function to show transaction list
const renderlist=(expenses)=>{
const expenseList=document.getElementById("expense-list")
expenseList.innerHTML=""
if(expenses.length===0){
    expenseList.innerHTML="<li style='color='#5279b0' padding=20px >NO Records Found</li>"
}
expenses.forEach(expense => {
    
    const li=document.createElement("li")
    const desc=expense.desc
    const amount=expense.amount
    li.innerHTML=`<span>${desc} </span> <span> ${amount}</span>`;

    expenseList.appendChild(li)
})

}
expenses=load()
renderlist(expenses)

//expense update

const expenseUpdate=()=>{
    let expenses=load();
    let total=0;
    let date=new Date();
    expenses.forEach(expense=>{
        const expenseDate=new Date(expense.date);
        let diffday=(date-expenseDate)/(1000*60*60*24)
        if(diffday<=30){
            total +=Number(expense.amount);
        }
    })
    document.getElementById("expense").innerHTML=`<p>${total}</p>`;
}

expenseUpdate();
const expenseperweek=()=>{
    let expenses=load();
    let total=0;
    let date=new Date();
    expenses.forEach(expense=>{
        const expenseDate=new Date(expense.date);
        let diffday=(date-expenseDate)/(1000*60*60*24)
        if(diffday<=7){
            total +=Number(expense.amount);
        }
    })

    total=((total)/7).toFixed(2);
    console.log(total);
    document.getElementById("avg").innerHTML=`<p>${total}</p>`;
}

expenseperweek();

const searchBtn=document.getElementById("searchbox")
searchBtn.addEventListener("input",function(){
    const inputtext=searchBtn.value.toLowerCase();
    let expenses=load()
    //now filer
    const newexpenses=
        expenses.filter(expense=>
            expense.desc
            .toLowerCase().includes(inputtext)//sirfdescription lena(kind of name))
);
renderlist(newexpenses);
})