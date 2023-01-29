require('dotenv').config();
const express = require('express');
const colors = require('colors');
const schema = require('./schema');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { schema: subscriptionSchema } = require('./subscription');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const connectDb = require('./config/db');
const { createServer } = require('http');
const port = process.env.PORT || 5001
const WS_PORT = 3002

const ws = createServer((req, res) => {
    res.writeHead(200)
    res.end()
})

ws.listen(WS_PORT, () => console.log('websocket listening on port ', WS_PORT))

SubscriptionServer.create({
    schema: subscriptionSchema,
    execute,
    subscribe,
    onConnect: () => console.log('client connected')

}, { server: ws, path: '/graphql' })


const app = express();
connectDb()

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`Server is running on port ${port}`));

