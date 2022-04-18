const graphql = require('graphql');

//describe object type 
//first grasp variable from graphql package
const {GraphQLObjectType, GraphQLString} = graphql;

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