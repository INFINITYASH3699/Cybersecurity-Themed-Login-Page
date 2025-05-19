import React, { useEffect, useRef } from 'react';

const CyberSecurityBackground = ({ density = 40, speed = 25, color = '#ff2d55' }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Set canvas size to match window
    canvas.width = width;
    canvas.height = height;
    
    // Matrix characters - using computer/security related symbols
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン:><+*あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん¦!@#$%^&*()[]{}\\/=?+-_|~;:.,`"\'';
    const charArray = chars.split('');
    
    const fontSize = 12;
    const columns = Math.floor(width / fontSize) + 1;
    
    // Array to store vertical positions for each column
    const drops = Array(columns).fill(1);
    
    // Generate random starting positions for some drops
    for (let i = 0; i < columns; i++) {
      if (Math.random() > 0.6) {  // 40% of columns start with characters
        drops[i] = Math.floor(Math.random() * height / fontSize) * -1;
      }
    }

    // Create gradient
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, `${color}10`);
      gradient.addColorStop(0.2, `${color}`);
      gradient.addColorStop(0.4, `${color}dd`);
      gradient.addColorStop(1, `${color}10`);
      return gradient;
    };
    
    // Draw function
    const draw = () => {
      // Add semi-transparent black rectangle on each frame
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.font = `${fontSize}px monospace`;
      
      // Main gradient for characters
      ctx.fillStyle = createGradient();
          
      // Loop through each column
      for (let i = 0; i < drops.length; i++) {
        if (drops[i] * fontSize > 0) { // Only draw if in view
          // Add random effect to determine if we draw a character
          if (Math.random() < density / 100) {
            const charIndex = Math.floor(Math.random() * charArray.length);
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Vary the alpha for the characters to create depth
            const alpha = Math.random() * 0.8 + 0.2;
            ctx.globalAlpha = alpha;
            
            // Draw the character
            ctx.fillText(charArray[charIndex], x, y);
            
            // Draw a smaller brighter effect for some characters (like a "glow")
            if (Math.random() > 0.98) {
              ctx.globalAlpha = 0.8;
              ctx.fillStyle = '#ffffff';
              ctx.fillText(charArray[charIndex], x, y);
              ctx.fillStyle = createGradient();
            }
            
            // Reset alpha
            ctx.globalAlpha = 1;
          }
        }
        
        // Move the drop down
        drops[i]++;
        
        // Reset drop when it reaches bottom or randomly for some
        if (drops[i] * fontSize > height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    };

    // Animation loop
    let animationId;
    const animate = () => {
      setTimeout(() => {
        animationId = requestAnimationFrame(animate);
        draw();
      }, 1000 / speed); // Control speed
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Recalculate columns
      const newColumns = Math.floor(width / fontSize) + 1;
      
      // Resize drops array
      if (newColumns > drops.length) {
        // Add new columns
        const additionalColumns = newColumns - drops.length;
        drops.push(...Array(additionalColumns).fill(1));
      } else {
        // Remove excess columns
        drops.length = newColumns;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [color, density, speed]);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(135deg, #000000 0%, #121212 50%, #1a0000 100%)',
        opacity: 0.8,
      }}
    />
  );
};

export default CyberSecurityBackground;