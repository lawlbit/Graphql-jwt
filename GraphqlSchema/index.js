const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'SampleQueries',
    fields: {
        helloWorld: {
            type: GraphQLString,
            resolve(parent,args){
                return 'Hello World'
                console.log("Hello World");
			}
        },
        getRandomInt: {
            type: GraphQLInt,
            args: {
                a: {type: new GraphQLNonNull(GraphQLInt)},
                b: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                var a,b;
                if (args.b < args.a) {
                    a = args.b;
                    b = args.a;
                } else {
                    a = args.a;
                    b = args.b;
                }

                return Math.floor(Math.random() * b) + a
            }
        }
    }
});
var schema = new GraphQLSchema({
    query: RootQuery
});

module.exports = schema;
