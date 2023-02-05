const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://afterschool:29w2ybvxHoouTfut@cluster0.dd7ffq3.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let con;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
        
      if (err || !db) {
        
        return callback(err);
      }

      con = db.db("afterschool");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  connection: function () {
    return con;
  },
};