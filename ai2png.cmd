@echo off

set IM=D:\App\Graph\ImageMagick\

set OPT_SRC=-density 145 -alpha activate -antialias -depth 32 -size 32x32
set OPT_DST=-channel rgba -alpha on

set SRC=%~1
set DST=%~n1.png

"%IM%\convert" %OPT_SRC% ai:"%SRC%" %OPT_DST% "%DST%"
