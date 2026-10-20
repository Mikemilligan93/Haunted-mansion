#!/bin/bash
# Double-click to play: starts a small local web server and opens the game.
cd "$(dirname "$0")"
PORT=8080
while lsof -i :$PORT >/dev/null 2>&1; do PORT=$((PORT+1)); done
URL="http://localhost:$PORT/?debug=1"
if command -v python3 >/dev/null 2>&1; then
  (sleep 1 && open "$URL") &
  echo "Haunted Mansion is running at $URL"
  echo "Close this window (or press Ctrl+C) to stop it."
  python3 -m http.server $PORT
else
  echo "python3 was not found. Install it with: xcode-select --install"
  read -n 1 -p "Press any key to close."
fi
