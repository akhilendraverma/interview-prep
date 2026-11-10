# IT Interview Prep

Free IT interview practice: assessments in 15 areas with a personal focus report, plus HackerRank-style coding challenges that run in the browser.

- **Assessments:** UNIX/Linux, SQL, Windows Server, AWS, Azure, Python, Java, JavaScript, AI & ML, Software Testing, QA, Project Management, Production Support, DevOps and SRE (330+ questions, each tagged by sub-topic and level).
- **Report:** score by topic, sub-topic and difficulty; focus areas with study tips and links; one-click practice of weak areas; print/PDF.
- **Coding:** 13 Python/JavaScript problems and 8 SQL problems, with sample and hidden tests. Python runs with Pyodide, SQL with sql.js (SQLite), JavaScript in a Web Worker, all loaded from the jsDelivr CDN.
- **Privacy:** no accounts, no cookies, no tracking. Results and code drafts are stored only in the visitor's browser (localStorage).

## Files

- `index.html`, `css/style.css`, `icon.svg`
- `js/core.js`: registry and helpers
- `js/bank/*.js`: question banks. Each row is `[sub-topic, level, question, correct answer, [3 wrong answers], explanation, optional code]`. The correct answer is written first; options are shuffled on screen.
- `js/challenges.js`: coding challenges (tests, starter code, model solutions)
- `js/runner.js`: runs Python, JavaScript and SQL in the browser
- `js/app.js`: pages and logic
- `ads.json` and `ads/`: the "Also from us" boxes

## Publish on GitHub Pages

Upload everything to a public repository, then Settings → Pages → Deploy from a branch → main → / (root).
