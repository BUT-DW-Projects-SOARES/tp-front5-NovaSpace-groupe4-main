#!/bin/bash
# Deploy safe NovaSpace : build, 2 passes, verification, rollback auto
set -euo pipefail

exec 9>/tmp/novaspace-deploy.lock
flock -n 9 || { echo "ERREUR : un autre deploy est en cours"; exit 1; }

cd "$(dirname "$0")"
export PATH=~/.nodenv/versions/22/bin:$PATH

WWW=~/httpdocs
RELEASES=~/releases
NOW=$(date +%Y%m%d-%H%M%S)
mkdir -p "$RELEASES"

echo "==> 1/6 build (node 22)"
npm install --no-audit --no-fund
npm run build
test -f dist/index.html || { echo "ERREUR : dist/index.html absent, deploy annule"; exit 1; }

echo "==> 2/6 snapshot de la nouvelle release"
rsync -a dist/ "$RELEASES/$NOW/"

echo "==> 3/6 deploy pass 1 : assets + images (aucun HTML encore)"
rsync -av dist/assets dist/images "$WWW/"

echo "==> 4/6 deploy pass 2 : HTML (index + pages)"
rsync -av --exclude assets --exclude images dist/ "$WWW/"

echo "==> 5/6 verification en ligne"
fail=0
for u in "/" "/src/pages/terre.html" "/src/pages/jupiter.html" "/src/pages/recherche.html" "/favicon.ico"; do
  code=$(curl -sk -o /dev/null -w "%{http_code}" "https://soares.etu.mmi-unistra.fr$u")
  echo "   $u -> $code"
  [ "$code" = "200" ] || fail=1
done

if [ "$fail" -ne 0 ]; then
  echo "==> 6/6 ECHEC : rollback automatique vers l'ancienne version"
  # repartir du snapshot precedent (si existant)
  prev=$(ls -1t "$RELEASES" | grep -v "^$NOW$" | head -1 || true)
  if [ -n "$prev" ]; then
    rsync -a "$RELEASES/$prev/" "$WWW/"
    echo "Rollback fait depuis $prev"
  else
    echo "Aucune release precedente : restaurer depuis le projet git"
  fi
  exit 1
fi

echo "==> 6/6 purge : conservation des 5 dernieres releases"
ls -1t "$RELEASES" | tail -n +6 | while read -r old; do rm -rf "$RELEASES/$old"; done

echo ""
echo "OK : deploy $NOW en ligne."
echo "Rollback manuel si besoin : rsync -a ~/releases/<timestamp>/ ~/httpdocs/"
echo "Site : https://soares.etu.mmi-unistra.fr/"

