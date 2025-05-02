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
    var nb1 = Math.floor(Math.random() * 1025);
    var nb2 = Math.floor(Math.random() * 1025);
    var nb3 = Math.floor(Math.random() * 1025);
    var nb4 = Math.floor(Math.random() * 1025);
    let pokedujour=[nb1,nb2,nb3,nb4];
    for(let i =0;i<pokedujour.length;i++){
        afficherPokemonDuJour(pokedujour[i]);
    }
}

async function afficherPokemonDuJour(id) {
    const removeAccents = (str) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");      
    const url = "http://tyradex.vercel.app/api/v1/pokemon/"+id;
    console.log(url)
    const reponse = await fetch(url);
    const listid = await reponse.json();
    let li =document.createElement("li");
    let nouveauElement=document.createElement("a");
    nouveauElement.href = "pagedracaufeu.html?pokemon="+removeAccents(listid.name.fr.toLowerCase().replace(/\u2640\uFE0F?/g, "f").replace(/\u2642\uFE0F?/g, "m"));
    let imgg=document.createElement("img");
    imgg.src =listid.sprites.regular;
    li.appendChild(nouveauElement);
    nouveauElement.appendChild(imgg);
    let list =document.getElementById("imgg4");
    list.appendChild(li);
}

async function afficherPokemon(pokemon) {
    const removeAccents = (str) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const reponse = await fetch("http://tyradex.vercel.app/api/v1/pokemon");
    const listpoke = await reponse.json();
    const filter = listpoke.filter(p => p.name.fr.toLowerCase().includes(pokemon.toLowerCase()));
    if (filter.length>0){
        let modal = document.getElementById("modal");
        modal.innerHTML = "";
        for(let i=0; i<filter.length;i++) {        
            let nouveauElement = document.createElement("a");
            nouveauElement.className = "dracau";
            nouveauElement.href = "pagedracaufeu.html?pokemon="+removeAccents(filter[i].name.fr.toLowerCase().replace(/\u2640\uFE0F?/g, "f").replace(/\u2642\uFE0F?/g, "m"));

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

    var pokepage=document.getElementById("pokepage");

    if (pokepage){

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
        talent.innerText = infopoke.talents?.[1]?.name || infopoke.talents?.[0]?.name || "pas de talent";
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
       
        cri.src = await recupereCri(infopoke.name.en.toLowerCase().replace(" ","-"));
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

    }
