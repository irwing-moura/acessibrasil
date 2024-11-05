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
        let html = require('./widget.html');

        let botoes = [];

        fetch('./widget.html') // Caminho do arquivo HTML
            .then(response => response.text()) // Converte o arquivo em texto
            .then(html => {
                shadowRoot.innerHTML = html; // Insere o HTML no shadowRoot
            })
            .catch(error => {
                console.error('Erro ao carregar o HTML:', error);
            }).finally(function () {
                // let cont = shadowRoot.querySelector('#container-teste');
                // let botao = createButton('Readable Font',
                //     'Tooltip de Teste 222',
                //     () => changeFontFamily(1));
                // cont.appendChild(botao);

                //TODO:: SEGUIR COM OS OUTROS BOTÕES

                // let botao1 = createButton('Readable Font',
                //     'Tooltip de Teste 222',
                //     () => changeFontFamily(1));
                // cont.appendChild(botao1);


                document.body.appendChild(host);

            }
        );

        //FAZER O FOREACH PARA CRIAÇÃO DOS BOTÕES


        function createButton(texto, descricaoTooltip, acaoClique) {
            // Cria o botão com as classes e atributos especificados
            const botao = document.createElement('button');
            botao.className = 'content-button';
            botao.setAttribute('role', 'button');
            botao.setAttribute('aria-label', texto);
            botao.title = texto;
            botao.tabIndex = 0;

            // Cria o SVG de Info
            // const svgInfo = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            // svgInfo.setAttribute('width', '16');
            // svgInfo.setAttribute('height', '16');
            // svgInfo.setAttribute('viewBox', '0 0 24 24');
            // svgInfo.setAttribute('fill', 'none');
            // svgInfo.setAttribute('stroke', '#1a6eff');
            // svgInfo.setAttribute('stroke-width', '2.25');
            // svgInfo.setAttribute('stroke-linecap', 'round');
            // svgInfo.setAttribute('stroke-linejoin', 'round');
            // svgInfo.classList.add('lucide', 'lucide-info');
            // svgInfo.style.position = 'absolute';
            // svgInfo.style.left = '10px';
            // svgInfo.style.top = '8px';
            //
            // const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            // circle.setAttribute('cx', '12');
            // circle.setAttribute('cy', '12');
            // circle.setAttribute('r', '10');
            // svgInfo.appendChild(circle);
            //
            // const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            // path1.setAttribute('d', 'M12 16v-4');
            // svgInfo.appendChild(path1);
            //
            // const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            // path2.setAttribute('d', 'M12 8h.01');
            // svgInfo.appendChild(path2);
            //
            // botao.appendChild(svgInfo);
            //
            // // Cria a div do ícone com o segundo SVG
            // const divIcon = document.createElement('div');
            // divIcon.className = 'icon';
            //
            // const svgSpellCheck = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            // svgSpellCheck.setAttribute('width', '24');
            // svgSpellCheck.setAttribute('height', '24');
            // svgSpellCheck.setAttribute('viewBox', '0 0 24 24');
            // svgSpellCheck.setAttribute('fill', 'none');
            // svgSpellCheck.setAttribute('stroke', 'currentColor');
            // svgSpellCheck.setAttribute('stroke-width', '2');
            // svgSpellCheck.setAttribute('stroke-linecap', 'round');
            // svgSpellCheck.setAttribute('stroke-linejoin', 'round');
            // svgSpellCheck.classList.add('lucide', 'lucide-spell-check');
            //
            // const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            // path3.setAttribute('d', 'm6 16 6-12 6 12');
            // svgSpellCheck.appendChild(path3);
            //
            // const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            // path4.setAttribute('d', 'M8 12h8');
            // svgSpellCheck.appendChild(path4);
            //
            // const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            // path5.setAttribute('d', 'm16 20 2 2 4-4');
            // svgSpellCheck.appendChild(path5);
            //
            // divIcon.appendChild(svgSpellCheck);
            // botao.appendChild(divIcon);

            // Cria o span com o texto
            const span = document.createElement('span');
            span.textContent = texto;
            botao.appendChild(span);

            // Cria a div do tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-content';
            tooltip.textContent = descricaoTooltip;

            const tooltipArrow = document.createElement('span');
            tooltipArrow.className = 'tooltip-arrow';
            tooltip.appendChild(tooltipArrow);

            botao.appendChild(tooltip);

            // Adiciona o evento de clique ao botão
            botao.onclick = acaoClique;

            // Adiciona o botão ao shadowRoot
            // shadowRoot.appendChild(botao);

            return botao;
        }



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

        //TODO:: ENCONTRAR MELHOR FORMA DE RECUPERAR CLIQUE DOS BOTÕES E SYNCAR SUAS FUNCTIONS, TALVEZ USAR POR CLASSE "btn-i{number}"

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
        createshortcutsButton.onclick = () => alert('Não esta pronto ainda, meu chapinha!');

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

        shadowR.querySelectorAll('.icon-tooltip').forEach(info => {
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
