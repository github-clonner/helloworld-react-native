#!/bin/bash -e

if [ -z "$1" ] ; then
  echo "usage: $(basename $0) APP_NAME" >&2
  exit 1
fi

APP_NAME=$1
APP_CODE_NAME=$(echo $APP_NAME | sed 's/.*/\L&/')

for i in $(seq 1 5) ; do
  for f in $(find ./{ios,android} -name 'HelloWorld*') ; do
    mv $f ${f/HelloWorld/$APP_NAME}
  done
  for f in $(find ./{ios,android} -name 'helloworld*') ; do
    mv $f ${f/helloworld/$APP_CODE_NAME}
  done
done
