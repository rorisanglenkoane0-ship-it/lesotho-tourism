# Explore Lesotho

A static tourism website for exploring Lesotho, browsing destinations and activities, estimating accommodation costs, and contacting the travel team.

## Run locally

Open `index.html` in a browser, or serve this folder with any static web server. For example, with Python installed:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Publish with GitHub Pages

This repository includes a GitHub Actions workflow that publishes the site when changes are pushed to the `main` branch. In the repository's **Settings → Pages**, select **GitHub Actions** as the build and deployment source. The published URL will appear in the Pages settings after the first successful deployment.

The contact and registration forms open WhatsApp with a prepared message. This static site does not store submissions in a database.
