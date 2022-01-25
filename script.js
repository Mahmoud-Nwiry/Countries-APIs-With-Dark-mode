
let isDark = localStorage.getItem('dark-mode', true);

if(isDark == 'true'){
    document.querySelector(".toggle p").textContent = 'Light Mode';
    document.body.classList.add('dark');
}
else {
    document.body.classList.remove('dark');
}

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        data.map(item => createElements(item))
    })

const controller = new AbortController();
const single = controller.signal;

const createElements = (data) => {

    let box = document.createElement('div');
    box.classList.add('country-box');

    let img = document.createElement('img');
    img.src = data.flags.png;
    box.append(img);

    let details = document.createElement('div');
    details.classList.add('details');
    
    let title = document.createElement('h4');
    title.classList.add('title');
    title.textContent = data.name.common;
    details.append(title)

    function addComma(){
        return data.population.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    let population = document.createElement('span');
    population.classList.add('item');
    let populationTitle = document.createElement('h5');
    let populationText = document.createElement('span');
    populationTitle.textContent = 'Population: ';
    populationText.textContent = addComma();
    population.append(populationTitle);
    population.append(populationText);
    details.append(population)

    let region = document.createElement('span');
    region.classList.add('item');
    let regionTitle = document.createElement('h5');
    let regionText = document.createElement('span');
    regionTitle.textContent = 'Region: ';
    regionText.textContent = data.region;
    region.append(regionTitle);
    region.append(regionText);
    details.append(region)

    let capital = document.createElement('span');
    capital.classList.add('item');
    let capitalTitle = document.createElement('h5');
    let capitalText = document.createElement('span');
    capitalTitle.textContent = "Capital: ";
    capitalText.textContent = data.capital;
    capital.append(capitalTitle);
    capital.append(capitalText);
    details.append(capital)

    box.append(details)
    document.querySelector('.content').append(box)
}

let toggle = document.querySelector('.toggle');

toggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark')
    if(document.body.classList.contains('dark')){
        toggle.querySelector("p").textContent = 'Light Mode' 
        localStorage.setItem('dark-mode', true)
    }
    else{
        toggle.querySelector("p").textContent = 'Dark Mode' ;
        localStorage.setItem('dark-mode', false)
    }
})


let search = document.querySelector('.search');
search.addEventListener('input', ()=>{
    if(search.value !== ''){
        if(search.value.length > 0){
            controller.abort();
        }
        fetch(`https://restcountries.com/v3.1/name/${search.value}`, {single})
        .then(response => response.json())
        .then(data => {
            document.querySelector('.content').innerHTML = ''
            console.log(data);
            data.map(item => createElements(item))
        })
        .catch(err => console.log(err))
    }
    else{
        fetch('https://restcountries.com/v3.1/all', {single})
        .then(response => response.json())
        .then(data => {
            document.querySelector('.content').innerHTML = ''
            data.map(item => createElements(item))
        })
    }
})


const selectBox = document.querySelector('.inputs select');

selectBox.addEventListener('change', ()=>{
    if(selectBox.value === 'all'){
        fetch('https://restcountries.com/v3.1/all', {single})
        .then(response => response.json())
        .then(data => {
            document.querySelector('.content').innerHTML = ''
            data.map(item => createElements(item))
        })
    }
    else{
        fetch(`https://restcountries.com/v3.1/region/${selectBox.value}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('.content').innerHTML = ''
                console.log(data);
                data.map(item => createElements(item))
            })
            .catch(err => console.log(err))
    }
})