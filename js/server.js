var express = require("express");
var path = require("path");
const { MongoClient } = require('mongodb');
// mongodb personal uri
const uri = "mongodb+srv://EdoFrata:riccardo1012@cluster0.x5s0g.mongodb.net/LessonsClub?retryWrites=true&w=majority";

var app = express();
var publicPath = path.join(__dirname, "../public/");
app.use(express.static(publicPath));

// extract parameters from the request
app.use(express.json());

// middleware which prints on console infos
app.use(function (request, response, next) {
    console.log("Request IP: " + request.url);
    console.log("This is a : " + request.method + " request");
    console.log("Request date: " + new Date());
    next();
});

// connecting mongodb
let db;
MongoClient.connect(uri, (err, client) => {
    db = client.db('LessonsClub');
});

// establishing mongodb collection name
app.param('collection_name', (request, response, next, collection_name) => {
    request.collection = db.collection(collection_name);
    return next();
})

// retrieving lessons from mongodb
app.get('/collection/:collection_name', 
    (request, response, next) => {
    request.collection.find({}).toArray((err, results) => {
        if (err) { return next(err); }
        response.send(results);
    })
})
// adding an object to the collection
app.post('/collection/:collection_name', 
    (request, response, next) => {
    request.collection.insertOne(request.body, (err, results) => {
        if (err) { return next(err); }
        response.send(results.ops);
    })
})
// retrieve only one object from the collection thank to the id
const ObjectID = require('mongodb').ObjectId;
app.get('/collection/:collection_name/:id'
    , (request, response, next) => {
        request.collection.findOne({ _id: new ObjectID(request.params.id) }, (err, result) => {
            if (err) return next(err)
            response.send(result)
        })
    })

// update an object from the collection
app.put('/collection/:collection_name/:id'
    , (request, response, next) => {
        request.collection.update(
            { _id: new ObjectID(request.params.id)},
            {$set:request.body},
            {safe:true, multi: false},
        (err, result) => {
            if (err) return next(err)
            response.send((result.result === undefined) ? {msg : 'success'} : {msg:'error'})
        })
    })

// removing object with delete
app.delete('/collection/:collection_name/:id'
    , (request, response, next) => {
        request.collection.deleteOne(
            { _id: new ObjectID(request.params.id)},
        (err, result) => {
            if (err) return next(err)
            console.log(result.result);
            response.send((result.result === undefined) ? {msg : 'success'} : {msg:'error'})
        })
    })

// default route if no collection has been selected
app.get('/', (request, response, next) => {
    response.send('You need to select a collection (/collection/nameOfCollection)');
})
app.get("/lessons", function (request, response) {

});

// comment
app.get("/user", function (request, response) {

});

app.use(function (request, response) {
    response.status(404).send("This page has not been made yet!");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server started on port " + port);
});



