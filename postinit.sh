#!/usr/bin/env bash
set -xeo pipefail

source $(dirname $0)/scripts/config.sh

if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ] ; then
  echo "usage: $(basename $0) <APP_NAME> <APP_DISPLAY_NAME> <APP_PACKAGE_ID>" >&2
  exit 1
fi

APP_NAME=$1
APP_CODE_NAME=${APP_NAME,,}
APP_DISPLAY_NAME=$2
APP_PACKAGE_ID=$3

TEMPLATE_NAME='H%elloWorld'
TEMPLATE_NAME=${TEMPLATE_NAME//%/}

TEMPLATE_CODE_NAME='h%elloworld'
TEMPLATE_CODE_NAME=${TEMPLATE_CODE_NAME//%/}

TEMPLATE_DISPLAY_NAME_1='H%ello World'
TEMPLATE_DISPLAY_NAME_1=${TEMPLATE_DISPLAY_NAME_1//%/}

TEMPLATE_DISPLAY_NAME_2='H%ello App Display Name'
TEMPLATE_DISPLAY_NAME_2=${TEMPLATE_DISPLAY_NAME_2//%/}

# replace default values

QUERY= "
  s|$TEMPLATE_NAME|$APP_NAME|g
  s|$TEMPLATE_CODE_NAME|$APP_CODE_NAME|g
  s|$TEMPLATE_DISPLAY_NAME_1|$APP_DISPLAY_NAME|g
  s|$TEMPLATE_DISPLAY_NAME_2|$APP_DISPLAY_NAME|g
  s|com\.$APP_CODE_NAME\.package|$APP_PACKAGE_ID|g
  s|$APP_CODE_NAME-lib|$TEMPLATE_CODE_NAME-lib|g
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

yarn
