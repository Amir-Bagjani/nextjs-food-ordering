import { useEffect, useState } from "react";
import styles from "../styles/Cart.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteItem, resetCart } from "../redux/cartSlice";
import Image from "next/image";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import Axios from "axios";
import { useRouter } from "next/router";
import OrderDetail from "../components/OrderDetail";


const Cart = () => {
  const router = useRouter()
  const { total: cartTotal, products } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  //paypal initial
  const amount = cartTotal;
  const currency = "USD";
  const style = { layout: "vertical" };

  const createOrder = async(data) => {
    try{
      const res = await Axios.post("https://nextjs-food-order.vercel.app/api/orders", data)
      res.status === 201 && router.push(`/order/${res.data._id}`)
      dispatch(resetCart())
    }catch(err){
      console.log(err);
    }
  }

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // console.log(details);
             const shipping = details.purchase_units[0].shipping;
             createOrder({
              customer: shipping.name.full_name,
              address: shipping.address.address_line_1,
              total: cartTotal,
              method: 1,//for chash method is 0 and for online method is 1
             })
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Delete</th>
            </tr>
          </tbody>
          <tbody>
            {products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>${product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${product.price * product.quantity}
                  </span>
                </td>
                <td>
                  <div style={{cursor: `pointer`}} onClick={()=>dispatch(deleteItem(product._id))}> 
                    <Image alt="delete" src="/img/garbage.png" width={25} height={25} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!products.length && <p className={styles.empty}>YOUR CART IS EMPTY!</p>}
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cartTotal}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cartTotal}
          </div>
          <div className={styles.totalTextAt}>
            <span>!ATTENTION!</span><br />
            <span>use this Email and Password</span><br />
            <span>Email: sb-j1fne12059751@personal.example.com</span><br />
            <span>Password: 123456789</span>
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AbEV_DuteQfsKrqbr5vb3PeUoB-OiqDQGfHK4jZuyJmxeGZrS2uz83C_ICCIPmkWnFCjfMbnZw75SMUd",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      { cartTotal >0 && cash && <OrderDetail total={cartTotal} createOrder={createOrder} setCash={setCash} />}
    </div>
  );
};

export default Cart;