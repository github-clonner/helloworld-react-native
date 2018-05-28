#!/usr/bin/env bash
set -xeo pipefail

source $(dirname $0)/config.sh

if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ] ; then
  echo "usage: $(basename $0) <APP_NAME> <APP_DISPLAY_NAME> <APP_PACKAGE_ID>" >&2
  exit 1
fi

APP_NAME=$1
APP_CODE_NAME=${APP_NAME,,}
APP_DISPLAY_NAME=$2
APP_PACKAGE_ID=$3

# replace default values

for f in $(find ./ -type f ! -path '*/node_modules/*' ! -path '*/.git/*') ; do
  sed -i'' "s/HelloWorld/$APP_NAME/" $f
  sed -i'' "s/helloworld/$APP_CODE_NAME/" $f
  sed -i'' "s/Hello\ World/$APP_DISPLAY_NAME/" $f
  sed -i'' "s/Hello\ App\ Display\ Name/$APP_DISPLAY_NAME/" $f
  sed -i'' "s/com\.$APP_CODE_NAME\.app/$APP_PACKAGE_ID/" $f
done

#

rm ./README.md
mv ./README.template.md ./README.md

rm ./package.json
mv ./package.template.json ./package.json

rm ./scripts/config.sh
mv ./scripts/config.template.sh ./scripts/config.sh

# cleanup

[ -d ./.git ] && rm -fr ./.git

rm ./App.js

rm ./scripts/dev*.sh
rm ./scripts/postinit.sh

chmod u+x ./scripts/*.sh

# install dependencies

yarn
