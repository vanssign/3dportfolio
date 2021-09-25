// Models index
class Model {
  constructor(objPath,mtlPath,mesh=null){
    this.obj=objPath;
    this.mtl=mtlPath;
    this.mesh=mesh;
  }
}

car1=new Model('../models/Chevrolet_Camaro_SS_Low.obj','../models/Chevrolet_Camaro_SS_Low.mtl');
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
    woodenSign: {
      obj: "../models/Wooden Sign by groch/Meshes/Wooden_Sign_LowPoly_OBJ.obj",
      mtl: "../models/Wooden Sign by groch/Meshes/Wooden_Sign_LowPoly_OBJ.mtl",
      mesh: null,
    },
    postbox: {
      obj: "../models/postbox/Postbox.obj",
      mtl: "../models/postbox/Postbox.mtl",
      mesh: null,
    },
    cat: {
      obj: "../models/cat/cat.obj",
      mtl: "../models/cat/cat.mtl",
      mesh: null,
    },
  };
  