const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
const addItem = (elem) =>{
   var count = parseInt($('.list-group-item').length);
   var entry = document.createElement('li');
   $(entry).addClass('list-group-item d-flex m-0 p-0 border-0 mt-3');
   $(entry).val(count+ 1);
   (elem).remove();
    $(entry).html(`<button id="AddItem" onclick="addItem(this)" class="btn text-success addBtn"><svg
    xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
    class="bi bi-plus-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    <path
      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
  </svg>
</button>
<div class="card w-100 product-card">
  <div onclick="openClose(this)" class="card-header bg-transparent border-0 product-card-accordian m-0 p-0">

    <label class="form-check-label">First checkbox</label>
    <button class="btn float-end text-danger"><svg xmlns="http://www.w3.org/2000/svg" width="20"
        height="20" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
      </svg></button>
  </div>
  <div class="overflow-hidden">
    <div class="input-group">
      <input type="text" class="form-control" data-bs-toggle="tooltip" data-bs-title="Product Name"
        placeholder="Product Name" aria-label="Product Name">
      <input type="text" class="form-control" data-bs-toggle="tooltip" data-bs-title="Price"
        placeholder="Price" aria-label="Price">
      <input type="text" class="form-control" data-bs-toggle="tooltip" data-bs-title="Quantity"
        placeholder="Quantity" aria-label="Quantity">
    </div>
  </div>
</div>`);

$('#itemList').last().append($(entry));

   
}

const openClose = (elem) => {

    $(elem).parent().toggleClass('active'); 
    
    

}

const removeItem = (elem) => {

}

const test = () => {
    
}


        
      

