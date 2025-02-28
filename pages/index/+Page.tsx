import { photos } from "../photos";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.container}>
      <div className={styles.grid}>
        {photos.map((photo) => (
          <a href={photo.slug} key={photo.slug} className={styles.imageWrapper}>
            <img
              src={photo.url || "/placeholder.svg"}
              alt={photo.title}
              className={styles.image}
            />
            <p>{photo.title}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
