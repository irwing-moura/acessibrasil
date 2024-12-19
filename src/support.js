//FUNÇÕES AUXILIARES
import {
    clearLocalStorage, getItemFromLocalStorageWithExpiry,
    removeItemFromLocalStorage,
    setItemToLocalStorageWithExpiry
} from './storage.js';
import fonteUrl from "./assets/fonts/OpenDyslexic-Regular.woff";

let shadowR;  // Variável privada

export function setShadowRoot(root) {
    shadowR = root;
}

export function createStyleGlobal() {
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

export function openModalHideButtonOrNot() {
    const appWindow = shadowR.querySelector("#appWindow");
    appWindow.style.setProperty('background', 'rgb(0 0 0 / 30%)', 'important');

    const modal = shadowR.querySelector("#modal-hide");
    modal.style.setProperty('opacity', '1', 'important');
    modal.style.setProperty('visibility', 'visible', 'important');
    modal.style.setProperty('transform', 'translate(-50%, -20%)', 'important');
}

export function expandContent(elemento) {
    let content = elemento.parentElement.parentElement.children[1];
    if (content.classList.contains('active')) {
        content.classList.remove('active')
        elemento.style.setProperty('transform', 'rotate(90deg)', 'important');
    } else {
        content.classList.toggle('active');
        elemento.style.setProperty('transform', 'rotate(0deg)', 'important');
    }
}

export function showTooltip(info) {

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
}


export function toggleExpandWindow() {

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

export function hideWidget() {

    let msg = shadowR.querySelector('#msgBtnDisable');
    let spinner = shadowR.querySelector('#loading-bar-spinner');

    msg.style.setProperty('display', 'none');
    spinner.style.setProperty('display', 'block');

    setTimeout(function () {
        clearLocalStorage();
        setItemToLocalStorageWithExpiry("widget-status", 'hide', null);
    }, 1500);

}


//MUDA O TEXTO DO INPUT DE RANGE PARA AS PORCENTAGENS OU 'DEFAULT'
export function changeTextAndColorRangeValue(percentAcrescentar, percentageElement) {
    if (percentAcrescentar === 0) {
        percentageElement.style.setProperty('color', '#686868', 'important');
        percentageElement.textContent = 'Default';
    } else {
        percentageElement.style.setProperty('color', 'var(--lead-color)', 'important');
        percentageElement.textContent = percentAcrescentar + '%';
    }
}

//ALTERA O ESTILO DO BOTÃO PARA SELECIONADO
export function changeStyleButtonSelected(btn) {

    if (!btn.classList.contains('btn-active')) {
        btn.classList.add("btn-active");
    } else {
        btn.classList.remove("btn-active");
    }

}

//ALTERA O ESTILO DO BOTÃO PARA SELECIONADO E DESSELECIONA OUTROS
export function changeStyleButtonSelectedAndDeselectOthers(btn, key) {
    // Identifica o grupo do botão clicado com a classe que inicia com 'i' seguida de números
    const group = Array.from(btn.classList).find(classe => /^i\d+$/.test(classe));

    // Seleciona todos os botões do mesmo grupo
    let buttons = shadowR.querySelectorAll('.' + group);

    // Verifica se o botão clicado já está ativo
    if (btn.classList.contains('btn-active')) {
        // Se o botão já estiver ativo, desativa ele
        btn.classList.remove("btn-active");
    } else {
        // Caso contrário, ativa o botão clicado e desativa os outros
        buttons.forEach(button => {
            button.classList.remove("btn-active"); // Desativa todos do grupo
            removeItemFromLocalStorage(key, button.id);
            // changeItemGroup(button.id);
        });
        btn.classList.add("btn-active"); // Ativa o botão clicado
    }
}

//CALCULA O ZOOM PARA DAR NAS PALAVRAS DE ACORDO COM A PORCENTAGEM
export function calculateZoomPercentageInPixels(percentage) {
    let zoomValue = percentage * 0.32;
    zoomValue = 1 + (zoomValue / 100);
    return zoomValue;
}

//CALCULA O ESPAÇAMENTO PARA DAR NAS PALAVRAS DE ACORDO COM A PORCENTAGEM
export function calculateLetterSpacingInPixels(percentage) {
    let letterSpacing = percentage * 2;
    letterSpacing = (letterSpacing / 100);
    return letterSpacing;
}

// ******************** LUPA - TEXT MAGNIFIER ********************//

export function getElementCursorHover() {
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

                const tagsQueDevemMostrarBalaoMesmoComMaisDeUmItem = [
                    "select", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "dl", "dt", "dd", "li", "a", "p", "span",
                    "a", "strong", "em", "b", "i", "u", "s", "q", "abbr", "cite", "code", "kbd", "mark", "time"
                ];

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

// Função para criar o balão
export function criarBalao() {
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
