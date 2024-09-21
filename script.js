document.getElementById("btn").addEventListener("click",()=>{
    if(formValidate()){
    var incomeSalary=Number(document.getElementById("addIncome").value);
    var livingExpense=Number(document.getElementById("Livingexpense").value);
    var taxes=Number(document.getElementById("taxes").value);
    var incomeInvestment=Number(document.getElementById("income").value);
    var loans=Number(document.getElementById("loans").value);
    var loanAmount=Number(document.getElementById("paymentofloans").value);
    const objects=[];
    var array1={
            Income_Salary:incomeSalary,
            Living_expenses:livingExpense,
            Taxes:taxes,
            Income_Investment:incomeInvestment,
            Loans:loans,
            Loan_amount:loanAmount,
            Balance:incomeSalary+incomeInvestment-livingExpense-taxes-loanAmount,
    }
    var data=JSON.parse(localStorage.getItem("Values"))||[];
    data.push(array1);
    localStorage.setItem("Values",JSON.stringify(data));
    
    Calculate();
}
});

function Calculate(){
    var val=JSON.parse(localStorage.getItem("Values"))||[];
    var tag=document.getElementById("h1");
    tag.innerHTML="";
    val.forEach((element) => {
        tag.innerHTML=
      `<p>Total Income(including Salary and Investment): <span>Rs.${element.Income_Salary+element.Income_Investment}<span></p>
      <p>Total Expenses:<span> Rs.${element.Taxes+element.Living_expenses}<span></p>
        <p>The interest of the loan: <span>Rs.${0.14*element.Loans}<span></p>
        <p>The amount apart from loan interest:<span> Rs.${element.Loan_amount-0.14*element.Loans}<span></p>
       <p>Remaining loan after payment: <span> Rs.${element.Loans-element.Loan_amount}</span></p>`;
       if(element.Balance>=0){
        tag.innerHTML+=`<p>Remaining Balance:<span> Rs.${element.Balance}<span></p>`;
       }else{
       tag.innerHTML+=`<p>Remaining Balance:<span> Rs.${element.Balance} (The Balance is in Negative this month.)<span></p>`;
       }
    });
    document.getElementById("addIncome").value="";
    document.getElementById("Livingexpense").value="";
    document.getElementById("taxes").value="";
    document.getElementById("income").value="";
    document.getElementById("loans").value="";
    document.getElementById("paymentofloans").value="";
}
function formValidate(){
    let Valid=true;
    var incomeSalary=document.getElementById("addIncome").value;
    var livingExpense=document.getElementById("Livingexpense").value;
    var taxes=document.getElementById("taxes").value;
    var incomeInvestment=document.getElementById("income").value;
    var loans=document.getElementById("loans").value;
    var loanAmount=document.getElementById("paymentofloans").value;
    var Error=document.getElementById("error");
    Error.innerHTML="";
    if(isNaN(incomeSalary) || incomeSalary <= 0 || 
        isNaN(livingExpense) || livingExpense <= 0 || 
        isNaN(taxes) || taxes <= 0 || 
        isNaN(incomeInvestment) || incomeInvestment <= 0 || 
        isNaN(loans) || loans <= 0 || 
        isNaN(loanAmount) || loanAmount <= 0){
        Error.innerHTML="Error!!! Amounts must be a positive value";
        Valid=false;
    }else if(loanAmount<0.14*loans){
        Error.innerHTML="Error!!! Loan Amount must be greater than the amount of Interest i.e. 14% of loan amount";
        Valid=false;
    }else if(loanAmount>loans){
        Error.innerHTML="Error!!! Loan Amount must be less than or equal to loans";
        Valid=false;
    }
    else{
        Error.innerHTML="";
    }
    return Valid;
}