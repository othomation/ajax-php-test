const getErrorMessageHTML = function (message) {
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
	const response = await fetch("http://localhost/ajax/getPosts.php");
	ifResponseNotOk(root, response);
	const posts = await response.json();
	root.append(...posts.map((post) => buildPost(post)));
}

async function getPost(post_id) {
	const root = document.getElementById("rootOne");
	clearInnerHTML(root);
	const response = await fetch("http://localhost/ajax/getPosts.php?query=" + post_id);
	ifResponseNotOk(root, response);
	const post = await response.json();
	"error" in post ? (root.innerHTML = getErrorMessageHTML(post.error)) : root.append(buildPost(post, true));
}
