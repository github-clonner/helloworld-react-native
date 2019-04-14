#!/usr/bin/env bash
set -xeo pipefail

source $(dirname $0)/config.sh

BUILD=$1

if [ -z "$BUILD" ] || [ ! -f "$BUILD" ] || [ -z "$DEPLOY_FTP_DOMAIN" ] || [ -z "$DEPLOY_FTP_PATH" ] || [ -z "$DEPLOY_FTP_USERNAME" ] || [ -z "$DEPLOY_FTP_PASSWORD" ]; then
  exit 1
fi

curl --fail --ftp-create-dirs -u "${DEPLOY_FTP_USERNAME}:${DEPLOY_FTP_PASSWORD}" "ftp://${DEPLOY_FTP_DOMAIN}${DEPLOY_FTP_PATH}/${CI_COMMIT_REF_SLUG}/" -T $BUILD
