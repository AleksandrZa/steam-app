function generateRandomNumber() {
    return Math.floor(Math.random() * 31) + 30;
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function updateRandomNumber() {
    var randomNumber = generateRandomNumber();
    setCookie('randomNumber', randomNumber, 1);

    document.querySelector('#online').textContent = randomNumber;

    setTimeout(updateRandomNumber, 20000);
}

function displayRandomNumber() {
    var savedNumber = getCookie('randomNumber');
    var randomNumber;

    if (savedNumber) {
        randomNumber = parseInt(savedNumber);
    } else {
        randomNumber = generateRandomNumber();
        setCookie('randomNumber', randomNumber, 1);
    }

    document.querySelector('#online').textContent = randomNumber;

    setTimeout(updateRandomNumber, 20000);
}

displayRandomNumber();