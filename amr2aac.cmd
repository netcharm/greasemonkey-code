@echo off

set FFMPEG=%~dp0%ffmpeg.exe

set OPTIONS=-acodec libfaac
set SRC=%~1
set DST=%~n1.aac

"%FFMPEG%" -hide_banner -i "%SRC%" "%DST%"
