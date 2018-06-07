#!/usr/bin/env bash
set -xeo pipefail

if [ $# -lt 1 ] ; then
	set +x

  cat <<EOL

    usage: $0 <input> [<size@1x>] [<output>]

      Generates native image assets.
        <input>    path for input file, could be:
                     - SVG file
                     - PNG file with 4x size

        <size@1x>  optionnal target size
                     - <width> => <width>x<width>
                     - <width>x => <width>x<calculated_height>
                     - x<height> => <calculated_width>x<height>

        <output>   optional target name

EOL

  exit
fi

if [ ! -f $1 ] ; then
	echo "file doesn't exist"
	exit 1
fi

## include common processing

source $(dirname $0)/generate-image-assets.include.sh

## generate assets

# if [ "$FORMAT" != 'SVG' ]; then

# inkscape -z -e "$PWD/assets/$output.png" -w  "$(echo $width*1 | bc)" -h "$(echo $height*1 | bc)" "$input"

# else

mogrify -write "$PWD/assets/$output.png" -format png -background none -density "$(echo $density | bc)" -resize "$(echo $width*1 | bc)x$(echo $height*1 | bc)" "$input"

# fi
