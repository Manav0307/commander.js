#!/bin/bash
set -e

MODE="${1:-}"

case "$MODE" in
  base)
    node ./node_modules/jest/bin/jest.js tests/command.executableSubcommand.mock.test.js tests/command.helpCommand.test.js tests/command.parse.test.js --runInBand
    ;;
  new)
    node ./node_modules/jest/bin/jest.js tests/command.preSubcommand_lifecycle_e957e0.test.js --runInBand
    ;;
  *)
    echo "Usage: ./test.sh {base|new}" >&2
    exit 1
    ;;
 esac
