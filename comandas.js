document.addEventListener('DOMContentLoaded', () => {
    const livresSection = document.getElementById('comandas-livres');
    const andamentoSection = document.getElementById('comandas-andamento');
    const prontasSection = document.getElementById('comandas-prontas');
    const btnZerarContador = document.getElementById('zerarContador');

    carregarComandas(livresSection);

    configurarArrastavel(livresSection);
    configurarArrastavel(andamentoSection);
    configurarArrastavel(prontasSection);

    btnZerarContador.addEventListener('click', () => {
        console.log('Botão Zerar Contador clicado!');
        zerarContador();
    });
});

function carregarComandas(livresSection) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('Comanda#')) {
            const pedidos = JSON.parse(localStorage.getItem(key));

            if (Array.isArray(pedidos)) {
                criarComanda(livresSection, key, pedidos);
            } else {
                console.error(`O valor de ${key} não é um array válido. Pedidos:`, pedidos);
            }
        }
    }
}

function criarComanda(container, comandaId, pedidos) {
    const comandaDiv = document.createElement('div');
    comandaDiv.classList.add('comanda', 'livres');
    comandaDiv.setAttribute('draggable', 'true');
    comandaDiv.setAttribute('id', comandaId);

    comandaDiv.addEventListener('dragstart', arrastar);

    const titulo = document.createElement('h3');
    titulo.textContent = comandaId;
    comandaDiv.appendChild(titulo);

    const listaPedidos = document.createElement('ul');
    pedidos.forEach(pedido => {
        const li = document.createElement('li');
        li.textContent = pedido.nome;
        listaPedidos.appendChild(li);
    });
    comandaDiv.appendChild(listaPedidos);

    const btnDeletar = document.createElement('button');
    btnDeletar.textContent = 'Deletar';
    btnDeletar.addEventListener('click', () => deletarComanda(comandaDiv, comandaId));
    comandaDiv.appendChild(btnDeletar);

    container.appendChild(comandaDiv);
}

function deletarComanda(comandaDiv, comandaId) {
    comandaDiv.remove();
    localStorage.removeItem(comandaId);
}

function arrastar(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function configurarArrastavel(container) {
    container.addEventListener('dragover', permitirSoltar);
    container.addEventListener('drop', soltar);
}

function permitirSoltar(event) {
    event.preventDefault();
}

function soltar(event) {
    event.preventDefault();
    const comandaId = event.dataTransfer.getData('text');
    const comandaElement = document.getElementById(comandaId);

    comandaElement.classList.remove('livres', 'em-andamento', 'prontas');

    const newStatus = event.currentTarget.id;

    switch (newStatus) {
        case 'livres':
            comandaElement.classList.add('livres');
            comandaElement.style.backgroundColor = 'rgb(180, 180, 180)';
            break;
        case 'em-andamento':
            comandaElement.classList.add('em-andamento');
            comandaElement.style.backgroundColor = '#f0ce57';
            break;
        case 'prontas':
            comandaElement.classList.add('prontas');
            comandaElement.style.backgroundColor = '#28a745';
            break;
    }

    event.currentTarget.appendChild(comandaElement);
}

function zerarContador() {
    if (confirm('Tem certeza que deseja zerar o contador e todas as comandas?')) {

        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('Comanda#')) {
                localStorage.removeItem(key);
            }
        });

        document.getElementById('comandas-livres').innerHTML = '';
        document.getElementById('comandas-andamento').innerHTML = '';
        document.getElementById('comandas-prontas').innerHTML = '';

        localStorage.removeItem('comandaCount');
        alert('O contador foi zerado e todas as comandas foram removidas.');
    }
}

function adicionarComanda(pedidos) {
    if (!Array.isArray(pedidos)) {
        console.error('Pedidos não é um array:', pedidos);
        return;
    }

    let comandaCount = parseInt(localStorage.getItem('comandaCount'), 10) || 1;

    const comandaKey = `Comanda#${comandaCount}`;

    localStorage.setItem(comandaKey, JSON.stringify(pedidos));

    localStorage.setItem('comandaCount', (comandaCount + 1).toString());

    const livresSection = document.getElementById('comandas-livres');
    criarComanda(livresSection, comandaKey, pedidos);
}