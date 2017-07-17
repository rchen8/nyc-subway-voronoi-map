function initMap() {
  $.get("/map_center", data => {
    const map = new google.maps.Map($("#map")[0], {
      zoom: 13,
      center: JSON.parse(data)
    })

    renderSubwayStations(map);
  })
}

function renderSubwayStations(map) {
  $.get("/subway_station_coordinates", data => {
    const stations = JSON.parse(data)
    stations.forEach(coordinates => {
      const station = new google.maps.Circle({
        fillColor: '#000000',
        fillOpacity: 1,
        map: map,
        center: formatCoordinates(coordinates),
        radius: 30
      })
    })

    renderSubwayRegions(map, stations)
  })
}

function renderSubwayRegions(map, stations) {
  $.get('/map_border', data => {
    let voronoi = d3.geom.voronoi().clipExtent(JSON.parse(data))
    voronoi = voronoi(stations)
    voronoi.forEach(cell => {
      let polygon = [];
      cell.forEach(coordinates => {
        polygon.push(formatCoordinates(coordinates))
      })

      const region = new google.maps.Polygon({
        paths: polygon,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 1,
        fillOpacity: 0.0
      })
      region.setMap(map)
    })
  })
}

function formatCoordinates(coordinates) {
  return {
    lat: coordinates[0],
    lng: coordinates[1]
  }
}
