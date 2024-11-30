document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    // Login do usuário
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    const mensagemErro = document.getElementById('mensagemErro');

    // Validação do login
    if (nome === "admin" && senha === "12345") {
        alert("Sucesso!");
        location.href = "home.html";
    } else {
        mensagemErro.textContent = "Usuário ou senha incorretos!";
    }
});