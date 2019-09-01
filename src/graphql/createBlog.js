import gql from "graphql-tag";

const createBlog = gql`
mutation addBlog($title: String!, $content: String, $rating: Float){
    createBlog(
        input: {  title: $title,
        content: $content,
        rating: $rating,
        approved: true
        }){
        id
        title
    }
}`;

export default createBlog