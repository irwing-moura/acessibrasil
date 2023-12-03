window.acessiBrasil = window.acessiBrasil || {};

let sizeSaved = getItemFromLocalStorageWithExpiry("font-size");

window.acessiBrasil.init = function init() {

    createIcon();
    changePercentage(sizeSaved);

}


let currentPercentage = 0;


function changePercentage(amount) {

    if (amount != null) {

        const lastLeafElementsWithText = getLastLeafElementsWithText();


        lastLeafElementsWithText.forEach(function(txtTag) {

            if(txtTag.tagName === 'footer') {
                console.log("teste");
            }

            let attName = txtTag.getAttribute('original-size');
            if(attName == null) {
                txtTag.setAttribute('original-size', parseInt(window.getComputedStyle(txtTag).fontSize));
            }

        });

        currentPercentage += amount;

        if (currentPercentage < -50) {
            currentPercentage = -50;
        } else if (currentPercentage > 300) {
            currentPercentage = 300;
        }


        const percentageElement = document.getElementById('percentage');
        percentageElement.textContent = currentPercentage + '%';

        lastLeafElementsWithText.forEach(function (txtTag) {

            if(txtTag.tagName === 'footer') {
                console.log("teste");
            }

            let attName = txtTag.getAttribute('original-size');
            let initialSize = parseInt(attName);


            let newSize = initialSize + (initialSize * currentPercentage / 100);
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


function getLastLeafElementsWithText() {
    const body = document.body;
    const elementsWithText = [];

    // Função recursiva para percorrer os elementos filhos
    function traverse(element) {
        // Verifica se o elemento é uma folha e tem texto
        if (element.children.length === 0 && element.textContent.trim() !== "" && !shouldBeRemoved(element)) {
            elementsWithText.push(element);
        } else {
            // Chama recursivamente a função para os elementos filhos
            for (let child of element.children) {
                traverse(child);
            }
        }
    }

    // Função para verificar se o elemento é uma tag de imagem
    function shouldBeRemoved(element) {
        return element.tagName.toLowerCase() === 'img' || element.tagName.toLowerCase() === 'svg' ||
            element.tagName.toLowerCase() === 'style' || element.tagName.toLowerCase() === 'noscript'
            || element.tagName.toLowerCase() === 'script' || element.tagName.toLowerCase() === 'link';
    }

    // Inicia a travessia a partir do corpo (body)
    traverse(body);

    return elementsWithText;
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


