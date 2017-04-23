import time
import io
import os
import math
from picamera import PiCamera
from PIL import Image, ImageChops
#from skimage.measure import structural_similarity as ssim

similarity = 12.0
out = 'out/capturedData'

def rmsdiff(im1, im2):
    "Calculate the root-mean-square difference between two images"
    h = ImageChops.difference(im1, im2).histogram()
    sq = (value*((idx%256)**2) for idx, value in enumerate(h))
    sum_of_squares = sum(sq)
    rms = math.sqrt(sum_of_squares/float(im1.size[0] * im1.size[1]))
    return rms

def main():
    class state:
        lastImage = None

    def keepImage(image, filename):
        if not os.path.exists(out):
            os.makedirs(out)

        image.save(out + filename, 'PNG')
        state.lastImage = image

    with PiCamera() as camera:
        #print('exposure_mode = {}, exposure_speed = {}'
        #    .format(camera.exposure_mode, camera.exposure_speed))

        stream = io.BytesIO()
        for _ in camera.capture_continuous(stream, format='png'):
            stream.seek(0)
            image = Image.open(stream)

            filename = time.strftime('%Y%m%d-%H%M%S') + '.png'

            diff = None

            if state.lastImage is None:
                keepImage(image, filename)
                print('started with {}'.format(filename))
            else:
                diff = rmsdiff(state.lastImage, image)
                if similarity < diff:
                    keepImage(image, filename)
                    print('kept {} with rms of {}'.format(filename, diff))
                else:
                    print('image discarded as rms was only {}'.format(diff))
            time.sleep(10)

            stream.seek(0)
            stream.truncate()

main()
