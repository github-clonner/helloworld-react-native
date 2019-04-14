#!/usr/bin/env bash
set -xeo pipefail

source $(dirname $0)/config.sh

BUILD=$1
PLATFORM=$2

case $PLATFORM in
android)
  APPETIZE_ID=$APPETIZE_ANDROID_ID
  ;;
ios)
  APPETIZE_ID=$APPETIZE_IOS_ID
  ;;
esac

if [ -z "$BUILD" ] || [ ! -f "$BUILD" ] || [ -z "$PLATFORM" ] || [ -z "$APPETIZE_ID" ] || [ -z "$APPETIZE_TOKEN" ]; then
  exit 1
fi

curl --fail "https://${APPETIZE_TOKEN}@api.appetize.io/v1/apps/${APPETIZE_ID}" -F "file=@${BUILD}" -F "platform=${PLATFORM}" -F "note=${CI_COMMIT_SHA}"

