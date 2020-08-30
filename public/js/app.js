const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adress = search.value;
    if (!adress) return (msgOne.textContent = 'Please input adress');
    msgOne.textContent = 'Loading...';
    fetch(`http://localhost:3000/weather?adress=${adress}`).then((res) => {
        res.json().then((data) => {
            if (data.error) return (msgOne.textContent = data.error);
            msgOne.textContent = data.location + ' ' + data.forecast;
        });
    });
});
