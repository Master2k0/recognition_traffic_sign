import numpy as np
from flask import Flask, request, jsonify
from tensorflow import keras
import base64
from PIL import ImageTk, Image
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
model = keras.models.load_model('traffic_classifier.h5')

classes = { 1:'Speed limit (20km/h)',
            2:'Speed limit (30km/h)', 
            3:'Speed limit (50km/h)', 
            4:'Speed limit (60km/h)', 
            5:'Speed limit (70km/h)', 
            6:'Speed limit (80km/h)', 
            7:'End of speed limit (80km/h)', 
            8:'Speed limit (100km/h)', 
            9:'Speed limit (120km/h)', 
            10:'No passing', 
            11:'No passing veh over 3.5 tons', 
            12:'Right-of-way at intersection', 
            13:'Priority road', 
            14:'Yield', 
            15:'Stop', 
            16:'No vehicles', 
            17:'Veh > 3.5 tons prohibited', 
            18:'No entry', 
            19:'General caution', 
            20:'Dangerous curve left', 
            21:'Dangerous curve right', 
            22:'Double curve', 
            23:'Bumpy road', 
            24:'Slippery road', 
            25:'Road narrows on the right', 
            26:'Road work', 
            27:'Traffic signals', 
            28:'Pedestrians', 
            29:'Children crossing', 
            30:'Bicycles crossing', 
            31:'Beware of ice/snow',
            32:'Wild animals crossing', 
            33:'End speed + passing limits', 
            34:'Turn right ahead', 
            35:'Turn left ahead', 
            36:'Ahead only', 
            37:'Go straight or right', 
            38:'Go straight or left', 
            39:'Keep right', 
            40:'Keep left', 
            41:'Roundabout mandatory', 
            42:'End of no passing', 
            43:'End no passing veh > 3.5 tons' }


@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return "No file part"
    try:
      data = request.files['image']
      image = Image.open(data)
      image = image.resize((30, 30))
      image = np.expand_dims(image, axis=0)
      image = np.array(image)
      if(image[0][0][0].size == 3):
        print(model.predict(image))
        pred = np.argmax(model.predict(image),axis=-1)[0]
        sign = classes[pred+1]
        return sign
      else:
        return "Image is not right format, please try again"
       
    except:
       return "Image error"


@app.route('/test', methods=['GET'])
def test():
    return "Hello World"

if __name__ == '__main__':
    try:
      app.run(port=5000, debug=True)
    except:
      print("Server stopped")
