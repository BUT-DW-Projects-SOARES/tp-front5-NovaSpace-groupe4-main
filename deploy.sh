#!/bin/bash
# Deploy NovaSpace : build Vite -> racine du site Plesk
set -e
cd "$(dirname "$0")"
export PATH=~/.nodenv/versions/22/bin:$PATH
npm install --no-audit --no-fund
npm run build
rsync -av dist/ ~/httpdocs/
echo "OK : https://soares.etu.mmi-unistra.fr/"

