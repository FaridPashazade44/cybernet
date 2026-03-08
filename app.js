// Shared boot + navigation state + panel toggles
(function(){
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot);
  }else{
    boot();
  }

  function boot(){
    initTheme();

    // Set active nav item based on filename
    const path = location.pathname.split("/").pop() || "feed.html";
    document.querySelectorAll(".nav-item").forEach(a => {
      const href = (a.getAttribute("href") || "").split("/").pop();
      if(href && href === path) a.classList.add("active");
      else a.classList.remove("active");
    });

    // Actions
    document.body.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if(!btn) return;

      const action = btn.getAttribute("data-action");
      if(action === "toggleSidebar") toggleSidebar();
      if(action === "toggleRightPanel") toggleRightPanel();
      if(action === "openComposer") openComposer();
      if(action === "closeComposer") closeComposer();
      if(action === "openNotifications") {
        toggleRightPanel(true);
        const panel = document.getElementById("notifPanel");
        if(panel) panel.scrollIntoView({ behavior: "smooth", block: "start" });
        toast("Notifications opened");
      }
      if(action === "markAllRead") {
        const badge = document.getElementById("notifBadge");
        if(badge) badge.style.display = "none";
        toast("Marked read (demo)");
      }
    });

    // Close side panels on outside click (mobile)
    document.addEventListener("click", (e) => {
      const sidebar = document.getElementById("sidebar");
      const right = document.getElementById("rightPanel");
      const isMobile = window.matchMedia("(max-width: 920px)").matches;

      if(!isMobile) return;

      if(sidebar && sidebar.classList.contains("open")){
        const clickedInside = e.target.closest("#sidebar") || e.target.closest('[data-action="toggleSidebar"]');
        if(!clickedInside) sidebar.classList.remove("open");
      }
      if(right && right.classList.contains("open")){
        const clickedInside = e.target.closest("#rightPanel") || e.target.closest('[data-action="toggleRightPanel"]') || e.target.closest('[data-action="openNotifications"]');
        if(!clickedInside) right.classList.remove("open");
      }
    });

    // Render right-side widgets if present
    if(typeof renderTrends === "function") renderTrends();
    if(typeof renderSuggested === "function") renderSuggested();
    if(typeof renderNotificationsPreview === "function") renderNotificationsPreview();
    if(typeof renderStories === "function") renderStories();
  }

  function toggleSidebar(forceOpen){
    const el = document.getElementById("sidebar");
    if(!el) return;
    if(typeof forceOpen === "boolean") el.classList.toggle("open", forceOpen);
    else el.classList.toggle("open");
  }

  function toggleRightPanel(forceOpen){
    const el = document.getElementById("rightPanel");
    if(!el) return;
    if(typeof forceOpen === "boolean") el.classList.toggle("open", forceOpen);
    else el.classList.toggle("open");
  }

  function openComposer(){
    const el = document.getElementById("composer");
    if(!el) return;
    el.classList.add("open");
    const ta = document.getElementById("composerText");
    if(ta) ta.focus();
  }

  function closeComposer(){
    const el = document.getElementById("composer");
    if(!el) return;
    el.classList.remove("open");
  }
})();