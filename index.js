window.acessiBrasil = window.acessiBrasil || {};

let sizeSaved = getItemFromLocalStorageWithExpiry("font-size");
let zoomSaved = getItemFromLocalStorageWithExpiry("zoom");
let lineHightSaved = getItemFromLocalStorageWithExpiry("line-height");

let currentLetterSpacing = getItemFromLocalStorageWithExpiryNew("letter-spacing");

window.acessiBrasil.init = function init() {
    createIcon();
    changePercentage(sizeSaved);
    updateZoom(zoomSaved, true);
    updateLineHeight(lineHightSaved);
    loadLetterSpacing();
}


let currentPercentageFontSize = 0;
let currentPercentageZoomSize = 1;
let currentLineHeight = 0;


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
    expandIcon.style.zIndex = 99999;
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
    <span>Content Scaling</span>
    <div class="container">
      <button class="button" onclick="updateZoom(-0.016, false)">-</button>
      <div class="percentage" id="percentageZoom">0%</div>
      <button class="button" onclick="updateZoom(0.016, false)">+</button>
    </div>
    <span>Line Height</span>
    <div class="container">
      <button class="button" onclick="updateLineHeight(-4.0)">-</button>
      <div class="percentage" id="percentageLineHeight">0%</div>
      <button class="button" onclick="updateLineHeight(4.0)">+</button>
    </div>
    <span>Letter Spacing</span>
    <div class="container">
      <button class="button" onclick="reduceLetterSpacing()">-</button>
      <div class="percentage" id="percentageLetterSpacing">0%</div>
      <button class="button" onclick="increaseLetterSpacing()">+</button>
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
    expandWindow.style.zIndex = 99999;
    document.body.appendChild(expandWindow);


}

function changePercentage(amount) {

    if (amount != null) {

        const lastLeafElementsWithText = getLastLeafElementsWithText();


        lastLeafElementsWithText.forEach(function(txtTag) {

            let attName = txtTag.getAttribute('original-size');
            if(attName == null) {
                txtTag.setAttribute('original-size', parseInt(window.getComputedStyle(txtTag).fontSize));
            }

        });

        currentPercentageFontSize += amount;

        if (currentPercentageFontSize < -50) {
            currentPercentageFontSize = -50;
        } else if (currentPercentageFontSize > 300) {
            currentPercentageFontSize = 300;
        }


        const percentageElement = document.getElementById('percentage');
        percentageElement.textContent = currentPercentageFontSize + '%';

        lastLeafElementsWithText.forEach(function (txtTag) {

            let attName = txtTag.getAttribute('original-size');
            let initialSize = parseInt(attName);


            let newSize = initialSize + (initialSize * currentPercentageFontSize / 100);
            txtTag.style.fontSize = newSize + 'px';

        });

        setItemToLocalStorageWithExpiry("font-size", currentPercentageFontSize, 2);

    }

}

function updateLineHeight(newLineHeight) {

    if (newLineHeight != null) {

        const lastLeafElementsWithText = getLastLeafElementsWithText();

        currentLineHeight += newLineHeight;

        const percentageLineHeightElement = document.getElementById('percentageLineHeight');
        let percentageLineHeightElementValue = getPercentageOfLineHeight(currentLineHeight);

        lastLeafElementsWithText.forEach(function (txtTag) {
            let lh = parseInt(txtTag.style.lineHeight);
            let actualLineHeight = isNaN(lh) ? getLineHeightInPixelsIfText(txtTag) : lh;
            txtTag.style.lineHeight = actualLineHeight + newLineHeight + 'px';
        });

        percentageLineHeightElement.textContent = percentageLineHeightElementValue + '%';

        setItemToLocalStorageWithExpiry("line-height", currentLineHeight, 2);

    }

}

function getLineHeightInPixelsIfText(element) {

    let tempElement = document.createElement("div");
    tempElement.style.fontSize = window.getComputedStyle(element).fontSize;
    tempElement.style.lineHeight = "normal";
    tempElement.innerHTML = "&nbsp;";

    document.body.appendChild(tempElement);

    let lineHeight = tempElement.offsetHeight;

    document.body.removeChild(tempElement);

    return lineHeight;
}

function getLastLeafElementsWithText() {
    const body = document.body;
    const elementsWithText = [];

    function traverse(element) {
        // Verifica se o elemento é uma folha e tem texto
        // QUANDO FOR ULTIMO FILHO, COM CONTEUDO
        if ((!shouldBeRemoved(element) && element.children.length === 0 && element.textContent.trim() !== "")
            || (element.tagName === 'INPUT' || element.tagName === 'LABEL')) {
            elementsWithText.push(element);
        }
        //QUANDO POSSUIR FILHOS
        else {
            //POSSUI CONTEUDO
            if (element.textContent.trim() !== "") {
                elementsWithText.push(element);
            }

            for (let child of element.children) {
                traverse(child);
            }
        }
    }

    // Função para verificar se o elemento é uma tag de imagem
    function shouldBeRemoved(element) {
        return element.tagName.toLowerCase() === 'img' || element.tagName.toLowerCase() === 'svg' ||
            element.tagName.toLowerCase() === 'style' || element.tagName.toLowerCase() === 'noscript'
            || element.tagName.toLowerCase() === 'script' || element.tagName.toLowerCase() === 'link'
            || element.tagName.toLowerCase() === 'br';
    }

    // Inicia a travessia a partir do corpo (body)
    traverse(body);

    // Invertendo a lista para que na aplicação, a tag não herde o estilo da tag pai. Fazendo a aplicação de dentro para fora
    return elementsWithText.reverse();
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

// SETA UM ITEM NO LOCAL STORAGE COM TEMPO DE EXPIRAÇÃO
function setItemToLocalStorageWithExpiryNew(key, value, percentage) {

    const newDate = addDays(new Date(), 2);

    const item = {
        value: value,
        percentage: percentage,
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

function getItemFromLocalStorageWithExpiryNew(key) {
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
    return item;
}

function clearLocalStorage() {
    localStorage.clear();
    location.reload(true);
}



// *********** IMPLEMENTAÇÃO DA FUNCIONALIDADE DE ZOOM ********** //

function updateZoom(zoom, initial) {

    if(zoom != null) {

        if(initial){
            currentPercentageZoomSize = zoom;
        } else {
            currentPercentageZoomSize += zoom;
        }

        let body = document.body;

        // Obtém os filhos diretos do body
        let tagsDoPrimeiroNivel = Array.from(body.children);

        for (let i = 0; i < tagsDoPrimeiroNivel.length; i++) {
            tagsDoPrimeiroNivel[i].style.zoom = currentPercentageZoomSize;
        }

        const percentageElement = document.getElementById('percentageZoom');
        percentageElement.textContent = getPercentageOfZoom(currentPercentageZoomSize);

        setItemToLocalStorageWithExpiry("zoom", currentPercentageZoomSize, 2);

    }


}

function getPercentageOfZoom(zoom) {
    // Calcula a porcentagem em números redondos

    let porcentagem;

    if(zoom < 0) {
        porcentagem = Math.round((zoom + 1) / 0.016) * 10;
    }else {
        porcentagem = Math.round((zoom - 1) / 0.016) * 10;

    }

    return `${porcentagem}%`;
}


function getPercentageOfLineHeight(lineHeight) {
    // Calcula a porcentagem em números redondos

    let porcentagem;

    if(lineHeight < 0) {
        porcentagem = Math.round((lineHeight + 1) / 4) * 10;
    }else {
        porcentagem = Math.round((lineHeight - 1) / 4) * 10;

    }

    return porcentagem;
}


function increaseLetterSpacing() {
    updateLetterSpacing(0.2, 10)
}

function reduceLetterSpacing() {
    updateLetterSpacing(-0.2, -10)
}


function updateLetterSpacing(defaultValue, defaultPercentage) {

    //VALOR PADRÃO DE ADIÇÃO E REDUÇÃO - 0.2PX A CADA 10%

    const plusDays = addDays(new Date(), 2).getTime();
    const percentageLetterSpacingElement = document.getElementById('percentageLetterSpacing');
    percentageLetterSpacingElement.textContent = currentLetterSpacing != null ? currentLetterSpacing.percentage + defaultPercentage + '%' : defaultPercentage + '%';

    const lastLeafElementsWithText = getLastLeafElementsWithText();

    lastLeafElementsWithText.forEach(function (txtTag) {
        let letterSpacingVal = parseFloat(window.getComputedStyle(txtTag).letterSpacing);
        let letterSpacingFormated = isNaN(letterSpacingVal) ? 0 : letterSpacingVal;
        txtTag.style.letterSpacing = letterSpacingFormated + defaultValue + 'px';
    });

    currentLetterSpacing = {
        value: currentLetterSpacing == null ? defaultValue : currentLetterSpacing.value += defaultValue,
        percentage: currentLetterSpacing == null ? defaultPercentage : currentLetterSpacing.percentage += defaultPercentage,
        expiry: plusDays
    }

    setItemToLocalStorageWithExpiryNew("letter-spacing",
        currentLetterSpacing.value,
        currentLetterSpacing.percentage);


}

function loadLetterSpacing() {

    if(currentLetterSpacing !== null) {
        const percentageLetterSpacingElement = document.getElementById('percentageLetterSpacing');
        percentageLetterSpacingElement.textContent = currentLetterSpacing.percentage + '%';

        const lastLeafElementsWithText = getLastLeafElementsWithText();

        lastLeafElementsWithText.forEach(function (txtTag) {
            let lh = parseFloat(window.getComputedStyle(txtTag).letterSpacing);
            let actualLetterSpacing = isNaN(lh) ? 0 : lh;
            txtTag.style.letterSpacing = actualLetterSpacing + currentLetterSpacing.value + 'px';
        });
    }


}
