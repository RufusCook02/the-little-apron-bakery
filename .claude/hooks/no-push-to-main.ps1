# PreToolUse guard: refuse any shell command that would push to main.
#
# main auto-deploys to production via Vercel, so changes belong on a branch and
# ship through a PR. This blocks Claude only -- a human running git directly is
# unaffected.
#
# Reads the PreToolUse payload on stdin and, when it denies, prints the
# permissionDecision JSON Claude Code expects. Silence + exit 0 means allow.

$ErrorActionPreference = 'Stop'

function Deny($reason) {
  @{
    hookSpecificOutput = @{
      hookEventName            = 'PreToolUse'
      permissionDecision       = 'deny'
      permissionDecisionReason = $reason
    }
  } | ConvertTo-Json -Depth 5 -Compress
  exit 0
}

try {
  $raw = [Console]::In.ReadToEnd()
  if (-not $raw) { exit 0 }
  $command = (ConvertFrom-Json $raw).tool_input.command
} catch {
  # A payload we can't parse is not evidence of a push; don't block real work.
  exit 0
}

if (-not $command) { exit 0 }

# Only `git push` is in scope. Match anywhere in the string so compound
# commands (`Push-Location ...; git push ...`) are caught too.
if ($command -notmatch '(?im)\bgit\s+push\b') { exit 0 }

$advice = 'main auto-deploys to production. Create a branch and open a PR instead -- see the `ship` skill.'

# Explicit: `git push origin main`, `git push origin HEAD:main`, `git push --force origin main`
# `main(?![-\w])` rather than `main\b` so a branch called main-fix isn't caught.
if ($command -match '(?im)\bgit\s+push\b[^;&|\r\n]*?(\s|:)main(?![-\w])') {
  Deny "Blocked: this pushes to main. $advice"
}

# Implicit: a push with no refspec while HEAD is main.
if ($command -match '(?im)\bgit\s+push\b(?![^;&|\r\n]*\b\S+\s+\S+)') {
  try {
    $branch = (& git rev-parse --abbrev-ref HEAD 2>$null)
  } catch {
    $branch = $null
  }
  if ($branch -and $branch.Trim() -eq 'main') {
    Deny "Blocked: HEAD is main, so this push targets main. $advice"
  }
}

exit 0
