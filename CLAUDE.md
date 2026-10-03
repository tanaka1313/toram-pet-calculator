# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Toram Online pet calculation tool** — a static web application that predicts which wild pet appears in a player's My Room based on a given date and time. The tool implements a mathematical formula derived from reverse-engineering the game's pet spawn mechanics.

The application is written in vanilla HTML, CSS, and JavaScript with no build process or external dependencies.

## Key Files

- **index.html** — Main page structure. Contains form for user input (pet count, target date/time) and result display area.
- **js/script.js** — Core calculation logic. Reads user inputs, applies the mathematical formula, and displays the pet name.
- **js/constants.js** — Pet configuration data with three variants (13, 14, or 15 pet types). Each variant contains:
  - `baseTime`: Reference timestamp for the formula
  - `a`, `b`: Coefficients for the linear calculation
  - `names`: Array of pet names indexed by result modulo

- **css/style.css** — Responsive styling for mobile and desktop views.

## Architecture & Calculation Logic

The pet calculation follows this formula (derived from reverse-engineered game mechanics):

```
hours = floor((targetDateTime - baseTime) / 3600 seconds)
value = a + hours * b
petNumber = floor(value mod petCount)
```

Three configurations are supported:
- **13 pets** (base): Original pet set (since 2017/3/16)
- **14 pets** (with Germy): Added after 2021/9/30
- **15 pets** (with Rem/Ram): Added after 2019/4/25

The constants (`baseTime`, `a`, `b`) differ for each variant to account for game updates. These are empirically derived and must match the article's specifications exactly.

### Important Notes on Implementation

- **Modulo handling**: JavaScript's `%` operator can return negative remainders for negative numbers. The code accounts for this: `if (mod < 0) mod += petCount`
- **Time truncation**: Only hour precision is used; minutes/seconds are discarded
- **Pet names**: Only pets explicitly listed in the article are named; omitted indices display just the number

## Development

### Testing Locally

Open `index.html` in a browser. No local server or build step is required.

**Test cases to verify**:
1. Changing pet count (13/14/15) recalculates correctly
2. Date and time inputs affect the result
3. Hour values 0–23 are accepted
4. Invalid inputs show an error message
5. Each configuration displays correct pet names for known dates

### Editing Files

- **Adding a new pet variant**: Add a new key in `PET_CONFIG` (e.g., `16`) with its own `baseTime`, `a`, `b`, and `names` array.
- **Changing the formula**: Update the calculation in `calculatePet()` (currently simple `a + hours * b`).
- **Styling changes**: Adjust `css/style.css`. The design is mobile-first with a max-width of 480px.
- **UI changes**: Modify `index.html` form inputs; ensure the JavaScript selectors match (e.g., `document.getElementById("petCount")`).

### Validation & Debugging

- Use browser DevTools console to inspect `PET_CONFIG` and verify coefficients.
- Check that `baseTime` dates are correctly constructed (note: JavaScript months are 0-indexed: `new Date(2017, 2, 16)` is March 16).
- Test with edge cases: hour 0 vs 23, date boundaries, negative time differences (before baseTime).

## Git & Commits

Use clear commit messages tied to game mechanics or calculation changes (e.g., "Add 15-pet variant (Rem/Ram)", "Fix negative modulo handling").

## Coding Guidelines

- Prefer concise code to minimize token usage. Avoid unnecessary comments, verbose variable names, or overly defensive code unless required for correctness.
- Keep the overall source size small while maintaining readability of the core calculation logic.