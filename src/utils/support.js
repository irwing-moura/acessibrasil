//FUNÇÕES AUXILIARES
import {
    clearLocalStorage, getItemFromLocalStorageWithExpiry,
    removeItemFromLocalStorage,
    setItemToLocalStorageWithExpiry
} from './storage.js';
import fonteUrl from "../assets/fonts/OpenDyslexic-Regular.woff";
import {getLastLeafElementsWithText} from "../queries";
import {getShadowRoot} from "../core/widget";

export function toInteger(str) {
    return str ? parseInt(str, 10) || 0 : 0;
}

export function setOriginalFontSizeOnLoading() {
    const lastLeafElementsWithText = getLastLeafElementsWithText();
    lastLeafElementsWithText.forEach(function (txtTag) {
        let attName = txtTag.getAttribute('original-size');
        if (attName == null) {
            txtTag.setAttribute('original-size', parseInt(window.getComputedStyle(txtTag).fontSize));
        }
    });
}

export function createStyleGlobal() {
    // Cria um elemento <style>
    let estiloGlobal = document.createElement('style');
    estiloGlobal.setAttribute("id", "incloowe-style")
    let fonteUrl = require('../assets/fonts/OpenDyslexic-Regular.woff');
    let fonteUrlWix = require('../assets/fonts/WixMadeforText-Regular.woff');
    let fonteUrlWixExtraBold = require('../assets/fonts/WixMadeforText-ExtraBold.woff');
    let fonteUrlWixMedium = require('../assets/fonts/WixMadeforText-Medium.woff');
    let estilo = document.createTextNode(' @font-face { ' +
        '            font-family: \'OpenDyslexic\'; ' +
        `            src: url(${fonteUrl}) format(\'woff\'); ` +
        '            font-weight: normal; ' +
        '            font-style: normal; ' +
        '        } ' +

        ' @font-face { ' +
        '            font-family: \'Wix\'; ' +
        `            src: url(${fonteUrlWix}) format(\'woff\'); ` +
        '            font-weight: normal; ' +
        '            font-style: normal; ' +
        '        } ' +

        ' @font-face { ' +
        '            font-family: \'WixExtraBold\'; ' +
        `            src: url(${fonteUrlWixExtraBold}) format(\'woff\'); ` +
        '            font-weight: normal; ' +
        '            font-style: normal; ' +
        '        } ' +

        ' @font-face { ' +
        '            font-family: \'WixMedium\'; ' +
        `            src: url(${fonteUrlWixMedium}) format(\'woff\'); ` +
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

export function expandContent(elemento) {
    let content = elemento.parentElement.parentElement.children[1];
    if (content.classList.contains('active')) {
        content.classList.remove('active')
        elemento.children[0].style.setProperty('transform', 'rotate(0deg)', 'important');
    } else {
        content.classList.toggle('active');
        elemento.children[0].style.setProperty('transform', 'rotate(180deg)', 'important');
    }


    // let a = shadowR.querySelectorAll('.content-buttons');
    //
    // let algumAtivo = Array.from(a).some(el => el.classList.contains('active'));
    // let contentContainer = shadowR.querySelector('.content-container');
    //
    // if(!algumAtivo) {
    //     contentContainer.style.height = '100%';
    // }else {
    //     contentContainer.style.height = '';
    // }


}

export function showTooltip(info) {

    //todo:: COLOCAR ESSE VISIBLE AO ABRIR O CONTAINER DE BUTTONS

    let shadowR = getShadowRoot();  // Variável privada

    let a = info.closest('.content-buttons');
    const tooltip = info.parentElement.querySelector('.tooltip-container');
    if (tooltip?.classList.contains('tooltip-container')) {
        if(tooltip.style.visibility !== 'visible') {
            a.style.overflow = 'visible';
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
        }else {
            a.style.overflow = 'hidden';
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        }
    }


    // Calcular posição relativa ao container
    const container = shadowR.querySelector('.scroll');
    const containerRect = container.getBoundingClientRect();
    const itemRect = info.getBoundingClientRect();

    const tooltipRect = tooltip.getBoundingClientRect();

    // Verifica se o tooltip ultrapassa a borda direita
    if (tooltipRect.right > window.innerWidth) {
        tooltip.style.left = 'auto'; // Remove posição à esquerda
        tooltip.style.right = '0'; // Alinha à direita do botão
    } else {
        tooltip.style.left = '0'; // Volta à posição original
        tooltip.style.right = 'auto';
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

// Controle do modal
export function openModal() {
    let shadowR = getShadowRoot();  // Variável privada
    let modalLanguage = shadowR.querySelector('.modal-overlay');
    modalLanguage.classList.add('active');
}

export function closeModal(e) {
    let shadowR = getShadowRoot();  // Variável privada
    let modalLanguage = shadowR.querySelector('.modal-overlay');
    modalLanguage.classList.remove('active');
}

//MUDA O TEXTO DO INPUT DE RANGE PARA AS PORCENTAGENS OU 'DEFAULT'
export function changeTextAndColorRangeValue(percentAcrescentar, btnDiv) {

    let percentageElement = btnDiv.querySelector('.button-range-value');
    let btnReset = btnDiv.querySelector('.button-reset-func');

    if (percentAcrescentar === 0) {
        percentageElement.style.setProperty('color', '#686868', 'important');
        percentageElement.textContent = 'Default';
        btnReset.disabled = true;
    } else {
        percentageElement.style.setProperty('color', '#000', 'important');
        percentageElement.textContent = percentAcrescentar + '%';
        btnReset.disabled = false;
    }
}

//ALTERA O ESTILO DO BOTÃO PARA SELECIONADO
export function changeStyleButtonSelected(btn) {

    let txt = btn.querySelector('small');

    if (!btn.classList.contains('btn-active')) {
        btn.classList.add("btn-active");
        txt.textContent = 'Ligado';
    } else {
        btn.classList.remove("btn-active");
        txt.textContent = 'Desligado';
    }

}

//ALTERA O ESTILO DO BOTÃO PARA SELECIONADO E DESSELECIONA OUTROS
export function changeStyleButtonSelectedAndDeselectOthers(btn, key) {
    let shadowR = getShadowRoot();  // Variável privada
    // Identifica o grupo do botão clicado com a classe que inicia com 'i' seguida de números
    const group = Array.from(btn.classList).find(classe => /^i\d+$/.test(classe));

    // Seleciona todos os botões do mesmo grupo
    let buttons = shadowR.querySelectorAll('.' + group);

    let txt = btn.querySelector('small');

    // Verifica se o botão clicado já está ativo
    if (btn.classList.contains('btn-active')) {
        // Se o botão já estiver ativo, desativa ele
        btn.classList.remove("btn-active");
        txt.textContent = 'Desligado';
    } else {
        // Caso contrário, ativa o botão clicado e desativa os outros
        buttons.forEach(button => {
            button.classList.remove("btn-active"); // Desativa todos do grupo
            removeItemFromLocalStorage(key, button.id);
            button.querySelector('small').textContent = 'Desligado';
            // changeItemGroup(button.id);
        });
        txt.textContent = 'Ligado';
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


// Função para mostrar o Toast
export function showToast() {
    let shadowR = getShadowRoot();  // Variável privada
    let toast = shadowR.querySelector(".toast");
    // Exibe o toast com animação
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Remove o toast automaticamente após 5 segundos
    setTimeout(() => {
        closeToast(toast);
    }, 5000);
}

// Função para fechar o Toast
export function closeToast() {
    let shadowR = getShadowRoot();  // Variável privada
    let toast = shadowR.querySelector(".toast");

    setTimeout(() => {
        // element.remove();
        toast.classList.remove('show');
    }, 100); // Tempo para animação de saída
}


