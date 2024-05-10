#!/usr/bin/env pwsh
$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent

$exe=""
$pathsep=":"
$env_node_path=$env:NODE_PATH
$new_node_path="C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\svelte-check@3.6.9_postcss-load-config@4.0.2_postcss@8.4.38__postcss@8.4.38_svelte@4.2.15\node_modules\svelte-check\bin\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\svelte-check@3.6.9_postcss-load-config@4.0.2_postcss@8.4.38__postcss@8.4.38_svelte@4.2.15\node_modules\svelte-check\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\svelte-check@3.6.9_postcss-load-config@4.0.2_postcss@8.4.38__postcss@8.4.38_svelte@4.2.15\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\node_modules"
if ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {
  # Fix case when both the Windows and Linux builds of Node
  # are installed in the same directory
  $exe=".exe"
  $pathsep=";"
} else {
  $new_node_path="/mnt/c/prj/Websites/bll.li/bll.li/node_modules/.pnpm/svelte-check@3.6.9_postcss-load-config@4.0.2_postcss@8.4.38__postcss@8.4.38_svelte@4.2.15/node_modules/svelte-check/bin/node_modules:/mnt/c/prj/Websites/bll.li/bll.li/node_modules/.pnpm/svelte-check@3.6.9_postcss-load-config@4.0.2_postcss@8.4.38__postcss@8.4.38_svelte@4.2.15/node_modules/svelte-check/node_modules:/mnt/c/prj/Websites/bll.li/bll.li/node_modules/.pnpm/svelte-check@3.6.9_postcss-load-config@4.0.2_postcss@8.4.38__postcss@8.4.38_svelte@4.2.15/node_modules:/mnt/c/prj/Websites/bll.li/bll.li/node_modules/.pnpm/node_modules"
}
if ([string]::IsNullOrEmpty($env_node_path)) {
  $env:NODE_PATH=$new_node_path
} else {
  $env:NODE_PATH="$new_node_path$pathsep$env_node_path"
}

$ret=0
if (Test-Path "$basedir/node$exe") {
  # Support pipeline input
  if ($MyInvocation.ExpectingInput) {
    $input | & "$basedir/node$exe"  "$basedir/../svelte-check/bin/svelte-check" $args
  } else {
    & "$basedir/node$exe"  "$basedir/../svelte-check/bin/svelte-check" $args
  }
  $ret=$LASTEXITCODE
} else {
  # Support pipeline input
  if ($MyInvocation.ExpectingInput) {
    $input | & "node$exe"  "$basedir/../svelte-check/bin/svelte-check" $args
  } else {
    & "node$exe"  "$basedir/../svelte-check/bin/svelte-check" $args
  }
  $ret=$LASTEXITCODE
}
$env:NODE_PATH=$env_node_path
exit $ret
