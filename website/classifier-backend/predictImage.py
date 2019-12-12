import tensorflow as tf
import pickle as pk
import numpy as np
import sys
from PIL import Image, ImageOps
import matplotlib.pyplot as plt
from keras.models import Sequential,load_model
from keras.layers import Dense, Conv2D, Dropout, Flatten, MaxPooling2D
#code used from: https://towardsdatascience.com/image-classification-in-10-minutes-with-mnist-dataset-54c35b77a38d
#load data
def buildClassifier():
    (x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
    #prep data
    x_train.shape
    x_train = x_train.reshape(x_train.shape[0], 28, 28, 1)
    x_test = x_test.reshape(x_test.shape[0], 28, 28, 1)
    input_shape = (28, 28, 1)
    # Making sure that the values are float so that we can get decimal points after division
    x_train = x_train.astype('float32')
    x_test = x_test.astype('float32')
    # Normalizing the RGB codes by dividing it to the max RGB value.
    x_train /= 255
    x_test /= 255

    #build model
    model = Sequential()
    model.add(Conv2D(28, kernel_size=(3,3), input_shape=input_shape))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Flatten()) # Flattening the 2D arrays for fully connected layers
    model.add(Dense(128, activation=tf.nn.relu))
    model.add(Dropout(0.2))
    model.add(Dense(10,activation=tf.nn.softmax))

    #fit model
    model.compile(optimizer='adam', 
                loss='sparse_categorical_crossentropy', 
                metrics=['accuracy'])
    model.fit(x=x_train,y=y_train, epochs=10)
    model.evaluate(x_test, y_test)
    return model

#predict for individual image
#input is flattened 28x28 array
def run_prediction(img_ar):
    model=None
    try:
        model = load_model("model.h5",custom_objects={'softmax_v2':tf.nn.softmax,'relu':tf.nn.relu})
    except (OSError, IOError) as e:
        model = buildClassifier()
        model.save("model.h5")
    pred = model.predict(img_ar.reshape(1, 28, 28, 1))
    return pred.argmax()

def convert_img(img_path):
    original_image = Image.open('./images/normal/'+img_path)
    original_image = original_image.convert('L')
    inverted_image = ImageOps.invert(original_image)
    size = (28, 28)
    img = inverted_image.resize(size)
    original_image.resize(size).save('./images/shrunk/'+img_path)
    data = np.asarray(img.getdata()).flatten()
    return data
def main():
    image_data = convert_img(sys.argv[1])
    output = run_prediction(image_data)
    print('{"output":',output,',"orig":"/normal/'+sys.argv[1]+'","shrunk":"/shrunk/'+sys.argv[1]+'"}')
    return output
    #takes in file location
main()