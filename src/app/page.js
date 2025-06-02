import Image from "next/image";
import styles from "./page.module.css";
import StartScreen from "./components/startScreen";


export default function Home() {
  return (
    <main>
      <StartScreen />
    </main>
  );
}
