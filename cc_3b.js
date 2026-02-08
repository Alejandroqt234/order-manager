console.log("=== CC_3B: Order Fulfillment Manager ===");

// STEP 2: INVENTORY
let inventory = [
  { sku: "SKU-001", name: "Eco Bottle", price: 19.99, stock: 42 },
  { sku: "SKU-002", name: "Notebook", price: 6.50, stock: 12 },
  { sku: "SKU-003", name: "USB-C Cable", price: 11.99, stock: 5 },
  { sku: "SKU-004", name: "Desk Lamp", price: 24.99, stock: 3 }
];

// print summary
console.log("\n--- Inventory Summary ---");
inventory.forEach(product => {
  console.log(`${product.sku} | ${product.name} | $${product.price} | Stock: ${product.stock}`);
});


// STEP 3: INVENTORY CHANGES

// add product
inventory.push({
  sku: "SKU-005",
  name: "Wireless Mouse",
  price: 17.49,
  stock: 8
});

console.log("Added Wireless Mouse");

// remove last product
let removedProduct = inventory.pop();
console.log(`Removed: ${removedProduct.name}`);

// update price (sale)
inventory[0].price = 14.99;
console.log("Eco Bottle is now on sale!");

// restock
inventory[3].stock += 10;
console.log("Desk Lamp restocked!");


// STEP 4: ORDERS

const orders = [
  {
    orderId: "ORD-1001",
    items: [
      { sku: "SKU-001", qty: 2 },
      { sku: "SKU-003", qty: 1 }
    ]
  },
  {
    orderId: "ORD-1002",
    items: [
      { sku: "SKU-004", qty: 20 }
    ]
  }
];

// find product helper
function findProduct(sku) {
  return inventory.find(product => product.sku === sku);
}

// process order
function processOrder(order) {

  let total = 0;

  for (let item of order.items) {

    let product = findProduct(item.sku);

    if (!product) {
      return `Order ${order.orderId}: Product not found`;
    }

    if (product.stock < item.qty) {
      return `Order ${order.orderId}: Not enough stock for ${product.name}`;
    }

    // reduce stock
    product.stock -= item.qty;

    total += product.price * item.qty;
  }

  return `Order ${order.orderId} processed. Total = $${total.toFixed(2)}`;
}

// run orders
console.log("\n--- Processing Orders ---");
orders.forEach(order => {
  console.log(processOrder(order));
});


// STEP 5: REPORTS

// total inventory value
let totalValue = inventory.reduce((sum, product) => {
  return sum + (product.price * product.stock);
}, 0);

console.log(`Total Inventory Value: $${totalValue.toFixed(2)}`);


// low stock items
let lowStock = inventory.filter(product => product.stock <= 5);
console.log("Low stock items:", lowStock);


// price list
let priceList = inventory.map(product => `${product.sku} — $${product.price}`);
console.log("Price list:", priceList);
