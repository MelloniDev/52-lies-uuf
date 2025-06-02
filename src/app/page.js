import Image from "next/image";
import styles from "./page.module.css";
import DeckScatter from "./components/DeckScatter";
import StartScreen from "./components/startScreen";

export default function Home() {
  return (
    <main>
      <DeckScatter />
      <StartScreen />
    </main>
  );
}
