const cartPanel = document.querySelector(".mainCart");
let cartItems = window.cartItems || [];
window.cartItems = cartItems;

// Add item to cart
function addToCart(product) {
  // Defensive: ensure product has required fields
  if (
    !product ||
    typeof product.name !== "string" ||
    typeof product.price !== "number"
  ) {
    console.error("Invalid product passed to addToCart:", product);
    return;
  }

  // Find by unique identifier (preferably id, fallback to name)
  let existing;
  if (product.id !== undefined) {
    existing = cartItems.find((item) => item.id === product.id);
  } else {
    existing = cartItems.find((item) => item.name === product.name);
  }

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    // Clone the product to avoid mutating the original object
    const newProduct = {
      ...product,
      quantity: 1,
    };
    cartItems.push(newProduct);
  }
  // Ensure global reference is updated
  window.cartItems = cartItems;
  renderCart();
}

// Render cart
function renderCart() {
  if (!cartPanel) return;

  const cartItemsDiv = cartPanel.querySelector(".cartItems");
  const totalAmountSpan = cartPanel.querySelector("#totalAmount");
  if (!cartItemsDiv || !totalAmountSpan) return;

  if (cartItems.length === 0) {
    cartItemsDiv.innerHTML = '<p class="emptyCart">Your cart is empty.</p>';
    totalAmountSpan.textContent = "0.00";
    return;
  }

  cartItemsDiv.innerHTML = `
    <ul class="cartList">
      ${cartItems
        .map(
          (item, index) => `
            <li class="cartItem">
              <img src="${item.imgSrc || ""}" alt="${item.name}" />
              <div class="cartItem-details">
                <span class="cartItem-title">${item.name}</span>
                <span class="cartItem-qty">Qty: ${item.quantity}</span>
                <span class="cartItem-price">₹${(item.price * item.quantity).toFixed(2)}</span>
                <button class="removeBtn" data-index="${index}">Remove</button>
              </div>
            </li>
          `,
        )
        .join("")}
    </ul>
  `;

  cartItemsDiv.querySelectorAll(".removeBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.target.getAttribute("data-index"), 10);
      removeCartItem(idx);
    });
  });

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity || 0),
    0,
  );
  totalAmountSpan.textContent = total.toFixed(2);
}

// Remove item from cart
function removeCartItem(index) {
  if (!cartItems[index]) return;
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
  } else {
    cartItems.splice(index, 1);
  }
  window.cartItems = cartItems;
  renderCart();
}

// Show/hide cart
function showCart() {
  if (cartPanel) cartPanel.classList.remove("hide");
}
function hideCart() {
  if (cartPanel) cartPanel.classList.add("hide");
}
window.showCart = showCart;
window.hideCart = hideCart;

// Checkout
const checkoutBtn = document.querySelector(".checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const orderItemsList = document.getElementById("orderItemsList");
const orderTotalAmount = document.getElementById("orderTotalAmount");
const orderConfirmation = document.getElementById("orderConfirmation");
const checkoutForm = document.getElementById("checkoutForm");

function showCheckout() {
  if (!checkoutModal) return;
  if (orderItemsList) {
    orderItemsList.innerHTML = cartItems
      .map(
        (item) =>
          `<li>${item.name} x ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}</li>`,
      )
      .join("");
  }
  if (orderTotalAmount) {
    const total = cartItems.reduce(
      (sum, item) => sum + (item.price * item.quantity || 0),
      0,
    );
    orderTotalAmount.textContent = total.toFixed(2);
  }
  if (orderConfirmation) orderConfirmation.classList.add("hide");
  checkoutModal.classList.remove("hide");
}
function hideCheckout() {
  if (checkoutModal) checkoutModal.classList.add("hide");
}
window.hideCheckout = hideCheckout;

// Checkout button click
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    showCheckout();
    hideCart();
  });
}

// Checkout form submit
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (orderConfirmation) orderConfirmation.classList.remove("hide");
    cartItems = [];
    window.cartItems = cartItems;
    renderCart();
    setTimeout(() => hideCheckout(), 1000);
  });
}

// Export to global
window.addToCart = addToCart;
window.removeCartItem = removeCartItem;
window.checkout = showCheckout;

// Show the cart
function showCart() {
  if (cartPanel) {
    cartPanel.style.display = "block";
  }
}
window.showCart = showCart;

// Hide the cart
function hideCart() {
  if (cartPanel) {
    cartPanel.style.display = "none";
  }
}

hideCheckout();
