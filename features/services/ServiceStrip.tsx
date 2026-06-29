import { Truck, Headphones, ShieldCheck } from "lucide-react";
import styles from "./ServiceStrip.module.css";

const services = [
  {
    icon: <Truck size={22} strokeWidth={1.8} />,
    title: "FREE AND FAST DELIVERY",
    desc: "Free delivery for all orders over $140",
  },
  {
    icon: <Headphones size={22} strokeWidth={1.8} />,
    title: "24/7 CUSTOMER SERVICE",
    desc: "Friendly 24/7 customer support",
  },
  {
    icon: <ShieldCheck size={22} strokeWidth={1.8} />,
    title: "MONEY BACK GUARANTEE",
    desc: "We return money within 30 days",
  },
];

export default function ServiceStrip() {
  return (
    <section className="container mx-auto px-4 py-14">
      <hr className="mb-14 border-gray-200" />

      <div className={styles.wrapper}>
        {services.map((s) => (
          <div key={s.title} className={styles.card}>
            <div className={styles.iconWrap}>
              <div className={styles.iconInner}>{s.icon}</div>
            </div>
            <p className={styles.title}>{s.title}</p>
            <p className={styles.desc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}