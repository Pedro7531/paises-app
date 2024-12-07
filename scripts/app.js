"use strict";
const urlAPI = "https://restcountries.com/v3.1/all";

let paises = [];

// Exemplo de classe
class Pais {
    constructor(flag,
        name,
        region,
        population,
        startOfWeek,
        flags) {
            this.flag = flag;
            this.name = name;
            this.region = region;
            this.population = population;
            this.startOfWeek = startOfWeek;
            this.flags = flags;
        }
}

const criarElementoPais = (pais) => {
    const minhaDiv = document.createElement('div');
    minhaDiv.classList.add("component-pais");

    minhaDiv.innerHTML = `
        ${pais.flag} -
        <label>${pais.name}</label> - 
        <label>${pais.region}</label>
    `;

    return minhaDiv;
}

function processarDados(lista) {
    const divDados = document.querySelector("#dados");

    // Limpa os dados existentes antes de adicionar novos
    divDados.innerHTML = "";

    const ul = document.createElement("ul"); // Cria lista

    for (const pais of lista) {
        const li = document.createElement("li"); // Cria item da lista

        const obj = {
            flag: pais.flag,
            name: pais.name.common,
            region: pais.region,
            population: pais.population,
            startOfWeek: pais.startOfWeek,
            flagPNG: pais.flags.png
        };

        const componentePais = criarElementoPais(obj);

        li.appendChild(componentePais);

        ul.appendChild(li); // Adiciona item à lista
    }
    divDados.appendChild(ul); // Adiciona lista à div
}

function carregarDados() {
    fetch(urlAPI) // retorna uma promisse (asincrona)
        .then((result) => {
            console.log(result);
            return result.json(); // retorna outra promessa
        })
        .then((lista) => {
            console.log(lista);
            //ordenação da lista
            lista.sort((a,b) => (a.name.common > b.name.common ? 1 : -1));

            paises = lista;

            processarDados(lista);
        })
        .catch((err) => {
            console.error(err);
        });
}

function pesquisaHandler(evt) {
    evt.preventDefault();
    const termoPesquisa = document.querySelector("#pesquisa").value.trim().toLowerCase();

    // Filtra a lista de países com base no termo de pesquisa
    const paisesFiltrados = paises.filter((pais) =>
        pais.name.common.toLowerCase().includes(termoPesquisa)
    );

    // Processa os dados filtrados para exibir
    processarDados(paisesFiltrados);

}

function app() {
    const formulario = document.querySelector("form");
    formulario.addEventListener("submit", pesquisaHandler);

    carregarDados();
}

//chamando a função
app();