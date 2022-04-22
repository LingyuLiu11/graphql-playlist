import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useLazyQuery,
  useMutation,
  gql
} from "@apollo/client";
import { useState } from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

// client
//   .query({
//     query: gql`
//       query GetRates {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));
const getBooksQuery = gql`
  {
    books {
      name
      id
      author {
        name
      }
    }
  }
`;

const BookQuery = gql`
  {
    books {
      name
      id
      author {
        name
      }
    }
  }
`;


function Booklist() {
  const { loading, error, data } = useQuery(getBooksQuery);
  // const [getData, { loading, error, data }] = useLazyQuery(GET_DOG_PHOTO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return data.books?.map(({ name, id}) => (
    <div key={name}>
      <p>
        {name}: {id}
      </p>
    </div>
  ));

  // return (
  //   <div>
  //     {data?.rates }
  //     <button onClick={() => getData({ } )}>
  //       Click me!
  //     </button>
  //   </div>
  // )
}


const addAuthorMutation = gql`
  mutation($name:String!, $age:Int!) {
    addAuthor(name: $name, age: $age) {
      name
      age
    }
  }
`;

function MyComponent() {
  // Pass mutation to useMutation
  const [addAuthor, { data, loading, error }] = useMutation(addAuthorMutation, { client: client.current });
  const[name, setName] = useState('');
  const[age, setAge] = useState('');
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  let input, num;
  

  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log("name " + name);
  }

  const ageHandler = (e) => {
    e.preventDefault();
    setAge(e.target.value);
    console.log("age " + age);
    
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addAuthor({ variables: { name: name, age: age} });
          // input.value = '';
          
        }}
      >
        <input
          // ref={node => {
          //   input = node;
          // }}
          onChange={nameHandler}
        />

        <input
          // ref={node => {
          //   num = node;
          // }}
          onChange={ageHandler}
          
        />
        
        <button type="submit">Add Author</button>
      </form>
    </div>
  );
}





function App() {
  return (
    <ApolloProvider client={client}>
    <Booklist></Booklist>
    {/* <DogPhoto/> */}
    <MyComponent></MyComponent>
    </ApolloProvider>
  );
}

export default App;
