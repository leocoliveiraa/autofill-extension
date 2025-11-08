"use strict";
function autoFill() {
    console.log("Iniciando preenchimento automático...");
    const inputs = document.querySelectorAll("input");
    console.log(`Encontrados ${inputs.length} campos`);
    inputs.forEach((input) => {
        const name = (input.name || "").toLowerCase();
        const id = (input.id || "").toLowerCase();
        const placeholder = (input.placeholder || "").toLowerCase();
        const type = (input.type || "").toLowerCase();
        const fieldText = `${name} ${id} ${placeholder}`;
        if (fieldText.includes("name") || fieldText.includes("nome")) {
            input.value = "Cluster Teste";
            console.log("Nome preenchido");
        }
        if (fieldText.includes("email") ||
            fieldText.includes("e-mail") ||
            type === "email") {
            input.value = "cluster@teste.com";
            console.log("Email preenchido");
        }
        if (fieldText.includes("phone") ||
            fieldText.includes("tel") ||
            fieldText.includes("celular") ||
            fieldText.includes("cel") ||
            fieldText.includes("whats") ||
            fieldText.includes("fone") ||
            type === "tel") {
            input.value = "53999123456";
            console.log("Telefone preenchido");
        }
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    console.log("Preenchimento concluído!");
}
function createFloatingButton() {
    console.log("Criando botão flutuante...");
    if (document.getElementById("cluster-autofill-btn")) {
        console.log("Botão já existe, pulando criação");
        return;
    }
    const forms = document.querySelectorAll("form");
    const inputs = document.querySelectorAll("input");
    if (forms.length === 0 && inputs.length === 0) {
        console.log("Nenhum formulário encontrado nesta página");
        return;
    }
    const button = document.createElement("button");
    button.id = "cluster-autofill-btn";
    button.textContent = "Preencher Formulário";
    button.title = "Clique para preencher automaticamente";
    button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    padding: 12px 20px;
    background: linear-gradient(135deg, #00ff62, #00d956);
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 255, 98, 0.3);
    transition: all 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  `;
    button.addEventListener("mouseenter", () => {
        button.style.transform = "scale(1.05)";
        button.style.boxShadow = "0 6px 20px rgba(0, 255, 98, 0.5)";
    });
    button.addEventListener("mouseleave", () => {
        button.style.transform = "scale(1)";
        button.style.boxShadow = "0 4px 12px rgba(0, 255, 98, 0.3)";
    });
    button.addEventListener("click", () => {
        console.log("Botão clicado!");
        button.textContent = "Preenchendo...";
        button.style.background = "linear-gradient(135deg, #ffa500, #ff8c00)";
        autoFill();
        setTimeout(() => {
            button.textContent = "Preenchido!";
            button.style.background = "linear-gradient(135deg, #00ff62, #00d956)";
            setTimeout(() => {
                button.textContent = "Preencher Formulário";
            }, 2000);
        }, 1000);
    });
    document.body.appendChild(button);
    console.log("Botão criado com sucesso!");
}
function removeFloatingButton() {
    const button = document.getElementById("cluster-autofill-btn");
    if (button) {
        button.remove();
        console.log("Botão removido!");
    }
}
async function checkIfEnabled() {
    const hostname = window.location.hostname;
    const result = await chrome.storage.local.get(hostname);
    if (result[hostname] === true) {
        console.log(`✅ Extensão ATIVADA para ${hostname}`);
        createFloatingButton();
    }
    else {
        console.log(`❌ Extensão DESATIVADA para ${hostname}`);
    }
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggle") {
        if (message.enabled) {
            createFloatingButton();
        }
        else {
            removeFloatingButton();
        }
    }
});
if (document.readyState === "complete" ||
    document.readyState === "interactive") {
    checkIfEnabled();
}
else {
    window.addEventListener("load", () => {
        checkIfEnabled();
    });
}
const observer = new MutationObserver(() => {
    chrome.storage.local.get(window.location.hostname).then((result) => {
        if (result[window.location.hostname] === true) {
            if (!document.getElementById("cluster-autofill-btn")) {
                const forms = document.querySelectorAll("form");
                const inputs = document.querySelectorAll("input");
                if (forms.length > 0 || inputs.length > 0) {
                    console.log("Novo formulário detectado, criando botão");
                    createFloatingButton();
                }
            }
        }
    });
});
observer.observe(document.body, {
    childList: true,
    subtree: true,
});
//# sourceMappingURL=content.js.map