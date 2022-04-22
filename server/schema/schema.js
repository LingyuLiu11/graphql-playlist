const graphql = require("graphql");

const _ = require("lodash");

const Book = require('../schema/models/book');
const Author = require('../schema/models/author')

//describe object type
//first grasp variable from graphql package
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// dummy data:
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3" },
  { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3" },
  { name: "The Light Fantastic", genre: "mm", id: "6", authorId: "3" },
];

var authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" },
];

//define new type
//wrap fields in function
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    //write fields as a function because below will not know what is authorType. write as a function to run after both types are defined.
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        console.log(args + " args");
        //return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId)
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return _.filter(books, { authorId: parent.id });
        return Book.find({authorId: parent.id});
      },
    },
  }),
});

const getGenre = (genre) => {
    // console.log(Book.find({genre: genre}));
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(Book.find({genre: genre}));
    //     }, 2000);
    // });
    return (Book.find({genre: genre}));
}
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, //get book by id
      resolve(parent, args) {
        //code to get data from db
        //using dummy data:
        //console.log(args + " args"); // return [object Object]
        //console.log(typeof args.id); // type = string
        //return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },
    book1: {
        type: BookType,
        args: { genre: { type: GraphQLString } }, //get book by name
        resolve(parent, args) {
          //code to get data from db
          //using dummy data:
          //return _.find(books, { id: args.id });
          
          
        //   console.log("Book: " + Book);
        // console.log(args.name);
        //   return Book.find({"name": args.name});
        // return Book.find({genre: args.genre});
            // return _.find(books, {genre: args.genre});
            return getGenre(args.genre);
        },
      },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },
    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            //return books;
            return Book.find({});//find all
        }
    },
    authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args) {
            // return authors;
            return Author.find({});
        }
    }
  },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type:  GraphQLInt}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
            return author.save();//save to db
            }
        },

        addBook: {
            type: BookType,
            args: {
                name: {type:  new GraphQLNonNull(GraphQLString)},//value should be non null
                genre: {type:  new GraphQLNonNull(GraphQLString)},
                authorId: {type:  new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })

                return book.save();
            }
        }
    }
})

//which query is allowed to use
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
