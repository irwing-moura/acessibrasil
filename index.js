window.acessiBrasil = window.acessiBrasil || {};

let currentFontSize = getItemFromLocalStorageWithExpiry("font-size");
let currentZoom = getItemFromLocalStorageWithExpiry("zoom");
let currentLineHeight = getItemFromLocalStorageWithExpiry("line-height");
let currentLetterSpacing = getItemFromLocalStorageWithExpiry("letter-spacing");

let textMagnifier = getItemFromLocalStorageWithExpiry("text-magnifier");
let textAlign = getItemFromLocalStorageWithExpiry("text-align");
let hightlightHeadings = getItemFromLocalStorageWithExpiry("highlight-headings");
let hightlightLinks = getItemFromLocalStorageWithExpiry("highlight-links");
let hightlightButtons = getItemFromLocalStorageWithExpiry("highlight-buttons");
let fontFamily = getItemFromLocalStorageWithExpiry("font-family");

//FONT FAMILY
let fontes = ['inherit', 'Arial, sans-serif', 'OpenDyslexic'];
let indexActualFontFamily = fontFamily != null ? fontFamily.value : fontFamily; // Obtém a fonte salva ou usa a primeira opção


let yellowColors  = {
    "cor1": {
    "valor": "#FFFFE0",
        "outroAtributo": "green"
},
    "cor2": {
    "valor": "#FFFACD",
        "outroAtributo": "Valor para a cor 2"
},
    "cor3": {
    "valor": "#FADA5E",
        "outroAtributo": "Valor para a cor 3"
},
    "cor4": {
    "valor": "#FFC30B",
        "outroAtributo": "Valor para a cor 4"
},
    "cor5": {
    "valor": "#FFD700",
        "outroAtributo": "Valor para a cor 5"
},
    "cor6": {
    "valor": "#FFDB58",
        "outroAtributo": "Valor para a cor 6"
},
    "cor7": {
    "valor": "#E9D66B",
        "outroAtributo": "Valor para a cor 7"
},
    "cor8": {
    "valor": "#FFEA00",
        "outroAtributo": "Valor para a cor 8"
},
    "cor9": {
    "valor": "#FFF44F",
        "outroAtributo": "Valor para a cor 9"
},
    "cor10": {
    "valor": "#FFC40C",
        "outroAtributo": "Valor para a cor 10"
},
    "cor11": {
    "valor": "#FDDA0D",
        "outroAtributo": "Valor para a cor 11"
},
    "cor12": {
    "valor": "#FFDA03",
        "outroAtributo": "Valor para a cor 12"
},
    "cor13": {
    "valor": "#CC7722",
        "outroAtributo": "Valor para a cor 13"
},
    "cor14": {
    "valor": "#ADFF2F",
        "outroAtributo": "Valor para a cor 14"
},
    "cor15": {
    "valor": "#FDFD96",
        "outroAtributo": "Valor para a cor 15"
},
    "cor16": {
    "valor": "#FFBF00",
        "outroAtributo": "Valor para a cor 15"
},
    "cor17": {
    "valor": "#F0A804",
        "outroAtributo": "Valor para a cor 15"
},
    "cor18": {
    "valor": "#FFD02E",
        "outroAtributo": "Valor para a cor 15"
},
    "cor19": {
    "valor": "#CCFF00",
        "outroAtributo": "Valor para a cor 15"
},
    "cor20": {
    "valor": "#CCEE22",
        "outroAtributo": "Valor para a cor 15"
},
    "cor21": {
    "valor": "#FFFF33",
        "outroAtributo": "Valor para a cor 15"
},
//     "cor22": {
//     "valor": "#FFFF00",
//         "outroAtributo": "Valor para a cor 15"
// },
    "cor23": {
    "valor": "#CCFF66",
        "outroAtributo": "Valor para a cor 15"
},
    "cor24": {
    "valor": "#CCFF33",
        "outroAtributo": "Valor para a cor 15"
},
    "cor25": {
    "valor": "#DFFF00",
        "outroAtributo": "Valor para a cor 15"
},
    "cor26": {
    "valor": "#FFFF99",
        "outroAtributo": "Valor para a cor 15"
},
    "cor27": {
    "valor": "#FFFF66",
        "outroAtributo": "Valor para a cor 15"
}

}

let orangeColors  = {
    "cor1": {
        "valor": "#FF4500",
        "outroAtributo": "Valor para a cor 1"
    },
    "cor2": {
        "valor": "#FF8C00",
        "outroAtributo": "Valor para a cor 2"
    },
    "cor3": {
        "valor": "#FFA500",
        "outroAtributo": "Valor para a cor 3"
    }
}

let blackColors  = {
    "cor1": {
        "valor": "#000000",
        "outroAtributo": "Valor para a cor 1"
    },
    "cor2": {
        "valor": "#1C1C1C",
        "outroAtributo": "Valor para a cor 2"
    },
    "cor3": {
        "valor": "#363636",
        "outroAtributo": "Valor para a cor 3"
    },
    "cor4": {
        "valor": "#4F4F4F",
        "outroAtributo": "Valor para a cor 4"
    },
    "cor5": {
        "valor": "#696969",
        "outroAtributo": "Valor para a cor 5"
    },
    "cor6": {
        "valor": "#1C1C1C",
        "outroAtributo": "Valor para a cor 6"
    },
    "cor7": {
        "valor": "#333333",
        "outroAtributo": "Valor para a cor 7"
    },
    "cor8": {
        "valor": "#555555",
        "outroAtributo": "Valor para a cor 8"
    },
    "cor9": {
        "valor": "#666666",
        "outroAtributo": "Valor para a cor 9"
    },
    "cor10": {
        "valor": "#999999",
        "outroAtributo": "Valor para a cor 10"
    },
    "cor11": {
        "valor": "#333333",
        "outroAtributo": "Valor para a cor 11"
    },
    "cor12": {
        "valor": "#595959",
        "outroAtributo": "Valor para a cor 12"
    },
    "cor13": {
        "valor": "#1A1A1A",
        "outroAtributo": "Valor para a cor 13"
    },
    "cor14": {
        "valor": "#2C2C2C",
        "outroAtributo": "Valor para a cor 14"
    },
    "cor15": {
        "valor": "#1E1E1E",
        "outroAtributo": "Valor para a cor 15"
    }
}

window.acessiBrasil.init = function init() {
    createIcon();
    loadFontSize();
    loadZoom();
    loadLineHeight();
    loadLetterSpacing();
    loadTextMagnifier()
    loadTextAlign();
    loadHighlightHeading();
    loadHighlightLinks();
    loadHighlightButtons();
    // loadFontFamily();
    setFontFamily();

}

// ******************** CRIAÇÃO DO WIDGET ********************//

function createIcon() {

    // Criar o ícone arredondado dinamicamente
    let expandIcon = document.createElement('div');
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
    let expandWindow = document.createElement('div');
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
  
  .balao {
    display: none;
    position: absolute;
    z-index: 1000; /* Valor alto para garantir que fique acima de outros elementos */
   }

  </style>

  <div class="container-expand"> 

  <div class="container" style="flex-direction:column; gap:5px;">
    <span>Font Size</span>
    <div class="container">
      <button class="button" onclick="reduceFontSize()">-</button>
      <div class="percentage" id="percentage">0%</div>
      <button class="button" onclick="increaseFontSize()">+</button>
    </div>
    <span>Content Scaling</span>
    <div class="container">
      <button class="button" onclick="reduceZoom()">-</button>
      <div class="percentage" id="percentageZoom">0%</div>
      <button class="button" onclick="increaseZoom()">+</button>
    </div>
    <span>Line Height</span>
    <div class="container">
      <button class="button" onclick="reduceLineHeight()">-</button>
      <div class="percentage" id="percentageLineHeight">0%</div>
      <button class="button" onclick="increaseLineHeight()">+</button>
    </div>
    <span>Letter Spacing</span>
    <div class="container">
      <button class="button" onclick="reduceLetterSpacing()">-</button>
      <div class="percentage" id="percentageLetterSpacing">0%</div>
      <button class="button" onclick="increaseLetterSpacing()">+</button>
    </div>
    <div class="container">
      <button id="btn-text-magnifier" class="button" onclick="updateTextMagnifier()">TEXT MAGNIFIER</button>
    </div>
    <div style="display: flex; gap: 1rem;">
        <div class="container">
          <button class="button" onclick="alignText('left')"><img style="max-width: 20px" alt="align left" src="align-left.png"/></button>
        </div>
        <div class="container">
          <button class="button" onclick="alignText('center')"><img style="max-width: 20px" alt="align center" src="align-center.png"/></button>
        </div>
        <div class="container">
          <button class="button" onclick="alignText('right')"><img style="max-width: 20px" alt="align right" src="align-right.png"/></button>
        </div>
    </div>
    
    <div class="container">
          <button class="button" onclick="highlightHeading()">HIGHLIGHT HEADING</button>
    </div>
    <div class="container">
          <button class="button" onclick="highlightLinks()">HIGHLIGHT LINKS</button>
    </div>
    <div class="container">
          <button class="button" onclick="highlightButtons()">HIGHLIGHT BUTTONS</button>
    </div>
    <div class="container">
          <button class="button" onclick="changeFontFamily()">CHANGE FONT FAMILY</button>
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

function toggleExpandWindow() {
    let expandWindow = document.getElementById('expand-window');
    expandWindow.style.display = (expandWindow.style.display === 'none' || expandWindow.style.display === '') ? 'block' : 'none';
}


// ******************** FONT SIZE ********************//

function increaseFontSize() {
    updateFontSize( 5)
}

function reduceFontSize() {
    updateFontSize(-5)
}

function updateFontSize(defaultPercentage) {

    const plusDays = addDays(new Date(), 2).getTime();

    const lastLeafElementsWithText = getLastLeafElementsWithText();
    const percentageElement = document.getElementById('percentage');
    percentageElement.textContent = currentFontSize != null ? currentFontSize.percentage + defaultPercentage + '%'
    : defaultPercentage + '%';

    lastLeafElementsWithText.forEach(function (txtTag) {

        let attName = txtTag.getAttribute('original-size');
        let initialSize = parseInt(attName);
        let newSize = initialSize + (initialSize * (currentFontSize !== null ? currentFontSize.percentage + defaultPercentage : defaultPercentage) / 100);
        txtTag.style.fontSize = newSize + 'px';

    });

    currentFontSize = {
        value: null,
        percentage: currentFontSize == null ? defaultPercentage : currentFontSize.percentage += defaultPercentage,
        expiry: plusDays
    }

    setItemToLocalStorageWithExpiry("font-size",
        currentFontSize.value,
        currentFontSize.percentage);


}

function loadFontSize() {

    const lastLeafElementsWithText = getLastLeafElementsWithText();

    lastLeafElementsWithText.forEach(function(txtTag) {

        let attName = txtTag.getAttribute('original-size');
        if(attName == null) {
            txtTag.setAttribute('original-size', parseInt(window.getComputedStyle(txtTag).fontSize));
        }

        if(currentFontSize != null) {
            let initialSize = parseInt(txtTag.getAttribute('original-size'));
            let newSize = initialSize + (initialSize * currentFontSize.percentage / 100);
            txtTag.style.fontSize = newSize + 'px';

            const percentageElement = document.getElementById('percentage');
            percentageElement.textContent = currentFontSize.percentage + '%';
        }

    });

}

// *********** ZOOM ********** //

function increaseZoom() {
    updateZoom(0.016, false, 10)
}

function reduceZoom() {
    updateZoom(-0.016, false, 10)
}

function updateZoom(zoom, initial, defaultPercentage) {

    const plusDays = addDays(new Date(), 2).getTime();
    const percentageZoomElement = document.getElementById('percentageZoom');
    percentageZoomElement.textContent = currentZoom != null ? currentZoom.percentage + defaultPercentage + '%' : defaultPercentage + '%';

    let tagsDoPrimeiroNivel = getFirstChildElementsBelowBody();

    for (let i = 0; i < tagsDoPrimeiroNivel.length; i++) {
        let zoomVal = parseFloat(window.getComputedStyle(tagsDoPrimeiroNivel[i]).zoom);
        let zoomFormated = isNaN(zoomVal) ? 1 : zoomVal;
        tagsDoPrimeiroNivel[i].style.zoom = zoomFormated + zoom;

    }

    currentZoom = {
        value: currentZoom == null ? zoom : currentZoom.value += zoom,
        percentage: currentZoom == null ? defaultPercentage : currentZoom.percentage += defaultPercentage,
        expiry: plusDays
    }

    setItemToLocalStorageWithExpiry("zoom",
        currentZoom.value,
        currentZoom.percentage);


}

function loadZoom() {

    if(currentZoom !== null) {
        const percentageZoomElement = document.getElementById('percentageZoom');
        percentageZoomElement.textContent = currentZoom.percentage + '%';

        let tagsDoPrimeiroNivel = getFirstChildElementsBelowBody();

        for (let i = 0; i < tagsDoPrimeiroNivel.length; i++) {
            let zoomVal = parseFloat(window.getComputedStyle(tagsDoPrimeiroNivel[i]).zoom);
            let zoomFormated = isNaN(zoomVal) ? 1 : zoomVal;
            tagsDoPrimeiroNivel[i].style.zoom = zoomFormated + currentZoom.value;
        }
    }

}

// ******************** LINE HEIGHT ********************//

function increaseLineHeight() {
    updateLineHeight(4.0, 10)
}

function reduceLineHeight() {
    updateLineHeight(-4.0, -10)
}

function updateLineHeight(defaultValue, defaultPercentage) {

    //VALOR PADRÃO DE ADIÇÃO E REDUÇÃO - 4PX A CADA 10%

    const plusDays = addDays(new Date(), 2).getTime();
    const percentageLineHeightElement = document.getElementById('percentageLineHeight');
    percentageLineHeightElement.textContent = currentLineHeight != null ? currentLineHeight.percentage + defaultPercentage + '%' : defaultPercentage + '%';

    const lastLeafElementsWithText = getLastLeafElementsWithText();

    lastLeafElementsWithText.forEach(function (txtTag) {
        let lineHeightVal = parseFloat(window.getComputedStyle(txtTag).lineHeight);
        let lineHeightFormated = isNaN(lineHeightVal) ? getLineHeightInPixelsIfText(txtTag) : lineHeightVal;
        txtTag.style.lineHeight = lineHeightFormated + defaultValue + 'px';
    });

    currentLineHeight = {
        value: currentLineHeight == null ? defaultValue : currentLineHeight.value += defaultValue,
        percentage: currentLineHeight == null ? defaultPercentage : currentLineHeight.percentage += defaultPercentage,
        expiry: plusDays
    }

    setItemToLocalStorageWithExpiry("line-height",
        currentLineHeight.value,
        currentLineHeight.percentage);

}

function loadLineHeight() {

    if(currentLineHeight !== null) {
        const percentageLineHeightElement = document.getElementById('percentageLineHeight');
        percentageLineHeightElement.textContent = currentLineHeight.percentage + '%';

        const lastLeafElementsWithText = getLastLeafElementsWithText();

        lastLeafElementsWithText.forEach(function (txtTag) {
            let lh = parseFloat(window.getComputedStyle(txtTag).lineHeight);
            let actualLineHeight = isNaN(lh) ? getLineHeightInPixelsIfText(txtTag) : lh;
            txtTag.style.lineHeight = actualLineHeight + currentLineHeight.value + 'px';
        });
    }

}

function getLineHeightInPixelsIfText(element) {

    //RECUPERA O LINE HEIGHT CORRETO DE ELEMENTOS QUE ESTÃO COMO 'NORMAL'

    let tempElement = document.createElement("div");
    tempElement.style.fontSize = window.getComputedStyle(element).fontSize;
    tempElement.style.lineHeight = "normal";
    tempElement.innerHTML = "&nbsp;";

    document.body.appendChild(tempElement);

    let lineHeight = tempElement.offsetHeight;

    document.body.removeChild(tempElement);

    return lineHeight;
}

// *********** LETTER SPACING ********** //

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

    setItemToLocalStorageWithExpiry("letter-spacing",
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

// ******************** RECUPERAR ELEMENTOS ********************//
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
    //TODO:: REFAZER ESSE METODO, ONDE IRA RECEBER UMA LISTA COM AS TAGS QUE DEVEM SER EXCLUIDAS
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

function getFirstChildElementsBelowBody() {
    // Obtém os primeiros filhos diretos do body
    let body = document.body;
    return Array.from(body.children);
}

function getElementCursorHover() {
    document.addEventListener('mouseover', function (event) {

        const element = event.target;

        function traverse(element) {
            // Verifica se o elemento é uma folha e tem texto
            // QUANDO FOR ULTIMO FILHO, COM CONTEUDO
            if ((!shouldBeRemoved(element) && element.children.length === 0 && element.textContent.trim() !== "")
                || (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'label')) {

                element.addEventListener("mouseover", mostrarBalao);
                element.addEventListener("mouseout", esconderBalao);

            }
            //QUANDO POSSUIR FILHOS
            else {
                for (let child of element.children) {
                    traverse(child);
                }
            }
        }

        // Função para verificar se o elemento é uma tag de imagem
        function shouldBeRemoved(element) {
            return element.tagName.toLowerCase() === 'style' || element.tagName.toLowerCase() === 'noscript'
                || element.tagName.toLowerCase() === 'script' || element.tagName.toLowerCase() === 'link'
                || element.tagName.toLowerCase() === 'br' || element.tagName.toLowerCase() === 'i'
                || element.tagName.toLowerCase() === 'svg' || element.tagName.toLowerCase() === 'img';
        }

        traverse(element);

    });
}

// ******************** LOCAL STORAGE ********************//

function setItemToLocalStorageWithExpiry(key, value, percentage) {

    const newDate = addDays(new Date(), 2);

    const item = {
        value: value,
        percentage: percentage,
        expiry: newDate.getTime(),
    }
    localStorage.setItem(key, JSON.stringify(item))
}

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
        removeItemFromLocalStorage(key);
        return null
    }
    return item;
}

function removeItemFromLocalStorage(key) {
    localStorage.removeItem(key);
}

function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
}

function clearLocalStorage() {
    localStorage.clear();
    location.reload(true);
}


// ******************** LUPA ********************//

// Função para criar o balão
function criarBalao() {
    let balao = document.createElement("div");
    balao.className = "balao";
    document.body.appendChild(balao);
    return balao;
}

// Função para estilizar o balão
function estilizarBalao(balao) {
    // Estilização do balão
    balao.style.padding = "10px";
    balao.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; /* Fundo escurecido */
    balao.style.color = "white"; /* Texto branco */
    balao.style.borderRadius = "5px";
    balao.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
    balao.style.fontSize = "40px"; /* Tamanho da fonte aumentado (ajuste conforme necessário) */
    balao.style.position = "absolute";
    balao.style.zIndex = 999999;
}

// Função para atualizar a posição do balão
function atualizarPosicaoBalao(event, balao) {

    // Leva em consideração a posição do scroll
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Define a posição do balão perto do cursor do mouse considerando o scroll
    balao.style.left = (event.clientX + scrollX + 10) + "px";
    balao.style.top = (event.clientY + scrollY + 10) + "px";

}

// Função para mostrar o balão com o texto maior
function mostrarBalao(event) {

    if (!textMagnifier || !textMagnifier.value) {
        return;
    }

    // Obtém ou cria o elemento do balão
    let balao = document.querySelector(".balao") || criarBalao();

    // Estiliza o balão
    estilizarBalao(balao);

    // Obtém o conteúdo com base no tipo de tag
    let conteudo;
    conteudo = event.target.innerHTML;

    // Define o conteúdo no balão
    balao.innerHTML = conteudo;

    // Atualiza a posição do balão
    atualizarPosicaoBalao(event, balao);

    // Exibe o balão
    balao.style.display = "block";

    // Adiciona o evento de movimento do mouse para atualizar a posição do balão
    document.addEventListener("mousemove", function (event) {
        atualizarPosicaoBalao(event, balao);
    });
}

// Função para esconder o balão ao retirar o mouse
function esconderBalao() {
    let balao = document.querySelector(".balao");
    if (balao) {
        balao.style.display = "none";

        // Remove o evento de movimento do mouse
        document.removeEventListener("mousemove", atualizarPosicaoBalao);
    }
}

function updateTextMagnifier() {

    if(textMagnifier == null) {
        textMagnifier = {
            value: true,
            percentage: null
        }
    } else {
        textMagnifier.value = !textMagnifier.value;
    }

    loadTextMagnifier();
}

function loadTextMagnifier() {

    if(textMagnifier != null) {

        let element = document.getElementById("btn-text-magnifier");

        if (!textMagnifier.value) {
            // Se a funcionalidade for desativada, esconde o balão
            let balao = document.querySelector(".balao");
            if (balao) {
                balao.style.display = "none !important";
                element.style.backgroundColor = "red";
            }
        }else {
            getElementCursorHover();
            element.style.backgroundColor = "green";
        }

        setItemToLocalStorageWithExpiry("text-magnifier",
            textMagnifier.value,
            null);

    }

}

function alignText(direction) {


    const lastLeafElementsWithText = getLastLeafElementsWithText();

    lastLeafElementsWithText.forEach(function (txtTag) {
        txtTag.style.textAlign = direction;
    });

    setItemToLocalStorageWithExpiry("text-align",
        direction,
        null);
}

function loadTextAlign() {

    if(textAlign != null) {
        alignText(textAlign.value);
    }

}


function highlightHeading() {

        let txtTags = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

        // Iterar sobre cada tag <h1> e alterar sua cor para vermelho
        txtTags.forEach(function(txtTag) {

            let attName = txtTag.getAttribute('data-inclowee-hlh-styled');

            if(attName == null) {

                let background = transformToHex(txtTag.style.background).toUpperCase();
                let color = transformToHex(txtTag.style.color).toUpperCase();

                let buscaYellow = Object.keys(yellowColors).find(chave => yellowColors[chave].valor === background);
                let buscaBlack = Object.keys(blackColors).find(chave => blackColors[chave].valor === color);


                if (buscaYellow) {
                    txtTag.style.background = yellowColors[buscaYellow].outroAtributo;

                } else {
                    txtTag.style.background = '#FFFF00';
                }

                if (buscaBlack) {
                    txtTag.style.color = blackColors[buscaBlack].outroAtributo;
                } else {
                    txtTag.style.color = '#000';
                }

                txtTag.setAttribute('data-inclowee-hlh-styled', 'true');
                setItemToLocalStorageWithExpiry("highlight-headings",
                    true,
                    null);

            } else {
                txtTag.style.background = '';
                txtTag.style.color = '';
                txtTag.removeAttribute("data-inclowee-hlh-styled");
                removeItemFromLocalStorage("highlight-headings");
            }

        });



}


function loadHighlightHeading() {

    if(hightlightHeadings != null) {
        highlightHeading();
    }
}


function transformToHex(rgb) {
    // Verifique se a cor está no formato 'rgb(r, g, b)'
    var match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    if (match) {
        // Converte os valores para hexadecimal e os concatena
        return '#' +
            ('0' + parseInt(match[1], 10).toString(16)).slice(-2) +
            ('0' + parseInt(match[2], 10).toString(16)).slice(-2) +
            ('0' + parseInt(match[3], 10).toString(16)).slice(-2);
    } else {
        // Se a cor já estiver no formato hexadecimal, retorna ela mesma
        return rgb;
    }
}


function highlightLinks() {

    let txtTags = document.querySelectorAll('a');

    // Iterar sobre cada tag <h1> e alterar sua cor para vermelho
    txtTags.forEach(function(txtTag) {

        let attName = txtTag.getAttribute('data-inclowee-hll-styled');

        if(attName == null) {

            let background = transformToHex(txtTag.style.background).toUpperCase();
            let color = transformToHex(txtTag.style.color).toUpperCase();

            let buscaYellow = Object.keys(yellowColors).find(chave => yellowColors[chave].valor === background);
            let buscaBlack = Object.keys(blackColors).find(chave => blackColors[chave].valor === color);


            if (buscaYellow) {
                txtTag.style.background = yellowColors[buscaYellow].outroAtributo;

            } else {
                txtTag.style.background = '#FFFF00';
            }

            if (buscaBlack) {
                txtTag.style.color = blackColors[buscaBlack].outroAtributo;
            } else {
                txtTag.style.color = '#000';
            }

            txtTag.setAttribute('data-inclowee-hll-styled', 'true');
            setItemToLocalStorageWithExpiry("highlight-links",
                true,
                null);

        } else {
            txtTag.style.background = '';
            txtTag.style.color = '';
            txtTag.removeAttribute("data-inclowee-hll-styled");
            removeItemFromLocalStorage("highlight-links");
        }

    });


}

function loadHighlightLinks() {

    if(hightlightLinks != null) {
        highlightLinks();
    }

}

function highlightButtons() {

    let txtTags = document.querySelectorAll('button, input[type="button"], input[type="submit"], [role="button"]');

    // Iterar sobre cada tag <h1> e alterar sua cor para vermelho
    txtTags.forEach(function(txtTag) {

        let attName = txtTag.getAttribute('data-inclowee-hlb-styled');

        if(attName == null) {

            let background = transformToHex(txtTag.style.background).toUpperCase();
            let color = transformToHex(txtTag.style.color).toUpperCase();

            let buscaYellow = Object.keys(yellowColors).find(chave => yellowColors[chave].valor === background);
            let buscaBlack = Object.keys(blackColors).find(chave => blackColors[chave].valor === color);


            if (buscaYellow) {
                txtTag.style.background = yellowColors[buscaYellow].outroAtributo;

            } else {
                txtTag.style.background = '#FFFF00';
            }

            if (buscaBlack) {
                txtTag.style.color = blackColors[buscaBlack].outroAtributo;
            } else {
                txtTag.style.color = '#000';
            }

            txtTag.setAttribute('data-inclowee-hlb-styled', 'true');
            setItemToLocalStorageWithExpiry("highlight-buttons",
                true,
                null);

        } else {
            txtTag.style.background = '';
            txtTag.style.color = '';
            txtTag.removeAttribute("data-inclowee-hlb-styled");
            removeItemFromLocalStorage("highlight-buttons");
        }

    });

}

function loadHighlightButtons() {

    if(hightlightButtons != null) {
        highlightButtons();
    }

}

//
// function setFontFamily(family) {
//
//     let txtTags = document.querySelectorAll('li, a, p, h1, h2, h3, h4, h5, h6, body, input[type="button"], button, input[type="submit"]');
//
//     // Cria um elemento <style>
//     let estiloGlobal = document.createElement('style');
//     estiloGlobal.setAttribute("id", "dyslexic-font")
//     let estilo = document.createTextNode(' @font-face {\n' +
//         '            font-family: \'OpenDyslexic\';\n' +
//         '            src: url("OpenDyslexic-Regular.woff"),\n' +
//         '            url("OpenDyslexic-Regular.woff");\n' +
//         '            font-weight: normal;\n' +
//         '            font-style: normal;\n' +
//         '        }\n' +
//         '\n' +
//         '        @font-face {\n' +
//         '            font-family: \'OpenDyslexic-Italic\';\n' +
//         '            src: url("OpenDyslexic-Italic.woff"),\n' +
//         '            url("OpenDyslexic-Italic.woff");\n' +
//         '            font-weight: normal;\n' +
//         '            font-style: italic;\n' +
//         '        }\n' +
//         '\n' +
//         '        @font-face {\n' +
//         '            font-family: \'OpenDyslexic-Bold\';\n' +
//         '            src: url("OpenDyslexic-Bold.woff"),\n' +
//         '            url("OpenDyslexic-Bold.woff");\n' +
//         '            font-weight: bold;\n' +
//         '            font-style: normal;\n' +
//         '        }\n' +
//         '\n' +
//         '        @font-face {\n' +
//         '            font-family: \'OpenDyslexic-Bold-Italic\';\n' +
//         '            src: url("OpenDyslexic-Bold-Italic.woff"),\n' +
//         '            url("OpenDyslexic-Bold-Italic.woff");\n' +
//         '            font-weight: bold;\n' +
//         '            font-style: italic;\n' +
//         '        }');
//
//     estiloGlobal.appendChild(estilo);
//     document.body.appendChild(estiloGlobal)
//
//     //readable - arial
//
//     txtTags.forEach(function (txtTag) {
//
//         let readableStyledSetted = txtTag.getAttribute('data-inclowee-rf-styled');
//         let dyslexicStyledSetted = txtTag.getAttribute('data-inclowee-df-styled');
//
//         if (readableStyledSetted == null && dyslexicStyledSetted == null) {
//
//             txtTag.style.setProperty('font-family', family === 1 ? 'Arial, Helvetica, sans-serif'
//                 : 'OpenDyslexic, sans-serif', 'important');
//
//             if(family === 1) {
//                 txtTag.setAttribute('data-inclowee-rf-styled', 'true');
//                 txtTag.removeAttribute('data-inclowee-df-styled');
//             }else if (family === 2) {
//                 txtTag.setAttribute('data-inclowee-df-styled', 'true');
//                 txtTag.removeAttribute('data-inclowee-rf-styled');
//             }
//
//             setItemToLocalStorageWithExpiry("font-family",
//                 family,
//                 null);
//
//         }
//
//         else if (readableStyledSetted) {
//
//         }
//
//         //else {
//         //     txtTag.style.fontFamily = '';
//         //     txtTag.removeAttribute("data-inclowee-f-styled");
//         //     removeItemFromLocalStorage("font-family");
//         //
//         //     //DELTE DYSLEXIC STYLE FONT
//         //     let folhaDeEstiloParaDeletar = document.getElementById("dyslexic-font");
//         //     if (folhaDeEstiloParaDeletar) {
//         //         // Obtém o pai da folha de estilo e remove a folha de estilo
//         //         var paiDaFolhaDeEstilo = folhaDeEstiloParaDeletar.parentNode;
//         //         paiDaFolhaDeEstilo.removeChild(folhaDeEstiloParaDeletar);
//         //     }
//         //
//         // }
//
//     });
//
// }
//
// function loadFontFamily() {
//
//     if(fontFamily != null) {
//         setFontFamily(fontFamily);
//     }
//
// }

function changeFontFamily() {
    indexActualFontFamily = (indexActualFontFamily + 1) % fontes.length;
    setFontFamily();

    if(indexActualFontFamily === 0) {
        removeItemFromLocalStorage("font-family");
    } else {
        setItemToLocalStorageWithExpiry("font-family",
            indexActualFontFamily,
            null);
    }



}

function setFontFamily() {

    if (indexActualFontFamily !== null) {

        let styleDyslexic = document.getElementById("dyslexic-font");

        if ((indexActualFontFamily === 1 || indexActualFontFamily === 2) && styleDyslexic == null) {
            createStyleFontDyslexic();
        }

        let selectedFontFamily = fontes[indexActualFontFamily];
        let elements = document
            .querySelectorAll('li, a, p, h1, h2, h3, h4, h5, h6, body, input[type="button"], button, input[type="submit"]');
        for (let i = 0; i < elements.length; i++) {

            elements[i].style.fontFamily = selectedFontFamily;

            if (selectedFontFamily === 'inherit') {
                removeItemFromLocalStorage("font-family");

                if (styleDyslexic) {
                    let dadStyleDyslexic = styleDyslexic.parentNode;
                    dadStyleDyslexic.removeChild(styleDyslexic);
                }

            }

        }
    }

}


function createStyleFontDyslexic() {
    // Cria um elemento <style>
    let estiloGlobal = document.createElement('style');
    estiloGlobal.setAttribute("id", "dyslexic-font")
    let estilo = document.createTextNode(' @font-face {\n' +
        '            font-family: \'OpenDyslexic\';\n' +
        '            src: url("OpenDyslexic-Regular.woff"),\n' +
        '            url("OpenDyslexic-Regular.woff");\n' +
        '            font-weight: normal;\n' +
        '            font-style: normal;\n' +
        '        }\n' +
        '\n' +
        '        @font-face {\n' +
        '            font-family: \'OpenDyslexic-Italic\';\n' +
        '            src: url("OpenDyslexic-Italic.woff"),\n' +
        '            url("OpenDyslexic-Italic.woff");\n' +
        '            font-weight: normal;\n' +
        '            font-style: italic;\n' +
        '        }\n' +
        '\n' +
        '        @font-face {\n' +
        '            font-family: \'OpenDyslexic-Bold\';\n' +
        '            src: url("OpenDyslexic-Bold.woff"),\n' +
        '            url("OpenDyslexic-Bold.woff");\n' +
        '            font-weight: bold;\n' +
        '            font-style: normal;\n' +
        '        }\n' +
        '\n' +
        '        @font-face {\n' +
        '            font-family: \'OpenDyslexic-Bold-Italic\';\n' +
        '            src: url("OpenDyslexic-Bold-Italic.woff"),\n' +
        '            url("OpenDyslexic-Bold-Italic.woff");\n' +
        '            font-weight: bold;\n' +
        '            font-style: italic;\n' +
        '        }');

    estiloGlobal.appendChild(estilo);
    document.body.appendChild(estiloGlobal)
}