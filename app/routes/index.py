from flask import jsonify, render_template, request
from app import app
import json

from ..models import utils

@app.route('/', methods=['GET'])
def index():
  return render_template('index.html', api_key=utils.get_api_key())

@app.route('/map_center', methods=['GET'])
def map_center():
  return json.dumps({
    'lat': 40.729694,
    'lng': -73.900184
  })

@app.route('/map_border', methods=['GET'])
def map_border():
  return json.dumps([[40.535393, -74.053667], [40.920974, -73.733690]])

@app.route('/subway_station_coordinates', methods=['GET'])
def subway_station_coordinates():
  coordinates = utils.get_coordinates_of_subway_stations()
  return json.dumps(coordinates)
