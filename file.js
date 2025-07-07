const pid = document.getElementById("pid");
const pname = document.getElementById("pname");
const price = document.getElementById("price");
const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const productTable = document.querySelector("#productTable tbody");
const soldTable = document.querySelector("#soldTable tbody");

let editIndex = -1;

function getProducts() {
  return JSON.parse(localStorage.getItem("products") || "[]");
}

function saveProducts(arr) {
  localStorage.setItem("products", JSON.stringify(arr));
}

function getSold() {
  return JSON.parse(localStorage.getItem("sold") || "[]");
}

function saveSold(arr) {
  localStorage.setItem("sold", JSON.stringify(arr));
}

function clearForm() {
  pid.value = "";
  pname.value = "";
  price.value = "";
  category.value = "-- Select Category --";
}

function displayProducts() {
  const products = getProducts();
  productTable.innerHTML = products.length
    ? ""
    : `<tr><td colspan="5">No products found</td></tr>`;
  products.forEach((p, i) => {
    productTable.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.cat}</td>
        <td>
          <i class="fa-solid fa-pen" onclick="editProduct(${i})"></i>
          <i class="fa-solid fa-trash" onclick="deleteProduct(${i})"></i>
          <button onclick="markSold(${i})">Sold</button>
        </td>
      </tr>`;
  });
}

function displaySold() {
  const sold = getSold();
  soldTable.innerHTML = sold.length
    ? ""
    : `<tr><td colspan="4">No sold products</td></tr>`;
  sold.forEach((p) => {
    soldTable.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.cat}</td>
      </tr>`;
  });
}

addBtn.onclick = () => {
  const product = {
    id: pid.value,
    name: pname.value,
    price: price.value,
    cat: category.value,
  };
  if (!product.id || !product.name || !product.price || product.cat.includes("Select")) return;

  const products = getProducts();
  products.push(product);
  saveProducts(products);
  clearForm();
  displayProducts();
};

function deleteProduct(i) {
  const products = getProducts();
  products.splice(i, 1);
  saveProducts(products);
  displayProducts();
}

function editProduct(i) {
  const products = getProducts();
  const p = products[i];
  pid.value = p.id;
  pname.value = p.name;
  price.value = p.price;
  category.value = p.cat;
  addBtn.style.display = "none";
  updateBtn.style.display = "block";
  editIndex = i;
}

updateBtn.onclick = () => {
  const product = {
    id: pid.value,
    name: pname.value,
    price: price.value,
    cat: category.value,
  };
  const products = getProducts();
  products[editIndex] = product;
  saveProducts(products);
  displayProducts();
  clearForm();
  addBtn.style.display = "block";
  updateBtn.style.display = "none";
};

function markSold(i) {
  const products = getProducts();
  const sold = getSold();
  sold.push(products[i]);
  saveSold(sold);
  products.splice(i, 1);
  saveProducts(products);
  displayProducts();
  displaySold();
}

displayProducts();
displaySold();
