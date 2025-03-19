import {
    openModalHideButtonOrNot,
    expandContent,
    showTooltip,
    hideWidget,
    setShadowRoot,
    changeTextAndColorRangeValue,
    changeStyleButtonSelected,
    changeStyleButtonSelectedAndDeselectOthers,
    calculateZoomPercentageInPixels,
    calculateLetterSpacingInPixels,
    getElementCursorHover,
    criarBalao,
    createStyleGlobal, showToast, closeToast
} from "./support";
import {
    setItemToLocalStorageWithExpiry,
    getItemFromLocalStorageWithExpiry,
    removeItemFromLocalStorage,
    clearLocalStorage, needToLoadFuctions
} from "./storage";
import {
    getLineHeightInPixelsIfText,
    getLastLeafElementsWithText,
    getFirstChildElementsBelowBody
} from "./queries";

import lottie from 'lottie-web';

import widgetHtml from './widget.html';
import {getButtons, getContainers, getQueries, check, auth} from "./api";
import fonteUrl from "./assets/svg/data.json";
import path from "./assets/svg/data.json";

window.incloowe = window.incloowe || {};

window.incloowe.init = async function init() {

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
    const ADJUST_TEXT_COLOR_KEY = "adjustTextColor"
    const ADJUST_TITLE_COLOR_KEY = "adjustTitleColor"
    const ADJUST_BACKGROUND_COLOR_KEY = "adjustBackgroundColor"
    const DALTONISM_FILTER_KEY = "daltonism-filter";
    const VLIBRAS_KEY = "vlibras";

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
    let hightlightHover = getItemFromLocalStorageWithExpiry(HIGHLIGHT_HOVER_KEY);
    let hightlightFocus = getItemFromLocalStorageWithExpiry(HIGHLIGHT_FOCUS_KEY);
    let fontFamily = getItemFromLocalStorageWithExpiry(FONT_FAMILY_KEY);
    let colorsContrast = getItemFromLocalStorageWithExpiry(COLORS_CONTRAST_KEY);
    let colorsSaturation = getItemFromLocalStorageWithExpiry(COLORS_SATURATION_KEY);
    let adjustTextColor = getItemFromLocalStorageWithExpiry(ADJUST_TEXT_COLOR_KEY);
    let adjustTitleColor = getItemFromLocalStorageWithExpiry(ADJUST_TITLE_COLOR_KEY);
    let adjustBackgroundColor = getItemFromLocalStorageWithExpiry(ADJUST_BACKGROUND_COLOR_KEY);
    let daltonismFilter = getItemFromLocalStorageWithExpiry(DALTONISM_FILTER_KEY);
    let vLibras = getItemFromLocalStorageWithExpiry(VLIBRAS_KEY);

    let expandButton;
    let closeButton;
    let resetButton;
    let createshortcutsButton;
    let hideButton;
    let contentButton;
    let cancelHide;
    let submitHide;

    let btnSettings;
    let btnConfigBack;


    let modalLanguage;
    let btnCloseModalLanguage;


    let anim;

    let shadowR;

    let lastSelectedTextColor;
    let lastSelectedTitleColor;
    let lastSelectedBackgroundColor;

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

    let html;

    let contentLoaded = false;
    let queries;

    if (widgetStatus === null) {

        initializeVlibras();
        let acessoPermitido = await auth();

        if(acessoPermitido) {
            createWidget();
            createStyleGlobal();
            assignSupportFunctions();
            setOriginalFontSizeOnLoading();
            html = document.activeElement.parentElement;

            if (needToLoadFuctions()) {
                if (document.readyState === 'complete') {
                    // A página já foi carregada, chame as funções diretamente
                    await (async () => {
                        queries = await getQueries();
                        loadFunctions(); // Coloque todas as funções de carregamento aqui
                    })();
                } else {
                    // A página ainda não foi carregada, adicione o listener
                    window.addEventListener("load", async (event) => {
                        queries = await getQueries();
                        loadFunctions(); // Coloque todas as funções de carregamento aqui
                    });
                }

            }

        }


    }

// ******************** CRIAÇÃO DO WIDGET ********************//

    function loadFunctions() {
        loadFontSize();
        loadContentScaling();
        loadLineHeight();
        loadLetterSpacing();
        loadTextMagnifier()
        loadHighlightHeadings();
        loadHighlightLinks();
        // loadHighlightButtons();
        loadHighlightHover();
        loadHighlightFocus();
        loadVlibras();
        setFontFamily();
        setAlignText();
        loadContrastColors();
        loadSaturationColors();
        loadTextColor();
        loadTitleColor();
        loadBackgroundColor();
        loadDaltonismFilter();
    }

    function createWidget() {

        let host = document.createElement('widget-ui');
        host.id = 'shadow';
        let shadowRoot = host.attachShadow({mode: 'open'});
        // let html = require('./widget.html');

        shadowRoot.innerHTML = widgetHtml; // Insere o HTML no shadowRoot
        document.body.appendChild(host);

        shadowR = document.getElementById("shadow").shadowRoot;
        setShadowRoot(shadowR);

        let modalAppWindow = shadowR.querySelector('#appWindow');
        modalAppWindow.addEventListener('click', (event) => {
            if (event.target.id === 'appWindow') {
                toggleExpandWindow();
            }
        });

        let path = require('./assets/svg/data.json');
        anim = loadLottieAnimation(path);

        // // Inicia a primeira execução
        // animationInstance.play();

        // Agenda a repetição a cada 5 segundos
        // setInterval(() => {
        //     // animationInstance.stop(); // Reinicia a animação
        //     // animationInstance.play();
        //     anim.destroy();
        //     anim = loadLottieAnimation("data.json");
        // }, 15000); // 5000 ms = 5 segundos

        // animation.play();

    }

    function loadLottieAnimation(path) {
        return lottie.loadAnimation({
            container: shadowR.querySelector('#accessibilityButton'),
            renderer: "svg",
            loop: false,
            autoplay: false,
            animationData: path,
        });
    }


    async function toggleExpandWindow() {

        let appWindow = shadowR.querySelector('#appWindow');
        let widget = shadowR.querySelector('#widget');
        let button = shadowR.querySelector('#accessibilityButton');
        let modal = shadowR.querySelector('#modal-hide');

        if (appWindow.style.opacity === '0' || appWindow.style.opacity === '') {

            if (!contentLoaded) {
                //todo:: RESOLVER, ESTA COM PROBLEMA NO CARREGAMENTO, ELE BUSCA MAS ESTA PASSANDO PARA O PROXIMO ANTES DESSE TERMINAR
                await loadDynamicButtons();
                await setLocalStoregeButtonsId();
                if (queries === undefined) {
                    queries = await getQueries();
                }
                //CARREGOU CONTEUDOS


                let btnsReset = shadowR.querySelectorAll(".button-reset-func");

                btnsReset.forEach(btn => {
                    btn.addEventListener('click', showToast);
                });

                let closeBtn = shadowR.querySelector(".close-btn");
                closeBtn.addEventListener('click', closeToast);


            }
            widget.style.setProperty('transform', 'translate(0, 0)', 'important');

            appWindow.style.setProperty('opacity', '1', 'important');
            appWindow.style.setProperty('visibility', 'visible', 'important');
            button.style.setProperty('display', 'none', 'important');

            appWindow.style.setProperty('background', 'transparent', 'important');
            // modal.style.setProperty('opacity', '0', 'important');
            // modal.style.setProperty('visibility', 'hidden', 'important');
            // modal.style.setProperty('transform', 'translate(-50%, -100%)', 'important');

        } else if (appWindow.style.opacity === '1') {

            closeModal();

            widget.style.setProperty('transform', 'translate(0, 50%)', 'important');

            appWindow.style.setProperty('opacity', '0', 'important');
            appWindow.style.setProperty('visibility', 'hidden', 'important');
            button.style.setProperty('display', 'flex', 'important');
            shadowR.querySelector(".content-container").scrollTo({top: 0});

        }

    }

    async function loadDynamicButtons() {

        const listaContainersCompleto = await getContainers();

        for (const container of listaContainersCompleto) {
            let order = container.order - 1;
            let cont = shadowR.querySelectorAll('.scrollable-content')[order];

            let titleContainer = createTitleContainer(container.title, container.description, order);

            const contentButtons = document.createElement("div");
            // contentButtons.className = "content-buttons " + (container.order === 1 ? 'active' : '');
            contentButtons.className = "content-buttons active";

            for (let i = 0; i < container.funcionalidades.length; i++) {
                const item = container.funcionalidades[i];

                let botao1 = createButton(item.title,
                    item.tooltip,
                    item.action,
                    item.order,
                    item.icon,
                    item.type,
                    item.group,
                    item?.buttons?.name);

                contentButtons.appendChild(botao1);

                if (i === container.funcionalidades.length - 1) {
                    contentLoaded = true;
                }
            }

            cont.appendChild(titleContainer);
            cont.appendChild(contentButtons);
        }

    }

    function createTitleContainer(title, description, order) {
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

    function createButton(texto, textoTooltip, acaoClique, order, classe, type, group, id) {
        if (type === 'range') {
            return createButtonRange(texto, classe, textoTooltip, id, acaoClique);
        } else if (type === 'activate') {
            return createButtonActivate(texto, textoTooltip, acaoClique, order, classe, group, id);
        } else if (type === 'radio') {
            return createButtonRadio(texto, textoTooltip, acaoClique, id);
        }
    }

    function createButtonRange(texto, classe, textoTooltip, id, acaoClique) {
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
        title.textContent = texto;

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

    function createButtonActivate(texto, textoTooltip, acaoClique, order, classe, group, id) {
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
        title.textContent = texto;

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

    function createButtonRadio(texto, textoTooltip, acaoClique, id) {

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
        title.textContent = texto;

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

    const funcoes = {

        //todo:: CRIAR AS FUNCTIONS DOS OUTROS TIPOS DE BOTAO E SETAR NO SUPABASE

        //ACTIVATE
        triggerReadableFont: function () {
            changeFontFamily(1, this);
        },
        triggerDyslexiaFont: function () {
            changeFontFamily(2, this);
        },
        triggerAlignLeft: function () {
            changeAlignText(1, this);
        },
        triggerAlignCenter: function () {
            changeAlignText(2, this);
        },
        triggerAlignRight: function () {
            changeAlignText(3, this);
        },

        triggerInvertedColors: function () {
            changeColorContrast(1, this);
        },
        triggerInteligentInvertedColors: function () {
            changeColorContrast(2, this);
        },
        triggerLightContrast: function () {
            changeColorContrast(3, this);
        },
        triggerDarkContrast: function () {
            changeColorContrast(4, this);
        },
        triggerHighContrast: function () {
            changeColorContrast(5, this);
        },
        triggerHighSaturation: function () {
            changeColorSaturation(1, this);
        },
        triggerLowSaturation: function () {
            changeColorSaturation(2, this);
        },
        triggerMonochromatic: function () {
            changeColorSaturation(3, this);
        },
        triggerProtanomaly: function () {
            changeDaltonismFilter(1, this);
        },
        triggerDeutaronomaly: function () {
            changeDaltonismFilter(2, this);
        },
        triggerTritanomaly: function () {
            changeDaltonismFilter(3, this);
        },

        triggerTextMagnifier: function () {
            changeIndividualActivateButton(this, TEXT_MAGNIFIER_KEY, setTextMagnifier);
        },
        triggerVlibras: function () {
            changeIndividualActivateButton(this, VLIBRAS_KEY, setVlibras);
        },
        triggerHighlightHover: function () {
            changeIndividualActivateButton(this, HIGHLIGHT_HOVER_KEY, setHighlightHover);
        },
        // triggerHighlightButtons: function () {
        //     changeIndividualActivateButton(this, HIGHLIGHT_BUTTONS_KEY, setHighlightButtons);
        // },
        triggerHighlightTitles: function () {
            changeIndividualActivateButton(this, HIGHLIGHT_HEADINGS_KEY, setHighlightHeading);
        },
        triggerHighlightLinks: function () {
            changeIndividualActivateButton(this, HIGHLIGHT_LINKS_KEY, setHighlightLinks);
        },
        triggerHighlightFocus: function () {
            changeIndividualActivateButton(this, HIGHLIGHT_FOCUS_KEY, setHighlightFocus);
        },


        //RANGE
        triggerFontSize: function () {
            changeRangeButton(this, FONT_SIZE_KEY, updateFontSize);
        },
        triggerContentScaling: function () {
            changeRangeButton(this, ZOOM_KEY, updateContentScaling);
        },
        triggerLineHeight: function () {
            changeRangeButton(this, LINE_HEIGHT_KEY, updateLineHeight);
        },
        triggerLetterSpacing: function () {
            changeRangeButton(this, LETTER_SPACING_KEY, updateLetterSpacing);
        }

    }

    function toInteger(str) {
        return str ? parseInt(str, 10) || 0 : 0;
    }

    async function setLocalStoregeButtonsId() {

        let buttons = await getButtons();

        for (const btn of buttons) {

            let value = localStorage.getItem(btn.name);

            if (value == null) {
                //SETA VALORES ZERADOS AO INICIAR
                localStorage.setItem(btn.name, 0);
            } else if (value == 1) {
                //SETA BOTÕES ACTIVATE
                let button = shadowR.querySelector('#' + btn.name);
                button.classList.add("btn-active"); // Ativa o botão clicado
                button.querySelector('small').textContent = 'Ligado';
            } else if (value.includes('%')) {
                let btnDiv = shadowR.querySelector('#' + btn.name);
                changeTextAndColorRangeValue(toInteger(value),
                    btnDiv);

            } else if (value.includes('rgb')) {
                //ADJUST COLORS - RADIO
                let a;

                if (btn.description === 'Adjust Text Color') {
                    a = 'adjustTextColor';
                } else if (btn.description === 'Adjust Title Color') {
                    a = 'adjustTitleColor';
                } else if (btn.description === 'Adjust Background Color') {
                    a = 'adjustBackgroundColor';
                }

                let btns = shadowR.querySelectorAll(`div[data-test=${a}]`)[0]
                    .querySelectorAll('.color-pick');

                btns.forEach(button => {
                    if (button.style.backgroundColor === value) {
                        changeAdjustColorButton(button, a)
                    }
                });


            }

        }

    }

    function assignSupportFunctions() {

        let shadowR = document.getElementById("shadow").shadowRoot;

        //BOTÃO ABRIR WIDGET
        expandButton = shadowR.querySelector("#accessibilityButton");
        expandButton.addEventListener('click', toggleExpandWindow);


        // let path = require('./assets/svg/data.json');
        // anim = loadLottieAnimation(path);

        expandButton.addEventListener('mouseenter', function(){
            // expandButton.style.width = '230.5px';
            // expandButton.style.left = '50px';
            // anim.destroy();
            // anim = loadLottieAnimation(path);
            anim.playSegments([0, 75], true);
        });


        expandButton.addEventListener('mouseleave', function(){
            // expandButton.style.width = '120px';
            // expandButton.style.left = '40px';
            // anim.destroy();
            // let path = require('./assets/svg/data.json');
            // anim = loadLottieAnimation(path);
            // anim.playSegments([60, 75], true);
        });


        //HEADER
        closeButton = shadowR.querySelectorAll(".close-button");
        closeButton.forEach(function (btn) {
            btn.addEventListener('click', toggleExpandWindow);
        });

        resetButton = shadowR.querySelector("#resetButton");
        resetButton.addEventListener('click', clearLocalStorage);


        btnSettings = shadowR.querySelector("#settings");
        btnSettings.addEventListener('click', function() {
            shadowR.querySelector('.app-window').classList.add('pagina-ativa');
            // Desabilita scroll na página que está saindo
            shadowR.querySelector('.main-page').style.overflowY = 'hidden';
        });

        btnConfigBack = shadowR.querySelector('#backButton');
        btnConfigBack.addEventListener('click', function () {
            shadowR.querySelector('.app-window').classList.remove('pagina-ativa');
            // Restaura scroll após a transição
            // setTimeout(() => {
            shadowR.querySelector('.main-page').style.overflowY = 'scroll';
            // }, 500);
        })


        modalLanguage = shadowR.querySelector('.modal-overlay');
        btnCloseModalLanguage = shadowR.querySelector('#closeLngButton');

        btnCloseModalLanguage.addEventListener('click',closeModal);
        modalLanguage.addEventListener('click',  function (e) {
            if(e.target === this){
                closeModal();
            }
        });

        shadowR.querySelector('.btn-language').addEventListener('click', openModal);


    }

    // Controle do modal
    function openModal() {
        modalLanguage.classList.add('active');
    }

    function closeModal(e) {
        modalLanguage.classList.remove('active');
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

    function updateFontSize(defaultPercentage) {

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

    }

    function setOriginalFontSizeOnLoading() {
        const lastLeafElementsWithText = getLastLeafElementsWithText();
        lastLeafElementsWithText.forEach(function (txtTag) {
            let attName = txtTag.getAttribute('original-size');
            if (attName == null) {
                txtTag.setAttribute('original-size', parseInt(window.getComputedStyle(txtTag).fontSize));
            }
        });
    }

    function loadFontSize() {

        const lastLeafElementsWithText = getLastLeafElementsWithText();

        lastLeafElementsWithText.forEach(function (txtTag) {
            //
            // let attName = txtTag.getAttribute('original-size');
            // if (attName == null) {
            //     txtTag.setAttribute('original-size', parseInt(window.getComputedStyle(txtTag).fontSize));
            // }

            if (currentFontSize != null) {
                if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
                    let initialSize = parseInt(txtTag.getAttribute('original-size'));
                    let newSize = initialSize + (initialSize * currentFontSize.percentage / 100);
                    txtTag.style.setProperty('font-size', newSize + 'px', 'important');
                }
                let porcentagem = parseFloat(currentFontSize.value.replace('%', ''));
                updateFontSize(porcentagem);
            }

        });

    }

    function updateContentScaling(percentage) {

        let zoom = calculateZoomPercentageInPixels(percentage);

        let tagsDoPrimeiroNivel = getFirstChildElementsBelowBody();
        tagsDoPrimeiroNivel.forEach(function (txtTag) {

            if (!txtTag.closest('.app-window')
                && !txtTag.closest('.accessibility-button') && txtTag.id !== 'appWindow'
                && txtTag.id !== 'shadow') {
                txtTag.style.zoom = zoom;
            }

        });

    }

    function loadContentScaling() {
        if (currentZoom !== null) {
            let percentage = parseFloat(currentZoom.value.replace('%', ''));
            updateContentScaling(percentage);
        }
    }

    function updateLineHeight(percentage) {

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

    }

    function loadLineHeight() {
        if (currentLineHeight !== null) {
            let porcentagem = parseFloat(currentLineHeight.value.replace('%', ''));
            updateLineHeight(porcentagem);
        }
    }

    function updateLetterSpacing(percentage) {

        //VALOR PADRÃO DE ADIÇÃO E REDUÇÃO - 0.2PX A CADA 10%
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

    }

    function loadLetterSpacing() {
        if (currentLetterSpacing !== null) {
            let porcentagem = parseFloat(currentLetterSpacing.value.replace('%', ''));
            updateLetterSpacing(porcentagem);
        }
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

    // function changeGroupActivateButton(btn, key, optionSelected, updateFunction) {
    //
    //         let propertySaved = getItemFromLocalStorageWithExpiry(key);
    //
    //         if (propertySaved !== null && propertySaved.value === optionSelected) {
    //             optionSelected = 0;
    //         }
    //
    //         setItemToLocalStorageWithExpiry(key,
    //         optionSelected,
    //         null,
    //         btn.id);
    //
    //         setItemGroup(btn.id);
    //
    //         updateFunction();
    //         changeStyleButtonSelectedAndDeselectOthers(btn, FONT_FAMILY_KEY);
    //
    //         // if (indexActualFontFamily === 0) {
    //         //     removeItemFromLocalStorage(FONT_FAMILY_KEY, btn.id);
    //         // } else {
    //         //     setItemToLocalStorageWithExpiry(FONT_FAMILY_KEY,
    //         //         indexActualFontFamily,
    //         //         null,
    //         //         btn.id);
    //         // }
    //
    // }

    //TODO:: TRABALHAR NESSA FUNCTION GENERICA PARA BOTOES ACTIVATE DE GRUPO

    function setTextMagnifier() {

        // Se a funcionalidade for desativada, esconde o balão
        let balao = document.querySelector(".balao");
        if(balao === null || balao === undefined || balao === ''){
            balao = criarBalao();
        }

        if (balao.style.display === 'block') {
            balao.style.setProperty('display', 'none', 'important');
        } else {
            balao.style.setProperty('display', 'block', 'important');
            getElementCursorHover();
        }
    }

    function loadTextMagnifier() {

        if (textMagnifier !== null) {
            setTextMagnifier();
        }

    }

    function changeAlignText(direction, btn) {

        let textAlignSaved = getItemFromLocalStorageWithExpiry(TEXT_ALIGN_KEY);

        if (textAlignSaved !== null && textAlignSaved.value === direction) {
            indexActualTextAlign = 0;
        } else {
            indexActualTextAlign = direction;
        }

        setAlignText();
        changeStyleButtonSelectedAndDeselectOthers(btn, TEXT_ALIGN_KEY);

        if (indexActualTextAlign === 0) {
            removeItemFromLocalStorage(TEXT_ALIGN_KEY, btn.id);
        } else {
            setItemToLocalStorageWithExpiry(TEXT_ALIGN_KEY,
                indexActualTextAlign,
                null,
                btn.id);
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
            }
        }

    }

    async function setHighlightHeading() {

        let queryTitulos = queries[0]?.value;
        let txtTags = document.querySelectorAll(queryTitulos);

        // Iterar sobre cada tag <h1> e alterar sua cor para vermelho
        txtTags.forEach(function (txtTag) {

            let attName = txtTag.getAttribute('data-inclowee-hlh-styled');

            if (attName == null) {
                txtTag.style.setProperty('outline', 'rgb(20, 111, 248) solid 2px', 'important');
                txtTag.style.setProperty('outline-offset', '2px', 'important');
                txtTag.setAttribute('data-inclowee-hlh-styled', 'true');

            } else {
                txtTag.style.outline = '';
                txtTag.style.outlineOffset = '';
                txtTag.removeAttribute("data-inclowee-hlh-styled");
            }

        });
    }

    function loadHighlightHeadings() {
        if (hightlightHeadings != null) {
            setHighlightHeading();
        }
    }

    function setHighlightLinks() {

        let queryLinks = queries[1]?.value;
        let txtTags = document.querySelectorAll(queryLinks);

        // Iterar sobre cada tag <h1> e alterar sua cor para vermelho
        txtTags.forEach(function (txtTag) {

            let attName = txtTag.getAttribute('data-inclowee-hll-styled');

            if (attName == null) {

                txtTag.style.setProperty('outline', '2px solid rgba(255, 114, 22, 0.5)', 'important');
                txtTag.style.setProperty('outline-offset', '2px', 'important');
                txtTag.setAttribute('data-inclowee-hll-styled', 'true');
            } else {
                txtTag.style.outline = '';
                txtTag.style.outlineOffset = '';
                txtTag.removeAttribute("data-inclowee-hll-styled");
            }
        });
    }

    function loadHighlightLinks() {

        if (hightlightLinks != null) {
            setHighlightLinks();
        }

    }

    // function setHighlightButtons() {
    //
    //     let queryButtons = queries[2]?.value;
    //     let txtTags = document.querySelectorAll(queryButtons);
    //
    //     // Iterar sobre cada tag <h1> e alterar sua cor para vermelho
    //     txtTags.forEach(function (txtTag) {
    //         let attName = txtTag.getAttribute('data-inclowee-hlb-styled');
    //         if (attName == null) {
    //
    //             if (!txtTag.closest('.app-window') && !txtTag.closest('.accessibility-button')) {
    //                 txtTag.style.setProperty('outline', '2px solid rgba(255, 114, 22, 0.5)', 'important');
    //                 txtTag.style.setProperty('outline-offset', '2px', 'important');
    //                 txtTag.setAttribute('data-inclowee-hlb-styled', 'true');
    //             }
    //
    //         } else {
    //             txtTag.style.outline = '';
    //             txtTag.style.outlineOffset = '';
    //             txtTag.removeAttribute("data-inclowee-hlb-styled");
    //         }
    //
    //     });
    //
    // }

    // function loadHighlightButtons() {
    //
    //     if (hightlightButtons != null) {
    //         setHighlightButtons();
    //     }
    //
    // }

    function setHighlightHover() {

        let queryButtonsAndImg = queries[3]?.value;
        let txtTags = getLastLeafElementsWithText();
        let otherItens = document.querySelectorAll(queryButtonsAndImg);

        let otherItensArray = Array.from(otherItens);
        let combined = [...txtTags, ...otherItensArray];

        const isHoverActive = getItemFromLocalStorageWithExpiry(HIGHLIGHT_HOVER_KEY);

        if (isHoverActive && isHoverActive.value) {
            combined.forEach(el => el.classList.remove('hover-active'));
        } else {
            combined.forEach(el => el.classList.add('hover-active'));
        }
    }

    function loadHighlightHover() {
        if (hightlightHover != null) {
            let queryButtonsAndImg = queries[3]?.value;
            let txtTags = getLastLeafElementsWithText();
            let otherItens = document.querySelectorAll(queryButtonsAndImg);

            let otherItensArray = Array.from(otherItens);
            let combined = [...txtTags, ...otherItensArray];

            const isHoverActive = getItemFromLocalStorageWithExpiry(HIGHLIGHT_HOVER_KEY);

            if (isHoverActive && isHoverActive.value) {
                combined.forEach(el => el.classList.add('hover-active'));
            } else {
                combined.forEach(el => el.classList.remove('hover-active'));
            }
        }
    }

    function setHighlightFocus() {
        let queryFullBody = queries[4]?.value;
        let allItens = document.querySelectorAll(queryFullBody);

        // Verifica o estado do localStorage
        const isFocusActive = getItemFromLocalStorageWithExpiry(HIGHLIGHT_FOCUS_KEY);

        if (isFocusActive && isFocusActive.value) {
            allItens.forEach(el => el.classList.remove('focus-active'));
        } else {
            allItens.forEach(el => el.classList.add('focus-active'));
        }
    }

    function loadHighlightFocus() {
        if (hightlightFocus != null) {
            let queryFullBody = queries[4]?.value;
            let allItens = document.querySelectorAll(queryFullBody);
            // Verifica o estado do localStorage
            const isFocusActive = getItemFromLocalStorageWithExpiry(HIGHLIGHT_FOCUS_KEY);

            if (isFocusActive && isFocusActive.value) {
                allItens.forEach(el => el.classList.add('focus-active'));
            } else {
                allItens.forEach(el => el.classList.remove('focus-active'));
            }
        }
    }

    function changeFontFamily(font, btn) {

        // showToast();

        let fontFam = getItemFromLocalStorageWithExpiry(FONT_FAMILY_KEY);

        if (fontFam !== null && fontFam.value === font) {
            indexActualFontFamily = 0;
        } else {
            indexActualFontFamily = font;
        }

        setFontFamily();
        changeStyleButtonSelectedAndDeselectOthers(btn, FONT_FAMILY_KEY);

        if (indexActualFontFamily === 0) {
            removeItemFromLocalStorage(FONT_FAMILY_KEY, btn.id);
        } else {
            setItemToLocalStorageWithExpiry(FONT_FAMILY_KEY,
                indexActualFontFamily,
                null,
                btn.id);
        }

    }

    function setFontFamily() {

        // let propertySaved = getItemFromLocalStorageWithExpiry(FONT_FAMILY_KEY);

        if (indexActualFontFamily !== null) {

            let queryFontFamily = queries[5]?.value;
            let selectedFontFamily = fontes[indexActualFontFamily];
            let elements = document
                .querySelectorAll(queryFontFamily);
            for (let element of elements) {

                if (!element.closest('.app-window') && !element.closest('.accessibility-button')) {
                    // Aplique os estilos apenas se não pertencer à classe 'app-window'
                    element.style.setProperty('font-family', selectedFontFamily, 'important');
                }
            }
        }

    }

    function setVlibras() {

        let display = document.getElementById("vlibras").style.display;
        if (display === 'block') {
            let btnClose = document.querySelector('.vpw-header-btn-close');
            if (btnClose == null) {
                return false;
            }
            btnClose.click();
            document.getElementById("vlibras").style.display = "none";

        } else {
            toggleExpandWindow();
            document.getElementById("vlibras").style.display = "block";
            document.getElementById("vlibrasclick").click();
        }

        return true;

    }

    function loadVlibras() {
        if (vLibras != null) {
            let display = document.getElementById("vlibras").style.display;
            if (display === 'block') {
                let btnClose = document.querySelector('.vpw-header-btn-close');
                if (btnClose == null) {
                    return false;
                }
                btnClose.click();
                document.getElementById("vlibras").style.display = "none";

            } else {
                document.getElementById("vlibras").style.display = "block";
            }

            return true;
        }
    }

    function changeColorContrast(contrast, btn) {

        let colorContrastSaved = getItemFromLocalStorageWithExpiry(COLORS_CONTRAST_KEY);

        if (colorContrastSaved !== null && colorContrastSaved.value === contrast) {
            indexActualColorContrast = 0;
        } else {
            indexActualColorContrast = contrast;
        }

        setColorContrast();
        changeStyleButtonSelectedAndDeselectOthers(btn, COLORS_CONTRAST_KEY);

        if (indexActualColorContrast === 0) {
            removeItemFromLocalStorage(COLORS_CONTRAST_KEY, btn.id);
        } else {
            setItemToLocalStorageWithExpiry(COLORS_CONTRAST_KEY,
                indexActualColorContrast,
                null,
                btn.id);
        }

    }

    function setColorContrast() {

        const filterStyle = document.getElementById('filter-incloowe');

        if (indexActualColorContrast !== null) {
            let queryContrast = queries[6]?.value;
            let queryButtons = queries[2]?.value;
            const selectedColorContrast = contrasts[indexActualColorContrast];
            const txtTags = document.querySelectorAll(queryContrast);
            const buttons = document.querySelectorAll(queryButtons);

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

        }
    }

    function loadContrastColors() {
        if (colorsContrast != null) {
            setColorContrast();
        }
    }

    function changeColorSaturation(saturation, btn) {

        let colorSaturationSaved = getItemFromLocalStorageWithExpiry(COLORS_SATURATION_KEY);

        if (colorSaturationSaved !== null && colorSaturationSaved.value === saturation) {
            indexActualColorSaturation = 0;
        } else {
            indexActualColorSaturation = saturation;
        }

        setColorSaturation();
        changeStyleButtonSelectedAndDeselectOthers(btn, COLORS_SATURATION_KEY);

        if (indexActualColorSaturation === 0) {
            removeItemFromLocalStorage(COLORS_SATURATION_KEY, btn.id);
        } else {
            setItemToLocalStorageWithExpiry(COLORS_SATURATION_KEY,
                indexActualColorSaturation,
                null,
                btn.id);
        }

    }

    function setColorSaturation() {

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
        }
    }

    function loadSaturationColors() {
        if (colorsSaturation != null) {
            setColorSaturation();
        }
    }

    function changeDaltonismFilter(daltonismFilter, btn) {

        let daltonismFilterSaved = getItemFromLocalStorageWithExpiry("daltonism-filter");

        if (daltonismFilterSaved !== null && daltonismFilterSaved.value === daltonismFilter) {
            indexActualDaltonismFilter = 0;
        } else {
            indexActualDaltonismFilter = daltonismFilter;
        }

        setDaltonismFilter();
        changeStyleButtonSelectedAndDeselectOthers(btn, DALTONISM_FILTER_KEY);

        if (indexActualDaltonismFilter === 0) {
            removeItemFromLocalStorage(DALTONISM_FILTER_KEY, btn.id);
        } else {
            setItemToLocalStorageWithExpiry(DALTONISM_FILTER_KEY,
                indexActualDaltonismFilter,
                null,
                btn.id);
        }

    }

    function setDaltonismFilter() {

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
            // svg.style.display = "none";
            svg.style.absolute = "absolute";
            svg.style.height = "0";

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

        }
    }

    function loadDaltonismFilter() {
        if (daltonismFilter != null) {
            setDaltonismFilter();
        }
    }

    //RADIO BUTTONS

    function loadTextColor() {

        if (adjustTextColor != null) {
            changeAdjustColorValue('adjustTextColor', adjustTextColor.value);
        }

    }

    function loadTitleColor() {

        if (adjustTitleColor != null) {
            changeAdjustColorValue('adjustTitleColor', adjustTitleColor.value);
        }
    }

    function loadBackgroundColor() {

        if (adjustBackgroundColor != null) {
            changeAdjustColorValue('adjustBackgroundColor', adjustBackgroundColor.value);
        }

    }

    function setAdjustColor(button, fila) {

        let selectedColor = changeAdjustColorButton(button, fila) != null ? changeAdjustColorButton(button, fila) : '';
        let selectedId;

        if (fila === 'adjustTextColor') {
            selectedId = 'ic_28';
        } else if (fila === 'adjustTitleColor') {
            selectedId = 'ic_29';
        } else if (fila === 'adjustBackgroundColor') {
            selectedId = 'ic_30';
        }

        setItemToLocalStorageWithExpiry(fila, selectedColor, null, selectedId, true);
        changeAdjustColorValue(fila, selectedColor);

    }


    function changeAdjustColorButton(button, fila) {

        let btnReset = shadowR.querySelector(`[data-test="${fila}"]`).querySelector('.button-reset-func');
        const isReset = button.classList.contains('button-reset-func');

        const updateSelectedButton = (lastSelectedButton, button) => {
            if (lastSelectedButton && lastSelectedButton !== button) {
                lastSelectedButton.innerHTML = ''; // Remove o SVG
                lastSelectedButton.classList.remove('color-pick-selected');
                lastSelectedButton.style.border = '';
            }
            return button;
        };



        const setSVG = (button, selectedColor) => {
            button.innerHTML = selectedColor === 'rgb(255, 255, 255)' ?
                `<span style=" width: 12px; height: 12px; background: black; border-radius: 50%;"></span>` :
                `<span style=" width: 12px; height: 12px; background: white; border-radius: 50%;"></span>`;
        };

        if (!isReset) {

            btnReset.disabled = false;

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

            button.style.border = 'solid 3px ' + selectedColor;

            setSVG(button, selectedColor);

            return selectedColor;

        }else {
            btnReset.disabled = true;
        }

        const currentSelected = shadowR.querySelector(`div[data-test=${fila}] .color-pick-selected`);
        if (currentSelected != null) {
            currentSelected.innerHTML = '';
            currentSelected.classList.remove('color-pick-selected');
            currentSelected.style.border = '';
        }


        return null;

    }

    function changeAdjustColorValue(fila, selectedColor) {

        const adjustColor = (fila, selectedColor) => {
            if (fila === 'adjustTitleColor') {
                let titleColorStyle = document.getElementById('title-color-incloowe') || document.createElement('style');
                titleColorStyle.id = 'title-color-incloowe';
                titleColorStyle.innerHTML = `h1, h2, h3, h4, h5, h6 { color: ${selectedColor} !important }`;
                document.head.appendChild(titleColorStyle);
            } else if (fila === 'adjustTextColor') {
                let textColorStyle = document.getElementById('text-color-incloowe') || document.createElement('style');
                textColorStyle.id = 'text-color-incloowe';
                // textColorStyle.innerHTML = `a, p, li, label, input, select, textarea, legend, code, pre, dd, dt, span,
                //  blockquote { color: ${selectedColor} !important }`;
                textColorStyle.innerHTML = `h1, h2, h3, h4, h5, h6, p, li, label, input, select, textarea, legend, code, pre, dd, dt, span,
                 blockquote { color: ${selectedColor} !important }`;

                document.head.appendChild(textColorStyle);
            } else if (fila === 'adjustBackgroundColor') {
                document.body.style.setProperty('background-color', selectedColor, 'important');
            }
        };

        const removeAdjustColor = (fila) => {
            if (fila === 'adjustTitleColor') {
                const titleColorStyle = document.getElementById('title-color-incloowe');
                if (titleColorStyle != null) {
                    titleColorStyle.innerHTML = '';
                    removeItemFromLocalStorage(ADJUST_TITLE_COLOR_KEY);
                }

            } else if (fila === 'adjustTextColor') {
                const textColorStyle = document.getElementById('text-color-incloowe');
                if (textColorStyle != null) {
                    textColorStyle.innerHTML = '';
                    removeItemFromLocalStorage(ADJUST_TEXT_COLOR_KEY);
                }
            } else if (fila === 'adjustBackgroundColor') {
                document.body.style.backgroundColor = '';
                removeItemFromLocalStorage(ADJUST_BACKGROUND_COLOR_KEY);
            }
        };

        if (selectedColor !== null && selectedColor !== "") {
            adjustColor(fila, selectedColor);
        } else {
            removeAdjustColor(fila);
        }

    }

}
