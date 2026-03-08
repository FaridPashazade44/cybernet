function $(sel, root = document){ return root.querySelector(sel); }
function $all(sel, root = document){ return [...root.querySelectorAll(sel)]; }

function toast(message){
  const el = $("#toast");
  if(!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove("show"), 1600);
}

function setTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("cyber-theme", theme);
}

function initTheme(){
  const saved = localStorage.getItem("cyber-theme");
  if(saved) setTheme(saved);
}

function setReducedMotion(enabled){
  document.documentElement.classList.toggle("reduce-motion", enabled);
  localStorage.setItem("cyber-reduce-motion", String(enabled));
}

function initReducedMotion(){
  const saved = localStorage.getItem("cyber-reduce_motion");
  if(saved != null){
    setReducedMotion(saved === "true");
  }
}

function renderTrends(){
  const mount = document.getElementById("trends");
  if(!mount) return;
  mount.innerHTML = window.CYBER_DATA.trends.map(t => `
    <div class="row row--between">
      <div>
        <strong>${t.topic}</strong>
        <div class="muted">${t.meta}</div>
      </div>
      <button class="icon-btn" title="Follow topic" onclick="toast('Followed ${t.topic} (demo)')">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  `).join("");
}

function renderSuggested(){
  const mount = document.getElementById("suggested");
  if(!mount) return;
  mount.innerHTML = window.CYBER_DATA.suggested.map(u => `
    <div class="row row--between">
      <div class="row gap-10">
        <div style="position:relative">
          <img class="avatar" style="width:42px;height:42px" src="${u.avatar}" alt="${u.name}"/>
          <span class="presence ${u.online ? "online" : "offline"}" style="position:absolute;right:6px;bottom:6px"></span>
        </div>
        <div>
          <strong>${u.name}</strong>
          <div class="muted">${u.handle} • ${u.skill}</div>
        </div>
      </div>
      <button class="btn btn--ghost btn--small" onclick="toast('Followed ${u.handle} (demo)')">
        <i class="fa-solid fa-user-plus"></i><span>Follow</span>
      </button>
    </div>
  `).join("");
}

function renderNotificationsPreview(){
  const mount = document.getElementById("notificationsPreview");
  if(!mount) return;
  const items = window.CYBER_DATA.notifications.slice(0, 3);
  mount.innerHTML = items.map(n => notificationRow(n)).join("");
}

function renderNotificationsFull(){
  const mount = document.getElementById("notificationsFull");
  if(!mount) return;
  mount.innerHTML = window.CYBER_DATA.notifications.map(n => notificationRow(n)).join("");
}

function notificationRow(n){
  const accent =
    n.accent === "green" ? "alert--info" :
    n.accent === "blue" ? "alert--info" :
    n.accent === "purple" ? "alert--warning" : "alert--info";

  const iconClass = n.icon.startsWith("fa-") ? n.icon : `fa-solid ${n.icon}`;

  return `
    <div class="alert ${accent}">
      <i class="fa-solid ${n.icon}"></i>
      <div style="min-width:0">
        <div><strong>${n.type.toUpperCase()}</strong> <span class="muted">• ${n.time}</span></div>
        <div class="muted">${n.text}</div>
      </div>
    </div>
  `;
}

function renderStories(){
  const mount = document.getElementById("storiesRow");
  if(!mount) return;
  mount.innerHTML = window.CYBER_DATA.stories.map(s => `
    <div class="story" onclick="toast('${s.title}: ${s.sub} (demo)')">
      <div class="story-top">
        <span class="dot dot--${s.accent}"></span>
        <i class="fa-solid fa-ellipsis"></i>
      </div>
      <div class="story-title">${s.title}</div>
      <div class="story-sub">${s.sub}</div>
    </div>
  `).join("");
}