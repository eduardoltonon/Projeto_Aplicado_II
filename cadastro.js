document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Obtém os valores dos campos
    let usuario = document.getElementById("usuario").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let confirmeSenha = document.getElementById("confirmeSenha").value;
    
    // Verifica se as senhas coincidem
    if (senha !== confirmeSenha) {
        document.getElementById("mensagem").innerText = "Essas senhas não coincidem. Tentar novamente?";
        return;
    }
    
    // Exibe uma mensagem de sucesso
    document.getElementById("mensagem").style.color = "red";
    document.getElementById("mensagem").innerText = "Usuário cadastrado com sucesso!";
    
    // Limpa os campos do formulário
    document.getElementById("formulario").reset();
});