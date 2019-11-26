//Actions that happen when the site is loaded
window.onload = (e) => {
    let listID = "ldv9727";
    let items = localStorage.getItem(listID);
    items = JSON.parse(items); 
    if(items != null){load(items); }

    //If any of the input options are selected
    document.querySelector("#submit").onclick = searching;
    document.querySelector("#randomButton").onclick = randomCountry;
    document.querySelector("#nAmerica").onclick = placingNA;
    document.querySelector("#sAmerica").onclick = placingSA;
    document.querySelector("#europe").onclick = placingE;
    document.querySelector("#africa").onclick = placingAF;
    document.querySelector("#oceanic").onclick = placingO;
    document.querySelector("#asia").onclick = placingAS;

    //If any of the dropdown menu options are clicked
    if(document.querySelector("#one") != null){
        document.querySelector("#one").onclick = dropSearch;
    }
    if(document.querySelector("#two") != null){
        document.querySelector("#two").onclick = dropSearch;
    }
    if(document.querySelector("#three") != null){
        document.querySelector("#three").onclick = dropSearch;
    }
    if(document.querySelector("#four") != null){
        document.querySelector("#four").onclick = dropSearch;
    }
    if(document.querySelector("#five") != null){
        document.querySelector("#five").onclick = dropSearch;
    }
};

let countryShown = "";

//To create teh URL and then use said URL to find the desired data
function searching(){
    const REST_URL = "https://restcountries.eu/rest/v2/name/";

    let url = REST_URL;

    let country = document.querySelector("#searchterm").value;
    countryShown = country;

    country = country.trim();

    country = encodeURIComponent(country);

    if(country.length < 1)return;

    url += country;

    document.querySelector("#status").innerHTML = "<b>Searching for '" + countryShown + "'</b>";
    getData(url);
}

//To get and manipulate the data from the api server
function getData(url){
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    xhr.open("GET",url);
    xhr.send();
}

//To load all of the JSON file's data into my website. 
function dataLoaded(e){
    let xhr = e.target;

    let obj = JSON.parse(xhr.responseText);
    
    if(obj.status == 404){
        document.querySelector("#status").innerHTML = "<b>No results found for '" + countryShown + "'</b>";
        return;
    }

    document.querySelector("#status").innerHTML = "<b>Country Found!</b>";

    //Moving the data into the website
    //The Language
    document.querySelector("#languages").innerHTML = "";

    //The Boardering Countries
    document.querySelector("#boarders").innerHTML = "";

    //Name of Country
    document.querySelector(".name h1").innerHTML = obj[0].name;

    //Capital of the Country
    document.querySelector(".name h3").innerHTML = obj[0].capital;

    //Their Flag
    document.querySelector(".flag img").src = obj[0].flag;

    //Their Population
    document.querySelector("#population").innerHTML = "<b>Population: </b>" + obj[0].population;

    //The Region
    document.querySelector("#region").innerHTML = "<b>Region: </b>" + obj[0].region;

    //A loop to assign languages to the languages list
    for(let i = 0; i < obj[0].languages.length; i++){
        let lang = document.createElement("li");
        let text = document.createTextNode(obj[0].languages[i].name);
        lang.appendChild(text);
        document.querySelector("#languages").appendChild(lang);
    }

    //A loop to assign boadering countries to its respective list
    for(let i = 0; i < obj[0].borders.length; i++){
        let bord = document.createElement("li");
        let text = document.createTextNode(obj[0].borders[i]);
        bord.appendChild(text);
        document.querySelector("#boarders").appendChild(bord);
    }

    //Saving the data
    let listID = "ldv9727";
    let items = obj;
    items = JSON.stringify(items);
    localStorage.setItem(listID,items);
}

//To tell the user if an error has occured
function dataError(e){
    console.log("An error occured");
}

//To randomly select a country and display its information
function randomCountry(){
    //A smaller list of many countries from around the world
    const randomList = [
        "USA",
        "Canada",
        "Mexico",
        "Colombia",
        "Brazil",
        "Argentina",
        "Chile",
        "Peru",
        "Venezuela",
        "Cuba",
        "Ecuador",
        "Australia",
        "New Zealand",
        "China",
        "Japan",
        "Mongolia",
        "Madagascar",
        "Russia",
        "Poland",
        "Germany",
        "Netherlands",
        "Luxembourg",
        "Belgium",
        "France",
        "Italy",
        "Spain",
        "Austria",
        "United Kingdom",
        "Norway",
        "Sweden",
        "Finland",
        "Iceland",
        "Portugal",
        "Romania",
        "Switzerland",
        "Egypt",
        "Nigeria",
        "South Africa",
        "Algeria",
        "Morocco",
        "Ethiopia",
        "Ghana",
        "Kenya",
        "Tanzania",
        "Bhārat"
    ];
    const REST_URL = "https://restcountries.eu/rest/v2/name/";

    let url = REST_URL;

    let rValue = Math.floor((Math.random() * 45));
    let country = randomList[rValue];
    countryShown = country;

    country = country.trim();

    country = encodeURIComponent(country);

    if(country.length < 1)return;

    url += country;
    document.querySelector("#status").innerHTML = "<b>Searching for '" + countryShown + "'</b>";
    getData(url);
}

//To load a pre-existing country and display its information
function load(item){
    obj = item;
    document.querySelector("#status").innerHTML = "";

    //Moving the data into the website
    //To set the language
    document.querySelector("#languages").innerHTML = "";

    //To set the Boardering countries
    document.querySelector("#boarders").innerHTML = "";

    //To set the name of the country
    document.querySelector(".name h1").innerHTML = obj[0].name;

    //To set the capital of the Country
    document.querySelector(".name h3").innerHTML = obj[0].capital;

    //To set the flag
    document.querySelector(".flag img").src = obj[0].flag;

    //To set the population
    document.querySelector("#population").innerHTML = "<b>Population: </b>" + obj[0].population;

    //To set the region
    document.querySelector("#region").innerHTML = "<b>Region: </b>" + obj[0].region;

    //A loop to set the languages
    for(let i = 0; i < obj[0].languages.length; i++){
        let lang = document.createElement("li");
        let text = document.createTextNode(obj[0].languages[i].name);
        lang.appendChild(text);
        document.querySelector("#languages").appendChild(lang);
    }

    //A loop to set the boardering countries
    for(let i = 0; i < obj[0].borders.length; i++){
        let bord = document.createElement("li");
        let text = document.createTextNode(obj[0].borders[i]);
        bord.appendChild(text);
        document.querySelector("#boarders").appendChild(bord);
    }

    //Saving the data
    let listID = "ldv9727";
    let items = obj;
    items = JSON.stringify(items);
    localStorage.setItem(listID,items);
}

//The next five functions are made to give the users options
//based on continent.
function placingNA(){
    document.querySelector("#one").innerHTML = "USA";

    document.querySelector("#two").innerHTML = "Canada";

    document.querySelector("#three").innerHTML = "Mexico";

    document.querySelector("#four").innerHTML = "Cuba";
    
    document.querySelector("#five").innerHTML = "Guatemala";
}
function placingSA(){
    document.querySelector("#one").innerHTML = "Brazil";

    document.querySelector("#two").innerHTML = "Peru";

    document.querySelector("#three").innerHTML = "Colombia";

    document.querySelector("#four").innerHTML = "Argentina";

    document.querySelector("#five").innerHTML = "Venezuela";
}
function placingE(){
    document.querySelector("#one").innerHTML = "France";

    document.querySelector("#two").innerHTML = "United Kingdom";

    document.querySelector("#three").innerHTML = "Spain";

    document.querySelector("#four").innerHTML = "Netherlands";

    document.querySelector("#five").innerHTML = "Germany";
}
function placingO(){
    document.querySelector("#one").innerHTML = "New Zealand";

    document.querySelector("#two").innerHTML = "Australia";

    document.querySelector("#three").innerHTML = "Polynesia";

    document.querySelector("#four").innerHTML = "Fiji";

    document.querySelector("#five").innerHTML = "Indonesia";
}
function placingAF(){
    document.querySelector("#one").innerHTML = "Egypt";

    document.querySelector("#two").innerHTML = "Ghana";

    document.querySelector("#three").innerHTML = "South Africa";

    document.querySelector("#four").innerHTML = "Senegal";

    document.querySelector("#five").innerHTML = "Kenya";
}
function placingAS(){
    document.querySelector("#one").innerHTML = "China";

    document.querySelector("#two").innerHTML = "Japan";

    document.querySelector("#three").innerHTML = "Mongolia";

    document.querySelector("#four").innerHTML = "Nepal";

    document.querySelector("#five").innerHTML = "Russia";
}

//This will help the dropdown menu work when desired
function dropSearch(e){
    const REST_URL = "https://restcountries.eu/rest/v2/name/";

    let url = REST_URL;

    let country = e.srcElement.innerHTML;
    countryShown = country;

    country = encodeURIComponent(country);

    if(country.length < 1)return;

    url += country;
    document.querySelector("#status").innerHTML = "<b>Searching for '" + countryShown + "'</b>";
    getData(url);
}