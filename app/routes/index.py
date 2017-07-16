from flask import jsonify, render_template, request
from app import app

from ..models import csv_parser

@app.route('/', methods=['GET'])
def index():
  csv_parser.parse_csv()
  return render_template('index.html')
