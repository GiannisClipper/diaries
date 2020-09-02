import { MongoClient } from 'mongodb';

let cachedCounter = 0;
let cachedClient = null;

const connectDB = async () => {
    if ( cachedClient ) {
      return [ cachedClient, ++cachedCounter ];
    }

    const URI = process.env.DB_URI;
    const newClient = new MongoClient( URI, { useNewUrlParser: true, useUnifiedTopology: true } );
    await newClient.connect();
    cachedCounter = 0;
    return [ newClient, cachedCounter ];
}

export { connectDB };
