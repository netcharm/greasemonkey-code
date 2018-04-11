@echo off

set FFMPEG=%~dp0%ffmpeg.exe

set FF_OPTS=-hide_banner -threads 4
set OPTIONS=-c:v libvpx -crf 12 -b:v 100K

set SRC=%~1
set DST=%~n1.webm

"%FFMPEG%" %FF_OPTS% -i "%SRC%" %OPTIONS% "%DST%"
