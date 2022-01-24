import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";

function Navbar() {
  const { quantity } = useSelector(state => state.cart)

  return (
    <div className={styles.container}>
      <div className={styles.item}>
      <Link href="/"><div className={styles.callBtn}>
        <Image
            src="/img/telephone.png"
            alt="phone"
            width={32}
            height={32}
          />
        </div></Link>

        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW</div>
          <div className={styles.text}>123 456 789</div>
        </div>
      </div>

      <div className={styles.item}>
        <ul className={styles.list}>
        <Link href="/"><li className={styles.listItem}>Homepage</li></Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Link href="/"><h1 className={styles.logo}>PIZZA</h1></Link>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>

      <div className={styles.item}>
        <Link href="/cart">
          <a>
            <div className={styles.cart}>
              <Image src="/img/cart.png" width={30} height={30} alt="cart" />
              <div className={styles.counter}>{quantity}</div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
