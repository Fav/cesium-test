var viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate : true
});
var scene = viewer.scene;

var tileset= new Cesium.Cesium3DTileset({
    // url: 'data10/tileset.json'
    // url: 'PointCloudWithPerPointProperties/tileset.json'
    url: 'outpt2/tileset.json'
});
viewer.scene.primitives.add(tileset);

let style = { 
    "pointSize":5.0,
    color : "color('#ff0000')"
};
tileset.style = new Cesium.Cesium3DTileStyle(style);

viewer.zoomTo(tileset);

function mapsiji(){
    //let m1 = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(1));
    let beforecenter = tileset.boundingSphere.center.clone();
    let posFrom = getLongLat(beforecenter);
    console.log(posFrom);
    let posTo = getTarLongLat(posFrom);
    let m1 = getMatrix(posFrom.long,posFrom.lat,posTo.long,posTo.lat);
    //tileset.modelMatrix = Cesium.Matrix4.multiplyByMatrix3(tileset.modelMatrix,m1,new Cesium.Matrix4());
    tileset.modelMatrix = Cesium.Matrix4.multiply(tileset.modelMatrix,m1,new Cesium.Matrix4());

    //tileset.modelMatrix = getMatrix2(posFrom.long,posFrom.lat,posTo.long,posTo.lat);
    // viewer.zoomTo(tileset);
}

function getTarLongLat(posFrom){
    //调用思极地图sdk
    
    return{
        'long':posFrom.long+0.01,
        'lat':posFrom.lat+0.02
    }
}
function getLongLat(norCurCenterPos){
    //转为经纬度
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartographicPosition = ellipsoid.cartesianToCartographic(norCurCenterPos);
    var curLong = Cesium.Math.toDegrees(cartographicPosition.longitude);//.toFixed(2);
    var curLat = Cesium.Math.toDegrees(cartographicPosition.latitude);//.toFixed(2);
    return {
        'long':curLong,
        'lat':curLat
    }
}

function getMatrix1(longitudefrom,latitudefrom,longitudeto,latitudeto){
    let rz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(longitudeto-longitudefrom));
    let difLat = latitudeto -latitudefrom;
    let rxValue = Cesium.Math.sinh(latitudefrom) * difLat;
    let ryValue = Cesium.Math.cosh(latitudefrom) * difLat;
    let rx = Cesium.Matrix3.fromRotationX(rxValue);
    let ry = Cesium.Matrix3.fromRotationY(ryValue);
    let matRotate3 = Cesium.Matrix3.multiply(ry,rx,new Cesium.Matrix3());
    matRotate3 = Cesium.Matrix3.multiply(matRotate3,rz,new Cesium.Matrix4());
    return matRotate3;
}

//获取3dtiles移动的矩阵
function getMatrix(longitudefrom,latitudefrom,longitudeto,latitudeto){
    let posFrom = Cesium.Cartesian3.fromDegrees(longitudefrom, latitudefrom);
    let posTo = Cesium.Cartesian3.fromDegrees(longitudeto, latitudeto);

    let norEleFromPos = Cesium.Cartesian3.normalize(posFrom, new Cesium.Cartesian3());
    let norEleCurPos = Cesium.Cartesian3.normalize(posTo, new Cesium.Cartesian3());
    let rotateAxis = Cesium.Cartesian3.cross(norEleFromPos, norEleCurPos, new Cesium.Cartesian3());
    let dotValue = Cesium.Cartesian3.dot(norEleFromPos, norEleCurPos);
    let angle = Cesium.Math.acosClamped(dotValue);
    let rotateQuaternion = Cesium.Quaternion.fromAxisAngle(rotateAxis, angle);
    let matRotate3 = Cesium.Matrix3.fromQuaternion(rotateQuaternion, new Cesium.Matrix3())
    let matRotate4 = Cesium.Matrix4.fromRotationTranslation(matRotate3, Cesium.Cartesian3.ZERO, new Cesium.Matrix4())
    return matRotate4;
    //let eleRotateMatrix = Cesium.Matrix4.multiply(matRotate4, leftDownMat4, new Cesium.Matrix4());
    //return eleRotateMatrix;
}

function getMatrix2(longitudefrom,latitudefrom,longitudeto,latitudeto){
    //let cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
    let surface = Cesium.Cartesian3.fromRadians(longitudefrom,latitudefrom, 0.0);
    let offset = Cesium.Cartesian3.fromRadians(longitudeto,latitudeto, 0.0);
    let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    //tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    return Cesium.Matrix4.fromTranslation(translation);
}