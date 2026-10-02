# Japanese Kana Trainer

A web app for learning Japanese kana through charts, handwriting practice, quizzes, and mistake tracking.

## Overview

Kana Practice is a pure frontend web app that helps you learn hiragana and katakana. It includes a full kana chart with stroke order and audio, two quiz modes with handwriting recognition, stroke order animations, and a mistakes notebook that tracks what you get wrong and what you confuse each kana with.

No build step is required. Just open `index.html` in your browser.

## Features

### Kana Chart

- Full kana table: hiragana, katakana, romaji, stroke order, and audio.
- Click any kana to open a popup with stroke order animation and audio playback.
- **Try Writing**: click `Try writing` in the popup to open a drawing canvas. Write the kana and click `Check`.
  - The app shows the most likely candidates based on similarity, e.g. `Not quite · looks like 90% ぬ, 10% め`.
  - If the correct answer is not in the top candidates, it is appended with its own percentage.
  - When correct, it shows `Correct · looks like …` and then displays the standard stroke order for comparison.
  - Percentages are estimated from similarity, not strict probabilities. Visually similar kana such as シ/ツ and ソ/ン may give less stable results.

### Quizzes

There are two quiz modes.

**Write Quiz**
- Randomly selects a kana and gives you a prompt:
  - Romaji → write the kana
  - Katakana → write the hiragana
  - Hiragana → write the katakana
- You write by hand, and the app recognizes your handwriting automatically.

**Choose Quiz**
- Gives you a prompt and multiple choices:
  - Romaji → choose the kana
  - Katakana → choose the hiragana
  - Hiragana → choose the katakana
  - Audio → choose the kana
  - And more.

### Stroke Order Animation

- Stroke data from KanjiVG is embedded directly in the page.
- Covers hiragana, katakana, including dakuten and yōon.
- Click any kana in the chart to open a popup that draws each stroke in order and labels stroke numbers.
- In the popup you can:
  - Switch between hiragana and katakana
  - Replay the stroke order
  - Hear the pronunciation
- After submitting a handwriting quiz answer, the correct answer's stroke order animation plays automatically.

### Mistakes Notebook

- Records every wrong answer from both handwriting and multiple-choice quizzes.
- For each kana, it stores:
  - Number of wrong answers
  - Number of correct answers
  - Accuracy
  - The kana you most often confused it with
    - For handwriting: the kana recognized by the system
    - For multiple choice: the option you selected
- The mistakes page sorts entries by wrong count, descending.
- Each row shows: hiragana, katakana, romaji, wrong count, accuracy, and “mixed up with X”.
- Click any row to open a popup with stroke order animation and audio for that kana.
- **Practice: Write** and **Practice: Choose** buttons jump directly into mistakes-only handwriting or multiple-choice practice.
- If you answer a kana correctly 3 times in a row, it is removed from the review list, but its historical accuracy is kept.
- **Clear all** clears all records.
- **Mistakes only** toggle is available in both quiz pages, so you can switch at any time.
- Handwriting recognition and multiple-choice distractors still use the groups you selected (Basic, Dakuten, Combo), so practice does not become too easy even if you only have one or two mistakes.
- Mistake records are stored in the browser's localStorage.
  - They persist on the same device and browser.
  - They are lost if you change devices or clear your browser data.

## How to Run

This is a pure frontend project with no build step.

1. Download or clone the project.
2. Double-click `index.html` to open it in your browser.

## File Structure

| File | Purpose |
|---|---|
| `index.html` | Page structure (HTML for tabs and popups) |
| `css/style.css` | All styles. Colors and other settings are in variables at the top of the file. |
| `js/data.js` | Kana table data (`DEF`) and general utilities. |
| `js/stroke-data.js` | Stroke order data from KanjiVG (CC BY-SA 3.0). |
| `js/audio.js` | Pronunciation using the browser's built-in Japanese speech synthesis. |
| `js/strokes.js` | Stroke order animation. |
| `js/chart.js` | Kana chart and click popups. |
| `js/settings.js` | Top tab switching, quiz scope, and quiz modes (`MODES`). |
| `js/recognition.js` | Handwriting recognition algorithm. |
| `js/pad.js` | Handwriting canvas (mouse and touch). |
| `js/quiz-write.js` | Handwriting quiz. |
| `js/try-write.js` | Try Writing in the kana chart popup. |
| `js/quiz-choose.js` | Multiple-choice quiz. |
| `js/mistakes.js` | Mistakes notebook (stored in browser localStorage). |

## Development Notes

- Scripts are plain `<script>` tags loaded in order at the bottom of `index.html`.
- They share global variables.
- New scripts must be placed after the scripts they depend on.
- ES modules are not used so that the app works when opened directly via `file://`.

## Credits

- Stroke order data: [KanjiVG](https://kanjivg.tagaini.net/), licensed under CC BY-SA 3.0.
- Audio: browser's built-in Japanese speech synthesis.

## License

TBD