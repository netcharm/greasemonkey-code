@echo off

set FFMPEG=%~dp0%ffmpeg.exe

set FF_OPTS=-hide_banner -threads 4
set OPTIONS=-acodec libfaac

set SRC=%~1
set DST=%~n1.aac

"%FFMPEG%" %FF_OPTS% -i "%SRC%" "%DST%"
