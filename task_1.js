// Задание #1

const usersURL = 'https://jsonplaceholder.typicode.com/users'

// function createTheFoundation() {  // Сначала подумал так нужно делать)
//   const bodi = document.body
//   const contain = document.createElement('ol')
//   contain.id = 'data-container'
//   const loading = document.createElement('span')
//   loading.id = 'loader'
//   loading.textContent = 'Загрузка...'
//   loading.setAttribute('hidden', '')
//   contain.append(loading)
//   bodi.prepend(contain)
//   return contain
// }
// createTheFoundation()

function createList(text, email) { // Создаем список пользователей
  const list = document.createElement('li')
  const link = document.createElement('a')
  link.href = `mailto:${email}`
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

function getListOfAllUsers(url, selector) { // Функция результирующая
  const usersData = fetch(url, {method: 'GET'})

  loader() // Загрузка ...

  usersData
    .then((response) => {
      if(!response.ok) throw new Error('Ошибка на сервере!')
      return response.json()
    })
    .then((data) => {
      data.forEach(elem => getContainerBySelector(selector).append(createList(elem.name, elem.email)))
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      loader() // Нет загрузки ...
    })
}


getListOfAllUsers(usersURL, '#data-container')