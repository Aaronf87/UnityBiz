// const poList = document.querySelector(".po-list");
// const po = poList.children;

const pdf = async (event) => {
//   event.preventDefault();

  console.log(event);
};

document.querySelector(".po-list").addEventListener("click", (event) => {
    if (event.target.classList.contains("pdf")) {
        pdf(event.target);
    } else {
      return;
    }
  });



  const { jsPDF } = require("jspdf");

const doc = new jsPDF();

doc.text("Hello world!", 10, 10);
doc.save("a4.pdf");