import time
import io
import math, operator
import ImageChops
from picamera import PiCamera
from PIL import Image
#from skimage.measure import structural_similarity as ssim

def rmsdiff(im1, im2):
    h = ImageChops.difference(im1, im2).histogram()
    return math.sqrt(reduce(operator.add,
        map(lambda h, i: h*(i**2), h, h.keys())) / 
            (float(im1.size[0]) * im1.size[1]))

lastImage = None
similarity = 200
stream = io.BytesIO()

with PiCamera() as camera:
    for foo in camera.capture_continuous(stream, format='png'):
        stream.truncate()
        stream.seek(0)
        image = Image.open(stream)

        filename = 'out/' + time.strftime('%Y%m%d-%H%M%S') + '.png'

        diff = None

        if lastImage is None:
            image.save(filename, 'PNG')
            lastImage = image
        else:
            diff = rmsdiff(lastImage, image)
            if similarity < diff:
                image.save(filename, 'PNG')
                lastImage = image
                print('kept {} with rms of {}'.format(filename, diff))
            else:
                print('image discarded as rms was only {}'.format(diff))
        time.sleep(10)
