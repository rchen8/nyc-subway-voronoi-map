function renderMap() {
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
    stations.forEach(station => {
      const stationName = new google.maps.InfoWindow({
        content: station[0]
      })

      const stationMarker = new google.maps.Marker({
        position: formatCoordinates(station.slice(1, 3)),
        map: map,
        icon: "../images/icon.png"
      })

      stationMarker.addListener("click", () => {
        stationName.open(map, stationMarker)
      })
    })

    renderSubwayRegions(map, stations.map(station => {
      return station.slice(1, 3)
    }))
  })
}

function renderSubwayRegions(map, stations) {
  $.get("/map_border", data => {
    let voronoi = d3.geom.voronoi().clipExtent(JSON.parse(data))
    voronoi = voronoi(stations)
    voronoi.forEach(cell => {
      let polygon = [];
      cell.forEach(coordinates => {
        polygon.push(formatCoordinates(coordinates))
      })

      const subwayRegion = new google.maps.Polygon({
        paths: polygon,
        strokeColor: "#000000",
        strokeOpacity: 1.0,
        strokeWeight: 1,
        fillColor: "#"+(Math.random()*0xFFFFFF<<0).toString(16),
        fillOpacity: 0.1
      })
      subwayRegion.setMap(map)
    })
  })
}

function formatCoordinates(coordinates) {
  return {
    lat: coordinates[0],
    lng: coordinates[1]
  }
}
