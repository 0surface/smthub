import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import he from "he";
import { getPortfolioItem, getPortfolioSlugs } from "../../lib/data";
import { Source } from "graphql";

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
      content: await serialize(he.decode(portfolioItem.portfolios[0].content)),
    },
  };
};

export default function Home({ portfolioItem, content }) {
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
        <p>{new Date(portfolioItem.date).toDateString()}</p>
        <p>{portfolioItem.description}</p>
        <Image
          src={portfolioItem.coverImage.url}
          width={portfolioItem.coverImage.width}
          height={portfolioItem.coverImage.height}
        />
        <div>
          {portfolioItem?.tags.map((tag) => (
            <span key={tag}>&nbsp;{tag}</span>
          ))}
        </div>

        <div>
          <MDXRemote {...content} />
        </div>
      </div>
    </div>
  );
}
