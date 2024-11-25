<script lang="ts">
    import {MapLibre, Control} from 'svelte-maplibre';
    import maplibregl from 'maplibre-gl';
    import * as pmtiles from 'pmtiles';

    let protocol = new pmtiles.Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile);

    const url = "/zygis/vilnius.pmtiles";

    async function fetchData() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            alert("Data fetched successfully!");
            console.log("Data retrieved:", response.ok);
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
