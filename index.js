window.acessiBrasil = window.acessiBrasil || {};

let currentFontSize = getItemFromLocalStorageWithExpiry("font-size");
let currentZoom = getItemFromLocalStorageWithExpiry("zoom");
let currentLineHeight = getItemFromLocalStorageWithExpiry("line-height");
let currentLetterSpacing = getItemFromLocalStorageWithExpiry("letter-spacing");

let textMagnifier = getItemFromLocalStorageWithExpiry("text-magnifier");
let textAlign = getItemFromLocalStorageWithExpiry("text-align");

window.acessiBrasil.init = function init() {
    createIcon();
    loadFontSize();
    loadZoom();
    loadLineHeight();
    loadLetterSpacing();
    loadTextMagnifier()
    loadTextAlign();
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
        localStorage.removeItem(key)
        return null
    }
    return item;
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

        // Cria um elemento <style>
        let estiloGlobal = document.createElement('style');

        let estilo = document.createTextNode('body :not(button):not(nav) { text-align:' + direction + '; }');

        // Adiciona o conteúdo ao elemento <style>
        estiloGlobal.appendChild(estilo);

        // Adiciona o elemento <style> ao final do <body>
        document.body.appendChild(estiloGlobal);

        setItemToLocalStorageWithExpiry("text-align",
            direction,
            null);


}

function loadTextAlign() {

    if(textAlign != null) {
        alignText(textAlign.value);
    }

}




