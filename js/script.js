let amount = document.querySelector('#amount')
let amountRes = 0

let popup = document.querySelector('.popup')
let inputBtn = document.querySelector('#checkLogin')

let loginBtn = document.querySelector('#login-btn')
let idTransaction = document.querySelector('#id')
let userLogin = document.querySelector('#login')
let loginError = ''

let popupLogin = document.querySelector('#popup-login')

let worksBtn = document.querySelector('.works-btn')
let popupWorks = document.querySelector('#popup-works')

let valueSum = document.querySelectorAll('.valueNum')

let accordion = document.querySelectorAll('.accordion')

let allCards = document.querySelectorAll('.method-card')
let navMobile = document.querySelector('.nav-mobile')

trId = ''

accordion.forEach((item) => {
  item.addEventListener('click', (e) => {
    let accordionHeader = item.querySelector('.accordion-header')
    let heightItem = item.querySelector('.accordion-body p')
    if (accordionHeader.classList.contains('accordion-active')) {
      accordionHeader.classList.remove('accordion-active')
      item.querySelector('.accordion-body').style.height = null
    } else {
      accordionHeader.classList.add('accordion-active')
      item.querySelector(
        '.accordion-body'
      ).style.height = `${heightItem.clientHeight}px`
    }
  })
})

checkCorrectLogin = (msg) => {
  // document.querySelector('.lodaer-img').style.opacity = 0;
  let img = document.querySelector('.form__login-lodaer')
  if (msg == 'success') {
    img.innerHTML =
      '<img class="form__login-lodaer" src="img/check.png" alt="check"><div class="login-found">Логин найден</div>'
    inputBtn.removeAttribute('disabled')
    inputBtn.style.opacity = 1
    inputBtn.style.cursor = 'pointer'
  } else {
    img.innerHTML =
      '<img class="form__login-lodaer" src="img/error.png" alt="error"><div class="login-notfound">Логин не найден</div>'
    inputBtn.removeAttribute('disabled')
    inputBtn.style.opacity = 0.4
    inputBtn.style.cursor = 'not-allowed'
  }
}

let curKZ = {}

const myHeaders = new Headers()
myHeaders.append('accept', '*/*')

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
}
fetch('https://foreign.foreignpay.ru/rates', requestOptions)
  .then((response) => response.text())
  .then((result) => (curKZ = JSON.parse(result)))
  .catch((error) => console.error(error))

let timeout

let checkLogin = (func) => {
  async function sendData() {
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    let raw = JSON.stringify({
      steamUsername: userLogin.value,
    })

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch('https://foreign.foreignpay.ru/steam/check', requestOptions)
      .then((response) => response.json())
      .then((result) => (trId = result))
      .then(() => checkCorrectLogin(trId.status))
      .then(() => {
        if ('Аккаунт Steam успешно найден' == trId.message) {
          func()
        } else {
          inputBtn.removeAttribute('disabled')
          inputBtn.style.opacity = 1
          inputBtn.style.cursor = 'pointer'
          console.log('Аккаунт не найден!')
        }
      })
      .catch((error) => console.log('error', error))
  }
  sendData()
}

worksBtn.addEventListener('click', () => {
  if (!popupWorks.classList.contains('active')) {
    popupWorks.classList.add('active')
  }
})

loginBtn.addEventListener('click', () => {
  if (!popupLogin.classList.contains('active')) {
    popupLogin.classList.add('active')
  }
})

popupWorks.addEventListener('click', () => {
  popupWorks.classList.remove('active')
})

popup.addEventListener('click', () => {
  popup.classList.remove('active')
})

valueSum.forEach((item) => {
  item.addEventListener('click', () => {
    let sum = document.querySelector('#amount')
    sum.textContent = `${+item.id} ₽`
    amount.value = +item.id
    let allSum = document.querySelectorAll('.all-sum')
    let comSer = document.querySelectorAll('.commission-ser')
    let comBank = document.querySelectorAll('.commission-bank')
    let comeNrollment = document.querySelectorAll('.enrollment-sum')

    allSum.forEach((item) => {
      item.textContent = `${Math.round(amount.value * 1.1)} ₽`
    })

    comeNrollment.forEach((item) => {
      item.textContent = `~ ${Math.round(amount.value)} ₽ / ${Math.round(
        amount.value * curKZ['RUB_KZT'] * 0.98
      )} ₸`
    })

    comSer.forEach((item) => {
      item.textContent = `${Math.round(amount.value * 0)} ₽`
    })

    comBank.forEach((item) => {
      item.textContent = `${Math.round(amount.value * 0.1)} ₽`
    })
  })
})

amount.addEventListener('input', () => {
  let allSum = document.querySelectorAll('.all-sum')
  let comSer = document.querySelectorAll('.commission-ser')
  let comBank = document.querySelectorAll('.commission-bank')
  let comeNrollment = document.querySelectorAll('.enrollment-sum')

  allSum.forEach((item) => {
    item.textContent = `${Math.round(amount.value * 1.1)} ₽`
  })
  console.log(curKZ['RUB_KZT'])

  comeNrollment.forEach((item) => {
    item.textContent = `~ ${Math.round(amount.value)} ₽ / ${Math.round(
      amount.value * curKZ['RUB_KZT'] * 0.98
    )} ₸`
  })

  comSer.forEach((item) => {
    item.textContent = `${Math.round(amount.value * 0)} ₽`
  })

  comBank.forEach((item) => {
    item.textContent = `${Math.round(amount.value * 0.1)} ₽`
  })
})

document.getElementById('myForm').addEventListener('submit', function (e) {
  e.preventDefault()

  if (amount.value >= 100) {
    clearAllInputs = () => {
      amount.value = null
      userLogin.value = null
    }

    function sumbitForm() {
      let myHeaders = new Headers()
      myHeaders.append('accept', 'application/json')
      myHeaders.append('X-Partner-ID', 'b927679d-67cc-42f8-8bdd-b230712b23b7') // id партнёра вставить в ""
      myHeaders.append('Content-Type', 'application/json')

      let amountRes = +amount.value
      let amountResCommission = +Math.floor(amountRes * 1.1)

      let raw = JSON.stringify({
        steamUsername: trId.steamUsername,
        amount: amountResCommission,
        netAmount: Math.floor(amountRes),
        currency: 'RUB',
        transactionId: trId.transactionId,
        successUrl: '',
        isTestPayment: true,
      })

      console.log(`raw ${raw}`)

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }

      console.log(`requestOptions ${requestOptions.headers}`)

      return fetch('https://foreign.foreignpay.ru/steam/pay', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          window.location.href = result.payUrl
          clearAllInputs()
        })
        .catch((error) => console.log('error', error))
    }

    let btn = document.querySelector('#checkLogin')
    document.querySelector('.form__btn-loading').style.opacity = 1
    btn.setAttribute('disabled', '')
    btn.style.opacity = 0.4

    checkLogin(sumbitForm)
  }
})

const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href').substr(1)

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  })
}

// Выбор метода оплаты

allCards.forEach((item) => {
  item.addEventListener('click', () => {
    allCards.forEach((card) => {
      card.classList.remove('card-active')
    })
    item.classList.add('card-active')
  })
})

// Бургер
document.querySelectorAll('.burger').forEach((burger) => {
  burger.addEventListener('click', function () {
    burger.classList.toggle('active')
    navMobile.classList.toggle('active')
  })
})

// slider comments

const swiper = new Swiper('.swiper', {
  // Optional parameters
  slidesPerView: 3,
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },

  //respons
  breakpoints: {
    1: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 30,
    },

    640: {
      slidesPerView: 2,
      spaceBetween: 40,
    },

    920: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
})
