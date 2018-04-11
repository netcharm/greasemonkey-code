@echo off

set FFMPEG=%~dp0%ffmpeg.exe

set FF_OPTS=-hide_banner -threads 4
set OPTIONS=-vf "scale=trunc(iw/2)*2:trunc(ih/2)*2"

set SRC=%~1
set DST=%~n1.mp4

"%FFMPEG%" %FF_OPTS% -i "%SRC%" %OPTIONS% "%DST%"
