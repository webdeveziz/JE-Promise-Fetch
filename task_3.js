// Задание #3
const photosURL = 'https://jsonplaceholder.typicode.com/photos'

function createList(link, text) { // Create list
  const list = document.createElement('li')
  list.classList.add('photo-item')
  const image = document.createElement('img')
  image.classList.add('photo-item__image')
  image.src = link
  const title = document.createElement('h3')
  title.classList.add('photo-item__title')
  title.textContent = text
  list.append(image, title)
  return list
}

function getContainerBySelector(selector) { // Функция container
  const container = document.querySelector(selector)
  if(container) return container
  return document.body
}

function loader() { // Функция loading...
  const loaderHtml = document.querySelector('#loader')
  const isHidden = loaderHtml.hasAttribute('hidden')
  if(isHidden) loaderHtml.removeAttribute('hidden')
  else loaderHtml.setAttribute('hidden', '')
}

function getFastestLoadedPhoto(ids, urlPhoto) {
  const promisesArr = ids.map(el => fetch(`${urlPhoto}/${el}`))

  loader() // Loading...

  Promise.race(promisesArr)
    .then(response => response.json())
    .then(({url, title}) => {
      getContainerBySelector('#data-container').append(createList(url, title))
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      loader() // Нет loading ...
    })
}

getFastestLoadedPhoto([60, 12, 55], photosURL)