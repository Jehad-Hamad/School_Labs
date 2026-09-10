#!/bin/bash
# Double-click this file to run the project correctly.
#
# WebGL textures cannot load from a file:// URL - Chrome treats every local
# file as a separate origin and blocks them, so the scene renders untextured.
# Serving over http://localhost fixes that. This script starts the server and
# opens the page for you.

cd "$(dirname "$0")" || exit 1

PORT=8765
while lsof -i ":$PORT" >/dev/null 2>&1; do
  PORT=$((PORT + 1))
done

URL="http://localhost:$PORT/Project.html"

echo ""
echo "  Serving the project at:  $URL"
echo "  Opening your browser..."
echo ""
echo "  Leave this Terminal window OPEN while you use the project."
echo "  Press Control-C here (or just close this window) when you are done."
echo ""

( sleep 1; open "$URL" ) &

python3 -m http.server "$PORT"
