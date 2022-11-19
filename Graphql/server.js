const express = require('express');
const path = require('path');
const {graphqlHTTP} = require('express-graphql');
const {makeExecutableSchema} = require('@graphql-tools/schema');
const {loadFilesSync} = require('@graphql-tools/load-files');
const async = require('hbs/lib/async');
const app = express();
const typeArray = loadFilesSync(path.join(__dirname,'**/*.graphql'));
const schema = makeExecutableSchema({
    typeDefs:typeArray,
    resolvers:{
        Query:{
            products: async (parent)=>{
                console.log('Getting Products...');
                const products = await parent.products;
                return products;
            },
            orders: async (parent)=>{
                console.log('Getting Orders');
                const orders = await parent.orders;
                return orders;
            }
        }
    }
})
const root = { 
   products:require('./products/products.model'),
   orders:require('./orders/orders.model'),
};

app.use('/graphql',graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true,
}))


app.listen(3000,_=>console.log(`Graphql is running...`));