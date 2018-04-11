@echo off

set FFMPEG=%~dp0%ffmpeg.exe

set FF_OPTS=-hide_banner -threads 4
set OPTIONS=-acodec copy -vcodec copy

set SRC=%~1
set DST=%~n1.mp4

"%FFMPEG%" %FF_OPTS% -i "%SRC%" %OPTIONS% "%DST%"
