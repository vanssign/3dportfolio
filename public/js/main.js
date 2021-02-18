let scene, camera, renderer;

let keyboard = [];

const WIRE_FRAME = true;
const ANTI_ALIAS = true;
const SHADOW_MAP = true;

var cameraCarGroup;

//objects,planes
var gPlane;

//objects,planes properties

//CAR CONFIGS
var carPickupSpeed = 0.01;
var carBrakeSpeed = -0.01;
var carSpeed = 0;
var carMaxSpeed = 1.0;
var carMaxReverseSpeed = -0.4;
var carTurningAngle = 0.008;

var groundFrictionSpeed = -0.008;

//configs
let configs = {
  camera: {
    fov: 75,
    aspectRatio: window.innerWidth / window.innerHeight,
    nearClip: 0.1,
    farClip: 1000,
  },
};

// Models index
var models = {
  car: {
    obj: "../models/Chevrolet_Camaro_SS_Low.obj",
    mtl: "../models/Chevrolet_Camaro_SS_Low.mtl",
    mesh: null,
  },
  tree: {
    obj: "../models/low_poly_tree/Lowpoly_tree_sample.obj",
    mtl: "../models/low_poly_tree/Lowpoly_tree_sample.mtl",
    mesh: null,
  },
};

//fonts index
var fonts = {
  optimerRegular: {
    json: "../fonts/optimer_regular.typeface.json",
    mesh: null,
  },
};

// Meshes index
var meshes = [];

//loading
let loadingScreen = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(
    configs.camera.fov,
    configs.camera.aspectRatio,
    configs.camera.nearClip,
    configs.camera.farClip
  ),
  box: new THREE.Mesh(
    new THREE.BoxGeometry(10, 0.5, 0, 5),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: WIRE_FRAME })
  ),
};
let loadingManager = null;
let RESOURCES_LOADED = false;

function init() {
  clock = new THREE.Clock();
  scene = new THREE.Scene();
  //arguments
  //FOV,aspectRatio,nearClippingPlane,farClippingPlane
  camera = new THREE.PerspectiveCamera(
    configs.camera.fov,
    configs.camera.aspectRatio,
    configs.camera.nearClip,
    configs.camera.farClip
  );

  loadingScreen.box.position.set(0, 0, 5);
  loadingScreen.camera.lookAt(loadingScreen.box.position);
  loadingScreen.scene.add(loadingScreen.box);

  loadingManager = new THREE.LoadingManager();

  loadingManager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
  };

  loadingManager.onLoad = function () {
    RESOURCES_LOADED = true;
    onResourcesLoad();
  };
  //choosing default renderer
  renderer = new THREE.WebGLRenderer({ antialias: ANTI_ALIAS });

  //kinda bg color
  renderer.setClearColor("#fed8b1");
  const aLight = new THREE.AmbientLight(0xffffff);
  scene.add(aLight);
  const dLight = new THREE.DirectionalLight(0xffffff, 0.5); // soft white light
  dLight.position.set(-1, 20, 0);
  scene.add(dLight);

  cameraCarGroup = new THREE.Group();
  cameraCarGroup.add(camera);
  //ground plane
  var gPlaneGeometry = new THREE.PlaneGeometry(200, 500, 400, 100);
  var gPlaneMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    wireframe: WIRE_FRAME,
  });
  gPlane = new THREE.Mesh(gPlaneGeometry, gPlaneMaterial);
  gPlane.rotation.set(Math.PI / 2, 0, 0);
  gPlane.receiveShadow = true;

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = SHADOW_MAP;
  document.body.appendChild(renderer.domElement);

  for (var _key in models) {
    (function (key) {
      var mtlLoader = new THREE.MTLLoader(loadingManager);
      mtlLoader.load(models[key].mtl, function (materials) {
        materials.preload();

        var objLoader = new THREE.OBJLoader(loadingManager);

        objLoader.setMaterials(materials);
        objLoader.load(models[key].obj, function (mesh) {
          mesh.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
              if ("castShadow" in models[key])
                node.castShadow = models[key].castShadow;
              else node.castShadow = true;

              if ("receiveShadow" in models[key])
                node.receiveShadow = models[key].receiveShadow;
              else node.receiveShadow = true;
            }
          });
          models[key].mesh = mesh;
        });
      });
    })(_key);
  }

  //font loader
  for (var _key in fonts) {
    (function (key) {
      const fontLoader = new THREE.FontLoader(loadingManager);
      fontLoader.load(fonts[key].json, function (font) {
        fonts[key].mesh = font;
      });
    })(_key);
  }
  camera.position.set(0, 1.5, 5);
}
var dxR, dyR, dzR;
var dxP, dyP, dzP;
let drivingStatus = false;
function onResourcesLoad() {
  // Clone models into meshes.
  meshes["car"] = models.car.mesh.clone();
  meshes["tree0"] = models.tree.mesh.clone();
  meshes["tree1"] = models.tree.mesh.clone();
  meshes["tree2"] = models.tree.mesh.clone();

  meshes["car"].scale.set(0.5, 0.5, 0.5);
  meshes["car"].position.set(0, 1, 0);
  cameraCarGroup.add(meshes["car"]);
  dxR = cameraCarGroup.rotation.x;
  dyR = cameraCarGroup.rotation.y;
  dzR = cameraCarGroup.rotation.z;
  dxP = cameraCarGroup.position.x;
  dyP = cameraCarGroup.position.y;
  dzP = cameraCarGroup.position.z;
  scene.add(cameraCarGroup);

  meshes["tree0"].position.set(4, 1, -30);
  meshes["tree0"].scale.set(0.8, 0.8, 0.8);
  scene.add(meshes["tree0"]);

  meshes["tree1"].position.set(-7, 1, -50);
  meshes["tree1"].scale.set(0.3, 0.3, 0.3);
  scene.add(meshes["tree1"]);

  meshes["tree2"].position.set(-4, 1, -500);
  meshes["tree2"].scale.set(0.2, 0.2, 0.2);
  meshes["tree2"].rotation.set(0, Math.PI / 3, 0);
  scene.add(meshes["tree2"]);

  //construct txtMeshes
  const txtgeometry = new THREE.TextGeometry("VANSSIGN", {
    font: fonts.optimerRegular.mesh,
    size: 0.5,
    height: 0.5,
    curveSegments: 12,
  });
  var txt_mat = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa,
    wireframe: false,
  });
  meshes["nameTxt"] = new THREE.Mesh(txtgeometry, txt_mat);
  meshes["nameTxt"].position.set(3, 0.25, -3);
  meshes["nameTxt"].rotation.set(0, 0, 0);
  meshes["nameTxt"].castShadow = true;
  scene.add(meshes["nameTxt"]);
}

function animate() {
  if (RESOURCES_LOADED == false) {
    requestAnimationFrame(animate);
    renderer.render(loadingScreen.scene, loadingScreen.camera);
    return;
  }
  requestAnimationFrame(animate);

  if (!drivingStatus) {
    if (meshes["car"]) meshes["car"].rotation.y -= 0.005;
    // Keyboard turn inputs
    if (keyboard[37]) {
      // left arrow key
      meshes["car"].rotation.y += 0.1;
    }
    if (keyboard[39]) {
      // right arrow key
      meshes["car"].rotation.y -= 0.1;
    }
    if (keyboard[38]) {
      // up arrow key
      if (meshes["car"].rotation.x < dxR + Math.PI / 2)
        meshes["car"].rotation.x += 0.1;
    }
    if (keyboard[40]) {
      // down arrow key
      if (meshes["car"].rotation.x > dxR) meshes["car"].rotation.x -= 0.1;
    }
  }

  if (keyboard[87] || keyboard[83]) {
    if (!drivingStatus) {
      drivingStatus = true;
      meshes["car"].rotation.x = dxR;
      meshes["car"].rotation.y = dyR + Math.PI;
      scene.add(gPlane);
    }
    if (keyboard[87]) {
      //W key
      if (carSpeed < carMaxSpeed) carSpeed = carSpeed + carPickupSpeed;
    }
    if (keyboard[83]) {
      //S key
      if (carSpeed > carMaxReverseSpeed) carSpeed = carSpeed + carBrakeSpeed;
    }
    if (keyboard[68]) {
      //D key
      cameraCarGroup.rotation.y -= carTurningAngle;
    }
    if (keyboard[65]) {
      //A key
      cameraCarGroup.rotation.y += carTurningAngle;
    }
  }
  if (carSpeed > 0) carSpeed = carSpeed + groundFrictionSpeed;
  if (carSpeed < 0) carSpeed = carSpeed - groundFrictionSpeed;
  cameraCarGroup.position.z -= carSpeed * Math.cos(cameraCarGroup.rotation.y);
  cameraCarGroup.position.x -= carSpeed * Math.sin(cameraCarGroup.rotation.y);

  if (keyboard[82]) {
    //R key to reset
    if (drivingStatus) {
      carSpeed = 0;
      drivingStatus = !drivingStatus;
      scene.remove(gPlane);
      cameraCarGroup.position.set(dxP, dyP, dzP);
    }
  }
  renderer.render(scene, camera);
}

//responsiveness
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function keydown(e) {
  keyboard[e.keyCode] = true;
}

function keyup(e) {
  keyboard[e.keyCode] = false;
}

window.addEventListener("resize", onWindowResize, false);
window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);

init();
animate();
