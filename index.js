window.acessiBrasil = window.acessiBrasil || {};

const FONT_SIZE_KEY = "font-size";
const ZOOM_KEY = "zoom";
const LINE_HEIGHT_KEY = "line-height";
const LETTER_SPACING_KEY = "letter-spacing";
const TEXT_MAGNIFIER_KEY = "text-magnifier";
const TEXT_ALIGN_KEY = "text-align";
const HIGHLIGHT_HEADINGS_KEY = "highlight-headings";
const HIGHLIGHT_LINKS_KEY = "highlight-links";
const HIGHLIGHT_BUTTONS_KEY = "highlight-buttons";
const FONT_FAMILY_KEY = "font-family";

let currentFontSize = getItemFromLocalStorageWithExpiry(FONT_SIZE_KEY);
let currentZoom = getItemFromLocalStorageWithExpiry(ZOOM_KEY);
let currentLineHeight = getItemFromLocalStorageWithExpiry(LINE_HEIGHT_KEY);
let currentLetterSpacing = getItemFromLocalStorageWithExpiry(LETTER_SPACING_KEY);

let textMagnifier = getItemFromLocalStorageWithExpiry(TEXT_MAGNIFIER_KEY);
let textAlign = getItemFromLocalStorageWithExpiry(TEXT_ALIGN_KEY);
let hightlightHeadings = getItemFromLocalStorageWithExpiry(HIGHLIGHT_HEADINGS_KEY);
let hightlightLinks = getItemFromLocalStorageWithExpiry(HIGHLIGHT_LINKS_KEY);
let hightlightButtons = getItemFromLocalStorageWithExpiry(HIGHLIGHT_BUTTONS_KEY);
let fontFamily = getItemFromLocalStorageWithExpiry(FONT_FAMILY_KEY);

//header buttons
let closeButton;
let resetButton;
let createshortcutsButton;
let hideButton;

//title buttons
let contentButton;

let textEnlargeButton;
let hlHeading;
let highlightLinksButton;
let highlightButtonsButton;
let readableFontButton;
let friendlyDyslexiaButton;
let alignLeft;
let alignCenter;
let alignRight;
let fontSizeSlide;
let zoomSlide;
let lineHeightSlide;
let letterSpacingSlide;

//FONT FAMILY
let fontes = ['', 'Arial, sans-serif', 'OpenDyslexic'];
let indexActualFontFamily = fontFamily != null ? fontFamily.value : fontFamily; // Obtém a fonte salva ou usa a primeira opção

//TEXT-ALIGN
let aligns = ['', 'left', 'center', 'right'];
let indexActualTextAlign = textAlign != null ? textAlign.value : textAlign;

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
    assignFunctionsToIds();
    loadFontSize();
    loadZoom();
    loadLineHeight();
    loadLetterSpacing();
    loadTextMagnifier()
    loadHighlightHeading();
    loadHighlightLinks();
    loadHighlightButtons();
    setFontFamily();
    setAlignText();
    loadMagnify();

}

function loadMagnify() {

    /*Função da Lupa */

    class Magnifier {
        constructor(magnifyButtonId) {
            this.magnifyButton = document.getElementById(magnifyButtonId);
            this.magnification = 1.6;
            this.active = false;
            this.setupMagnifier();
        }

        setupMagnifier() {
            this.magnifier = document.createElement('div');
            this.magnifier.className = 'magnifier';
            this.magnifier.innerHTML = `
            <div class="magnifier__scope">
                <iframe src="${window.location.href}#no-magnify"></iframe>
            </div>
        `;
            this.portal = this.magnifier.querySelector('iframe');
            document.body.appendChild(this.magnifier);
            this.magnifier.style.display = 'none'; // Inicialmente oculto

            this.magnifyButton.addEventListener('click', () => {
                if (this.active) {
                    this.teardown();
                } else {
                    toggleExpandWindow();
                    this.activateMagnifier({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
                }
            });
        }

        teardown() {
            if (this.magnifier) this.magnifier.style.display = 'none';
            this.active = false;
            this.magnifyButton.classList.remove('active');
            this.removeEventListeners();
        }

        removeEventListeners() {
            window.removeEventListener('pointermove', this.pointerSync.bind(this));
            window.removeEventListener('keydown', this.handleKeys.bind(this));
            document.removeEventListener('dblclick', this.teardown.bind(this));
        }

        pointerSync({ x, y }) {
            document.documentElement.style.setProperty('--magnify-x', x);
            document.documentElement.style.setProperty('--magnify-y', y);
        }

        handleKeys({ key }) {
            switch (key) {
                case '+':
                case '-':
                    this.magnification += (key === '+' ? 0.2 : -0.2);
                    this.magnification = Math.min(Math.max(this.magnification, 1), 5); // Limita entre 1 e 5
                    document.documentElement.style.setProperty('--magnification', this.magnification);
                    break;
                case 'Escape':
                    this.teardown();
                    break;
            }
        }

        activateMagnifier({ x, y }) {
            if (this.active) return;
            this.active = true;
            this.magnifyButton.classList.add('active');
            this.magnifier.style.display = 'block'; // Mostra o magnifier
            this.addEventListeners({ x, y });
        }

        addEventListeners({ x, y }) {
            window.addEventListener('pointermove', this.pointerSync.bind(this));
            window.addEventListener('keydown', this.handleKeys.bind(this));
            document.addEventListener('dblclick', this.teardown.bind(this));
            this.pointerSync({ x, y });
        }
    }

    const magnifier = new Magnifier('magnifyButton');

}

function assignFunctionsToIds() {

    const rangeButtons = document.querySelectorAll('.minus-button, .plus-button');

    rangeButtons.forEach(elemento => {
        elemento.addEventListener('click', () => {

            //elemento que deve se trocar o texto
            // let percentageElement = elemento.offsetParent.children[1];
            let percentAcrescentar;

            if(elemento.className.includes('minus-button')) {
                percentAcrescentar = -10;

            } else if(elemento.className.includes('plus-button')) {
                percentAcrescentar = 10;
            }

            const elementoPai = elemento.parentNode.parentNode;
            let func = elementoPai.getAttribute('func');

            if(func === FONT_SIZE_KEY) {
                percentAcrescentar = currentFontSize != null ? currentFontSize.percentage + percentAcrescentar : percentAcrescentar;
                updateFontSizeSlide(percentAcrescentar);
            }
            else if(func === ZOOM_KEY) {
                percentAcrescentar = currentZoom != null ? currentZoom.percentage + percentAcrescentar : percentAcrescentar;
                updateZoomSlide(percentAcrescentar);
            }
            else if(func === LINE_HEIGHT_KEY) {
                percentAcrescentar = currentLineHeight != null ? currentLineHeight.percentage + percentAcrescentar : percentAcrescentar;
                updateLineHeightSlide(percentAcrescentar);
            }
            else if(func === LETTER_SPACING_KEY) {
                percentAcrescentar = currentLetterSpacing != null ? currentLetterSpacing.percentage + percentAcrescentar : percentAcrescentar;
                updateLetterSpacingSlide(percentAcrescentar);
            }

        });
    });



    //HEADER

    closeButton = document.getElementById("closeButton");
    closeButton.addEventListener('click', toggleExpandWindow);

    resetButton = document.getElementById("resetButton");
    resetButton.addEventListener('click', clearLocalStorage);

    createshortcutsButton = document.getElementById("createshortcuts");
    createshortcutsButton.addEventListener('click', ()=>{
        alert('Não esta pronto ainda, meu chapinha!');
    });

    hideButton = document.getElementById("hideButton");
    hideButton.addEventListener('click', ()=>{
        alert('Não esta pronto ainda, meu chapinha!');
    });

    //TITLE

    contentButton = document.getElementById("contentButton");
    contentButton.addEventListener('click', ()=>{

        let content = document.getElementsByClassName('content-buttons')[0];
        let arrow = document.getElementById('contentButton');

        if(content.classList.contains('active')) {
            content.classList.remove('active')
            arrow.style.setProperty('transform', 'rotate(90deg)', 'important');
        } else {
            content.classList.toggle('active');
            arrow.style.setProperty('transform', 'rotate(0deg)', 'important');
        }


    });


    //FUNCIONALIDADES

    textEnlargeButton = document.getElementById("textEnlargeButton");
    textEnlargeButton.addEventListener('click', updateTextMagnifier);

    hlHeading = document.getElementById("highlightTitlesButton");
    hlHeading.addEventListener('click', highlightHeading);

    highlightLinksButton = document.getElementById("highlightLinksButton");
    highlightLinksButton.addEventListener('click', highlightLinks);

    highlightButtonsButton = document.getElementById("highlightButtonsButton");
    highlightButtonsButton.addEventListener('click', highlightButtons);

    readableFontButton = document.getElementById("readableFontButton");
    readableFontButton.addEventListener('click', ()=> {
        changeFontFamily(1);
    });

    friendlyDyslexiaButton = document.getElementById("friendlyDyslexiaButton");
    friendlyDyslexiaButton.addEventListener('click', ()=> {
        changeFontFamily(2);
    });

    alignLeft = document.getElementById("alignLeft");
    alignLeft.addEventListener('click', ()=> {
       changeAlignText(1);
    });

    alignCenter = document.getElementById("alignCenter");
    alignCenter.addEventListener('click', ()=> {
        changeAlignText(2);
    });

    alignRight = document.getElementById("alignRight");
    alignRight.addEventListener('click', ()=> {
        changeAlignText(3);
    });

}


function changeTextAndColorRangeValue(percentAcrescentar, percentageElement){
    if(percentAcrescentar === 0) {
        percentageElement.style.setProperty('color', '#686868', 'important');
        percentageElement.textContent = 'Default';
    } else {
        percentageElement.style.setProperty('color', '#1A6EFF', 'important');
        percentageElement.textContent = percentAcrescentar + '%';
    }
}

function changeStyleButtonSelected(id) {


    if(id.style.background === 'rgb(26, 110, 255)') {
        id.style.background = '#ffffff';
        // id.style.borderColor = 'transparent';
        id.style.color = '#000';
    }else {
        id.style.background = '#1a6eff'; //#ffffff
        // id.style.borderColor = '#1a6eff'; //#8e8e8e
        id.style.color = '#fff'; //#000
    }


}

function changeStyleButtonSelectedAndDeselectOthers(idActivate, idsDisable) {


    if(idActivate !== null) {
        idActivate.style.setProperty('background', '#1a6eff', 'important');
        idActivate.style.setProperty('borderColor', '#1a6eff', 'important');
        idActivate.style.setProperty('color', '#fff', 'important');
    }

    idsDisable.forEach(function (index) {

        index.style.setProperty('background', '#ffffff', 'important');
        index.style.setProperty('borderColor', '#8e8e8e', 'important');
        index.style.setProperty('color', '#000', 'important');

    });

}


// ******************** CRIAÇÃO DO WIDGET ********************//

function createIcon() {

    // Criar o ícone arredondado dinamicamente
    let expandIcon = document.createElement('button');
    expandIcon.id = 'accessibilityButton';
    expandIcon.className = 'accessibility-button'
    expandIcon.innerHTML = '<span class="material-icons">accessibility_new</span>';
    expandIcon.addEventListener('click', toggleExpandWindow);

    document.body.appendChild(expandIcon);


    // Criar a janela expansível dinamicamente
    let expandWindow = document.createElement('div');
    expandWindow.id = 'appWindow';
    expandWindow.innerHTML = `

  <style>
  /* Estilos para o botão de acessibilidade */
.accessibility-button {
  position: fixed;
  bottom: 20px;
  right: 40px;
  width: 60px;
  height: 60px;
  background-color: #1A6EFF;
  border: 2px solid #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: background-color 0.3s, transform 0.3s;
  user-select: none;
}

.accessibility-button:focus,
.accessibility-button:hover {
  background-color: #1038bd; /* Altere a cor de fundo quando o botão estiver em foco ou hover, se desejar */
  transform: scale(1.1); /* Aumenta o botão em 10% ao passar o mouse ou focar */
  outline: 2px solid #ffffff; /* Contorno branco para indicar foco */
  outline-offset: 2px;
}

/* Adiciona estilos específicos para o ícone no botão de acessibilidade */
.accessibility-button .material-icons {
  font-size: 50px;
  color: white;
}

/* Estilos gerais para a janela do aplicativo */
.app-window {
  
  position: fixed;
  top: 10px;
  /*left: 0;*/
  right: 20px;
  height: 98%; /* Ocupa 100% da altura da tela */
  max-width: 345px;
  width: 100%; /* Ocupa 100% da largura da tela */
  /*max-width: 100%; !* Garante que a largura não ultrapasse a largura total do navegador *!*/
  background-color: #eff1f5;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Aplica uma sombra em torno da janela */
  overflow: hidden; /* Impede rolagem na .app-window */
  user-select: none;
   
}

.app-window::-webkit-scrollbar {
  display: none; /* Para Chrome, Safari, WebKit */
}

.app-content {
  padding-bottom: 25px; /* Adiciona espaço no final do conteúdo */
  /* Adicione mais estilos para o conteúdo aqui, se necessário */
}


/* Estilos para tornar a barra de rolagem invisível no Firefox */
.app-window {
  scrollbar-width: none; /* Firefox */
}

/* Estilos para tornar a barra de rolagem invisível no Chrome, Safari e outros navegadores WebKit */
.app-window::-webkit-scrollbar {
  display: none; /* Chrome, Safari, WebKit */
}


/* Estilos para o conteúdo da janela */
.app-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  padding: 20px;
}

/* Estilos para a barra de ferramentas superior */
.toolbar {
  background-color: #1A6EFF;
  padding: 15px;
  border-top-left-radius: 0; /* Para preencher totalmente o topo, você pode querer remover o arredondamento */
  border-top-right-radius: 0; /* Para preencher totalmente o topo, você pode querer remover o arredondamento */
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Adiciona uma sombra à barra de ferramentas */
}

.toolbar-actions {
    display: flex;
    justify-content: center;
    align-items: center;
}

button {
    /*transition: all 0.15s ease-in 0s;*/
    transition: opacity 0.5s ease-in-out, transform 0.15s ease-in-out;
    
    /*opacity 0.5s ease-in-out, transform 0.5s ease-in-out*/
}

#closeButton {
    background: none !important;
}

#closeButton:hover {
    transform: scale(1.15);
}

#closeButton span {
    font-size: 19px !important;
}

.right-icons {
  display: flex;
  align-items: center;
}

.inter-icon {
  font-family: 'Inter', sans-serif;
  font-size: 24px; /* Ajuste o tamanho conforme necessário */
  color: #ffffff; /* Cor branca */
  margin-left: 10px; /* Ajuste a margem conforme necessário */
}


/* Estilos para os botões da barra de ferramentas superior */
.toolbar-button {
  background-color: rgba(255, 255, 255, 0.213);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border-radius: 7px;
  width: 30px;
  height: 30px;

  /* Adicione atributos ARIA */
  bleed: button;
  initial-letter: "Descrição do botão";
  /* Adicione feedback visual */
  outline: none; /* Adicione um contorno ao focar */
}

/* Estilos para os ícones dos botões da barra de ferramentas superior */
.toolbar-button .material-icons {
  font-size: 25px;
  color: rgb(255, 255, 255);
}

/* Adicione estados visuais para foco com contorno */
/*.toolbar-button:focus {*/
/*  outline: 2px solid #ffffff; !* Adicione um contorno ao focar *!*/
/*  outline-offset: 2px; !* Ajuste o espaçamento do contorno para evitar sobreposição com o botão *!*/
/*}*/


.content-settings {
    display: flex;
    flex-direction: column;
}

/* Estilos para o contêiner que envolve os botões */
/*.content-container {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  height: 90%;*/
/*}*/

.content-container {
  max-height: calc(100% - 60px); /* Ajuste conforme necessário para considerar outros elementos como a barra de ferramentas */
  overflow-y: auto; /* Habilita a rolagem vertical se o conteúdo exceder a altura máxima */
  scrollbar-width: none; /* Para Firefox */
}

.content-container::-webkit-scrollbar {
  display: none; /* Para Chrome, Safari, WebKit */
}

/* Estilos para cada botão da seção de ajustes de conteúdo */
.content-button {
  background-color: #ffffff;
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer; 
  color: rgb(0, 0, 0);
  width: calc(33.33% - 10px);
  height: 93px;
  transition: border-color .15s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

}

.content-button:hover {
    border-color: #1A6EFF;
 }

/* Adicione estados visuais para foco com contorno nos botões de conteúdo */
/*.content-button:focus {*/
/*  outline: 2px solid #033a7da2; !* Adicione um contorno ao focar *!*/
/*  outline-offset: 2px; !* Ajuste o espaçamento do contorno para evitar sobreposição com o botão *!*/
/*}*/

/* Ajuste a margem direita do último botão para evitar quebras desnecessárias */
.content-button:nth-child(3n) {
  margin-right: 0;
}

/* Estilos para o ícone dentro de cada botão da seção de ajustes de conteúdo */
.content-button span {
  font-size: 30px;
  margin-bottom: 5px;
}


/* Container principal do slider */
.range-container {
  width: 331px;
  /*height: 80px;*/
  max-height: 100px;
  background-color: #ffffff;
  border: 2px solid transparent;
  border-radius: 10px;
  display: flex;
  flex-direction: column; /* Organiza os elementos em coluna */
  justify-content: center;
  padding: 20px;
  box-sizing: border-box; /* Garante que as dimensões incluam a borda e o preenchimento */
}



/* Parte superior do slider com título, ícone e valor */
.title-container {
  display: flex;
  justify-content: center; /* Alinha o título/ícone e o valor nas extremidades */
  align-items: center;
  margin-bottom: 8px; /* Espaço entre o título/ícone e o controle deslizante */
}

/* Ícone e título do slider */
.slider-icon-title {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

/* Ícone utilizando a classe material-icons */
.icon-title .material-icons {
  font-size: 24px;
  color: #000000;
}

/* Título do slider */
.slider-title {
  font-size: 16px;
  color: #000000;
  margin-left: 8px;
}

/* Controle deslizante principal */
.slider-control {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 20px;
  background: #1A6EFF;
  outline: none; /* Remove a borda padrão do foco, considere acessibilidade ao fazer isso */
}

/* Polegar do controle deslizante para navegadores WebKit (Chrome, Safari) */
.slider-control::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 1px solid #1A6EFF;
  cursor: pointer;
}

/* Polegar do controle deslizante para navegadores Gecko (Firefox) */
.slider::-moz-range-thumb {
  width: 24px;
  height: 25px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 4px solid #1A6EFF;
  cursor: pointer; 

}

/* Valor do slider */
.slider-value {
  font-size: 16px;
  color: #1A6EFF;

}
  .balao {
    display: none;
    position: absolute;
    z-index: 1000; /* Valor alto para garantir que fique acima de outros elementos */
   }
   
   .range {
    position: relative;
    width: 90%;
    margin: auto;
    margin-bottom: 13px;
   }
   
   .base-range {
    height: 32px;
    border-radius: 10px;
    direction: ltr;
    background-color: #eff1f5;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #686868;
   }
   
   .arrow {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    max-width: 32px;
    max-height: 32px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    color: white;
    border-color: #1A6EFF;
    background: #1A6EFF;
    border-style: solid;
    position: absolute;
    z-index: 200000000000;
    top: 0;
    cursor: pointer;
    font-size: 20px;
   }
   
   .arrow:hover {
    transform: scale(1.1);
   }
   
   .left {
     left: -15px;
   }
  
   .right { 
    right: -15px;
   }
   
   .title {
     display: flex;
     justify-content: space-between;
     margin: 15px 10px;
     color: #414141;
     font-weight: 600;
   }
  
   .content-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    overflow: auto hidden;
    transition: max-height 0.5s ease 0s;
    /*height: 100%;*/
    max-height: 0;
   }
   
   .content-buttons.active {
      /*max-height: 750px; !* Ajuste este valor baseado no conteúdo esperado *!*/
      max-height: 1000px;
      padding-bottom: 20px;
   }
   
   #contentButton {
       cursor: pointer;
       transition: transform 0.5s ease 0s;
   }

   @media (max-width: 700px) {
    #appWindow {
      position: fixed; /* ou 'absolute', dependendo do layout */
      left: 50%;
      transform: translateX(-50%);
      width: 90%; /* Ajuste a largura conforme necessário */
      /* Certifique-se de que a altura e outras propriedades estejam configuradas conforme desejado */
    }
  }
  
/*  ESTILOS DA LUPA */
:root {
    --border-color-magnify: hsl(0 0% 80%);
    --background-color-magnify: hsl(0 0% 90%);
    --border-radius-magnify: 50%;
}

.magnifier iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 100vh;
    border: 0;
    transform-origin: 100% 0;
    max-width: unset;
    pointer-events: none;
    transform: translateX(calc(var(--magnify-x, 0) * -1px)) translateY(calc(var(--magnify-y, 0) * -1px));
}

.magnifier__scope {
    height: 100%;
    width: 100%;
    scale: var(--magnification, 1.7);
    transition: scale 0.2s ease;
}

.magnifier {
    width: 250px;
    aspect-ratio: 1;
    position: fixed;
    top: 0;
    left: 0;
    translate: calc(var(--magnify-x, 0) * 1px) calc(var(--magnify-y, 0) * 1px);
    transform: translate(-50%, -50%);
    border: 2px solid var(--border-color-magnify);
    border-radius: var(--border-radius-magnify);
    cursor: none;
    z-index: 999999;
    overflow: hidden;
    background: var(--background-color-magnify);
    user-select: none;
}

.magnifier::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: var(--border-radius-magnify);
    border: 2px solid white;
}


  
  </style>

  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  
  
  <div id="appWindow" class="app-window" role="application" aria-label="Janela do Aplicativo">
  
        <div class="toolbar">
            <button id="closeButton" class="toolbar-button" role="button" aria-label="Fechar" tabindex="0"
                    title="Fechar Janela">
                <span class="material-icons">close</span>
            </button>
            <div class="toolbar-actions">
                <button id="createshortcuts" class="toolbar-button" role="button" aria-label="Criar atalhos" tabindex="0"
                        title="Criar Atalhos">
                    <span class="material-icons">add_circle_outline</span>
                </button>
                <button id="resetButton" class="toolbar-button" role="button" aria-label="Restaurar" tabindex="0"
                        title="Reiniciar Configurações">
                    <span class="material-icons">cached</span>
                </button>
                <button id="hideButton" class="toolbar-button" role="button" aria-label="Ocultar" tabindex="0"
                        title="Ocultar Interface">
                    <span class="material-icons">visibility_off</span>
                </button>
            </div>
        </div>


        <!-- Conteúdo do aplicativo aqui -->

            <div class="content-container">
                <!-- ... Outros botões de configuração ... -->

                <div class="title">
                    <span>Content</span>
                    <span id="contentButton" class="material-icons">arrow_drop_down</span>
                </div>

                <div class="content-buttons active">

                    <button id="textEnlargeButton" class="content-button" role="button" aria-label="Ampliador de Texto"
                            title="Ampliador de Texto" tabindex="0">
                        <span class="material-icons" aria-hidden="true">add_comment</span>
                        Text Magnifier
                    </button>
                    <button id="highlightTitlesButton" class="content-button" role="button" aria-label="Highlight Titles"
                            title="Highlight Titles" tabindex="0">
                        <span class="material-icons" aria-hidden="true">format_color_text</span>
                        Highlight Titles
                    </button>
                    <button id="highlightLinksButton" class="content-button" role="button" aria-label="Highlight Links"
                            title="Highlight Links" tabindex="0">
                        <span class="material-icons" aria-hidden="true">link</span>
                        Highlight Links
                    </button>
                 
                    <div class="range-container" func="${FONT_SIZE_KEY}">
                        <div class="title-container">
                            <label for="letterSpacingSlide" class="slider-icon-title">
                                <span class="material-icons">text_increase</span>
                                <span class="slider-title">Font Size</span>
                            </label>
                        </div>
                        
                        <div class="range">
                            <button class="material-icons arrow left minus-button">expand_more</button>
                            <div class="base-range">Default</div>
                            <button class="material-icons arrow right plus-button">expand_less</button>
                        </div>
                        
                    </div>
                    
    
    
                    <button id="highlightButtonsButton" class="content-button" role="button" aria-label="Highlight Buttons"
                            title="Highlight Buttons" tabindex="0">
                        <span class="material-icons" aria-hidden="true">smart_button</span>
                        Highlight Buttons
                    </button>
    
    
                    <button id="readableFontButton" class="content-button" role="button" aria-label="Readable Font"
                            title="Readable Font" tabindex="0">
                        <span class="material-icons" aria-hidden="true">format_clear</span>
                        Readable Font
                    </button>
                    <button id="friendlyDyslexiaButton" class="content-button" role="button" aria-label="Friendly Dyslexia"
                            title="Friendly Dyslexia" tabindex="0">
                        <span class="material-icons" aria-hidden="true">psychology</span>
                        Friendly Dyslexia
                    </button>
    
    
                    <button id="alignLeft" class="content-button" role="button" aria-label="align left" title="align left"
                            tabindex="0">
                        <span class="material-icons" aria-hidden="true">format_align_left</span>
                        Align Left
                    </button>
    
                    <button id="alignCenter" class="content-button" role="button" aria-label="format align center"
                            title="format align center" tabindex="0">
                        <span class="material-icons" aria-hidden="true">format_align_center</span>
                        Align Center
                    </button>
    
                    <button id="alignRight" class="content-button" role="button" aria-label="format align right"
                            title="format align right" tabindex="0">
                        <span class="material-icons" aria-hidden="true">format_align_right</span>
                        Align Right
                    </button>
                    
                    <div class="range-container" func="${ZOOM_KEY}">
                        <div class="title-container">
                            <label for="letterSpacingSlide" class="slider-icon-title">
                                <span class="material-icons">zoom_in</span>
                                <span class="slider-title">Content Scaling</span>
                            </label>
                        </div>
                        
                        <div class="range">
                            <button class="material-icons arrow left minus-button">expand_more</button>
                            <div class="base-range">Default</div>
                            <button class="material-icons arrow right plus-button">expand_less</button>
                        </div>
                        
                    </div>
                    
                    
                    <div class="range-container" func="${LINE_HEIGHT_KEY}">
                        <div class="title-container">
                            <label for="letterSpacingSlide" class="slider-icon-title">
                                <span class="material-icons">format_line_spacing</span>
                                <span class="slider-title">Line Height</span>
                            </label>
                        </div>
                        
                        <div class="range">
                            <button class="material-icons arrow left minus-button">expand_more</button>
                            <div class="base-range">Default</div>
                            <button class="material-icons arrow right plus-button">expand_less</button>
                        </div>
                        
                    </div>
                    
                    <div class="range-container" func="${LETTER_SPACING_KEY}">
                        <div class="title-container">
                            <label for="letterSpacingSlide" class="slider-icon-title">
                                <span class="material-icons">format_size</span>
                                <span class="slider-title">Letter Spacing</span>
                            </label>
                        </div>
                        
                        <div class="range">
                            <button class="material-icons arrow left minus-button">expand_more</button>
                            <div class="base-range">Default</div>
                            <button class="material-icons arrow right plus-button">expand_less</button>
                        </div>
                        
                    </div>
                    
                     <button id="magnifyButton" class="content-button" role="button" aria-label="Magnify"
                            title="Magnify" tabindex="0">
                        <span class="material-icons" aria-hidden="true">search</span>
                        Magnify
                    </button>
                
            
            
                </div>
                
            </div>
    </div>

    `;

    // expandWindow.style.display = 'none';
    expandWindow.style.opacity = '0';
    expandWindow.style.visibility = 'hidden';
    expandWindow.style.position = 'fixed';
    expandWindow.style.left = '0';
    expandWindow.style.top = '0';
    expandWindow.style.zIndex = '9999';
    expandWindow.style.width = '100%';
    expandWindow.style.height = '100%';
    expandWindow.style.overflow = 'auto';
    expandWindow.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
    expandWindow.style.transform = 'translateY(50%)';

    window.onclick = function (event) {
        if (event.target == expandWindow) {
            toggleExpandWindow();
        }
    }

    // expandWindow.style.zIndex = 99999;
    document.body.appendChild(expandWindow);


}

function toggleExpandWindow() {
    let appWindow = document.getElementById('appWindow');
    let button = document.getElementById('accessibilityButton');

    if(appWindow.style.opacity === '0' || appWindow.style.opacity === '') {
        appWindow.style.setProperty('opacity', '1', 'important');
        appWindow.style.setProperty('visibility', 'visible', 'important');
        appWindow.style.setProperty('transform', 'translateY(0)', 'important');
        // expandWindow.style.transform = 'translateY(100%)'
        button.style.setProperty('display', 'none', 'important');
    }else if(appWindow.style.opacity === '1') {
        appWindow.style.setProperty('transform', 'translateY(50%)', 'important');
        appWindow.style.setProperty('opacity', '0', 'important');
        appWindow.style.setProperty('visibility', 'hidden', 'important');
        button.style.setProperty('display', 'flex', 'important');
        document.getElementsByClassName("content-container")[0].scrollTo({ top: 0});
    }


}

// ******************** FONT SIZE ********************//

function updateFontSizeSlide(defaultPercentage) {


    if(defaultPercentage > 200 || defaultPercentage < -200) {
        return;
    }

    const lastLeafElementsWithText = getLastLeafElementsWithText();
    lastLeafElementsWithText.forEach(function (txtTag) {

        if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
            // Aplique os estilos apenas se não pertencer à classe 'app-window'
            let attName = txtTag.getAttribute('original-size');
            let initialSize = parseInt(attName);
            let newSize = initialSize + (initialSize * defaultPercentage / 100);
            // txtTag.style.fontSize = newSize + 'px';
            txtTag.style.setProperty('font-size', newSize + 'px', 'important');
        }



    });

    const plusDays = addDays(new Date(), 2).getTime();
    currentFontSize = {
        value: null,
        percentage: defaultPercentage,
        expiry: plusDays
    }

    setItemToLocalStorageWithExpiry("font-size",
        currentFontSize.value,
        currentFontSize.percentage);

    const percentageElement = document.querySelector(`[func="${FONT_SIZE_KEY}"]`).children[1]
        .getElementsByClassName('base-range')[0];
    changeTextAndColorRangeValue(defaultPercentage, percentageElement);

}

function loadFontSize() {

    const lastLeafElementsWithText = getLastLeafElementsWithText();

    lastLeafElementsWithText.forEach(function(txtTag) {

        let attName = txtTag.getAttribute('original-size');
        if(attName == null) {
            txtTag.setAttribute('original-size', parseInt(window.getComputedStyle(txtTag).fontSize));
        }

        if (currentFontSize != null) {
            if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
                let initialSize = parseInt(txtTag.getAttribute('original-size'));
                let newSize = initialSize + (initialSize * currentFontSize.percentage / 100);
                // txtTag.style.fontSize = newSize + 'px';
                txtTag.style.setProperty('font-size', newSize + 'px', 'important');
            }
            updateFontSizeSlide(currentFontSize.percentage);
        }

    });

}

// *********** ZOOM ********** //

function calculateZoomPercentageInPixels(percentage) {
    let zoomValue = percentage * 0.32;
    zoomValue = 1 + (zoomValue / 100);
    return zoomValue;
}

function calculateLetterSpacingInPixels(percentage) {
    let letterSpacing = percentage * 2;
    letterSpacing = 1 + (letterSpacing / 100);
    return letterSpacing;
}

function updateZoomSlide(percentage) {

    if(percentage > 200 || percentage < -200) {
        return;
    }

    let zoom = calculateZoomPercentageInPixels(percentage);

    let tagsDoPrimeiroNivel = getFirstChildElementsBelowBody();
    tagsDoPrimeiroNivel.forEach(function(txtTag) {

        if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button') && txtTag.id !== 'appWindow') {
            txtTag.style.zoom = zoom;
        }

    });

    const plusDays = addDays(new Date(), 2).getTime();
    currentZoom = {
        value: zoom,
        percentage: percentage,
        expiry: plusDays
    }

    setItemToLocalStorageWithExpiry("zoom",
        currentZoom.value,
        currentZoom.percentage);


    const percentageElement = document.querySelector(`[func="${ZOOM_KEY}"]`).children[1]
        .getElementsByClassName('base-range')[0];
    changeTextAndColorRangeValue(percentage, percentageElement);


}

function loadZoom() {
    if(currentZoom !== null) {
        updateZoomSlide(currentZoom.percentage);
    }
}

// ******************** LINE HEIGHT ********************//

function updateLineHeightSlide(percentage) {

    if(percentage > 200 || percentage < -200) {
        return;
    }

    const lastLeafElementsWithText = getLastLeafElementsWithText();

    lastLeafElementsWithText.forEach(function (txtTag) {

        let attName = txtTag.getAttribute('original-line-height');
        if(attName == null) {
            txtTag.setAttribute('original-line-height',
                isNaN(parseInt(window.getComputedStyle(txtTag).lineHeight)) ? getLineHeightInPixelsIfText(txtTag) : window.getComputedStyle(txtTag).lineHeight);
        }


        if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
            let lineHeightVal = parseFloat(window.getComputedStyle(txtTag).lineHeight);
            let lineHeightFormated = isNaN(lineHeightVal) ? getLineHeightInPixelsIfText(txtTag) : lineHeightVal;

            let attName = txtTag.getAttribute('original-line-height');
            let initialSize = parseInt(attName);

            if(initialSize !== null) {
                lineHeightFormated = initialSize;
            }

            txtTag.style.setProperty('line-height', lineHeightFormated + (lineHeightFormated * percentage / 100)  + 'px', 'important');
        }


    });

    const plusDays = addDays(new Date(), 2).getTime();
    currentLineHeight = {
        value: null,
        percentage: percentage,
        expiry: plusDays
    }

    setItemToLocalStorageWithExpiry("line-height",
        null,
        percentage);


    const percentageElement = document.querySelector(`[func="${LINE_HEIGHT_KEY}"]`).children[1]
        .getElementsByClassName('base-range')[0];
    changeTextAndColorRangeValue(percentage, percentageElement);

}


function loadLineHeight() {
    if(currentLineHeight !== null) {
        updateLineHeightSlide(currentLineHeight.percentage);
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

function updateLetterSpacingSlide(percentage) {

    //VALOR PADRÃO DE ADIÇÃO E REDUÇÃO - 0.2PX A CADA 10%

    if(percentage > 200 || percentage < -200) {
        return;
    }

    let letterSpacingAdd = calculateLetterSpacingInPixels(percentage);

    const lastLeafElementsWithText = getLastLeafElementsWithText();
    lastLeafElementsWithText.forEach(function (txtTag) {

        let attName = txtTag.getAttribute('original-letter-spacing');
        if(attName == null) {
            txtTag.setAttribute('original-letter-spacing',
                isNaN(parseInt(window.getComputedStyle(txtTag).letterSpacing)) ? 0 : window.getComputedStyle(txtTag).letterSpacing);
        }

        if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
            let letterSpacingVal = parseFloat(window.getComputedStyle(txtTag).letterSpacing);
            let letterSpacingFormated = isNaN(letterSpacingVal) ? 0 : letterSpacingVal;

            let attName = txtTag.getAttribute('original-letter-spacing');
            let initialSize = parseInt(attName);

            if(initialSize !== null) {
                letterSpacingFormated = initialSize;
            }

            txtTag.style.setProperty('letter-spacing', letterSpacingFormated + letterSpacingAdd + 'px', 'important');
        }


    });

    const plusDays = addDays(new Date(), 2).getTime();

    currentLetterSpacing = {
        value: null,
        percentage: percentage,
        expiry: plusDays
    }

    setItemToLocalStorageWithExpiry("letter-spacing",
        null,
        percentage);


    const percentageElement = document.querySelector(`[func="${LETTER_SPACING_KEY}"]`).children[1]
        .getElementsByClassName('base-range')[0];
    changeTextAndColorRangeValue(percentage, percentageElement);

}


function loadLetterSpacing() {
    if(currentLetterSpacing !== null) {
     updateLetterSpacingSlide(currentLetterSpacing.percentage);
    }
}

// ******************** RECUPERAR ELEMENTOS ********************//

function percorrerElementos(bodyElement) {
    let resultados = [];

    function percorrer(elemento) {
        // Ignora o próprio elemento <body> com a classe "app-window"
        if (
            elemento.tagName !== 'BODY' &&
            !elemento.classList.contains('app-window') &&
            elemento.id !== 'appWindow'
        ) {
            // Verifica se é o último elemento filho na árvore
            if (!elemento.nextElementSibling) {
                resultados.push(elemento);
            }
        }

        // Percorre os filhos do elemento
        for (let filho of elemento.children) {
            percorrer(filho);
        }
    }

    percorrer(document.body);
    return resultados;
}

function getLastLeafElementsWithText() {
    const body = document.body;
    const elementsWithText = [];

    function traverse(element) {
        // Verifica se o elemento é uma folha e tem texto
        // QUANDO FOR ULTIMO FILHO, COM CONTEUDO
        if ((!shouldBeRemoved(element) && element.children.length === 0 && element.textContent.trim() !== "")
            || (element.tagName.toUpperCase() === 'INPUT' || element.tagName.toUpperCase() === 'LABEL')) {
            elementsWithText.push(element);
        }
        //QUANDO POSSUIR FILHOS
        else {
            //POSSUI CONTEUDO
            if (element.textContent.trim() !== "" && element.tagName !== 'BODY' &&
                !element.classList.contains('app-window') &&
                element.id !== 'appWindow') {
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

                if (!element.closest('.app-window') && !element.closest('.accessibility-button')) {
                    element.addEventListener("mouseover", mostrarBalao);
                    element.addEventListener("mouseout", esconderBalao);
                }

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

    let textMagnifier = getItemFromLocalStorageWithExpiry("text-magnifier");

    if (textMagnifier == null) {
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

    // Se a funcionalidade for desativada, esconde o balão
    let balao = document.querySelector(".balao");
    if (balao) {
        balao.style.setProperty('display', 'none', 'important');
        removeItemFromLocalStorage("text-magnifier");

    } else {
        setItemToLocalStorageWithExpiry("text-magnifier",
            true,
            null);
        getElementCursorHover();
    }

    changeStyleButtonSelected(textEnlargeButton);
}

function loadTextMagnifier() {

    if (textMagnifier !== null) {
        updateTextMagnifier();
    }

}



function changeAlignText(direction) {

    let textAlignSaved = getItemFromLocalStorageWithExpiry("text-align");

    if(textAlignSaved !== null && textAlignSaved.value === direction) {
        indexActualTextAlign = 0;
    }else {
        indexActualTextAlign = direction;
    }

    setAlignText();

    if(indexActualTextAlign === 0) {
        removeItemFromLocalStorage("text-align");
    } else {
        setItemToLocalStorageWithExpiry("text-align",
            indexActualTextAlign,
            null);
    }

}


function setAlignText() {

    if (indexActualTextAlign !== null) {

        let selectedAlignText = aligns[indexActualTextAlign];
        let elements = getLastLeafElementsWithText();

        for (let i = 0; i < elements.length; i++) {

            // elements[i].style.setProperty('font-family', selectedFontFamily, 'important');

            if (!elements[i].closest('.app-window') && !elements[i].closest('.accessibility-button')) {
                // Aplique os estilos apenas se não pertencer à classe 'app-window'
                elements[i].style.setProperty('text-align', selectedAlignText, 'important');
            }

            if (selectedAlignText === '') {
                removeItemFromLocalStorage("text-align");

            }

        }

        setItemToLocalStorageWithExpiry("text-align",
            indexActualTextAlign,
            null);


        if(indexActualTextAlign === 1){
            changeStyleButtonSelectedAndDeselectOthers(alignLeft, [alignCenter, alignRight])
        }else if(indexActualTextAlign === 2) {
            changeStyleButtonSelectedAndDeselectOthers(alignCenter, [alignLeft, alignRight])
        }else if (indexActualTextAlign === 3){
            changeStyleButtonSelectedAndDeselectOthers(alignRight, [alignLeft, alignCenter])
        }else {
            changeStyleButtonSelectedAndDeselectOthers(null, [alignLeft, alignCenter, alignRight])
        }



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

        changeStyleButtonSelected(hlHeading);

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

    changeStyleButtonSelected(highlightLinksButton);


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


            if(!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
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

            }

        } else {
            txtTag.style.background = '';
            txtTag.style.color = '';
            txtTag.removeAttribute("data-inclowee-hlb-styled");
            removeItemFromLocalStorage("highlight-buttons");
        }

    });

    changeStyleButtonSelected(highlightButtonsButton);

}

function loadHighlightButtons() {

    if(hightlightButtons != null) {
        highlightButtons();
    }

}

function changeFontFamily(font) {

    let fontFam = getItemFromLocalStorageWithExpiry("font-family");

    if(fontFam !== null && fontFam.value === font) {
        indexActualFontFamily = 0;
    }else {
        indexActualFontFamily = font;
    }

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
            .querySelectorAll('li, a, p, h1, span, h2, h3, h4, h5, h6, input[type="button"], button, input[type="submit"]');
        for (let i = 0; i < elements.length; i++) {

            // elements[i].style.setProperty('font-family', selectedFontFamily, 'important');

            if (!elements[i].closest('.app-window') && !elements[i].closest('.accessibility-button')) {
                // Aplique os estilos apenas se não pertencer à classe 'app-window'
                elements[i].style.setProperty('font-family', selectedFontFamily, 'important');
            }

            if (selectedFontFamily === '') {
                removeItemFromLocalStorage("font-family");

                if (styleDyslexic) {
                    let dadStyleDyslexic = styleDyslexic.parentNode;
                    if(dadStyleDyslexic !== null) {
                        dadStyleDyslexic.removeChild(styleDyslexic);
                    }
                }

            }

        }

        setItemToLocalStorageWithExpiry("font-family",
            indexActualFontFamily,
            null);


        if(indexActualFontFamily === 1){
            changeStyleButtonSelectedAndDeselectOthers(readableFontButton, [friendlyDyslexiaButton])
        }else if(indexActualFontFamily === 2) {
            changeStyleButtonSelectedAndDeselectOthers(friendlyDyslexiaButton, [readableFontButton])
        }else {
            changeStyleButtonSelectedAndDeselectOthers(null, [readableFontButton, friendlyDyslexiaButton])
        }



    }

}


function createStyleFontDyslexic() {
    // Cria um elemento <style>
    let estiloGlobal = document.createElement('style');
    estiloGlobal.setAttribute("id", "dyslexic-font")
    let estilo = document.createTextNode(' @font-face {\n' +
        '            font-family: \'OpenDyslexic\';\n' +
        '            src: url("https://raw.githack.com/irwing-moura/acessibrasil/main/OpenDyslexic-Regular.woff");,\n' +
        '            url("OpenDyslexic-Regular.woff");\n' +
        '            font-weight: normal;\n' +
        '            font-style: normal;\n' +
        '        }');

    estiloGlobal.appendChild(estilo);
    document.body.appendChild(estiloGlobal)
}
