import Axios from "axios";
import { useState } from "react";
import styles from "../styles/AddModal.module.css";

const AddModal = ({ setShowAdd }) => {
  const [pending, setPending] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(``);
  const [desc, setDesc] = useState(``);
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]);

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };
  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };
  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };
  const handleCreate = async () => {
    setPending(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const res = await Axios.post(
        "https://api.cloudinary.com/v1_1/dxtfmfulq/image/upload",
        data
      );
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: res.data.url,
      };
      await Axios.post(process.env.B_URL+"api/products", newProduct);
      setPending(false);
      setShowAdd(false);
    } catch (err) {
      console.log(err);
      setPending(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.warpper}>
        {pending && (
          <div className={styles.loader}>
            <div className={styles.square}>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        <span className={styles.closeBtn} onClick={() => setShowAdd(false)}>
          X
        </span>
        <h1 className={styles.title}>Add New PIZZA</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input
            type="file"
            className={styles.input}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          {" "}
          Create
        </button>
      </div>
    </div>
  );
};
export default AddModal;
