const progressBar = document.querySelector("#progressBar");

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const source = document.getElementById(button.dataset.copy);
    const text = source.textContent.trim();
    const previous = button.textContent;
    let copied = false;

    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      copied = document.execCommand("copy");
      textarea.remove();
    }

    button.textContent = copied ? "Готово ✓" : "Выделите текст";
    setTimeout(() => {
      button.textContent = previous;
    }, 1600);
  });
});

const ideaTabs = [...document.querySelectorAll("[data-idea-tab]")];
const ideaPanels = [...document.querySelectorAll(".idea-panel")];

ideaTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetId = tab.dataset.ideaTab;

    ideaTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    ideaPanels.forEach((panel) => {
      panel.hidden = panel.id !== targetId;
    });
  });
});

function setupTabs(tabSelector, panelSelector, dataKey) {
  const tabs = [...document.querySelectorAll(tabSelector)];
  const panels = [...document.querySelectorAll(panelSelector)];

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset[dataKey];

      tabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });

      panels.forEach((panel) => {
        panel.hidden = panel.id !== targetId;
      });
    });
  });
}

setupTabs("[data-brief-tab]", ".brief-panel", "briefTab");
setupTabs("[data-auth-tab]", ".auth-panel", "authTab");
