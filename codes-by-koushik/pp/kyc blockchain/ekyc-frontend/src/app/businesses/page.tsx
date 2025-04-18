import Link from "next/link";
import styles from "./businesses.module.css";
import Image from "next/image";

export default function BusinessesPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>eKYC Network</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.content}>
          <h2>Simplify Your KYC Process</h2>
          <p>
            Onboard customers efficiently and securely with our streamlined KYC
            solutions.
          </p>
          <Image
            src="/human-illustration-3.svg" // Replace with your image path
            alt="Team working on KYC"
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
