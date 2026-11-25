#!/usr/bin/env bash
# Install or update %throw on ~raddem-tidwyt over `ssh urbit` (uses the ship's control socket; the ship keeps running).
#   ./deploy/raddem.sh            first install (creates the desk, mounts, copies, commits, installs)
#   ./deploy/raddem.sh update     push new code to the installed desk
set -euo pipefail
cd "$(dirname "$0")/.."
PIER=raddem-tidwyt
TMP=/tmp/throw-deploy
ssh urbit "mkdir -p $TMP"
scp -q deploy/*.hoon deploy/remote-run.py urbit:$TMP/
run() { echo "· $1"; ssh urbit "python3 $TMP/remote-run.py $TMP/$1.hoon"; }

if [ "${1:-}" != update ]; then
  run newdesk; sleep 3
  run mount;   sleep 3
fi
echo "· copying desk files"
tar -C desk -cf - . | ssh urbit "tar -C ~/$PIER/throw -xf -"
run commit; sleep 10
if [ "${1:-}" != update ]; then run install; sleep 20; fi
echo "· live check:"
curl -s -o /dev/null -w '  https://urbit.tylerirl.com/apps/throw -> %{http_code}\n' https://urbit.tylerirl.com/apps/throw
