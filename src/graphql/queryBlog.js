import gql from "graphql-tag";

const LIST_BLOGS = gql`
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

export { LIST_BLOGS, getBlog };
