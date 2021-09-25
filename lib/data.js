import { gql, GraphQLClient } from "graphql-request";

export const getPostsAndPortfolios = async () => {
  const endpoint = "https://api-eu-central-1.graphcms.com/v2/ckty4g8wq1wmh01y0hg5v79qf/master";
  const graphQLClient = new GraphQLClient(endpoint);
  const query = gql`
    {
      portfolios {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          width
          height
        }
      }
      posts {
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
    }
  `;
  return await graphQLClient.request(query);
};

export const getPortfolioItems = async () => {
  const endpoint = "https://api-eu-central-1.graphcms.com/v2/ckty4g8wq1wmh01y0hg5v79qf/master";
  const graphQLClient = new GraphQLClient(endpoint);
  const query = gql`
    {
      portfolios {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          width
          height
        }
      }
      posts {
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
    }
  `;
  return await graphQLClient.request(query);
};

export const getPosts = async () => {
  const endpoint = "https://api-eu-central-1.graphcms.com/v2/ckty4g8wq1wmh01y0hg5v79qf/master";
  const graphQLClient = new GraphQLClient(endpoint);
  const query = gql`
    {
      posts {
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
    }
  `;
  return await graphQLClient.request(query);
};

export const getPortfolioItem = async (slug) => {
  const endpoint = "https://api-eu-central-1.graphcms.com/v2/ckty4g8wq1wmh01y0hg5v79qf/master";
  const graphQLClient = new GraphQLClient(endpoint);
  const query = gql`
    query getPortfolio($slug: String!) {
      portfolios(where: { slug: $slug }) {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          width
          height
        }
        content
      }
    }
  `;
  const variables = {
    slug,
  };
  return await graphQLClient.request(query, variables);
};
