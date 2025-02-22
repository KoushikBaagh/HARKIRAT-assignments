import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Logo />
        <Navbar />
      </header>
      <main className={styles.main}>
        <div className={styles.heroSection}>
          <div className={styles.heroText}>
            <h1>Welcome to eKYC Network</h1>
            <p>Securely verify identities with ease.</p>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/human-illustration-1.svg" // Replace with your image path
              alt="Friendly person"
              width={400}
              height={400}
              layout="intrinsic"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} eKYC Network</p>
      </footer>
    </div>
  );
}
