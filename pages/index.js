import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
        {data?.portfolios?.map((item) => (
          <div key={item.slug}>
            <Link key={item.slug} href={`/portfolio/${item.slug}`}>
              <a>
                <div className="relative bg-gray-900 px-0 py-0 mb-10">
                  <div className="absolute w-full h-full z-10 opacity-80 bg-green-900"></div>
                  <div className="absolute w-full h-full z-20 flex flex-col justify-center items-cente text-center px-4">
                    <h3 className="text-white font-semibold text-2xl">{item.title}</h3>
                    <p className="text-gray-50 text-lg mt-4 leading-relaxed">{item.description}</p>
                    <div className="mt-4">
                      {item.tags.map((tag) => (
                        <span
                          className="text-white uppercase text-sm tracking-wide m-2 bg-green-700 px-2 py-1 rounded-lg"
                          key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Image
                    src={item.coverImage.url}
                    objectFit="cover"
                    height={item.coverImage.height}
                    width={item.coverImage.width}
                    className="absolute"
                  />
                </div>
              </a>
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
