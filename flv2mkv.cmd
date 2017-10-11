@echo off

set FFMPEG=%~dp0%ffmpeg.exe

set OPTIONS=-acodec copy -vcodec copy

set SRC=%~1
set DST=%~n1.mkv

"%FFMPEG%" -hide_banner -i "%SRC%" %OPTIONS% "%DST%"
