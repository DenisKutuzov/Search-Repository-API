const url = 'https://api.github.com/search/repositories?q='
const a = '&sort=stars&order=desc&per_page=10'

let form = document.getElementById('form-search')
form.addEventListener('submit', async (event) => {
  // добавляем loader
  document.getElementById('loader-id').classList.add('loader')

  document.getElementById('repositorys-id').innerHTML = ''
  event.preventDefault()
  console.log(Object.fromEntries(new FormData(event.target)))
  const inputValue = Object.fromEntries(new FormData(event.target))

  let apiUrl = url + inputValue.name + a
  console.log(apiUrl)
  const response = await fetch(apiUrl)

  console.log(response)

  if (response.ok) {
    const data = await response.json()

    const arr = data.items

    document.getElementById('loader-id').classList.toggle('loader')
    // Проверка на пустой ответ
    if (arr.length == 0) {
      animFrog()
      document.getElementById('repositorys-id').innerHTML =
        '<h3>Ничего не найдено</h3>'
    }

    // Перебираем элементы и вывводим 10 репозиториев
    arr.forEach((element) => {
      createRepositorysSearch(element)
    })

    console.log(data)
  } else {
    animFrog()

    document.getElementById('loader-id').classList.toggle('loader')
    document.getElementById('repositorys-id').innerHTML =
      '<h3>Ничего не найдено</h3>'
  }
})

function createRepositorysSearch(element) {
  const divElement = document.createElement('div')
  divElement.classList.add('repositorys__list')
  document.getElementById('repositorys-id').append(divElement)

  const linkElement = document.createElement('a')
  linkElement.classList.add('repository__link')
  linkElement.setAttribute('href', `${element.html_url}`)
  divElement.append(linkElement)
  linkElement.innerHTML = `${element.full_name}`

  const bodyElement = document.createElement('p')
  bodyElement.classList.add('repository__text')
  // console.log(element.description)
  console.log(element.description.slice(0, 150) + '...')
  bodyElement.innerHTML = `${
    element.description.length > 150
      ? element.description.slice(0, 197) + '...'
      : element.description
  }`
  divElement.append(bodyElement)

  const languageElement = document.createElement('p')
  languageElement.classList.add('repository__text')
  languageElement.innerHTML = `${
    element.language !== null ? element.language : ''
  }`
  divElement.append(languageElement)
}

// Анимация картинки

function animFrog() {
  let frog = document.querySelector('.frog')
  frog.classList.add('frog_vis')
  setTimeout(() => {
    frog.classList.remove('frog_vis')
  }, 2500)
}

// Проверка на пустой input
btn.disabled = true
function ctrlButton() {
  btn.disabled = this.value.trim().length === 0
}

input.addEventListener('input', ctrlButton, false)
ctrlButton.call(input)


// посстоянно печатающийся инпут

let i = 0
let b = ''
let txt = 'Enter repository name' 
let speed = 150

typeWriter()
function typeWriter() {
  if (i < txt.length) {
    b += txt.charAt(i)
    input.setAttribute('placeholder', b)
    i++
    setTimeout(typeWriter, speed)
  } else {
    i = 0
    b = ''
    setTimeout(typeWriter, 2000)
  }
}

