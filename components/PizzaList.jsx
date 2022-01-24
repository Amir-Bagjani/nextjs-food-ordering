import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>The Best Pizza in Town</h2>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa maxime sit
        commodi earum veniam tempore ipsum. Totam perferendis enim dicta nostrum
        voluptatibus tempora! Veritatis itaque quasi inventore quo delectus hic?
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza}/>
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
