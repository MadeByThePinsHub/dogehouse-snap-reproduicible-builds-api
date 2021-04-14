#!/bin/sh

# Welcome banner
clear
echo "========================================================="
echo "This script will install an daily build of DogeHouse by"
echo "The Pins Team, and may replace your current installation"
echo "from amy way, either through the Snap Store or through"
echo "manual builds made by you. Because we rely on mega.nz on"
echo "storing our builds (older builds than an month will be"
echo "purged to conserver cloud storage), you may optionally"
echo "install MegaCMD if that supported on your system. Other"
echo "-wise the server will download the file for you from mega"
echo "and prompt your client to download it into your current"
echo "direcotry"
echo "========================================================="

# Fetch from API
# For testing locally, replace this value with 'localhost:3000'
API_HOST="https://dogehouse-snap-dl.madebythepins.tk"
ISSUE_TRACKER_URL="https://null"
echo "--> Fetching latest build from the APi..."
$(command -v curl>>/dev/null && echo curl -i --verbose || echo wget ) $API_HOST/api/builds
if [ "$?" != "0" ]; then
   echo "error: The API server is down or you don't have an stable internet connection. Please try again later."
   echo "error: If the problem presists, please record your terminal session with"
   echo "error: 'asciinema rec' (or similar) and file issues at our issue tracker at GitHub:"
   echo "error:    $ISSUE_TRACKER_URL"
   echo "error: Don't forget to include them in your bug report!"
   exit $?
fi
