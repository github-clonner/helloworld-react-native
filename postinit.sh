#!/usr/bin/env bash
set -xeo pipefail

source $(dirname $0)/scripts/config.sh

if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ] ; then
  echo "usage: $(basename $0) <APP_NAME_CODE> <APP_NAME_DISPLAY> <APP_PACKAGE_ID>" >&2
  exit 1
fi

APP_NAME_CODE=$1
APP_NAME_CODE_ALT=${APP_NAME_CODE,,}
APP_NAME_DISPLAY=$2
APP_PACKAGE_ID=$3

TEMPLATE_NAME_CODE='H%elloWorld'
TEMPLATE_NAME_CODE=${TEMPLATE_NAME_CODE//%/}

TEMPLATE_NAME_CODE_ALT='h%elloworld'
TEMPLATE_NAME_CODE_ALT=${TEMPLATE_NAME_CODE_ALT//%/}

TEMPLATE_NAME_DISPLAY_1='H%ello World'
TEMPLATE_NAME_DISPLAY_1=${TEMPLATE_NAME_DISPLAY_1//%/}

TEMPLATE_NAME_DISPLAY_2='H%ello App Display Name'
TEMPLATE_NAME_DISPLAY_2=${TEMPLATE_NAME_DISPLAY_2//%/}

# replace default values

QUERY="
  s|$TEMPLATE_NAME_CODE|$APP_NAME_CODE|g
  s|$TEMPLATE_NAME_CODE_ALT|$APP_NAME_CODE_ALT|g
  s|$TEMPLATE_NAME_DISPLAY_1|$APP_NAME_DISPLAY|g
  s|$TEMPLATE_NAME_DISPLAY_2|$APP_NAME_DISPLAY|g
  s|com\.$APP_NAME_CODE_ALT\.package|$APP_PACKAGE_ID|g
  s|$APP_NAME_CODE_ALT-lib|$TEMPLATE_NAME_CODE_ALT-lib|g
"

find ./ \
  ! -path '*/node_modules/*' \
  ! -path '*/.git/*' \
  -type f -exec grep -Iq . {} \; \
  -print | while read file
do
  sed -i'' "$QUERY" "$file"
done

# template

rm ./README.md
mv ./README.template.md ./README.md

rm ./package.json
mv ./package.template.json ./package.json

rm yarn.lock
mv yarn.template.lock yarn.lock

rm ./.gitlab-ci.yml
mv ./.gitlab-ci.template.yml ./.gitlab-ci.yml

rm ./lib/$APP_NAME_CODE_ALT-lib.tgz
curl https://raw.githubusercontent.com/naderio/$TEMPLATE_NAME_CODE_ALT-react-native/master/lib/$TEMPLATE_NAME_CODE_ALT-lib.tgz --output ./lib/$TEMPLATE_NAME_CODE_ALT-lib.tgz

# cleanup

rm -fr ./.git || true

rm ./App.js || true

find ./ios -iname '*tvos*' -exec rm -fr {} \; || true

rm ./dev-*.sh
rm $0

chmod u+x ./scripts/*.sh

# git

git init

git add .

git add -f $(find . -name .gitkeep)

# install dependencies

yarn install
