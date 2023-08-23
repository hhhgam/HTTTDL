$(document).ready(function () {
    console.log("Hello World !!!");
  
    // Khởi tạo trước
    var format = "image/png";
    var map;
    var viewMap;
    var minX = 105.288124084473;
    var minY = 20.564474105835;
    var maxX = 106.020065307617;
    var maxY = 21.3852100372314;
    var cenX = (minX + maxX) / 2;
    var cenY = (minY + maxY) / 2;
    var mapLng = cenX;
    var mapLat = cenY;
    var mapDefaultZoom = 10;
    var mapDefaultCenter = ol.proj.fromLonLat([mapLng, mapLat]);
  
    function initialize_map() {
      // Cách thức hiển thị bản đồ
      viewMap = new ol.View({
        center: mapDefaultCenter,
        zoom: mapDefaultZoom,
      });
      // Hiển thị bản đồ
      map = new ol.Map({
        target: "map", // Trỏ đến ID bên html
        layers: [layerBG], // Mảng những layer được hiển thị
        view: viewMap,
      });
      //map.setTarget('map');
    }
  
    // Layer bản đồ nền OSM
    layerBG = new ol.layer.Tile({
      // Bản đồ nền xác định độ zoom và ratio
      source: new ol.source.OSM(),
      opacity: 0.6,
      brightness: 0.2
    });
    // Thay đổi thuộc tính layer : https://openlayersbook.github.io/ch04-interacting-with-raster-data-source/example-01.html
    // Độ trong suốt, độ sáng, độ tương phản
  
    // Layer bản đồ từ Geoserver
    InitLayer = function (urlL, nameL, opa) {
      return new ol.layer.Image({
        // Bản đồ dạng ảnh mức độ zoom và độ phân giải tùy ý
        source: new ol.source.ImageWMS({
          ratio: 1,
          url: urlL, // Link Layer Preview
          params: {
            FORMAT: format, // Sử dụng bản đồ dạng ảnh
            VERSION: "1.1.0",
            STYLES: "",
            LAYERS: nameL,
          },
        }),
        opacity: opa,
      });
    };
    initialize_map();
    // Khởi tạo sau
    // Tạo Overlay - popup
    var overlay = new ol.Overlay({
      element: document.getElementById("overlay"), // Trỏ đến ID bên HTML
      positioning: "top-right", // Định vị hiển thị so với con trỏ
    });
    // Tạo Overlay - Pos
    var marker = new ol.Overlay({
      element: document.getElementById("location"),
      positioning: "bottom-left",
      stopEvent: false,
    });
    map.addOverlay(marker);
  
    // Tạo Vector Layer - Highlight
    var vectorLayer = new ol.layer.Vector({
      //source: vectorSource,
      //style: styleFunction
    });
  
    // Tạo Style Geo
    var styles = {
      MultiPolygon: new ol.style.Style({
        fill: new ol.style.Fill({
          color: "orange",
        }),
        stroke: new ol.style.Stroke({
          color: "yellow",
          width: 2,
        }),
      }),
      MultiLineString: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "red",
          width: 3,
        }),
      }),
    };
    var styleFunction = function (feature) {
      return styles[feature.getGeometry().getType()];
    };
  
    // Tạo Style Point
    var stylePoint = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: "src/point.png",
        scale: 1.5,
      }),
    });
  
    var stylePointS = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: "src/points.png",
      }),
    });
  
    // Các hàm chức năng
    // Chức năng 1: Giới thiệu Hà Nội
    // Hàm Post - Lấy dữ liệu HN4
    function loadInfoHN4() {
      var myPoint = "POINT(" + 0 + " " + 0 + ")";
      // Post - getInfoHN4
      $.ajax({
        type: "POST",
        url: "API.php",
  
        data: { functionname: "getInfoHN4", paPoint: myPoint },
        success: function (result, status, erro) {
          displayObjInfoHN4(result);
        },
        error: function (req, status, error) {
          alert(req + " " + status + " " + error);
        },
      });
    }
    // Hàm hiển thị thông tin
    function displayObjInfoHN4(result) {
      // console.log("result: " + result);
      if (result != "null") {
        var arrObj = JSON.parse(result);
        // Lấy kết quả
        var id;
        var type;
        var name;
        var ctr;
        var area;
        var geo;
        var table = "<table>";
        arrObj.forEach((Obj) => {
          id = Obj.gid_1;
          type = Obj.type_1;
          name = Obj.name_1;
          ctr = Obj.name_0;
          area = Obj.area;
          geo = Obj.geo;
  
          table += "<tr><td>ID: " + id + "</td></tr>";
          table += "<tr><td>Loại: " + type + "</td></tr>";
          table += "<tr><td>Tên: " + name + "</td></tr>";
          table += "<tr><td>Đất nước: " + ctr + "</td></tr>";
          table += "<tr><td>Diện tích: " + area + " m2</td></tr>";
        });
        table += "</table>";
  
        // Lấy đối tượng info để hiển thị bảng
        //console.log("Table: " + table);
        $("#infoHN4").html(table);
      }
    }
    loadInfoHN4();
  
    // Chức năng 2: Tắt bật layer
    // Tạo Các Layer từ geo

    let url = 'http://localhost:8080/geoserver/cite/wms?';
    let nameL1 = 'hanoi4';
    var layerHN4 = InitLayer(url, nameL1, 0.4);
    let nameL2 = 'hanoi6';
    var layerHN6 = InitLayer(url, nameL2, 0.6);
    let nameL3 = 'hanoi8';
    var layerHN8 = InitLayer(url, nameL3, 0.8);
    let nameL4 = 'road_hanoi';
    var layerRHN = InitLayer(url, nameL4, 1.0);
    let nameL5 = 'hospitalhanoi';
    var layerHSHN = InitLayer(url, nameL5, 1.0);

    map.addLayer(layerHN4);
    map.addLayer(layerHN6);
    map.addLayer(layerHN8);
    map.addLayer(layerRHN);
    map.addLayer(layerHSHN);

    $("#HN4").prop('checked', true);
    $("#HN6").prop('checked', false);
    $("#HN8").prop('checked', false);
    $("#RHN").prop('checked', false);
    $("#HSHN").prop('checked', false);

    layerHN4.setVisible(true);
    layerHN6.setVisible(false);
    layerHN8.setVisible(false);
    layerRHN.setVisible(false);
    layerHSHN.setVisible(false);

    // Event - Change to Check box
    $("#HN4").change(function() {
        layerHN4.setVisible(this.checked);
    });
    $("#HN6").change(function() {
        layerHN6.setVisible(this.checked);
    });
    $("#HN8").change(function() {
        layerHN8.setVisible(this.checked);
    });
    $("#RHN").change(function() {
        layerRHN.setVisible(this.checked);
    });
    $("#HSHN").change(function() {
        layerHSHN.setVisible(this.checked);
    });


  
    // Chức năng 3: Lấy thông tin đối tượng
    // Hàm tạo Geo Obj Json
    function createJsonObj(result) {
      var geojsonObject =
        "{" +
        '"type": "FeatureCollection",' +
        '"crs": {' +
        '"type": "name",' +
        '"properties": {' +
        '"name": "EPSG:4326"' +
        "}" +
        "}," +
        '"features": [{' +
        '"type": "Feature",' +
        '"geometry": ' +
        result +
        "}]" +
        "}";
      return geojsonObject;
    }
    // Hàm tạo Vector Source theo Geo Obj Json
    vectorSource = function (geo) {
      //console.log(geo);
      var strObjJson = createJsonObj(geo);
      //console.log(strObjJson);
      var objJson = JSON.parse(strObjJson);
      //console.log(objJson);
      return new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures(objJson, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        }),
      });
    };
    // Sự kiện click map
    map.on("click", function (event) {
      $("#info").html("Loading... please wait...");
  
      // Trích xuất tọa độ không gian
      var coord = event.coordinate;
      // Đổi sang độ (cơ số 10)
      var lonlat = ol.proj.transform(coord, "EPSG:3857", "EPSG:4326");
      // Định dạng HDMS để đọc (tung độ, vĩ độ)
      console.log(lonlat);
      //var hdms = ol.coordinate.toStringHDMS(lonlat);
  
      var lon = lonlat[0];
      var lat = lonlat[1];
      var myPoint = "POINT(" + lon + " " + lat + ")";
      console.log(myPoint);
      $.ajax({
        type: "POST",
        url: "API.php",
  
        data: { functionname: "getInfoHSHN", paPoint: myPoint },
        success: function (result, status, erro) {
          displayObjInfoHSHN(result, coord);
        },
        error: function (req, status, error) {
          alert(req + " " + status + " " + error);
        },
      });
    });
  
    function displayObjInfoHSHN(result, coord) {
      //console.log("coord: " + coord);
      // console.log("result: " + result);
      if (result != "null") {
        var arrObj = JSON.parse(result);
        //console.log(arrObj);
  
        // Lấy kết quả
        var id;
        var name;
        var phone;
        var website;
        var email;
        var url_img;
        var addr_stree;
        var geo;
        var table = "<table>";
        var tablehs = "<table>";
        arrObj.forEach((Obj) => {
          console.log(Obj)
          id = Obj.full_id;
          name = Obj.name;
          phone = Obj.phone;
          website = Obj.website;
          email = Obj.email;
          url_img = Obj.url_img;
          addr_stree = Obj.addr_stree;
          geo = Obj.geo;
  
          table += "<tr><td>Tên: " + name + "</td></tr>";
          tablehs += "<tr><h4>" + name + "</h4></tr>";
          tablehs += "<tr><td>Số điện thoại: " + phone + "</td></tr>";
          tablehs += "<tr><td>Địa chỉ: " + addr_stree + "</td></tr>";
          tablehs += "<tr><td>Website: " + website + "</td></tr>";
          tablehs += "<tr><td>Email: " + email + "</td></tr>";
        });
        table += "</table>";
        tablehs += "</table>";
  
        // Lấy img -> src = url_img
        if (url_img != null) {
          $("#imgHSHN").attr("src", url_img);
        }
  
        // Lấy đối tượng info để hiển thị bảng
        $("#info").html(table);
  
        // Lấy đối tượng infohshn để hiển thị bảng
        $("#infoHSHN").html(tablehs);
        
        // Set vị trí và thêm overlay vào map để hiển thị
        // overlay.setPosition(coord);
        // map.addOverlay(overlay);
        // Highlight geo
        Point(vectorSource(geo));
      }
    }
  
    // Point
    function Point(vectorSource) {
      vectorLayer.setSource(vectorSource);
      vectorLayer.setStyle(stylePoint);
    }
  
    // PointS
    function PointS(vectorSource) {
      var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: stylePointS,
      });
      map.addLayer(vectorLayer);
    }
  
    map.addLayer(vectorLayer);
  
    // Chức năng số 4
    // Tìm các bậnh viện gần nhất
    // Định vị vị trí
    var geolocation = new ol.Geolocation({
      tracking: true,
      trackingOptions: {
        enableHighAccuracy: true,
      },
    });
  
    var p;
    var pos = mapDefaultCenter;
    geolocation.on("change:position", function (event) {
      // p = [105.82456, 21.00605];
      p = geolocation.getPosition();
      console.log(p);
      // Đổi sang Lonlat
      pos = ol.proj.fromLonLat([p[0], p[1]]);
    });
  
    $("#btnSOS").click(function () {
      if (pos != mapDefaultCenter) {
        viewMap.setCenter(pos);
        viewMap.setZoom(15);
        marker.setPosition(pos);
  
        // Lấy vị tri Point
        var myPoint = "POINT(" + p[0] + " " + p[1] + ")";
        console.log(myPoint);
  
        //
        // Post - getInfoUni
        $.ajax({
          type: "POST",
          url: "API.php",
  
          data: { functionname: "getInHSHN", paPoint: myPoint },
          success: function (result, status, erro) {
            displayObjInHSHN(result);
          },
          error: function (req, status, error) {
            alert(req + " " + status + " " + error);
          },
        });
      }
    });
    // Hàm hiển thị thông tin
    function displayObjInHSHN(result, coord) {
      //console.log("coord: " + coord);
      // console.log("result: " + result);
      if (result != "null") {
        var arrObj = JSON.parse(result);
        // Lấy kết quả
        var geos = [];
        var count = 0;
        arrObj.forEach((Obj) => {
          var geo = Obj.geo;
          geos[count++] = geo;
        });
  
        //Highlinght các bệnh viện học gần nhất
        for (let i = 0; i < geos.length; i++) {
          // Highlight geo
          PointS(vectorSource(geos[i]));
        }
      }
    }
  
    var textOverlay = null;
    // lấy vị trí của bv  mà mình bấm vào
    $(document).ready(function () {
      $("body").on("click", ".locationBtn", function () {
        var lat = $(this).data("lat");
        var lon = $(this).data("lon");
        update_map(lat, lon);
      });
    });
  
    function update_map(lat, lon) {
      // Chuyển đổi tọa độ từ hệ quy chiếu lon/lat sang hệ quy chiếu "EPSG:3857"
      var newCenter = ol.proj.fromLonLat([lon, lat]);
  
      // Cập nhật trung tâm của bản đồ
      viewMap.setCenter(newCenter);
  
      // Cập nhật zoom level
      viewMap.setZoom(18);
  
      // Xóa overlay hiện tại (nếu có)
      if (textOverlay) {
        map.removeOverlay(textOverlay);
      }
  
      // Tạo một overlay mới để chứa văn bản
      textOverlay = new ol.Overlay({
        position: newCenter,
        positioning: "center-center",
        element: document.createElement("i"),
        className: "location-text fas fa-map-pin",
      });
  
      // Thêm overlay vào bản đồ
      map.addOverlay(textOverlay);
    }
  });
  
  