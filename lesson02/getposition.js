// Get your own Bing Maps API key at https://www.bingmapsportal.com, prior to publishing your Cesium application:
// Cesium.BingMapsApi.defaultKey = 'put your API key here';

// Construct the default list of terrain sources.
var terrainModels = Cesium.createDefaultTerrainProviderViewModels();

// Construct the viewer with just what we need for this base application
var viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false,
    animation: false,
    vrButton: true,
    sceneModePicker: false,
    infoBox: true,
    // scene3DOnly:true,
    // terrainProviderViewModels: terrainModels,
    // selectedTerrainProviderViewModel: terrainModels[1]  // Select STK high-res terrain
});

// No depth testing against the terrain to avoid z-fighting
viewer.scene.globe.depthTestAgainstTerrain = false;

// Bounding sphere
//var boundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(111.5652101, 38.70350851, 1297.500143), 143.6271004);
var boundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(111.5652101, 38.70350851, 100.500143), 143.6271004);

// Override behavior of home button
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(commandInfo) {
    // Fly to custom position
    viewer.camera.flyToBoundingSphere(boundingSphere);

    // Tell the home button not to do anything
    commandInfo.cancel = true;
});

// Set custom initial position
viewer.camera.flyToBoundingSphere(boundingSphere, { duration: 0 });

// Add tileset. Do not forget to reduce the default screen space error to 2
// var origin = Cesium.Cartesian3.fromDegrees(-95.0, 40.0, 200000.0);
// var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(origin);
var x = 360.0;
var y = -920.0;
var z = -820.0;
var m = Cesium.Matrix4.fromArray([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    x, y, z, 1.0
]);

var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: 'Scene/testm3DTiles.json',
    maximumScreenSpaceError: 2,
    maximumNumberOfLoadedTiles: 1000,
    modelMatrix: m
}));

var boundingSphere = null; // = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(111.5652101, 38.70350851, 100.500143), 143.6271004);

function zoomToTileset() {
    boundingSphere = tileset.boundingSphere;
    viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0, -2.0, 0));
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
}

tileset.readyPromise.then(zoomToTileset);
// scene.morphComplete.addEventListener(zoomToTileset);
var step = 10;

function changeStep(stepin) {
    step = stepin;
}

function change(type) {
    switch (type) {
        case 0:
            x += step;
            break;
        case 1:
            x -= step;
            break;
        case 2:
            y += step;
            break;
        case 3:
            y -= step;
            break;
        case 4:
            z += step;
            break;
        case 5:
            z -= step;
            break;
    }
    m = Cesium.Matrix4.fromArray([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        x, y, z, 1.0
    ]);
    document.getElementById("result").innerText = "x:" + x + " y:" + y + " z:" + z;

    tileset._modelMatrix = m;
    tileset.update();
}

function changevisible() {
    tileset.show = !tileset.show;
}