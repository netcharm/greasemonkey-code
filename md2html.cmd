@echo off

rem cd /d %~dp0

set PANDOC_PATH=D:\APP\BookLib\Pandoc
set PANDOC=%PANDOC_PATH%\pandoc.exe
set PANDOCCITE=%PANDOC_PATH%\pandoc-citeproc.exe
set INCLUDE=%~dp0markdown-header.html
set BODY_BEFORE=%~dp0markdown-bodybefore.html
set BODY_AFTER=%~dp0markdown-bodyafter.html
set MARKDOWN_FLAG=markdown+fenced_code_blocks+raw_html+pipe_tables+backtick_code_blocks+auto_identifiers+ascii_identifiers+shortcut_reference_links+markdown_in_html_blocks+yaml_metadata_block+inline_code_attributes+tex_math_dollars
rem set PANDOCOPT=-S --include-in-header="%INCLUDE%" --include-before-body="%BODY_BEFORE%" --include-after-body="%BODY_AFTER%" --columns=100 --toc -t html5
set PANDOCOPT=--include-in-header="%INCLUDE%" --columns=100 --toc -t html5 --smart --mathjax="https://cdn.bootcss.com/mathjax/2.7.2/latest.js" -f %MARKDOWN_FLAG%
set PANDOCOPTC=%PANDOCOPT% --filter %PANDOCCITE%
goto START

:START
if /I "%~1"=="/R" (goto RECURSION)

if "%~1"=="" (
  goto MULTI
) else (
  goto SINGLE
)
goto END

: RECURSION
set count=0
for /R "." %%A in (*.md) do (
    rem @echo SRC: %%~nxA  %%~fxA
    rem @echo OUT: %%~dpnA
    echo Converting "%%~nxA" -^> "%%~nA.html" ......
    %PANDOC% %PANDOCOPT% -o "%%~dpnA.html" "%%~fxA"
    set /a count+=1
)
echo Total converted %count% files.
goto END

:MULTI
set count=0
for %%A in (*.md) do (
    rem @echo SRC: %%~nxA  %%~fxA
    rem @echo OUT: %%~dpnA
    echo Converting "%%~nxA" -^> "%%~nA.html" ......
    %PANDOC% %PANDOCOPT% -o "%%~dpnA.html" "%%~fxA"
    set /a count+=1
)
echo Total converted %count% files.
goto END

:SINGLE
echo Converting %~1 -^> %~n1.html ......
%PANDOC% %PANDOCOPT% -o "%~n1.html" "%~1"
goto END

:END
echo OK
