@SETLOCAL
@IF NOT DEFINED NODE_PATH (
  @SET "NODE_PATH=C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\svelte-check@3.6.9_postcss-load-config@4.0.2_postcss@8.4.38__postcss@8.4.38_svelte@4.2.15\node_modules\svelte-check\bin\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\svelte-check@3.6.9_postcss-load-config@4.0.2_postcss@8.4.38__postcss@8.4.38_svelte@4.2.15\node_modules\svelte-check\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\svelte-check@3.6.9_postcss-load-config@4.0.2_postcss@8.4.38__postcss@8.4.38_svelte@4.2.15\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\node_modules"
) ELSE (
  @SET "NODE_PATH=C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\svelte-check@3.6.9_postcss-load-config@4.0.2_postcss@8.4.38__postcss@8.4.38_svelte@4.2.15\node_modules\svelte-check\bin\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\svelte-check@3.6.9_postcss-load-config@4.0.2_postcss@8.4.38__postcss@8.4.38_svelte@4.2.15\node_modules\svelte-check\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\svelte-check@3.6.9_postcss-load-config@4.0.2_postcss@8.4.38__postcss@8.4.38_svelte@4.2.15\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\node_modules;%NODE_PATH%"
)
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\svelte-check\bin\svelte-check" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\svelte-check\bin\svelte-check" %*
)
