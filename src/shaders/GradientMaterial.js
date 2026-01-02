import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const GradientMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#101010'),
    uColorEnd: new THREE.Color('#2a2a2a'),
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1)
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 st = vUv;
      
      // Interactive mouse influence
      vec2 mouse = uMouse * 0.5 + 0.5; // Map -1..1 to 0..1
      float dist = distance(st, mouse);
      float mouseGlow = smoothstep(0.5, 0.0, dist) * 0.2; // Subtle glow around cursor

      // Moving noise
      float noiseVal = snoise(st * 3.0 + uTime * 0.1);
      float noiseVal2 = snoise(st * 6.0 - uTime * 0.15);
      
      // Layered pattern
      float pattern = noiseVal * 0.5 + noiseVal2 * 0.5;
      
      // Color mixing
      vec3 color = mix(uColorStart, uColorEnd, pattern + st.y);
      
      // Add a third accent color based on mouse/time
      vec3 accent = vec3(0.2, 0.5, 1.0); // Electric blueish
      color += accent * (mouseGlow + pattern * 0.1);

      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ GradientMaterial })

export { GradientMaterial }
