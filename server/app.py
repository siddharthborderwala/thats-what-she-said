import pickle
import re

import contractions
from flask import Flask, request
from flask_cors import CORS

from nltk.stem import WordNetLemmatizer
from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences

model = load_model('model')
max_length = 150


with open('tokenizer.pkl', 'rb') as handle:
    tokenizer = pickle.load(handle)

l = WordNetLemmatizer()

app = Flask(__name__)

CORS(app)

# remove puntuation using regex


def process(text):
    text = contractions.fix(text)
    text = re.sub(r'[^\w\s]', '', text)
    return text


@app.route("/predict", methods=['POST'])
def predict():
    text = request.form['text']
    text = [l.lemmatize(word) for word in process(text).split(' ')]

    # call model.predict and get the output
    test_sequences = tokenizer.texts_to_sequences([text])
    test_padded = pad_sequences(
        test_sequences, padding='post', maxlen=max_length)
    prediction = model.predict(test_padded)

    # send the output
    return str(prediction[0][0])
