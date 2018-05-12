#!/bin/bash -e

if [ -z "$1" ] || [ -z "$2" ] ; then
  echo "usage: $(basename $0) APP_NAME APP_DISPLAY_NAME" >&2
  exit 1
fi

APP_NAME=$1
APP_CODE_NAME="${APP_NAME,,}"
APP_DISPLAY_NAME=$2


for f in $(find ./ ! -path '*/node_modules/*' ! -path '*/.git/*') ; do
  sed -i'' "s/HelloWorld/$APP_NAME/" $f
  sed -i'' "s/helloworld/$APP_CODE_NAME/" $f
  sed -i'' "s/Hello World/$APP_DISPLAY_NAME/" $f
  sed -i'' "s/Hello App Display Name/$APP_DISPLAY_NAME/" $f
done
