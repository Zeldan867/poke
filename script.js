const searchBar = document.getElementById("site-search");
const modalElement = document.getElementById("modal");

// Ajouter un écouteur d'événement sur la barre de recherche
if(searchBar){


    searchBar.addEventListener("input", function() {
        // Récupérer la valeur actuelle et compter les caractères
        const characterCount = searchBar.value.length;
        const searchValue = searchBar.value;
        if (characterCount>3){
            afficherPokemon(searchValue)
            modalElement.classList.add("active");
        }
        else {
            modalElement.classList.remove("active");
        }
    });
}

async function afficherPokemon(pokemon) {
    const reponse = await fetch("http://tyradex.vercel.app/api/v1/pokemon");
    const listpoke = await reponse.json();
    const filter = listpoke.filter(p => p.name.fr.toLowerCase().includes(pokemon.toLowerCase()));
    if (filter.length>0){
        let modal = document.getElementById("modal");
        modal.innerHTML = "";
        for(let i=0; i<filter.length;i++) {        
            let nouveauElement = document.createElement("a");
            nouveauElement.className = "dracau";
            nouveauElement.href = "pagedracaufeu.html?pokemon="+filter[i].name.fr.toLowerCase();

            let image = document.createElement("img");
            image.className = "draca";
            image.src = filter[i].sprites.regular; 
            image.alt = "Dracaufeu"; 

            let titre = document.createElement("h2");
            titre.textContent = filter[i].name.fr; 

            nouveauElement.appendChild(image);
            nouveauElement.appendChild(titre);

            modal.appendChild(nouveauElement);

            }       
        }      
    }

    async function afficherPokemonPage(pokemon) {
        let nom = document.getElementById("nom");
        let number = document.getElementById("number");
        let taille = document.getElementById("taille");
        let categorie = document.getElementById("categorie");
        let poids = document.getElementById("poids");
        let talent = document.getElementById("talent");
        let img = document.getElementById("img");
        let male = document.getElementById("male");
        let cri = document.getElementById("cri");
        let female = document.getElementById("female");

        const reponse = await fetch("http://tyradex.vercel.app/api/v1/pokemon/"+pokemon);
        const infopoke = await reponse.json();
        console.log(infopoke)
        nom.innerText=infopoke.name.fr;
        number.innerText=infopoke.pokedex_id;
        taille.innerText=infopoke.height;
        categorie.innerText=infopoke.category;
        poids.innerText=infopoke.weight;
        talent.innerText = (infopoke.talents[1]?.name) ?? (infopoke.talents[0]?.name);
        img.src=infopoke.sprites.regular;
        if (infopoke.sexe == null) {
        let sexeContainer = document.getElementsByClassName("div10")[0];
        let asexue =document.getElementById("asexue");
            if (sexeContainer) {
                sexeContainer.remove();
                asexue.classList.add("active");
            }
        } 
        else{
            male.innerText=infopoke.sexe.male;
            female.innerText=infopoke.sexe.female;
        }
       
        cri.src = await recupereCri(infopoke.name.en.toLowerCase());
    }
       
    async function recupereCri(pokemon) {
        const reponse = await fetch("https://pokeapi.co/api/v2/pokemon/"+pokemon);
        const pokemonn = await reponse.json();
        return pokemonn.cries.latest;
      }

    let params = new URLSearchParams(window.location.search);


    let valeur = params.get("pokemon");

    console.log(afficherPokemonPage(valeur))
    afficherPokemonPage(valeur)