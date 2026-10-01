# Kana Trainer 假名学习

纯前端项目，没有构建步骤。双击 `index.html` 就能在浏览器里打开。

## 文件结构
| 文件 | 作用 |
|---|---|
| `index.html` | 页面结构（各标签页和弹窗的 HTML） |
| `css/style.css` | 全部样式，颜色等设置在文件开头的变量里 |
| `js/data.js` | 假名表数据（`DEF`）和通用小工具。**增删假名改这里** |
| `js/stroke-data.js` | 笔顺数据，来自 KanjiVG（CC BY-SA 3.0），一般不用改 |
| `js/audio.js` | 发音（浏览器自带的日语语音） |
| `js/strokes.js` | 笔顺动画 |
| `js/chart.js` | 假名表和点击后的弹窗 |
| `js/settings.js` | 顶部标签切换、出题范围、出题方式（`MODES`） |
| `js/recognition.js` | 手写识别算法 |
| `js/pad.js` | 手写画板（鼠标、触屏、触控板模式） |
| `js/quiz-write.js` | 手写测验 |
| `js/try-write.js` | 假名表弹窗里的试写 |
| `js/quiz-choose.js` | 选择题 |
| `js/mistakes.js` | 错题本（存在浏览器 localStorage） |

脚本是普通 `<script>`，按 `index.html` 底部的顺序加载，共用全局变量。
所以新增脚本要放在它依赖的脚本之后。没有用 ES Module，是为了双击打开（file://）也能运行。

## 常见修改
- 加一组假名：在 `js/data.js` 的 `DEF` 里加一项（宽度、平假名行、罗马音行）。
- 加一种题型：在 `js/settings.js` 的 `MODES` 里加一项，形如 `['k>r','…']`。
- 改识别的宽松程度：看 `js/recognition.js` 和 `js/quiz-write.js` 里的 `judge`。

## 部署
把整个文件夹放到任意静态托管（GitHub Pages、Netlify、Cloudflare Pages）即可。

## 致谢
笔顺数据：KanjiVG，https://kanjivg.tagaini.net ，CC BY-SA 3.0。
