import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import he from "he";
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
  const post = await getPost(params.slug);
  return {
    props: {
      post: post.posts[0],
      content: await serialize(he.decode(post.posts[0].content)),
    },
  };
};

export default function Home({ post, content }) {
  const router = useRouter();
  console.log("post:", post);

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
        <h1>{post.title}</h1>
      </div>
      <p>{new Date(post.date).toDateString()}</p>
      <p>{post.description}</p>
      <div>
        <p>{post.author.name}</p>
        <Image
          src={post.author.image.url}
          width={post.author.image.width / 5}
          height={post.author.image.height / 4}
        />
      </div>

      <div>
        {post?.tags.map((tag) => (
          <span key={tag}>&nbsp;{tag}</span>
        ))}
      </div>

      <div>
        <MDXRemote {...content} />
      </div>
    </div>
  );
}
