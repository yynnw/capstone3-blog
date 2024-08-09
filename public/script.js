

document.addEventListener('DOMContentLoaded', () => {
const page = document.querySelector('title').innerText;
if (page === 'New') {
document.querySelector('#new').classList.add("active");
document.querySelector('#home').classList.remove("active");
} else if (page === 'Home Page') {
    document.querySelector('#new').classList.remove("active");
    document.querySelector('#home').classList.add("active");   
}

})
