const getErrorMessageHTML = function(message) {
    return `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
};

function clearInnerHTML(node) {
    if (node.innerHTML != "") node.innerHTML = "";
    return;
}

function buildPost(post, isOne = false) {
    const container = document.createElement("article");
    container.classList.add("container", "p-3");
    const template2 = `
            <div class="card m-4">
            	<div class="card-header d-inline-block text-truncate p-0">
		          <div class="row p-3 card-header align-items-center">
		        	<div class="col-8">
			        	Publié le <span class="fst-italic">${
							post.datesHeures.creation["date"]
						}</span> à <span class="fst-italic">${post.datesHeures.creation.heure}</span>
                    </div>
                  <div class="col-4 me-auto">
                ${
					!isOne
						? `<a onclick="getPost(${post.id})" class="btn btn-primary">Récuperer cette publication</a>`
						: ""
				}
                 </div>
		    </div>
	    	<div class="card-body">
			    <h5 class="card-title">${post.titre}</h5>
			    <p class="card-text text-wrap lh-base">${!isOne ? post.message.substr(0, 100) + "..." : post.message}</p>
				<a href="#" onclick="supprimerPublication(${post.id})" class="text-danger">Supprimer</a>
            </div>
            `;
	container.innerHTML = template2;
	return container;
}
function ifResponseNotOk(node, response) {
	if (!response.ok) {
		const message = `Une erreure est survenue 😅`;
		node.innerHTML = getErrorMessageHTML(message);
		throw new Error(message);
	}
}

async function getPosts() {
	const root = document.getElementById("root");
	clearInnerHTML(root);
	const response = await fetch(URL_GET_POSTS);
	ifResponseNotOk(root, response);
	const posts = await response.json();
	root.append(...posts.map((post) => buildPost(post)));
}

async function getPost(post_id) {
	const root = document.getElementById("rootOne");
	clearInnerHTML(root);
	const response = await fetch(URL_GET_POSTS + "?query=" + post_id);
	ifResponseNotOk(root, response);
	const post = await response.json();
	"error" in post ? (root.innerHTML = getErrorMessageHTML(post.error)) : root.append(buildPost(post, true));
}

const URL = "http://localhost/WF3_PHP_EXERCICES/blog/07.1-contexte-bdd--connexion/?";

const URL_AFFICHER_PUBLICATION = URL + "action=afficherPublication&publication=";
const URL_INSERER_PUBLICATION = URL + "action=insererPublication";
const URL_SUPPRIMER_PUBLICATION = URL + "action=supprimerPublication&publication=";
const URL_MODIFIER_PUBLICATION = URL + "action=insererPublication";

const URL_AFFICHER_PUBLICATIONS = URL + "action=afficherPublications";

const ACTION_INSERER_COMMENTAIRE = URL + "action=insererPublication";
const URL_SUPPRIMER_COMMENTAIRE = URL + "action=supprimerCommentaire&idPublication=";

/* OBTENIR PUBLICATIONS */
const select = document.querySelector("#obtenirPublication");
function populateSelect() {
	clearInnerHTML(select);
	const publications = axios.get(URL_AFFICHER_PUBLICATIONS).then(function (res) {
		for (let publication of res.data) {
			const option = document.createElement("option");
			option.value = publication["id"];
			option.innerText = publication["id"] + " - " + publication["titre"];
			select.append(option);
		}
	});
}
populateSelect();

select.addEventListener("change", function (e) {
	console.log(e.target.value);
	obtenirPublication(e.target.value);
});

function obtenirPublications() {
	axios.get(URL_AFFICHER_PUBLICATIONS).then(function (res) {
		clearInnerHTML(root);
		root.append(...res.data.map((post) => buildPost(post, true)));
		return res.data;
	});
}

const btn__obtenirPublications = document.querySelector("#obtenirPublications");
btn__obtenirPublications.addEventListener("click", obtenirPublications);

function obtenirPublication(post_id) {
	axios.get(URL_AFFICHER_PUBLICATION + post_id).then(function (res) {
		clearInnerHTML(root);
		console.log(res.data);
		root.append(buildPost(res.data, true));
	});
}

const btn__insererPublication = document.querySelector("#insererPublication");
btn__insererPublication.addEventListener("submit", function (e) {
	e.preventDefault();
	const publication = {
		titre: document.querySelector("input[name=titre]").value,
		message: document.querySelector("#message").value,
	};
	axios
		.post(URL_INSERER_PUBLICATION, publication)
		.then(function (response) {
			titre.value = message.value = "";
			console.log(response);
			populateSelect();
			clearInnerHTML(root);
		})
		.catch((err) => console.error(err));
});

const btn__supprimerPublication = document.querySelector("#supprimerPublication");
if (btn__supprimerPublication)
	btn__supprimerPublication.addEventListener("click", function (e) {
		e.preventDefault();
	});
function supprimerPublication(post_id) {
	if (confirm("Etes vous sur de vouloir supprimer cette publication ?")) {
		axios.delete(URL_SUPPRIMER_PUBLICATION + post_id).then(function () {
			populateSelect();
			clearInnerHTML(root);
		});
	}
}