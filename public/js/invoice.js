const details = JSON.parse(localStorage.getItem("Preview"));
const products = JSON.parse(localStorage.getItem("Products"));
const populate = () =>{
    document.title = `invoice-${details.invoiceNumber},${details.clientLName},${details.clientFName}`;
$('#preBusinessName').text(details.businessName);
$('#preBusinessAddress').text(details.businessStreetAddress);
$('#preBusinessCityZip').text(`${details.businessCity}, ${details.businessZip}`);
$('#preInvoiceNum').text(details.invoiceNumber);
$('#preInvoiceDate').text(details.invoiceDate);
$('#preInvoiceDue').text(details.invoiceDue)
$('#preBalance').text(formatter.format(calcBalances()));
$('#preClientName').text(`${details.clientFName} ${details.clientLName}`);
$('#preClientAddress').text(details.clientStreetAddress);
$('#preClientCityZip').text(`${details.clientCity}, ${details.clientZip}`);
$('#preClientPhone').text(details.clientNumber);
$('#preClientEmail').text(details.clientEmail);
for (var z = 0; z < products.length; z++) {
    document.getElementsByTagName("table")[0].innerHTML+= "<tr><td>"+products[z].product_title+"<br/><small class='text-muted small'>"+products[z].product_desc+"</small> </td><td>"+formatter.format(products[z].product_price)+"</td><td>"+products[z].product_quantity+"</td><td>"+formatter.format(products[z].product_price * products[z].product_quantity)+"</td></tr>"
  };
$('#prePaymentInstru').text(details.paymentNotes);
$('#preSubtotal').text(formatter.format(calcSubTotal()));
$('#preDiscount').text("%"+calcTax());
$('#taxPrice').text(formatter.format(getTaxPrice()))
$('#preTotal').text(formatter.format(calcBalances()));
$('#finalTotal').text(formatter.format(calcBalances()));
    console.log(details, products)
}

const calcBalances = () =>{
    var calcBalance = 0;
    var calTax;
    var calDiscount;
    
    for (var i = 0; i < products.length; i++){
    calcBalance += (products[i].product_price * products[i].product_quantity);
    }
    if (details.discount != null || undefined){
        calDiscount += parseFloat(details.discount / 100)
       calcBalance += parseFloat(calcBalance % calDiscount);
    }

    if (details.tax == null || undefined){
        calTax = parseFloat(10 / 100)
        calcBalance += parseFloat(calcBalance * calTax)
    }else{
        calTax = parseFloat(details.tax / 100)
        calcBalance += parseFloat(calcBalance * calTax);
    }
    return calcBalance;
}

const calcSubTotal = () =>{
    var subTotal = 0;
    var subDiscount;
    for (var i = 0; i < products.length; i++){
        subTotal += (products[i].product_price * products[i].product_quantity);
        }
        if (details.discount != null || undefined){
            subDiscount += parseFloat(details.discount / 100)
            subTotal += parseFloat( subTotal % subDiscount);
        }
       return subTotal;
}
const calcTax = () => {

    if (details.tax == null || undefined){
       return preCalcTax = 10
    }else{
        return preCalcTax = details.tax
    }
}
const getTaxPrice = () => {
    var getTax;
    var getCash = 0
    for (var i = 0; i < products.length; i++){
        getCash += (products[i].product_price * products[i].product_quantity);
        }
        if (details.tax == null || undefined){
            getTax = parseFloat(10 / 100)
            getCash = parseFloat(getCash * getTax)
        }else{
            getTax = parseFloat(details.tax / 100)
            getCash = parseFloat(getCash * getTax);
        }
        return getCash
}
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
const print = () => {
    $('.navbar').hide();
    window.print();
}
const revive = () =>{
    $('.navbar').show();
}

populate()