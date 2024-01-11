// calculate discount
function calculateDiscount(price, compareAtPrice) {
  const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
  return Math.round(discount);
}

// Fetching resources from Product data API
async function fetchProductsData() {
  try {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

// Function for toggling between the tabs
async function displayProducts(category) {
  const data = await fetchProductsData();

  const productsContainerEl = document.getElementById("productsContainer");
  productsContainerEl.classList.add("products-container");
  productsContainerEl.textContent = "";

  const { categories } = data;

  let tabData;
  if (category === "Men") {
    tabData = categories[0];
  } else if (category === "Women") {
    tabData = categories[1];
  } else {
    tabData = categories[2];
  }

  const { category_products } = tabData;
  console.log(category_products);
  const categoryData = category_products;

  for (let product of categoryData) {
    const productItem = document.createElement("div");
    productItem.classList.add("product-card");

    let productTitle;
    if (product.title.length > 11) {
      productTitle = product.title.slice(0, 12) + "..";
    } else {
      productTitle = product.title;
    }

    // Products card elements
    const imageBadgeEl = document.createElement("div");
    imageBadgeEl.classList.add("image-container");

    const imageEl = document.createElement("img");
    imageEl.src = product.image;
    imageEl.classList.add("image");

    const badgeEl = document.createElement("div");
    badgeEl.classList.add("overlay-text");
    badgeEl.textContent = product.badge_text;

    if (product.badge_text === null) {
      badgeEl.style.visibility = "hidden";
    } else {
      badgeEl.style.visibility = "visible";
    }

    const namesContainerEl = document.createElement("div");
    namesContainerEl.classList.add("names-container");

    const titleEl = document.createElement("h2");
    titleEl.textContent = productTitle;
    titleEl.classList.add("title");

    const vendorEl = document.createElement("p");
    vendorEl.textContent = `• ${product.vendor}`;

    const descriptionContainerEl = document.createElement("div");
    descriptionContainerEl.classList.add("names-container");

    const priceEl = document.createElement("p");
    priceEl.textContent = `Rs ${product.price}`;
    priceEl.classList.add("price");

    const compareAtPriceEl = document.createElement("p");
    compareAtPriceEl.textContent = `${product.compare_at_price}`;
    compareAtPriceEl.classList.add("compare");

    const discountEl = document.createElement("p");
    discountEl.textContent = `${calculateDiscount(
      product.price,
      product.compare_at_price
    )}% off`;
    discountEl.classList.add("discount");

    const addToCartBtnEl = document.createElement("button");
    addToCartBtnEl.textContent = "Add to Cart";
    addToCartBtnEl.classList.add("add-to-cart");

    productItem.appendChild(imageBadgeEl);
    imageBadgeEl.appendChild(imageEl);
    imageBadgeEl.appendChild(badgeEl);

    productItem.appendChild(namesContainerEl);
    namesContainerEl.appendChild(titleEl);
    namesContainerEl.appendChild(vendorEl);

    productItem.appendChild(descriptionContainerEl);
    descriptionContainerEl.appendChild(priceEl);
    descriptionContainerEl.appendChild(compareAtPriceEl);
    descriptionContainerEl.appendChild(discountEl);

    productItem.appendChild(addToCartBtnEl);

    productsContainerEl.appendChild(productItem);
  }
}

// Default Tab
displayProducts("Men");
