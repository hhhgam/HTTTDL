<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Hà Nội</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v7.1.0/ol.css" type="text/css" />
  <script src="https://cdn.jsdelivr.net/npm/ol@v7.1.0/dist/ol.js" type="text/javascript"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <link rel="stylesheet" href="https://cdn.usebootstrap.com/bootstrap/4.0.0/css/bootstrap.min.css" type="text/css" />
  <script src="https://cdn.usebootstrap.com/bootstrap/4.0.0/js/bootstrap.min.js" type="text/javascript"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" />
  <script src="script.js" type="text/javascript"></script>
  <link rel="stylesheet" href="style.css" type="text/css" />


</head>
<body>
  <div class="header container-fluid flex">
    <div class="col-md-1">
      <img src="src/logo.png" class="logo" height="48">
    </div>
    <div class="col-md-6 title-web">
      <h2>Bản Đồ Bệnh Viện Thành Phố Hà Nội</h2>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">

      <div class="side-bar">
        <div>

        </div>
      </div>
      <div class="content">
        <div class="map-area col-md-12">

          <div class="row">

            <div id="map"></div>
          </div>


          <!-- Btn  -->
          <button id="btnSOS" class="btnSOS">
          <i class="fas fa-location-arrow" style="color: #4b89ec;"></i>
          </button>

          <!-- END Info Hà Nội  -->
          <div class="end">
           
          </div>
          <!-- Info HN -->
          <div class="info-area-modal">
            <button class="btn btn-info" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" id="BtnHN4">
              TP Hà Nội
            </button>
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                <div class="header-info">
                  <h1>Giới thiệu thành phố Hà Nội</h1>
                </div>
                <div class="body-info">
                  <img src="src/demoHN.jpg" class="img-demo-hn">

                  <div id="infoHN4"></div>

                </div>
              </div>
            </div>
          </div>

          <!-- Infor  Bệnh viện-->

          <div class="info-area-modal-bvhn">
            <div class="collapse" id="infoBVHN">
              <img src="" id="imgHSHN" class="img-demo-hn">
              <div class="card card-body">
                <div class="body-info">

                  <div id="infoHSHN">

                  </div>

                </div>
              </div>
            </div>
          </div>
          <!-- END Info unviversity -->
          <div class="mode-area">
            <button class="btn btn-primary group-layer" type="button" data-toggle="collapse" data-target="#1" aria-expanded="false" aria-controls="1">
              Group Layer
            </button>
            <div class="collapse" id="1">

              <input type="checkbox" class="col-md-2" id="HN4" checked="true" name="HN4"><label class="col-md-10">Tỉnh</label>
              <input type="checkbox" class="col-md-2" id="HN6" name="HN6"><label class="col-md-10">Quận Huyện/Thị xã </label>
              <input type="checkbox" class="col-md-2" id="HN8" name="HN8"><label class="col-md-10">Xã/Phường/Thị trấn</label>
              <input type="checkbox" class="col-md-2" id="RHN" name="RHN"><label class="col-md-10">Hệ thống đường xá</label>
              <input type="checkbox" class="col-md-2" id="HSHN" name="HSHN"><label class="col-md-10">Hệ thống bệnh viện</label>
            </div>
          </div>
          <div class="info-area">
            <div style="display: flex">
              <div id="info"></div>
              <button class="btn" 
              style="	background-color: #00000000; border: none;" 
              type="button" data-toggle="collapse" data-target="#infoBVHN" aria-expanded="false" aria-controls="infoBVHN">
            <img src="src/info.png" class="img-btn-info-bv">
          </button>
            </div>
          
        </div>
        </div>

      </div>
    </div>
  </div>
  </div>

  <div id="overlay"></div>
  <div id="location"><i class="fas fa-info-circle" style="color: #5c98ff;"></i></div>
  <div class="footer container-fluid flex">
        <div>
            <p> Hệ thống bản đồ Việt Nam</p>
        </div>
        <div>
            <p> Liên hệ: 123@gmail.com</p>
        </div>
        <div>
            <p> Liên hệ: 123@gmail.com</p>
        </div>
        <div>
            <p> Số điện thoại: 090-988-8888</p>
        </div>
    </div>
  <?php
  include 'API.php';
  ?>
</body>

</html>
