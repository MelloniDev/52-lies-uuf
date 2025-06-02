import Image from "next/image";
import styles from "./page.module.css";
import DeckScatter from "./components/DisplayDeckService";

export default function Home() {
  return (
    <main>
      <DeckScatter />
    </main>
  );
}
