#!/bin/bash

echo "---> Creating /app/.cdn-meganz direcotry"
mkdir /app/.cdn-meganz
sleep 2

echo "---> Downloading *.snap files"
if [[ $AUTHENICATE_MEGACMD_INSTALL != "" ]]; then
  echo "     Signing in..."
  mega-login $MEGACMD_AUTH_TOKEN
  for buildsList in $(mega-find /reproducible-builds/snapcraft/dogehouse --pattern="*snap")
  do
     mega-get $buildsList /app/.cdn-meganz;
  done
else
  echo "!    Caching was disabled, so requests will be abit slower"
  echo "     as the server will download each of the build file one-by-one"
fi
sleep 2

echo "---> Starting server up..."
yarn start
