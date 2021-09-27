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
            <Link key={item.slug} href={`/portfolio/${item.slug}`}>
              <a>{item.title}</a>
            </Link>
          </div>
        ))}
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="mt-10">
          {data?.posts?.map((post) => (
            <div key={post.slug} className="grid md:grid-cols-4 py-6">
              <div className="mb-2 md:mb-0 md:col-span-1" key={post.slug}>
                <p className="text-gray-600 tx-sm">{new Date(post.date).toDateString()}</p>
              </div>
              <div className="md:col-span-3">
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <a className="text-2xl font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300">
                    {post.title}
                  </a>
                </Link>
                <p className="text-gray-700 leading-relaxed">{post.description}</p>
                <div className="text-sm text-gray-900 font-semibold">{post.author.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
