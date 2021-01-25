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

(function getDates(){
  const dates = document.querySelector('.date')
  let rightDate = new Date()
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const s = rightDate.getTime()
  const m = Math.floor(Math.round(s/1000)/60)%60
  const h = rightDate.getHours()
  const d = days[s/rightDate]
  const d_no = rightDate.getDate()
  const sdf=rightDate.getFullYear().toString()
  dates.textContent = `${h}:${m} - ${d}, ${d_no} ${months[rightDate.getMonth()]} '${sdf.slice(2)}`
  console.log(h);
  setTimeout(getDates,1000)
})()

function getDatas(datas){
  console.log(datas);
  const temp = document.querySelector('h1')
  const cityName = document.querySelector('h2')
  const spans = document.querySelectorAll('span')
  const icon = `http://openweathermap.org/img/wn/${datas.weather[0].icon}.png`
  const img = document.querySelector('img')
  img.src = `${icon}`
  document.querySelector('.cloud>p').textContent = datas.weather[0].main

  spans.forEach((item,i,arr)=>{
    arr[0].textContent = `${datas.clouds.all}%`
    arr[1].textContent = `${datas.main.humidity}%`
    arr[2].textContent = `${datas.wind.speed}km/h`

    const k = Object.keys(datas)
    k.map(j=>{
      rainOrSnow(j,datas)
    })
  })
  const kelvinToCelcius = Math.floor(datas.main.temp-273.15)
  temp.textContent = `${kelvinToCelcius}º`
  cityName.textContent = `${datas.name}`
}

function rainOrSnow(paragraph,datas){
  const p = document.querySelector('.rain_snow')
  const rn = document.createElement('span')
  if (paragraph.includes('rain')) {
    p.textContent = 'Rain'
    rn.textContent = `${datas.rain['1h']}mm/h`
    p.append(rn)
  } else if (paragraph.includes('snow')) {
    p.textContent = 'Snow'
    rn.textContent = `${datas.snow['1h']}mm/h`
    p.append(rn)
  }
}

(function selectedCity(){
  const cities = document.querySelectorAll('.cities')
  cities.forEach(item=>{
    item.style.cursor = 'pointer'
    item.addEventListener('click',function(){
      switch (this.textContent) {
        case 'Birmingham':
          console.log(true);
          apiHolder(this.textContent)
          break;
        case 'Manchester':
          apiHolder(this.textContent)
          break;
        case 'New York':
          apiHolder(this.textContent)
          break;
        case 'California':
          apiHolder(this.textContent)
          break;
      }
    })
  })
})()
