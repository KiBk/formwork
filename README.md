# Formwork

An interactive 3D viewer for a corner kitchen cabinet with a sink base and a perpendicular bottle pull-out. Rotate the model, switch to a plan or front elevation, or use the exploded view to inspect the assembly. Select a panel to see its finished dimensions and position number in the designer’s parts schedule.

The viewer includes 18 pieces across 15 schedule entries. **Model notes** identifies the estimated diagonal cut, assembly offsets and uncertain handwritten dimensions. **References** contains the nine original drawing and photo views used to reconstruct the cabinet.

## Preview locally

Open `index.html` in a browser, or run the following command from the repository root and visit [the local preview](http://127.0.0.1:8000/).

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

## Publish with GitHub Pages

1. Create an empty GitHub repository named `formwork`.
2. From this directory, add the GitHub remote and push the initial commit. Replace `YOUR-ACCOUNT` with the GitHub owner.

   ```sh
   git remote add origin https://github.com/YOUR-ACCOUNT/formwork.git
   git push -u origin main
   ```

3. In the GitHub repository, open **Settings → Pages**. Choose **Deploy from a branch**, select **main** and **/(root)**, then save. GitHub shows the published URL on that page. [GitHub Pages publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Project files

- `index.html` contains the viewer layout and reference captions.
- `assets/viewer.js` defines the cabinet geometry, part dimensions, camera and inspection controls.
- `assets/viewer.css` styles the desktop and mobile layouts.
- `references/` contains the photographs and drawings displayed by the viewer.
- `vendor/` contains Three.js r160 and its MIT license.

All site assets use relative paths and are served directly from the repository.
