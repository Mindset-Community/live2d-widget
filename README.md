# Live2D Widget

![](https://forthebadge.com/images/badges/built-with-love.svg)
![](https://forthebadge.com/images/badges/uses-html.svg)
![](https://forthebadge.com/images/badges/made-with-javascript.svg)
![](https://forthebadge.com/images/badges/contains-cat-gifs.svg)
![](https://forthebadge.com/images/badges/powered-by-electricity.svg)
![](https://forthebadge.com/images/badges/makes-people-smile.svg)

[Chinese](README.zh.md)

## Features

Add a Live2D mascot to your webpage. Compatible with PJAX and supports non-refresh loading.

<img src="assets/2.png" width="280"><img src="assets/3.png" width="280"><img src="assets/1.png" width="270">

(Note: The character models above are for demonstration purposes only. This repository does not include any models.)

You can also check out the example pages:

- See the effect in the lower left corner of [Mimi's blog](https://zhangshuqiao.org)
- See the effect in the lower left corner of [Mindset's website](https://mindset.onthewifi.com/)

- [demo.html](https://mi.js.org/live2d-widget/demo/demo.html), showcasing basic functionality
- [login.html](https://mi.js.org/live2d-widget/demo/login.html), mimicking the NPM login page

## Usage

If you are a beginner or only need the basic functionality, simply add this line of code to the `head` or `body` of your HTML page to load the mascot:

```xml
<script src="https://fastly.jsdelivr.net/gh/Mindset-Community/live2d-widget@latest/autoload.js"></script>
```

Where you add the code depends on how your website is constructed. For example, if you use [Hexo](https://hexo.io), you need to add the above code to the theme's template file. For pages generated with various template engines, the modification method is similar.  
If your website uses PJAX, since the mascot doesn't need to refresh on every page, make sure to place this script outside the PJAX refresh area.

**However! We strongly recommend configuring it yourself to make the mascot better suited for your website!**  
If you're interested in customizing it, please see the detailed instructions below.

## Configuration

You can refer to the `autoload.js` source code for optional configuration items. `autoload.js` automatically loads three files: `waifu.css`, `live2d.min.js`, and `waifu-tips.js`. `waifu-tips.js` creates the `initWidget` function, which is the main function for loading the mascot. The `initWidget` function accepts an Object parameter for the mascot configuration. Here are the configuration options:

| Option      | Type       | Default                                                                                 | Description                               |
| ----------- | ---------- | --------------------------------------------------------------------------------------- | ----------------------------------------- |
| `waifuPath` | `string`   | `https://fastly.jsdelivr.net/gh/Mindset-Community/live2d-widget@latest/waifu-tips.json` | Mascot resource path, can be modified     |
| `apiPath`   | `string`   | `https://live2d.fghrsh.net/api/`                                                        | API path, optional                        |
| `cdnPath`   | `string`   | `https://fastly.jsdelivr.net/gh/Mindset-Community/live2d_api/`                          | CDN path, optional                        |
| `tools`     | `string[]` | See `autoload.js`                                                                       | Buttons for loading small tools, optional |

You only need to set either the `apiPath` or `cdnPath` parameter. `apiPath` is the URL of the backend API, which you can set up yourself and add models to (requires more modifications, not covered here). You can refer to [live2d_api](https://github.com/Mindset-Community/live2d_api) for more information. The `cdnPath` loads resources via a CDN service like jsDelivr, which is more stable.

## Customization

If the options provided in the "Configuration" section above are not enough to meet your needs, you can make your own modifications. The directory structure of this repository is as follows:

- `src/waifu-tips.js` contains the logic for buttons and dialog boxes.
- `waifu-tips.js` is automatically generated from `src/waifu-tips.js`, and it is not recommended to modify it directly.
- `waifu-tips.json` defines the trigger conditions (`selector`, CSS selector) and the text displayed when triggered (`text`).
- `waifu.css` is the stylesheet for the mascot.

The default CSS selector rules in `waifu-tips.json` are effective for the Mindset Website [NotionNext theme](https://github.com/Mindset-Community/NotionNext), ~~Hexo [NexT theme](http://github.com/next-theme/hexo-theme-next)~~. To adapt it to your own webpage, you may need to modify or add new content.  
**~~Warning: The content in `waifu-tips.json` may not be suitable for all ages or for viewing at work. Please ensure it is appropriate for your use.~~**

To deploy a development and testing environment locally, you need to install Node.js and npm, and then run the following commands:

```bash
git clone https://github.com/Mindset-Community/live2d-widget.git
npm install
npm run build
```

If you have any questions, feel free to open an Issue. If you have any modification suggestions, feel free to submit a Pull Request.

## Deployment

After making modifications locally, you can deploy the modified project on a server or load it via CDN to use it on your webpage.

### Using CDN

To customize content, you can fork this repository and then push the modified content to your own repository. The usage method changes accordingly to:

```xml
<script src="https://fastly.jsdelivr.net/gh/username/live2d-widget@latest/autoload.js"></script>
```

Replace `username` with your GitHub username. To ensure that the CDN content is updated correctly, you need to create a new git tag and push it to your GitHub repository. Otherwise, `@latest` will still point to the pre-update file. Additionally, the CDN itself has caching, so changes may take some time to take effect. Relevant documentation:

- [Git Basics - Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- [Managing releases in a repository](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)

### Self-host

You can also put these files directly on your server instead of loading them via CDN.

- If you can connect to your host via `ssh`, clone the forked and modified code repository to your server.
- If your host cannot be connected via `ssh` (e.g., general virtual hosting), modify the code locally and then upload the files to the host's website directory via `ftp` or other methods.
- If you deploy a static blog using Hexo or other tools, put this project's code in the blog's source file directory (e.g., the `source` directory). When redeploying the blog, the relevant files will be automatically uploaded to the corresponding paths. To prevent these files from being incorrectly modified by Hexo plugins, you may need to set `skip_render`.

In this way, the entire project can be accessed via your domain. Try to see if you can normally open `autoload.js` and `live2d.min.js` in the browser, and ensure that the content of these files is complete and correct.  
If everything is normal, modify the constant `live2d_path` in `autoload.js` to the URL of the `live2d-widget` directory. For example, if you can access `live2d.min.js` via

```
https://example.com/path/to/live2d-widget/live2d.min.js
```

then set the value of `live2d_path` to

```
https://example.com/path/to/live2d-widget/
```

Be sure to add a `/` at the end of the path.  
After that, add

```xml
<script src="https://example.com/path/to/live2d-widget/autoload.js"></script>
```

to the interface where you want to add the mascot to load it.

## Acknowledgements

<a href="https://www.browserstack.com/">
  <picture>
    <source media="(prefers-color-scheme: dark)" height="80" srcset="https://d98b8t1nnulk5.cloudfront.net/production/images/layout/logo-header.png?1469004780">
    <source media="(prefers-color-scheme: light)" height="80" srcset="https://live.browserstack.com/images/opensource/browserstack-logo.svg">
    <img alt="BrowserStack Logo" height="80" src="https://live.browserstack.com/images/opensource/browserstack-logo.svg">
  </picture>
</a>

> Thanks to BrowserStack for allowing us to test this project in real browsers.  
> Thanks to [BrowserStack](https://www.browserstack.com/) for providing the infrastructure that allows us to test in real browsers!

<a href="https://www.jsdelivr.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" height="80" srcset="https://raw.githubusercontent.com/jsdelivr/jsdelivr-media/master/white/svg/jsdelivr-logo-horizontal.svg">
    <source media="(prefers-color-scheme: light)" height="80" srcset="https://raw.githubusercontent.com/jsdelivr/jsdelivr-media/master/default/svg/jsdelivr-logo-horizontal.svg">
    <img alt="jsDelivr Logo" height="80" src="https://raw.githubusercontent.com/jsdelivr/jsdelivr-media/master/default/svg/jsdelivr-logo-horizontal.svg">

 </picture>
</a>

> Thanks to jsDelivr for providing public CDN service.  
> Thanks jsDelivr for providing public CDN service.

The code is modified from this blog post:  
https://www.fghrsh.net/post/123.html

~~Thanks to [Hitokoto](https://hitokoto.cn) for providing the quote API.~~

When you click the paper airplane button on the mascot, an Easter egg appears, originating from [WebsiteAsteroids](http://www.websiteasteroids.com).

## More

For more content, refer to:  
https://nocilol.me/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02  
https://github.com/xiazeyu/live2d-widget.js  
https://github.com/summerscar/live2dDemo

About backend API models:  
https://github.com/xiazeyu/live2d-widget-models  
https://github.com/xiaoski/live2d_models_collection

Additionally, there are desktop versions:  
https://github.com/amorist/platelet  
https://github.com/akiroz/Live2D-Widget  
https://github.com/zenghongtu/PPet  
https://github.com/LikeNeko/L2dPetForMac

And Wallpaper Engine:  
https://github.com/guansss/nep-live2d

## License

Released under the GNU General Public License v3  
http://www.gnu.org/licenses/gpl-3.0.html

This repository does not include any models. All Live2D models, images, action data, etc., used for demonstration belong to their original authors and are for research and learning purposes only. They may not be used for commercial purposes.

Live2D official website:  
https://www.live2d.com/en/  
https://live2d.github.io

Live2D Cubism Core is provided under the Live2D Proprietary Software License.  
https://www.live2d.com/eula/live2d-proprietary-software-license-agreement_en.html  
Live2D Cubism Components are provided under the Live2D Open Software License.  
http://www.live2d.com/eula/live2d-open-software-license-agreement_en.html

> The terms and conditions do prohibit modification, but obfuscating in `live2d.min.js` would not be considered illegal modification.

https://community.live2d.com/discussion/140/webgl-developer-licence-and-javascript-question

## Changelog

On October 31, 2018, the original API provided by fghrsh was discontinued. Please update to the new address. Refer to the article:  
https://www.fghrsh.net/post/170.html

From January 1, 2020, this project no longer relies on jQuery.

From November 1, 2022, this project no longer requires users to separately load Font Awesome.
