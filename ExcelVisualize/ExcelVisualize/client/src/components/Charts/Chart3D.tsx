import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Chart3DProps {
  data: Record<string, any>[];
  xAxis: string;
  yAxis: string;
  zAxis?: string;
}

export default function Chart3D({ data, xAxis, yAxis, zAxis }: Chart3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current || !data.length) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Create 3D bars based on data
    const maxValue = Math.max(...data.map(row => parseFloat(row[yAxis]) || 0));
    const barWidth = 0.5;
    const barDepth = 0.5;
    const spacing = 1;

    data.forEach((row, index) => {
      const value = parseFloat(row[yAxis]) || 0;
      const height = (value / maxValue) * 5; // Scale to max height of 5

      // Bar geometry and material
      const geometry = new THREE.BoxGeometry(barWidth, height, barDepth);
      const material = new THREE.MeshLambertMaterial({ 
        color: new THREE.Color().setHSL((index / data.length) * 0.7, 0.7, 0.5)
      });
      const bar = new THREE.Mesh(geometry, material);

      // Position bars
      bar.position.x = (index - data.length / 2) * spacing;
      bar.position.y = height / 2;
      bar.position.z = 0;

      scene.add(bar);
    });

    // Camera position
    camera.position.set(data.length * 0.5, 5, 8);
    camera.lookAt(0, 2, 0);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate scene slowly
      scene.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    };

    animate();

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [data, xAxis, yAxis, zAxis]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">3D Visualization</h3>
        <p className="text-gray-600 mt-1">Interactive 3D chart</p>
      </div>
      <div className="p-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
}
