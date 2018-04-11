@echo off

set FFMPEG=%~dp0%ffmpeg.exe

set FF_OPTS=-hide_banner -threads 4
set OPTIONS=-acodec copy

set SRC=%~1
set DST=%~n1.mkv

"%FFMPEG%" %FF_OPTS% -i "%SRC%" %OPTIONS% "%DST%"
