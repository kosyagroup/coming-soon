const App = (onstart, onload) => {
  onstart();
  const span = document.createElement("span");
  span.innerText = "Website loaded";
  const img = document.createElement("img");
  img.src = "https://picsum.photos/640/480";
  img.className = "loading";
  img.onload = () => {
    img.className = "";
    onload();
  };

  const app = document.getElementById("app");
  app.innerHTML = "";
  app.append(span);
  app.append(img);
};

let isSlow;
let loaded;
const loadApp = () => {
  App(
    () => {
      loaded = false;
      isSlow = setTimeout(() => {
        document.body.className = "slow";
        console.debug("slow");
      }, 1500);
    },
    () => {
      loaded = true;
      clearTimeout(isSlow);
      setTimeout(() => {
        document.body.className = "";
      }, 1000);
      console.debug("loaded");
    },
  );
};

window.addEventListener("offline", () => {
  document.body.className = "offline";
});

window.addEventListener("online", () => {
  document.body.className = "online";
  console.log("online");
  setTimeout(() => {
    document.body.className = "";
  }, 1000);
  if (!loaded) {
    console.debug("Reconectando...");
    loadApp();
  }
});

window.addEventListener("DOMContentLoaded", loadApp);
