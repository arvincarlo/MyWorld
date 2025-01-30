// Uses the same styles as Product
import styles from "./Product.module.css";
import PageNav from "../components/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav></PageNav>
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $2/month.
          </h2>
          <p>
            Start your journey with Pin Voyage today and make every trip unforgettable. 
          </p>
          <p>
            Discover the world and keep track of your adventures with Pin Voyage, the ultimate app for travelers. Pin each city or country you visit and create a visual map of your journeys.
          </p>
        </div>
        <img src="bg.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
