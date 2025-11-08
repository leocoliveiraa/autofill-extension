"use strict";
document.addEventListener("DOMContentLoaded", async () => {
    const toggleButton = document.getElementById("toggle");
    const statusDiv = document.getElementById("status");
    const domainDiv = document.getElementById("domain");
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url) {
        statusDiv.textContent = "❌ Não foi possível acessar esta página";
        toggleButton.disabled = true;
        return;
    }
    const url = new URL(tab.url);
    const hostname = url.hostname;
    domainDiv.textContent = `Domínio: ${hostname}`;
    const result = await chrome.storage.local.get(hostname);
    const isEnabled = result[hostname] === true;
    function updateUI(enabled) {
        if (enabled) {
            statusDiv.textContent = "✅ Ativado nesta página";
            statusDiv.className = "status active";
            toggleButton.textContent = "Desativar nesta página";
            toggleButton.className = "deactivate";
        }
        else {
            statusDiv.textContent = "❌ Desativado nesta página";
            statusDiv.className = "status inactive";
            toggleButton.textContent = "Ativar nesta página";
            toggleButton.className = "activate";
        }
    }
    updateUI(isEnabled);
    toggleButton.addEventListener("click", async () => {
        const currentResult = await chrome.storage.local.get(hostname);
        const currentStatus = currentResult[hostname] === true;
        const newStatus = !currentStatus;
        await chrome.storage.local.set({ [hostname]: newStatus });
        updateUI(newStatus);
        if (tab.id) {
            chrome.tabs.sendMessage(tab.id, {
                action: "toggle",
                enabled: newStatus,
            });
        }
    });
});
//# sourceMappingURL=popup.js.map