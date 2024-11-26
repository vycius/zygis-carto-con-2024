<script lang="ts">
    import {MapLibre, Control} from 'svelte-maplibre';
    import maplibregl from 'maplibre-gl';
    import * as pmtiles from 'pmtiles';

    let protocol = new pmtiles.Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile);

    const urls = [
        "/zygis/vilnius.pmtiles",
        "https://basemap.startupgov.lt/vector/font/Noto%20Sans%20Regular/0-255.pbf",
        "https://basemap.startupgov.lt/vector/font/Noto%20Sans%20Regular/256-511.pbf",
        "https://basemap.startupgov.lt/vector/font/Noto%20Sans%20Regular/8192-8447.pbf",
        "https://basemap.startupgov.lt/vector/font/Noto%20Sans%20Bold/0-255.pbf",
        "https://basemap.startupgov.lt/vector/font/Noto%20Sans%20Bold/256-511.pbf",
        "https://basemap.startupgov.lt/vector/font/Noto%20Sans%20Italic/0-255.pbf",
        "https://basemap.startupgov.lt/vector/font/Noto%20Sans%20Italic/256-511.pbf",
    ];

    async function fetchData() {
        const fetchPromises = urls.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        });

        try {
            await Promise.all(fetchPromises);
            alert("Data has been fetched for offline usage");
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Failed to fetch data. Check the console for details.");
        }
    }
</script>

<main>
    <MapLibre
            class="map"
            standardControls
            attributionControl={false}
            hash
            style="/zygis/style.json">
        <Control class="flex">
            <button on:click={fetchData}>Fetch Data</button>
        </Control>
    </MapLibre>
</main>

<style>
    :global(.map) {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        z-index: 1;
    }
</style>
