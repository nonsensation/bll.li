@SETLOCAL
@IF NOT DEFINED NODE_PATH (
  @SET "NODE_PATH=C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\@sveltejs+kit@2.5.6_@sveltejs+vite-plugin-svelte@3.1.0_svelte@4.2.15_vite@5.2.10_@types+node@_ik2l6ssdztnudtmko2fnr23sa4\node_modules\@sveltejs\kit\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\@sveltejs+kit@2.5.6_@sveltejs+vite-plugin-svelte@3.1.0_svelte@4.2.15_vite@5.2.10_@types+node@_ik2l6ssdztnudtmko2fnr23sa4\node_modules\@sveltejs\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\@sveltejs+kit@2.5.6_@sveltejs+vite-plugin-svelte@3.1.0_svelte@4.2.15_vite@5.2.10_@types+node@_ik2l6ssdztnudtmko2fnr23sa4\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\node_modules"
) ELSE (
  @SET "NODE_PATH=C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\@sveltejs+kit@2.5.6_@sveltejs+vite-plugin-svelte@3.1.0_svelte@4.2.15_vite@5.2.10_@types+node@_ik2l6ssdztnudtmko2fnr23sa4\node_modules\@sveltejs\kit\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\@sveltejs+kit@2.5.6_@sveltejs+vite-plugin-svelte@3.1.0_svelte@4.2.15_vite@5.2.10_@types+node@_ik2l6ssdztnudtmko2fnr23sa4\node_modules\@sveltejs\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\@sveltejs+kit@2.5.6_@sveltejs+vite-plugin-svelte@3.1.0_svelte@4.2.15_vite@5.2.10_@types+node@_ik2l6ssdztnudtmko2fnr23sa4\node_modules;C:\prj\Websites\bll.li\bll.li\node_modules\.pnpm\node_modules;%NODE_PATH%"
)
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\@sveltejs\kit\svelte-kit.js" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\@sveltejs\kit\svelte-kit.js" %*
)
