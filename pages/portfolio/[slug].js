import Head from "next/head";
import { useRouter } from "next/router";
import { getPortfolioItem, getPortfolioSlugs } from "../../lib/data";

export const getStaticPaths = async () => {
  const slugsRes = await getPortfolioSlugs();
  const slugs = slugsRes.portfolios;

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug.slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const portfolioItem = await getPortfolioItem(params.slug);
  return {
    props: {
      portfolioItem: portfolioItem.portfolios[0],
    },
  };
};

export default function Home({ portfolioItem }) {
  const router = useRouter();
  console.log("portfolioItem:", portfolioItem);

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
        <h1>{portfolioItem.title}</h1>
      </div>
    </div>
  );
}