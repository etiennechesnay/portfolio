import { useEffect, useState } from "react";

import { useMotionPreference } from "~/contexts/MotionContext";
import { seededRandom } from "~/utils/seededRandom";

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingParticlesProps {
  count?: number;
  color?: "blue" | "white";
}

export default function FloatingParticles({
  count = 6,
  color = "blue",
}: FloatingParticlesProps) {
  const { reduceMotion } = useMotionPreference();
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles on client side only to avoid hydration mismatch
  useEffect(() => {
    const random = seededRandom(count * 1000 + (color === "blue" ? 1 : 2));

    const generatedParticles: Particle[] = Array.from(
      { length: count },
      (_, i) => ({
        id: i,
        size: 100 + random() * 200,
        x: random() * 100,
        y: random() * 100,
        duration: 20 + random() * 20,
        delay: random() * -20,
        opacity: 0.03 + random() * 0.05,
      })
    );

    setParticles(generatedParticles);
  }, [count, color]);

  const colorClasses = {
    blue: "from-blue-400/30 to-cyan-300/20",
    white: "from-white/20 to-white/5",
  };

  // Don't render anything on server or before particles are generated
  if (particles.length === 0) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" />
    );
  }

  if (reduceMotion) {
    // Static version for reduced motion preference
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full bg-gradient-radial ${colorClasses[color]} blur-3xl`}
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full bg-gradient-radial ${colorClasses[color]} blur-3xl animate-float`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            transform: "translate(-50%, -50%)",
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
