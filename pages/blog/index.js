import Link from "next/dist/client/link";
import { useState } from "react";
import { request } from "graphql-request";
import useSWR from "swr";

const fetcher = (endpoint, query, variables) => request(endpoint, query, variables);

export const getStaticProps = async () => {
  const data = await fetcher(
    process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
    ` {
    posts(first: 3, orderBy: date_DESC) {
      title
      slug
      description
      date
      tags
      author {
        name
        image {
          url
          width
          height
        }
      }
    }
  }`,
  );
  return {
    props: {
      posts: data.posts,
    },
  };
};

export default function BlogPage({ posts }) {
  const [searchValue, setSearchValue] = useState("");
  const { data, error } = useSWR(
    [
      process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
      `query getPosts($searchValue:String) {
        posts(orderBy: date_DESC, where:{title_contains: $searchValue}){
          id
          title
          date
          slug
          description
          author{
            name
          }    
        }
      }`,
      searchValue,
    ],
    (endpoint, query) => fetcher(endpoint, query, { searchValue }),
    { initialData: posts, revalidationOnFocus: true },
  );

  if (error) {
    return (
      <div>
        <h2>There was an error with data fetching</h2>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
      <h1 className="text-5xl text-gray-600 font-serif mb-6 font-bold">The Blog</h1>
      <div>
        <input
          type="text"
          value={searchValue}
          placeholder="Search Blog posts"
          className="foucs:outline-none mb-6 focus:ring-2 focus:ring-gray-900 w-full rounded-lg border h-10 pl-4 text-lg text-gray-800  border-gray-200"
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
      <div className="">
        {data?.posts.map((post) => (
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
  );
}
