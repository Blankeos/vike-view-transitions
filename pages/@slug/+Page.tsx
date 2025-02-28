import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";
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
              style={{ viewTransitionName: `photo-${photo.slug}` }}
            />
          </div>
          <div className={styles.titleWrapper}>
            <h2 style={{ viewTransitionName: `title-${photo.slug}` }}>
              {photo.title}
            </h2>
          </div>
          <a
            className={styles.backButton}
            onClick={() => {
              if (document.startViewTransition)
                document.startViewTransition(async () => {
                  await navigate(`/`, {
                    overwriteLastHistoryEntry: true,
                  });
                });
            }}
          >
            Back
          </a>
        </>
      )}
    </main>
  );
}
