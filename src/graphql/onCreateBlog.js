import gql from "graphql-tag";

const ON_CREATE_BLOG = gql`
  subscription onNewBlog {
    addedBlog {
      id
      title
    }
  }
`;

export default ON_CREATE_BLOG;
