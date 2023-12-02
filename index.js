
window.acessiBrasil = window.acessiBrasil || {};


let elementNames = document.querySelectorAll('h1, h2, h3, h4, h5, p, span, a, label, strong, b, em, u, s, blockquote, abbr, cite, code, pre, sub, sup, li');
let sizeSaved = getItemFromLocalStorageWithExpiry("font-size");
let elementValues = []; 

  elementNames.forEach(function(txtTag) {
    // Armazenar o tamanho inicial como um atributo de dados
    if(!elementValues.some(objeto => objeto.key === txtTag.tagName)) {

      elementValues.push({
        key: txtTag.tagName,
        value: parseInt(window.getComputedStyle(txtTag).fontSize)
      })

    }
  });


window.acessiBrasil.init = function init() {

  createIcon();
  changePercentage(sizeSaved);

}


  let currentPercentage = 0;


  function changePercentage(amount) {

    if(amount != null) {

      currentPercentage += amount;

      if (currentPercentage < -50) {
        currentPercentage = -50;
      } else if (currentPercentage > 500) {
        currentPercentage = 500;
      }


      const percentageElement = document.getElementById('percentage');
      percentageElement.textContent = currentPercentage + '%';

        elementNames.forEach(function(txtTag) {
  
          const attName = elementValues.find(objeto => objeto.key === txtTag.tagName);
          var initialSize = parseInt(attName.value); 
    
          var newSize = initialSize + (initialSize * currentPercentage /100);
          txtTag.style.fontSize = newSize + 'px';
    
        });
    
        setItemToLocalStorageWithExpiry("font-size", currentPercentage, 2);
  
    }
    
  }



function createIcon() {

  // Criar o ícone arredondado dinamicamente
  var expandIcon = document.createElement('div');
  expandIcon.id = 'expand-icon';
  expandIcon.innerHTML = '+';
  expandIcon.style.position = 'fixed';
  expandIcon.style.bottom = '20px';
  expandIcon.style.right = '20px';
  expandIcon.style.width = '50px';
  expandIcon.style.height = '50px';
  expandIcon.style.backgroundColor = '#3498db';
  expandIcon.style.color = '#fff';
  expandIcon.style.borderRadius = '50%';
  expandIcon.style.display = 'flex';
  expandIcon.style.alignItems = 'center';
  expandIcon.style.justifyContent = 'center';
  expandIcon.style.cursor = 'pointer';
  expandIcon.onclick = toggleExpandWindow;

  document.body.appendChild(expandIcon);



  // Criar a janela expansível dinamicamente
  var expandWindow = document.createElement('div');
  expandWindow.id = 'expand-window';
  expandWindow.innerHTML = `

  <style>
  .container {
    display: flex;
    align-items: center;
  }

  .button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
  }

  .percentage {
    font-size: 24px;
    margin: 0 10px;
  }

  .container-expand {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  </style>

  <div class="container-expand"> 

  <div class="container" style="flex-direction:column; gap:5px;">
    <span>Font Size</span>
    <div class="container">
      <button class="button" onclick="changePercentage(-5)">-</button>
      <div class="percentage" id="percentage">0%</div>
      <button class="button" onclick="changePercentage(5)">+</button>
    </div>
  </div>

  <button class="button" onclick="clearLocalStorage()">RESET</button>

  </div>

    `;

  expandWindow.style.display = 'none';
  expandWindow.style.position = 'fixed';
  expandWindow.style.bottom = '80px';
  expandWindow.style.right = '20px';
  expandWindow.style.padding = '10px';
  expandWindow.style.backgroundColor = '#fff';
  expandWindow.style.border = '1px solid #ccc';
  expandWindow.style.borderRadius = '5px';
  document.body.appendChild(expandWindow);


}

function toggleExpandWindow() {
  var expandWindow = document.getElementById('expand-window');
  expandWindow.style.display = (expandWindow.style.display === 'none' || expandWindow.style.display === '') ? 'block' : 'none';
}


// ******************** LOCAL STORAGE ********************//

function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}


// SETA UM ITEM NO LOCAL STORAGE COM TEMPO DE EXPIRAÇÃO
function setItemToLocalStorageWithExpiry(key, value, days) {

  const newDate = addDays(new Date(), days);

	const item = {
		value: value,
		expiry: newDate.getTime(),
	}
	localStorage.setItem(key, JSON.stringify(item))
}

// RETORNA UM ITEM DO LOCAL STORAGE PELA CHAVE
function getItemFromLocalStorageWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
}

function clearLocalStorage() {
  localStorage.clear();
  location.reload(true);
}


