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

const secondParticlesConfig = {
  background: { color: { value: "transparent" } },
  fpsLimit: 144,
  particles: {
    number: { value: 50, density: { enable: false } },
    color: {
      value: ["#03b4ff", "#4beea7", "#30fff2", "#0272f2", "#65ffe0", "#00eaff"],
    },
    shape: { type: "circle" },
    opacity: { value: 0.6, random: true },
    size: { value: { min: 2, max: 4.5 }, random: true },
    move: {
      enable: true,
      speed: 3,
      direction: "top-right",
      straight: false,
      outModes: { default: "out" },
      bounce: false,
      random: false,
      attract: { enable: true, rotateX: 1200, rotateY: 1200 },
      trail: { enable: true, length: 10, fillColor: "transparent" },
    },
    links: { enable: false },
    twinkle: { particles: { enable: true, frequency: 0.03, opacity: 0.7 } },
    rotate: {
      value: 0,
      direction: "clockwise",
      animation: { enable: true, speed: 1 },
    },
    wobble: { enable: true, distance: 10, speed: 0.3 },
  },
  detectRetina: true,
};

const fireParticlesConfig = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 60, density: { enable: false } },
    color: { value: ["#ff4d4d", "#ff8000", "#ffd633"] },
    shape: { type: "circle" },
    opacity: {
      value: 0.8,
      random: { enable: true, minimumValue: 0.4 },
      anim: { enable: true, speed: 2, opacity_min: 0.2, sync: false },
    },
    size: {
      value: { min: 2, max: 4.5 },
      random: true,
      anim: { enable: true, speed: 5, size_min: 1, sync: false },
    },
    move: {
      enable: true,
      speed: 3,
      direction: "top",
      random: true,
      straight: false,
      outModes: { default: "out" },
      attract: { enable: false },
    },
    twinkle: { particles: { enable: true, frequency: 0.1, opacity: 1 } },
    wobble: { enable: true, distance: 10, speed: 1 },
  },
  detectRetina: true,
};

interface PropsType {
  className?: string;
  showSecondConfig?: boolean;
  showFireConfig?: boolean;
}

const ParticlesConfig = ({
  className,
  showSecondConfig,
  showFireConfig,
}: PropsType) => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      className={className}
      options={
        showSecondConfig
          ? secondParticlesConfig
          : showFireConfig
          ? fireParticlesConfig
          : particlesConfig
      }
      init={particlesInit}
    />
  );
};

export default ParticlesConfig;
