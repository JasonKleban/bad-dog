import time
import io
import math, operator
from picamera import PiCamera
from PIL import Image, ImageChops
#from skimage.measure import structural_similarity as ssim

def rmsdiff(im1, im2):
    "Calculate the root-mean-square difference between two images"
    h = ImageChops.difference(im1, im2).histogram()
    sq = (value*((idx%256)**2) for idx, value in enumerate(h))
    sum_of_squares = sum(sq)
    rms = math.sqrt(sum_of_squares/float(im1.size[0] * im1.size[1]))
    return rms

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
            print('started with {}'.format(filename))
        else:
            diff = rmsdiff(lastImage, image)
            if similarity < diff:
                image.save(filename, 'PNG')
                lastImage = image
                print('kept {} with rms of {}'.format(filename, diff))
            else:
                print('image discarded as rms was only {}'.format(diff))
        time.sleep(10)
