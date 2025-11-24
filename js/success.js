// setTimeout(function(){
//     window.location.href = 'https://steambot.org/';
//   }, 70000);

let btnLike = document.querySelector('#btn-like')
let btnDike = document.querySelector('#btn-dislike')

btnLike.addEventListener('click', () => {
    if (!document.querySelector('#popup-like').classList.contains('active')) {
        document.querySelector('#popup-like').classList.add('active')
        setTimeout(function(){
            window.location.href = ''; //ссылка на страницу с отзывами
        }, 3000);
    }
})

btnDike.addEventListener('click', () => {
    if (!document.querySelector('#popup-dislike').classList.contains('active')) {
        document.querySelector('#popup-dislike').classList.add('active')
    }
})

document.querySelector('#popup-dislike').addEventListener('click', () => {
    document.querySelector('#popup-dislike').classList.remove('active')
})

document.querySelector('#popup-like').addEventListener('click', () => {
    document.querySelector('#popup-like').classList.remove('active')
})