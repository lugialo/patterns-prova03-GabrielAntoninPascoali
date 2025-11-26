class Product {
    constructor(name, price) {
      this.name = name;
      this.price = price;
    }
  
    getPrice() {
      return this.price;
    }
  
    getName() {
      return this.name;
    }
  }
  
  class OrderItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    getSubtotal() {
      return this.product.getPrice() * this.quantity;
    }
  
    getProduct() {
      return this.product;
    }
  
    getQuantity() {
      return this.quantity;
    }
  }
  
  class Order {
    constructor(customerId) {
      this.customerId = customerId;
      this.items = [];
      this.createdAt = new Date();
    }
  
    addItem(product, quantity) {
      const item = new OrderItem(product, quantity);
      this.items.push(item);
      return item;
    }
  
    removeItem(product) {
      this.items = this.items.filter(item => item.getProduct() !== product);
    }
  
    getTotal() {
      return this.items.reduce((total, item) => total + item.getSubtotal(), 0);
    }
  
    getItems() {
      return [...this.items];
    }
  
    getCustomerId() {
      return this.customerId;
    }
  }
  
  class OrderController {
    constructor() {
      this.orders = new Map();
      this.nextOrderId = 1;
    }
  
    createOrder(customerId) {
      const order = new Order(customerId);
      const orderId = this.nextOrderId++;
      this.orders.set(orderId, order);
      return { orderId, order };
    }
  
    addProductToOrder(orderId, product, quantity) {
      const order = this.orders.get(orderId);
      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }
      return order.addItem(product, quantity);
    }
  
    getOrderTotal(orderId) {
      const order = this.orders.get(orderId);
      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }
      return order.getTotal();
    }
  
    getOrder(orderId) {
      return this.orders.get(orderId);
    }
  
    getAllOrders() {
      return Array.from(this.orders.entries());
    }
  }
  
  class ProductRepository {
    constructor() {
      this.products = new Map();
    }
  
    addProduct(id, name, price) {
      const product = new Product(name, price);
      this.products.set(id, product);
      return product;
    }
  
    getProduct(id) {
      return this.products.get(id);
    }
  
    getAllProducts() {
      return Array.from(this.products.values());
    }
  }
  
  function demonstrateGRASP() {
    const productRepo = new ProductRepository();
    const orderController = new OrderController();
  
    productRepo.addProduct(1, 'Laptop', 1200);
    productRepo.addProduct(2, 'Mouse', 25);
    productRepo.addProduct(3, 'Keyboard', 75);
  
    const { orderId, order } = orderController.createOrder('customer-123');
    console.log(`Order created: ${orderId}`);
  
    const laptop = productRepo.getProduct(1);
    const mouse = productRepo.getProduct(2);
    
    orderController.addProductToOrder(orderId, laptop, 1);
    orderController.addProductToOrder(orderId, mouse, 2);
  
    const total = orderController.getOrderTotal(orderId);
    console.log(`Order Total: $${total}`);
  
    const orderDetails = orderController.getOrder(orderId);
    console.log('\nOrder Items:');
    orderDetails.getItems().forEach(item => {
      console.log(`- ${item.getProduct().getName()}: ${item.getQuantity()} x $${item.getProduct().getPrice()} = $${item.getSubtotal()}`);
    });
  }
  
  demonstrateGRASP();
