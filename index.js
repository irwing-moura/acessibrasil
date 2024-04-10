// ******************** CRIAÇÃO DO IFRAME ********************//

window.acessiBrasil = window.acessiBrasil || {};

let iframe = document.createElement('iframe');
let expandIcon = document.createElement('button');


window.acessiBrasil.init = function init() {
    createStyles();
    createIcon();
    create();
}

function createStyles() {

    // Cria um elemento de estilo
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
    .iframe-styles {
        width: 100%;
        height: 100%;
        border: none;
        margin: 0;
        padding: 0;
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        visibility: hidden;
        z-index: 99999;
        overflow: hidden;
        transition: opacity 0.5s ease-in-out 0s, transform 0.5s ease-in-out 0s;
        transform: translateY(50%);
        opacity: 0 !important;
    }
    
    .expand-icon-styles {
        background-color: #1A6EFF;
        border: 2px solid #ffffff;
        border-radius: 50%;
        position: fixed;
        bottom: 20px;
        right: 40px;
        width: 60px;
        height: 60px;
        z-index: 999999;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
    }
    
    .widget-open {
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateY(0px) !important;
    }
    
`;

    document.head.appendChild(style);

}

function createIcon() {

    expandIcon.id = 'accessibilityButton';
    expandIcon.className = 'accessibility-button'
    expandIcon.innerHTML = '<svg width="100%" height="100%" viewBox="0 0 16.00 16.00" xmlns="http://www.w3.org/2000/svg" fill="#FFF" stroke="#FFF" stroke-width="0.00016"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.032"></g><g id="SVGRepo_iconCarrier"> <path fill="#FFF" fill-rule="evenodd" d="M13.4338078,4.18678 C13.5358078,4.65874 13.2359078,5.12406 12.7640078,5.22611 L10.0455078,5.81388 C9.58532779,5.91339 9.25686779,6.32045 9.25686779,6.7913 L9.25686779,7.67098 C9.25686779,8.62688 9.42818779,9.57506 9.76270779,10.4705 L11.3873078,14.8195 C11.5563078,15.2718 11.3266078,15.7755 10.8742078,15.9445 C10.4219078,16.1135 9.91820779,15.8837 9.74930779,15.4314 L8.19520779,11.2713 C8.03331779,10.8379 7.42032779,10.8379 7.25843779,11.2713 L5.70436779,15.4314 C5.53538779,15.8837 5.03171779,16.1135 4.57938779,15.9445 C4.12705779,15.7755 3.89734779,15.2718 4.06632779,14.8195 L5.69097779,10.4704 C6.02549779,9.57496 6.19681779,8.62678 6.19681779,7.67088 L6.19681779,6.79129 C6.19681779,6.32044 5.86835779,5.91338 5.40814779,5.81388 L2.68971779,5.22611 C2.21775779,5.12406 1.91788779,4.65874 2.01992779,4.18678 C2.12197779,3.71483 2.58729779,3.41495 3.05925779,3.517 L6.88151779,4.34344 C7.43863779,4.46389 8.01506779,4.46389 8.57218779,4.34344 L12.3944078,3.517 C12.8664078,3.41495 13.3317078,3.71483 13.4338078,4.18678 Z M7.68341779,0 C8.6491429,0 9.43201779,0.782874886 9.43201779,1.7486 C9.43201779,2.71432511 8.6491429,3.4972 7.68341779,3.4972 C6.71769267,3.4972 5.93481779,2.71432511 5.93481779,1.7486 C5.93481779,0.782874886 6.71769267,0 7.68341779,0 Z"></path> </g></svg>';

    expandIcon.addEventListener('focus', function() {
        this.style.backgroundColor = '#1038bd';
        this.style.transform = 'scale(1.1)';
        this.style.outline = '2px solid #ffffff';
        this.style.outlineOffset = '2px';
    });

// Adicione um ouvinte de evento para o evento de passar o mouse (hover)
    expandIcon.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#1038bd';
        this.style.transform = 'scale(1.1)';
        this.style.outline = '2px solid #ffffff';
        this.style.outlineOffset = '2px';
    });

// Adicione um ouvinte de evento para o evento de sair do foco
    expandIcon.addEventListener('blur', function() {
        this.style.backgroundColor = 'rgb(26, 110, 255)'; // Volta à cor de fundo padrão
        this.style.transform = ''; // Volta ao tamanho original
        this.style.outline = ''; // Remove o contorno
        this.style.outlineOffset = ''; // Remove o deslocamento do contorno
    });

// Adicione um ouvinte de evento para o evento de tirar o mouse de cima do botão
    expandIcon.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'rgb(26, 110, 255)'; // Volta à cor de fundo padrão
        this.style.transform = ''; // Volta ao tamanho original
        this.style.outline = ''; // Remove o contorno
        this.style.outlineOffset = ''; // Remove o deslocamento do contorno
    });

    expandIcon.classList.add('expand-icon-styles');
    document.body.appendChild(expandIcon);

}

function create() {

    iframe.id = 'incloowe-widget';
    iframe.src = 'https://raw.githack.com/irwing-moura/acessibrasil/develop/index.html';
    iframe.classList.add('iframe-styles');


    iframe.addEventListener('load', function() {
        console.log('Iframe carregado com sucesso.');
        expandIcon.addEventListener('click', toggleExpandWindow);
    });
    document.body.appendChild(iframe);


}
