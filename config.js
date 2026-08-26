// Configuration du duel — modifie, commit, push. Les paramètres d'URL ont priorité.
window.DUEL = {
  start: "2026-08-26T20:00",   // Départ du duel (AAAA-MM-JJ + heure locale)
  players: [
    { name: "Kazy", venue: "hyperliquid", account: "0x713c33560C6e732BFBCe06b05831Efb9F0A50Eff", equity0: 0 },
    { name: "Pote", venue: "hyperliquid", account: "0xe1516Fd03F7Ec4d5531Bc70A4539B4Ec7692a94e", equity0: 0 },
  ],
};
// equity0 : portefeuille de départ en $ (0 = calculé automatiquement au lancement).
// Lighter · Robinhood Chain : venue "lighter" + token lecture seule -> { token: "ro:…" }.
