#!/usr/bin/env bash -xeo pipefail

source $(dirname $0)/config.sh

TARGET=$1

if [ -z "$TARGET" ] || [ ! -f "$TARGET" ] || [ -z "$DELIVERY_USERNAME" ] || [ -z "$DELIVERY_PASSWORD" ]; then
  exit 1
fi

curl $DELIVERY_URL/$CI_COMMIT_REF_SLUG/ -T $TARGET -u $DELIVERY_USERNAME:$DELIVERY_PASSWORD --ftp-create-dirs
