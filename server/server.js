const MongoClient = require("mongodb").MongoClient;
const xlsx = require("node-xlsx");
const fs = require("fs");

const sheets = xlsx.parse("./resource/前端统计.xlsx");
console.log(sheets);
sheets.map(sheet => {
  console.log(sheet.name);
  // 读取每行内容
  // for(var rowId in sheet['data']){
  //     console.log(rowId);
  //     var row=sheet['data'][rowId];
  //     console.log(row);
  // }
});

// var data = [
//   {
//     name: "sheet1",
//     data: [
//       ["ID", "Name", "Score"],
//       ["1", "Michael", "99"],
//       ["2", "Jordan", "98"]
//     ]
//   },
//   {
//     name: "sheet2",
//     data: [
//       ["AA", "BB"],
//       ["23", "24"]
//     ]
//   }
// ];
// var buffer = xlsx.build(data);
// // 写入文件
// fs.writeFile("a.xlsx", buffer, function(err) {
//   if (err) {
//     console.log("Write failed: " + err);
//     return;
//   }

//   console.log("Write completed.");
// });

const DBurl = "mongodb://localhost/";

const dbName = "mongodb";

const client = new MongoClient(DBurl, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const doSth = (tabName, cb) => {
  client.connect(function(err) {
    if (err) {
      console.log("链接数据库失败->", err);
      return;
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection(tabName);

    cb(collection);
  });
};
// doSth("docs", collection => {
//   collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], (err, res) => {
//     if (err) {
//       console.log("插入数据失败->", err);
//       return;
//     }
//     client.close();
//   });
// });

// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection("docs");
//   // Insert some documents
//   collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], function(err, result) {
//     if (err) {
//       console.log("插入数据失败->", err);
//       return;
//     }
//     console.log("Inserted 3 docs into the collection");
//     callback(result);
//   });
// };

// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection("docs");
//   // Find some documents
//   collection.find({}).toArray(function(err, docs) {
//     console.log("Found the following records");
//     console.log(docs);
//     callback(docs);
//   });
// };

// const findOneDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection("documents");
//   // Find some documents
//   collection.find({ a: 3 }).toArray(function(err, docs) {
//     console.log("Found the following records");
//     console.log(docs);
//     callback(docs);
//   });
// };

// const updateDocument = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection("documents");
//   // Update document where a is 2, set b equal to 1
//   collection.updateOne({ a: 2 }, { $set: { b: 1 } }, function(err, result) {
//     console.log("Updated the document with the field a equal to 2");
//     callback(result);
//   });
// };

// const removeDocument = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection("documents");
//   // Delete document where a is 3
//   collection.deleteOne({ a: 3 }, function(err, result) {
//     console.log("Removed the document with the field a equal to 3");
//     callback(result);
//   });
// };

// client.connect(function(err) {
//   if (err) {
//     console.log("链接数据库失败->", err);
//     return;
//   }
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   insertDocuments(db, function(res) {
//     console.log(res);
//     findDocuments(db, function() {
//       client.close();
//     });
//   });
// });
