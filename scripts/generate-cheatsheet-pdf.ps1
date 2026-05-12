# Generate /public/deut28-cheatsheet.pdf from scripts/cheatsheet.html
# Uses headless Chrome (no extra deps). Re-run after editing cheatsheet.html.

$ErrorActionPreference = 'Stop'

$repoRoot   = Split-Path -Parent $PSScriptRoot
$htmlPath   = Join-Path $repoRoot 'scripts\cheatsheet.html'
$pdfPath    = Join-Path $repoRoot 'public\deut28-cheatsheet.pdf'
$chrome     = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

if (-not (Test-Path $chrome))  { throw "Chrome not found at $chrome" }
if (-not (Test-Path $htmlPath)) { throw "Source HTML not found at $htmlPath" }

# file:// URI for local html
$htmlUri = ([Uri](Get-Item $htmlPath).FullName).AbsoluteUri

Write-Host "Rendering $htmlUri -> $pdfPath"

# Headless Chrome print-to-pdf
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
