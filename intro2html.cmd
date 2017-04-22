@echo off

set PANDOC=D:\APP\BookLib\Pandoc\pandoc
set PANDOCCITE=D:\APP\BookLib\Pandoc\pandoc-citeproc
set INCLUDE=%~dp0markdown-include.html
set BODY_BEFORE=%~dp0markdown-bodybefore.html
set BODY_AFTER=%~dp0markdown-bodyafter.html

%PANDOC% -S --include-in-header="%INCLUDE%" --include-before-body="%BODY_BEFORE%" --include-after-body="%BODY_AFTER%" --filter %PANDOCCITE% -o %~n1.html %1
echo OK
