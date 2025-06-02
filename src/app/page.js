import Image from "next/image";
import styles from "./page.module.css";
import DisplayDeck from "./components/DisplayDeckService";

export default function Home() {
  return (
    <main>
      <DisplayDeck />
    </main>
  );
}
