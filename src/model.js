import showMessage from "./message.js";
import randomSelection from "./utils.js";

import * as PIXI from "pixi.js";
import { Live2DModel } from "pixi-live2d-display";

// expose PIXI to window so that this plugin is able to
// reference window.PIXI.Ticker to automatically update Live2D models
window.PIXI = PIXI;

class Model {
  constructor(config) {
    let { apiPath, cdnPath } = config;
    let useCDN = false;
    if (typeof cdnPath === "string") {
      useCDN = true;
      if (!cdnPath.endsWith("/")) cdnPath += "/";
    } else if (typeof apiPath === "string") {
      if (!apiPath.endsWith("/")) apiPath += "/";
    } else {
      throw "Invalid initWidget argument!";
    }
    this.useCDN = useCDN;
    this.apiPath = apiPath;
    this.cdnPath = cdnPath;
  }

  async loadModelList() {
    const response = await fetch(`${this.cdnPath}model_list.json`);
    this.modelList = await response.json();
  }

  async loadModelPixi(id, jsonpath) {
    const element = document.getElementById(id);
    const app = new PIXI.Application({
      view: element,
      transparent: true,
    });
    const model = await Live2DModel.from(jsonpath);

    app.stage.addChild(model);

    const parentWidth = element.width;
    const parentHeight = element.height;
    // Scale to fit the stage
    const ratio = Math.min(
      parentWidth / model.width,
      parentHeight / model.height
    );
    model.scale.set(ratio, ratio);
    // Align bottom and center horizontally

    model.x = (parentWidth - model.width) / 2;
    model.y = parentHeight - model.height;
  }

  async loadModel(modelId, modelTexturesId, message) {
    localStorage.setItem("modelId", modelId);
    localStorage.setItem("modelTexturesId", modelTexturesId);
    showMessage(message, 4000, 10);
    if (this.useCDN) {
      if (!this.modelList) await this.loadModelList();
      const target = randomSelection(this.modelList.models[modelId]);
      //loadlive2d("live2d", `${this.cdnPath}model/${target}/index.json`);
      this.loadModelPixi("live2d", `${this.cdnPath}model/${target}/index.json`);
    } else {
      //loadlive2d("live2d", `${this.apiPath}get/?id=${modelId}-${modelTexturesId}`);
      this.loadModelPixi(
        "live2d",
        `${this.apiPath}get/?id=${modelId}-${modelTexturesId}`
      );
      console.log(`Live2D 模型 ${modelId}-${modelTexturesId} 加载完成`);
    }
  }

  async loadRandModel() {
    const modelId = localStorage.getItem("modelId"),
      modelTexturesId = localStorage.getItem("modelTexturesId");
    if (this.useCDN) {
      if (!this.modelList) await this.loadModelList();
      const target = randomSelection(this.modelList.models[modelId]);
      //loadlive2d("live2d", `${this.cdnPath}model/${target}/index.json`);
      this.loadModelPixi("live2d", `${this.cdnPath}model/${target}/index.json`);
      showMessage("Is my new clothes nice-looking?", 4000, 10);
    } else {
      // 可选 "rand"(随机), "switch"(顺序)
      fetch(`${this.apiPath}rand_textures/?id=${modelId}-${modelTexturesId}`)
        .then((response) => response.json())
        .then((result) => {
          if (
            result.textures.id === 1 &&
            (modelTexturesId === 1 || modelTexturesId === 0)
          )
            showMessage("I don't have any other clothes yet!", 4000, 10);
          else
            this.loadModel(
              modelId,
              result.textures.id,
              "Are my new clothes nice?"
            );
        });
    }
  }

  async loadOtherModel() {
    let modelId = localStorage.getItem("modelId");
    if (this.useCDN) {
      if (!this.modelList) await this.loadModelList();
      const index = ++modelId >= this.modelList.models.length ? 0 : modelId;
      this.loadModel(index, 0, this.modelList.messages[index]);
    } else {
      fetch(`${this.apiPath}switch/?id=${modelId}`)
        .then((response) => response.json())
        .then((result) => {
          this.loadModel(result.model.id, 0, result.model.message);
        });
    }
  }
}

export default Model;
