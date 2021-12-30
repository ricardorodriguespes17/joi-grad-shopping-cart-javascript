import _ from "lodash"
import Order from "./Order.js"

export default class ShoppingCart {
  constructor(customer, products) {
    this.customer = customer
    this.products = products
  }

  addProduct = (product) => {
    this.products.push(product)
  }

  removeProduct = (product) => {
    _.remove(this.products, product)
  }

  checkout = () => {
    let totalPrice = 0
    let loyaltyPointsEarned = 0
    let groupProdut = []

    this.products.forEach((product) => {
      let discount = 0

      switch (product.coupon) {
        case "DIS_10":
          discount = product.price * 0.1
          loyaltyPointsEarned += product.price / 10
          break
        case "DIS_15":
          discount = product.price * 0.15
          loyaltyPointsEarned += product.price / 15
          break
        case "DIS_20":
          discount = product.price * 0.2
          loyaltyPointsEarned += product.price / 20
          break
        case "BULK_BUY_2_GET_1":
          if (groupProdut.includes(product.code)) {
            groupProdut.filter((item) => item !== product.code)
            discount = product.price
          } else {
            groupProdut.push(product.code)
          }
          break
        default:
          loyaltyPointsEarned += product.price / 5
          break
      }

      totalPrice += product.price - discount

      if (totalPrice > 500) {
        totalPrice += totalPrice * 0.05
      }
    })

    return new Order(totalPrice, loyaltyPointsEarned)
  }

  displaySummary = () => {
    return (
      "Customer: " +
      this.customer.name +
      "\n" +
      "Bought:  \n" +
      this.products.map((p) => "- " + p.name + ", " + p.price).join("\n")
    )
  }
}
