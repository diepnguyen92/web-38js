let API_URL = "http://localhost:3000/product";
let rowProduct = document.querySelector(".row-product");
let paginationContainer = document.querySelector(".pagination");
let itemsPerPage = 12; // Number of items to display per page
let currentPage = 1;
let form = document.querySelector("form");
let search = document.querySelector(".search")
// Get data from the API
let getData = async (url) => {
  let response = await axios.get(url);
  return response.data;
}

// Display data for the current page
let showData = (data) => {
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let displayedData = data.slice(startIndex, endIndex);

  let HTML = ``;
  displayedData.forEach((value, index) => {
    HTML += `
      <div class="col-md-3 col-sm-3 col-12">
        <div class="box-content">
          <img src="${value.image}" alt="áo nam">
          <div class="product-name">
            <div class="name">${value.name}</div>
            <div class="price">${value.price}</div>
          </div>
        </div>
      </div>
    `;
  });
  rowProduct.innerHTML = HTML;

  // Update pagination
  renderPagination(data.length);
}

// Render pagination buttons
let renderPagination = (totalItems) => {
  let totalPages = Math.ceil(totalItems / itemsPerPage);
  let paginationHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<button onclick="changePage(${i})">${i}</button>`;
  }

  paginationContainer.innerHTML = paginationHTML;
}

// Change the current page and re-render data
let changePage = (newPage) => {
  currentPage = newPage;
  getData(API_URL).then(showData);
}

// Initial data loading
getData(API_URL).then(showData);

// tìm kiếm

// Thêm sự kiện lắng nghe khi người dùng nhấn phím trên trường tìm kiếm
search.addEventListener('keydown',(event)=> {
  if (event.key === 'Enter') {
      event.preventDefault(); // Ngăn chặn hành động mặc định của phím Enter 
      performSearch();

  }
});

// Thêm sự kiện lắng nghe khi người dùng nhấn nút tìm kiếm
form.addEventListener('submit',(event)=> {
  event.preventDefault(); // Ngăn chặn hành động mặc định của việc submit form
  performSearch();
});

// Hàm thực hiện tìm kiếm
function performSearch() {
  let searchTerm = search.value.trim().toLowerCase();
//console.log(searchTerm);
  // Gọi hàm để thực hiện tìm kiếm dựa trên searchTerm và hiển thị kết quả
  // ...

  // Cập nhật lại dữ liệu và phân trang nếu cần thiết
  getData(API_URL).then(data => {
      // Thực hiện tìm kiếm và hiển thị kết quả
      let filteredData = data.filter(product => product.name.toLowerCase().includes(searchTerm));
      showData(filteredData);
console.log(filteredData);
      // Cập nhật lại phân trang
      renderPagination(filteredData.length);
  });
}

// ... (code tiếp theo)

