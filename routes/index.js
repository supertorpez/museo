var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
 
// open the database
openDatabase = ()=>{
  const path = require('path');
  const dbPath = path.resolve(__dirname, 'museonavalriabilbao.db')
  //var db = new sqlite3.Database(dbPath);
  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("algo"+err.message);
    }else{
      console.log('Connected.');
    }
});
return db
};

closeDatabase = (db)=>{
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/db', function(req, res, next) {
  const db = openDatabase();
  console.log(req.body);
  const body = req.body;
  const query = body.query;

  db.serialize(() => {
    db.all(query, function (err, rows) {
      if (err) {
        console.error(err.message);
      }
      console.log(rows);
      res.json(rows);
    });
  });

 closeDatabase(db);
});


module.exports = router;
