import Axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";

const Admin = ({ products, orders }) => {
    const [pizzaList, setPizzaList] = useState(products)
    const [orderList, setOrderList] = useState(orders)
    const status = [`preparing`, `on the way`, `delivered`]

    const handleDelete = async(id) =>{
        try{
            await Axios.delete("https://nextjs-food-order.vercel.app/api/products/" + id)
            setPizzaList(pizzaList.filter(i => i._id !== id))
        }catch(err){
            console.log(err.data);
        }
    }
    const handleChangeStage = async(order) =>{
        try{
            await Axios.put(`https://nextjs-food-order.vercel.app/api/orders/${order._id}` , {status: order.status + 1})
            const newStatus = [...orderList].map(i => {
                if(i._id === order._id) return {...i , status: order.status + 1}
                return i
            })
            setOrderList(newStatus)
        }catch(err){
            console.log(err.data);
        }
    }



  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
            <thead>
                <tr className={styles.trTitle}>
                    <th>Image</th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {pizzaList.map(i => (
                    <tr className={styles.tr} key={i._id}>
                        <td><Image src={i.img} width={50} height={50} alt="pizza" /></td>
                        <td>{i._id.slice(0,5)}...</td>
                        <td>{i.title}</td>
                        <td>${i.prices[0]}</td>
                        <td>
                            <button className={styles.button}>Edit</button>
                            <button className={styles.button} onClick={()=>handleDelete(i._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
                <tbody>
                    <tr className={styles.trTitle}>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Totla</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </tbody>
                <tbody>
                    {orderList.map(i => (
                        <tr className={styles.tr} key={i._id}>
                            <td>{i._id.slice(0,5)}...</td>
                            <td>{i.customer}</td>
                            <td>${i.total}</td>
                            <td>{i.method ? <span>Online</span> : <span>Cash</span>}</td>
                            <td>{status[i.status]}</td>
                            <td><button className={styles.button} onClick={()=>i.status <2 && handleChangeStage(i)}>Next stage</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async(context) => {
    const myCookie = context.req?.cookies || "";

    if(myCookie.token !== process.TOKEN){
        return{
            redirect:{
                destination: "/admin/login",
                permanent: false,
            }
        }
    }
    const productRes= await Axios.get(`https://nextjs-food-order.vercel.app/api/products`);
    const orederRes= await Axios.get(`https://nextjs-food-order.vercel.app/api/orders`);

    return{
        props:{
            products: productRes.data, 
            orders: orederRes.data, 
        }
    }
}

export default Admin;
