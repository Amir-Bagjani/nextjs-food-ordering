import { useState } from "react";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({ total, createOrder, setCash }) => {
    const [customer,setCustomer] = useState(``);
    const [address,setAddress] = useState(``);

    const  handleClick = () => {
        if(customer !== `` && address !== ``){
            createOrder({customer, address, total, method: 0})
        }else{
            alert(`please insert your name and address`)
        }
    }


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
          <h1 className={styles.title}>You will pay ${total} after delivery</h1>
          <div className={styles.item}>
              <label className={styles.label}>Fullname</label>
              <input placeholder="John Doe" className={styles.input} value={customer} type="text" onChange={(e)=>setCustomer(e.target.value)} />
              <label className={styles.label}>Phone Number</label>
              <input placeholder="1 234 567 89" type="number" className={styles.input} />
              <label className={styles.label}>Address</label>
              <textarea placeholder="Your address" className={styles.input} value={address} type="text" onChange={(e)=>setAddress(e.target.value)} />
          </div>
          <div>
            <button className={styles.successBtn} onClick={handleClick}>
            Order
            </button>
            <button className={styles.dangerBtn} onClick={()=>setCash(false)}>
            Cancell
            </button>
          </div>
      </div>
    </div>
  );
};

export default OrderDetail;
