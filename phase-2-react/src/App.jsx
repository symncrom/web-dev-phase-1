import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
function InteractiveModel() {
  const modelRef = useRef();
  const { scene } = useGLTF('/model.glb');
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#main-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });
    tl.to(modelRef.current.rotation, { y: Math.PI * 1, z: 0.2 }, 'section-2')
      .to(modelRef.current.position, { x: 2, y: -0.5, z: 0 }, 'section-2')
      .to(modelRef.current.rotation, { y: -Math.PI * 1, x: 0.3 }, 'section-3')
      .to(modelRef.current.position, { x: -2, y: 0, z: 1 }, 'section-3');
  }, []);
  useFrame((state) => {
    const { x, y } = state.pointer;
    modelRef.current.rotation.x = gsap.utils.interpolate(
      modelRef.current.rotation.x,
      y * 0.3,
      0.05
    );
    modelRef.current.rotation.y = gsap.utils.interpolate(
      modelRef.current.rotation.y,
      x * 0.5,
      0.05
    );
  });
  return <primitive ref={modelRef} object={scene} scale={1.2} position={[0, -0.5, 0]} />;
}
function App() {
  return (
    <div id="main-container" style={{ height: '300vh', backgroundColor: '#0b0c10', color: '#fff' }}>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.2rem 10%',
        zIndex: 10,
        background: 'rgba(11, 12, 16, 0.6)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#66fcf1', letterSpacing: '1px' }}>
          Derma Estetika<span style={{ color: '#fff' }}> Industri</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem', color: '#c5c6c7' }}>
          <a href="#hero" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
          <a href="#features" style={{ color: '#c5c6c7', textDecoration: 'none' }}>Features</a>
          <a href="#about" style={{ color: '#c5c6c7', textDecoration: 'none' }}>About</a>
        </div>
        <button style={{
          padding: '0.6rem 1.4rem',
          borderRadius: '20px',
          border: '1px solid #66fcf1',
          background: 'transparent',
          color: '#66fcf1',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}>
          Launch App
        </button>
      </nav>

      {/* 2. KANVAS 3D BACKGROUND */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <directionalLight
            castShadow
            position={[5, 8, 5]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, -2, -2]} intensity={2} color="#66fcf1" />
          <Environment preset="city" />

          <Suspense fallback={null}>
            <InteractiveModel />
            <ContactShadows
              position={[0, -1.8, 0]}
              opacity={0.75}
              scale={10}
              blur={2.5}
              far={4}
              color="#000000"
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 3. LAPISAN SEKSI TEKS & TOMBOL INTERAKTIF */}
      <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        
        {/* SEKSI 1: HERO */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10%' }}>
          <span style={{ color: '#45a29e', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Derma Estetika Industri
          </span>
          <h1 style={{ fontSize: '4.2rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.2rem', color: '#ffffff', maxWidth: '600px' }}>
            Mau Makloon ? <span style={{ color: '#66fcf1' }}>Disini Aja...</span>
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '450px', color: '#c5c6c7', lineHeight: '1.6', marginBottom: '2rem' }}>
            Pengalaman Terbaik dalam Makloon Kosmetik dan Skincare. Kami siap membantu Anda untuk mengembangkan produk berkualitas tinggi dengan proses yang efisien dan profesional.
          </p>
          <div style={{ display: 'flex', gap: '1rem', pointerEvents: 'auto' }}>
            <button style={{
              padding: '0.8rem 2rem',
              borderRadius: '30px',
              border: 'none',
              background: '#66fcf1',
              color: '#0b0c10',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(102, 252, 241, 0.4)',
            }}>
              Chat Now
            </button>
            <button style={{
              padding: '0.8rem 2rem',
              borderRadius: '30px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: '1rem',
              cursor: 'pointer',
              backdropFilter: 'blur(5px)',
            }}>
              Konsultasikan Sekarang
            </button>
          </div>
        </section>

        {/* SEKSI 2: FEATURES */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '0 10%' }}>
          <h2 style={{ fontSize: '3.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#45a29e' }}>
            Real-Time Lighting & Motion
          </h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '420px', color: '#c5c6c7', lineHeight: '1.6' }}>
            Setiap sudut model memantulkan cahaya realistis secara dinamis saat di-scroll oleh pengguna.
          </p>
        </section>

        {/* SEKSI 3: CALL TO ACTION */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', padding: '0 10%', textAlign: 'right' }}>
          <h2 style={{ fontSize: '3.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#66fcf1' }}>
            Ready To Build Yours?
          </h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '450px', color: '#c5c6c7', lineHeight: '1.6', marginBottom: '2rem' }}>
            Website 3D interaktif ini siap di-deploy dan diakses oleh jutaan pengguna di seluruh dunia.
          </p>
          <button style={{
            pointerEvents: 'auto',
            padding: '1rem 2.5rem',
            borderRadius: '30px',
            border: 'none',
            background: '#66fcf1',
            color: '#0b0c10',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 25px rgba(102, 252, 241, 0.5)',
          }}>
            Get Started Now
          </button>
        </section>

      </div>
    </div>
  );
}

export default App;