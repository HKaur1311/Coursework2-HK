const express = require('express');
const path = require('path');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const uri = "mongodb://localhost:27017/test";

MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  const db = client.db('afterschool');
  app.get('/lessons', (req, res) => {
    db.collection('courses').find({}).toArray((err, courses) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.json(courses);
    });
  });
  app.get('/user', (req, res) => {
    db.collection('user').find({}).toArray((err, user) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.json(user);
    });
  });
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
  });
});