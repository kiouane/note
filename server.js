var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.listen(PORT, function(){
    console.log('Server is listening on port ' + PORT);
});
var movies = [
    {
        id: 1,
        name: 'KGF',
        director: 'Prasant Nil'
    },
    {
        id: 2,
        name: 'Puspa',
        director: 'Sukumar'
    },
    {
        id: 3,
        name: 'Baahubali',
        director: 'SS Rajamouli'
    },
];
app.get('/movies', function(req, res){
    res.send({ movies:movies});
});
var current_id = 3;
app.post('/movies', function(req, res){
    var Name = req.body.name;
    var Director = req.body.director;
    current_id++;
    movies.push({
        id: current_id,
        name: Name,
        director: Director
    });
    res.send('Successfully added!');
});
app.put('/movies/:id', function(req, res){
    var id = req.params.id;
    var newName = req.body.newname;
    var newDirector = req.body.newdirector;
    var found = false;
    movies.forEach(function(movie, index){
        if(!found && movie.id === Number(id)){
            movie.name = newName;
            movie.director = newDirector;
        }
    });
    res.send('Successfully updated!');
});
app.delete('/movies/:id', function(req, res){
    var id = req.params.id;
    var found = false;
    movies.forEach(function(movie, index){
        if(!found && movie.id === Number(id)){
            movies.splice(index, 1)
        }
    });
    res.send('Successfully deleted!');
});