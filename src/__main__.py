import os
import time

FRAMES = 1000
TIMEBETWEEN = 6

frameCount = 0
while frameCount < FRAMES:
    imageNumber = str(frameCount).zfill(7)
    os.system("raspistill -o out/image%s.jpg"%(imageNumber))
    frameCount += 1
    time.sleep(TIMEBETWEEN - 6) #Takes roughly 6 seconds to[url][/url] take a picture

#os.system("ls *.jpg > stills.txt")