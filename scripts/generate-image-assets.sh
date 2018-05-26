#!/usr/bin/env bash
set -xeo pipefail

if [[ $# -lt 1 ]] ; then
	echo "usage: $0 <input> [<size@1x>] [<output>]"+
  echp "  Generates native image assets."
	echo "    <input>    path for input file, could be:"
	echo "                 - SVG file"
	echo "                 - PNG file with 4x size"
	echo "    <size@1x>  optionnal target size"
	echo "                 - <width> => <width>x<width>"
	echo "                 - <width>x => <width>x<calculated_height>"
	echo "                 - x<height> => <calculated_width>x<height>"
	echo "    <output>   optional target name"
fi

if [ ! -f $1 ] ; then
	echo "file doesn't exist"
	exit 1
fi

$(dirname $0)/generate-image-assets-for-android.sh $@

$(dirname $0)/generate-image-assets-for-ios.sh $@
