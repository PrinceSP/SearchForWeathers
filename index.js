document.querySelector('form').addEventListener('submit',getCity)

function getCity(e){
  e.preventDefault()
  const cities = document.querySelector('input')
  apiHolder(cities.value)
  cities.value = ''
}

function apiHolder(city){
  const apiKey = `8f5a73fd3b0e7a36a6127887c4ee73be`
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

  apiCall(apiUrl,results=>{
    const datas = JSON.parse(results)
    getDatas(datas)
  },()=>{
    console.log('error');
  })
}

function apiCall(url,res,rej){
  let datas = new XMLHttpRequest()

  datas.onreadystatechange = function (){
    if (datas.readyState === 4) {
      if (datas.status === 200) {
        res(datas.response)
      }else{
        rej()
      }
    }
  }

  datas.open('get',url)
  datas.send()
}

function getDatas(datas){
  console.log(datas);
  const temp = document.querySelector('h1')
  const cityName = document.querySelector('h2')
  const spans = document.querySelectorAll('span')
  const icon = `http://openweathermap.org/img/wn/${datas.weather[0].icon}.png`

  document.querySelector('img').src = icon
  document.querySelector('.cloud>p').textContent = datas.weather[0].main

  spans.forEach((item,i,arr)=>{
    arr[0].textContent = `${datas.clouds.all}%`
    arr[1].textContent = `${datas.main.humidity}%`
    arr[2].textContent = `${datas.wind.speed}km/h`
    arr[3].textContent = `${datas.snow['1h']}mm/h`
  })

  const kelvinToCelcius = Math.floor(datas.main.temp-273.15)
  temp.textContent = `${kelvinToCelcius}º`
  cityName.textContent = `${datas.name}`
}
