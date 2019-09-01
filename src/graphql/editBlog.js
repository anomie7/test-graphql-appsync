import gql from "graphql-tag";

const EDIT_BLOG = gql`
    mutation editBlog($id: ID!, $title: String!, $content: String, $rating: Float, $approved: Boolean){
        updateBlog(
        input: {
            id: $id,  
            title: $title,
            content: $content,
            rating: $rating,
            approved: $approved
        }){
        id
        title
    }
    }
`;

export default EDIT_BLOG;