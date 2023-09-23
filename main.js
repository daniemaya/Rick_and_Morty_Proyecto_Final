const container = document.getElementById("container");
const btnTodos = document.getElementById("btn-todos");
const btnMujeres = document.getElementById("btn-mujeres");
const btnHombres = document.getElementById("btn-hombres");
const btnDesconocidas = document.getElementById("btn-desconocidos");
const primPag = document.getElementById("primPag");
const prevBton = document.getElementById("prevBton");
const nextBton = document.getElementById("nextBton");
const ultPag =document.getElementById("ultPag")

let page =1;
let totalPag = 0;

const getCharacters = () =>{
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then (res => res.json())
    .then((data) => {
      renderChararcters(data)
      totalPag = data.info.pages;
    });

};
getCharacters();


const renderChararcters = (data) => {
    //console.log(data)
    container.innerHTML=""
    data.results.forEach(character => {
        //console.log(character)
        container.innerHTML += `<div class="card">
        <img src="${character.image}" alt="">
        <div class="nombre">
        <h2>${character.name}</h2>
        <button class="buton" onclick=verDiscripcion("${character.url}")> Saber más</button>
        </div> </div>`
        
    });

}
const verDiscripcion = (characterUrl) => {
    container.innerHTML = ""
    fetch(characterUrl)
    .then(res => res.json())
    .then((character) => {
     container.innerHTML += `
     <div class="card_detalles">
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="">
    <p>Status: ${character.status}</p>
    <p>Specie: ${character.species}</p>
    <p>Gender: ${character.gender}</p>
    <p>Origin: ${character.origin.name}</p>
    <button class="buton" onclick=getCharacters()> Volver</button>
    </div>`
    }
    ) 
}
const filterCharacters = (filterParam, valueParam) => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}&${filterParam}=${valueParam}`)
    .then((res) => res.json())
    .then((data) => renderChararcters(data));
};
btnTodos.addEventListener("click", () => filterCharacters("gender", ""));
btnMujeres.addEventListener("click", () => filterCharacters("gender", "female"));
btnHombres.addEventListener("click", () => filterCharacters("gender", "male"));
btnDesconocidas.addEventListener("click", () => filterCharacters("gender", "unknown"));

prevBton.addEventListener("click", () =>{
    page -= 1;
    if (page <= 1){
        prevBton.setAttribute("disabled", true);
        prevBton.setAttribute("disabled", true);
    }else{
        nextBton.removeAttribute("disabled", true);

    }
    getCharacters(page);
});

nextBton.addEventListener("click", () => {
    page += 1;
    getCharacters(page);
    if (page > 1){
        prevBton.removeAttribute("disabled", true);
        primPag.removeAttribute("disabled", true);
    }
    if (page >= totalPag){
        nextBton.setAttribute("disabled", true);
    }
});
primPag.addEventListener("click", () => {
    page = 1;
    getCharacters(page);
    if(page >= 1){
        nextBton.removeAttribute("disabled", true);
        ultPag.removeAttribute("disabled", true);
    }
});
ultPag.addEventListener("click", () => {
    page = totalPag;
    getCharacters(page);
    if (page >= 1) {
        prevBton.removeAttribute("disabled", true);
        primPag.removeAttribute("disabled", true);
    }
    if (page >= totalPag){
        ultPag.setAttribute("disabled", true);
        nextBton.setAttribute("disabled", true);
    }
});


 
  

