import gql from "graphql-tag";

const listBlogs = gql`
  query getBlogList(
    $filter: TableBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
      }
      nextToken
    }
  }
`;

const getBlog = gql`
  query getBlog($id: ID!) {
    getBlog(id: $id) {
      id
      title
      content
      rating
      approved
    }
  }
`;

export { listBlogs, getBlog };
