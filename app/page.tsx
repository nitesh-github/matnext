import styles from "./page.module.css";
import { redirect } from "next/navigation";
export default function Home() {
  redirect("/dashboard");
  return (
    <div className={styles.page}>
      <main className={styles.main}>
       
      <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
      <p className="text-gray-600 mt-2">This is your main content area.</p>
      </main>
     
    </div>
  );
}
