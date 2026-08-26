# Duel · Lighter (Robinhood Chain) × Hyperliquid

Leaderboard 1v1 temps réel entre deux comptes perps : l'un sur **Lighter · Robinhood Chain** (`api.rh.lighter.xyz`), l'autre sur **Hyperliquid** (HIP-3 inclus). Zéro backend, zéro dépendance : `index.html` + `config.js`, hébergés sur GitHub Pages. Chaque joueur peut être sur l'une ou l'autre plateforme.

## Déploiement (3 min)

1. Nouveau repo GitHub → pousser `index.html`, `config.js`, `README.md`.
2. Renseigner `config.js` : plateforme, adresse et date de départ de chacun.
3. Settings → Pages → Source : `Deploy from a branch` → `main` / `/ (root)` → Save.

URL : `https://<user>.github.io/<repo>/`

Sans toucher à `config.js`, l'écran d'accueil génère un lien partageable : `?v1=lt&p1=…&n1=Kazy&v2=hl&p2=0x…&n2=Pote&start=2026-08-26#t1=ro:…`. Les paramètres d'URL ont priorité sur `config.js`.

## Lighter · Robinhood Chain

- Compte : adresse du Robinhood Wallet (`0x…`) ou index de compte Lighter (nombre).
- Sans token, l'API publique ne donne que l'équité, les positions et les exécutions en direct : pas d'historique, donc pas de trades fermés / réussite / profit factor.
- **Token lecture seule** (`ro:…`) : à générer sur `robinhoodchain.lighter.xyz/read-only-tokens` (wallet connecté, durée jusqu'à 10 ans). Il ne permet ni de trader ni de retirer. Il débloque l'historique complet (trades, PnL réalisé, funding).
- Le token va dans la partie `#t1=…` du lien (jamais envoyée aux serveurs, jamais dans un repo public) ou dans `config.js` si le repo est privé.
- Sans token, ajoute `equity0` (équité au départ du duel) dans `config.js` ou `&e1=` dans l'URL : le PnL de duel devient `équité actuelle − équité de départ`.

## Ce qui est calculé

| Mesure | Définition |
|---|---|
| PnL net | réalisé − frais + funding + latent (positions ouvertes, mark price live) |
| ROI | PnL net / équité au départ (≈ équité actuelle − PnL net) |
| Réussite | trades fermés gagnants (net de frais) / trades fermés |
| Profit factor | Σ gains / Σ pertes |
| Trade | regroupement des exécutions par ordre |
| Score | 1 point par catégorie menée : PnL net · ROI · Réussite · Profit factor · Meilleur trade |

Périodes : 24 h / 7 j / 30 j glissants, ou depuis le début du duel. Historique chargé sur 30 j minimum.

## Temps réel

- Hyperliquid : WebSocket `userFills` + `userFundings`, `activeAssetCtx` par coin en position ; comptes rafraîchis toutes les 10 s, dex HIP-3 rescannés toutes les 2 min.
- Lighter : WebSocket `user_stats`, `account_all_positions`, `account_all_trades`, `market_stats` par marché en position ; compte rafraîchi toutes les 10 s ; resynchronisation des trades après chaque exécution (avec token).
- Reconnexion automatique (backoff), reprise au retour au premier plan.

## Local

Ouvrir `index.html` directement dans un navigateur suffit (les deux API acceptent le cross-origin).
