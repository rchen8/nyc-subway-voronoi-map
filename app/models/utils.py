import csv
import sets

def get_coordinates_of_subway_stations():
  coordinates = sets.Set()
  with open('NYC_Transit_Subway_Entrance_And_Exit_Data.csv') as file:
    reader = csv.reader(file, delimiter=',')
    for row in reader:
      try:
        coordinates.add((float(row[3]), float(row[4])))
      except ValueError:
        continue
  return list(coordinates)


def get_api_key():
  with open('secret.txt') as file:
    return file.readline()
