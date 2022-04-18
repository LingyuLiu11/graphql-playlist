const graphql = require('graphql');

const _ = require('lodash');
//describe object type 
//first grasp variable from graphql package
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID} = graphql;


// dummy data:
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];




//define new type
//wrap fields in function
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } }, //get book by id
            resolve(parent, args) {
                //code to get data from db
                //using dummy data:
                return _.find(books, {id: args.id});
                
            }

        }
    }
});

//which query is allowed to use
module.exports = new GraphQLSchema({
    query: RootQuery
})