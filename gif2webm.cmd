@echo off

set FFMPEG=%~dp0%ffmpeg.exe

set OPTIONS=-c:v libvpx -crf 12 -b:v 100K

set SRC=%~1
set DST=%~n1.webm

"%FFMPEG%" -hide_banner -i "%SRC%" %OPTIONS% "%DST%"
