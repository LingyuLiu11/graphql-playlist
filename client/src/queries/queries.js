import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name:String!, $genre:String!, $authorId:ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;//pass variables, ! means should be non null

const getBookQuery = gql`
  query($id:ID) {
      book(id:$id) {
          id
          genre
          author {
              id
              name
              books {
                  name
                  id
              }
          }
      }
  }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };
