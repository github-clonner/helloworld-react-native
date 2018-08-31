#!/usr/bin/env bash
set -xeo pipefail

source $(dirname $0)/config.sh

TARGET=$1

if [ -z "$TARGET" ] || [ ! -f "$TARGET" ] || [ -z "$FTP_USERNAME" ] || [ -z "$FTP_PASSWORD" ]; then
  exit 1
fi

curl --fail "ftp://${FTP_DOMAIN}${FTP_PATH}/${CI_COMMIT_REF_SLUG}/" -T $TARGET -u "${FTP_USERNAME}:${FTP_PASSWORD}" --ftp-create-dirs
