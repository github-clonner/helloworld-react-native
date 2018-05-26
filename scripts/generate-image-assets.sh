#!/usr/bin/env bash
set -xeo pipefail

if [[ $# -lt 1 ]] ; then
	echo "usage: $0 <input> [<size@1x>] [<output>]"
fi

if [ ! -f $1 ] ; then
	echo "file doesn't exist"
	exit 1
fi

$(dirname $0)/generate-image-assets-for-android.sh $@

$(dirname $0)/generate-image-assets-for-ios.sh $@
