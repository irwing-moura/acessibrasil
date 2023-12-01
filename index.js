
window.acessiBrasil = window.acessiBrasil || {};

var elementNames = [];
//var sizeSaved = localStorage.getItem("txt-value");
var sizeSaved = getItemFromLocalStorageWithExpiry("txt-value");

returnAllElementsWithText();

elementNames.forEach(function(txtTag) {
    // Armazenar o tamanho inicial como um atributo de dados
    txtTag.setAttribute('data-initial-size-' + txtTag.tagName, parseInt(window.getComputedStyle(txtTag).fontSize));
});


window.acessiBrasil.init = function init() {

  createIcon();
  changeSize(sizeSaved);

}

function changeSize(value) {

  if(value != null) {
    
    elementNames.forEach(function(txtTag) {


      var attName = txtTag.getAttribute('data-initial-size-' + txtTag.tagName);
      var initialSize = parseInt(attName); 

      var newSize = initialSize * value /100;
      txtTag.style.fontSize = newSize + 'px';

    });

    //localStorage.setItem("txt-value", value);
    setItemToLocalStorageWithExpiry("txt-value", value, 2);

  }

}


function changeColor() {

    // Iterar sobre cada tag <h1> e alterar sua cor para vermelho
    elementNames.forEach(function(txtTag) {
      txtTag.style.color = 'red';
    });
  
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
        <label>
            Size: <input id="range__size" type="range" min="50" max="500" step="1" value="100" oninput="changeSize(this.value)">
        </label>
    `;

//     expandWindow.innerHTML = `
//     <label>
//         Size: <input type="range" min="50" max="500" step="1" value="100" oninput="changeSize(this.value)">
//     </label>
//     <br>
//     <label>
//         Color: <input type="range" min="0" max="100" step="1" value="50" oninput="changeColor()">
//     </label>
// `;

  expandWindow.style.display = 'none';
  expandWindow.style.position = 'fixed';
  expandWindow.style.bottom = '80px';
  expandWindow.style.right = '20px';
  expandWindow.style.padding = '10px';
  expandWindow.style.backgroundColor = '#fff';
  expandWindow.style.border = '1px solid #ccc';
  expandWindow.style.borderRadius = '5px';
  document.body.appendChild(expandWindow);


  // Define o valor do input range
  var rangeInput = document.getElementById("range__size");
  rangeInput.value = sizeSaved != null ? sizeSaved :  100;


}

function toggleExpandWindow() {
  var expandWindow = document.getElementById('expand-window');
  expandWindow.style.display = (expandWindow.style.display === 'none' || expandWindow.style.display === '') ? 'block' : 'none';
}


function returnAllElementsWithText() {
  // Obtém todos os elementos do DOM

    var allElements = document.getElementsByTagName('*');

    // Itera sobre cada elemento
      for (var i = 0; i < allElements.length; i++) {
        var element = allElements[i];
    
        // Verifica se o elemento tem texto
        if (element.tagName == 'BODY') {

          for (var j = 0; j < element.children.length; j++) {

            var tagInsideBody = element.children[j];

            //verifica se possui conteudo e se é diferente das tags do Widget
            if(tagInsideBody.textContent.trim().length > 0 && tagInsideBody.id != 'expand-window' && tagInsideBody.id != 'expand-icon') {
              elementNames.push(tagInsideBody);
            }

          }

        }
    }  
 
}

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