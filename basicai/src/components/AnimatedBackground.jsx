import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particles array
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    
    // Color palette
    const colors = [
      'hsla(220, 100%, 70%, 0.8)',   // Blue
      'hsla(280, 100%, 70%, 0.8)',   // Purple
      'hsla(190, 100%, 70%, 0.8)',   // Cyan
      'hsla(320, 100%, 70%, 0.8)',   // Pink
    ];
    
    // Create particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off walls
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        
        // Create glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          this.x, this.y, this.size,
          this.x, this.y, this.size * 3
        );
        
        // Use HSLA with proper alpha
        const colorWithoutAlpha = this.color.replace(/,\s*[\d.]+\)$/, ')');
        gradient.addColorStop(0, colorWithoutAlpha.replace(')', ', 0.15)'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections between particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(220, 100%, 70%, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      // Add floating gradient orbs
      const time = Date.now() * 0.001;
      const orbs = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, size: 150, color: '#667eea' },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, size: 200, color: '#764ba2' },
        { x: canvas.width * 0.4, y: canvas.height * 0.8, size: 120, color: '#4c51bf' },
      ];
      
      orbs.forEach((orb, i) => {
        const offsetX = Math.sin(time * 0.5 + i) * 50;
        const offsetY = Math.cos(time * 0.3 + i) * 30;
        
        const gradient = ctx.createRadialGradient(
          orb.x + offsetX, orb.y + offsetY, 0,
          orb.x + offsetX, orb.y + offsetY, orb.size
        );
        gradient.addColorStop(0, hexToRgba(orb.color, 0.2));
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(orb.x + offsetX, orb.y + offsetY, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Helper function to convert hex to rgba
    function hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div style={styles.container}>
      <canvas 
        ref={canvasRef} 
        style={styles.canvas}
      />
      <div style={styles.gradientOverlay} />
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    overflow: 'hidden',
  },
  canvas: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 20% 30%, transparent 0%, #0b0b0b 40%), radial-gradient(circle at 80% 70%, transparent 0%, #0b0b0b 40%)',
    pointerEvents: 'none',
  },
};

export default AnimatedBackground;