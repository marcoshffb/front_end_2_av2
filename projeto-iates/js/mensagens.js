function obterMensagem() {
    const mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];

    const listaDiv = document.getElementById('lista-mensagens');
    listaDiv.innerHTML = "";

    if (mensagens.length === 0) {
        listaDiv.innerHTML = "<p>Nenhuma mensagem encontrada.</p>";
        return;
    }

    mensagens.forEach((msg, index) => {
        const item = document.createElement("div");
        item.classList.add("mensagem");

        const estilo = msg.visualizada ? "normal" : "bold";

        item.innerHTML = `
            <p style="font-weight:${estilo}"><strong>Nome:</strong> ${msg.nome}</p>
            <p style="font-weight:${estilo}"><strong>Email:</strong> ${msg.email}</p>
            <p style="font-weight:${estilo}"><strong>Mensagem:</strong> ${msg.mensagem}</p>

            <button class="btn-visualizar" data-index="${index}">
                ${msg.visualizada ? "Visualizada" : "Marcar como visualizada"}
            </button>

            <button class="btn-excluir" data-index="${index}">
                Excluir
            </button>
        `;

        listaDiv.appendChild(item);
    });

    document.querySelectorAll(".btn-excluir").forEach(botao => {
        botao.addEventListener("click", function () {
            const i = this.getAttribute("data-index");
            excluirMensagem(i);
        });
    });

    document.querySelectorAll(".btn-visualizar").forEach(botao => {
        botao.addEventListener("click", function () {
            marcarComoVisualizada(this.getAttribute("data-index"));
        });
    });
}

window.onload = obterMensagem;

function excluirMensagem(index) {
    const mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
    mensagens.splice(index, 1);
    localStorage.setItem('mensagens', JSON.stringify(mensagens));
    obterMensagem();
}

function marcarComoVisualizada(index) {
    let mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
    mensagens[index].visualizada = true;
    localStorage.setItem('mensagens', JSON.stringify(mensagens));
    obterMensagem();
}