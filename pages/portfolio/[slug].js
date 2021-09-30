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

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>SMT Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-3w-3xlmx-auto px-4 sm:px-6 lg:px-0">
        <h1 className="text-5xl text-gray-900 font-bold">{portfolioItem.title}</h1>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-700">{new Date(portfolioItem.date).toDateString()}</p>
          <div className="flex space-x-3">
            {portfolioItem?.tags.map((tag) => (
              <span
                className="uppercase text-sm tracking-wide m-2 bg-gray-100 px-2 py-1 rounded-lg text-gray-900"
                key={tag}>
                &nbsp;{tag}
              </span>
            ))}
          </div>
        </div>

        <p className="prose prose-xl py-4">{portfolioItem.description}</p>
        <Image
          src={portfolioItem.coverImage.url}
          width={portfolioItem.coverImage.width}
          height={portfolioItem.coverImage.height}
          alt={portfolioItem.title}
        />

        <div className="prose prose-xl max-w-none mt-4">
          <MDXRemote {...content} />
        </div>
      </div>
    </div>
  );
}
