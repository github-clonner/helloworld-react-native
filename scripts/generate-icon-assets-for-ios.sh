#!/usr/bin/env bash
set -eo pipefail

if [ $# -lt 1 ] ; then
	echo "usage: $0 <input> [<size@1x>] [<output>]"
  exit
fi

if [ ! -f $1 ] ; then
	echo "file doesn't exist"
	exit 1
fi

## include common processing

source $(dirname $0)/generate-image-assets.include.sh

width=48
height=48

## generate assets

APP_NAME=$(find $PWD/ios -name '*.xcodeproj' -exec basename {} .xcodeproj \;)

target_dir="${PWD}/ios/${APP_NAME}/Images.xcassets/AppIcon.appiconset"

mkdir -p $target_dir

function image_path () {
  if [ -n "$prefix" ]; then
    echo "${target_dir}/${prefix}-${width}x${height}@${scale}x.png";
  else
    echo "${target_dir}/iphone-${width}x${height}@${scale}x.png";
  fi
}

width=20 height=20 scale=2 generate_image

width=20 height=20 scale=3 generate_image

width=29 height=29 scale=2 generate_image

width=29 height=29 scale=3 generate_image

width=40 height=40 scale=2 generate_image

width=40 height=40 scale=3 generate_image

width=60 height=60 scale=2 generate_image

width=60 height=60 scale=3 generate_image

width=1024 height=1024 scale=1 prefix="ios-marketing" generate_image

cat > "${target_dir}/Contents.json" <<EOL
{
  "images": [
    {
      "idiom": "iphone",
      "size": "20x20",
      "scale": "2x",
      "filename": "iphone-20x20@2x.png"
    },
    {
      "idiom": "iphone",
      "size": "20x20",
      "scale": "3x",
      "filename": "iphone-20x20@3x.png"
    },
    {
      "idiom": "iphone",
      "size": "29x29",
      "scale": "2x",
      "filename": "iphone-29x29@2x.png"
    },
    {
      "idiom": "iphone",
      "size": "29x29",
      "scale": "3x",
      "filename": "iphone-29x29@3x.png"
    },
    {
      "idiom": "iphone",
      "size": "40x40",
      "scale": "2x",
      "filename": "iphone-40x40@2x.png"
    },
    {
      "idiom": "iphone",
      "size": "40x40",
      "scale": "3x",
      "filename": "iphone-40x40@3x.png"
    },
    {
      "idiom": "iphone",
      "size": "60x60",
      "scale": "2x",
      "filename": "iphone-60x60@2x.png"
    },
    {
      "idiom": "iphone",
      "size": "60x60",
      "scale": "3x",
      "filename": "iphone-60x60@3x.png"
    },
    {
      "idiom": "ios-marketing",
      "size": "1024x1024",
      "scale": "1x",
      "filename": "ios-marketing-1024x1024@1x.png"
    }
  ],
  "info": {
    "version": 1,
    "author": "xcode"
  }
}
EOL
