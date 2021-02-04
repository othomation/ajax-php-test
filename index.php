<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test autour de l'ajax</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <script src="./main.js"></script>
</head>

<body>
    <div class="container d-flex justify-content-center pt-5 pb-10">
        <button class="btn btn-primary btn-lg m-2" onclick="getPosts()">Obtenir publications</button>
        <button class="btn btn-danger btn-lg m-2" onclick="clearInnerHTML(rootOne)">Vider publication</button>
        <button class="btn btn-warning btn-lg m-2" onclick="getPost(4)">Récuperer une publication (version avec id non existant)</a>
    </div>
    <div id="rootOne"></div>
    <hr>
    <div id="root">
    </div>
</body>

</html>