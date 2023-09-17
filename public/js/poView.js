// Load jspdf globally
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
script.type = 'text/javascript';
document.head.appendChild(script);

script.onload = () => {
    import { poPDF } from '../../util/poPDF.js';

const poListEl = document.querySelector(".po-list");
// const po = poList.children;
const companyName = poListEl.dataset.companyname;
const companAddress = poListEl.dataset.companyaddress;
const companyCity = poListEl.dataset.companycity;
const companyState = poListEl.dataset.companystate;
const companyZip = poListEl.dataset.companyzip;
const companyPhone = poListEl.dataset.companyphone;

const renderPDF = async (element) => {
  //   event.preventDefault();
  const date = element.dataset.date;
  const poNumber = element.dataset.ponumber;
  const vendorInvoice = element.dataset.vendorinvoice;
  const vendorName = element.dataset.vendorname;
  const vendorAddress = element.dataset.vendoraddress;
  const vendorCity = element.dataset.vendorcity;
  const vendorState = element.dataset.vendorstate;
  const vendorZip = element.dataset.vendorzip;
  const vendorGoods = element.dataset.vendorgoods;
  const vendorDescription = element.dataset.vendordescription;
  const vendorCost = element.dataset.vendorcost;

  console.log(
    companyName,
    companAddress,
    companyCity,
    companyState,
    companyZip,
    companyPhone,
    date,
    poNumber,
    vendorInvoice,
    vendorName,
    vendorAddress,
    vendorCity,
    vendorState,
    vendorZip,
    vendorGoods,
    vendorDescription,
    vendorCost
  );

  poPDF(
    companyName,
    companAddress,
    companyCity,
    companyState,
    companyZip,
    companyPhone,
    date,
    poNumber,
    vendorInvoice,
    vendorName,
    vendorAddress,
    vendorCity,
    vendorState,
    vendorZip,
    vendorGoods,
    vendorDescription,
    vendorCost
  );

  return
};

document.querySelector(".po-list").addEventListener("click", (event) => {
  if (event.target.classList.contains("pdf")) {
    renderPDF(event.target);
  } else {
    return;
  }
});

};