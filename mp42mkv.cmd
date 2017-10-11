@echo on

set FFMPEG=%~dp0%ffmpeg.exe

set OPTIONS=-vcodec copy -acodec copy

set SRC=%~1
set DST=%~n1.mkv

"%FFMPEG%" -hide_banner -i "%SRC%" %OPTIONS% "%DST%"
