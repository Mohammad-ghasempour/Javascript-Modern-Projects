const loadAllEvents = () => {
  document.getElementById("loan-form").addEventListener("submit", (e) => {
    document.getElementById("results").style.display = "none";
    if (!(amount.value && interest.value && years.value)) {
      alert("Please fill out all fields to proceed");
    } else {
      document.getElementById("loading").style.display = "block";
      setTimeout(calculateResult, Math.floor(Math.random() * 9 + 1) * 100);
    }

    e.preventDefault();
  });
};

const calculateResult = () => {
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");
  const CalculateButton = document.querySelector(".btn");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    document.getElementById("loading").style.display = "none";
    document.getElementById("results").style.display = "block";
  } else {
    showError("Please check your numbers!");
  }
};

const clearError = () => {
  document.querySelector(".alert").remove();
  document.querySelector(".btn").disabled = false;
};

const showError = (error) => {
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  card.insertBefore(errorDiv, heading);
  document.getElementById("loading").style.display = "none";

  // to prevent multi click on Calculate button
  document.querySelector(".btn").disabled = true;
  setTimeout(clearError, 3000);
};

loadAllEvents();
