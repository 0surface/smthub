import Link from "next/dist/client/link";
import { useState } from "react";
import { request } from "graphql-request";
import useSWR from "swr";

const fetcher = (endpoint, query, variables) => request(endpoint, query, variables);

export const getStaticProps = async () => {
  const data = await fetcher(
    process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
    `query getPosts($searchValue: String) {
      postsConnection(orderBy: date_DESC, where: {title_contains: $searchValue}, first: 2, skip: 0) {
        edges {
          node {
            id
            title
            date
            slug
            description
            id
            author {
              name
            }
          }
        }
        pageInfo{
          hasNextPage
          hasPreviousPage
          pageSize
        }
      }
    }`,
  );
  console.log("fetc", data);
  return {
    props: {
      posts: data,
    },
  };
};

export default function BlogPage({ posts }) {
  const [searchValue, setSearchValue] = useState("");
  const [skip, setSkip] = useState(0);
  const { data, error } = useSWR(
    [
      process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
      `query getPosts($searchValue: String $skip: Int) {
        postsConnection(orderBy: date_DESC, where:{title_contains: $searchValue}, first: 2, skip: $skip){
           edges {
            node {
              id
              title
              date
              slug
              description
              author{
                name
              } 
            }
          }  
          pageInfo{
            hasNextPage
            hasPreviousPage
            pageSize
          }
       }
      }
      `,
      searchValue,
      skip,
    ],

    (endpoint, query) => fetcher(endpoint, query, { searchValue, skip }),
    { initialData: posts, revalidateOnFocus: true },
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

      <div>
        {data?.postsConnection?.edges?.map((post) => (
          <div key={post.node.slug} className="grid md:grid-cols-4 py-6">
            <div className="mb-2 md:mb-0 md:col-span-1" key={post.node.slug}>
              <p className="text-gray-600 tx-sm">{new Date(post.node.date).toDateString()}</p>
            </div>
            <div className="md:col-span-3">
              <Link key={post.node.slug} href={`/blog/${post.node.slug}`}>
                <a className="text-2xl font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300">
                  {post.node.title}
                </a>
              </Link>
              <p className="text-gray-700 leading-relaxed">{post.node.description}</p>
              <div className="text-sm text-gray-900 font-semibold">{post.node.author.name}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-5 justify-center items-center ">
        <div>
          <button
            onClick={() => {
              setSkip(skip - 2);
            }}
            disabled={!data?.postsConnection?.pageInfo?.hasPreviousPage}
            className="bg-indigo-700 w-20 text-white px-3 py-1 rounded-md disabled:bg-gray-400 disabled:text-gray-800">
            Previous
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setSkip(skip + 2);
            }}
            disabled={!data?.postsConnection?.pageInfo?.hasNextPage}
            className="bg-indigo-700 w-20 text-white px-3 py-1 rounded-md disabled:bg-gray-400 disabled:text-gray-800">
            Next
          </button>
        </div>
        <div className="text-gray-700">
          Total Pages : {data?.postsConnection?.pageInfo?.pageSize}
        </div>
      </div>
    </div>
  );
}
