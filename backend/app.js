// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './messages.js';
import Pusher from 'pusher';
import cors from 'cors';

// app config
const app = express();
const port = process.env.PORT || 8000;

const db = mongoose.connection;
db.once('open', () => {
  console.log('db connected');
  const msgCollection = db.collection('messages');
  const changeStream = msgCollection.watch();
  changeStream.on('change', (change) => {
    console.log(change);
    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
      });
    } else {
      console.log('Error triggering pusher');
    }
  });
});

const pusher = new Pusher({
  appId: '1195334',
  key: '338b6a41b2c2a68d42df',
  secret: '2e3f49f6c8ccd78423de',
  cluster: 'ap2',
  useTLS: true,
});

// middlewares
app.use(express.json());
app.use(cors());

// db config
const connection_url =
  'mongodb+srv://admin:b2UbPCzkyUcb8Tc@cluster0.imiyf.mongodb.net/whastappclonedb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// ?????

// routes
app.get('/', (req, res) => res.status(200).send('Hello World'));

app.get('/messages', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/messages/new', (req, res) => {
  const message = req.body;
  Messages.create(message, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`New message created ${data}`);
    }
  });
});

//listener
app.listen(port, () => console.log(`Listening on port ${port}`));