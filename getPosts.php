
<?php
$publications = array(

    array(
        "id" => 1,
        "titre" => "Titre de la publication bouchon 1",
        "message" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia quibusdam commodi quo quisquam cupiditate soluta aut architecto, enim nam nemo natus distinctio doloremque odit ad cumque voluptas unde minima.Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia quibusdam commodi quo quisquam cupiditate soluta aut architecto, enim nam nemo natus distinctio doloremque odit ad cumque voluptas unde minima.Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia quibusdam commodi quo quisquam cupiditate soluta aut architecto, enim nam nemo natus distinctio doloremque odit ad cumque voluptas unde minima.Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia quibusdam commodi quo quisquam cupiditate soluta aut architecto, enim nam nemo natus distinctio doloremque odit ad cumque voluptas unde minima.Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia quibusdam commodi quo quisquam cupiditate soluta aut architecto, enim nam nemo natus distinctio doloremque odit ad cumque voluptas unde minima.Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia quibusdam commodi quo quisquam cupiditate soluta aut architecto, enim nam nemo natus distinctio doloremque odit ad cumque voluptas unde minima.Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia quibusdam commodi quo quisquam cupiditate soluta aut architecto, enim nam nemo natus distinctio doloremque odit ad cumque voluptas unde minima.",
        "datesHeures" => array(
            "creation" => array(
                "date" => "31/12/2020",
                "heure" => "23:59",
            ),
            "modification" => array(
                "date" => "31/12/2020",
                "heure" => "23:59",
            ),
        ),
        "commentaires" => array(
            array(
                "message" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia quibusdam commodi quo quisquam cupiditate soluta aut architecto, enim nam nemo natus distinctio doloremque odit ad cumque voluptas unde minima.",
                "dateHeureCreation" => array(
                    "date" => "31/12/2020",
                    "heure" => "23:59",
                ),
            ),
            array(
                "message" => "Lalalalali lalalalala Mhhhhh...",
                "dateHeureCreation" => array(
                    "date" => "31/12/2020",
                    "heure" => "23:59",
                ),
            ),
        )
    ),

    array(
        "id" => 2,
        "titre" => "Titre de la publication bouchon 2",
        "message" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia quibusdam commodi quo quisquam cupiditate soluta aut architecto, enim nam nemo natus distinctio doloremque odit ad cumque voluptas unde minima.",
        "datesHeures" => array(
            "creation" => array(
                "date" => "31/12/2020",
                "heure" => "23:59",
            ),
            "modification" => null,
        ),
        "commentaires" => null,
    )

);


function obtenirPublication($idPublication)
{
    global $publications;

    foreach ($publications as $publication)
        if (strval($publication["id"]) === strval($idPublication))
            return $publication;
    return ["error" => "Pas de publication avec cet id :("];
}

function obtenirPublications()
{
    global $publications;
    return $publications;
}

header('Content-type: application/json');

if (isset($_GET["query"]) && !empty($_GET["query"])) {
    echo json_encode(obtenirPublication($_GET["query"]));
    return;
} else
    echo json_encode(obtenirPublications());
