@echo off

rem cd /d %~dp0

set PANDOC=D:\APP\BookLib\Pandoc\pandoc
set PANDOCCITE=D:\APP\BookLib\Pandoc\pandoc-citeproc
set INCLUDE=%~dp0markdown-header.html
set BODY_BEFORE=%~dp0markdown-bodybefore.html
set BODY_AFTER=%~dp0markdown-bodyafter.html
rem set PANDOCOPT=-S --include-in-header="%INCLUDE%" --include-before-body="%BODY_BEFORE%" --include-after-body="%BODY_AFTER%" --columns=100 --toc -t html5
set PANDOCOPT=-S --include-in-header="%INCLUDE%" --columns=100 --toc -t html5
set PANDOCOPTC=%PANDOCOPT% --filter %PANDOCCITE%
goto START

:START
if /I "%1"=="/R" (goto RECURSION)

if "%1"=="" (
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
echo Converting %1 -^> %~n1.html ......
%PANDOC% %PANDOCOPT% -o "%~n1.html" %1
goto END

:END
echo OK
