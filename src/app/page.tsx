import Provider from "@/components/common/Provider";
import { Slide } from "@/components/Slider";
import { Auth } from "@/components/Auth";

import styles from "./page.module.css";
export default function Home() {
  return (
    <>
      <main id={styles.main}>
        <Provider>
          <Slide />
          <Auth />
        </Provider>
      </main>
    </>
  );
}
