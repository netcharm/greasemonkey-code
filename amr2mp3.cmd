@echo off

set FFMPEG=%~dp0%ffmpeg.exe

set FF_OPTS=-hide_banner -threads 4
set OPTIONS=-acodec libmp3lame

set SRC=%~1
set DST=%~n1.mp3

"%FFMPEG%" %FF_OPTS% -i "%SRC%" "%DST%"
