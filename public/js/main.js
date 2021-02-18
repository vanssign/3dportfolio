let scene, camera, renderer;

let keyboard = [];

const WIRE_FRAME = false;
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

//txt Objects
var txtObjects = {
  skills:{
    text:"SKILLS",
    size: 1,
    height: 0.25,
    color: 0xeeeeee,
    position: {
      x: -5.5,
      y: 0.25,
      z: -7,
    },
    rotation: {
      x: 0,
      y: Math.PI/7,
      z: 0,
    },
  },
  react:{
    text:"REACTJS",
    size: 0.5,
    height: 0.25,
    color: 0xaaaaaa,
    position: {
      x: -5,
      y: 0.25,
      z: -12,
    },
    rotation: {
      x: 0,
      y: Math.PI/7,
      z: 0,
    }
  },
  node:{
    text:"NODEJS",
    size: 0.5,
    height: 0.25,
    color: 0xaaaaaa,
    position: {
      x: -5,
      y: 0.25,
      z: -15,
    },
    rotation: {
      x: 0,
      y: Math.PI/7,
      z: 0,
    }
  },
  three:{
    text:"THREEJS",
    size: 0.5,
    height: 0.25,
    color: 0xaaaaaa,
    position: {
      x: -5,
      y: 0.25,
      z: -18,
    },
    rotation: {
      x: 0,
      y: Math.PI/7,
      z: 0,
    }
  },
  mongodb:{
    text:"MONGODB",
    size: 0.5,
    height: 0.25,
    color: 0xffffff,
    position: {
      x: -5.5,
      y: 0.25,
      z: -21,
    },
    rotation: {
      x: 0,
      y: Math.PI/7,
      z: 0,
    }
  },
};

//Model objects
var modelObjects = {
  tree0: {
    model: "tree",
    scale: {
      x: 0.1,
      y: 0.1,
      z: 0.1,
    },
    position: {
      x: 4,
      y: 1,
      z: -6,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  tree1: {
    model: "tree",
    scale: {
      x: 0.1,
      y: 0.1,
      z: 0.1,
    },
    position: {
      x: -7,
      y: 1,
      z: -50,
    },
    rotation: {
      x: 0,
      y: Math.PI / 3,
      z: 0,
    },
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
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false })
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
    //loading sceen on progress
    loadingScreen.scene.remove(loadingScreen.box);
    loadingScreen.box.position.x-=0.01;
    loadingScreen.box.scale.x+=0.05;
    console.log(loadingScreen.box);
    loadingScreen.scene.add(loadingScreen.box)
  };

  loadingManager.onLoad = function () {
    RESOURCES_LOADED = true;
    onResourcesLoad();
  };
  //choosing default renderer
  renderer = new THREE.WebGLRenderer({ antialias: ANTI_ALIAS });

  //kinda bg color
  renderer.setClearColor("#fed8b1");

  //LIGHTS
  const aLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(aLight);
  const dLight = new THREE.PointLight(0xffffff, 0.8);
  dLight.position.set(30, 100, -10);
  dLight.castShadow = true;
  scene.add(dLight);

  cameraCarGroup = new THREE.Group();
  cameraCarGroup.add(camera);
  //ground plane
  var gPlaneGeometry = new THREE.PlaneGeometry(200, 500, 400, 100);
  var gPlaneMaterial = new THREE.MeshBasicMaterial({
    color: 0xe6cfbf,
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
  //loop through modelObjects and construct meshes accordingly
  for (let key in modelObjects) {
    // Clone models into meshes.
    meshes[key] = models[modelObjects[key].model].mesh.clone();
    meshes[key].position.set(
      modelObjects[key].position.x,
      modelObjects[key].position.y,
      modelObjects[key].position.z
    );
    meshes[key].scale.set(
      modelObjects[key].scale.x,
      modelObjects[key].scale.y,
      modelObjects[key].scale.z
    );
    meshes[key].rotation.set(
      modelObjects[key].rotation.x,
      modelObjects[key].rotation.y,
      modelObjects[key].rotation.z
    );
    meshes[key].castShadow = true;
    scene.add(meshes[key]);
  }

  //car mesh construction
  meshes["car"] = models.car.mesh.clone();
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

  //construct txt meshes using font mesh and txtObject
  for (let key in txtObjects) {
    let txtgeometry = new THREE.TextGeometry(txtObjects[key].text, {
      font: fonts.optimerRegular.mesh,
      size: txtObjects[key].size,
      height: txtObjects[key].height,
    });
    let txt_mat = new THREE.MeshPhongMaterial({
      color: 0xeeeeee,
      wireframe: false,
    });
    meshes[key] = new THREE.Mesh(txtgeometry, txt_mat);
    meshes[key].position.set(
      txtObjects[key].position.x,
      txtObjects[key].position.y,
      txtObjects[key].position.z
    );
    meshes[key].rotation.set(
      txtObjects[key].rotation.x,
      txtObjects[key].rotation.y,
      txtObjects[key].rotation.z
    );
    meshes[key].castShadow = true;
    scene.add(meshes[key]);
  }
}

function animate() {
  if (RESOURCES_LOADED == false) {
    requestAnimationFrame(animate);
    renderer.render(loadingScreen.scene, loadingScreen.camera);
    return
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
      cameraCarGroup.rotation.y = dyR;
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
