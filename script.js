const url =  "https://newsdata.io/api/1/news?apikey=pub_138722b4baa33d88a74e6a0587cece5ce4939&language=En&country=in&category=business,sports,science,entertainment";

async function getapi(url) {
  const response = await fetch(url);
  const { results } = await response.json();
  return results;
}


let section = document.querySelector(".news-section");
let footer = document.getElementsByTagName('footer')[0]

async function show() {
  let loading = true;
  if (loading) {
    section.innerHTML = "Loading...";
    footer.style.display = 'none';
  }

  const data = await getapi(url);
  section.innerHTML = "";

  data.forEach((item) => {
    let tab = `
      
      <div class="news-container" onclick="window.open('${item.link}','_blank')">
      <img src="${item.image_url}" alt="">
      <div class="news-text">
      <h3 class="news-title">${item.title}</h3>
      <p class="news-description">${limit(item.description, 200)}...</p>
      </div>
      </div>
      `;
      
      // <p class="news-description">${item.description}...</p>
    section.innerHTML += tab;
    footer.style.display = "";
  });
}
show();



function limit (string = '', limit = 0) {  
  if (string==null) {
    return "Read more";
  }
  return string.substring(0, limit)
}

function search() {
  let input = document.getElementById('search-input');
  let filter = input.value.toUpperCase();
  let section = document.getElementsByClassName('news-section')[0];
  let news = section.getElementsByClassName('news-container');

  for(let i=0; i<news.length; i++) {
    let title = news[i].getElementsByTagName('h3')[0];
    if (title.innerHTML.toUpperCase().indexOf(filter) > -1) {
      news[i].style.display = "";
      footer.style.display = "";
    } else {
      news[i].style.display = "none";
      footer.style.display = "none";
    }
  }
}
