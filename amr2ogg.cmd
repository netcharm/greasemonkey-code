@echo off

set FFMPEG=%~dp0%ffmpeg.exe

set OPTIONS=-strict 1 -acodec libvorbis
set SRC=%~1
set DST=%~n1.ogg

"%FFMPEG%" -hide_banner -i "%SRC%" "%DST%"
