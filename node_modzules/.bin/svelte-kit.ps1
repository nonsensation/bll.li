#!/usr/bin/env pwsh
$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent

$exe=""
$pathsep=":"
$env_node_path=$env:NODE_PATH
$new_node_path="C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\@sveltejs+kit@2.5.6_@sveltejs+vite-plugin-svelte@3.1.0_svelte@4.2.15_vite@5.2.10_@types+node@_ik2l6ssdztnudtmko2fnr23sa4\node_modules\@sveltejs\kit\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\@sveltejs+kit@2.5.6_@sveltejs+vite-plugin-svelte@3.1.0_svelte@4.2.15_vite@5.2.10_@types+node@_ik2l6ssdztnudtmko2fnr23sa4\node_modules\@sveltejs\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\@sveltejs+kit@2.5.6_@sveltejs+vite-plugin-svelte@3.1.0_svelte@4.2.15_vite@5.2.10_@types+node@_ik2l6ssdztnudtmko2fnr23sa4\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\node_modules"
if ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {
  # Fix case when both the Windows and Linux builds of Node
  # are installed in the same directory
  $exe=".exe"
  $pathsep=";"
} else {
  $new_node_path="/mnt/c/prj/Websites/bll.li/bll.li/node_modules/.pnpm/@sveltejs+kit@2.5.6_@sveltejs+vite-plugin-svelte@3.1.0_svelte@4.2.15_vite@5.2.10_@types+node@_ik2l6ssdztnudtmko2fnr23sa4/node_modules/@sveltejs/kit/node_modules:/mnt/c/prj/Websites/bll.li/bll.li/node_modules/.pnpm/@sveltejs+kit@2.5.6_@sveltejs+vite-plugin-svelte@3.1.0_svelte@4.2.15_vite@5.2.10_@types+node@_ik2l6ssdztnudtmko2fnr23sa4/node_modules/@sveltejs/node_modules:/mnt/c/prj/Websites/bll.li/bll.li/node_modules/.pnpm/@sveltejs+kit@2.5.6_@sveltejs+vite-plugin-svelte@3.1.0_svelte@4.2.15_vite@5.2.10_@types+node@_ik2l6ssdztnudtmko2fnr23sa4/node_modules:/mnt/c/prj/Websites/bll.li/bll.li/node_modules/.pnpm/node_modules"
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
    $input | & "$basedir/node$exe"  "$basedir/../@sveltejs/kit/svelte-kit.js" $args
  } else {
    & "$basedir/node$exe"  "$basedir/../@sveltejs/kit/svelte-kit.js" $args
  }
  $ret=$LASTEXITCODE
} else {
  # Support pipeline input
  if ($MyInvocation.ExpectingInput) {
    $input | & "node$exe"  "$basedir/../@sveltejs/kit/svelte-kit.js" $args
  } else {
    & "node$exe"  "$basedir/../@sveltejs/kit/svelte-kit.js" $args
  }
  $ret=$LASTEXITCODE
}
$env:NODE_PATH=$env_node_path
exit $ret
