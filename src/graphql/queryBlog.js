import gql from "graphql-tag";

const listBlogs = gql`
  query getBlogList($limit: Int) {
    listBlogs(limit: $limit) {
      items {
        id
        title
        content
        rating
      }
      nextToken
    }
  }
`;

export default listBlogs;
