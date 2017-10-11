@echo off

set FFMPEG=%~dp0%ffmpeg.exe

set OPTIONS=-acodec copy

set SRC=%~1
set DST=%~n1.mp4

"%FFMPEG%" -hide_banner -i "%SRC%" %OPTIONS% "%DST%"
