@echo off

set FFMPEG=%~dp0%ffmpeg.exe

set OPTIONS=-acodec libmp3lame
set SRC=%~1
set DST=%~n1.mp3

"%FFMPEG%" -hide_banner -i "%SRC%" "%DST%"
