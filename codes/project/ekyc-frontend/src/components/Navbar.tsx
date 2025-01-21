import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/individuals">For Individuals</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/businesses">For Businesses</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
