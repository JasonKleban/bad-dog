from time import sleep
from picamera import PiCamera
import time
import io
from PIL import Image
import numpy as np
#from skimage.measure import structural_similarity as ssim

def mse(imageA, imageB):
    # the 'Mean Squared Error' between the two images is the
    # sum of the squared difference between the two images;
    # NOTE: the two images must have the same dimension
    err = np.sum((imageA.astype("float") - imageB.astype("float")) ** 2)
    err /= float(imageA.shape[0] * imageA.shape[1])

    # return the MSE, the lower the error, the more "similar"
    # the two images are
    return err

lastImage = None
similarity = 200
stream = io.BytesIO()

with PiCamera() as camera:
    for foo in camera.capture_continuous(stream, format='png'):
        stream.truncate()
        stream.seek(0)
        image = Image.open(stream)
        imageArray = np.asarray(image.convert('L'))
        if lastImage is None or similarity < mse(lastImage, imageArray):
            image.save('out/' + time.strftime('%Y%m%d-%H%M%S') + '.png','PNG')
            lastImage = imageArray
            print('kept a picture')
        time.sleep(10)