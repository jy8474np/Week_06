var url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let TimeRanges = document.querySelector('#iss-date')

var issMarker
var update = 10000

var icon = L.icon ({
    iconUrl: 'iss.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
})


let map = L.map('iss-map').setView([0, 0], 1)
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 7,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoiank4NDc0bnAiLCJhIjoiY2s2dmk5bm5qMDI1MjNscWttMTNoNTN4byJ9.9oU98DmdiUQGpy1-r-uMXA'
}).addTo(map)

iss()
setInterval(iss, update)

function iss() {
fetch(url)
    .then( res => res.json() )
    .then( issData => {
        console.log(issData)
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long

        if (!issMarker) {
            issMarker = L.marker([lat, long], {icon: icon}).addTo(map)
        } else {
            issMarker.setLatLng([lat, long])
        }

        let date = Date()
        TimeRanges.innerHTML = date
    })
    .catch( err => {
        console.log(err)
    })

}