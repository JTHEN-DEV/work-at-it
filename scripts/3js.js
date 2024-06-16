let scene, camera, renderer, cube;

class Game {
    static animate() {
        requestAnimationFrame(Game.animate);

        // Rotate the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }
    static onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    static init() {
        // Create scene
        scene = new THREE.Scene();

        // Create camera
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.y = 1;
        camera.position.z = 5;

        // Create renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Create a cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x808080);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
        directionalLight.position.set(0, 1, 0);
        scene.add(directionalLight);

        // Add point light
        // const pointLight = new THREE.PointLight(0xff0000, 1, 100);
        // pointLight.position.set(10, 10, 10);
        // scene.add(pointLight);

        window.addEventListener("resize", Game.onWindowResize, false);
        Game.animate();
    }
}
