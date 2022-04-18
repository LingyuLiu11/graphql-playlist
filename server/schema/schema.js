const graphql = require('graphql');

//describe object type 
//first grasp variable from graphql package
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

//define new type
//wrap fields in function
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } }, //get book by id
            resolve(parent, args) {
                //code to get data from db
                
            }

        }
    }
});

//which query is allowed to use
module.exports = new GraphQLSchema({
    query: RootQuery
})