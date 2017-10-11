@echo off

set PANDOC_PATH=D:\APP\BookLib\Pandoc
set PANDOC=%PANDOC_PATH%\pandoc.exe
set PANDOCCITE=%PANDOC_PATH%\pandoc-citeproc.exe
set PANDOCOPT_META=-M 'papersize:a4' -M 'lang:zh-CN'
set PANDOCOPT_VAR=-V 'papersize:a4' -V 'lang:zh-CN'
set MARKDOWN_FLAG=markdown+fenced_code_blocks+raw_html+pipe_tables+backtick_code_blocks+auto_identifiers+ascii_identifiers+shortcut_reference_links+markdown_in_html_blocks+yaml_metadata_block+inline_code_attributes+tex_math_dollars
set PANDOCOPT="%~dp0pdf-template.yaml" --smart --dpi=600 -f %MARKDOWN_FLAG% -t latex -s --toc --latex-engine=xelatex --template="%~dp0pdf-template.tex"
rem %PANDOCOPT_META% %PANDOCOPT_META%
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

:RECURSION
set count=0
for /R "." %%A in (*.md) do (
    echo Converting "%%~nxA" -^> "%%~nA.pdf" ......
    %PANDOC% "%%~fxA" %PANDOCOPT% -o "%%~dpnA.pdf"
    set /a count+=1
)
echo Total converted %count% files.
goto END

:MULTI
set count=0
for %%A in (*.md) do (
    echo Converting "%%~nxA" -^> "%%~nA.pdf" ......
    %PANDOC% "%%~fxA" %PANDOCOPT% -o "%%~dpnA.pdf"
    set /a count+=1
)
echo Total converted %count% files.
goto END

:SINGLE
echo Converting %~1 -^> %~n1.pdf ......
%PANDOC% "%~1" %PANDOCOPT% -o "%~n1.pdf"
goto END

:END
echo OK
