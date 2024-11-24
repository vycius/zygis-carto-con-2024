<script lang="ts">
    import {MapLibre} from 'svelte-maplibre';
    import maplibregl from 'maplibre-gl';
    import * as pmtiles from 'pmtiles';

    let protocol = new pmtiles.Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile);
</script>

<main>
    <MapLibre
            class="map"
            standardControls
            attributionControl={false}
            hash
            style="/zygis/style.json">
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
