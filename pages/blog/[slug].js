import Head from "next/head";
import { useRouter } from "next/router";
import { getPost, getBlogSlugs } from "../../lib/data";

export const getStaticPaths = async () => {
  const slugsRes = await getBlogSlugs();
  const slugs = slugsRes.posts;

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug.slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const postItem = await getPost(params.slug);
  return {
    props: {
      postItem: postItem.posts[0],
    },
  };
};

export default function Home({ postItem }) {
  const router = useRouter();
  console.log("postItem:", postItem);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>SMT Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>{postItem.title}</h1>
      </div>
    </div>
  );
}
