import Axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import styles from "../../styles/Product.module.css";

const Product = ({ pizza }) => {
  const dispatch = useDispatch()
  const [size, setSize] = useState(0);
  const [addIngredients, setAddIngredients] = useState(0);
  const [price, setPrice] = useState(pizza.prices[size] + addIngredients);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setPrice(pizza.prices[size] + addIngredients)
  }, [size, addIngredients])

  const changeIngredients = (e,option) => {
    if(e.target.checked){
      setAddIngredients(addIngredients => addIngredients + option.price)
      setExtras([...extras, option])
    } 
    else{
      setAddIngredients(addIngredients => addIngredients - option.price)
      setExtras(extras.filter(extra => extra._id !== option._id))
    } 
  }
  
  const handleAdd = () => {
    // dispatch({type: 'ADD', payload: {...pizza, price, quantity, extras}})
    dispatch(addItem({...pizza, price, quantity, extras}))
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={pizza.img}
            objectFit="contain"
            layout="fill"
            alt="pizza"
            priority
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            <Image alt="size" layout="fill" src="/img/size.png" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            <Image alt="size" layout="fill" src="/img/size.png" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => setSize(2)}>
            <Image alt="size" layout="fill" src="/img/size.png" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map(option => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onClick={(e)=>changeIngredients(e,option)}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
          
        </div>
        <div className={styles.add}>
            <input type="number" value={quantity} className={styles.quantity}  onChange={(e)=>setQuantity(e.target.value>=1 ? e.target.value : 1)} />
            <button className={styles.button} onClick={handleAdd}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({params}) => {
  const res = await Axios.get(`https://nextjs-food-order.vercel.app/api/products/${params.id}`);

  return {
    props: { pizza: res.data },
  };
};

export default Product;
