import fa_comment from "@fortawesome/fontawesome-free/svgs/solid/comment.svg";
import fa_paper_plane from "@fortawesome/fontawesome-free/svgs/solid/paper-plane.svg";
import fa_user_circle from "@fortawesome/fontawesome-free/svgs/solid/circle-user.svg";
import fa_street_view from "@fortawesome/fontawesome-free/svgs/solid/street-view.svg";
import fa_camera_retro from "@fortawesome/fontawesome-free/svgs/solid/camera-retro.svg";
import fa_info_circle from "@fortawesome/fontawesome-free/svgs/solid/circle-info.svg";
import fa_xmark from "@fortawesome/fontawesome-free/svgs/solid/xmark.svg";

import showMessage from "./message.js";

function showHitokoto() {
  const url = "https://quotes15.p.rapidapi.com/quotes/random/";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c2707e5c68mshfca8dab734d8e99p1ab4a1jsn6602b56167a7",
      "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
    },
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      const text = `This quote comes from... <span>「${result.originator.url}」</span>，By <span>${result.originator.name}</span> `;
      showMessage(result.content, 6000, 9);
      setTimeout(() => {
        showMessage(text, 4000, 9);
      }, 6000);
    });
}

const tools = {
  hitokoto: {
    icon: fa_comment,
    callback: showHitokoto,
  },
  asteroids: {
    icon: fa_paper_plane,
    callback: () => {
      if (window.Asteroids) {
        if (!window.ASTEROIDSPLAYERS) window.ASTEROIDSPLAYERS = [];
        window.ASTEROIDSPLAYERS.push(new Asteroids());
      } else {
        const script = document.createElement("script");
        script.src =
          "https://fastly.jsdelivr.net/gh/stevenjoezhang/asteroids/asteroids.js";
        document.head.appendChild(script);
      }
    },
  },
  "switch-model": {
    icon: fa_user_circle,
    callback: () => {},
  },
  "switch-texture": {
    icon: fa_street_view,
    callback: () => {},
  },
  photo: {
    icon: fa_camera_retro,
    callback: () => {
      showMessage("Did you take the photo? Isn't it cute?", 6000, 9);
      Live2D.captureName = "photo.png";
      Live2D.captureFrame = true;
    },
  },
  info: {
    icon: fa_info_circle,
    callback: () => {
      open("https://mindset.onthewifi.com/about");
    },
  },
  quit: {
    icon: fa_xmark,
    callback: () => {
      localStorage.setItem("waifu-display", Date.now());
      showMessage("May you reunite with important people one day.", 2000, 11);
      document.getElementById("waifu").style.bottom = "-500px";
      setTimeout(() => {
        document.getElementById("waifu").style.display = "none";
        document
          .getElementById("waifu-toggle")
          .classList.add("waifu-toggle-active");
      }, 3000);
    },
  },
};

export default tools;
