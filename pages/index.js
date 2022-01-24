import Axios from "axios";
import Head from "next/head";
import { useState } from "react";
import AddModal from "../components/AddModal";
import PizzaList from "../components/PizzaList";
import Slider from "../components/Slider";
import styles from "../styles/Home.module.css";

export default function Home({ pizzaList, admin }) {
  const [showAdd, setShowAdd] = useState(false)
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza</title>
        <meta name="description" content="The best pizza you've ever tasted" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider />
      {admin && <button className={styles.addBtn} onClick={()=>setShowAdd(true)}>Add New PIZZA</button>}
      <PizzaList pizzaList={ pizzaList }/>
      {showAdd && <AddModal setShowAdd={setShowAdd}/>}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || "";
  let admin = false;
  if(myCookie.token === process.env.TOKEN) admin = true;
  const res = await Axios.get(process.env.B_URL+"api/products");

  return {
    props: { pizzaList: res.data, admin },
  };
};
