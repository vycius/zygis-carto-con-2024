# Žygis

An offline map of the 100 km trail around Vilnius, developed for the CartoCon 2024 presentation,
**"PMTiles: A New GIS Data Format"**. This project demonstrates the power of PMTiles for efficient geospatial data
handling.

📖 [Explore the presentation](https://github.com/vycius/zygis-carto-con-2024/blob/main/presentation/24-11-29-PMTiles-naujas-GIS-duomen%C5%B3-formatas.pdf)

## Getting Started

This project demonstrates how to prepare geospatial data for an offline GIS application using the 100 km Vilnius trail
as an example. Below are the steps to process the data into formats suitable for visualization.

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

We need to extract a map of Vilnius. Fantastically, we
have [National basemap of Lithuania](https://github.com/govlt/national-basemap) which supports PMTiles and is based on
official data sources.
To extract the basemap relevant to the trail using PMTiles:

1. Install the [pmtiles CLI](https://docs.protomaps.com/pmtiles/cli).
2. Run the following command:

```shell
pmtiles extract https://cdn.startupgov.lt/tiles/vector/pmtiles/lithuania.pmtiles vilnius.pmtiles --bbox=25.17,54.62,25.4,54.81
```

**Output Example:**

```
fetching 4 dirs, 4 chunks, 2 requests
Region tiles 268, result tile entries 268
fetching 268 tiles, 37 chunks, 26 requests
fetching chunks 100% |███████████| (6.5/6.5 MB, 10 MB/s)        
Completed in 1.051847458s with 4 download threads (254.78978654225065 tiles/s).
Extract required 31 total requests.
Extract transferred 6.8 MB (overfetch 0.05) for an archive size of 6.5 MB
```

The output PMTiles file (`vilnius.pmtiles`) contains all necessary basemap data (e.g., house numbers) and is compact (~7
MB).

## Demonstration

### 1. **Inspect PMTiles in Browser**

Use the [PMTiles Viewer](https://pmtiles.io/?url=https%3A%2F%2Fzygis.vycius.lt%2Fzygis%2Fvilnius.pmtiles) to explore:

- Metadata, such as zoom levels and compression types.
- Individual tiles.

### 2. **Analyze HTTP Range Requests**

Visit the [Žygis Demo](https://zygis.vycius.lt/):

1. Open Developer Tools → Network tab in your browser.
2. Inspect the **initial request**, which retrieves ~16 KB. This includes:
    - **Header (127 bytes):**  
      Contains offsets, min/max zoom, initial position, and compression details.
    - **Directory (up to 16,257 bytes):**  
      Maps specific tiles to their byte locations.

3. Observe subsequent `Range` requests fetching portions of the PMTiles file:
    - Example `Range` header:
      ```
      Range: 0-16383
      ```
    - Example response `content-range` header:
      ```
      content-range: bytes 375954-407043/6506026
      ```

### 3. **Offline Functionality**

1. Click **"Fetch offline data"** on the demo page.
2. Disable the internet.
3. Reload and browse the map.
    - All map tiles will continue to load from the cached PMTiles.

## **Explore More with PMTiles**

### **Convert Data to PMTiles**

Experiment with converting `public/zygis/takas.geojson` into PMTiles using:

- [PlaneTiler](https://github.com/onthegomap/planetiler): Refer to its documentation or
  the [National Basemap of Lithuania](https://github.com/govlt/national-basemap).
- [Tippecanoe](https://github.com/felt/tippecanoe).
- [GDAL PMTiles Driver](https://gdal.org/en/stable/drivers/vector/pmtiles.html).

Refer to the [PMTiles creation guide](https://docs.protomaps.com/pmtiles/create) for detailed instructions.

### **Use PMTiles in Maplibre**

1. Update the Maplibre style file (`public/zygis/style.json`) to include the PMTiles archive.
2. Ensure PMTiles protocol handling is added to Maplibre (example in `src/App.svelte`).

### **Conclusion**

The Vilnius 100 km trail is now fully offline-enabled using PMTiles. Explore metadata, optimize map styles, and enjoy
offline mapping!
