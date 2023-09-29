const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
var count;
localStorage.removeItem("Preview");
localStorage.removeItem("Products");
var previewTemp = {
    invoiceNumber: '',
    invoiceDue: '',
    invoiceDate: '',
    businessName: '',
    businessFName: '',
    businessLName: '',
    businessStreetAddress: '',
    businessCity: '',
    businessState: '',
    businessZip: '',
    businessPhone: '',
    businessEmail: '',
    clientFName: '',
    clientLName: '',
    clientStreetAddress: '',
    clientCity: '',
    clientState: '',
    clientZip: '',
    clientNumber: '',
    clientEmail: '',
    paymentNotes: '',
    tax: '',
    discount: ''
};
var productList = [
    {
        "id": 1,
        "product_title": "Product Title",
        "product_desc": "",
        "product_price": "",
        "product_quantity": ""
    }]
const removeItem = (id) => {
    var index = productList.map(x => {
        return x.id;
    }).indexOf(id);

    productList.splice(index, 1);
    init()
}
const addItem = () => {
    count = parseInt(productList[productList.length - 1].id);

    productList.push({
        "id": count + 1,
        "product_title": "Product Title",
        "product_desc": "",
        "product_price": "",
        "product_quantity": ""
    })
    init()
}
const toggle = (elem, id) => {
    $('.product-card').removeClass('active');
    $(elem).parent().addClass('active');
    if ($(elem).parent().hasClass('active')) {
        var label = $(elem).children('label').eq(0).text();
        const input = $('<div>');
        $(input).addClass('input-group m-0 p-0');
        const value = $('<input>');
        $(value).val(label);
        $(value).addClass('form-control focusInput');
        $(value).attr('placeholder', 'Product Name');
        $(value).attr('aria-label', 'Product Name');
        $(value).attr('data-bs-toggle', 'tooltip');
        $(value).attr('data-bs-title', 'Product Name');
        $(value).attr('onblur', `saveChanges(this, ${id})`);
        $(input).html(value);


        $($(elem)).replaceWith(input);

        $(value).focus()
    }
}

const saveInput = (elem, id) => {
    const soup = $(elem).val()
    if ($(elem).attr('data-desc')) {



        productList.find(x => x.id === id).product_desc = soup;

    } else if ($(elem).attr('data-price')) {


        productList.find(x => x.id === id).product_price = parseInt(soup);

    } else if ($(elem).attr('data-quantity')) {

        productList.find(x => x.id === id).product_quantity = parseInt(soup);

    }

}
const saveChanges = (elem, id) => {
    var input = $(elem).val();
    const div = $('<div>');
    const label = $('<label>');
    $(div).attr('onclick', `toggle(this, ${id})`);
    $(div).addClass('card-header bg-transparent border-0 product-card-accordian text-center m-0 p-0');
    $(label).addClass('form-check-label');
    $(div).html(label);
    if (input.length <= 0) {
        $(label).text('Product Name');
        productList.find(x => x.id === id).product_title = "Product Title";
    } else {
        $(label).text(input);
        productList.find(x => x.id === id).product_title = input;
    }
    $(elem).parent('.input-group').replaceWith(div);
}

const init = () => {
    $('#itemList').html(' ')

    for (var i = 0; i < productList.length; i++) {
        var li = $('<li>');
        $(li).attr('value', productList[i].id).addClass('list-group product border-0 mt-1');
        $(li).html(`
    <div class="card w-100 product-card">
      <div onclick="toggle(this, ${productList[i].id})" class="card-header bg-transparent border-0 product-card-accordian m-0 p-0">
        <label data-title=${productList[i].product_title} class="form-check-label product-detail">${productList[i].product_title}</label>
      </div>
      <button onclick="removeItem(${productList[i].id})" class="btn rmvBtn float-end position-absolute top-0 end-0 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
          </svg>
        </button>
      <div class="overflow-hidden">
        <div class="input-group">
          <input onblur="saveInput(this,${productList[i].id})" name="desc" value="${productList[i].product_desc}" data-desc="Product Description" type="text" class="form-control product-detail border-0 w-50" data-bs-toggle="tooltip" data-bs-title="Product Description"
            placeholder="Desc." aria-label="Desc.">
          <input onblur="saveInput(this,${productList[i].id})" name="price" value="${productList[i].product_price}"  data-price="0" type="number" class="form-control product-detail border-0 w-25" data-bs-toggle="tooltip" data-bs-title="Price"
            placeholder="Price" aria-label="Price">
          <input onblur="saveInput(this,${productList[i].id})" name="quantity" value="${productList[i].product_quantity}"  data-quantity="1" type="Number" class="form-control product-detail border-0 w-25" data-bs-toggle="tooltip" data-bs-title="Quantity"
            placeholder="Quantity" aria-label="Quantity">
        </div>
      </div>
    </div>`)
        $('#itemList').append(li)
    }
    $('.product-card').last().append(`<button id="AddItem" onclick="addItem(this)" class="btn addBtn"><svg
xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
class="bi bi-plus-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
<path
  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
</svg>
</button>`)
    if (productList.length <= 1) {
        $('.rmvBtn').hide()
    }
}
init();


const preview = () => {
    if ($('#invoiceNum').val().length <= 0) {
        $('#invoiceNum').addClass('text-danger border-danger');
        $('#invoiceNum').removeClass('text-success border-success');
        $('#invoiceNum').focus();

    } else {
        $('#invoiceNum').removeClass('text-danger borer-danger');
        $('#invoiceNum').addClass('text-success border-success');
    }

    if ($('#invoiceDate').val().length <= 0 && $('#invoiceDueDate').val().length <= 0) {
        $('#invoiceDate').addClass('text-danger border-danger');
        $('#invoiceDate').removeClass('text-success border-success');
        $('#invoiceDueDate').addClass('text-danger border-danger');
        $('#invoiceDueDate').removeClass('text-success border-success');

    } else {
        $('#invoiceDate').removeClass('text-danger borer-danger');
        $('#invoiceDate').addClass('text-success border-success');
        $('#invoiceDueDate').removeClass('text-danger borer-danger');
        $('#invoiceDueDate').addClass('text-success border-success');
    }

    if ($('#businessName').val().length <= 0) {
        $('#businessName').addClass('text-danger border-danger');
        $('#businessName').removeClass('text-success border-success');
    } else {
        $('#businessName').removeClass('text-danger borer-danger');
        $('#businessName').addClass('text-success border-success');
    }

    if ($('#businessFName').val().length <= 0) {
        $('#businessFName').addClass('text-danger border-danger');
        $('#businessFName').removeClass('text-success border-success');
    } else {
        $('#businessFName').removeClass('text-danger borer-danger');
        $('#businessFName').addClass('text-success border-success');
    }

    if ($('#businessLName').val().length <= 0) {
        $('#businessLName').addClass('text-danger border-danger');
        $('#businessLName').removeClass('text-success border-success');
    } else {
        $('#businessLName').removeClass('text-danger borer-danger');
        $('#businessLName').addClass('text-success border-success');
    }

    if ($('#businessStreetAddress').val().length <= 0) {
        $('#businessStreetAddress').addClass('text-danger border-danger');
        $('#businessStreetAddress').removeClass('text-success border-success');
    } else {
        $('#businessStreetAddress').removeClass('text-danger borer-danger');
        $('#businessStreetAddress').addClass('text-success border-success');
    }

    if ($('#businessCity').val().length <= 0) {
        $('#businessCity').addClass('text-danger border-danger');
        $('#businessCity').removeClass('text-success border-success');
    } else {
        $('#businessCity').removeClass('text-danger borer-danger');
        $('#businessCity').addClass('text-success border-success');
    }

    if ($('#businessState').val().length <= 0) {
        $('#businessState').addClass('text-danger border-danger');
        $('#businessState').removeClass('text-success border-success');
    } else {
        $('#businessState').removeClass('text-danger borer-danger');
        $('#businessState').addClass('text-success border-success');
    }

    if ($('#businessZip').val().length <= 0) {
        $('#businessZip').addClass('text-danger border-danger');
        $('#businessZip').removeClass('text-success border-success');
    } else {
        $('#businessZip').removeClass('text-danger borer-danger');
        $('#businessZip').addClass('text-success border-success');
    }

    if ($('#businessNumber').val().length <= 0) {
        $('#businessNumber').addClass('text-danger border-danger');
        $('#businessNumber').removeClass('text-success border-success');
    } else {
        $('#businessNumber').removeClass('text-danger borer-danger');
        $('#businessNumber').addClass('text-success border-success');
    }

    if ($('#businessEmail').val().length <= 0) {
        $('#businessEmail').addClass('text-danger border-danger');
        $('#businessEmail').removeClass('text-success border-success');
    } else {
        $('#businessEmail').removeClass('text-danger borer-danger');
        $('#businessEmail').addClass('text-success border-success');
    }

    if ($('#clientFName').val().length <= 0) {
        $('#clientFName').addClass('text-danger border-danger');
        $('#clientFName').removeClass('text-success border-success');
    } else {
        $('#clientFName').removeClass('text-danger borer-danger');
        $('#clientFName').addClass('text-success border-success');
    }

    if ($('#clientLName').val().length <= 0) {
        $('#clientLName').addClass('text-danger border-danger');
        $('#clientLName').removeClass('text-success border-success');
    } else {
        $('#clientLName').removeClass('text-danger borer-danger');
        $('#clientLName').addClass('text-success border-success');
    }

    if ($('#clientStreetAddress').val().length <= 0) {
        $('#clientStreetAddress').addClass('text-danger border-danger');
        $('#clientStreetAddress').removeClass('text-success border-success');
    } else {
        $('#clientStreetAddress').removeClass('text-danger borer-danger');
        $('#clientStreetAddress').addClass('text-success border-success');
    }

    if ($('#clientCity').val().length <= 0) {
        $('#clientCity').addClass('text-danger border-danger');
        $('#clientCity').removeClass('text-success border-success');
    } else {
        $('#clientCity').removeClass('text-danger borer-danger');
        $('#clientCity').addClass('text-success border-success');
    }

    if ($('#clientState').val().length <= 0) {
        $('#clientState').addClass('text-danger border-danger');
        $('#clientState').removeClass('text-success border-success');
    } else {
        $('#clientState').removeClass('text-danger borer-danger');
        $('#clientState').addClass('text-success border-success');

    }

    if ($('#clientZip').val().length <= 0) {
        $('#clientZip').addClass('text-danger border-danger');
        $('#clientZip').removeClass('text-success border-success');
    } else {
        $('#clientZip').removeClass('text-danger borer-danger');
        $('#clientZip').addClass('text-success border-success');

    }

    if ($('#clientNumber').val().length <= 0) {
        $('#clientNumber').addClass('text-danger border-danger');
        $('#clientNumber').removeClass('text-success border-success');
    } else {
        $('#clientNumber').removeClass('text-danger borer-danger');
        $('#clientNumber').addClass('text-success border-success');

    }

    if ($('#clientEmail').val().length <= 0) {
        $('#clientEmail').addClass('text-danger border-danger');
        $('#clientEmail').removeClass('text-success border-success');
    } else {
        $('#clientEmail').removeClass('text-danger borer-danger');
        $('#clientEmail').addClass('text-success border-success');

    }

    if ($('#clientEmail').hasClass('text-danger') ||
        $('#clientNumber').hasClass('text-danger') ||
        $('#clientZip').hasClass('text-danger') ||
        $('#clientState').hasClass('text-danger') ||
        $('#clientCity').hasClass('text-danger') ||
        $('#clientStreetAddress').hasClass('text-danger') ||
        $('#clientLName').hasClass('text-danger') ||
        $('#clientFName').hasClass('text-danger')) {
        $('#billDetailHeader').addClass('bg-danger-subtle text-danger border-danger');
    } else {
        $('#billDetailHeader').removeClass('bg-danger-subtle text-danger border-danger');
    }

    if (
        $('#invoiceDate').hasClass('text-danger') ||
        $('#businessEmail').hasClass('text-danger') ||
        $('#businessNumber').hasClass('text-danger') ||
        $('#businessZip').hasClass('text-danger') ||
        $('#businessState').hasClass('text-danger') ||
        $('#businessCity').hasClass('text-danger') ||
        $('#businessStreetAddress').hasClass('text-danger') ||
        $('#businessLName').hasClass('text-danger') ||
        $('#businessFName').hasClass('text-danger')) {
        $('#businessDetailHeader').addClass('bg-danger-subtle text-danger border-danger');
    } else {
        $('#businessDetailHeader').removeClass('bg-danger-subtle text-danger  border-danger');


    }

    for (var t = 0; t < productList.length; t++){
        if (productList[t].product_desc.length <= 0 || productList[t].product_quantity.length <= 0
            || productList[t].product_price.length <= 0){
    
                $('li').attr('value', [t]).addClass('list-group-item-danger')
               $('#orderDetails').addClass('bg-danger-subtle text-danger border-danger');
               return
            }else{
                $('#orderDetails').removeClass('bg-danger-subtle text-danger  border-danger');
            }
    }

    if ($('#invoiceNum').hasClass('text-danger') ||
        $('#invoiceDueDate').hasClass('text-danger') ||
        $('#businessDetailHeader').hasClass('text-danger') ||
        $('#billDetailHeader').hasClass('text-danger')) {
            return;

    } else {
        previewTemp.clientEmail = $('#clientEmail').val();
        previewTemp.clientNumber = $('#clientNumber').val();
        previewTemp.clientZip = $('#clientZip').val();
        previewTemp.clientState = $('#clientState').val();
        previewTemp.clientCity = $('#clientCity').val();
        previewTemp.clientStreetAddress = $('#clientStreetAddress').val();
        previewTemp.clientLName = $('#clientLName').val();
        previewTemp.clientFName = $('#clientFName').val();
        previewTemp.businessEmail = $('#businessEmail').val();
        previewTemp.businessPhone = $('#businessNumber').val();
        previewTemp.businessZip = $('#businessZip').val();
        previewTemp.businessState = $('#businessState').val();
        previewTemp.businessCity = $('#businessCity').val();
        previewTemp.businessStreetAddress = $('#businessStreetAddress').val();
        previewTemp.businessLName = $('#businessLName').val();
        previewTemp.businessFName = $('#businessFName').val();
        previewTemp.businessName = $('#businessName').val();
        previewTemp.invoiceDate = $('#invoiceDate').val();
        previewTemp.invoiceDue = $('#invoiceDueDate').val();
        previewTemp.invoiceNumber = $('#invoiceNum').val();
        previewTemp.paymentNotes = $('#paymentNotes').val();
        previewTemp.tax = parseFloat($('#tax').val());
        previewTemp.discount = parseFloat($('#discount').val());
        localStorage.setItem("Preview", JSON.stringify(previewTemp));
        localStorage.setItem("Products", JSON.stringify(productList));
        window.open("./invoice.html", '_blank').focus();
    }




}
const invoiceNumGen = (min = 0, max = 500000) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    $('#invoiceNum').val(num.toString().padStart(6, "0"))
}

const reset = () => {
    init()
    $('.product-card').removeClass('active');

}





