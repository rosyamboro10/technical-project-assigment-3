const api_key = 'api_key=9a6f9ee42155033cead1a611870663db';
const base_url ='https://api.themoviedb.org/3';
const api_url = base_url + '/discover/movie?sort_by=popularity.desc&'
+api_key;

const img_url = 'https://image.tmdb.org/t/p/w300';
const search_url = base_url + '/search/movie?' + api_key;



const main = document.getElementById('main');


const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(api_url);

function getMovies(url){
    fetch(url).then(response => response.json()).then(data => {

        console.log(data.results)
        showMovies(data.results);
    })
}

function showMovies(data){
    main.innerHTML='';



    data.forEach(movie => {
        const {title, poster_path, release_date, vote_average, overview} = movie;
        const movieE1 = document.createElement('div');
        movieE1.classList.add('movie');
        movieE1.innerHTML = `
            <img class="img" src="${img_url+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            `

        


        main.appendChild(movieE1);
    })

}


function getColor(vote){
    if(vote >= 8){
        return 'green'
    } else if(vote >= 5){
        return "orange"
    } else {
        return 'red'
    }
}


form.addEventListener(`submit`, (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(search_url+'&query='+searchTerm)
    } else{
        getMovies(api_url);
    }

})