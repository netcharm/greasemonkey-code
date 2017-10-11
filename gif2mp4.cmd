@echo off

set FFMPEG=%~dp0%ffmpeg.exe

set OPTIONS=-vf "scale=trunc(iw/2)*2:trunc(ih/2)*2"

set SRC=%~1
set DST=%~n1.mp4

"%FFMPEG%" -hide_banner -i "%SRC%" %OPTIONS% "%DST%"
