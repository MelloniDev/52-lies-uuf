import Image from "next/image";
import styles from "./page.module.css";
import DeckScatter from "./components/DeckScatter";

export default function Home() {
  return (
    <main>
      <DeckScatter />
    </main>
  );
}
