
input=$PWD/$1

size=$2

output=${3:-$1}
output=$(basename $output .png)
output=$(basename $output .svg)

# FORMAT=$(identify -format '%m' "$input")

if [ ${input: -4} == ".png" ] ; then
  FORMAT=PNG
else
  FORMAT=SVG
fi

WIDTH=$(identify -format '%w' "$input")
HEIGHT=$(identify -format '%h' "$input")
DENSITY=$(identify -format '%[resolution.x]' "$input")

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

  density=$DENSITY

  if [ "$FORMAT" = 'SVG' ] ; then
    density=$(echo $DENSITY*$width/$WIDTH | bc)
	fi

else

	width=$WIDTH
	height=$HEIGHT

  density=$DENSITY

	# when input is not PNG, assume input is 4x
	if [ "$FORMAT" = 'PNG' ] ; then
		width=$(echo $width/4 | bc)
		height=$(echo $height/4 | bc)
	fi

fi

echo "$FORMAT ${WIDTH}x${HEIGHT}@${DENSITY} => PNG ${width}x${height}@${density}"

