# Generate /public/complete-biblical-timeline-reading-plan.pdf from scripts/timeline-reading-plan.html
# Same headless print-to-pdf pattern as generate-cheatsheet-pdf.ps1. Re-run after
# `python scripts/build-timeline-reading-plan.py`.
#
# Chrome is not installed on every machine, so this falls through to Edge (present on every
# Windows 11 install) and then to Playwright's Chromium before giving up.

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$htmlPath = Join-Path $repoRoot 'scripts\timeline-reading-plan.html'
$pdfPath  = Join-Path $repoRoot 'public\complete-biblical-timeline-reading-plan.pdf'

$candidates = @(
  'C:\Program Files\Google\Chrome\Application\chrome.exe',
  'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
  'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
  'C:\Program Files\Microsoft\Edge\Application\msedge.exe'
)
$candidates += Get-ChildItem "$env:LOCALAPPDATA\ms-playwright\chromium-*\chrome-win*\chrome.exe" -ErrorAction SilentlyContinue | ForEach-Object { $_.FullName }
$browser = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $browser)  { throw 'No Chrome, Edge or Playwright Chromium found to render the PDF.' }
if (-not (Test-Path $htmlPath)) { throw "Source HTML not found at $htmlPath (run build-timeline-reading-plan.py first)" }

$htmlUri = ([Uri](Get-Item $htmlPath).FullName).AbsoluteUri
Write-Host "Rendering $htmlUri -> $pdfPath"
Write-Host "  with $browser"

& $browser `
  --headless=new `
  --disable-gpu `
  --no-pdf-header-footer `
  --no-margins `
  "--print-to-pdf=$pdfPath" `
  $htmlUri | Out-Null

if (-not (Test-Path $pdfPath)) { throw 'PDF was not generated.' }

$size = [math]::Round((Get-Item $pdfPath).Length / 1KB, 1)
Write-Host "OK: $pdfPath ($size KB)"
