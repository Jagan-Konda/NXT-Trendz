import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import 'reactjs-popup/dist/index.css'
import './index.css'

const CartSummary = () => {
  const [isPaymentOptionIsCOD, setPaymentOption] = useState(false)
  const [isOrderPlaced, setOrderStatus] = useState(false)

  const onPaymentOption = event => {
    if (event.target.value === 'Cash on Delivery') {
      setPaymentOption(true)
    } else {
      setPaymentOption(false)
    }
  }

  const onConfirmOrder = () => {
    setOrderStatus(true)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const itemsInCart = cartList.length

        let totalAmount = 0

        cartList.forEach(eachItem => {
          totalAmount += eachItem.price * eachItem.quantity
        })

        const contentStyles = {
          padding: '15px 20px 50px 20px',
          borderRadius: '10px',
          minWidth: '280px',
          width: '50%',
        }

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

              <Popup
                trigger={
                  <button
                    type="button"
                    className="cart-summary-checkout-button"
                  >
                    Checkout
                  </button>
                }
                modal
                contentStyle={contentStyles}
              >
                {close => (
                  <div className="popup-container">
                    <button className="popup-close" onClick={close}>
                      &times;
                    </button>
                    <label
                      htmlFor="paymentMethod"
                      className="payment-method-label"
                    >
                      Payment Method
                    </label>
                    <select
                      id="paymentMethod"
                      onChange={onPaymentOption}
                      className="payment-select"
                    >
                      <option>--Select--</option>
                      <option disabled>Card</option>
                      <option disabled>Net Banking</option>
                      <option disabled>UPI</option>
                      <option disabled>Wallet</option>
                      <option>Cash on Delivery</option>
                    </select>
                    <div>
                      <h1 className="cart-summary-heading">
                        Order Total:{' '}
                        <span className="cart-summary-span">
                          Rs {totalAmount}/-
                        </span>{' '}
                      </h1>
                      <p className="cart-summary-description">
                        {itemsInCart} items in cart
                      </p>
                    </div>
                    {isPaymentOptionIsCOD ? (
                      <button
                        onClick={onConfirmOrder}
                        className="confirm-button"
                      >
                        Confirm Order
                      </button>
                    ) : (
                      <button
                        disabled
                        onClick={onConfirmOrder}
                        className="confirm-button disabled-confirm-button"
                      >
                        Confirm Order
                      </button>
                    )}

                    {isOrderPlaced && (
                      <div className="order-success-container">
                        <p className="order-success-text">
                          Your order has been placed successfully
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Popup>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
