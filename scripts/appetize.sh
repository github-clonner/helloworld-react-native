#!/usr/bin/env bash
set -xeo pipefail

source $(dirname $0)/config.sh

TARGET=$1
PLATFORM=$2

case $PLATFORM in
android)
  APPETIZE_ID=$APPETIZE_ANDROID_ID
  ;;
ios)
  APPETIZE_ID=$APPETIZE_IOS_ID
  ;;
esac

if [ -z "$TARGET" ] || [ ! -f "$TARGET" ] || [ -z "$PLATFORM" ] || [ -z "$APPETIZE_ID" ] || [ -z "$APPETIZE_TOKEN" ]; then
  exit 1
fi

curl "https://${APPETIZE_TOKEN}@api.appetize.io/v1/apps/${APPETIZE_ID}" -F "file=@${TARGET}" -F "platform=${PLATFORM}" -F "note=${CI_COMMIT_SHA}"

