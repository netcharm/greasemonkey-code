@echo off

set IS=D:\APP\Graph\InkScape
set PATH=%IS%;%PATH%

set OPT_SRC=-density 145 -alpha activate -antialias -depth 32 -size 32x32
set OPT_DST=-channel rgba -alpha on -resize 32x32

set SRC=%~1
set DST=%~n1.png

"%IS%\inkscape.exe" -z -e "%DST%" -w 32 -h 32 "%SRC%"
