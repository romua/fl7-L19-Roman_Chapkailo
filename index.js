'use strict';
let page = 1;
let item = 0;
let script = document.createElement("script");
script.setAttribute('src', `http://marsweather.ingenology.com/v1/archive/?page=${page}&format=jsonp&callback=parse`);
script.setAttribute('id', 'jsonp');
document.getElementsByTagName('body')[0].appendChild(script);
document.getElementsByTagName('li')[0].innerText = `loading ... `;
document.getElementsByTagName('li')[1].innerText = `loading ... `;
document.getElementsByTagName('li')[2].innerText = `loading ... `;
document.getElementById('more_info').style.visibility= 'hidden';
function parse(data) {
    document.getElementById('more_info').style.visibility= 'hidden';
    document.getElementById('more_info').innerText = JSON.stringify(data.results[item], null, 2);
    console.log(item);

    document.getElementsByTagName('li')[0].innerText = `Temperature: ${0.5*(data.results[0].min_temp+data.results[0].max_temp)} °C`;
    document.getElementsByTagName('li')[1].innerText = `Wind speed: ${data.results[0].wind_speed}`;
    document.getElementsByTagName('li')[2].innerText = `Wind direction: ${data.results[0].wind_direction}`;
};

function parsel(data) {
    document.getElementById('more_info').style.visibility= 'hidden';
    document.getElementById('more_info').innerText = JSON.stringify(data.results[item], null, 2);
    if(item === 0 && page === 1 ) {
        document.getElementById('top').innerText = `the weather on mars is currently(latest update)`
    } else {
        document.getElementById('top').innerText = `the weather on mars on ${data.results[item].terrestrial_date} was:`
    }
    document.getElementsByTagName('li')[0].innerText = `Temperature: ${0.5*(data.results[item].min_temp+data.results[item].max_temp) }°C`;
    document.getElementsByTagName('li')[1].innerText = `Wind speed: ${data.results[item].wind_speed}`;
    document.getElementsByTagName('li')[2].innerText = `Wind direction: ${data.results[item].wind_direction}`;

};

let prev = document.getElementById('pre');
prev.addEventListener('click', (e)=>{
    e.preventDefault();
    item++;
    if(item === 10) {
        page ++;
        item = 0;
    }
    console.log(` page ${page} item: ${item}`);
    document.body.removeChild(document.getElementById('jsonp'));

    document.getElementsByTagName('li')[0].innerText = `loading ... `;
    document.getElementsByTagName('li')[1].innerText = `loading ... `;
    document.getElementsByTagName('li')[2].innerText = `loading ... `;
    let script = document.createElement("script");
    document.getElementsByTagName('body')[0].appendChild(script);
    script.setAttribute("src", `http://marsweather.ingenology.com/v1/archive/?page=${page}&format=jsonp&callback=parsel`);
    script.setAttribute('id', 'jsonp');
});


let next = document.getElementById('next');
next.addEventListener('click', (e)=>{
    e.preventDefault();
    item--;
    if(item === -1) {
        item = 9;
        page --;
        if(page === 0) {
            page = 1;
            console.log('last page');
        }
    }
    if(item === 0 && page === 1 ) {
        console.log('current data');

    }
    console.log(` page ${page} item: ${item}`);
    document.body.removeChild(document.getElementById('jsonp'));
    document.getElementsByTagName('li')[0].innerText = `loading ... `;
    document.getElementsByTagName('li')[1].innerText = `loading ... `;
    document.getElementsByTagName('li')[2].innerText = `loading ... `;
    let script = document.createElement("script");
    document.getElementsByTagName('body')[0].appendChild(script);
    script.setAttribute("src", `http://marsweather.ingenology.com/v1/archive/?page=${page}&format=jsonp&callback=parsel`);
    script.setAttribute('id', 'jsonp');
});

let button = document.getElementById('get_more_info');
button.addEventListener('click', ()=>{
    console.log('q12312');
    document.getElementById('more_info').style.visibility= 'visible';
});
