function hideSpan(){
    window.setTimeout(function(){
        $('span').css('display', 'none');
    }, 1000);
}

function loadMovies(){
    $.ajax({
        url: '/movies',
        contentType: 'application/json',
        success: function(response){
            $('tbody').html('');
            response.movies.forEach(function(movie){
                $('tbody').append('<tr>\
                <td>' + movie.id + '</td>\
                <td><input id="name' + movie.id + '" value="' + movie.name + '"></td>\
                <td><input id="director' + movie.id + '" value="' + movie.director + '"></td>\
                <td><i onclick="updateThis(' + movie.id + ');" class="fa-solid fa-circle-check green"></i>\
                <i onclick="deleteThis(' + movie.id + ');" class="fa-solid fa-circle-xmark red"></i>\
                </td>\
                </tr>');
            });
        }
    });
}

function updateThis(id){
    var new_name = '#name' + id;
    var new_director = '#director' + id;
    $.ajax({
        url: '/movies/' + id,
        contentType: 'application/json',
        method: 'PUT',
        data: JSON.stringify({ newname: $(new_name).val(), newdirector: $(new_director).val() }),
        success: function(response){
            $('span').css('display', 'block');
            $('span').html(response);
        }
    });
    loadMovies();
    hideSpan();

}

function deleteThis(id){
    $.ajax({
        url: '/movies/' + id,
        contentType: 'application/json',
        method: 'DELETE',
        success: function(response){
            $('span').css('display', 'block');
            $('span').html(response);
        }
    });
    loadMovies();
    hideSpan();

}

$(document).ready(function(){
    loadMovies();
    $('#createForm').submit(function(event){
        event.preventDefault();
        if($('#name').val() != "" && $('#director').val() != ""){
            $.ajax({
                url: '/movies',
                contentType: 'application/json',
                method: 'POST',
                data: JSON.stringify({ name: $('#name').val(), director: $('#director').val() }),
                success: function(response){
                    $('#name').val('');
                    $('#director').val('');
                    $('#name').css('border', 'thin solid rgba(0,0,0,.1)');
                    $('#director').css('border', 'thin solid rgba(0,0,0,.1)');
                    $('span').css('display', 'block');
                    $('span').html(response);
                }
            });
        }
        else{
            if($('#name').val() == ""){
                $('#name').css('border', 'thin solid red');
            }
            if($('#director').val() == ""){
                $('#director').css('border', 'thin solid red');
            }
        }
        loadMovies();
        hideSpan();
    });
});