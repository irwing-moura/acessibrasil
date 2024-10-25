// import { searchArt } from './axios';

window.incloowe = window.incloowe || {};

window.incloowe.init = function init() {

    const WIDGET_STATUS_KEY = "widget-status";
    const FONT_SIZE_KEY = "font-size";
    const ZOOM_KEY = "zoom";
    const LINE_HEIGHT_KEY = "line-height";
    const LETTER_SPACING_KEY = "letter-spacing";
    const TEXT_MAGNIFIER_KEY = "text-magnifier";
    const TEXT_ALIGN_KEY = "text-align";
    const HIGHLIGHT_HEADINGS_KEY = "highlight-headings";
    const HIGHLIGHT_LINKS_KEY = "highlight-links";
    const HIGHLIGHT_BUTTONS_KEY = "highlight-buttons";
    const HIGHLIGHT_HOVER_KEY = "highlight-hover";
    const HIGHLIGHT_FOCUS_KEY = "highlight-focus";
    const FONT_FAMILY_KEY = "font-family";
    const COLORS_CONTRAST_KEY = "colors-contrast";
    const COLORS_SATURATION_KEY = "colors-saturation";
    const ADJUST_TEXT_COLOR_KEY = "adjust-text-color"
    const ADJUST_TITLE_COLOR_KEY = "adjust-title-color"
    const ADJUST_BACKGROUND_COLOR_KEY = "adjust-background-color"
    const DALTONISM_FILTER_KEY = "daltonism-filter";

    let widgetStatus = getItemFromLocalStorageWithExpiry(WIDGET_STATUS_KEY);
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
    let colorsContrast = getItemFromLocalStorageWithExpiry(COLORS_CONTRAST_KEY);
    let colorsSaturation = getItemFromLocalStorageWithExpiry(COLORS_SATURATION_KEY);
    let adjustTextColor = getItemFromLocalStorageWithExpiry(ADJUST_TEXT_COLOR_KEY);
    let adjustTitleColor = getItemFromLocalStorageWithExpiry(ADJUST_TITLE_COLOR_KEY);
    let adjustBackgroundColor = getItemFromLocalStorageWithExpiry(ADJUST_BACKGROUND_COLOR_KEY);
    let daltonismFilter = getItemFromLocalStorageWithExpiry(DALTONISM_FILTER_KEY);

//botao abrir
    let expandButton;

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
    let highlightHoverButton;
    let highlightFocusButton;
    let readableFontButton;
    let friendlyDyslexiaButton;
    let invertedColorsButton;
    let intelligentInvertedColorsButton;
    let lightContrastColorsButton;
    let darkContrastColorsButton;
    let highContrastColorsButton;
    let monochromaticColorsButton;
    let highSaturationColorsButton
    let lowSaturationColorsButton
    let redDefButton;
    let greenDefButton;
    let blueDefButton;

    let initVlibrasButton;

    let alignLeft;
    let alignCenter;
    let alignRight;
    let cancelHide;
    let submitHide;

    let shadowR;

//FONT FAMILY
    let fontes = ['', 'Arial, sans-serif', 'OpenDyslexic'];
    let indexActualFontFamily = fontFamily != null ? fontFamily.value : fontFamily; // Obtém a fonte salva ou usa a primeira opção

//TEXT-ALIGN
    let aligns = ['', 'left', 'center', 'right'];
    let indexActualTextAlign = textAlign != null ? textAlign.value : textAlign;

//COLORS CONTRAST
    let contrasts = ['', 'inverted', 'int-inverted', 'light', 'dark', 'high'];
    let indexActualColorContrast = colorsContrast != null ? colorsContrast.value : colorsContrast;

//COLORS CONTRAST
    let saturations = ['', 'high', 'low', 'mono'];
    let indexActualColorSaturation = colorsSaturation != null ? colorsSaturation.value : colorsSaturation;

//DALTONISM FILTERS
    let daltonisms = ['', 'protanomaly', 'deuteranomaly', 'tritanomaly'];
    let indexActualDaltonismFilter = daltonismFilter != null ? daltonismFilter.value : daltonismFilter;

    const tagsQueDevemMostrarBalaoMesmoComMaisDeUmItem = [
        "select",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "dl",
        "dt",
        "dd",
        "li",
        "a",
        "p",
        "span",
        "a",
        "strong",
        "em",
        "b",
        "i",
        "u",
        "s",
        "q",
        "abbr",
        "cite",
        "code",
        "kbd",
        "mark",
        "time"
    ];

    if (widgetStatus === null) {

        initializeVlibras();
        createWidget();

        window.addEventListener("load", (event) => {

            // document.getElementById('title-search-button').addEventListener('click', handleSearchClick);

            shadowR = document.getElementById("shadow").shadowRoot;

            createStyleGlobal();
            assignFunctionsToIds();
            assignAdjustColorsEventListeners();
            loadFontSize();
            loadZoom();
            loadLineHeight();
            loadLetterSpacing();
            loadTextMagnifier()
            loadHighlightHeading();
            loadHighlightLinks();
            loadHighlightButtons();
            loadHighlightHover();
            loadHighlightFocus();
            setFontFamily();
            setAlignText();
            loadContrastColors();
            loadSaturationColors();
            loadTextColor();
            loadTitleColor();
            loadBackgroundColor();
            loadDaltonismFilter();

            let modalAppWindow = shadowR.querySelector('#appWindow');
            modalAppWindow.addEventListener('click', (event) => {
                if (event.target.id === 'appWindow') {
                    toggleExpandWindow();
                }
            });

        });
    }

// //AXIOS
// const handleSearchClick = (ev) => {
//     const title = document.getElementById('title-search-input').value;
//     searchArt({ title }).then(renderResults);
// }
//
// const renderResults = ({ artPieces }) => {
//     document.getElementById('search-results').innerHTML = artPieces.join('');
// }


// ******************** CRIAÇÃO DO WIDGET ********************//


    function createWidget() {

        let host = document.createElement('div');
        host.id = 'shadow';
        let shadowRoot = host.attachShadow({mode: 'open'});

        // Criar a janela expansível dinamicamente
        let expandWindow = document.createElement('div');
        expandWindow.id = 'appWindow';
        expandWindow.innerHTML = `

  <style>
  /* Estilos para o botão de acessibilidade */
  
 @media (max-width: 980px) {
  
    #textEnlargeButton {
        display: none;
    }
    
    #highlightTitlesButton {
      margin-left: 0 !important;    
    }
    
  }
  
   @media (max-width: 700px) {
    #widget {
      position: fixed; /* ou 'absolute', dependendo do layout */
      transform: translateY(50%) !important;
      width: 90%;      
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
    } 
  }  
  
  
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
  /*transition: background-color 0.3s, transform 0.3s;*/
  -webkit-user-select: none; /* Para Safari e Chrome */
  -moz-user-select: none;    /* Para Firefox */
  -ms-user-select: none;     /* Para Internet Explorer/Edge */
  user-select: none;         /* Para navegadores modernos */
  transition: all 0.3s;
}

.accessibility-button:hover {
  transform: scale(1.1);
  background-color: #1038bd;
}

.accessibility-button:hover::before {
  /* Altere a cor de fundo quando o botão estiver em foco ou hover, se desejar */
  content: '';  /* Adiciona um pseudo-elemento para o efeito do outline */
  position: absolute;
  top: -6px;  /* Offset ajustado para o contorno */
  left: -6px;
  right: -6px;
  bottom: -6px;
  border: 2px solid #ffffff;  /* Cor do contorno branco */
  border-radius: 50%;  /* Border-radius ajustado para corresponder ao botão */
  pointer-events: none;  /* Para evitar interferência no comportamento do botão */
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
  box-shadow: 0 10px 30px rgb(26 110 255 / 10%);
  overflow: hidden; /* Impede rolagem na .app-window */
  -webkit-user-select: none; /* Para Safari e Chrome */
  -moz-user-select: none;    /* Para Firefox */
  -ms-user-select: none;     /* Para Internet Explorer/Edge */
  user-select: none;    
  
  font-family: Arial, Helvetica, sans-serif;
   
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
  padding: 15px 10px;
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

.toolbar-actions > * + * { margin-left: 5px;}

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
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  width: 30px;
  height: 30px;
  padding: 3px;
  /* Adicione atributos ARIA */
  bleed: button;
  initial-letter: "Descrição do botão";
  /* Adicione feedback visual */
  outline: none; /* Adicione um contorno ao focar */
 
  transition: border-color .15s ease;
}

#closeButton:hover {
  border:2px solid transparent;
}

.toolbar-button:hover {
    border-color: #FFF;
}

/* Estilos para os ícones dos botões da barra de ferramentas superior */
.toolbar-button .material-icons {
  font-size: 25px;
  color: rgb(255, 255, 255);
}

.content-container::-webkit-scrollbar {
    width: 4px;
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
}

.scrollable-content {
    display:flex;
    flex-direction: column;
    border-bottom: 1px solid #ccc;
}

.content-buttons > * + * { margin-top: 10px;}
.container-buttons > * + * { margin-left: 10px;}

.container-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

/* Track */
.content-container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #f1f1f1;
  border-radius: 10px;
}

/* Handle */
.content-container::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 10px;
}

.content-container:hover::-webkit-scrollbar-thumb {
    background: #c2c7d3;
}


/* Estilos para cada botão da seção de ajustes de conteúdo */
.content-button {
  background-color: #ffffff;
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer; 
  color: rgb(0, 0, 0);
  width: 100%;
  height: 100px;
  transition: border-color .15s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  position: relative;
  
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
  font-size: 16px;
  margin-bottom: 5px;
}


/* Container principal do slider */
.range-container {
  width: 100%;
  max-height: 100px;
  background-color: #ffffff;
  border: 2px solid transparent;
  border-radius: 10px;
  display: flex;
  flex-direction: column; /* Organiza os elementos em coluna */
  justify-content: center;
  padding: 20px;
  box-sizing: border-box; /* Garante que as dimensões incluam a borda e o preenchimento */
  align-items: center;
  position: relative;
  
}


/* Parte superior do slider com título, ícone e valor */
.title-container {
  display: flex;
  justify-content: center; /* Alinha o título/ícone e o valor nas extremidades */
  align-items: center;
  margin-bottom: 8px; /* Espaço entre o título/ícone e o controle deslizante */
  min-height: 34px;
  color: #000;
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
    padding: 0 4px;
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
    overflow: auto hidden;
    transition: max-height 0.4s ease 0s;
    max-height: 0;
    padding: 0 8px;
   }
   
   .content-buttons.active {
      /*max-height: 750px; !* Ajuste este valor baseado no conteúdo esperado *!*/
      max-height: 1000px;
      padding-bottom: 20px;
   }
   
   #contentButton {
       cursor: pointer;
       transition: transform 0.4s ease 0s;
   }
   
   .contentButton {
     transform: rotate(90deg);
   }
   
   .contentButton.active {
     transform: rotate(0deg);
   }
 
  .icon {
    height: 24px;
    width: 24px;
    margin-bottom: 5px;
  }
  
  .button-modal {
    border: none;
    background: #cccccc70;
    padding: 10px;
    border-radius: 4px;
    color: black;
    cursor: pointer;
  }
  
  .button-modal:hover {
    transform: scale(1.1);
  }
  
  .button-submit-modal {
    background: #1A6EFF;
    color: #fff;
  }
  
  #widget {
    transform:translate(0, 50%);
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  }
  
  #modal-hide {
    display: block;
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, -100%);
    top: 20%;
    left:50%;
    height: fit-content;
    background: #fff;
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  
  .color-picker {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-bottom: 8px;
  }
  
  .color-pick {
   
    width: 23px;
    height: 23px;
    border-radius: 50%;
    border: solid 0.5px #ccc;
    cursor: pointer;
    padding: 0 2px;
    color: white;
    display: flex !important;
    align-items: center;
    justify-content: center;
    
  }
  
  .color-pick-selected {
    outline: 2px solid #1A6EFF;
  }
  
  .link-default-color {
    font-size: 12px;
    text-decoration: none;
    color: #505050;
  }
  
  .link-default-color:hover {
    text-decoration: underline;
  }
    /* SPINNER */
 
    #loading-bar-spinner.spinner {
       animation: loading-bar-spinner 400ms linear infinite;
       display: none;
    }

    #loading-bar-spinner.spinner .spinner-icon {
        width: 20px;
        height: 20px;
        border:  solid 2px transparent;
        border-top-color:  #FFF !important;
        border-left-color: #FFF !important;
        border-radius: 50%;
    }
    
    @keyframes loading-bar-spinner {
      0%   { transform: rotate(0deg);   transform: rotate(0deg); }
      100% { transform: rotate(360deg); transform: rotate(360deg); }
    }


.tooltip-content {
    visibility: hidden;
    opacity: 0;
    width: 90%;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 10px 2px; /* Aumentando a altura */
    border-radius: 4px;
    position: absolute;
    top:33px;
    left: 8px;
    z-index: 2147483647;
    transition: opacity 0.3s;
}

.tooltip-arrow {
    position: absolute;
    top: -6px; /* Posiciona a "cauda" no topo */
    left: 4px; /* Move a cauda mais para a esquerda */
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #555; /* Define a cor da "cauda" */
}
  
  .btn-active {
    background: #1a6eff !important;
    border-color: #1a6eff !important;
    color: #fff !important;
  }
  
  
  </style>
  
  <div id="widget" class="app-window" role="application" aria-label="Janela do Widget">
   <div class="toolbar">
      <div class="toolbar-actions">
         <button id="createshortcuts" class="toolbar-button" role="button" aria-label="Criar atalhos" tabindex="0"
            title="Criar Atalhos">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
               <path d="M5 12h14"></path>
               <path d="M12 5v14"></path>
            </svg>
         </button>
         <button id="resetButton" class="toolbar-button" role="button" aria-label="Restaurar" tabindex="0"
            title="Reiniciar Configurações">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw">
               <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
               <path d="M3 3v5h5"></path>
               <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
               <path d="M16 16h5v5"></path>
            </svg>
         </button>
         <button id="hideButton" class="toolbar-button" role="button" aria-label="Ocultar" tabindex="0"
            title="Ocultar Interface">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off">
               <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
               <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
               <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
               <line x1="2" x2="22" y1="2" y2="22"></line>
            </svg>
         </button>
      </div>
      <button id="closeButton" class="toolbar-button" role="button" aria-label="Fechar" tabindex="0"
         title="Fechar Janela">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
         </svg>
      </button>
   </div>
   <!-- Conteúdo do aplicativo aqui -->
   <div class="content-container">
      <div class="scrollable-content">
         <!-- ... Outros botões de configuração ... -->
         <div class="title">
            <span>Content</span>
            <span class="contentButton active">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down">
                  <path d="m6 9 6 6 6-6"></path>
               </svg>
            </span>
         </div>
         <div class="content-buttons active">
            
            <div class="range-container" func="${FONT_SIZE_KEY}">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            
               <div class="title-container">
                  <label for="letterSpacingSlide" class="slider-icon-title">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-a-large-small">
                        <path d="M21 14h-5"></path>
                        <path d="M16 16v-3.5a2.5 2.5 0 0 1 5 0V16"></path>
                        <path d="M4.5 13h6"></path>
                        <path d="m3 16 4.5-9 4.5 9"></path>
                     </svg>
                     <span class="slider-title">Font Size</span>
                  </label>
               </div>
               <div class="range">
                  <button class="material-icons arrow left minus-button">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down">
                        <path d="m6 9 6 6 6-6"></path>
                     </svg>
                  </button>
                  <div class="base-range">Default</div>
                  <button class="material-icons arrow right plus-button">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up">
                        <path d="m18 15-6-6-6 6"></path>
                     </svg>
                  </button>
               </div>
               
               <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
               
            </div>
            <div class="container-buttons">
               <button id="readableFontButton" class="content-button" role="button" aria-label="Readable Font"
                  title="Readable Font" tabindex="0">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-spell-check">
                        <path d="m6 16 6-12 6 12"></path>
                        <path d="M8 12h8"></path>
                        <path d="m16 20 2 2 4-4"></path>
                     </svg>
                  </div>
                  <span>Readable Font</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
               <button id="friendlyDyslexiaButton" class="content-button" role="button" aria-label="Friendly Dyslexia"
                  title="Friendly Dyslexia" tabindex="0">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-check">
                        <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z"></path>
                        <path d="m16 12 2 2 4-4"></path>
                        <path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3"></path>
                     </svg>
                  </div>
                  <span>Friendly Dyslexia</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
            </div>
            <div class="container-buttons">
               <button id="alignLeft" class="content-button" role="button" aria-label="align left" title="align left"
                  tabindex="0">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-left">
                        <line x1="21" x2="3" y1="6" y2="6"></line>
                        <line x1="15" x2="3" y1="12" y2="12"></line>
                        <line x1="17" x2="3" y1="18" y2="18"></line>
                     </svg>
                  </div>
                  <span>Align Left</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
               <button id="alignCenter" class="content-button" role="button" aria-label="format align center"
                  title="format align center" tabindex="0">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-center">
                        <line x1="21" x2="3" y1="6" y2="6"></line>
                        <line x1="17" x2="7" y1="12" y2="12"></line>
                        <line x1="19" x2="5" y1="18" y2="18"></line>
                     </svg>
                  </div>
                  <span>Align Center</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
               <button id="alignRight" class="content-button" role="button" aria-label="format align right"
                  title="format align right" tabindex="0">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-right">
                        <line x1="21" x2="3" y1="6" y2="6"></line>
                        <line x1="21" x2="9" y1="12" y2="12"></line>
                        <line x1="21" x2="7" y1="18" y2="18"></line>
                     </svg>
                  </div>
                  <span>Align Right</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
            </div>
            <div class="range-container" func="${ZOOM_KEY}">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            
               <div class="title-container">
                  <label for="letterSpacingSlide" class="slider-icon-title">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-expand">
                        <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path>
                        <path d="M3 16.2V21m0 0h4.8M3 21l6-6"></path>
                        <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"></path>
                        <path d="M3 7.8V3m0 0h4.8M3 3l6 6"></path>
                     </svg>
                     <span class="slider-title">Content Scaling</span>
                  </label>
               </div>
               <div class="range">
                  <button class="material-icons arrow left minus-button">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down">
                        <path d="m6 9 6 6 6-6"></path>
                     </svg>
                  </button>
                  <div class="base-range">Default</div>
                  <button class="material-icons arrow right plus-button">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up">
                        <path d="m18 15-6-6-6 6"></path>
                     </svg>
                  </button>
               </div>
               <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
            </div>
            <div class="range-container" func="${LINE_HEIGHT_KEY}">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            
               <div class="title-container">
                  <label for="letterSpacingSlide" class="slider-icon-title">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-up-down">
                        <path d="m7 15 5 5 5-5"></path>
                        <path d="m7 9 5-5 5 5"></path>
                     </svg>
                     <span class="slider-title">Line Height</span>
                  </label>
               </div>
               <div class="range">
                  <button class="material-icons arrow left minus-button">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down">
                        <path d="m6 9 6 6 6-6"></path>
                     </svg>
                  </button>
                  <div class="base-range">Default</div>
                  <button class="material-icons arrow right plus-button">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up">
                        <path d="m18 15-6-6-6 6"></path>
                     </svg>
                  </button>
               </div>
               
               <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
               
            </div>
            <div class="range-container" func="${LETTER_SPACING_KEY}">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            
               <div class="title-container">
                  <label for="letterSpacingSlide" class="slider-icon-title">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-left-right">
                        <path d="m9 7-5 5 5 5"></path>
                        <path d="m15 7 5 5-5 5"></path>
                     </svg>
                     <span class="slider-title">Letter Spacing</span>
                  </label>
               </div>
               <div class="range">
                  <button class="material-icons arrow left minus-button">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down">
                        <path d="m6 9 6 6 6-6"></path>
                     </svg>
                  </button>
                  <div class="base-range">Default</div>
                  <button class="material-icons arrow right plus-button">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up">
                        <path d="m18 15-6-6-6 6"></path>
                     </svg>
                  </button>
               </div>
               
               <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
               
            </div>
         </div>
      </div>
      <div class="scrollable-content">
         <!-- ... Outros botões de configuração ... -->
         <div class="title">
            <span>Color and Screen</span>
            <span class="contentButton">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down">
                  <path d="m6 9 6 6 6-6"></path>
               </svg>
            </span>
         </div>
         <div class="content-buttons">
         
         <div class="container-buttons">
                        
               <button id="invertedColorsButton" class="content-button" role="button" aria-label="Inversor de cores"
                  title="Inversor de cores" tabindex="0">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                  </div>
                  <span>Inverted Colors</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>    
               
               <button id="intelligentInvertedColorsButton" class="content-button" role="button" aria-label="Inversor de cores inteligente"
                  title="Inversor de cores inteligente" tabindex="0">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                  </div>
                  <span>Intelligent Inverted Colors</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>     
                        
            </div>
         
            <div class="container-buttons">
               
               <button id="lightContrastColorsButton" class="content-button" role="button" aria-label="Contraste claro"
                  title="Contraste claro" tabindex="0">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                  </div>
                  <span>Light Contrast</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
               <button id="darkContrastColorsButton" class="content-button" role="button" aria-label="Contraste escuro"
                  title="Contraste escuro" tabindex="0">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                  </div>
                  <span>Dark Contrast</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
               <button id="highContrastColorsButton" class="content-button" role="button" aria-label="Contraste alto"
                  title="Contraste alto" tabindex="0">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                  </div>
                  <span>High Contrast</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
               
            </div>
            
            
            
            <div class="container-buttons">
               <button id="highSaturationColorsButton" class="content-button" role="button" aria-label="Contraste alto"
                  title="Contraste alto" tabindex="0">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                  </div>
                  <span>High Saturation</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
               <button id="lowSaturationColorsButton" class="content-button" role="button" aria-label="Contraste alto"
                  title="Contraste alto" tabindex="0">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                  </div>
                  <span>Low Saturation</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
                <button id="monochromaticColorsButton" class="content-button" role="button" aria-label="Contraste alto"
                  title="Monocromatico" tabindex="0" style="line-break: anywhere;">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                  </div>
                  <span>Monochromatic</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
            </div>
            
            <div class="container-buttons">
               <button id="redDefButton" class="content-button" role="button" aria-label="Deficiencia de vermelho"
                  title="Deficiencia de vermelho" tabindex="0" style="line-break: anywhere;">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                  </div>
                  <span>Protanomaly</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
               <button id="greenDefButton" class="content-button" role="button" aria-label="Deficiencia de verde"
                  title="Deficiencia de verde" tabindex="0" style="line-break: anywhere;">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                  </div>
                  <span>Deuteranomaly</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
                <button id="blueDefButton" class="content-button" role="button" aria-label="Deficiencia de azul"
                  title="Deficiencia de azul" tabindex="0" style="line-break: anywhere;">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                  </div>
                  <span>Tritanomaly</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
            </div>
            
            <div data-test="adjustTextColor" class="range-container">
            
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            
                <div class="title-container">
                  <label for="letterSpacingSlide" class="slider-icon-title">
                     <span class="slider-title">Adjust Text Colors</span>
                  </label>
               </div>
               <div class="color-picker">
               
                   <button class="color-pick" aria-label="Change Color to Blue"
                    tabindex="0" 
                    style="background-color: rgb(0, 118, 180)">
                   
                    </button>
                    
                    <button class="color-pick" aria-label="Change Color to Purple"
                    tabindex="0" 
                    style="background-color: rgb(122, 84, 156)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Red"
                    tabindex="0" 
                    style="background-color: rgb(200, 55, 51)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Orange"
                    tabindex="0" 
                    style="background-color: rgb(208, 112, 33)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Teal"
                    tabindex="0" 
                    style="background-color: rgb(38, 153, 159)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Green"
                    tabindex="0" 
                    style="background-color: rgb(77, 120, 49)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to White"
                    tabindex="0" 
                    style="background-color: rgb(255, 255, 255)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Black"
                    tabindex="0" 
                    style="background-color: rgb(0, 0, 0)"></button>
                
               </div>
               
                <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                </div>
               
               <a href="#" class="link-default-color">Default</a>
               
            </div>
            <div data-test="adjustTitleColor" class="range-container">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            
                <div class="title-container">
                  <label for="letterSpacingSlide" class="slider-icon-title">
                     <span class="slider-title">Adjust Title Colors</span>
                  </label>
               </div>
               <div class="color-picker">
               
                   <button class="color-pick" aria-label="Change Color to Blue"
                    tabindex="0" 
                    style="background-color: rgb(0, 118, 180)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Purple"
                    tabindex="0" 
                    style="background-color: rgb(122, 84, 156)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Red"
                    tabindex="0" 
                    style="background-color: rgb(200, 55, 51)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Orange"
                    tabindex="0" 
                    style="background-color: rgb(208, 112, 33)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Teal"
                    tabindex="0" 
                    style="background-color: rgb(38, 153, 159)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Green"
                    tabindex="0" 
                    style="background-color: rgb(77, 120, 49)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to White"
                    tabindex="0" 
                    style="background-color: rgb(255, 255, 255)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Black"
                    tabindex="0" 
                    style="background-color: rgb(0, 0, 0)"></button>
                
               </div>
               
                <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                </div>
                
               <a href="#" class="link-default-color">Default</a>

               
            </div>
            <div data-test="adjustBackgroundColor" class="range-container">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            
                <div class="title-container">
                  <label for="letterSpacingSlide" class="slider-icon-title">
                     <span class="slider-title">Adjust Background Colors</span>
                  </label>
               </div>
               <div class="color-picker">
               
                   <button class="color-pick" aria-label="Change Color to Blue"
                    tabindex="0" 
                    style="background-color: rgb(0, 118, 180)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Purple"
                    tabindex="0" 
                    style="background-color: rgb(122, 84, 156)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Red"
                    tabindex="0" 
                    style="background-color: rgb(200, 55, 51)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Orange"
                    tabindex="0" 
                    style="background-color: rgb(208, 112, 33)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Teal"
                    tabindex="0" 
                    style="background-color: rgb(38, 153, 159)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Green"
                    tabindex="0" 
                    style="background-color: rgb(77, 120, 49)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to White"
                    tabindex="0" 
                    style="background-color: rgb(255, 255, 255)"></button>
                    
                    <button class="color-pick" aria-label="Change Color to Black"
                    tabindex="0" 
                    style="background-color: rgb(0, 0, 0)"></button>
                
               </div>
               
                <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                </div>
                
               <a href="#" class="link-default-color">Default</a>
               
               
            </div>
         </div>
      </div>
     
      <div class="scrollable-content">
        <div class="title">
            <span>Orientation</span>
            <span class="contentButton">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down">
                  <path d="m6 9 6 6 6-6"></path>
               </svg>
            </span>
        </div>
        
        <div class="content-buttons">
        <div class="container-buttons">
               <button id="textEnlargeButton" class="content-button" role="button" aria-label="Ampliador de Texto"
                tabindex="0">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-in">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                        <line x1="11" x2="11" y1="8" y2="14"></line>
                        <line x1="8" x2="14" y1="11" y2="11"></line>
                     </svg>
                  </div>
                  <span>Text Magnifier</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
               
               
                <button id="initVlibrasButton" class="content-button" role="button" aria-label="Deficiencia de azul"
                  title="Deficiencia de azul" tabindex="0" style="line-break: anywhere;">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  
                  <div class="icon">
                  </div>
                  <span>Vlibras</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
               
               
               <button id="highlightHoverButton" class="content-button" role="button" aria-label="Highlight Hover"
                  title="Highlight Hover" tabindex="0">
                  
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>

                  
                  <div class="icon">
                  </div>
                  <span>Highlight Hover</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
         </div>
         
         <div class="container-buttons">
         
         
             <button id="highlightButtonsButton" class="content-button" role="button" aria-label="Highlight Buttons"
                      title="Highlight Buttons" tabindex="0">


                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>

                      <div class="icon">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-dashed-mouse-pointer">
                            <path d="M5 3a2 2 0 0 0-2 2"></path>
                            <path d="M19 3a2 2 0 0 1 2 2"></path>
                            <path d="m12 12 4 10 1.7-4.3L22 16Z"></path>
                            <path d="M5 21a2 2 0 0 1-2-2"></path>
                            <path d="M9 3h1"></path>
                            <path d="M9 21h2"></path>
                            <path d="M14 3h1"></path>
                            <path d="M3 9v1"></path>
                            <path d="M21 9v2"></path>
                            <path d="M3 14v1"></path>
                         </svg>
                      </div>
                      <span>Highlight Buttons</span>


                      <div class="tooltip-content">
                        Faz um highlight nos botões.
                        <span class="tooltip-arrow"></span>
                      </div>

                   </button>
         
         
                <button id="highlightTitlesButton" class="content-button" role="button" aria-label="Highlight Titles"
                  title="Highlight Titles" tabindex="0">
                  
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>

                  
                  <div class="icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-text-select">
                        <path d="M5 3a2 2 0 0 0-2 2"></path>
                        <path d="M19 3a2 2 0 0 1 2 2"></path>
                        <path d="M21 19a2 2 0 0 1-2 2"></path>
                        <path d="M5 21a2 2 0 0 1-2-2"></path>
                        <path d="M9 3h1"></path>
                        <path d="M9 21h1"></path>
                        <path d="M14 3h1"></path>
                        <path d="M14 21h1"></path>
                        <path d="M3 9v1"></path>
                        <path d="M21 9v1"></path>
                        <path d="M3 14v1"></path>
                        <path d="M21 14v1"></path>
                        <line x1="7" x2="15" y1="8" y2="8"></line>
                        <line x1="7" x2="17" y1="12" y2="12"></line>
                        <line x1="7" x2="13" y1="16" y2="16"></line>
                     </svg>
                  </div>
                  <span>Highlight Titles</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
               <button id="highlightLinksButton" class="content-button" role="button" aria-label="Highlight Links"
                  title="Highlight Links" tabindex="0">
                  
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                        position: absolute;
                        left: 10px;
                        top: 8px;
                    "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>

                  
                  <div class="icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link-2">
                        <path d="M9 17H7A5 5 0 0 1 7 7h2"></path>
                        <path d="M15 7h2a5 5 0 1 1 0 10h-2"></path>
                        <line x1="8" x2="16" y1="12" y2="12"></line>
                     </svg>
                  </div>
                  <span>Highlight Links</span>
                  
                  <div class="tooltip-content">
                        Descrição de tooltip teste.
                        <span class="tooltip-arrow"></span>
                   </div>
                  
               </button>
               
          </div>
        
                <div class="container-buttons">
                <button id="highlightFocusButton" class="content-button" role="button" aria-label="Highlight Focus"
                          title="Highlight Focus" tabindex="0">
                          
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6eff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" style="
                                position: absolute;
                                left: 10px;
                                top: 8px;
                            "><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
        
                          
                          <div class="icon">
                          </div>
                          <span>Highlight Focus</span>
                          
                          <div class="tooltip-content">
                                Descrição de tooltip teste.
                                <span class="tooltip-arrow"></span>
                           </div>
                          
                       </button>
               </div>
        
        </div>
        
      </div>
      
   </div>
</div>
<div id="modal-hide" class="app-window" role="application" aria-label="Modal para esconder Widget">
   <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 20px;">
      <div style="
         width: 60px;
         height: 60px;
         ">
         <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
               <path fill="#000000" fill-rule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm10.01 4a1 1 0 01-1 1H10a1 1 0 110-2h.01a1 1 0 011 1zM11 6a1 1 0 10-2 0v5a1 1 0 102 0V6z"></path>
            </g>
         </svg>
      </div>
      <h3 style="text-align: center; margin-top: 7px;">Tem certeza que deseja ocultar a interface de usabilidade?</h3>
      <span style="
         border-bottom: 1px solid #ccc;
         padding-bottom: 15px;
         color: #909090;
         font-size: 13px;
         ">Optar por ocultar a interface de acessibilidade implica que você não será mais capaz de visualizá-la, a menos que limpe seu histórico de navegação.</span>
      <div style="
         display: flex;
         justify-content: center;
         align-items: center;
         margin-top: 20px;
         gap: 1rem;
         ">
         <button id="cancelHide" type="button" class="button-modal">Não, quero manter</button>
         <button id="submitHide" type="button" class="button-modal button-submit-modal">
            <span id="msgBtnDisable">Sim, quero desativar</span>
            <div id="loading-bar-spinner" class="spinner">
               <div class="spinner-icon"></div>
            </div>
         </button>
      </div>
   </div>
</div>
    `;

        expandWindow.style.opacity = '0';
        expandWindow.style.visibility = 'hidden';
        expandWindow.style.position = 'fixed';
        expandWindow.style.left = '0';
        expandWindow.style.top = '0';
        expandWindow.style.zIndex = '2147483649';
        expandWindow.style.width = '100%';
        expandWindow.style.height = '100%';

        shadowRoot.innerHTML = '<button id="accessibilityButton" class="accessibility-button">' +
            '<svg fill="#FFF" width="50px" height="50px" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" stroke="#FFF" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.288"></g><g id="SVGRepo_iconCarrier"><path d="M9.5,3.5A2.5,2.5,0,1,1,12,6,2.5,2.5,0,0,1,9.5,3.5ZM20,7H4A1,1,0,0,0,4,9H9V22a1,1,0,0,0,2,0V15h2v7a1,1,0,0,0,2,0V9h5a1,1,0,0,0,0-2Z"></path></g></svg>' +
            '</button>';


        shadowRoot.appendChild(expandWindow);
        document.body.appendChild(host);

    }

    function initializeVlibras() {

        // Função para carregar e executar scripts dinamicamente
        function loadScript(src, integrity, callback) {
            let s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.onload = callback;
            s.integrity = integrity;
            s.crossOrigin = 'anonymous';
            (document.querySelector('head') || document.body).appendChild(s);
        }

// Adiciona o HTML necessário para o VLibras
        function addVLibrasHTML() {
            let vLibrasDiv = document.createElement('div');
            vLibrasDiv.setAttribute('vw', 'class');
            vLibrasDiv.className = 'enabled';
            vLibrasDiv.id = "vlibras";
            vLibrasDiv.style.display = 'none';
            // vLibrasDiv.style.zIndex = '9998 !important;'

            vLibrasDiv.innerHTML = `
        <div vw-access-button class="active" id="vlibrasclick"></div>
        <div vw-plugin-wrapper>
            <div class="vw-plugin-top-wrapper"></div>
        </div>
    `;

            document.body.appendChild(vLibrasDiv);
        }

        addVLibrasHTML();

        loadScript('https://vlibras.gov.br/app/vlibras-plugin.js',
            'sha384-BgTCwEnvz5TBHffFIh8rpuoS2JY0MrUi+c19zh5wX25LzCTe/74tMbSX9YaOIDe9',
            function () {
                new window.VLibras.Widget('https://vlibras.gov.br/app');
            });
    }

    function assignFunctionsToIds() {

        let shadowR = document.getElementById("shadow").shadowRoot;
        const rangeButtons = shadowR.querySelectorAll('.minus-button, .plus-button');

        rangeButtons.forEach(elemento => {
            elemento.addEventListener('click', () => {

                //elemento que deve se trocar o texto
                // let percentageElement = elemento.offsetParent.children[1];
                let percentAcrescentar;

                if (elemento.className.includes('minus-button')) {
                    percentAcrescentar = -10;

                } else if (elemento.className.includes('plus-button')) {
                    percentAcrescentar = 10;
                }

                const elementoPai = elemento.parentNode.parentNode;
                let func = elementoPai.getAttribute('func');

                if (func === FONT_SIZE_KEY) {
                    percentAcrescentar = currentFontSize != null ? currentFontSize.percentage + percentAcrescentar : percentAcrescentar;
                    updateFontSizeSlide(percentAcrescentar);
                } else if (func === ZOOM_KEY) {
                    percentAcrescentar = currentZoom != null ? currentZoom.percentage + percentAcrescentar : percentAcrescentar;
                    updateZoomSlide(percentAcrescentar);
                } else if (func === LINE_HEIGHT_KEY) {
                    percentAcrescentar = currentLineHeight != null ? currentLineHeight.percentage + percentAcrescentar : percentAcrescentar;
                    updateLineHeightSlide(percentAcrescentar);
                } else if (func === LETTER_SPACING_KEY) {
                    percentAcrescentar = currentLetterSpacing != null ? currentLetterSpacing.percentage + percentAcrescentar : percentAcrescentar;
                    updateLetterSpacingSlide(percentAcrescentar);
                }

            });
        });


//    BOTÃO ABRIR WIDGET

        expandButton = shadowR.querySelector("#accessibilityButton");
        expandButton.addEventListener('click', toggleExpandWindow);

//
//     //HEADER
//

        closeButton = shadowR.querySelector("#closeButton");
        closeButton.addEventListener('click', toggleExpandWindow);

        resetButton = shadowR.querySelector("#resetButton");
        resetButton.addEventListener('click', clearLocalStorage);

        createshortcutsButton = shadowR.querySelector("#createshortcuts");
        createshortcutsButton.addEventListener('click', () => {
            alert('Não esta pronto ainda, meu chapinha!');
        });

        hideButton = shadowR.querySelector("#hideButton");
        hideButton.addEventListener('click', () => {

            const appWindow = shadowR.querySelector("#appWindow");
            appWindow.style.setProperty('background', 'rgb(0 0 0 / 30%)', 'important');

            const modal = shadowR.querySelector("#modal-hide");
            modal.style.setProperty('opacity', '1', 'important');
            modal.style.setProperty('visibility', 'visible', 'important');
            modal.style.setProperty('transform', 'translate(-50%, -20%)', 'important');
        });

//
//     //TITLE
//
        contentButton = shadowR.querySelectorAll('.contentButton');
        contentButton.forEach(elemento => {
            elemento.addEventListener('click', () => {

                let content = elemento.parentElement.parentElement.children[1];
                if (content.classList.contains('active')) {
                    content.classList.remove('active')
                    elemento.style.setProperty('transform', 'rotate(90deg)', 'important');
                } else {
                    content.classList.toggle('active');
                    elemento.style.setProperty('transform', 'rotate(0deg)', 'important');
                }

            });
        });


        //FUNCIONALIDADES

        textEnlargeButton = shadowR.querySelector("#textEnlargeButton");
        textEnlargeButton.addEventListener('click', updateTextMagnifier);

        hlHeading = shadowR.querySelector("#highlightTitlesButton");
        hlHeading.addEventListener('click', highlightHeading);

        highlightLinksButton = shadowR.querySelector("#highlightLinksButton");
        highlightLinksButton.addEventListener('click', highlightLinks);

        highlightButtonsButton = shadowR.querySelector("#highlightButtonsButton");
        highlightButtonsButton.addEventListener('click', highlightButtons);

        highlightHoverButton = shadowR.querySelector("#highlightHoverButton");
        highlightHoverButton.addEventListener('click', setHighlightHover);

        highlightFocusButton = shadowR.querySelector("#highlightFocusButton");
        highlightFocusButton.addEventListener('click', setHighlightFocus);

        readableFontButton = shadowR.querySelector("#readableFontButton");
        readableFontButton.addEventListener('click', () => {
            changeFontFamily(1);
        });

        friendlyDyslexiaButton = shadowR.querySelector("#friendlyDyslexiaButton");
        friendlyDyslexiaButton.addEventListener('click', () => {
            changeFontFamily(2);
        });

        alignLeft = shadowR.querySelector("#alignLeft");
        alignLeft.addEventListener('click', () => {
            changeAlignText(1);
        });

        alignCenter = shadowR.querySelector("#alignCenter");
        alignCenter.addEventListener('click', () => {
            changeAlignText(2);
        });

        alignRight = shadowR.querySelector("#alignRight");
        alignRight.addEventListener('click', () => {
            changeAlignText(3);
        });


//    COLORS
        invertedColorsButton = shadowR.querySelector("#invertedColorsButton");
        invertedColorsButton.addEventListener('click', () => {
            changeColorContrast(1, document.activeElement.parentElement.parentElement)
        });

        intelligentInvertedColorsButton = shadowR.querySelector("#intelligentInvertedColorsButton");
        intelligentInvertedColorsButton.addEventListener('click', () => {
            changeColorContrast(2, document.activeElement.parentElement.parentElement)
        });


        lightContrastColorsButton = shadowR.querySelector("#lightContrastColorsButton");
        lightContrastColorsButton.addEventListener('click', () => {
            changeColorContrast(3, document.activeElement.parentElement.parentElement)
        });

        darkContrastColorsButton = shadowR.querySelector("#darkContrastColorsButton");
        darkContrastColorsButton.addEventListener('click', () => {
            changeColorContrast(4, document.activeElement.parentElement.parentElement)
        });

        highContrastColorsButton = shadowR.querySelector("#highContrastColorsButton");
        highContrastColorsButton.addEventListener('click', () => {
            changeColorContrast(5, document.activeElement.parentElement.parentElement)
        });


        highSaturationColorsButton = shadowR.querySelector("#highSaturationColorsButton");
        highSaturationColorsButton.addEventListener('click', () => {
            changeColorSaturation(1, document.activeElement.parentElement.parentElement)
        });

        lowSaturationColorsButton = shadowR.querySelector("#lowSaturationColorsButton");
        lowSaturationColorsButton.addEventListener('click', () => {
            changeColorSaturation(2, document.activeElement.parentElement.parentElement)
        });

        monochromaticColorsButton = shadowR.querySelector("#monochromaticColorsButton");
        monochromaticColorsButton.addEventListener('click', () => {
            changeColorSaturation(3, document.activeElement.parentElement.parentElement)
        });

        redDefButton = shadowR.querySelector("#redDefButton");
        redDefButton.addEventListener('click', () => {
            changeDaltonismFilter(1, document.activeElement.parentElement.parentElement);
        });

        greenDefButton = shadowR.querySelector("#greenDefButton");
        greenDefButton.addEventListener('click', () => {
            changeDaltonismFilter(2, document.activeElement.parentElement.parentElement);
        });

        blueDefButton = shadowR.querySelector("#blueDefButton");
        blueDefButton.addEventListener('click', () => {
            changeDaltonismFilter(3, document.activeElement.parentElement.parentElement);
        });

        initVlibrasButton = shadowR.querySelector("#initVlibrasButton");
        initVlibrasButton.addEventListener('click', () => {
            changeStyleButtonSelected(initVlibrasButton);

            let display = document.getElementById("vlibras").style.display;

            if (display === 'block') {
                document.querySelector('.vpw-header-btn-close').click();
                document.getElementById("vlibras").style.display = "none";
            } else {
                document.getElementById("vlibras").style.display = "block";
                toggleExpandWindow();
                document.getElementById("vlibrasclick").click();
            }

        });


//    MODAL HIDE

        cancelHide = shadowR.querySelector("#cancelHide");
        cancelHide.addEventListener('click', toggleExpandWindow);

        submitHide = shadowR.querySelector("#submitHide");
        submitHide.addEventListener('click', hideWidget);

    }

    function hideWidget() {

        let msg = shadowR.querySelector('#msgBtnDisable');
        let spinner = shadowR.querySelector('#loading-bar-spinner');

        msg.style.setProperty('display', 'none');
        spinner.style.setProperty('display', 'block');

        setTimeout(function () {
            clearLocalStorage();
            setItemToLocalStorageWithExpiry(WIDGET_STATUS_KEY, 'hide', null);
        }, 1500);

    }

    function changeTextAndColorRangeValue(percentAcrescentar, percentageElement) {
        if (percentAcrescentar === 0) {
            percentageElement.style.setProperty('color', '#686868', 'important');
            percentageElement.textContent = 'Default';
        } else {
            percentageElement.style.setProperty('color', '#1A6EFF', 'important');
            percentageElement.textContent = percentAcrescentar + '%';
        }
    }

    function changeStyleButtonSelected(id) {

        if (!id.classList.contains('btn-active')) {
            id.classList.add("btn-active");
        } else {
            id.classList.remove("btn-active");
        }

    }

    function changeStyleButtonSelectedAndDeselectOthers(idActivate, idsDisable) {

        if (idActivate !== null) {
            if (!idActivate.classList.contains('btn-active')) {
                idActivate.classList.add("btn-active");
            } else {
                idActivate.classList.remove("btn-active");
            }
        }

        idsDisable.forEach(function (index) {
            if (index.classList.contains('btn-active')) {
                index.classList.remove("btn-active");
            }
        });

    }

    function toggleExpandWindow() {


        let appWindow = shadowR.querySelector('#appWindow');
        let widget = shadowR.querySelector('#widget');
        let button = shadowR.querySelector('#accessibilityButton');
        let modal = shadowR.querySelector('#modal-hide');

        if (appWindow.style.opacity === '0' || appWindow.style.opacity === '') {


            widget.style.setProperty('transform', 'translate(0, 0)', 'important');


            appWindow.style.setProperty('opacity', '1', 'important');
            appWindow.style.setProperty('visibility', 'visible', 'important');
            button.style.setProperty('display', 'none', 'important');

            appWindow.style.setProperty('background', 'transparent', 'important');
            modal.style.setProperty('opacity', '0', 'important');
            modal.style.setProperty('visibility', 'hidden', 'important');
            modal.style.setProperty('transform', 'translate(-50%, -100%)', 'important');

        } else if (appWindow.style.opacity === '1') {


            widget.style.setProperty('transform', 'translate(0, 50%)', 'important');

            appWindow.style.setProperty('opacity', '0', 'important');
            appWindow.style.setProperty('visibility', 'hidden', 'important');
            button.style.setProperty('display', 'flex', 'important');
            shadowR.querySelector(".content-container").scrollTo({top: 0});

        }

    }

//
// // ******************** FONT SIZE ********************//
//
    function updateFontSizeSlide(defaultPercentage) {


        if (defaultPercentage > 200 || defaultPercentage < -200) {
            return;
        }

        const lastLeafElementsWithText = getLastLeafElementsWithText();
        lastLeafElementsWithText.forEach(function (txtTag) {

            if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
                // Aplique os estilos apenas se não pertencer à classe 'app-window'
                let attName = txtTag.getAttribute('original-size');
                let initialSize = parseInt(attName);
                let newSize = initialSize + (initialSize * defaultPercentage / 100);
                txtTag.style.setProperty('font-size', newSize + 'px', 'important');
            }


        });

        const plusDays = addDays(new Date(), 2).getTime();
        currentFontSize = {
            value: null,
            percentage: defaultPercentage,
            expiry: plusDays
        }

        setItemToLocalStorageWithExpiry(FONT_SIZE_KEY,
            currentFontSize.value,
            currentFontSize.percentage);

        const percentageElement = shadowR.querySelector(`[func="${FONT_SIZE_KEY}"]`).children[2]
            .getElementsByClassName('base-range')[0];
        changeTextAndColorRangeValue(defaultPercentage, percentageElement);

    }

    function loadFontSize() {

        const lastLeafElementsWithText = getLastLeafElementsWithText();

        lastLeafElementsWithText.forEach(function (txtTag) {

            let attName = txtTag.getAttribute('original-size');
            if (attName == null) {
                txtTag.setAttribute('original-size', parseInt(window.getComputedStyle(txtTag).fontSize));
            }

            if (currentFontSize != null) {
                if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
                    let initialSize = parseInt(txtTag.getAttribute('original-size'));
                    let newSize = initialSize + (initialSize * currentFontSize.percentage / 100);
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
        letterSpacing = (letterSpacing / 100);
        return letterSpacing;
    }

    function updateZoomSlide(percentage) {

        if (percentage > 200 || percentage < -200) {
            return;
        }

        let zoom = calculateZoomPercentageInPixels(percentage);

        let tagsDoPrimeiroNivel = getFirstChildElementsBelowBody();
        tagsDoPrimeiroNivel.forEach(function (txtTag) {

            if (!txtTag.closest('.app-window')
                && !txtTag.closest('.accessibility-button') && txtTag.id !== 'appWindow'
                && txtTag.id !== 'shadow') {
                txtTag.style.zoom = zoom;
            }

        });

        const plusDays = addDays(new Date(), 2).getTime();
        currentZoom = {
            value: zoom,
            percentage: percentage,
            expiry: plusDays
        }

        setItemToLocalStorageWithExpiry(ZOOM_KEY,
            currentZoom.value,
            currentZoom.percentage);


        const percentageElement = shadowR.querySelector(`[func="${ZOOM_KEY}"]`).children[2]
            .getElementsByClassName('base-range')[0];
        changeTextAndColorRangeValue(percentage, percentageElement);


    }

    function loadZoom() {
        if (currentZoom !== null) {
            updateZoomSlide(currentZoom.percentage);
        }
    }

// ******************** LINE HEIGHT ********************//

    function updateLineHeightSlide(percentage) {

        if (percentage > 200 || percentage < -200) {
            return;
        }

        const lastLeafElementsWithText = getLastLeafElementsWithText();

        lastLeafElementsWithText.forEach(function (txtTag) {

            let attName = txtTag.getAttribute('original-line-height');
            if (attName == null) {
                txtTag.setAttribute('original-line-height',
                    isNaN(parseInt(window.getComputedStyle(txtTag).lineHeight)) ? getLineHeightInPixelsIfText(txtTag) : window.getComputedStyle(txtTag).lineHeight);
            }


            if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
                let lineHeightVal = parseFloat(window.getComputedStyle(txtTag).lineHeight);
                let lineHeightFormated = isNaN(lineHeightVal) ? getLineHeightInPixelsIfText(txtTag) : lineHeightVal;

                let attName = txtTag.getAttribute('original-line-height');
                let initialSize = parseInt(attName);

                if (initialSize !== null) {
                    lineHeightFormated = initialSize;
                }

                txtTag.style.setProperty('line-height', lineHeightFormated + (lineHeightFormated * percentage / 100) + 'px', 'important');
            }


        });

        const plusDays = addDays(new Date(), 2).getTime();
        currentLineHeight = {
            value: null,
            percentage: percentage,
            expiry: plusDays
        }

        setItemToLocalStorageWithExpiry(LINE_HEIGHT_KEY,
            null,
            percentage);


        const percentageElement = shadowR.querySelector(`[func="${LINE_HEIGHT_KEY}"]`).children[2]
            .getElementsByClassName('base-range')[0];
        changeTextAndColorRangeValue(percentage, percentageElement);

    }


    function loadLineHeight() {
        if (currentLineHeight !== null) {
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

        if (percentage > 200 || percentage < -200) {
            return;
        }

        let letterSpacingAdd = calculateLetterSpacingInPixels(percentage);

        const lastLeafElementsWithText = getLastLeafElementsWithText();
        lastLeafElementsWithText.forEach(function (txtTag) {

            let attName = txtTag.getAttribute('original-letter-spacing');
            if (attName == null) {
                txtTag.setAttribute('original-letter-spacing',
                    isNaN(parseInt(window.getComputedStyle(txtTag).letterSpacing)) ? 0 : window.getComputedStyle(txtTag).letterSpacing);
            }

            if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
                let letterSpacingVal = parseFloat(window.getComputedStyle(txtTag).letterSpacing);
                let letterSpacingFormated = isNaN(letterSpacingVal) ? 0 : letterSpacingVal;

                let attName = txtTag.getAttribute('original-letter-spacing');
                let initialSize = parseFloat(attName);

                if (initialSize !== null) {
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

        setItemToLocalStorageWithExpiry(LETTER_SPACING_KEY,
            null,
            percentage);


        const percentageElement = shadowR.querySelector(`[func="${LETTER_SPACING_KEY}"]`).children[2]
            .getElementsByClassName('base-range')[0];
        changeTextAndColorRangeValue(percentage, percentageElement);

    }


    function loadLetterSpacing() {
        if (currentLetterSpacing !== null) {
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
                if (((!shouldBeRemoved(element) && element.children.length === 0))
                    && element.textContent.trim() !== "") {

                    if (!element.closest('.app-window') && !element.closest('.accessibility-button')) {
                        element.addEventListener("mouseover", mostrarBalao);
                        element.addEventListener("mouseout", esconderBalao);
                    }

                }
                //QUANDO POSSUIR FILHOS
                else {

                    //POSSUI CONTEUDO
                    if (element.textContent.trim() !== "" && !element.classList.contains('app-window') && element.id !== 'appWindow'
                        && (tagsQueDevemMostrarBalaoMesmoComMaisDeUmItem.includes(element.tagName.toLowerCase()))) {
                        element.addEventListener("mouseover", mostrarBalao);
                        element.addEventListener("mouseout", esconderBalao);
                    }

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
        balao.style.padding = "10px";
        balao.style.backgroundColor = "rgba(51, 51, 51, 0.8)"; /* Fundo escurecido */
        balao.style.color = "white"; /* Texto branco */
        balao.style.borderRadius = "5px";
        balao.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
        balao.style.fontSize = "40px"; /* Tamanho da fonte aumentado (ajuste conforme necessário) */
        balao.style.position = "absolute";
        balao.style.zIndex = 999999;
        balao.style.maxWidth = '700px';
        balao.style.visibility = 'hidden';
        balao.style.display = 'none';
        document.body.appendChild(balao);
        return balao;
    }


// Função para atualizar a posição do balão
    function atualizarPosicaoBalao(event, balao) {
        // Leva em consideração a posição do scroll
        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        // Calcula a posição horizontal do cursor do mouse em relação ao centro da tela
        const cursorXFromCenter = event.clientX - window.innerWidth / 2;

        // Define a posição do balão perto do cursor do mouse considerando o scroll
        if (cursorXFromCenter >= 0) {
            // Cursor à direita do centro da tela, posicione o balão à esquerda do cursor
            balao.style.left = (event.clientX + scrollX - balao.offsetWidth - 10) + "px";
        } else {
            // Cursor à esquerda do centro da tela, posicione o balão à direita do cursor
            balao.style.left = (event.clientX + scrollX + 10) + "px";
        }

        balao.style.top = (event.clientY + scrollY + 10) + "px";
    }

// Função para mostrar o balão com o texto maior
    function mostrarBalao(event) {

        let textMagnifier = getItemFromLocalStorageWithExpiry("text-magnifier");

        if (textMagnifier == null) {
            return;
        }

        // Obtém ou cria o elemento do balão
        let balao = document.querySelector(".balao");

        // Obtém o conteúdo com base no tipo de tag
        let conteudo;
        conteudo = event.target.textContent;

        // Define o conteúdo no balão
        balao.innerHTML = conteudo;

        // Atualiza a posição do balão
        atualizarPosicaoBalao(event, balao);

        // Exibe o balão
        balao.style.visibility = "visible";

        // Adiciona o evento de movimento do mouse para atualizar a posição do balão
        document.addEventListener("mousemove", function (event) {
            atualizarPosicaoBalao(event, balao);
        });
    }

// Função para esconder o balão ao retirar o mouse
    function esconderBalao() {
        let balao = document.querySelector(".balao");
        if (balao) {
            balao.style.visibility = "hidden";
            // Remove o evento de movimento do mouse
            document.removeEventListener("mousemove", atualizarPosicaoBalao);
        }
    }

    function updateTextMagnifier() {

        // Se a funcionalidade for desativada, esconde o balão
        let balao = document.querySelector(".balao");
        if (balao.style.display === 'block') {
            balao.style.setProperty('display', 'none', 'important');
            removeItemFromLocalStorage(TEXT_MAGNIFIER_KEY);

        } else {
            balao.style.setProperty('display', 'block', 'important');
            setItemToLocalStorageWithExpiry(TEXT_MAGNIFIER_KEY,
                true,
                null);
            getElementCursorHover();
        }
        changeStyleButtonSelected(textEnlargeButton);
    }

    function loadTextMagnifier() {

        criarBalao();

        if (textMagnifier !== null) {
            updateTextMagnifier();
        }

    }


    function changeAlignText(direction) {

        let textAlignSaved = getItemFromLocalStorageWithExpiry("text-align");

        if (textAlignSaved !== null && textAlignSaved.value === direction) {
            indexActualTextAlign = 0;
        } else {
            indexActualTextAlign = direction;
        }

        setAlignText();

        if (indexActualTextAlign === 0) {
            removeItemFromLocalStorage(TEXT_ALIGN_KEY);
        } else {
            setItemToLocalStorageWithExpiry(TEXT_ALIGN_KEY,
                indexActualTextAlign,
                null);
        }

    }


    function setAlignText() {

        if (indexActualTextAlign !== null) {

            let selectedAlignText = aligns[indexActualTextAlign];
            let elements = getLastLeafElementsWithText();

            for (let element of elements) {

                if (!element.closest('.app-window') && !element.closest('.accessibility-button')) {
                    // Aplique os estilos apenas se não pertencer à classe 'app-window'
                    element.style.setProperty('text-align', selectedAlignText, 'important');
                }

                if (selectedAlignText === '') {
                    removeItemFromLocalStorage(TEXT_ALIGN_KEY);

                }

            }

            setItemToLocalStorageWithExpiry(TEXT_ALIGN_KEY,
                indexActualTextAlign,
                null);


            if (indexActualTextAlign === 1) {
                changeStyleButtonSelectedAndDeselectOthers(alignLeft, [alignCenter, alignRight])
            } else if (indexActualTextAlign === 2) {
                changeStyleButtonSelectedAndDeselectOthers(alignCenter, [alignLeft, alignRight])
            } else if (indexActualTextAlign === 3) {
                changeStyleButtonSelectedAndDeselectOthers(alignRight, [alignLeft, alignCenter])
            } else {
                changeStyleButtonSelectedAndDeselectOthers(null, [alignLeft, alignCenter, alignRight])
            }


        }

    }


    function highlightHeading() {

        let txtTags = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

        // Iterar sobre cada tag <h1> e alterar sua cor para vermelho
        txtTags.forEach(function (txtTag) {

            let attName = txtTag.getAttribute('data-inclowee-hlh-styled');

            if (attName == null) {

                txtTag.style.setProperty('outline', 'rgb(20, 111, 248) solid 2px', 'important');
                txtTag.style.setProperty('outline-offset', '2px', 'important');

                txtTag.setAttribute('data-inclowee-hlh-styled', 'true');
                setItemToLocalStorageWithExpiry(HIGHLIGHT_HEADINGS_KEY,
                    true,
                    null);

            } else {

                txtTag.style.outline = '';
                txtTag.style.outlineOffset = '';

                txtTag.removeAttribute("data-inclowee-hlh-styled");
                removeItemFromLocalStorage(HIGHLIGHT_HEADINGS_KEY);
            }

        });

        changeStyleButtonSelected(hlHeading);

    }


    function loadHighlightHeading() {

        if (hightlightHeadings != null) {
            highlightHeading();
        }
    }

    function highlightLinks() {

        let txtTags = document.querySelectorAll('a');

        // Iterar sobre cada tag <h1> e alterar sua cor para vermelho
        txtTags.forEach(function (txtTag) {

            let attName = txtTag.getAttribute('data-inclowee-hll-styled');

            if (attName == null) {

                txtTag.style.setProperty('outline', '2px solid rgba(255, 114, 22, 0.5)', 'important');
                txtTag.style.setProperty('outline-offset', '2px', 'important');

                txtTag.setAttribute('data-inclowee-hll-styled', 'true');
                setItemToLocalStorageWithExpiry(HIGHLIGHT_LINKS_KEY,
                    true,
                    null);

            } else {

                txtTag.style.outline = '';
                txtTag.style.outlineOffset = '';

                txtTag.removeAttribute("data-inclowee-hll-styled");
                removeItemFromLocalStorage(HIGHLIGHT_LINKS_KEY);
            }

        });

        changeStyleButtonSelected(highlightLinksButton);


    }

    function loadHighlightLinks() {

        if (hightlightLinks != null) {
            highlightLinks();
        }

    }

    function highlightButtons() {

        let txtTags = document.querySelectorAll('button, input[type="button"], input[type="submit"], [role="button"]');

        // Iterar sobre cada tag <h1> e alterar sua cor para vermelho
        txtTags.forEach(function (txtTag) {

            let attName = txtTag.getAttribute('data-inclowee-hlb-styled');

            if (attName == null) {

                if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {

                    txtTag.style.setProperty('outline', '2px solid rgba(255, 114, 22, 0.5)', 'important');
                    txtTag.style.setProperty('outline-offset', '2px', 'important');


                    txtTag.setAttribute('data-inclowee-hlb-styled', 'true');
                    setItemToLocalStorageWithExpiry(HIGHLIGHT_BUTTONS_KEY,
                        true,
                        null);

                }

            } else {

                txtTag.style.outline = '';
                txtTag.style.outlineOffset = '';

                txtTag.removeAttribute("data-inclowee-hlb-styled");
                removeItemFromLocalStorage(HIGHLIGHT_BUTTONS_KEY);
            }

        });

        changeStyleButtonSelected(highlightButtonsButton);

    }

    function loadHighlightButtons() {

        if (hightlightButtons != null) {
            highlightButtons();
        }

    }

    function changeFontFamily(font) {

        let fontFam = getItemFromLocalStorageWithExpiry("font-family");

        if (fontFam !== null && fontFam.value === font) {
            indexActualFontFamily = 0;
        } else {
            indexActualFontFamily = font;
        }

        setFontFamily();

        if (indexActualFontFamily === 0) {
            removeItemFromLocalStorage(FONT_FAMILY_KEY);
        } else {
            setItemToLocalStorageWithExpiry(FONT_FAMILY_KEY,
                indexActualFontFamily,
                null);
        }


    }

    function setFontFamily() {

        if (indexActualFontFamily !== null) {


            let selectedFontFamily = fontes[indexActualFontFamily];
            let elements = document
                .querySelectorAll('li, a, p, h1, span, h2, h3, h4, h5, h6, input[type="button"], button, input[type="submit"]');
            for (let element of elements) {

                if (!element.closest('.app-window') && !element.closest('.accessibility-button')) {
                    // Aplique os estilos apenas se não pertencer à classe 'app-window'
                    element.style.setProperty('font-family', selectedFontFamily, 'important');
                }

                if (selectedFontFamily === '') {
                    removeItemFromLocalStorage(FONT_FAMILY_KEY);
                }

            }

            setItemToLocalStorageWithExpiry(FONT_FAMILY_KEY,
                indexActualFontFamily,
                null);


            if (indexActualFontFamily === 1) {
                changeStyleButtonSelectedAndDeselectOthers(readableFontButton, [friendlyDyslexiaButton])
            } else if (indexActualFontFamily === 2) {
                changeStyleButtonSelectedAndDeselectOthers(friendlyDyslexiaButton, [readableFontButton])
            } else {
                changeStyleButtonSelectedAndDeselectOthers(null, [readableFontButton, friendlyDyslexiaButton])
            }


        }

    }

    function createStyleGlobal() {
        // Cria um elemento <style>
        let estiloGlobal = document.createElement('style');
        estiloGlobal.setAttribute("id", "incloowe-style")
        let fonteUrl = require('./assets/fonts/OpenDyslexic-Regular.woff');
        let estilo = document.createTextNode(' @font-face { ' +
            '            font-family: \'OpenDyslexic\'; ' +
            `            src: url(${fonteUrl}) format(\'woff\'); ` +
            '            font-weight: normal; ' +
            '            font-style: normal; ' +
            '        } ' +
            '.inverted { filter: invert(100%) !important; background: #fff !important; } ' +

            '.light-contrast { background-color: #fff !important; color: #181818 !important; } ' +
            'h1.light-contrast, h2.light-contrast, h3.light-contrast, h4.light-contrast, h5.light-contrast, h6.light-contrast { background-color: #fff !important; color: #075f39 !important; } ' +
            'button.light-contrast { background-color: #fff !important; color: #000 !important; border-color: #000 !important; } ' +
            'a.light-contrast { color: #181818 !important; border-color: #181818; background-color:#fff !important; } ' +
            'a.light-contrast:hover { color: #181818 !important; outline: aqua solid 2px !important; outline-offset: 1px !important; background-color:#fff !important; } ' +

            '.dark-contrast { background-color: #181818 !important; color: #fff !important;} ' +
            'h1.dark-contrast, h2.dark-contrast, h3.dark-contrast, h4.dark-contrast, h5.dark-contrast, h6.dark-contrast { color: #50d0a0 !important; } ' +
            'a.dark-contrast { background-color: #181818 !important; color: #fcff3c !important; border-color: #fff; } ' +
            'a.dark-contrast:hover { background-color: #181818 !important; color: #fcff3c !important; outline: rgb(242, 167, 98) solid 2px !important; outline-offset: 1px !important; } ' +
            'button.dark-contrast { background-color: #181818 !important; border-color: #fff !important; outline: rgb(242, 167, 98) solid 2px !important; outline-offset: 1px !important;} ' +

            '.high-saturation { filter: saturate(3) !important; } ' +
            '.low-saturation { filter: saturate(0.5) !important; } ' +
            '.mono-saturation { filter: grayscale(100%) !important; } ' +
            '.protanomaly { filter: url(#protanomaly-filter)}' +
            '.deuteranomaly { filter: url(#deuteranomaly-filter)}' +
            '.tritanomaly { filter: url(#tritanomaly-filter)}' +
            '.hover-active:hover { outline: rgb(20, 111, 248) solid 2px; outline-offset: 2px; }' +
            '.focus-active:focus { outline: rgba(255, 114, 22, 0.5) solid 2px; outline-offset: 2px; }'
        );


        estiloGlobal.appendChild(estilo);

        const estiloFilter = document.createElement('style');
        estiloFilter.setAttribute("id", "filter-incloowe");

        document.head.appendChild(estiloGlobal);
        document.head.appendChild(estiloFilter);
    }


//COLORS
    function loadContrastColors() {
        if (colorsContrast != null) {
            setColorContrast(document.activeElement.parentElement);
        }
    }

    function changeColorContrast(contrast, html) {

        let colorContrastSaved = getItemFromLocalStorageWithExpiry(COLORS_CONTRAST_KEY);

        if (colorContrastSaved !== null && colorContrastSaved.value === contrast) {
            indexActualColorContrast = 0;
        } else {
            indexActualColorContrast = contrast;
        }

        setColorContrast(html);

        if (indexActualColorContrast === 0) {
            removeItemFromLocalStorage(COLORS_CONTRAST_KEY);
        } else {
            setItemToLocalStorageWithExpiry(COLORS_CONTRAST_KEY,
                indexActualColorContrast,
                null);
        }

    }


    function setColorContrast(html) {
        const filterStyle = document.getElementById('filter-incloowe');

        if (indexActualColorContrast !== null) {
            const selectedColorContrast = contrasts[indexActualColorContrast];
            const txtTags = document.querySelectorAll('h1, h2, h3, h4, h5, h6, a, span, blockquote, code, dd, dt, input, label, legend, li, p, pre, select, textarea');
            const buttons = document.querySelectorAll('button');

            const removeContrastClasses = () => {

                filterStyle.innerHTML = '';

                txtTags.forEach(txtTag => {
                    txtTag.classList.remove("light-contrast", "dark-contrast");
                });
                buttons.forEach(button => {
                    button.classList.remove("light-contrast", "dark-contrast");
                });
            };


            html.classList.remove("inverted", "dark-contrast", "light-contrast");
            removeContrastClasses();

            let widget = shadowR.querySelector('#widget');

            switch (selectedColorContrast) {
                case 'inverted':
                    filterStyle.innerHTML = 'body > *:not(#shadow) { filter: invert(100%) !important; background: #fff !important; }';
                    widget.style.filter = 'invert(100%)';
                    widget.style.background = '#fff';

                    break;
                case 'int-inverted':
                    filterStyle.innerHTML = 'body > *:not(#shadow) { filter: invert(100%) !important; background: #fff !important; }' +
                        ' img, video, iframe, picture, svg { filter: invert(1); }';
                    widget.style.filter = 'invert(100%)';
                    widget.style.background = '#fff';

                    break;
                case 'light':
                    filterStyle.innerHTML = 'body > *:not(#shadow) { background-color: #fff !important; color: #181818 !important; }';
                    widget.style.filter = '';
                    widget.style.color = '#181818';
                    widget.style.background = '#fff';

                    txtTags.forEach(txtTag => txtTag.classList.add("light-contrast"));
                    buttons.forEach(button => button.classList.add("light-contrast"));

                    break;
                case 'dark':
                    filterStyle.innerHTML = 'body > *:not(#shadow) { background-color: #181818 !important; color: #fff !important; }';
                    widget.style.filter = '';
                    widget.style.color = '#fff';
                    widget.style.background = '#181818';

                    txtTags.forEach(txtTag => txtTag.classList.add("dark-contrast"));
                    buttons.forEach(button => button.classList.add("dark-contrast"));
                    break;
                case 'high':
                    removeContrastClasses();
                    filterStyle.innerHTML = 'body > *:not(#shadow) { filter: contrast(135%) !important; }';
                    widget.style.filter = 'contrast(135%)';
                    widget.style.color = '#181818';
                    widget.style.background = '#fff';

                    break;
                default:
                    widget.style = 'transform: translate(0px, 0px) !important;';
                    removeContrastClasses();
            }

            const buttonsMap = {
                1: invertedColorsButton,
                2: intelligentInvertedColorsButton,
                3: lightContrastColorsButton,
                4: darkContrastColorsButton,
                5: highContrastColorsButton,
            };
            const selectedButton = buttonsMap[indexActualColorContrast] || null;
            const otherButtons = Object.values(buttonsMap).filter(button => button !== selectedButton);
            changeStyleButtonSelectedAndDeselectOthers(selectedButton, otherButtons);
        }
    }

    function loadSaturationColors() {
        if (colorsSaturation != null) {
            setColorSaturation(document.activeElement.parentElement);
        }
    }

    function changeColorSaturation(saturation, html) {

        let colorSaturationSaved = getItemFromLocalStorageWithExpiry(COLORS_SATURATION_KEY);

        if (colorSaturationSaved !== null && colorSaturationSaved.value === saturation) {
            indexActualColorSaturation = 0;
        } else {
            indexActualColorSaturation = saturation;
        }

        setColorSaturation(html);

        if (indexActualColorSaturation === 0) {
            removeItemFromLocalStorage(COLORS_SATURATION_KEY);
        } else {
            setItemToLocalStorageWithExpiry(COLORS_SATURATION_KEY,
                indexActualColorSaturation,
                null);
        }

    }

    function setColorSaturation(html) {

        if (indexActualColorSaturation !== null) {
            const selectedColorSaturation = saturations[indexActualColorSaturation];
            html.classList.remove("high-saturation", "low-saturation", "mono-saturation");

            switch (selectedColorSaturation) {
                case 'high':
                    html.classList.add("high-saturation");
                    break;
                case 'low':
                    html.classList.add("low-saturation");
                    break;
                case 'mono':
                    html.classList.add("mono-saturation");
                    break;
                default:
                    html.classList.remove("high", "low", "mono");
            }

            const buttonsMap = {
                1: highSaturationColorsButton,
                2: lowSaturationColorsButton,
                3: monochromaticColorsButton
            };
            const selectedButton = buttonsMap[indexActualColorSaturation] || null;
            const otherButtons = Object.values(buttonsMap).filter(button => button !== selectedButton);
            changeStyleButtonSelectedAndDeselectOthers(selectedButton, otherButtons);
        }
    }

    function loadTextColor() {

        if (adjustTextColor != null) {

            let buttons = shadowR.querySelectorAll('div[data-test="adjustTextColor"]')[0]
                .querySelectorAll('.color-pick');

            buttons.forEach(button => {
                if (button.style.backgroundColor === adjustTextColor.value) {
                    setAdjustColor(button, "adjustTextColor");
                }
            });
        }

    }

    function loadTitleColor() {

        if (adjustTitleColor != null) {

            let buttons = shadowR.querySelectorAll('div[data-test="adjustTitleColor"]')[0]
                .querySelectorAll('.color-pick');

            buttons.forEach(button => {
                if (button.style.backgroundColor === adjustTitleColor.value) {
                    setAdjustColor(button, "adjustTitleColor");
                }
            });
        }

    }

    function loadBackgroundColor() {

        if (adjustBackgroundColor != null) {

            let buttons = shadowR.querySelectorAll('div[data-test="adjustBackgroundColor"]')[0]
                .querySelectorAll('.color-pick');

            buttons.forEach(button => {
                if (button.style.backgroundColor === adjustBackgroundColor.value) {
                    setAdjustColor(button, "adjustBackgroundColor");
                }
            });
        }

    }


    function assignDefaultButtonsAdjustColor() {

        let defaultButtons = shadowR.querySelectorAll('.link-default-color')
        defaultButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                let dataTest = button.parentElement.getAttribute('data-test');
                setAdjustColor(button, dataTest);
            });
        });

    }

    function assignAdjustColorsEventListeners() {
        assignAdjustTextColor();
        assignAdjustTitleColor();
        assignAdjustBackgroundColor();
        assignDefaultButtonsAdjustColor();

        shadowR.querySelectorAll('.lucide-info').forEach(info => {
            info.addEventListener('mouseenter', () => {
                const tooltip = info.nextElementSibling.nextElementSibling.nextElementSibling;
                if (tooltip?.classList.contains('tooltip-content')) {
                    tooltip.style.visibility = 'visible';
                    tooltip.style.opacity = '1';
                }
            });

            info.addEventListener('mouseleave', () => {
                const tooltip = info.nextElementSibling.nextElementSibling.nextElementSibling;
                if (tooltip?.classList.contains('tooltip-content')) {
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.opacity = '0';
                }
            });
        });

    }

    function assignAdjustTextColor() {

        let colorPickButtons = shadowR.querySelectorAll('div[data-test="adjustTextColor"]')[0]
            .querySelectorAll('.color-pick');
        colorPickButtons.forEach(button => {
            button.addEventListener('click', function () {
                setAdjustColor(button, "adjustTextColor");
            });
        });

    }

    function assignAdjustTitleColor() {

        let colorPickButtons = shadowR.querySelectorAll('div[data-test="adjustTitleColor"]')[0]
            .querySelectorAll('.color-pick');
        colorPickButtons.forEach(button => {
            button.addEventListener('click', function () {
                setAdjustColor(button, "adjustTitleColor");
            });
        });

    }

    function assignAdjustBackgroundColor() {

        let colorPickButtons = shadowR.querySelectorAll('div[data-test="adjustBackgroundColor"]')[0]
            .querySelectorAll('.color-pick');
        colorPickButtons.forEach(button => {
            button.addEventListener('click', function () {
                setAdjustColor(button, "adjustBackgroundColor");
            });
        });

    }

    let lastSelectedTextColor;
    let lastSelectedTitleColor;
    let lastSelectedBackgroundColor;

    function setAdjustColor(button, fila) {

        const isDefault = button.classList.contains('link-default-color');

        const updateSelectedButton = (lastSelectedButton, button) => {
            if (lastSelectedButton && lastSelectedButton !== button) {
                lastSelectedButton.innerHTML = ''; // Remove o SVG
                lastSelectedButton.classList.remove('color-pick-selected');
            }
            return button;
        };

        const setSVG = (button, selectedColor) => {
            button.innerHTML = selectedColor === 'rgb(255, 255, 255)' ?
                `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-down">
                <path d="m6 9 6 6 6-6"/>
            </svg>` :
                `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down">
                <path d="m6 9 6 6 6-6"></path>
            </svg>`;
        };

        const adjustColor = (fila, selectedColor) => {
            if (fila === 'adjustTitleColor') {
                let titleColorStyle = document.getElementById('title-color-incloowe') || document.createElement('style');
                titleColorStyle.id = 'title-color-incloowe';
                titleColorStyle.innerHTML = `body :not(#shadow) h1, body :not(#shadow) h2, body :not(#shadow) h3, body :not(#shadow) h4,
                body :not(#shadow) h5, body :not(#shadow) h6 { color: ${selectedColor} !important }`;

                document.head.appendChild(titleColorStyle);
                setItemToLocalStorageWithExpiry(ADJUST_TITLE_COLOR_KEY, selectedColor, null);

            } else if (fila === 'adjustTextColor') {
                let textColorStyle = document.getElementById('text-color-incloowe') || document.createElement('style');
                textColorStyle.id = 'text-color-incloowe';
                textColorStyle.innerHTML = `body :not(#shadow) a, body :not(#shadow) p, body :not(#shadow) li, body :not(#shadow) label,
                body :not(#shadow) input, body :not(#shadow) select, body :not(#shadow) textarea, body :not(#shadow) legend,
                body :not(#shadow) code, body :not(#shadow) pre, body :not(#shadow) dd, body :not(#shadow) dt, body :not(#shadow) span,
                body :not(#shadow) blockquote { color: ${selectedColor} !important }`;
                document.head.appendChild(textColorStyle);
                setItemToLocalStorageWithExpiry(ADJUST_TEXT_COLOR_KEY, selectedColor, null);
            } else if (fila === 'adjustBackgroundColor') {
                document.body.style.setProperty('background-color', selectedColor, 'important');
                setItemToLocalStorageWithExpiry(ADJUST_BACKGROUND_COLOR_KEY, selectedColor, null);
            }
        };

        const removeAdjustColor = (fila) => {
            if (fila === 'adjustTitleColor') {
                const titleColorStyle = document.getElementById('title-color-incloowe');
                titleColorStyle.innerHTML = '';
                removeItemFromLocalStorage(ADJUST_TITLE_COLOR_KEY);

            } else if (fila === 'adjustTextColor') {
                const textColorStyle = document.getElementById('text-color-incloowe');
                textColorStyle.innerHTML = '';
                removeItemFromLocalStorage(ADJUST_TEXT_COLOR_KEY);
            } else if (fila === 'adjustBackgroundColor') {
                document.body.style.backgroundColor = '';
                removeItemFromLocalStorage(ADJUST_BACKGROUND_COLOR_KEY);
            }
        };

        if (!isDefault) {
            if (fila === 'adjustTitleColor') {
                lastSelectedTitleColor = updateSelectedButton(lastSelectedTitleColor, button);
            } else if (fila === 'adjustTextColor') {
                lastSelectedTextColor = updateSelectedButton(lastSelectedTextColor, button);
            } else if (fila === 'adjustBackgroundColor') {
                lastSelectedBackgroundColor = updateSelectedButton(lastSelectedBackgroundColor, button);
            }

            button.classList.add('color-pick-selected');
            const currentSelected = shadowR.querySelector(`div[data-test=${fila}] .color-pick-selected`);
            const selectedColor = window.getComputedStyle(currentSelected).backgroundColor;

            setSVG(button, selectedColor);
            adjustColor(fila, selectedColor);

        } else {
            const currentSelected = shadowR.querySelector(`div[data-test=${fila}] .color-pick-selected`);
            currentSelected.innerHTML = '';
            currentSelected.classList.remove('color-pick-selected');
            removeAdjustColor(fila);
        }
    }


    function loadDaltonismFilter() {
        if (daltonismFilter != null) {
            setDaltonismFilter(document.activeElement.parentElement);
        }
    }


    function changeDaltonismFilter(daltonismFilter, html) {

        let daltonismFilterSaved = getItemFromLocalStorageWithExpiry("daltonism-filter");

        if (daltonismFilterSaved !== null && daltonismFilterSaved.value === daltonismFilter) {
            indexActualDaltonismFilter = 0;
        } else {
            indexActualDaltonismFilter = daltonismFilter;
        }

        setDaltonismFilter(html);

        if (indexActualDaltonismFilter === 0) {
            removeItemFromLocalStorage(DALTONISM_FILTER_KEY);
        } else {
            setItemToLocalStorageWithExpiry(DALTONISM_FILTER_KEY,
                indexActualDaltonismFilter,
                null);
        }

    }

    function setDaltonismFilter(html) {

        const prot = "0.817, 0.183, 0, 0, 0," +
            "0.333, 0.667, 0, 0, 0," +
            "0, 0.125, 0.875, 0, 0," +
            "0, 0, 0, 1, 0";

        const deut = "0.8, 0.2, 0, 0, 0," +
            "0.258, 0.742, 0, 0, 0," +
            "0, 0.142, 0.858, 0, 0," +
            "0, 0, 0, 1, 0";

        const trit = "0.967, 0.033, 0, 0, 0," +
            "0, 0.733, 0.267, 0, 0," +
            "0, 0.183, 0.817, 0, 0," +
            "0, 0, 0, 1, 0";

        const svgNS = "http://www.w3.org/2000/svg";
        let svg = document.getElementById("daltonism-svg");

        if (!svg) {
            svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("id", "daltonism-svg");
            svg.setAttribute("xmlns", svgNS);
            svg.setAttribute("version", "1.1");
            svg.style.display = "none";

            const defs = document.createElementNS(svgNS, "defs");
            svg.appendChild(defs);
            document.body.appendChild(svg);
        } else {
            // Limpar filtros existentes ao mudar de opção
            svg.querySelector("defs").innerHTML = "";
        }

        const defs = svg.querySelector("defs");
        const filter = document.createElementNS(svgNS, "filter");
        const feColorMatrix = document.createElementNS(svgNS, "feColorMatrix");
        feColorMatrix.setAttribute("type", "matrix");

        if (indexActualDaltonismFilter !== null) {
            const selectedDaltonismFilter = daltonisms[indexActualDaltonismFilter];
            html.classList.remove("protanomaly", "deuteranomaly", "tritanomaly");

            switch (selectedDaltonismFilter) {
                case 'protanomaly':
                    filter.setAttribute("id", "protanomaly-filter");
                    feColorMatrix.setAttribute("values", prot);
                    html.classList.add("protanomaly");
                    break;
                case 'deuteranomaly':
                    filter.setAttribute("id", "deuteranomaly-filter");
                    feColorMatrix.setAttribute("values", deut);
                    html.classList.add("deuteranomaly");
                    break;
                case 'tritanomaly':
                    filter.setAttribute("id", "tritanomaly-filter");
                    feColorMatrix.setAttribute("values", trit);
                    html.classList.add("tritanomaly");
                    break;
                default:
                    if (svg) {
                        svg.parentNode.removeChild(svg);
                    }
                    html.classList.remove("protanomaly", "deuteranomaly", "tritanomaly");
            }

            filter.appendChild(feColorMatrix);
            defs.appendChild(filter);

            const buttonsMap = {
                1: redDefButton,
                2: greenDefButton,
                3: blueDefButton
            };
            const selectedButton = buttonsMap[indexActualDaltonismFilter] || null;
            const otherButtons = Object.values(buttonsMap).filter(button => button !== selectedButton);
            changeStyleButtonSelectedAndDeselectOthers(selectedButton, otherButtons);
        }
    }

    function setHighlightHover() {

        let txtTags = getLastLeafElementsWithText();
        let otherItens = document.querySelectorAll('button, input[type="button"], input[type="submit"], [role="button"], img');

        let otherItensArray = Array.from(otherItens);
        let combined = [...txtTags, ...otherItensArray];

        const isHoverActive = getItemFromLocalStorageWithExpiry(HIGHLIGHT_HOVER_KEY);

        if (isHoverActive && isHoverActive.value === 'true') {
            combined.forEach(el => el.classList.remove('hover-active'));
            setItemToLocalStorageWithExpiry(HIGHLIGHT_HOVER_KEY, 'false', null);
        } else {
            combined.forEach(el => el.classList.add('hover-active'));
            setItemToLocalStorageWithExpiry(HIGHLIGHT_HOVER_KEY, 'true', null);

        }

        changeStyleButtonSelected(highlightHoverButton);

    }

    function loadHighlightHover() {
        let txtTags = getLastLeafElementsWithText();
        let otherItens = document.querySelectorAll('button, input[type="button"], input[type="submit"], [role="button"], img');

        let otherItensArray = Array.from(otherItens);
        let combined = [...txtTags, ...otherItensArray];
        const isHoverActive = getItemFromLocalStorageWithExpiry(HIGHLIGHT_HOVER_KEY);

        if (isHoverActive !== null && isHoverActive.value === 'true') {
            combined.forEach(el => el.classList.add('hover-active'));
            changeStyleButtonSelected(highlightHoverButton);
        } else {
            combined.forEach(el => el.classList.remove('hover-active'));
        }

    }

    function setHighlightFocus() {

        let allItens = document.querySelectorAll('body *');

        // Verifica o estado do localStorage
        const isFocusActive = getItemFromLocalStorageWithExpiry(HIGHLIGHT_FOCUS_KEY);

        if (isFocusActive && isFocusActive.value === 'true') {
            // Remove a classe de focus de todos os elementos
            allItens.forEach(el => el.classList.remove('focus-active'));
            setItemToLocalStorageWithExpiry(HIGHLIGHT_FOCUS_KEY, 'false', null);
        } else {
            // Adiciona a classe de focus a todos os elementos
            allItens.forEach(el => el.classList.add('focus-active'));
            setItemToLocalStorageWithExpiry(HIGHLIGHT_FOCUS_KEY, 'true', null);
        }

        // Atualiza o estilo do botão (pode ser omitido se não houver um botão específico)
        changeStyleButtonSelected(highlightFocusButton);
    }

    function loadHighlightFocus() {

        let allItens = document.querySelectorAll('body *');

        // Verifica o estado do localStorage
        const isFocusActive = getItemFromLocalStorageWithExpiry(HIGHLIGHT_FOCUS_KEY);

        if (isFocusActive !== null && isFocusActive.value === 'true') {
            // Adiciona a classe de focus a todos os elementos
            allItens.forEach(el => el.classList.add('focus-active'));
            changeStyleButtonSelected(highlightFocusButton);
        } else {
            // Remove a classe de focus de todos os elementos
            allItens.forEach(el => el.classList.remove('focus-active'));
        }
    }

}
