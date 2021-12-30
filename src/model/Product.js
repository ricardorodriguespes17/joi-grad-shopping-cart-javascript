export default class Product {
  constructor(price, code, name, coupon = "") {
    this.price = price
    this.code = code
    this.name = name
    this.coupon = coupon
  }
}
