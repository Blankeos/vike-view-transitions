import { usePageContext } from "vike-react/usePageContext";
import { photos } from "../photos";
import styles from "./@slug.module.css";

export default function Page() {
  const { routeParams } = usePageContext();

  const photo = photos.find((_photo) => {
    return routeParams.slug === _photo.slug;
  });

  return (
    <main className={styles.container}>
      {photo && (
        <>
          <div className={styles.imageWrapper}>
            <img
              src={photo.url || "/placeholder.svg"}
              alt={photo.title}
              className={styles.image}
            />
          </div>
          <div className={styles.titleWrapper}>
            <h2>{photo.title}</h2>
          </div>
          <button
            className={styles.backButton}
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </>
      )}
    </main>
  );
}
