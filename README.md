# TU SafeZone — Same-day demo

Two static apps:
- `/student/` — map, GPS/manual map pins, incident form and local persistence
- `/guard/` — map, report queue, status updates, local JSON export

## IMPORTANT
This is a SAME-BROWSER DEMO, not an emergency response service. Data is stored in localStorage for the website origin only. No shared backend, authentication, secure guard access, photo storage, guaranteed uptime, or cross-device delivery exists. Do not use for real emergencies or collect sensitive data.

## GitHub Pages deployment
1. Copy all files in this folder to the root of your GitHub repository on `development`.
2. Commit and push changes.
3. Test the `development` branch using a local preview or merge it into `main` after review.
4. In GitHub repository → Settings → Pages, choose Deploy from a branch → `main` → `/ (root)` and Save.
5. Wait for GitHub to publish, then visit `https://mrxpiw4.github.io/tu-safezone/` (the repository owner shown in screenshot; confirm current username).
6. Student URL: `/tu-safezone/student/`, Guard URL: `/tu-safezone/guard/`.
7. Test both in separate tabs of the SAME browser. Different browsers or devices do NOT share data.

## Notes
- Map requires internet to load external Leaflet/OpenStreetMap resources.
- GPS requires HTTPS or localhost and permission from the device.
- `guard` is publicly accessible in this demo; do not promote it as a secure dashboard.
- Predefined map coordinates are from the prototype and are not verified official locations.
- The existing emergency phone numbers from the prototype have not been independently verified.
- For actual multi-device use, add an authenticated shared backend with authorization, zone routing, audit logging and monitored escalation.
