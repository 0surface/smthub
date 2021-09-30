import { getPhotos } from "../lib/data";

export const getStaticProps = async () => {
  const photos = await getPhotos();
  console.log(photos);

  return {
    props: {
      photos,
    },
  };
};

export default function Gallery({ photos }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
      <h1>This is the gallery</h1>
    </div>
  );
}
