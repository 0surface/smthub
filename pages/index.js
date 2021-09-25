import Head from "next/head";
import Link from "next/link";
import { getPostsAndPortfolios } from "../lib/data";

export const getStaticProps = async () => {
  const data = await getPostsAndPortfolios();
  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }) {
  console.log(data);
  return (
    <div>
      <Head>
        <title>SMT Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {data?.portfolios?.map((item) => (
          <div key={item.slug}>
            <Link href={`/portfolio/${item.slug}`}>
              <a>{item.title}</a>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10">
        {data?.posts?.map((post) => (
          <div key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
