document.querySelector('#button').addEventListener('click', function(event) {
  event.preventDefault();

    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const mensagem = document.querySelector('#msg').value;



    if (!nome || !email || !mensagem) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const novaMensagem = {
        nome: nome,
        email: email,
        mensagem: mensagem
    };

    let mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];

    mensagens.push(novaMensagem);

    localStorage.setItem('mensagens', JSON.stringify(mensagens));

    document.querySelector('#nome').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#msg').value = '';

    alert("Mensagem enviada com sucesso!");
    
});  

function validarUsuario(objLoginSenha) {
    
    return $.ajax({
        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    });
}

function logar() {
    const email = document.getElementById("email_01").value;
    const senha = document.getElementById("senha_01").value;

    const dadosLogin = { email: email, senha: senha };

    validarUsuario(dadosLogin)
        .done(function (resposta) {

            if (email === "admin@admin.com" && senha === "1234") {
                window.location.href = "mensagens.html";
            } else {
                alert("Email ou senha incorretos!");
            }

        })
        .fail(function () {
            alert("Erro ao validar usuário (API offline?)");
        });
}
