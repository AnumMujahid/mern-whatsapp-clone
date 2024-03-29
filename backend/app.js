// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './messages.js';
import Rooms from './rooms.js';
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
    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        _id: messageDetails._id,
      });
    } else {
      console.log('Error triggering pusher');
    }
  });
});

const pusher = new Pusher({
  appId: '', // pusher app id
  key: '', // pusher key
  secret: '', // pusher secret key
  cluster: '', //pusher cluster number
  useTLS: true,
});

// middlewares
app.use(express.json());
app.use(cors());

// db config
const connection_url = ''; // mongodb-atlas url
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

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

app.post('/rooms/:id/messages/new', async (req, res) => {
  const room = await Rooms.findById(req.params.id);
  const message = req.body;
  Messages.create(message, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      room.messages.push(data);
      res.status(201).send(`New message created ${data}`);
      room.save();
    }
  });
});

app.get('/rooms', (req, res) => {
  Rooms.find({})
    .populate('messages')
    .exec((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
});

app.get('/rooms/:id', async (req, res) => {
  Rooms.findById(req.params.id)
    .populate('messages')
    .exec((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
});

app.post('/rooms/new', (req, res) => {
  const room = req.body;
  Rooms.create(room, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(`New room created ${data}`);
    }
  });
});

//listener
app.listen(port, () => console.log(`Listening on port ${port}`));
