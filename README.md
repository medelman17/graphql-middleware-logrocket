# GraphQL Middleware for Rollbar

Drop in middleware for GraphQL-Yoga that catches and publishes non-schema-related (i.e., resolver-level) errors to your Rollbar service.

If you haven't yet created a Rollbar account for your project(s), you will need to [sign up](https://rollbar.com/signup/).

```ts
npm install graphql-middleware-rollbar
```

Then, include the following when instantiating your `graphql-yoga` server like:

```ts
import { rollbar } from 'graphql-middleware-rollbar'

const rollbarMiddleware = rollbar({
    rollbarAccessToken: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX' // REPLACE WITH YOUR ROLLBAR API KEY
    })
...

const server = new GraphQLServer({
    ...
    middlewares: [rollbarMiddleware],
    ...
})

server.start(() => console.log('All my resolver-level errors are being reported to Rollbar!'))
```
