// js
const textInput = document.querySelector('.text');
const submitBtn = document.querySelector('.search');
// animations
const usrr = document.querySelector('.fa-user');
const usr = document.querySelector('.links ul li:first-child');
usr.addEventListener('mouseenter', () => {
  usrr.classList.add('fa-flip');
  setTimeout(() => {
    usrr.classList.remove('fa-flip');
  }, 1000);
});
const carts = document.querySelector('.fa-cart-shopping');
const cart = document.querySelector('.links ul li:nth-child(2)');
cart.addEventListener('mouseenter', () => {
  carts.classList.add('fa-flip');
  setTimeout(() => {
    carts.classList.remove('fa-flip');
  }, 1000);
});
const logo = document.querySelector('.logo');
logo.addEventListener('mouseenter', () => {
  logo.classList.add('fa-beat-fade');
  setTimeout(() => {
    logo.classList.remove('fa-beat-fade');
  }, 1000);
});

// show/hide functions
const toolsSection = document.querySelector('#toolsSection');
const plantsSection = document.querySelector('#plantsSection');
const tools = document.querySelector('.cnt1');
const plants = document.querySelector('.cnt2');

function showTools() {
  if (!toolsSection.classList.contains('toolsSection')) {
    toolsSection.classList.replace('hide', 'toolsSection');
  }
  plantsSection.classList.add('hide');
  plantsSection.classList.remove('plantsSection');
  tools.classList.add('active-tab');
  plants.classList.remove('active-tab');
}
function showPlants() {
  if (!plantsSection.classList.contains('plantsSection')) {
    plantsSection.classList.replace('hide', 'plantsSection');
  }
  toolsSection.classList.add('hide');
  toolsSection.classList.remove('toolsSection');
  plants.classList.add('active-tab');
  tools.classList.remove('active-tab');
}

// cart show hide
const mainCart = document.querySelector('.mainCart');
const crtClose = document.querySelector('.iconClose');

function showCart() {
  mainCart.style.display = 'block';
}
function hideCart() {
  mainCart.style.display = 'none';
}

// login signup show hide function
const login = document.querySelector('.login');
const signUp = document.querySelector('.signUp');
const h22 = document.querySelector('.h22');
const h2 = document.querySelector('.h2');

function loginTab() {
  login.style.display = 'block';
  signUp.style.display = 'none';
  h22.classList.add('LActive');
  h2.classList.remove('LActive');
}
function signupTab() {
  signUp.style.display = 'block';
  login.style.display = 'none';
  h2.classList.add('LActive');
  h22.classList.remove('LActive');
}
loginTab();

// show hide for nav tools and plants
const mainLogin = document.querySelector('.mainLogin');
function showLogin() {
  mainLogin.style.display = 'block';
}
function hideLogin() {
  mainLogin.style.display = 'none';
}

// search functions...
const searchInput = document.querySelector('.text');
const searchBtn = document.querySelector('.search');
const allProducts = document.querySelectorAll('.tool, .plant');

// Function to search
function performSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm === '') {
    // If search is empty, show all products
    allProducts.forEach((product) => {
      product.style.display = 'block';
    });
    return;
  }

  // Filter...
  allProducts.forEach((product) => {
    const productName = product.querySelector('h3').textContent.toLowerCase();
    const productDescription = product.querySelector('p').textContent.toLowerCase();
    const productImpText = product.querySelector('.imp-txt').textContent.toLowerCase();

    if (productName.includes(searchTerm) || productDescription.includes(searchTerm) || productImpText.includes(searchTerm)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// srch functions...
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    performSearch();
  }
  if (searchInput) {
    searchInput.addEventListener('input', performSearch);
  }
});
// globally accessible
window.performSearch = performSearch;

// Show/hide functions for tools plants
function showTools() {
  if (!toolsSection.classList.contains('toolsSection')) {
    toolsSection.classList.replace('hide', 'toolsSection');
  }
  plantsSection.classList.add('hide');
  plantsSection.classList.remove('plantsSection');
  tools.classList.add('active-tab');
  plants.classList.remove('active-tab');

  // Reset search when in tabs
  searchInput.value = '';
  performSearch();
}

function showPlants() {
  if (!plantsSection.classList.contains('plantsSection')) {
    plantsSection.classList.replace('hide', 'plantsSection');
  }
  toolsSection.classList.add('hide');
  toolsSection.classList.remove('toolsSection');
  plants.classList.add('active-tab');
  tools.classList.remove('active-tab');

  // Reset search when switching tabs
  searchInput.value = '';
  performSearch();
}

// alerts...
document.querySelector('#loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('✅ Logged in successfully!');
});

document.querySelector('#signupForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('✅ Signed up successfully!');
});
document.querySelectorAll('.fb').forEach((item) => {
  item.addEventListener('click', function () {
    alert('congratulation you Logged in with Facebook!');
  });
});
document.querySelectorAll('.gg').forEach((item) => {
  item.addEventListener('click', function () {
    alert('congratulation you Logged in with Google!');
  });
});

// Product info modal logic
const productInfoModal = document.getElementById('productInfoModal');
const productInfoContent = productInfoModal?.querySelector('.productInfoContent');

// Helper: Get all products (tools and plants)
const allProductElements = document.querySelectorAll('.tool, .plant');

// Helper: Collect product data for lookup
const productData = Array.from(allProductElements).map((el, idx) => ({
  index: idx,
  name: el.querySelector('h3')?.textContent || '',
  img: el.querySelector('img')?.src || '',
  price: el.querySelector('.price')?.textContent || '',
  imp: el.querySelector('.imp-txt')?.textContent || '',
  desc: el.querySelectorAll('p')[1]?.textContent || el.querySelector('p')?.textContent || '',
  type: el.classList.contains('tool') ? 'tool' : 'plant',
}));

// Show product info modal
function showProductInfo(idx) {
  const prod = productData[idx];
  if (!prod || !productInfoContent) return;

  // Find related products (same type, different index)
  const related = productData.filter((p) => p.type === prod.type && p.index !== prod.index);

  productInfoContent.innerHTML = `
    <div class="productInfoHeader">
      <span class="productInfoTag">${prod.type === 'tool' ? 'Tool' : 'Plant'}</span>
      <h2 id="productName">${prod.name}</h2>
      <p class="productInfoPrice">${prod.price}</p>
    </div>
    <div class="productInfoBody">
      <img src="${prod.img}" alt="${prod.name}" class="productInfoImage">
      <div class="productInfoDetails">
        <p class="productInfoImp">${prod.imp}</p>
        <p class="productInfoDesc">${prod.desc}</p>
        <button class="modalAddBtn" id="addToCartBtn">Add to Cart</button>
      </div>
    </div>
    <div class="related-products">
      <h3>Related ${prod.type === 'tool' ? 'Tools' : 'Plants'}</h3>
      <div class="relatedLinks">
        ${related.map((r) => `<a href="#" onclick="showProductInfo(${r.index});return false;">${r.name}</a>`).join('')}
      </div>
    </div>
  `;
  productInfoModal.classList.remove('hide');

  // --- ADD THIS BLOCK ---
  // Attach event to modal's Add to Cart button
  const modalAddBtn = document.getElementById('addToCartBtn');
  if (modalAddBtn) {
    modalAddBtn.onclick = function () {
      // Use the same structure as cart.js expects
      // Parse price as number
      let price = 0;
      const match = prod.price.match(/(\d+)/);
      if (match) price = parseFloat(match[1]);
      // Call addToCart from cart.js (must be global)
      if (window.addToCart) {
        window.addToCart({
          name: prod.name,
          imgSrc: prod.img,
          desc: prod.desc,
          price: price,
        });
      }
      // Optionally, show the cart after adding
      const mainCart = document.querySelector('.mainCart');
      if (mainCart) mainCart.style.display = 'block';
      // Optionally, close the modal
      hideProductInfo();
    };
  }
}

// Hide modal
function hideProductInfo() {
  productInfoModal.classList.add('hide');
}

// Attach click event to each product card
allProductElements.forEach((el, idx) => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', function (e) {
    // Prevent opening modal when clicking "Add to Cart" button
    if (e.target.classList.contains('addToCart')) return;
    showProductInfo(idx);
  });
});

// Make showProductInfo globally accessible for inline onclick
window.showProductInfo = showProductInfo;
window.hideProductInfo = hideProductInfo;

document.body.addEventListener('click', function (e) {
  if (e.target.classList.contains('addToCart')) {
    // Find the closest product card (tool or plant)
    let item = e.target.closest('.tool') || e.target.closest('.plant');
    if (!item) return;

    // Get product details
    const img = item.querySelector('img');
    const h3 = item.querySelector('h3');
    const descP = item.querySelector('.imp-txt');
    const priceElem = item.querySelector('.price');

    const imgSrc = img ? img.src : '';
    const name = h3 ? h3.innerText.trim() : '';
    const desc = descP ? descP.innerText.trim() : '';
    let price = 0;
    if (priceElem) {
      const match = priceElem.innerText.match(/(\d+)/);
      if (match) price = parseFloat(match[1]);
    }

    // Call addToCart from cart.js (must be global)
    if (window.addToCart) {
      window.addToCart({
        name,
        imgSrc,
        desc,
        price,
      });
    }
    // Optionally, show the cart after adding
    const mainCart = document.querySelector('.mainCart');
    if (mainCart) mainCart.style.display = 'block';
  }
});

