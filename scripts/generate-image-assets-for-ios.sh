#!/usr/bin/env bash
set -xeo pipefail

source $(dirname $0)/config.sh

if [[ $# -lt 1 ]] ; then
	echo "usage: $0 <input> [<size@1x>] [<output>]"
fi

if [ ! -f $1 ] ; then
	echo "file doesn't exist"
	exit 1
fi

input=$PWD/$1

size=$2

output=${3:-$1}
output=$(basename $output .png)
output=$(basename $output .svg)

# FORMAT=$(identify -format '%m' "$input")
FORMAT=SVG
[ ${input: -4} == ".png" ] && FORMAT=PNG
WIDTH=$(identify -format '%w' "$input")
HEIGHT=$(identify -format '%h' "$input")
DENSITY=$(identify -format '%[resolution.x]' "$input")

width=$WIDTH
height=$HEIGHT

if [ -n "$size" ] ; then

	width=${size/x*/}
	height=${size/*x/}

	if [ -z "$width" ] && [ -z "$height" ] ; then
		width=$WIDTH
		height=$HEIGHT
	elif [ -z "$width" ] ; then
		width=$(echo $WIDTH*$height/$HEIGHT | bc)
	elif [ -n "$width" ] ; then
		height=$(echo $HEIGHT*$width/$WIDTH | bc)
	fi

else

	width=$WIDTH
	height=$HEIGHT

	# when input is not SVG, assume input is 4x
	if [[ "$FORMAT" != SVG ]] ; then
		width=$(echo $width/4 | bc)
		height=$(echo $height/4 | bc)
	fi

fi

echo "$FORMAT ${WIDTH}x${HEIGHT}@${DENSITY} => ${width}x${height}"

mkdir -p "$PWD/ios/$APP_NAME/Images.xcassets/$output.imageset"

cat > "$PWD/ios/$APP_NAME/Images.xcassets/$output.imageset/Contents.json" <<EOL
{
	"images" : [
		{
			"idiom" : "universal",
			"filename" : "$output.png",
			"scale" : "1x"
		},
		{
			"idiom" : "universal",
			"filename" : "$output@2x.png",
			"scale" : "2x"
		},
		{
			"idiom" : "universal",
			"filename" : "$output@3x.png",
			"scale" : "3x"
		}
	],
	"info" : {
		"version" : 1,
		"author" : "xcode"
	}
}
EOL

if [[ "$FORMAT" == SVG ]] ; then

inkscape -z -e "$PWD/ios/$APP_NAME/Images.xcassets/$output.imageset/$output.png" -w  "$(echo $width*1 | bc)" -h "$(echo $height*1 | bc)" "$input"

inkscape -z -e "$PWD/ios/$APP_NAME/Images.xcassets/$output.imageset/$output@2x.png" -w "$(echo $width*2 | bc)" -h "$(echo $height*2 | bc)" "$input"

inkscape -z -e "$PWD/ios/$APP_NAME/Images.xcassets/$output.imageset/$output@3x.png" -w "$(echo $width*3 | bc)" -h "$(echo $height*3 | bc)" "$input"

else

mogrify -write "$PWD/ios/$APP_NAME/Images.xcassets/$output.imageset/$output.png" -format png -background none -density "$(echo $DENSITY*1 | bc)" -resize "$(echo $width*1 | bc)x$(echo $height*1 | bc)" "$input"

mogrify -write "$PWD/ios/$APP_NAME/Images.xcassets/$output.imageset/$output@2x.png" -format png -background none -density "$(echo $DENSITY*2 | bc)" -resize "$(echo $width*2 | bc)x$(echo $height*2 | bc)" "$input"

mogrify -write "$PWD/ios/$APP_NAME/Images.xcassets/$output.imageset/$output@3x.png" -format png -background none -density "$(echo $DENSITY*3 | bc)" -resize "$(echo $width*3 | bc)x$(echo $height*3 | bc)" "$input"

fi
