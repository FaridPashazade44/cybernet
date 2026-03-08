(function(){
  const list = document.getElementById("chatList");
  const body = document.getElementById("chatBody");
  if(!list || !body) return;

  const chats = window.CYBER_DATA.chats;
  let activeId = chats[0]?.id;

  function renderList(){
    list.innerHTML = chats.map(c => {
      const last = c.messages[c.messages.length - 1]?.text || "";
      return `
        <div class="chat-item ${c.id === activeId ? "active" : ""}" data-chat-id="${c.id}">
          <div style="position:relative">
            <img src="${c.contact.avatar}" alt="${c.contact.name}"/>
            <span class="presence ${c.contact.online ? "online" : "offline"}" style="position:absolute;right:6px;bottom:6px"></span>
          </div>
          <div class="meta">
            <div class="name">${c.contact.name}</div>
            <div class="last">${escapeHtml(last)}</div>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderChat(){
    const c = chats.find(x => x.id === activeId);
    if(!c) return;

    document.getElementById("chatAvatar").src = c.contact.avatar;
    document.getElementById("chatName").textContent = c.contact.name;
    document.getElementById("chatSubtitle").textContent = c.contact.subtitle;
    const pres = document.getElementById("chatPresence");
    pres.className = "presence " + (c.contact.online ? "online" : "offline");

    body.innerHTML = c.messages.map(m => `
      <div class="bubble ${m.from === "me" ? "me" : ""}">
        <div>${escapeHtml(m.text)}</div>
        <div class="time">${m.time}</div>
      </div>
    `).join("");

    body.scrollTop = body.scrollHeight;
  }

  function escapeHtml(s){
    return String(s)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  list.addEventListener("click", (e) => {
    const item = e.target.closest(".chat-item");
    if(!item) return;
    activeId = item.getAttribute("data-chat-id");
    renderList();
    renderChat();
  });

  const sendBtn = document.getElementById("sendBtn");
  const input = document.getElementById("chatText");
  function send(){
    const text = input.value.trim();
    if(!text) return;

    const c = chats.find(x => x.id === activeId);
    c.messages.push({ from: "me", text, time: "Now" });
    input.value = "";
    renderList();
    renderChat();
  }

  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", (e) => {
    if(e.key === "Enter") send();
  });

  renderList();
  renderChat();
})();