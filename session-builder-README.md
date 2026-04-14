# 📖 Session Builder

**A free, open-source structured literacy session planner with built-in data collection.**

Built by [RTN Communication & Literacy](https://rachelslp.org) — for clinicians, by a clinician.

🔗 **[Launch Session Builder →](https://traumainformedslp-rachel.github.io/session-builder/)**

---

## What It Does

Session Builder helps SLPs, reading specialists, and interventionists quickly plan and run structured literacy sessions across the linguistic hierarchy (sound → word → connected text) in both **decoding** and **encoding** formats.

### Three Views

| View | Purpose |
|------|---------|
| **📝 Plan** | Select session components from a universal checklist, set targets, choose decoding/encoding mode, set timing, and reorder activities |
| **📊 Collect** | Run the session with live data collection: tap ✓/✗ for each trial with running accuracy percentage, set cue level, and add notes |
| **📄 Summary** | View overall and per-component accuracy, copy plan to clipboard, or print/save as PDF |

### 15 Universal Session Components

Components are not tied to any specific program. They reflect the universal structure of evidence-based structured literacy instruction:

1. Phonemic Awareness
2. Phonogram Review: Reading (Visual Drill / Deck Work)
3. Phonogram Review: Spelling (Auditory Drill / What Says)
4. Blending & Word Building
5. Word-Level Reading
6. Sentence-Level Reading
7. Reading Fluency
8. New Concept / Skill Introduction
9. Word-Level Spelling (SOS / Dictation)
10. Sentence-Level Spelling (Dictation)
11. Irregular / Heart Words
12. Connected Text / Decodable Reading
13. Morphology & Word Study
14. Vocabulary
15. Comprehension

Each component includes suggested targets you can tap to auto-fill, or type your own.

### Data Collection Features

- **✓/✗ tapper buttons** with live accuracy percentage
- **Visual trial dots** (green/red) for at-a-glance progress
- **Cue level dropdown** (Independent → Physical Prompt)
- **Session notes** per component
- **Overall accuracy dashboard** in Summary view
- **Copy to clipboard** (plain text with all data)
- **Print / PDF** with formatted layout (includes blank grids for paper-based data collection)

### Accessibility

- Keyboard navigable with visible focus rings
- ARIA labels on all interactive elements
- Screen reader announcements for data entry
- Dark mode toggle
- Respects `prefers-reduced-motion`
- WCAG AA color contrast

---

## Frameworks & Research Base

Session components are informed by principles from:

- Orton-Gillingham approach
- Structured literacy instructional frameworks
- Science of reading research
- Pamela Hook's model of processes involved in written language
- Carroll School Scope & Sequence (Levels 1-4)
- Universal structured literacy session templates

---

## Tech Stack

- **Single HTML file** — no build step, no dependencies to install
- React 18 via CDN
- Babel standalone for in-browser JSX
- Google Fonts (Fraunces + DM Sans)
- Zero server requirements — runs entirely in the browser

---

## Deploy to GitHub Pages

1. Fork or clone this repository
2. Go to **Settings → Pages**
3. Under "Source," select **Deploy from a branch**
4. Choose **main** branch, **/ (root)** folder
5. Click **Save**
6. Your site will be live at `https://[your-username].github.io/session-builder/`

That's it. No build step needed.

---

## Local Development

Just open `index.html` in a browser. That's the whole app.

```bash
# Clone the repo
git clone https://github.com/traumainformedslp-rachel/session-builder.git
cd session-builder

# Open in browser
open index.html
```

---

## License

- **Educational content** (component descriptions, suggested targets, session structure): [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
- **Code** (HTML, CSS, JavaScript): [MIT License](LICENSE)

You are free to use, adapt, and share this tool for non-commercial educational purposes with attribution.

---

## Citation

If you use Session Builder in research or professional development materials:

> Norton, R. T. (2026). *Session Builder: A structured literacy session planner with data collection* [Web application]. RTN Communication & Literacy. https://traumainformedslp-rachel.github.io/session-builder/

---

## About RTN Communication & Literacy

RTN Communication & Literacy builds free, evidence-based literacy tools grounded in the science of reading, trauma-informed practice, and neuroscience. All tools are designed to be accessible regardless of family income.

- 🌐 [rachelslp.org](https://rachelslp.org)
- 📱 [@rachel_research](https://instagram.com/rachel_research)

---

*Built with care in Boston, MA.*
