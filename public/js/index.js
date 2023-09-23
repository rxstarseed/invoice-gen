const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
var count = parseInt($('.list-group-item').length);
const addItem = (elem) => {
    var entry = document.createElement('li');
    $(entry).addClass('list-group-item d-flex m-0 p-0 border-0 mt-1');
    count = count + 1;
    $(entry).val(count);
    (elem).remove();
    $(entry).html(`
    <button id="AddItem" onclick="addItem(this)" class="btn addBtn"><svg
    xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
    class="bi bi-plus-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    <path
      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
  </svg>
</button>
<div class="card w-100 product-card">
  <div onclick="toggle(this)" class="card-header bg-transparent border-0 product-card-accordian m-0 p-0">

    <label class="form-check-label">Product Name ${count}</label>
    
  </div>
  <button onclick="removeItem(this)" class="btn rmvBtn float-end position-absolute top-0 end-0 ">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
      </svg>
    </button>
    <div class="overflow-hidden">
    <div class="input-group">
      <input type="text" class="form-control border-0 w-50" data-bs-toggle="tooltip" data-bs-title="Desc."
        placeholder="Desc." aria-label="Desc.">
      <input type="number" class="form-control border-0 w-25" data-bs-toggle="tooltip" data-bs-title="Price"
        placeholder="Price" aria-label="Price">
      <input type="Number" class="form-control border-0 w-25" data-bs-toggle="tooltip" data-bs-title="Quantity"
        placeholder="Quantity" aria-label="Quantity">
    </div>
  </div>
</div>`);


    $('#itemList').last().append($(entry));
    $(elem).parent().removeClass('active');

}

const toggle = (elem) => {
    $('.product-card').removeClass("active");
    $(elem).parent().addClass('active');
    if ($(elem).parent().hasClass('active')) {
        $(elem).children('.rmvBtn').remove();
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
        $(value).attr('onblur', 'saveChanges(this)');
        $(input).html(value);


        $($(elem)).replaceWith(input);

        $(value).focus()
    }


}


const saveChanges = (elem) => {

    var input = $(elem).val();

    const div = $('<div>');
    const label = $('<label>');
    $(div).attr('onclick', 'toggle(this)');
    $(div).addClass('card-header bg-transparent border-0 product-card-accordian text-center m-0 p-0');
    $(label).addClass('form-check-label');
    $(div).html(label);
//     $(div).after(`<button class="btn rmvBtn float-end text-danger">
//     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
//       <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
//       <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
//     </svg>
//   </button>` );
    if (input.length <= 0) {
        $(label).text('Product Name');
    } else {
        $(label).text(input);
    }
    $(elem).parent('.input-group').replaceWith(div);



}


const removeItem = (elem) => {
$(elem).closest('li').remove();
$('li').last().append(`<button id="AddItem" onclick="addItem(this)" class="btn addBtn"><svg
xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
class="bi bi-plus-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
<path
  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
</svg>
</button>`)

}





