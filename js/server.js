var express = require("express");
var path = require("path");
const { MongoClient } = require('mongodb');
// mongodb personal uri
const uri = "mongodb+srv://EdoFrata:mdxWebapp@cluster0.x5s0g.mongodb.net/LessonsClub?retryWrites=true&w=majority";
const port = process.env.PORT || 3000;
const cors = require('cors');
var app = express();
var publicPath = path.join(__dirname, "../public/");
app.use(express.static(publicPath));

// extract parameters from the request
app.use(express.json());
app.use(cors());
// middleware which prints on console infos
app.use(function (request, response, next) {
    console.log("Request IP: " + request.url);
    console.log("This is a : " + request.method + " request");
    console.log("Request date: " + new Date());
    // experimental
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "*");
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
        request.collection.findOneAndUpdate(
            { _id: new ObjectID(request.params.id)},
            {$set: {spaces : request.body.spaces}},
            {safe:true, multi: false},
        (err, result) => {
            if (err) return next(err)
            response.send((result.result === undefined) ? {msg : 'success'} : {msg:'error'})
        })
    })

// search API
app.get("/search/:lesson?", async function(request, response) {
    // response.render
    if (request.params.lesson && !(/^\s*$/.test(request.params.lesson))){
        response.send(await mongoSearch(request.params.lesson));
    } else {response.status(400).end();}
});

async function mongoSearch(string){ 
    const value = string.toLowerCase();
    const products = db.collection("lessons");
    const search = x => { return {$or: [ {title: {'$regex': `${x}`, '$options': 'i'}}, {location:{'$regex': `${x}`, '$options': 'i'}} ]}; };

    if (!(/^\s*$/.test(value))){
        if(value.length < 2)    return  await products.find(search(".*("+value+").*")).project({ _id: 1}).toArray();
        else                    return  await products.find(search("^("+value+").*" )).project({ _id: 1}).toArray();
    }else return null;
}

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

app.use(function (request, response) {
    response.status(404).send("This page has not been made yet!");
});


app.listen(port, function () {
    console.log("Server started on port " + port);
});



