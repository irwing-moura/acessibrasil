var txtTags = document.querySelectorAll('h1, h2, h3, h4, h5, span');

// No início do seu script ou onde você inicializa suas variáveis
txtTags.forEach(function(txtTag) {
    // Armazenar o tamanho inicial como um atributo de dados
    txtTag.setAttribute('data-initial-size-' + txtTag.tagName, parseInt(window.getComputedStyle(txtTag).fontSize));
});


function init() {

  createIcon();

  // Recuperar valores do armazenamento local e aplicar as alterações
  

  txtTags.forEach(function(txtTag) {

    var savedSize = sessionStorage.getItem(txtTag.tagName);

    if (savedSize !== null) {
        txtTag.style.fontSize = savedSize + 'px';
    }


});

}

function changeSize(value) {


  txtTags.forEach(function(txtTag) {


    var attName = txtTag.getAttribute('data-initial-size-' + txtTag.tagName);
    var initialSize = parseInt(attName); 

    var newSize = initialSize * value /100;
    txtTag.style.fontSize = newSize + 'px';


    // Salvar o valor no armazenamento local
    sessionStorage.setItem(txtTag.tagName, newSize);   


  });

}


function changeColor() {

    // Iterar sobre cada tag <h1> e alterar sua cor para vermelho
    txtTags.forEach(function(txtTags) {
      txtTags.style.color = 'red';
        
    });
  
  }

function createIcon() {

  // Criar o ícone arredondado dinamicamente
  var expandIcon = document.createElement('div');
  expandIcon.id = 'expand-icon';
  expandIcon.innerHTML = '+';
  expandIcon.style.position = 'fixed';
  expandIcon.style.bottom = '20px';
  expandIcon.style.right = '20px';
  expandIcon.style.width = '50px';
  expandIcon.style.height = '50px';
  expandIcon.style.backgroundColor = '#3498db';
  expandIcon.style.color = '#fff';
  expandIcon.style.borderRadius = '50%';
  expandIcon.style.display = 'flex';
  expandIcon.style.alignItems = 'center';
  expandIcon.style.justifyContent = 'center';
  expandIcon.style.cursor = 'pointer';
  expandIcon.onclick = toggleExpandWindow;

  document.body.appendChild(expandIcon);


  // Criar a janela expansível dinamicamente
  var expandWindow = document.createElement('div');
  expandWindow.id = 'expand-window';
  expandWindow.innerHTML = `
        <label>
            Size: <input type="range" min="50" max="500" step="1" value="100" oninput="changeSize(this.value)">
        </label>
    `;

//     expandWindow.innerHTML = `
//     <label>
//         Size: <input type="range" min="50" max="500" step="1" value="100" oninput="changeSize(this.value)">
//     </label>
//     <br>
//     <label>
//         Color: <input type="range" min="0" max="100" step="1" value="50" oninput="changeColor()">
//     </label>
// `;

  expandWindow.style.display = 'none';
  expandWindow.style.position = 'fixed';
  expandWindow.style.bottom = '80px';
  expandWindow.style.right = '20px';
  expandWindow.style.padding = '10px';
  expandWindow.style.backgroundColor = '#fff';
  expandWindow.style.border = '1px solid #ccc';
  expandWindow.style.borderRadius = '5px';
  document.body.appendChild(expandWindow);

}



function toggleExpandWindow() {
  var expandWindow = document.getElementById('expand-window');
  expandWindow.style.display = (expandWindow.style.display === 'none' || expandWindow.style.display === '') ? 'block' : 'none';
}

window.init = init;