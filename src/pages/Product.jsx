import styles from "./Product.module.css";
import PageNav from "../components/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="traveller.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>Map Your Adventures</h2>
          <p>
            Pin each city or country you have visited on a visually engaging map.
          </p>
          <p>
            Zoom in and out to explore different regions and see your travel history at a glance.
          </p>
          <p>
            Add notes, and memories to each pin, creating a personalized travel diary.
          </p>
          <p>
            Relive your adventures by browsing through your pinned locations and the stories behind them.
          </p>
        </div>
      </section>
    </main>
  );
}
