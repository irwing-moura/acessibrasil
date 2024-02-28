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

let closeButton;
let resetButton;
let createshortcutsButton;
let hideButton;
let textEnlargeButton;
let hlHeading;
let highlightLinksButton;
let highlightButtonsButton;
let readableFontButton;
let friendlyDyslexiaButton;
let alignLeft;
let alignCenter;
let alignRight;

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

}

function assignFunctionsToIds() {

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


function changeStyleButtonSelected(id) {


    if(id.style.background === 'rgb(26, 110, 255)') {
        id.style.background = '#ffffff';
        id.style.borderColor = '#8e8e8e';
        id.style.color = '#000';
    }else {
        id.style.background = '#1a6eff'; //#ffffff
        id.style.borderColor = '#1a6eff'; //#8e8e8e
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
  width: 75px;
  height: 75px;
  background-color: #1A6EFF;
  border: 2px solid #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: background-color 0.3s, transform 0.3s;
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
  top: 10px; /* Ajuste conforme necessário para a distância desejada do topo */
  right: 20px; /* Mantém a posição à esquerda do navegador */
  height: 740px; /* Ajusta para cobrir toda a altura do navegador */
  width: 345px;
  max-width: 100%; /* Garante que a largura não ultrapasse a largura total do navegador */
  background-color: #f6f6f6;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Aplica uma sombra em torno da janela */
  overflow: auto;
  scrollbar-width: none; /* Para Firefox */
  /* Espaço extra no final para garantir visibilidade do conteúdo */
  max-width: 100%; /* Ajuste conforme necessário para a distância desejada do topo */
  scrollbar-width: none; /* Para Firefox */
   /* Espaço extra no final para garantir visibilidade do conteúdo */
   
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #1A6EFF;
  padding: 15px;
  border-top-left-radius: 0; /* Para preencher totalmente o topo, você pode querer remover o arredondamento */
  border-top-right-radius: 0; /* Para preencher totalmente o topo, você pode querer remover o arredondamento */
  display: flex;
  justify-content: flex-end;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Adiciona uma sombra à barra de ferramentas */
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
.toolbar-button:focus {
  outline: 2px solid #ffffff; /* Adicione um contorno ao focar */
  outline-offset: 2px; /* Ajuste o espaçamento do contorno para evitar sobreposição com o botão */
}


/* Estilos para o contêiner que envolve os botões */
.content-buttons {
  display: flex;
  justify-content: center; /* Centralize horizontalmente */
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  position: absolute;
  left: 2px; /* Ajuste a distância do canto esquerdo */
  right: 2px; /* Ajuste a distância do canto direito */
  top: 90px; /* Ajuste a distância do canto inferior */
}

/* Estilos para cada botão da seção de ajustes de conteúdo */
.content-button {
  background-color: #ffffff;
  border: 1px solid #8e8e8e;
  border-radius: 10px;
  cursor: pointer; 
  color: rgb(0, 0, 0);
  width: calc(33.33% - 10px);
  height: 93px;
  transition: background-color 0.3s, transform 0.3s, border-color 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

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
.slider-container1 {
  width: 331px;
  height: 80px;
  background-color: #ffffff;
  border: 1px solid #8e8e8e;
  border-radius: 10px;
  display: flex;
  flex-direction: column; /* Organiza os elementos em coluna */
  justify-content: center;
  padding: 20px;
  box-sizing: border-box; /* Garante que as dimensões incluam a borda e o preenchimento */
}



/* Parte superior do slider com título, ícone e valor */
.slider-top {
  display: flex;
  justify-content: space-between; /* Alinha o título/ícone e o valor nas extremidades */
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

  </style>

  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  
   <button id="accessibilityButton" class="accessibility-button">
        <span class="material-icons">accessibility_new</span>
    </button>
  
  <div id="appWindow" class="app-window" role="application" aria-label="Janela do Aplicativo">
        <div class="toolbar">
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
            <button id="closeButton" class="toolbar-button" role="button" aria-label="Fechar" tabindex="0"
                    title="Fechar Janela">
                <span class="material-icons">cancel</span>
            </button>
        </div>


        <!-- Conteúdo do aplicativo aqui -->

        <div class="content-settings" role="group" aria-label="Configurações de Acessibilidade">
            <div class="content-buttons">
                <!-- ... Outros botões de configuração ... -->

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

                <div class="slider-container1">
                    <div class="slider-top">
                        <label for="text_increase" class="slider-icon-title">
                            <span class="material-icons" alt="Ícone para aumentar tamanho do texto">text_increase</span>
                            <span class="slider-title">Font size</span>
                        </label>
                        <div id="sliderValue" class="slider-value" aria-live="polite">
                            <span id="percentage">0%</span> <!-- Ajustado para mostrar 100% como valor padrão -->
                        </div>
                    </div>
                    <input type="range" id="text_increase" class="slider-control" min="-100" max="200" value="0" step="5"
                           aria-label="Controle deslizante de tamanho de fonte" aria-valuemin="-100" aria-valuemax="200"
                           aria-valuenow="0" oninput="updateFontSizeSlide(this.value)">
                </div>


                <button id="highlightButtonsButton" class="content-button" role="button" aria-label="Highlight Buttons"
                        title="Highlight Buttons" tabindex="0">
                    <span class="material-icons" aria-hidden="true">smart_button</span>
                    Highlight Buttons
                </button>


                <button id="readableFontButton" class="content-button" role="button" aria-label="Readable font"
                        title="Readable font" tabindex="0">
                    <span class="material-icons" aria-hidden="true">format_clear</span>
                    Readable font
                </button>
                <button id="friendlyDyslexiaButton" class="content-button" role="button" aria-label="Friendly Dyslexia"
                        title="Friendly Dyslexia" tabindex="0">
                    <span class="material-icons" aria-hidden="true">psychology</span>
                    Friendly Dyslexia
                </button>


                <button id="alignLeft" class="content-button" role="button" aria-label="align left" title="align left"
                        tabindex="0">
                    <span class="material-icons" aria-hidden="true">format_align_left</span>
                    Align left
                </button>

                <button id="alignCenter" class="content-button" role="button" aria-label="format align center"
                        title="format align center" tabindex="0">
                    <span class="material-icons" aria-hidden="true">format_align_center</span>
                    Align center
                </button>

                <button id="alignRight" class="content-button" role="button" aria-label="format align right"
                        title="format align right" tabindex="0">
                    <span class="material-icons" aria-hidden="true">format_align_right</span>
                    Align right
                </button>

                <div class="slider-container1">
                    <div class="slider-top">
                        <label for="content_scaling" class="slider-icon-title">
                            <span class="material-icons"
                                  alt="Ícone para ajustar o dimensionamento do conteúdo">zoom_in</span>
                            <span class="slider-title">Content scaling</span>
                        </label>
                        <div id="contentScalingValue" class="slider-value" aria-live="polite">
                            <span id="ContentScalingValue">0%</span>
                        </div>
                    </div>
                    <input type="range" id="content_scaling" class="slider-control" min="-50" max="200" value="0"
                           step="10" aria-label="Controle deslizante de dimensionamento de conteúdo" aria-valuemin="50"
                           aria-valuemax="200" aria-valuenow="0" oninput="updateZoomSlide(this.value)">
                </div>

                <div class="slider-container1">
                    <div class="slider-top">
                        <label for="line_height" class="slider-icon-title">
                            <span class="material-icons"
                                  alt="Ícone para ajustar altura da linha">format_line_spacing</span>
                            <span class="slider-title">Line height</span>
                        </label>
                        <div id="lineHeightValue" class="slider-value" aria-live="polite">
                            <span id="LineHeightValue">1</span> <!-- Ajustado para mostrar 1.5 como valor padrão -->
                        </div>
                    </div>
                    <input type="range" id="line_height" class="slider-control" min="1" max="3" step="0.5" value="1"
                           aria-label="Controle deslizante de altura da linha" aria-valuemin="1" aria-valuemax="3"
                           aria-valuenow="0" oninput="updateLineHeightSlide(this.value)">
                </div>

                <div class="slider-container1">
                    <div class="slider-top">
                        <label for="letter_spacing" class="slider-icon-title">
                            <span class="material-icons"
                                  alt="Ícone para ajustar o espaçamento entre letras">format_size</span>
                            <span class="slider-title">Letter Spacing</span>
                        </label>
                        <div id="letterSpacingValue" class="slider-value" aria-live="polite">
                            <span id="LetterSpacingValue">0px</span>
                            <!-- Ajustado para mostrar 0px como valor padrão -->
                        </div>
                    </div>
                    <input type="range" id="letter_spacing" class="slider-control" min="0" max="20" value="0" step="1"
                           aria-label="Controle deslizante de espaçamento entre letras" aria-valuemin="0"
                           aria-valuemax="20" aria-valuenow="0" oninput="updateLetterSpacingSlide(this.value)">
                </div>


                <!-- Adicione mais botões conforme necessário -->
            </div>
        </div>
    </div>

    `;

    expandWindow.style.display = 'none';
    expandWindow.style.position = 'fixed';
    // expandWindow.style.zIndex = 99999;
    document.body.appendChild(expandWindow);


}

function toggleExpandWindow() {
    let appWindow = document.getElementById('appWindow');
    // console.log(expandWindow);

    appWindow.style.display = (appWindow.style.display === 'none' || appWindow.style.display === '') ? 'block' : 'none';
}


// ******************** FONT SIZE ********************//

// function increaseFontSize() {
//     updateFontSize( 5)
// }
//
// function reduceFontSize() {
//     updateFontSize(-5)
// }

// function updateFontSize(defaultPercentage) {
//
//     const plusDays = addDays(new Date(), 2).getTime();
//
//     const lastLeafElementsWithText = getLastLeafElementsWithText();
//     const percentageElement = document.getElementById('percentage');
//     percentageElement.textContent = currentFontSize != null ? currentFontSize.percentage + defaultPercentage + '%'
//     : defaultPercentage + '%';
//
//     lastLeafElementsWithText.forEach(function (txtTag) {
//
//         if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
//             // Aplique os estilos apenas se não pertencer à classe 'app-window'
//             let attName = txtTag.getAttribute('original-size');
//             let initialSize = parseInt(attName);
//             let newSize = initialSize + (initialSize * (currentFontSize !== null ? currentFontSize.percentage + defaultPercentage : defaultPercentage) / 100);
//             // txtTag.style.fontSize = newSize + 'px';
//             txtTag.style.setProperty('font-size', newSize + 'px', 'important');
//         }
//
//
//
//     });
//
//     currentFontSize = {
//         value: null,
//         percentage: currentFontSize == null ? defaultPercentage : currentFontSize.percentage += defaultPercentage,
//         expiry: plusDays
//     }
//
//     setItemToLocalStorageWithExpiry("font-size",
//         currentFontSize.value,
//         currentFontSize.percentage);
//
//
// }

function updateFontSizeSlide(defaultPercentage) {

    const plusDays = addDays(new Date(), 2).getTime();

    const lastLeafElementsWithText = getLastLeafElementsWithText();
    const percentageElement = document.getElementById('percentage');
    percentageElement.textContent = defaultPercentage + '%';

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

    currentFontSize = {
        value: null,
        percentage: defaultPercentage,
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

        if (currentFontSize != null) {
            if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
                let initialSize = parseInt(txtTag.getAttribute('original-size'));
                let newSize = initialSize + (initialSize * currentFontSize.percentage / 100);
                // txtTag.style.fontSize = newSize + 'px';
                txtTag.style.setProperty('font-size', newSize + 'px', 'important');
            }
            const percentageElement = document.getElementById('percentage');
            percentageElement.textContent = currentFontSize.percentage + '%';

            const rangeElement = document.getElementById('text_increase');
            rangeElement.value = currentFontSize.percentage;

        }

    });

}

// *********** ZOOM ********** //

// function increaseZoom() {
//     updateZoom(0.016, false, 10)
// }
//
// function reduceZoom() {
//     updateZoom(-0.016, false, 10)
// }

// function updateZoom(zoom, initial, defaultPercentage) {
//
//     const plusDays = addDays(new Date(), 2).getTime();
//     const percentageZoomElement = document.getElementById('percentageZoom');
//     percentageZoomElement.textContent = currentZoom != null ? currentZoom.percentage + defaultPercentage + '%' : defaultPercentage + '%';
//
//     let tagsDoPrimeiroNivel = getFirstChildElementsBelowBody();
//
//     for (let i = 0; i < tagsDoPrimeiroNivel.length; i++) {
//         let zoomVal = parseFloat(window.getComputedStyle(tagsDoPrimeiroNivel[i]).zoom);
//         let zoomFormated = isNaN(zoomVal) ? 1 : zoomVal;
//         tagsDoPrimeiroNivel[i].style.zoom = zoomFormated + zoom;
//
//     }
//
//     currentZoom = {
//         value: currentZoom == null ? zoom : currentZoom.value += zoom,
//         percentage: currentZoom == null ? defaultPercentage : currentZoom.percentage += defaultPercentage,
//         expiry: plusDays
//     }
//
//     setItemToLocalStorageWithExpiry("zoom",
//         currentZoom.value,
//         currentZoom.percentage);
//
//
// }

function calculateZoomPercentageInPixels(percentage) {
    let zoomValue = percentage * 0.32;
    zoomValue = 1 + (zoomValue / 100);
    return zoomValue;
}

function updateZoomSlide(percentage) {

    let zoom = calculateZoomPercentageInPixels(percentage);
    const percentageZoomElement = document.getElementById('ContentScalingValue');
    const percentageZoomElementValue = document.getElementById('content_scaling');


    const plusDays = addDays(new Date(), 2).getTime();

    percentageZoomElement.textContent = percentage + '%';
    percentageZoomElementValue.value = percentage;


    let tagsDoPrimeiroNivel = getFirstChildElementsBelowBody();

    tagsDoPrimeiroNivel.forEach(function(txtTag) {

        if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button') && txtTag.id !== 'appWindow') {
            txtTag.style.zoom = zoom;
        }

    });

    currentZoom = {
        value: zoom,
        percentage: percentage,
        expiry: plusDays
    }

    setItemToLocalStorageWithExpiry("zoom",
        currentZoom.value,
        currentZoom.percentage);


}

function loadZoom() {
    if(currentZoom !== null) {
        updateZoomSlide(currentZoom.percentage);
    }
}

// ******************** LINE HEIGHT ********************//

// function increaseLineHeight() {
//     updateLineHeight(4.0, 10)
// }
//
// function reduceLineHeight() {
//     updateLineHeight(-4.0, -10)
// }

// function updateLineHeight(defaultValue, defaultPercentage) {
//
//     //VALOR PADRÃO DE ADIÇÃO E REDUÇÃO - 4PX A CADA 10%
//
//     const plusDays = addDays(new Date(), 2).getTime();
//     const percentageLineHeightElement = document.getElementById('percentageLineHeight');
//     percentageLineHeightElement.textContent = currentLineHeight != null ? currentLineHeight.percentage + defaultPercentage + '%' : defaultPercentage + '%';
//
//     const lastLeafElementsWithText = getLastLeafElementsWithText();
//
//     lastLeafElementsWithText.forEach(function (txtTag) {
//         let lineHeightVal = parseFloat(window.getComputedStyle(txtTag).lineHeight);
//         let lineHeightFormated = isNaN(lineHeightVal) ? getLineHeightInPixelsIfText(txtTag) : lineHeightVal;
//         txtTag.style.lineHeight = lineHeightFormated + defaultValue + 'px';
//     });
//
//     currentLineHeight = {
//         value: currentLineHeight == null ? defaultValue : currentLineHeight.value += defaultValue,
//         percentage: currentLineHeight == null ? defaultPercentage : currentLineHeight.percentage += defaultPercentage,
//         expiry: plusDays
//     }
//
//     setItemToLocalStorageWithExpiry("line-height",
//         currentLineHeight.value,
//         currentLineHeight.percentage);
//
// }


function updateLineHeightSlide(step) {

    const plusDays = addDays(new Date(), 2).getTime();
    const percentageLineHeightElement = document.getElementById('LineHeightValue');
    percentageLineHeightElement.textContent = step;

    const percentageLineHeightElementValue = document.getElementById('line_height');
    percentageLineHeightElementValue.value = step;



    const lastLeafElementsWithText = getLastLeafElementsWithText();
    // const lastLeafElementsWithText = percorrerElementos();


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

            txtTag.style.setProperty('line-height', lineHeightFormated * step + 'px', 'important');
        }


    });

    currentLineHeight = {
        value: step,
        percentage: null,
        expiry: plusDays
    }

    setItemToLocalStorageWithExpiry("line-height",
        currentLineHeight.value,
        null);

}


function loadLineHeight() {
    if(currentLineHeight !== null) {
        updateLineHeightSlide(currentLineHeight.value);
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

// function increaseLetterSpacing() {
//     updateLetterSpacing(0.2, 10)
// }
//
// function reduceLetterSpacing() {
//     updateLetterSpacing(-0.2, -10)
// }

// function updateLetterSpacing(defaultValue, defaultPercentage) {
//
//     //VALOR PADRÃO DE ADIÇÃO E REDUÇÃO - 0.2PX A CADA 10%
//
//     const plusDays = addDays(new Date(), 2).getTime();
//     const percentageLetterSpacingElement = document.getElementById('percentageLetterSpacing');
//     percentageLetterSpacingElement.textContent = currentLetterSpacing != null ? currentLetterSpacing.percentage + defaultPercentage + '%' : defaultPercentage + '%';
//
//     const lastLeafElementsWithText = getLastLeafElementsWithText();
//
//     lastLeafElementsWithText.forEach(function (txtTag) {
//         let letterSpacingVal = parseFloat(window.getComputedStyle(txtTag).letterSpacing);
//         let letterSpacingFormated = isNaN(letterSpacingVal) ? 0 : letterSpacingVal;
//         txtTag.style.letterSpacing = letterSpacingFormated + defaultValue + 'px';
//     });
//
//     currentLetterSpacing = {
//         value: currentLetterSpacing == null ? defaultValue : currentLetterSpacing.value += defaultValue,
//         percentage: currentLetterSpacing == null ? defaultPercentage : currentLetterSpacing.percentage += defaultPercentage,
//         expiry: plusDays
//     }
//
//     setItemToLocalStorageWithExpiry("letter-spacing",
//         currentLetterSpacing.value,
//         currentLetterSpacing.percentage);
//
// }

function updateLetterSpacingSlide(pixels) {

    //VALOR PADRÃO DE ADIÇÃO E REDUÇÃO - 0.2PX A CADA 10%

    const plusDays = addDays(new Date(), 2).getTime();
    const percentageLetterSpacingElement = document.getElementById('LetterSpacingValue');
    percentageLetterSpacingElement.textContent = pixels + 'px';

    const percentageLineHeightElementValue = document.getElementById('letter_spacing');
    percentageLineHeightElementValue.value = pixels;

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

            txtTag.style.setProperty('letter-spacing', (letterSpacingFormated + pixels) + 'px', 'important');
        }


    });

    currentLetterSpacing = {
        value: pixels,
        percentage: null,
        expiry: plusDays
    }

    setItemToLocalStorageWithExpiry("letter-spacing",
        currentLetterSpacing.value,
        null);

}


function loadLetterSpacing() {
    if(currentLetterSpacing !== null) {
     updateLetterSpacingSlide(currentLetterSpacing.value);
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
            .querySelectorAll('li, a, p, h1, span, h2, h3, h4, h5, h6, body, input[type="button"], button, input[type="submit"]');
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