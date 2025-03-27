import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const itemsInCart = cartList.length

      let totalAmount = 0

      cartList.forEach(eachItem => {
        totalAmount += eachItem.price * eachItem.quantity
      })

      return (
        <div className="cart-summary-container">
          <div className="cart-summary-responsive-container">
            <div>
              <h1 className="cart-summary-heading">
                Order Total:{' '}
                <span className="cart-summary-span">Rs {totalAmount}/-</span>{' '}
              </h1>
              <p className="cart-summary-description">
                {itemsInCart} items in cart
              </p>
            </div>
            <button type="button" className="cart-summary-checkout-button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
