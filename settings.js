(function(){
  const themeToggle = document.getElementById("themeToggle");
  const motionToggle = document.getElementById("motionToggle");

  // theme init
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  if(themeToggle){
    themeToggle.checked = currentTheme === "light";
    themeToggle.addEventListener("change", () => {
      setTheme(themeToggle.checked ? "light" : "dark");
      toast(`Theme: ${themeToggle.checked ? "Light" : "Dark"}`);
    });
  }

  // reduced motion init
  const savedMotion = localStorage.getItem("cyber-reduce_motion");
  if(motionToggle && savedMotion != null){
    motionToggle.checked = savedMotion === "true";
  }
  if(motionToggle){
    motionToggle.addEventListener("change", () => {
      setReducedMotion(motionToggle.checked);
      toast(`Reduced motion: ${motionToggle.checked ? "On" : "Off"}`);
    });
  }

  // initialize class state at load
  if(savedMotion != null){
    setReducedMotion(savedMotion === "true");
  }
})();