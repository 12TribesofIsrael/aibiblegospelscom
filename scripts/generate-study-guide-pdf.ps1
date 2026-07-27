# Generate /public/anything-is-possible-study-guide.pdf from scripts/study-guide.html
# Uses headless Chrome (no extra deps). Re-run after editing study-guide.html.
# Mirrors generate-cheatsheet-pdf.ps1.

$ErrorActionPreference = 'Stop'

$repoRoot   = Split-Path -Parent $PSScriptRoot
$htmlPath   = Join-Path $repoRoot 'scripts\study-guide.html'
$pdfPath    = Join-Path $repoRoot 'public\anything-is-possible-study-guide.pdf'
$chrome     = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

if (-not (Test-Path $chrome))   { throw "Chrome not found at $chrome" }
if (-not (Test-Path $htmlPath)) { throw "Source HTML not found at $htmlPath" }

$htmlUri = ([Uri](Get-Item $htmlPath).FullName).AbsoluteUri

Write-Host "Rendering $htmlUri -> $pdfPath"

& $chrome `
  --headless=new `
  --disable-gpu `
  --no-pdf-header-footer `
  --no-margins `
  --print-to-pdf-no-header `
  "--print-to-pdf=$pdfPath" `
  $htmlUri | Out-Null

if (-not (Test-Path $pdfPath)) { throw 'PDF was not generated.' }

$size = [math]::Round((Get-Item $pdfPath).Length / 1KB, 1)
Write-Host "OK: $pdfPath ($size KB)"
