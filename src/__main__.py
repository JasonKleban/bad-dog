from time import sleep
from picamera import PiCamera
import time
from io import BytesIO
from PIL import Image
timestr = time.strftime("%Y%m%d-%H%M%S")

camera = PiCamera()

# Create the in-memory stream
stream = BytesIO()
camera.capture(stream, format='png')
# "Rewind" the stream to the beginning so we can read its content
stream.seek(0)
image = Image.open(stream)
image.save('out/' + time.strftime('%Y%m%d-%H%M%S') + '.png','PNG')