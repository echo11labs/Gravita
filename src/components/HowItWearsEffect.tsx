"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const getFragmentShader = (iterations: number) => `
uniform sampler2D uTexture;
uniform float uHover;
uniform vec2 uResolution;
uniform vec2 uImageResolution;

varying vec2 vUv;

// Compute UVs to emulate object-fit: cover
vec2 applyCover(vec2 uv) {
    vec2 ratio = vec2(
        min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
        min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
    );
    return vec2(
        uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
}

void main() {
    // Inverse of hover (1.0 is blurred, 0.0 is perfectly sharp)
    float intensity = 1.0 - uHover;
    
    // The maximum blur radius
    float maxRadius = 0.06;
    float radius = maxRadius * intensity;
    
    // If the image is perfectly sharp, skip the expensive blur loop
    if (radius < 0.001) {
        gl_FragColor = texture2D(uTexture, applyCover(vUv));
        return;
    }
    
    vec2 uv = vUv;
    vec4 color = vec4(0.0);
    float total = 0.0;
    
    // Use the Golden Angle for a beautiful, smooth circular Bokeh distribution
    float golden = 2.39996323;
    const float ITERATIONS = ${iterations.toFixed(1)};
    
    // Aspect ratio correction so the bokeh circles are perfectly round
    vec2 aspectCorrection = vec2(1.0, uResolution.x / uResolution.y);
    
    for (float i = 0.0; i < ITERATIONS; i++) {
        // sqrt(i/iterations) ensures uniform distribution of samples in a circle
        float r = sqrt(i / ITERATIONS) * radius;
        float theta = i * golden;
        
        vec2 offset = vec2(cos(theta), sin(theta)) * r * aspectCorrection;
        
        // Add a very subtle chromatic dispersion at the edges of the blur
        float dispersion = 0.08 * r;
        
        vec2 rUv = applyCover(uv + offset * (1.0 + dispersion));
        vec2 gUv = applyCover(uv + offset);
        vec2 bUv = applyCover(uv + offset * (1.0 - dispersion));
        
        color.r += texture2D(uTexture, rUv).r;
        color.g += texture2D(uTexture, gUv).g;
        color.b += texture2D(uTexture, bUv).b;
        
        total += 1.0;
    }
    
    color /= total;
    color.a = 1.0;
    
    // Add a slight darkening when blurred to make the 4K clear image pop on hover
    gl_FragColor = vec4(color.rgb * mix(1.0, 0.85, intensity), 1.0);
}
`;

export default function HowItWearsEffect({ imageUrl }: { imageUrl: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    
    // Determine if device uses touch (no hover) for optimizations
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const iterations = isTouchDevice ? 32 : 80; // Save mobile GPU battery
    
    // 1. Setup Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    // Cap pixel ratio on mobile to prevent excessive fragment shading
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isTouchDevice ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);
    
    // 2. Setup Scene & Orthographic Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const uniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uHover: { value: 0 },
      uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      uImageResolution: { value: new THREE.Vector2(1, 1) }
    };
    
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: getFragmentShader(iterations),
      uniforms,
      transparent: true,
    });
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // 3. Load Texture
    const loader = new THREE.TextureLoader();
    loader.load(imageUrl, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      uniforms.uTexture.value = texture;
      uniforms.uImageResolution.value.set(texture.image.width, texture.image.height);
      renderer.render(scene, camera);
    });
    
    // 4. Render Loop (Optimized to only run during animations)
    let frameId: number;
    let isAnimating = false;
    
    const renderLoop = () => {
      if (!isAnimating) return;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderLoop);
    };
    
    const startRenderLoop = () => {
      if (!isAnimating) {
        isAnimating = true;
        renderLoop();
      }
    };
    
    const stopRenderLoop = () => {
      isAnimating = false;
      cancelAnimationFrame(frameId);
    };
    
    renderer.render(scene, camera);
    
    // 5. Interaction Logic - ONE TIME EFFECT
    let hasRevealed = false;
    
    const animateToClear = () => {
      if (hasRevealed) return;
      hasRevealed = true;
      
      startRenderLoop();
      gsap.to(uniforms.uHover, {
        value: 1,
        duration: 1.5, // Slightly longer luxurious reveal
        ease: "power2.out",
        onComplete: stopRenderLoop // Stops CPU usage forever
      });
      
      // Clean up the event listener so it doesn't fire again
      container.removeEventListener("mouseenter", animateToClear);
      container.style.cursor = "default";
    };
    
    let st: ScrollTrigger | null = null;
    
    if (isTouchDevice) {
      // On mobile, trigger the reveal automatically when scrolled into view ONCE
      st = ScrollTrigger.create({
        trigger: container,
        start: "top 75%", // Triggers when the top of the image hits 75% down the screen
        once: true, // Only trigger this once
        onEnter: animateToClear
      });
    } else {
      // On desktop, use hover ONCE
      container.addEventListener("mouseenter", animateToClear);
    }
    
    // 6. Resize Handler
    const handleResize = () => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight, false);
      uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
      
      // If it's already fully revealed, we need to do a single render pass on resize
      // to ensure the image scales correctly without starting the loop again.
      if (hasRevealed && !isAnimating) {
        renderer.render(scene, camera);
      }
    };
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      if (!isTouchDevice && !hasRevealed) {
        container.removeEventListener("mouseenter", animateToClear);
      }
      if (st) st.kill();
      window.removeEventListener("resize", handleResize);
      stopRenderLoop();
      geometry.dispose();
      material.dispose();
      if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [imageUrl]);

  return <div ref={mountRef} className="w-full h-full relative overflow-hidden cursor-crosshair bg-[#1a1a1a]" />;
}
