import Customer from "../../src/model/Customer.js"
import Product from "../../src/model/Product.js"
import ShoppingCart from "../../src/model/ShoppingCart.js"

describe("Shopping cart should checkout", () => {
  it("Should calculate correct total and loyalty points for 10% discounted products", () => {
    const customer = new Customer("Test customer")
    const products = [new Product(100, "TestProduct", "Test product", "DIS_10")]
    const shoppingCart = new ShoppingCart(customer, products)

    const order = shoppingCart.checkout()

    expect(order.totalPrice).toBe(90)
    expect(order.loyaltyPoints).toBe(10)
  })

  it("Should calculate correct total and loyalty points for 15% discounted products", () => {
    const customer = new Customer("Test customer")
    const products = [new Product(150, "TestProduct", "Test product", "DIS_15")]
    const shoppingCart = new ShoppingCart(customer, products)

    const order = shoppingCart.checkout()

    expect(order.totalPrice).toBe(127.5)
    expect(order.loyaltyPoints).toBe(10)
  })

  it("Should calculate correct total and loyalty points for 20% discounted products", () => {
    const customer = new Customer("Test customer")
    const products = [new Product(150, "TestProduct", "Test product", "DIS_20")]
    const shoppingCart = new ShoppingCart(customer, products)

    const order = shoppingCart.checkout()

    expect(order.totalPrice).toBe(120)
    expect(order.loyaltyPoints).toBe(7.5)
  })

  it("Should calculate correct total for product groups", () => {
    const customer = new Customer("Test customer")
    const products = [
      new Product(100, "TestProduct1", "Test product 1", "BULK_BUY_2_GET_1"),
      new Product(100, "TestProduct1", "Test product 2", "BULK_BUY_2_GET_1"),
    ]
    const shoppingCart = new ShoppingCart(customer, products)

    const order = shoppingCart.checkout()

    expect(order.totalPrice).toBe(100)
    expect(order.loyaltyPoints).toBe(0)
  })

  it.skip("Should calculate correct total for product groups and correct discount for 500 amount", () => {
    const customer = new Customer("Test customer")
    const products = [
      new Product(550, "TestProduct1", "Test product 1", "BULK_BUY_2_GET_1"),
      new Product(550, "TestProduct1", "Test product 2", "BULK_BUY_2_GET_1"),
    ]
    const shoppingCart = new ShoppingCart(customer, products)

    const order = shoppingCart.checkout()

    expect(order.totalPrice).toBe(522.5)
    expect(order.loyaltyPoints).toBe(7.5)
  })

  it("Should calculate correct total and loyalty points for non discounted products", () => {
    const customer = new Customer("Test customer")
    const products = [new Product(100, "TestProduct", "Test product")]
    const shoppingCart = new ShoppingCart(customer, products)

    const order = shoppingCart.checkout()

    expect(order.totalPrice).toBe(100)
    expect(order.loyaltyPoints).toBe(20)
  })
})

describe("Shopping cart should modify products", () => {
  it("Should add another product to the cart", () => {
    const customer = new Customer("Test Customer")
    const products = [new Product(100, "TestProductOne", "Test Product One")]
    const shoppingCart = new ShoppingCart(customer, products)

    shoppingCart.addProduct(
      new Product(200, "TestProductTwo", "Test Product Two")
    )

    expect(shoppingCart.products).toEqual([
      new Product(100, "TestProductOne", "Test Product One"),
      new Product(200, "TestProductTwo", "Test Product Two"),
    ])
  })

  it("Should remove a product from the cart", () => {
    const customer = new Customer("Test Customer")
    const products = [
      new Product(100, "TestProductOne", "Test Product One"),
      new Product(200, "TestProductTwo", "Test Product Two"),
    ]
    const shoppingCart = new ShoppingCart(customer, products)

    shoppingCart.removeProduct(
      new Product(200, "TestProductTwo", "Test Product Two")
    )

    expect(shoppingCart.products).toEqual([
      new Product(100, "TestProductOne", "Test Product One"),
    ])
  })
})
