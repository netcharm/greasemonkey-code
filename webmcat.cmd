@echo off

set FFMPEG=%~dp0%ffmpeg.exe

set FF_OPTS=-hide_banner -threads 4
set OPTIONS=-filter_complex "[0:v:0] [1:v:0] concat=n=2:v=1 [v]" -map "[v]" -c:v libvpx -crf 12 -b:v 100K

set SRC=%~1
set DST=%~n1-new.webm

"%FFMPEG%" %FF_OPTS% -i "%SRC%" %OPTIONS% "%DST%"
