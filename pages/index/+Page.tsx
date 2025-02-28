import { navigate } from "vike/client/router";
import { photos } from "../photos";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.container}>
      <div className={styles.grid}>
        {photos.map((photo) => (
          <a
            href={photo.slug}
            key={photo.slug}
            className={styles.imageWrapper}
            onClick={(e) => {
              e.preventDefault(); // Prevents default link click.
              e.stopPropagation(); // Prevents other onClick handlers from being called (i.e. Vike's <a> incerpetors).
              if (document.startViewTransition)
                document.startViewTransition(async () => {
                  await navigate(`/${photo.slug}`);
                });
            }}
          >
            <img
              src={photo.url || "/placeholder.svg"}
              alt={photo.title}
              className={styles.image}
              style={{ viewTransitionName: `photo-${photo.slug}` }}
            />
            <p style={{ viewTransitionName: `title-${photo.slug}` }}>
              {photo.title}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
