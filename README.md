# Cyan Heart — demo website

One-page demo site for **Cyan Heart**, the selfie-perspective psychological horror adventure by solo developer Shoei Sio.
Built by [ShakurWebsites](https://www.shakuryon.com). Hand-coded HTML, CSS and JavaScript, flexbox layout, no frameworks.

## Structure

```
public/
  index.html   page markup (English copy lives here)
  styles.css   all styling and animations
  media.css    responsive rules, reduced-motion and high-contrast support
  index.js     language gate, camera-boot preloader, EN/JA switch, gallery
  assets/      local images and video
```

## How it flows

1. **Language gate**: visitor picks English or 日本語 (also switchable from the header at any time).
2. **Preloader**: the in-game CSZ8x2 camera boots; the energy source shifts from Magenta Heart to Cyan.
3. **Site**: the whole page sits inside a camera viewfinder; sections are numbered logs.

## Adding the trailer

Save the Steam release trailer as `public/assets/trailer.mp4`. It then plays muted behind the hero and
with controls in the Trailer section. Until the file exists, the hero shows a screenshot and the Trailer
section shows a card linking to Steam.

## Images

Screenshots currently load from Steam's public CDN. For production, save them into `public/assets/`
and update the `src` / `data-full` paths in `index.html`.

## Background music

`public/assets/Cyan Heart OST - MainTheme.mp3` loops quietly once the visitor picks a language (browsers
only allow audio after a click). A floating Music On/Off button sits bottom-right; the choice is remembered,
and the music pauses while the trailer plays or the tab is in the background.

## Accessibility

- All motion is disabled under `prefers-reduced-motion`; no rapid flashing.
- Preloader can be skipped; hero video has a pause button.
- Keyboard-usable language gate and gallery lightbox, visible focus states, skip link.

Game name, artwork and screenshots belong to Shoei Sio. Steam figures (price, reviews) were correct as of November 2026.
