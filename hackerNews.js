

async function getJsonFromWeb  (url ) {
	let response = await fetch(url);
	let json = await response.json();
	console.log(json);
	return json;
}

const stories_url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const comment_url = 'https://hacker-news.firebaseio.com/v0/item/'; 

document.onload = fetchStories();

function fetchStories() {
	
	getJsonFromWeb(stories_url).then(
		ids => {
			for (id of ids) {
				addStorieIds( id );
			}
		}
	).catch(
		console.log(new Error('error getting stories'))
	)
}

function addStorieIds (txt) { 
	
	var newDiv = document.createElement("div"); 
	
	var newContent = document.createTextNode(txt); 
	
	newDiv.appendChild(newContent);  
	newDiv.addEventListener("click", displayComment);
	
	var currentDiv = document.getElementById("stories"); 
	currentDiv.appendChild(newDiv); 
  }

  function displayComment (e) {
		let url = comment_url + e.target.innerHTML + '.json';
		
		getJsonFromWeb(url).then(
			cmt => {
				console.log(cmt);
				for (key in cmt) {
					console.log(key,  cmt[key]);
					let value = typeof cmt[key] ==='object' ? cmt[key].join(',') : cmt[key];
					document.querySelector('#' + key).innerHTML = value;
				}
				document.querySelector('#comment').style.display = 'flex';
			}
		).catch(
			console.log(new Error('error getting stories'))
		)
  }

  function closeComment (e) {
	document.querySelector('#comment').style.display = 'none';
  }

  