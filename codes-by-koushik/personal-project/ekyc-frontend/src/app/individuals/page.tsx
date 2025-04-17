import Link from "next/link";
import styles from "./individuals.module.css";
import Image from "next/image";

export default function IndividualsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>eKYC Network</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.content}>
          <h2>Verify Your Identity Once</h2>
          <p>
            Enjoy seamless access to various services after a single
            verification.
          </p>
          <Image
            src="/human-illustration-2.svg" // Replace with your image path
            alt="Person verifying identity"
            width={300}
            height={300}
            style={{ objectFit: "contain" }}
          />
          <Link href="/">Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
