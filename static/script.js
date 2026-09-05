const messagesEl = document.getElementById("messages");
const formEl = document.getElementById("chatForm");
const inputEl = document.getElementById("userInput");
const historyList = document.getElementById("historyList");

let activeIndex = -1;
let history = [];
let chatTitle = "New Chat";

function getChats() {
  return JSON.parse(localStorage.getItem("chats") || "[]");
}
function saveChats(all) {
  localStorage.setItem("chats", JSON.stringify(all));
}

function saveToSidebar() {
  historyList.innerHTML = "";
  const all = getChats();
  all.forEach((c, i) => {
    const li = document.createElement("li");
    li.className = "hist-item" + (i === activeIndex ? " active" : "");

    const title = document.createElement("span");
    title.className = "hist-title";
    title.textContent = c.title;
    title.title = c.title;
    title.onclick = () => loadChat(i);

    // ---- three-dot menu ----
    const menuWrap = document.createElement("div");
    menuWrap.className = "menu-wrap";

    const dots = document.createElement("button");
    dots.className = "dots";
    dots.textContent = "⋮";
    dots.onclick = (e) => {
      e.stopPropagation();
      closeAllMenus();
      menuWrap.classList.add("open");
      menuWrap.querySelector(".menu").style.display = "block";
    };

    const menu = document.createElement("div");
    menu.className = "menu";
    menu.style.display = "none";

    const rename = document.createElement("button");
    rename.textContent = "✎ Rename";
    rename.onclick = () => { menu.style.display = "none"; renameChat(i); };

    const share = document.createElement("button");
    share.textContent = "↗ Share";
    share.onclick = () => { menu.style.display = "none"; shareChat(i); };

    const del = document.createElement("button");
    del.textContent = "🗑 Delete";
    del.className = "menu-danger";
    del.onclick = () => { menu.style.display = "none"; deleteChat(i); };

    menu.append(rename, share, del);
    menuWrap.append(dots, menu);
    li.append(title, menuWrap);
    historyList.appendChild(li);
  });
}

function closeAllMenus() {
  document.querySelectorAll(".menu-wrap.open").forEach((w) => {
    w.classList.remove("open");
    w.querySelector(".menu").style.display = "none";
  });
}

function addBubble(text, who) {
  const div = document.createElement("div");
  div.className = "bubble " + who;
  if (who === "bot") {
    div.innerHTML = marked.parse(text);
    div.querySelectorAll("pre code").forEach((el) => hljs.highlightElement(el));
  } else {
    div.textContent = text;
  }
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function startNewChat() {
  activeIndex = -1;
  history = [];
  chatTitle = "New Chat";
  messagesEl.innerHTML = "";
  inputEl.focus();
  saveToSidebar();
}

function persistCurrentChat() {
  if (history.length === 0) return;
  const all = getChats();
  if (activeIndex === -1) {
    all.push({ title: chatTitle, history: history.slice() });
    activeIndex = all.length - 1;
  } else {
    all[activeIndex].history = history.slice();
  }
  saveChats(all);
  saveToSidebar();
}

async function send() {
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = "";

  addBubble(text, "user");
  history.push({ role: "user", content: text });

  if (history.filter((m) => m.role === "user").length === 1) {
    chatTitle = text.slice(0, 30);
  }

  const typing = document.createElement("div");
  typing.className = "bubble bot";
  typing.textContent = "…";
  messagesEl.appendChild(typing);

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ history }),
  });
  const data = await res.json();

  typing.remove();
  addBubble(data.reply, "bot");
  history.push({ role: "assistant", content: data.reply });

  persistCurrentChat();
}

function loadChat(index) {
  const all = getChats();
  const chat = all[index];
  if (!chat) return;
  closeAllMenus();
  activeIndex = index;
  history = chat.history ? chat.history.slice() : [];
  chatTitle = chat.title;
  messagesEl.innerHTML = "";
  history.forEach((m) => addBubble(m.content, m.role === "user" ? "user" : "bot"));
  saveToSidebar();
}

// ---- Actions ----
function clearAllChats() {
  if (!confirm("Delete ALL chat history? This cannot be undone.")) return;
  saveChats([]);
  startNewChat();
}

function deleteChat(index) {
  const all = getChats();
  if (index >= all.length) return;
  if (!confirm(`Delete "${all[index].title}"?`)) return;
  all.splice(index, 1);
  if (activeIndex === index) startNewChat();
  else if (activeIndex > index) activeIndex -= 1;
  saveChats(all);
  saveToSidebar();
}

function renameChat(index) {
  const all = getChats();
  const chat = all[index];
  const name = prompt("Rename this chat:", chat.title);
  if (name === null || name.trim() === "") return;
  chat.title = name.trim().slice(0, 50);
  if (activeIndex === index) chatTitle = chat.title;
  saveChats(all);
  saveToSidebar();
}

function shareChat(index) {
  const all = getChats();
  const chat = all[index];
  const transcript = (chat.history || [])
    .map((m) => `${m.role === "user" ? "You" : "Hacker"}:\n${m.content}`)
    .join("\n\n---\n\n");
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(`Chat: ${chat.title}\n\n${transcript}`);
    alert("Chat copied to clipboard — paste it anywhere to share.");
  } else {
    const ta = document.createElement("textarea");
    ta.value = `Chat: ${chat.title}\n\n${transcript}`;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    alert("Chat copied to clipboard.");
  }
}

// Close any open menu when clicking elsewhere
document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-wrap")) closeAllMenus();
});

formEl.addEventListener("submit", (e) => { e.preventDefault(); send(); });
saveToSidebar();