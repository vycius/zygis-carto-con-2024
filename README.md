# Žygis

An offline representation of the 100 km trail around Vilnius, originally created for the CartoCon 2024 presentation, **"PMTiles: A New GIS Data Format"**.

## Getting Started

This project demonstrates how to prepare geospatial data for an offline GIS application using the 100 km Vilnius trail as an example. Below are the steps to process the data into formats suitable for visualization.


## Data Preparation

### 1. Convert Trail Data to GeoJSON

To convert the 100 km trail data from GPX to GeoJSON:

1. Install [GDAL](https://gdal.org/en/latest/download.html).
2. Run the following command:

```shell
ogr2ogr -xyRes 0.000001 -f GeoJSON vilnius.geojson https://vilnius100km.lt/downloads/Vilnius100km.gpx tracks
```

This will output the trail as a GeoJSON file (`vilnius.geojson`).


### 2. Extract Basemap for the Trail

To isolate the basemap relevant to the trail using PMTiles:

1. Install the [pmtiles CLI](https://docs.protomaps.com/pmtiles/cli).
2. Run the following command:

```shell
pmtiles extract https://cdn.startupgov.lt/tiles/vector/pmtiles/lithuania.pmtiles vilnius.pmtiles --bbox=25.171013,54.622385,25.392003,54.80233
```

This will create a compact PMTiles file (`vilnius.pmtiles`) containing only the required basemap data within the specified bounding box.
