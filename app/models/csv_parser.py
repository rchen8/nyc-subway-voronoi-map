import csv

def parse_csv():
  with open('NYC_Transit_Subway_Entrance_And_Exit_Data.csv') as file:
    reader = csv.reader(file, delimiter=',')
    for row in reader:
      print ', '.join(row)
