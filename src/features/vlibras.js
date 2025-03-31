import {VLIBRAS_KEY} from '../core/constants';
import {getItemFromLocalStorageWithExpiry} from '../utils/storage';
import {toggleExpandWindow} from "../core/components";

let vLibras = getItemFromLocalStorageWithExpiry(VLIBRAS_KEY);

export function initializeVlibras() {

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

export function applyVLibras() {

    let display = document.getElementById("vlibras").style.display;
    if (display === 'block') {
        let btnClose = document.querySelector('.vpw-header-btn-close');
        if (btnClose != null) {
            // return false;
            btnClose.click();
        }
        document.getElementById("vlibras").style.display = "none";

    } else {
        toggleExpandWindow();
        document.getElementById("vlibras").style.display = "block";
        document.getElementById("vlibrasclick").click();
    }

    return true;

}

export function loadVlibras() {
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