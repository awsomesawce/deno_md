#!/usr/bin/env bash
# Aliases for Replit shell

alias dr="deno run"
alias dra="deno run -A" # Run with --allow-all

chtsh() {
  local u="https://cht.sh"
  if ! command -v curl > /dev/null; then
    echo "curl is not installed" >&2
    return 2
  fi
  if [[ $# -eq 0 ]]; then
    echo "No args"
    curl "$u"
    return 1
  fi
  command curl "$u/$*"
}