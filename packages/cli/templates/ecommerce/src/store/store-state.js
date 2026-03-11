/*
Najumi Ecommerce Store State
*/

class StoreState {

constructor() {

this.products = []

this.cart = []

this.subscribers = new Set()

}

/*
Subscribe to state updates
*/
subscribe(fn) {

this.subscribers.add(fn)

}

notify() {

this.subscribers.forEach(fn => {

  try {

    fn(this)

  } catch (err) {

    console.error("Store subscriber error:", err)

  }

})

}

/*
Set products
*/
setProducts(products) {

this.products = products || []

this.notify()

}

/*
Get products
*/
getProducts() {

return this.products

}

/*
Add product to cart
*/
addToCart(product) {

const existing = this.cart.find(p => p.id === product.id)

if (existing) {

  existing.qty += 1

} else {

  this.cart.push({
    ...product,
    qty: 1
  })

}

this.notify()

}

/*
Remove item
*/
removeFromCart(id) {

this.cart = this.cart.filter(p => p.id !== id)

this.notify()

}

/*
Update quantity
*/
updateQty(id, qty) {

const item = this.cart.find(p => p.id === id)

if (!item) return

item.qty = qty

this.notify()

}

/*
Get cart
*/
getCart() {

return this.cart

}

/*
Get cart total
*/
getTotal() {

return this.cart.reduce((total, item) => {

  return total + item.price * item.qty

}, 0)

}

}

/*
Singleton store
*/

let storeInstance = null

export function getStore() {

if (!storeInstance) {

storeInstance = new StoreState()

}

return storeInstance

}