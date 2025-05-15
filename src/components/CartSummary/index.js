import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import 'reactjs-popup/dist/index.css'
import './index.css'

const CartSummary = () => {
  const [isPaymentOptionIsCOD, setPaymentOption] = useState(false)
  const [isOrderPlaced, setOrderStatus] = useState(false)

  const onPaymentOption = event => {
    if (event.target.id === 'cashOnDelivery') {
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
                    <button
                      className="popup-close"
                      onClick={close}
                      type="button"
                    >
                      &times;
                    </button>
                    {isOrderPlaced ? (
                      <div className="order-success-container">
                        <p className="order-success-text">
                          Your order has been placed successfully
                        </p>
                      </div>
                    ) : (
                      <>
                        <label
                          htmlFor="paymentMethod"
                          className="payment-method-label"
                        >
                          Payment Method
                        </label>
                        <div>
                          <input
                            id="card"
                            type="radio"
                            name="payment"
                            disabled
                            className="payment-option"
                          />
                          <label htmlFor="card" className="payment-type-label">
                            Card
                          </label>
                          <input
                            id="netBanking"
                            type="radio"
                            name="payment"
                            disabled
                            className="payment-option"
                          />
                          <label
                            htmlFor="netBanking"
                            className="payment-type-label"
                          >
                            Net Banking
                          </label>
                          <input
                            id="upi"
                            type="radio"
                            name="payment"
                            disabled
                            className="payment-option"
                          />
                          <label htmlFor="upi" className="payment-type-label">
                            UPI
                          </label>
                          <input
                            id="wallet"
                            type="radio"
                            name="payment"
                            disabled
                            className="payment-option"
                          />
                          <label
                            htmlFor="wallet"
                            className="payment-type-label"
                          >
                            Wallet
                          </label>
                          <input
                            id="cashOnDelivery"
                            type="radio"
                            name="payment"
                            onChange={onPaymentOption}
                            className="payment-option"
                          />
                          <label
                            htmlFor="cashOnDelivery"
                            className="payment-type-label"
                          >
                            Cash On Delivery
                          </label>
                        </div>
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
                            type="button"
                          >
                            Confirm Order
                          </button>
                        ) : (
                          <button
                            disabled
                            onClick={onConfirmOrder}
                            className="confirm-button disabled-confirm-button"
                            type="button"
                          >
                            Confirm Order
                          </button>
                        )}
                      </>
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
