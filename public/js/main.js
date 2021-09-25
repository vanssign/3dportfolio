let scene, camera, renderer;

let keyboard = [];

const WIRE_FRAME = false;
const ANTI_ALIAS = true;
const SHADOW_MAP = true;
const ALPHA = true;

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

let skillProjectDistanceX = 25;
let desriptionTitleDistanceZ = 8;

//txt Objects
var txtObjects = {
  skills: {
    text: "SKILLS",
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
      y: Math.PI / 7,
      z: 0,
    },
  },
  react: {
    text: "REACTJS",
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
      y: Math.PI / 7,
      z: 0,
    },
  },
  node: {
    text: "NODEJS",
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
      y: Math.PI / 7,
      z: 0,
    },
  },
  three: {
    text: "THREEJS",
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
      y: Math.PI / 7,
      z: 0,
    },
  },
  mongodb: {
    text: "MONGODB",
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
      y: Math.PI / 7,
      z: 0,
    },
  },
  projects: {
    text: "PROJECTS",
    size: 1,
    height: 0.25,
    color: 0xeeeeee,
    position: {
      x: -5.5 - skillProjectDistanceX,
      y: 0.25,
      z: -7,
    },
    rotation: {
      x: 0,
      y: Math.PI / 7,
      z: 0,
    },
  },
  covisuals: {
    text: "COVISUALS",
    subtext:
      "A react PWA with redux\narchitecture for latest covid\nstats in form of graphs\n and latest news",
    size: 0.5,
    height: 0.25,
    color: 0xaaaaaa,
    position: {
      x: -5 - skillProjectDistanceX,
      // y: 0.25+1+1+1+0.25,
      y: 0.25,
      z: -12,
    },
    rotation: {
      x: 0,
      y: Math.PI / 7,
      z: 0,
    },
  },
  ushotify: {
    text: "USHOTIFY",
    subtext: "",
    size: 0.5,
    height: 0.25,
    color: 0xaaaaaa,
    position: {
      x: -5 - skillProjectDistanceX,
      y: 0.25,
      z: -17,
    },
    rotation: {
      x: 0,
      y: Math.PI / 7,
      z: 0,
    },
  },
  tiptap: {
    text: "TIPTAP",
    size: 0.5,
    height: 0.25,
    color: 0xffffff,
    position: {
      x: -5.5 - skillProjectDistanceX,
      y: 0.25,
      z: -22,
    },
    rotation: {
      x: 0,
      y: Math.PI / 7,
      z: 0,
    },
  },

  dacincieditor: {
    text: "DAVINCI",
    size: 0.5,
    height: 0.25,
    color: 0xaaaaaa,
    position: {
      x: -5 - skillProjectDistanceX,
      y: 0.25,
      z: -27.5,
    },
    rotation: {
      x: 0,
      y: Math.PI / 7,
      z: 0,
    },
  },
  thehealingartist: {
    text: "THE HEALING ARTIST",
    size: 0.5,
    height: 0.25,
    color: 0xaaaaaa,
    position: {
      x: -5 - skillProjectDistanceX,
      y: 0.25,
      z: -32,
    },
    rotation: {
      x: 0,
      y: Math.PI / 7,
      z: 0,
    },
  },
  instructionTxt:{
    text:"WASD: Move\nR: Reset\nEnter: Interact with white box",
    size: 0.4,
    height: 0.05,
    color: 0xaaaaaa,
    position: {
      x: 0,
      y: 6,
      z: -4,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  navigationTxt:{
    text:" <<PROJECTS",
    size: 0.4,
    height: 0.01,
    color: 0xaaaaaa,
    position: {
      x: -7,
      y: 2,
      z: -1,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  name:{
    text:"VANSH SINGH",
    size: 0.5,
    height: 0.15,
    color: 0xaaaaaa,
    position: {
      x: 0,
      y: 0.25,
      z: 2.5,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
};

var linkBoxes = {
  covisuals: {
    url: "https://vanssign.github.io/covid-visuals",
    position: {
      x: -5 - skillProjectDistanceX,
      // y: 0.25+1+1+1+0.25,
      y: 0.25,
      z: -11,
    },
    dimensions:{
      x:4,
      y:0.0125,
      z:2.5
    },
    rotation:{
      x:0,
      y:Math.PI / 7,
      z:0
    }
  },
  ushotify: {
    url: "https://ushotify.herokuapp.com",
    position: {
      x: -5 - skillProjectDistanceX,
      // y: 0.25+1+1+1+0.25,
      y: 0.25,
      z: -16,
    },
    dimensions:{
      x:4,
      y:0.0125,
      z:2.5
    },
    rotation:{
      x:0,
      y:Math.PI / 7,
      z:0
    }
  },
  tiptap: {
    url: "https://tiptap-es.herokuapp.com",
    position: {
      x: -5 - skillProjectDistanceX,
      // y: 0.25+1+1+1+0.25,
      y: 0.25,
      z: -21,
    },
    dimensions:{
      x:4,
      y:0.0125,
      z:2.5
    },
    rotation:{
      x:0,
      y:Math.PI / 7,
      z:0
    }
  },
  davicnipaints: {
    url: "https://davincipaints.vercel.app",
    position: {
      x: -5 - skillProjectDistanceX,
      // y: 0.25+1+1+1+0.25,
      y: 0.25,
      z: -26,
    },
    dimensions:{
      x:4,
      y:0.0125,
      z:2.5
    },
    rotation:{
      x:0,
      y:Math.PI / 7,
      z:0
    }
  },
  thehealingartist: {
    url: "https://thehealingartist.in",
    position: {
      x: -5 - skillProjectDistanceX,
      // y: 0.25+1+1+1+0.25,
      y: 0.25,
      z: -31,
    },
    dimensions:{
      x:4,
      y:0.0125,
      z:2.5
    },
    rotation:{
      x:0,
      y:Math.PI / 7,
      z:0
    }
  },
  mailMe:{
    url: "mailto:thindvansh1999@gmail.com",
    position: {
      x: 6,
      // y: 0.25+1+1+1+0.25,
      y: 0.25,
      z: -2.5,
    },
    dimensions:{
      x:4,
      y:0.0125,
      z:2.5
    },
    rotation:{
      x:0,
      y:0,
      z:0
    }
  },
  github:{
    url: "https://github.com/vanssign",
    position: {
      x: 2.5,
      y: 0.25,
      z: -12,
    },
    dimensions:{
      x:3,
      y:0.0125,
      z:4
    },
    rotation:{
      x:0,
      y:0,
      z:0
    }
  },
  
};

//Model objects
var modelObjects = {
  cat0: {
    model: "cat",
    scale: {
      x: 0.05,
      y: 0.05,
      z: 0.05,
    },
    position: {
      x:5,
      // y: 0.25+1+1+1+0.25,
      y: 0,
      z: -12,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  postbox0: {
    model: "postbox",
    scale: {
      x: 17,
      y: 17,
      z: 17,
    },
    position: {
      x:6,
      // y: 0.25+1+1+1+0.25,
      y: 0,
      z: -5,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  tree0: {
    model: "tree",
    scale: {
      x: 0.1,
      y: 0.1,
      z: 0.1,
    },
    position: {
      x: 4,
      y: 0,
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
      y: 0,
      z: -50,
    },
    rotation: {
      x: 0,
      y: Math.PI / 3,
      z: 0,
    },
  },
  tree2: {
    model: "tree",
    scale: {
      x: 0.4,
      y: 0.4,
      z: 0.4,
    },
    position: {
      x: 7,
      y: 0,
      z: -25,
    },
    rotation: {
      x: 0,
      y: Math.PI / 7,
      z: 0,
    },
  },
  tree3: {
    model: "tree",
    scale: {
      x: 0.8,
      y: 0.8,
      z: 0.8,
    },
    position: {
      x: -20,
      y: 0,
      z: -10,
    },
    rotation: {
      x: 0,
      y: Math.PI / 9,
      z: 0,
    },
  },
  tree4: {
    model: "tree",
    scale: {
      x: 0.2,
      y: 0.3,
      z: 0.4,
    },
    position: {
      x: -15,
      y: 0,
      z: -18,
    },
    rotation: {
      x: 0,
      y: Math.PI / 3,
      z: 0,
    },
  },
  tree5: {
    model: "tree",
    scale: {
      x: 0.5,
      y: 0.5,
      z: 0.5,
    },
    position: {
      x: -15,
      y: 0,
      z: -45,
    },
    rotation: {
      x: 0,
      y: Math.PI ,
      z: 0,
    },
  },
  tree6: {
    model: "tree",
    scale: {
      x: 0.9,
      y: 0.9,
      z: 0.8,
    },
    position: {
      x: -25,
      y: 0,
      z: -50,
    },
    rotation: {
      x: 0,
      y: Math.PI ,
      z: 0,
    },
  },
  // woodenSign0: {
  //   model: "woodenSign",
  //   scale: {
  //     x: 1.5,
  //     y: 1.5,
  //     z: 1.5,
  //   },
  //   position: {
  //     x: -4,
  //     y: 0,
  //     z: -4,
  //   },
  //   rotation: {
  //     x: 0,
  //     y: -Math.PI / 2.5,
  //     z: 0,
  //   },
  // },
};

//lights
// var lights = {
//   light0: {
//     type: "ambient",
//     color: "0xffffff",
//     intensity: 1,
//   },
//   light1: {
//     type: "directional",
//     color: "0xffffff",
//     intensity: 1,
//     castShadow: true,
//     position: {
//       x: 1,
//       y: 1,
//       z: 1,
//     },
//   },
//   light2: {},
// };

// var textures = {
//   road: {
//     normal: "",
//     bump: "",
//   },
// };

// Meshes index
var meshes = [];
const loadingContainer=document.getElementById("loadingContainer");
//loading
let loadingScreen = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(
    configs.camera.fov,
    configs.camera.aspectRatio,
    configs.camera.nearClip,
    configs.camera.farClip
  )
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


  loadingManager = new THREE.LoadingManager();

  loadingManager.onProgress = function (item, loaded, total) {
    //loading sceen on progress
    console.log(item, loaded, total);
  };

  loadingManager.onLoad = function () {
    RESOURCES_LOADED = true;
    loadingContainer.remove();
    onResourcesLoad();
  };
  //choosing default renderer
  renderer = new THREE.WebGLRenderer({ antialias: ANTI_ALIAS, alpha: ALPHA });

  //kinda bg color
  renderer.setClearColor(0xffffff, 0);

  //LIGHTS
  const aLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(aLight);
  const dLight = new THREE.PointLight(0xffffff, 0.8);
  dLight.position.set(3, 30, -1);
  dLight.castShadow = true;
  scene.add(dLight);

  cameraCarGroup = new THREE.Group();
  cameraCarGroup.add(camera);
  //ground plane
  var gPlaneGeometry = new THREE.PlaneGeometry(200, 500, 400, 100);
  var gPlaneMaterial = new THREE.MeshBasicMaterial({
    // color: 0xe6cfbf,
    color: 0x90ee90,
    side: THREE.DoubleSide,
    wireframe: WIRE_FRAME,
  });
  gPlane = new THREE.Mesh(gPlaneGeometry, gPlaneMaterial);
  gPlane.rotation.set(Math.PI / 2, 0, 0);
  gPlane.receiveShadow = true;
  scene.add(gPlane);
  var roadGeometry = new THREE.PlaneGeometry(8, 120, 400, 100);
  var roadMaterial = new THREE.MeshBasicMaterial({
    // color: 0xe6cfbf,
    color: 0x846870,
    side: THREE.DoubleSide,
    wireframe: WIRE_FRAME,
  });
  road0 = new THREE.Mesh(roadGeometry, roadMaterial);
  road0.position.set(0, 0.1, 0);
  road0.rotation.set(Math.PI / 2, 0, 0);
  road0.receiveShadow = true;
  scene.add(road0);

  road1 = new THREE.Mesh(roadGeometry, roadMaterial);
  road1.position.set(1 - skillProjectDistanceX, 0.1, 0);
  road1.rotation.set(Math.PI / 2, 0, 0);
  road1.receiveShadow = true;
  scene.add(road1);

  road2 = new THREE.Mesh(roadGeometry, roadMaterial);
  road2.position.set(0, 0.1, 0);
  road2.rotation.set(Math.PI / 2, 0, Math.PI / 2);
  road2.receiveShadow = true;
  scene.add(road2);

  road2 = new THREE.Mesh(roadGeometry, roadMaterial);
  road2.position.set(0, 0.1, -40);
  road2.rotation.set(Math.PI / 2, 0, Math.PI / 2);
  road2.receiveShadow = true;
  scene.add(road2);


  //create linkBoxes
  for (key in linkBoxes) {
    var linkBoxGeometry = new THREE.BoxGeometry(linkBoxes[key].dimensions.x, linkBoxes[key].dimensions.y+0.20, linkBoxes[key].dimensions.z, 1);
    var linkBoxMaterial = new THREE.MeshBasicMaterial({
      color: 0xe6cfbf,
      side: THREE.DoubleSide,
      wireframe: false,
    });
    var linkBox=new THREE.Mesh(linkBoxGeometry,linkBoxMaterial);
    linkBox.position.set(linkBoxes[key].position.x,linkBoxes[key].position.y,linkBoxes[key].position.z);
    linkBox.rotation.set(linkBoxes[key].rotation.x,linkBoxes[key].rotation.y,linkBoxes[key].rotation.z);
    scene.add(linkBox);
  }

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
    let txt_mat = new THREE.MeshStandardMaterial({
      color: 0xd0d0d0,
      wireframe: false,
    });
    meshes[key] = new THREE.Mesh(txtgeometry, txt_mat);
    meshes[key].position.set(
      txtObjects[key].position.x - 2,
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

  if (keyboard[82] && drivingStatus) {
    //R key to reset
    if (drivingStatus) {
      carSpeed = 0;
      drivingStatus = !drivingStatus;
      cameraCarGroup.position.set(dxP, dyP, dzP);
      cameraCarGroup.rotation.y = dyR;
    }
  }

  if (keyboard[13]) {
    for (let key in linkBoxes) {
      console.log(cameraCarGroup.position);
      console.log(linkBoxes[key]);
      if (
        cameraCarGroup.position.z  < linkBoxes[key].position.z + linkBoxes[key].dimensions.z/2 &&
        cameraCarGroup.position.z > linkBoxes[key].position.z - linkBoxes[key].dimensions.z/2 &&
        cameraCarGroup.position.x < linkBoxes[key].position.x + linkBoxes[key].dimensions.x/2 &&
        cameraCarGroup.position.x > linkBoxes[key].position.x - linkBoxes[key].dimensions.x/2
      ) {
        keyboard[13] = false;
        window.open(linkBoxes[key].url);
      }
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