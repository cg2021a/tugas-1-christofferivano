function radInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createSphere(color) { 
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(3, 12, 8),
      new THREE.MeshBasicMaterial({ color: color })
    );
    sphere.oldcolor = color
    sphere.tag = false;
    sphere.position.set(radInt(-20,20),radInt(-20,20),radInt(-20,20))
    return sphere;
};

function randColorGen(i) {
    var arr = []
    for (x = 0; x < i; x ++){
        arr.push(Math.floor(Math.random()*16777215));
    }
    return arr;
}

function coupling(colors) { 
    let idx = radInt(0,9)
    sceneBuffer.push(createSphere(colors[idx]), createSphere(colors[idx]));
}

function resetTag(cubes) {
    for (const sphere of cubes) {
        sphere.tag = false
        // console.log(cube)
        sphere.material.color.set(cube.oldcolor)
    }
}

window.addEventListener("resize", () => {
    size.w = window.innerWidth * 0.8;
    size.h = window.innerHeight * 0.8;
    camera.aspect = size.w / size.w;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(window.devicePixelRatio);
  });