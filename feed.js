function formatTag(tag){
  const map = {
    "malware": "purple",
    "soc": "blue",
    "blue-team": "green",
    "threat-intel": "blue",
    "dfir": "purple",
    "cloudsec": "green"
  };
  const color = map[tag] || "blue";
  return `<span class="tag ${color}">#${tag}</span>`;
}

function postTemplate(p){
  const media = p.media ? `
    <div class="post-media">
      <img src="${p.media}" alt="post image"/>
    </div>
  ` : "";

  return `
    <article class="post glass" data-post-id="${p.id}">
      <div class="post-head">
        <div class="post-author">
          <img src="${p.author.avatar}" alt="${p.author.name}"/>
          <div>
            <div class="row gap-8 wrap">
              <span class="post-name">${p.author.name}</span>
              <span class="post-handle">${p.author.handle}</span>
              <span class="post-time">• ${p.time}</span>
            </div>
          </div>
        </div>
        <button class="icon-btn" title="More" onclick="toast('More actions (demo)')">
          <i class="fa-solid fa-ellipsis"></i>
        </button>
      </div>

      <div class="post-body">${escapeHtml(p.text).replace(/\n/g,"<br/>")}</div>

      <div class="post-tags">
        ${p.tags.map(formatTag).join("")}
      </div>

      ${media}

      <div class="post-actions">
        <button class="action ${p.liked ? "liked" : ""}" data-action="like">
          <i class="fa-solid fa-heart"></i>
          <span class="count" data-field="likes">${p.stats.likes}</span>
        </button>

        <button class="action" data-action="comment">
          <i class="fa-regular fa-comment-dots"></i>
          <span class="count" data-field="comments">${p.stats.comments}</span>
        </button>

        <button class="action" data-action="share">
          <i class="fa-solid fa-arrow-up-from-bracket"></i>
          <span class="count" data-field="shares">${p.stats.shares}</span>
        </button>

        <button class="action" data-action="bookmark">
          <i class="fa-regular fa-bookmark"></i>
          <span>Save</span>
        </button>
      </div>
    </article>
  `;
}

function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function renderFeed({ mountId="feed", filterAuthor=null } = {}){
  const mount = document.getElementById(mountId);
  if(!mount) return;

  const all = window.CYBER_DATA.posts;
  const posts = filterAuthor ? all.filter(p => p.author.handle === filterAuthor) : all;

  mount.innerHTML = posts.map(postTemplate).join("");

  // Interactions
  mount.addEventListener("click", (e) => {
    const btn = e.target.closest(".action");
    if(!btn) return;

    const postEl = e.target.closest("[data-post-id]");
    if(!postEl) return;

    const postId = postEl.getAttribute("data-post-id");
    const post = window.CYBER_DATA.posts.find(p => p.id === postId);
    if(!post) return;

    const action = btn.getAttribute("data-action");

    if(action === "like"){
      post.liked = !post.liked;
      post.stats.likes += post.liked ? 1 : -1;
      btn.classList.toggle("liked", post.liked);
      postEl.querySelector('[data-field="likes"]').textContent = post.stats.likes;
    }

    if(action === "comment"){
      post.stats.comments += 1;
      postEl.querySelector('[data-field="comments"]').textContent = post.stats.comments;
      toast("Comment added (demo)");
    }

    if(action === "share"){
      post.stats.shares += 1;
      postEl.querySelector('[data-field="shares"]').textContent = post.stats.shares;
      toast("Shared (demo)");
    }

    if(action === "bookmark"){
      toast("Saved to bookmarks (demo)");
    }
  });
}

(function initFeedPage(){
  if(!document.getElementById("feed")) return;

  renderFeed();

  const postBtn = document.getElementById("postBtn");
  const composerText = document.getElementById("composerText");

  if(postBtn && composerText){
    postBtn.addEventListener("click", () => {
      const text = composerText.value.trim();
      if(!text){ toast("Write something first."); return; }

      const me = window.CYBER_DATA.me;
      const newPost = {
        id: "p" + Math.random().toString(16).slice(2),
        author: { name: me.name, handle: me.handle, avatar: me.avatar },
        time: "now",
        text,
        tags: ["soc", "threat-intel"],
        media: null,
        stats: { likes: 0, comments: 0, shares: 0 },
        liked: false
      };
      window.CYBER_DATA.posts.unshift(newPost);
      composerText.value = "";
      toast("Posted (demo)");
      renderFeed();
    });
  }
})();