console.log('Client Side Javascript file loaded');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
});



const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log('clicked');
    if (search.value === undefined) {
        console.log('enter valid value');
    }
    message1.textContent = "Loading.....";

    fetch('http://localhost:3010/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                message2.textContent = data.error;
                message1.textContent = '';
            }
            else {
                // console.log(data);
                message2.textContent = JSON.stringify(data.foreCastData);
                console.log(data.location);
                console.log(data.foreCastData)
                message1.textContent = '';

            }
        })
    })
})