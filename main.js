// Elements
const tableBody = document.querySelector("tbody");
const typeSelect = document.querySelector("select#type");
const dateInput = document.querySelector("input#date");
const titleInput = document.querySelector("input#title");
const amountInput = document.querySelector("input#amount");
const addButton = document.querySelector("button#add");

const defaultDate = new Date();

dateInput.value = [
  defaultDate.getFullYear().toString().padStart(4, "0"),
  (defaultDate.getMonth() + 1).toString().padStart(2, "0"),
  defaultDate.getDate().toString().padStart(2, "0"),
].join("-");

// Reset validation state of input on focus
(() => {
  [typeSelect, dateInput, titleInput, amountInput].forEach((input) => {
    input.addEventListener("focus", () => {
      input.classList.remove("invalid");
    });
  });
})();

const validateInputs = () => {
  // Reset validation state of all inputs
  [typeSelect, dateInput, titleInput, amountInput].forEach((input) => {
    input.classList.remove("invalid");
  });

  // Find first empty input (if exists)
  const emptyInput = [typeSelect, dateInput, titleInput, amountInput].find(
    (input) => !input.value
  );

  // Mark it as invalid
  if (emptyInput) {
    emptyInput.classList.add("invalid");
    return false;
  }

  // If value of titleInput is not a number, mark it as invalid
  if (isNaN(+amountInput.value)) {
    amountInput.classList.add("invalid");
    return false;
  }

  return true;
};

const addExpenceItem = () => {
  // Validate inputs
  if (!validateInputs()) return;

  // Create tr element
  const tr = document.createElement("tr");

  // Create td element for each one of inputs
  const tds = [typeSelect, dateInput, titleInput, amountInput].map((input) => {
    const td = document.createElement("td");
    td.innerHTML = input.value;
    return td;
  });

  // Create td element for option column
  const tdOption = document.createElement("td");

  // Create a button that can remove this row
  const btnRemove = document.createElement("button");
  btnRemove.innerText = "-";
  btnRemove.addEventListener("click", () => {
    tr.remove();
  });

  // Put this button inside the td of option column
  tdOption.appendChild(btnRemove);

  // Append all created td elements inside the tr element
  tds.forEach((td) => {
    tr.appendChild(td);
  });
  tr.appendChild(tdOption);

  // Append this row inside table body
  tableBody.appendChild(tr);

  // Reset titleInput and amountInput
  [titleInput, amountInput].forEach((inp) => {
    inp.value = "";
  });
};
// Add new expense item once the "Add" button is clicked.
addButton.addEventListener("click", addExpenceItem);
