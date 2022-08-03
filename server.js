// create an apollo server
const { ApolloServer, gql } = require('apollo-server');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';
    // try to decode the token
    const user = token ? jwt.verify(token, process.env.JWT_SECRET) : null;
    // add the user to the context
    return { user };
  }
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  })
  .catch(err => {
    console.log(err);
  })
  .then(() => {
    console.log('Server stopped');
  });
