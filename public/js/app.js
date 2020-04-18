const weatherForm = document.querySelector('body form');
const message1 = document.querySelector('.message1');
const message2 = document.querySelector('.message2');

weatherForm.addEventListener('submit', (e) => {
    message1.textContent = 'loading ...';
    e.preventDefault();
    const location = document.querySelector('input').value;
    if(!location) {
        alert("Please enter location");
        return;
    }
    fetch("http://localhost:3000/weather?address="+location).then((res) => {
        res.json().then((res) => {
            if (res.error) {
                message1.textContent = res.error;
            } else {
                message1.textContent = res.location;
                message2.textContent = res.forecast;
            }
        })
    })
})