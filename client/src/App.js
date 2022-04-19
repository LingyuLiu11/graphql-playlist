import logo from './logo.svg';
import './App.css';
import BookList from './components/BookList';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
//appollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"

})

function App() {
  return (
    <ApolloProvider client = {client}>
    <div id="main">
      <h1>Reading List</h1>
      <BookList></BookList>
    </div>
    </ApolloProvider>
  );
}

export default App;
