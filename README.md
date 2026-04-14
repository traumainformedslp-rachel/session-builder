# Session Builder

A free, open-source structured literacy session planner with built-in data collection.

Created by [RTN Communication & Literacy](https://rachelslp.org)

## Overview

Session Builder helps speech-language pathologists, reading specialists, and literacy interventionists plan structured literacy sessions and collect trial-by-trial data during instruction. The tool runs entirely in the browser with no account, login, or internet connection required after the initial page load.

### Features

- **Plan** sessions by selecting from 15 universal structured literacy components (phonemic awareness, phonogram review, blending, word reading, spelling, fluency, connected text, morphology, vocabulary, comprehension, and more)
- **Set targets** for each component using suggested options or custom text
- **Collect data** during sessions with tap-based correct/incorrect tracking and live accuracy percentage
- **Record cue levels** per activity (Independent through Physical Prompt)
- **Add session notes** for error patterns, observations, and next steps
- **Print or save as PDF** with formatted layout including blank data grids for paper-based collection
- **Copy session plans** to clipboard as plain text
- Dark mode and mobile-responsive design

### Session Components

Components reflect the universal structure of evidence-based structured literacy instruction across the linguistic hierarchy:

| Level | Components |
|-------|-----------|
| Sound | Phonemic Awareness, Phonogram Review (Reading), Phonogram Review (Spelling) |
| Word | Blending & Word Building, Word-Level Reading, Word-Level Spelling, Heart Words, Morphology, Vocabulary, New Concept Introduction |
| Text | Sentence-Level Reading, Sentence-Level Spelling, Reading Fluency, Connected Text / Decodable, Comprehension |

## Getting Started

### Use Online

Visit the live version at [traumainformedslp-rachel.github.io/session-builder](https://traumainformedslp-rachel.github.io/session-builder/)

### Run Locally

1. Clone this repository
2. Open `index.html` in any modern browser

```bash
git clone https://github.com/traumainformedslp-rachel/session-builder.git
cd session-builder
open index.html
```

No build tools, package managers, or dependencies required.

### Deploy Your Own Copy

1. Fork this repository
2. Go to Settings, then Pages
3. Under Source, select Deploy from a branch
4. Choose the main branch and root folder
5. Save

Your copy will be live at `https://[your-username].github.io/session-builder/`

## Tech Stack

- Vanilla JavaScript (no frameworks or libraries)
- HTML5 and CSS3 with CSS custom properties
- Google Fonts (Fraunces and DM Sans)
- Zero runtime dependencies

## Accessibility

- Keyboard navigable with visible focus indicators
- ARIA labels on interactive elements
- Screen reader announcements for data entry events
- Dark mode toggle
- Respects `prefers-reduced-motion` system setting
- Print stylesheet for clean output

## Privacy

This application runs entirely in the browser. No data is sent to any server, stored in any database, or shared with any third party. Session data exists only in browser memory during use and is not persisted between sessions. No cookies or local storage are used.

## Disclaimer

This tool is designed to support session planning and data collection for qualified professionals. It is not a substitute for clinical judgment, formal assessment, or individualized treatment planning. Users are responsible for ensuring that their clinical practices comply with applicable professional standards, scope of practice guidelines, and institutional policies.

This project is an independent tool. It is not affiliated with, endorsed by, or sponsored by any commercial literacy program, publisher, or organization. References to instructional approaches (such as structured literacy, multisensory instruction, or specific activity types) describe general evidence-based practices documented in peer-reviewed research and are not intended to represent or replace any proprietary curriculum or methodology.

All program names, product names, and trademarks referenced in the source code comments or documentation belong to their respective owners and are used solely for descriptive purposes to indicate the general research tradition from which an activity type originates.

## License

This project uses a dual license:

- **Code** (HTML, CSS, JavaScript): [MIT License](LICENSE)
- **Educational content** (component descriptions, suggested targets, session structure): [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)

You are free to use, modify, and share this tool for non-commercial educational purposes with attribution. See [LICENSE](LICENSE) for full terms.

## Citation

If you reference this tool in research, presentations, or professional development materials:

> Norton, R. T. (2026). *Session Builder: A structured literacy session planner with data collection* [Web application]. RTN Communication & Literacy. https://traumainformedslp-rachel.github.io/session-builder/

## Contributing

Contributions are welcome. Please open an issue to discuss proposed changes before submitting a pull request.

When contributing, please:

- Maintain accessibility standards (keyboard navigation, ARIA labels, contrast ratios)
- Keep the zero-dependency vanilla JavaScript approach
- Test on mobile and desktop browsers
- Follow the existing code style

## About

Session Builder is part of a suite of free literacy tools created by RTN Communication & Literacy, founded by Rachel Terra Norton, MS, CCC-SLP. All tools are designed to be accessible regardless of family income.

- [rachelslp.org](https://rachelslp.org)

---

Made in Boston, MA.
