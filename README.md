# AG Coaching

Site vitrine statique pour Audréanne Gagnon, coach sportive à Montréal. Le projet utilise uniquement HTML, CSS et JavaScript vanilla : aucun serveur applicatif ni dépendance npm n'est requis.

## Structure

- `index.html` : accueil
- `services.html` : six services et leurs ancres
- `a-propos.html` : parcours, palmarès et philosophie
- `candidature.html` : passerelle vers le formulaire externe
- `confidentialite.html` : page minimale à faire valider
- `styles.css` : tokens, responsive mobile-first et composants
- `script.js` : menu mobile et animations IntersectionObserver
- `assets/img/` : logo et placeholders visuels
- `.github/workflows/deploy-pages.yml` : déploiement automatique sur GitHub Pages
- `.nojekyll`, `netlify.toml`, `robots.txt`, `sitemap.xml` : déploiement et SEO

## Développement

Le site peut être ouvert directement avec `index.html`. Pour tester les chemins comme sur un hébergeur statique, lance un serveur local depuis la racine, par exemple :

```bash
npx serve .
```

Aucune installation n'est requise et il n'y a pas de commande de build : Netlify publie directement la racine du projet.

## Modifier le contenu

Les textes sont volontairement écrits directement dans chaque page HTML afin de conserver un site simple et éditable sans chaîne de compilation. Les marqueurs `[PLACEHOLDER]`, `[À VALIDER]`, `[EMAIL PLACEHOLDER]`, `{{URL_FORMULAIRE}}` et `{{URL_INSTAGRAM}}` sont conservés pour remplacement.

## À remplacer avant la mise en ligne

- `assets/img/logo.svg` par le logo fourni, idéalement `assets/img/logo.png`.
- `assets/img/hero.svg` par la photo hero, avec son texte alternatif adapté.
- `assets/img/portrait.svg` par le portrait d'Audréanne.
- `assets/img/service-training.svg` par les photos des services.
- `assets/img/instagram.svg` par les publications statiques Instagram.
- `{{URL_FORMULAIRE}}` dans `candidature.html` et `confidentialite.html`.
- `{{URL_INSTAGRAM}}` dans les cinq pages.
- `[EMAIL PLACEHOLDER]`, le lieu des séances en personne et le compte Instagram.
- Les passages `[PLACEHOLDER]` et `[À VALIDER]`, notamment le parcours, les catégories et la politique de confidentialité.
- `example.com` dans `robots.txt` et `sitemap.xml` par le domaine final.
- Les URL canoniques si le site est publié dans un sous-dossier.

Les polices utilisent Google Fonts avec `display=swap` pour le moment. Pour supprimer cette requête externe, télécharger Cormorant Garamond et Jost dans `assets/fonts/`, puis remplacer l'import en haut de `styles.css` par des déclarations `@font-face`.

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy-pages.yml` publie automatiquement la racine du dépôt sur GitHub Pages à chaque push sur `main`. Il peut aussi être lancé manuellement depuis l'onglet **Actions** avec **Run workflow**.

Dans GitHub, ouvrir **Settings > Pages**, sélectionner **GitHub Actions** comme source de déploiement, puis pousser le dépôt sur la branche `main`. Le workflow utilise les actions officielles `configure-pages`, `upload-pages-artifact` et `deploy-pages`.

L'URL sera généralement `https://<utilisateur>.github.io/<nom-du-repo>/`. Les liens relatifs du site fonctionnent dans ce sous-dossier. Remplacer toutefois `example.com` dans `robots.txt` et `sitemap.xml`, et mettre à jour les URL canoniques si une URL publique est déjà connue.

## Déploiement Netlify

Importer le dépôt dans Netlify. `netlify.toml` publie la racine (`.`) et ne lance aucune compilation. Le domaine final doit ensuite être reporté dans `robots.txt`, `sitemap.xml`, les balises canoniques et les balises Open Graph si nécessaire.
