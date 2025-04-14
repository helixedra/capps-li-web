import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Random3DScene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
      
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          container.clientWidth / container.clientHeight,
          0.1,
          1000
        );
      
        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
      
        // sphere size range
        const sphereSizeRange = [3, 3]; // [min, max]
      
        // light
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        // directionalLight.position.set(5, 5, 5);
        // scene.add(directionalLight);
      
        const boxSize = 10;
        // const sphereCount = Math.floor(Math.random() * 5) + 1;
        const sphereCount = 1;
        const spheres = [];
      
        for (let i = 0; i < sphereCount; i++) {
          const radius = Math.random() * (sphereSizeRange[1] - sphereSizeRange[0]) + sphereSizeRange[0];
      
          const geometry = new THREE.SphereGeometry(radius, 12,12);

          // wireframe material
          const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
          });
          
          const sphere = new THREE.Mesh(geometry, material);
        //   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })

        //   const sphere = new THREE.Mesh(geometry, material);
      
          sphere.position.set(
            (Math.random() - 0.5) * (boxSize - radius * 2),
            (Math.random() - 0.5) * (boxSize - radius * 2),
            (Math.random() - 0.5) * (boxSize - radius * 2)
          );
      
          const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.03
          );
      
          const rotationSpeed = new THREE.Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01
          );
      
          spheres.push({ mesh: sphere, velocity, rotationSpeed, radius });
          scene.add(sphere);
        }

    camera.position.z = boxSize * 0.5;

    // PERFORMANCE: Limit FPS
    let lastFrameTime = 0;
    const frameDelay = 1000 / 24;

    let animationId;

    const animate = (time) => {
      animationId = requestAnimationFrame(animate);
      if (time - lastFrameTime < frameDelay) return;
      lastFrameTime = time;

      spheres.forEach(({ mesh, velocity, rotationSpeed, radius }) => {
        mesh.position.add(velocity);

        // Reflect on boundaries
        ['x', 'y', 'z'].forEach((axis) => {
          const half = boxSize / 2 - radius;
          if (mesh.position[axis] < -half || mesh.position[axis] > half) {
            velocity[axis] *= -1;
            mesh.position[axis] = THREE.MathUtils.clamp(mesh.position[axis], -half, half);
          }
        });

        // Rotation
        mesh.rotation.x += rotationSpeed.x;
        mesh.rotation.y += rotationSpeed.y;
        mesh.rotation.z += rotationSpeed.z;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Pause animation when tab is hidden (perf)
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        lastFrameTime = performance.now();
        animate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('visibilitychange', handleVisibility);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
className='absolute left-0 top-0 w-full h-screen -z-1 opacity-10' 
    />
  );
};

export default Random3DScene;
