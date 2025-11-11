import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const particlesConfig: any = {
  background: {
    color: { value: "transparent" },
  },
  fpsLimit: 60,
  particles: {
    number: { value: 80, density: { enable: true, area: 900 } },
    color: {
      value: ["#ffffff", "#b0b0b0", "#8c8c8c", "#3d5c7a", "#5a6d8c", "#037bf2"],
    },

    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.85,
      random: true,
      anim: {
        enable: true,
        speed: 1.5,
        opacity_min: 0.2,
        sync: false,
      },
    },
    size: {
      value: { min: 2, max: 6 },
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 1,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "top",
      random: true,
      straight: false,
      outModes: { default: "out" },
      attract: { enable: true, rotateX: 600, rotateY: 1200 },
    },
    links: { enable: false },
  },
  detectRetina: true,
};

interface PropsType {
  className?: string;
}

const ParticlesConfig = ({ className }: PropsType) => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      className={className}
      options={particlesConfig}
      init={particlesInit}
    />
  );
};

export default ParticlesConfig;
