// Задание #2
const usersURL = 'https://jsonplaceholder.typicode.com/users'

function createList(text) { // Создаем список пользователей
  const list = document.createElement('li')
  const link = document.createElement('a')
  link.href = '#'
  link.textContent = text
  list.append(link)
  return list
}

function getContainerBySelector(selector) { // Функция контейнера
  const container = document.querySelector(selector)
  if(container) return container
  return document.body
}

function loader() { // Функция загрузки ...
  const loaderHtml = document.querySelector('#loader')
  const isHidden = loaderHtml.hasAttribute('hidden')
  if(isHidden) loaderHtml.removeAttribute('hidden')
  else loaderHtml.setAttribute('hidden', '')
}

function getUsersByIds(ids, url) {
  const users = ids.map(el => fetch(`${url}/${el}`))

  loader() // Загрузка ...

  Promise.all(users)
    .then(response => Promise.all(response.map(el => el.json())))
    .then(data => {
      data.forEach(elem => getContainerBySelector('#data-container').append(createList(elem.name)))
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      loader() // Нет загрузки ...
    })
}

getUsersByIds([5, 6, 2, 1], usersURL)

