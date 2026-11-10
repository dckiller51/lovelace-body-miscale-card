# Severity Profile Generator

Web page for the Bodymiscale card: <https://dckiller51.github.io/lovelace-body-miscale-card/>

Enter your scale, gender, age, height and weight (and body fat for the S400 water metrics). The page shows the color bars exactly as the card draws them, with your personal thresholds, and gives the YAML to paste in the card.

Since 2026.10.2 the card can compute these thresholds by itself with `auto_severity: true`.

## Files

- `index.html`: the page
- `profiles.js`: the rules that turn a profile into thresholds. Same rules as `src/severity-profiles.ts` in the card: keep both in sync.
- `severity-data.js`: the reference tables (Zepp Life)
