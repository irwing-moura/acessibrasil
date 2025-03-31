import {
    changeStyleButtonSelected,
    changeTextAndColorRangeValue,
    closeModal,
    closeToast,
    expandContent,
    openModal,
    showToast,
    showTooltip
} from "../utils/support";
import {
    FONT_SIZE_KEY,
    HIGHLIGHT_FOCUS_KEY,
    HIGHLIGHT_HEADINGS_KEY,
    HIGHLIGHT_HOVER_KEY,
    HIGHLIGHT_LINKS_KEY, LETTER_SPACING_KEY, LINE_HEIGHT_KEY,
    TEXT_MAGNIFIER_KEY,
    VLIBRAS_KEY, ZOOM_KEY
} from "./constants";
import {
    clearLocalStorage,
    getItemFromLocalStorageWithExpiry,
    removeItemFromLocalStorage,
    setItemToLocalStorageWithExpiry
} from "../utils/storage";
import {getContainersLoaded, getShadowRoot} from "./widget";
import {
    applyWidgetDarkMode,
    applyWidgetHideInterface,
    applyWidgetPosition,
    applyWidgetShortcutKeyboard
} from "../features/configuration";
import {
    applyAlignText,
    applyFontFamily,
    applyFontSize,
    applyLetterSpacing,
    applyLineHeight, applyTextMagnifier
} from "../features/text-adjustments";
import {
    applyColorContrast,
    applyColorSaturation,
    applyContentScaling,
    applyDaltonismFilter, setAdjustColor
} from "../features/visual-adjustments";
import {
    applyHighlightFocus,
    applyHighlightHeading,
    applyHighlightHover,
    applyHighlightLinks
} from "../features/highlight-features";
import {applyVLibras} from "../features/vlibras";


const funcoes = {

    //todo:: CRIAR AS FUNCTIONS DOS OUTROS TIPOS DE BOTAO E SETAR NO SUPABASE

    //ACTIVATE
    triggerReadableFont: function () {
        applyFontFamily(1, this);
    },
    triggerDyslexiaFont: function () {
        applyFontFamily(2, this);
    },
    triggerAlignLeft: function () {
        applyAlignText(1, this);
    },
    triggerAlignCenter: function () {
        applyAlignText(2, this);
    },
    triggerAlignRight: function () {
        applyAlignText(3, this);
    },

    triggerInvertedColors: function () {
        applyColorContrast(1, this);
    },
    triggerInteligentInvertedColors: function () {
        applyColorContrast(2, this);
    },
    triggerLightContrast: function () {
        applyColorContrast(3, this);
    },
    triggerDarkContrast: function () {
        applyColorContrast(4, this);
    },
    triggerHighContrast: function () {
        applyColorContrast(5, this);
    },
    triggerHighSaturation: function () {
        applyColorSaturation(1, this);
    },
    triggerLowSaturation: function () {
        applyColorSaturation(2, this);
    },
    triggerMonochromatic: function () {
        applyColorSaturation(3, this);
    },
    triggerProtanomaly: function () {
        applyDaltonismFilter(1, this);
    },
    triggerDeutaronomaly: function () {
        applyDaltonismFilter(2, this);
    },
    triggerTritanomaly: function () {
        applyDaltonismFilter(3, this);
    },

    triggerTextMagnifier: function () {
        changeIndividualActivateButton(this, TEXT_MAGNIFIER_KEY, applyTextMagnifier);
    },
    triggerVlibras: function () {
        changeIndividualActivateButton(this, VLIBRAS_KEY, applyVLibras);
    },
    triggerHighlightHover: function () {
        changeIndividualActivateButton(this, HIGHLIGHT_HOVER_KEY, applyHighlightHover);
    },
    triggerHighlightTitles: function () {
        changeIndividualActivateButton(this, HIGHLIGHT_HEADINGS_KEY, applyHighlightHeading);
    },
    triggerHighlightLinks: function () {
        changeIndividualActivateButton(this, HIGHLIGHT_LINKS_KEY, applyHighlightLinks);
    },
    triggerHighlightFocus: function () {
        changeIndividualActivateButton(this, HIGHLIGHT_FOCUS_KEY, applyHighlightFocus);
    },

    //RANGE
    triggerFontSize: function () {
        changeRangeButton(this, FONT_SIZE_KEY, applyFontSize);
    },
    triggerContentScaling: function () {
        changeRangeButton(this, ZOOM_KEY, applyContentScaling);
    },
    triggerLineHeight: function () {
        changeRangeButton(this, LINE_HEIGHT_KEY, applyLineHeight);
    },
    triggerLetterSpacing: function () {
        changeRangeButton(this, LETTER_SPACING_KEY, applyLetterSpacing);
    }

}

export async function toggleExpandWindow() {

    let shadowR = getShadowRoot();
    let appWindow = shadowR.querySelector('#appWindow');
    let widget = shadowR.querySelector('#widget');
    let button = shadowR.querySelector('#accessibilityButton');

    if (appWindow.style.opacity === '0' || appWindow.style.opacity === '') {

        let btnsReset = shadowR.querySelectorAll(".button-reset-func");
        btnsReset.forEach(btn => {
            btn.addEventListener('click', showToast);
        });

        let closeBtn = shadowR.querySelector(".close-btn");
        closeBtn.addEventListener('click', closeToast);


        widget.style.setProperty('transform', 'translate(0, 0)', 'important');

        appWindow.style.setProperty('opacity', '1', 'important');
        appWindow.style.setProperty('visibility', 'visible', 'important');
        button.style.setProperty('display', 'none', 'important');

        appWindow.style.setProperty('background', 'transparent', 'important');

    } else if (appWindow.style.opacity === '1') {

        closeModal();

        widget.style.setProperty('transform', 'translate(0, 50%)', 'important');

        appWindow.style.setProperty('opacity', '0', 'important');
        appWindow.style.setProperty('visibility', 'hidden', 'important');
        button.style.setProperty('display', 'flex', 'important');
        shadowR.querySelector(".content-container").scrollTo({top: 0});

    }

}

export function createDynamicButtons() {
    let containers = getContainersLoaded();
    if (!containers) return;
    let shadowR = getShadowRoot();
    const scrollableContents = shadowR.querySelectorAll('.scrollable-content');
    // scrollableContents.forEach(content => {
    //     content.innerHTML = ''; // Clear existing content
    // });

    containers.forEach((container) => {
        let order = container.order - 1;
        let cont = shadowR.querySelectorAll('.scrollable-content')[order];

        if (cont) {
            // Create container title
            const titleContainer = createTitleContainer(container.title, container.description, order);
            cont.appendChild(titleContainer);

            // Create buttons container
            const contentButtons = document.createElement('div');
            contentButtons.className = "content-buttons active";

            // Add buttons
            container.funcionalidades.forEach((item, i) => {

                const languageToFind = "pt_BR"; // Defina o idioma que deseja buscar
                const textos = item.translations.find(item => item.language === languageToFind);

                let botao = createButton(
                    textos.title_text,
                    textos.tooltip_title_text,
                    textos.tooltip_text,
                    item.action,
                    item.order,
                    item.icon,
                    item.type,
                    item.group,
                    item?.buttons?.name);

                contentButtons.appendChild(botao);
            });

            cont.appendChild(contentButtons);
        }
    });
}

export function triggerFixedButtons() {

    let shadowR = getShadowRoot();

    // //BOTÃO ABRIR WIDGET
    // let expandButton = shadowR.querySelector("#accessibilityButton");
    // expandButton.addEventListener('click', toggleExpandWindow);
    //
    //
    // // let path = require('./assets/svg/data.json');
    // // anim = loadLottieAnimation(path);
    //
    // expandButton.addEventListener('mouseenter', function(){
    //     // expandButton.style.width = '230.5px';
    //     // expandButton.style.left = '50px';
    //     // anim.destroy();
    //     // anim = loadLottieAnimation(path);
    //     // anim.playSegments([0, 75], true);
    // });
    //
    // expandButton.addEventListener('mouseleave', function(){
    //     // expandButton.style.width = '120px';
    //     // expandButton.style.left = '40px';
    //     // anim.destroy();
    //     // let path = require('./assets/svg/data.json');
    //     // anim = loadLottieAnimation(path);
    //     // anim.playSegments([60, 75], true);
    // });

    //HEADER
    let closeButton = shadowR.querySelectorAll(".close-button");
    closeButton.forEach(function (btn) {
        btn.addEventListener('click', toggleExpandWindow);
    });

    //BOTAO DE RESET
    let resetButton = shadowR.querySelector("#resetButton");
    resetButton.addEventListener('click', clearLocalStorage);

    //CONFIGURAÇÕES
    let btnSettings = shadowR.querySelector("#settings");
    btnSettings.addEventListener('click', function() {
        shadowR.querySelector('.app-window').classList.add('pagina-ativa');
        // Desabilita scroll na página que está saindo
        shadowR.querySelector('.main-page').style.overflowY = 'hidden';
    });

    //VOLTAR PARA PRIMEIRA PAGINA
    let btnConfigBack = shadowR.querySelector('#backButton');
    btnConfigBack.addEventListener('click', function () {
        shadowR.querySelector('.app-window').classList.remove('pagina-ativa');
        // Restaura scroll após a transição
        // setTimeout(() => {
        shadowR.querySelector('.main-page').style.overflowY = 'scroll';
        // }, 500);
    })

    //MODAL DE LINGUAGEM
    shadowR.querySelector('.btn-language').addEventListener('click', openModal);

    let modalLanguage = shadowR.querySelector('.modal-overlay');
    let btnCloseModalLanguage = shadowR.querySelector('#closeLngButton');

    btnCloseModalLanguage.addEventListener('click', closeModal);
    modalLanguage.addEventListener('click',  function (e) {
        if(e.target === this){
            closeModal();
        }
    });

    //POSICAO WIDGET
    let btnsDirect = shadowR.querySelectorAll(".dir");
    btnsDirect.forEach(function (btn) {
        btn.addEventListener('click', ()=> applyWidgetPosition(btn));
    });

    //DARK MODE
    let btnDarkMode = shadowR.querySelector("#dM");
    btnDarkMode.addEventListener('click', ()=> applyWidgetDarkMode());

    //HIDE INTERFACE
    let btnHideInterface = shadowR.querySelector("#hI");
    btnHideInterface.addEventListener('click', ()=> applyWidgetHideInterface());

    //SHORTCUT KEYBOARD
    let btnShortcutKeyboard = shadowR.querySelector("#sK");
    btnShortcutKeyboard.addEventListener('click', ()=> applyWidgetShortcutKeyboard());

}

export function createTitleContainer(title, description, order) {
    // Cria o container principal
    const titleContainer = document.createElement("div");
    titleContainer.className = "title";

    const divContainerTitle = document.createElement("div");
    divContainerTitle.className = "container-title-desc";
    titleContainer.appendChild(divContainerTitle);

    // Cria o primeiro span com o texto "Content"
    const contentText = document.createElement("h2");
    contentText.textContent = title;
    divContainerTitle.appendChild(contentText);

    // Cria o primeiro span com o texto "Content"
    const contentTextDesc = document.createElement("span");
    contentTextDesc.textContent = description;
    divContainerTitle.appendChild(contentTextDesc);

    // Cria o span com a classe "contentButton active"
    const contentButton = document.createElement("button");
    // if (order == 0) {
    contentButton.className = "contentButton";
    // } else {
    //     contentButton.className = "contentButton";
    // }

    // Cria o ícone dentro do contentButton
    const iconExpand = document.createElement("i");
    if (order == 0) {
        iconExpand.className = "icon icon-expand-content active";
    } else {
        iconExpand.className = "icon icon-expand-content";
    }

    contentButton.onclick = () => expandContent(contentButton);
    contentButton.appendChild(iconExpand);

    titleContainer.appendChild(contentButton);

    return titleContainer;
}

export function createButton(titulo, tituloTooltip, textoTooltip, acaoClique, order, classe, type, group, id) {
    if (type === 'range') {
        return createButtonRange(titulo, classe, textoTooltip, id, acaoClique, tituloTooltip);
    } else if (type === 'activate') {
        return createButtonActivate(titulo, textoTooltip, acaoClique, order, classe, group, id, tituloTooltip);
    } else if (type === 'radio') {
        return createButtonRadio(titulo, textoTooltip, acaoClique, id, tituloTooltip);
    }
}

function createButtonRange(texto, classe, textoTooltip, id, acaoClique, tituloTooltip) {
    // Cria o container principal
    const contentButton = document.createElement("div");
    contentButton.id = id;
    contentButton.className = "content-button full-width";
    // contentButton.setAttribute("func", "font-size");

    // Cria o ícone de tooltip
    const iconTooltip = document.createElement("span");
    iconTooltip.className = "icon icon-tooltip";
    iconTooltip.textContent="i";
    iconTooltip.onmouseenter = () => showTooltip(iconTooltip);
    iconTooltip.onmouseleave = () => showTooltip(iconTooltip);
    contentButton.appendChild(iconTooltip);

    // Cria o container de título
    const titleContainer = document.createElement("div");
    titleContainer.className = "title-container";

    // Cria o label do título do slider
    const sliderIconTitle = document.createElement("label");
    sliderIconTitle.className = "slider-icon-title";

    // Ícone do tamanho da fonte
    const iconFontSize = document.createElement("span");
    iconFontSize.className = "icon " + classe;
    sliderIconTitle.appendChild(iconFontSize);

    // Título do slider
    const sliderTitle = document.createElement("span");
    sliderTitle.className = "slider-title";
    sliderTitle.textContent = texto;
    sliderIconTitle.appendChild(sliderTitle);

    titleContainer.appendChild(sliderIconTitle);
    contentButton.appendChild(titleContainer);

    // Criando o container do input

    const container = document.createElement("div");
    container.classList.add("container-button-range");

    const content = document.createElement("div");
    content.classList.add("content-button-range");

    // Criando o botão de diminuir (-)
    const minusButton = document.createElement("button");
    minusButton.classList.add("arrow", "minus-button");
    minusButton.onclick = funcoes[acaoClique];

    const minusIcon = document.createElement("span");
    minusIcon.classList.add("icon", "icon-minus");

    minusButton.appendChild(minusIcon);

    // Criando o span do valor
    const valueSpan = document.createElement("span");
    valueSpan.classList.add("button-range-value");
    valueSpan.textContent = "Default";

    // Criando o botão de aumentar (+)
    const plusButton = document.createElement("button");
    plusButton.classList.add("arrow", "plus-button");
    plusButton.onclick = funcoes[acaoClique];

    const plusIcon = document.createElement("span");
    plusIcon.classList.add("icon", "icon-plus");

    plusButton.appendChild(plusIcon);

    // Adicionando os elementos ao container
    content.appendChild(minusButton);
    content.appendChild(valueSpan);
    content.appendChild(plusButton);
    container.appendChild(content);


    const button = document.createElement("button");
    button.classList.add("button-reset-func");
    button.onclick = funcoes[acaoClique];

    button.disabled = true;
    button.setAttribute("role", "button");
    button.setAttribute("title", "Reiniciar Configurações");

    const icon = document.createElement("span");
    icon.classList.add("icon", "icon-refresh");
    button.appendChild(icon);

    const desc = document.createElement("div");
    desc.classList.add("desc-refresh");
    const spanDesc = document.createElement("span");
    spanDesc.textContent = 'Restaurar';
    desc.appendChild(spanDesc);
    button.appendChild(desc);


    container.appendChild(button);

    contentButton.appendChild(container);

    //Cria container do tooltip
    const tooltipContainer = document.createElement('div');
    tooltipContainer.className = 'tooltip-container';

    //Cria balão do tooltip
    const tooltipContent = document.createElement('div');
    tooltipContent.className = 'tooltip-content';

    // Cria título
    const title = document.createElement('h3');
    title.className = 'tooltip-title';
    title.textContent = tituloTooltip;

    // Cria texto descritivo
    const text = document.createElement('span');
    text.className = 'tooltip-text';
    text.textContent = textoTooltip;

    // Cria container de atalhos
    const shortcutContainer = document.createElement('div');
    shortcutContainer.className = 'tooltip-shortcut-container';

    // Cria elementos dos atalhos
    const shortcutText = document.createTextNode('Atalho da funcão: ');
    const ctrlButton = document.createElement('span');
    ctrlButton.className = 'tooltip-shortcut-button';
    ctrlButton.textContent = 'Ctrl';

    const plusSign = document.createTextNode(' + ');

    const uButton = document.createElement('span');
    uButton.className = 'tooltip-shortcut-button';
    uButton.textContent = 'U';

    // Monta container de atalhos
    shortcutContainer.appendChild(shortcutText);
    shortcutContainer.appendChild(ctrlButton);
    shortcutContainer.appendChild(plusSign);
    shortcutContainer.appendChild(uButton);

    // Monta estrutura completa
    tooltipContent.appendChild(title);
    tooltipContent.appendChild(text);
    tooltipContent.appendChild(shortcutContainer);

    tooltipContainer.appendChild(tooltipContent)
    contentButton.appendChild(tooltipContainer);

    return contentButton;

}

function createButtonActivate(texto, textoTooltip, acaoClique, order, classe, group, id, tituloTooltip) {
    const botao = document.createElement('button');
    botao.id = id;
    botao.className = group == null ? 'content-button' : 'content-button ' + group;
    botao.role = 'button'
    botao.ariaLabel = texto;
    botao.tabIndex = order;

    // Cria a div do tooltip
    const iconTooltip = document.createElement('span');
    iconTooltip.className = 'icon icon-tooltip';
    iconTooltip.textContent="i";
    iconTooltip.onmouseenter = () => showTooltip(iconTooltip);
    iconTooltip.onmouseleave = () => showTooltip(iconTooltip);
    botao.appendChild(iconTooltip);

    //Cria icone
    const icon = document.createElement('i');
    icon.className = 'icon ' + classe;
    botao.appendChild(icon);

    // Cria texto

    const divTexto = document.createElement('div');
    divTexto.className = 'text-desc-func';

    const span = document.createElement('span');
    span.textContent = texto;
    divTexto.appendChild(span);

    const small = document.createElement('small');
    small.textContent = "Desligado";
    divTexto.appendChild(small);
    botao.appendChild(divTexto);

    //Cria container do tooltip
    const tooltipContainer = document.createElement('div');
    tooltipContainer.className = 'tooltip-container';

    //Cria balão do tooltip
    const tooltipContent = document.createElement('div');
    tooltipContent.className = 'tooltip-content';

    // Cria título
    const title = document.createElement('h3');
    title.className = 'tooltip-title';
    title.textContent = tituloTooltip;

    // Cria texto descritivo
    const text = document.createElement('span');
    text.className = 'tooltip-text';
    text.textContent = textoTooltip;

    // Cria container de atalhos
    const shortcutContainer = document.createElement('div');
    shortcutContainer.className = 'tooltip-shortcut-container';

    // Cria elementos dos atalhos
    const shortcutText = document.createTextNode('Atalho da funcão: ');
    const ctrlButton = document.createElement('span');
    ctrlButton.className = 'tooltip-shortcut-button';
    ctrlButton.textContent = 'Ctrl';

    const plusSign = document.createTextNode(' + ');

    const uButton = document.createElement('span');
    uButton.className = 'tooltip-shortcut-button';
    uButton.textContent = 'U';

    // Monta container de atalhos
    shortcutContainer.appendChild(shortcutText);
    shortcutContainer.appendChild(ctrlButton);
    shortcutContainer.appendChild(plusSign);
    shortcutContainer.appendChild(uButton);

    // Monta estrutura completa
    tooltipContent.appendChild(title);
    tooltipContent.appendChild(text);
    tooltipContent.appendChild(shortcutContainer);

    tooltipContainer.appendChild(tooltipContent)
    botao.appendChild(tooltipContainer);


    // Adiciona o evento de clique ao botão
    botao.onclick = funcoes[acaoClique];


    return botao;
}

function createButtonRadio(texto, textoTooltip, acaoClique, id, tituloTooltip) {

    // Cria o container principal
    const contentButton = document.createElement("div");
    contentButton.id = id;
    // contentButton.setAttribute("data-test", "adjustTextColor");
    contentButton.className = "content-button full-width";
    contentButton.style.paddingLeft = '24px';
    contentButton.setAttribute("data-test", acaoClique);

    // Cria o ícone de tooltip
    const iconTooltip = document.createElement("span");
    iconTooltip.className = "icon icon-tooltip";
    iconTooltip.textContent = "i";
    iconTooltip.onmouseenter = () => showTooltip(iconTooltip);
    iconTooltip.onmouseleave = () => showTooltip(iconTooltip);
    contentButton.appendChild(iconTooltip);

    //Cria flexbox radio
    const flexBoxRadio = document.createElement("div");
    flexBoxRadio.className = "flexbox-radio";

    // Cria o container de título
    const titleContainer = document.createElement("div");
    titleContainer.className = "title-container";

    // Cria o label do título do slider
    const sliderIconTitle = document.createElement("label");
    sliderIconTitle.setAttribute("for", "letterSpacingSlide");
    sliderIconTitle.className = "slider-icon-title";

    // Título do slider
    const sliderTitle = document.createElement("span");
    sliderTitle.className = "slider-title";
    sliderTitle.textContent = texto;
    sliderIconTitle.appendChild(sliderTitle);

    titleContainer.appendChild(sliderIconTitle);
    flexBoxRadio.appendChild(titleContainer);

    // Cria o container para os botões de seleção de cor
    const flexBoxContainerRadio = document.createElement("div");
    flexBoxContainerRadio.className = "flexbox-container-radio";

    // Cria o container para os botões de seleção de cor
    const colorPicker = document.createElement("div");
    colorPicker.className = "color-picker";

    // Função auxiliar para criar cada botão de cor
    const createColorButton = (color, label) => {
        const colorButton = document.createElement("button");
        colorButton.className = "color-pick";
        colorButton.setAttribute("aria-label", `Change Color to ${label}`);
        colorButton.setAttribute("tabindex", "0");
        colorButton.style.backgroundColor = color;

        colorButton.onclick = () => setAdjustColor(colorButton, acaoClique);


        return colorButton;
    };

    // Adiciona os botões de cores ao container de seleção de cor
    colorPicker.appendChild(createColorButton("#0076b4", "Blue"));
    colorPicker.appendChild(createColorButton("#7a549c", "Purple"));
    colorPicker.appendChild(createColorButton("#c83733", "Red"));
    colorPicker.appendChild(createColorButton("#d07021", "Orange"));
    colorPicker.appendChild(createColorButton("#26999f", "Teal"));
    colorPicker.appendChild(createColorButton("#4d7831", "Green"));
    colorPicker.appendChild(createColorButton("#fff", "White"));
    colorPicker.appendChild(createColorButton("#000", "Black"));

    flexBoxContainerRadio.appendChild(colorPicker);

    //Cria container do tooltip
    const tooltipContainer = document.createElement('div');
    tooltipContainer.className = 'tooltip-container';

    //Cria balão do tooltip
    const tooltipContent = document.createElement('div');
    tooltipContent.className = 'tooltip-content';

    // Cria título
    const title = document.createElement('h3');
    title.className = 'tooltip-title';
    title.textContent = tituloTooltip;

    // Cria texto descritivo
    const text = document.createElement('span');
    text.className = 'tooltip-text';
    text.textContent = textoTooltip;

    // Cria container de atalhos
    const shortcutContainer = document.createElement('div');
    shortcutContainer.className = 'tooltip-shortcut-container';

    // Cria elementos dos atalhos
    const shortcutText = document.createTextNode('Atalho da funcão: ');
    const ctrlButton = document.createElement('span');
    ctrlButton.className = 'tooltip-shortcut-button';
    ctrlButton.textContent = 'Ctrl';

    const plusSign = document.createTextNode(' + ');

    const uButton = document.createElement('span');
    uButton.className = 'tooltip-shortcut-button';
    uButton.textContent = 'U';

    // Monta container de atalhos
    shortcutContainer.appendChild(shortcutText);
    shortcutContainer.appendChild(ctrlButton);
    shortcutContainer.appendChild(plusSign);
    shortcutContainer.appendChild(uButton);

    // Monta estrutura completa
    tooltipContent.appendChild(title);
    tooltipContent.appendChild(text);
    tooltipContent.appendChild(shortcutContainer);

    tooltipContainer.appendChild(tooltipContent)
    contentButton.appendChild(tooltipContainer);

    // Cria o botao de refresh (Default)
    // <button className="button-reset-func" role="button" title="Reiniciar Configurações"><span
    //     className="icon icon-refresh"></span></button>
    const btnReset = document.createElement("button");
    btnReset.className = "button-reset-func";
    btnReset.role = 'button';
    btnReset.disabled = true;
    btnReset.onclick = (event) => {
        // showToast();
        event.preventDefault(); // Evita que a página role para o topo
        setAdjustColor(btnReset, acaoClique);
    };

    //Cria icone
    const icon = document.createElement('span');
    icon.className = 'icon icon-refresh';
    btnReset.appendChild(icon);

    const desc = document.createElement("div");
    desc.classList.add("desc-refresh");
    const spanDesc = document.createElement("span");
    spanDesc.textContent = 'Restaurar';
    desc.appendChild(spanDesc);
    btnReset.appendChild(desc);

    flexBoxContainerRadio.appendChild(btnReset);
    flexBoxRadio.appendChild(flexBoxContainerRadio);
    contentButton.appendChild(flexBoxRadio);

    return contentButton;

}

//RANGE BUTTONS
function changeRangeButton(btn, key, updateFunction) {
    const activeProperty = getItemFromLocalStorageWithExpiry(key);

    let percentChange;
    let btnDiv;

    if( btn.className.includes('button-reset-func')) {
        percentChange = 0;
        btnDiv = btn.parentElement.parentElement;
    }else {
        btnDiv = btn.parentElement.parentElement.parentElement;
        percentChange = btn.className.includes('minus-button') ? -10 : 10;
        let currentPercentage = activeProperty ? parseFloat(activeProperty.value.replace('%', '')) : 0;
        percentChange += currentPercentage;
    }

    if (percentChange > 200 || percentChange < -200) return;

    updateFunction(percentChange);
    changeTextAndColorRangeValue(percentChange, btnDiv);

    setItemToLocalStorageWithExpiry(
        key,
        `${percentChange}%`,
        null,
        btnDiv.id,
        true
    );
}

//ACTIVATE BUTTONS
function changeIndividualActivateButton(btn, key, updateFunction) {

    let activeProperty = getItemFromLocalStorageWithExpiry(key);

    updateFunction()
    changeStyleButtonSelected(btn);

    if (activeProperty == null) {
        setItemToLocalStorageWithExpiry(key,
            true,
            null,
            btn.id);
    } else {
        removeItemFromLocalStorage(key, btn.id);
    }

}
