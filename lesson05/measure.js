function showLblBox(str) {
    var infobox = document.getElementById('lblInfoBox');
    infobox.style.left = getMouseXY().X + 10 + "px";
    infobox.style.top = getMouseXY().Y + 20 + "px";
    infobox.textContent = "长度为：" + str;
    infobox.style.display = "block"
}

function hideLblBox() {
    var infobox = document.getElementById('lblInfoBox');
    infobox.style.display = "none"
}

function moveToLine(arr) {
    var scene = viewer.scene;
    scene.skyBox.show = false;
    scene.skyAtmosphere.show = false;
    scene.globe.depthTestAgainstTerrain = false;
    var handler;
    var cartesian;
    var ellipsoid = scene.globe.ellipsoid;
    var WebMercatorProjection = new Cesium.WebMercatorProjection();
    var entity = viewer.entities.add({ label: { show: false } });
    var entities = viewer.entities;
    var pickedEntities = new Cesium.EntityCollection();
    var pickColor = Cesium.Color.YELLOW.withAlpha(0.5);

    function makeProperty(entity, color) {
        var colorProperty = new Cesium.CallbackProperty(function(time, result) {
            if (pickedEntities.contains(entity)) { return pickColor.clone(result) }
            return color.clone(result)
        }, false);
        try {
            entity.polyline.material = new Cesium.ColorMaterialProperty(colorProperty)
        } catch (e) {}
    }
    if (arr.length >= 4) {
        for (i = 0; i < arr.length - 3; i += 2) {
            try {
                var line = entities.add({ name: 'pl', polyline: { positions: new Cesium.Cartesian3.fromDegreesArray([arr[i], arr[i + 1], arr[i + 2], arr[i + 3]]), width: 3.0 } });
                makeProperty(line, Cesium.Color.WHITE.withAlpha(0.5))
            } catch (e) {}
        }
    }
    var Len = 0;
    var cg, cs, x1, y1, x2, y2;
    for (i = 0; i < arr.length - 1; i += 2) {
        if (i > 1) {
            cg = ellipsoid.cartesianToCartographic(Cesium.Cartesian3.fromDegrees(arr[i - 2], arr[i - 1]));
            cs = WebMercatorProjection.project(cg);
            x1 = cs.x;
            y1 = cs.y;
            cg = ellipsoid.cartesianToCartographic(Cesium.Cartesian3.fromDegrees(arr[i], arr[i + 1]));
            cs = WebMercatorProjection.project(cg);
            x2 = cs.x;
            y2 = cs.y;
            Len = Len + Math.round(Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)), 0)
        }
        entities.add({ position: Cesium.Cartesian3.fromDegrees(arr[i], arr[i + 1]), point: { show: true, color: Cesium.Color.SKYBLUE, pixelSize: 5, outlineColor: Cesium.Color.RED, outlineWidth: 3 }, label: { text: Len.toString() + " 米", font: '20px sans-serif', fillColor: Cesium.Color.WHITE, horizontalOrigin: Cesium.HorizontalOrigin.LEFT, pixelOffset: new Cesium.Cartesian2(0.0, -10.0), pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5) } })
    }
    handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement) {
        var pickedObjects = scene.drillPick(movement.endPosition);
        if (Cesium.defined(pickedObjects)) {
            pickedEntities.removeAll();
            hideLblBox();
            for (var i = 0; i < pickedObjects.length; ++i) {
                var entity = pickedObjects[i].id;
                try {
                    pickedEntities.add(entity);
                    if (entity.name == "pl") {
                        cg = ellipsoid.cartesianToCartographic(entity.polyline.positions.getValue()[0]);
                        cs = WebMercatorProjection.project(cg);
                        x1 = cs.x;
                        y1 = cs.y;
                        cg = ellipsoid.cartesianToCartographic(entity.polyline.positions.getValue()[1]);
                        cs = WebMercatorProjection.project(cg);
                        x2 = cs.x;
                        y2 = cs.y;
                        var Len1 = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                        Len1 = Math.round(Len1, 0);
                        showLblBox(Len1 + " 米")
                    }
                } catch (e) { hideLblBox() }
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
}

function measureLineDisys() {
    var arr = [];
    var isrigtclick = false;
    var isleftclick = false;
    var scene = viewer.scene;
    scene.skyBox.show = false;
    scene.skyAtmosphere.show = false;
    scene.globe.depthTestAgainstTerrain = false;
    var handler;
    var cartesian, longitudeString, latitudeString;
    var ellipsoid = scene.globe.ellipsoid;
    var entities;
    viewer.scene.globe.depthTestAgainstTerrain = true;
    var entity = viewer.entities.add({ label: { show: false } });
    var pickedEntities = new Cesium.EntityCollection();
    handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement) {
        entities = viewer.entities;
        entities.remove(entities.getById(5));
        cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
        if (movement.endPosition && cartesian) {
            var cartographic = ellipsoid.cartesianToCartographic(cartesian);
            longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
            latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
            if (isleftclick) {
                entity.position = cartesian;
                entity.label.show = true;
                entity.label.font = '20px sans-serif';
                entity.label.fillColor = Cesium.Color.YELLOW;
                entity.label.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
                entity.label.pixelOffset = new Cesium.Cartesian2(0.0, -10.0);
                entity.label.pixelOffsetScaleByDistance = new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5);
                entity.label.text = ""
            }
            try {
                if (arr.length >= 2) {
                    entities.add({
                        id: 5,
                        name: 'pl',
                        polyline: {
                            positions: new Cesium.Cartesian3.fromDegreesArray([arr[arr.length - 2], arr[arr.length - 1], longitudeString, latitudeString]),
                            width: 3.0
                        }
                    })
                }
            } catch (e) {}
            handler.setInputAction(function(rigtclick) {
                console.log("RIGHT_CLICK");
                var n = arr.length;
                arr[n] = longitudeString;
                arr[n + 1] = latitudeString;
                if (!isrigtclick) { moveToLine(arr) }
                arr = [];
                isleftclick = false;
                isrigtclick = true;
                entity.label.show = false;
                handler = handler && handler.destroy()
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            handler.setInputAction(function(leftclick) {
                console.log("RIGHT_CLICK");
                isrigtclick = false;
                isleftclick = true;
                var n = arr.length;
                arr[n] = longitudeString;
                arr[n + 1] = latitudeString;
                moveToLine(arr)
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
}