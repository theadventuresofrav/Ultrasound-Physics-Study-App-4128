/**
 * Diagram Service for managing visual content specifically for ultrasound physics
 */

// Curated diagrams specifically for ultrasound physics education
export const DIAGRAMS = {
  // Basic physics concepts
  ULTRASOUND_WAVE: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  PIEZOELECTRIC_EFFECT: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  DOPPLER_EFFECT: "https://images.unsplash.com/photo-1516570387889-98d4574f83a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  
  // Ultrasound equipment
  TRANSDUCER_TYPES: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  ULTRASOUND_MACHINE: "https://images.unsplash.com/photo-1579154341520-5e8c7a1e7538?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  
  // Clinical applications
  CARDIAC_ULTRASOUND: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  ABDOMINAL_ULTRASOUND: "https://images.unsplash.com/photo-1579154342060-48f31c7efc52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
};

// Comprehensive mapping of topics to relevant diagrams with precise descriptions
export const TOPIC_DIAGRAMS = {
  "acoustic impedance": [
    {
      title: "Acoustic Impedance in Different Tissues",
      url: "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Visualization of acoustic impedance differences between various tissue types, showing how sound waves interact with tissue boundaries"
    }
  ],
  "doppler effect": [
    {
      title: "Doppler Shift in Blood Flow",
      url: DIAGRAMS.DOPPLER_EFFECT,
      description: "Illustration of the Doppler effect in ultrasound showing frequency changes when measuring moving blood cells"
    },
    {
      title: "Color Doppler Imaging",
      url: "https://images.unsplash.com/photo-1583912267550-aae5320e4f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Representation of color-coded blood flow direction and velocity using Doppler principles"
    }
  ],
  "piezoelectric effect": [
    {
      title: "Piezoelectric Crystal Function",
      url: DIAGRAMS.PIEZOELECTRIC_EFFECT,
      description: "Detailed diagram showing how piezoelectric crystals convert electrical energy to sound waves and vice versa in ultrasound transducers"
    }
  ],
  "ultrasound wave": [
    {
      title: "Ultrasound Wave Propagation",
      url: DIAGRAMS.ULTRASOUND_WAVE,
      description: "Visualization of ultrasound wave propagation through different tissue densities"
    },
    {
      title: "Longitudinal Wave Formation",
      url: "https://images.unsplash.com/photo-1557234195-6f5f8613a8f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Diagram showing the compression and rarefaction cycles of longitudinal ultrasound waves"
    }
  ],
  "reflection": [
    {
      title: "Ultrasound Wave Reflection",
      url: "https://images.unsplash.com/photo-1581595218276-c4022e1e4e69?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Diagram showing how ultrasound waves reflect at tissue interfaces with different acoustic impedances"
    }
  ],
  "refraction": [
    {
      title: "Ultrasound Beam Refraction",
      url: "https://images.unsplash.com/photo-1581595218907-3ff752a49386?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Illustration of ultrasound beam direction change when passing through tissues of different densities"
    }
  ],
  "attenuation": [
    {
      title: "Ultrasound Attenuation in Tissue",
      url: "https://images.unsplash.com/photo-1576086213499-7065f19345c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Graph showing the decrease in ultrasound intensity as it travels through different tissue types"
    }
  ],
  "transducer": [
    {
      title: "Ultrasound Transducer Components",
      url: DIAGRAMS.TRANSDUCER_TYPES,
      description: "Cross-sectional diagram of an ultrasound transducer showing piezoelectric elements, backing material, and matching layers"
    },
    {
      title: "Different Transducer Types",
      url: "https://images.unsplash.com/photo-1581595218568-7c56d68fe1b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Comparison of linear, curved, and phased array transducers with their beam patterns"
    }
  ],
  "pulse-echo": [
    {
      title: "Pulse-Echo Principle",
      url: "https://images.unsplash.com/photo-1581595218626-5f75e1d96b67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Illustration of the pulse-echo technique showing transmission and reception of ultrasound signals"
    }
  ],
  "resolution": [
    {
      title: "Axial vs Lateral Resolution",
      url: "https://images.unsplash.com/photo-1581595218658-0de7cda2c45b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Comparison of axial (along beam) and lateral (perpendicular to beam) resolution in ultrasound imaging"
    }
  ],
  "artifacts": [
    {
      title: "Common Ultrasound Artifacts",
      url: "https://images.unsplash.com/photo-1581595218717-5a03a58d9c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Examples of common ultrasound artifacts including shadowing, enhancement, and reverberation"
    }
  ]
};

/**
 * Get relevant diagrams for a specific ultrasound physics topic
 * @param {string|Object} topic - Topic string or question object
 * @returns {Array} Array of relevant diagrams
 */
export function getDiagrams(topic) {
  // Handle if we're passed a question object
  const topicText = typeof topic === 'object' ? 
    (topic.question || '') : 
    (typeof topic === 'string' ? topic : '');
  
  const normalizedTopic = topicText.toLowerCase();
  let diagrams = [];

  // Check for exact matches
  Object.entries(TOPIC_DIAGRAMS).forEach(([key, value]) => {
    if (normalizedTopic.includes(key)) {
      diagrams = [...diagrams, ...value];
    }
  });

  // If no matches, check for keywords
  if (diagrams.length === 0) {
    const keywords = [
      "ultrasound", "sound", "wave", "frequency", "transducer", 
      "doppler", "imaging", "probe", "beam", "crystal", "piezo",
      "reflection", "attenuation", "impedance", "echo", "resolution"
    ];
    
    keywords.forEach(keyword => {
      if (normalizedTopic.includes(keyword) && TOPIC_DIAGRAMS[keyword]) {
        diagrams = [...diagrams, ...TOPIC_DIAGRAMS[keyword]];
      }
    });
  }

  // If still no matches, return a default diagram
  if (diagrams.length === 0) {
    diagrams = [
      {
        title: "Ultrasound Physics Principles",
        url: DIAGRAMS.ULTRASOUND_WAVE,
        description: "General illustration of ultrasound physics principles"
      }
    ];
  }

  return diagrams;
}

/**
 * Generate a custom diagram using HTML5 Canvas
 * @param {string} type - Type of diagram to generate
 * @param {Object} params - Parameters for the diagram
 * @returns {string} Data URL of the generated diagram
 */
export function generateDiagram(type, params = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = params.width || 600;
  canvas.height = params.height || 400;
  const ctx = canvas.getContext('2d');

  // Set background
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add title
  ctx.font = 'bold 16px Arial';
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  ctx.fillText(params.title || 'Ultrasound Physics Diagram', canvas.width/2, 30);

  switch (type) {
    case 'wave':
      drawUltrasoundWave(ctx, params);
      break;
    case 'reflection':
      drawUltrasoundReflection(ctx, params);
      break;
    case 'transducer':
      drawUltrasoundTransducer(ctx, params);
      break;
    case 'doppler':
      drawDopplerEffect(ctx, params);
      break;
    default:
      return null;
  }

  // Add legend if needed
  if (params.legend) {
    drawLegend(ctx, params.legend);
  }

  return canvas.toDataURL();
}

// Helper functions for drawing specific ultrasound physics diagrams
function drawUltrasoundWave(ctx, { amplitude = 50, frequency = 0.02, phase = 0 }) {
  ctx.beginPath();
  ctx.strokeStyle = '#0ea5e9';
  ctx.lineWidth = 3;

  // Draw axis
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(50, 200);
  ctx.lineTo(550, 200);
  ctx.stroke();
  
  ctx.fillStyle = '#64748b';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Distance', 300, 240);
  
  // Draw ultrasound wave
  ctx.beginPath();
  ctx.strokeStyle = '#0ea5e9';
  ctx.lineWidth = 3;

  for (let x = 50; x < 550; x++) {
    const y = 200 - amplitude * Math.sin(frequency * (x - 50) + phase);
    if (x === 50) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
  
  // Label wavelength
  const wavelength = Math.PI / frequency;
  ctx.beginPath();
  ctx.strokeStyle = '#10b981';
  ctx.setLineDash([5, 3]);
  ctx.moveTo(100, 250);
  ctx.lineTo(100 + wavelength, 250);
  ctx.stroke();
  ctx.setLineDash([]);
  
  ctx.fillStyle = '#10b981';
  ctx.textAlign = 'center';
  ctx.fillText('Wavelength (λ)', 100 + wavelength/2, 270);
  
  // Label amplitude
  ctx.beginPath();
  ctx.strokeStyle = '#f97316';
  ctx.moveTo(300, 200);
  ctx.lineTo(300, 200 - amplitude);
  ctx.stroke();
  
  ctx.fillStyle = '#f97316';
  ctx.textAlign = 'left';
  ctx.fillText('Amplitude', 310, 200 - amplitude/2);
}

function drawUltrasoundReflection(ctx, { angle = 45 }) {
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;
  
  // Draw tissue interface
  ctx.beginPath();
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 3;
  ctx.setLineDash([]);
  ctx.moveTo(100, centerY);
  ctx.lineTo(500, centerY);
  ctx.stroke();
  
  // Label tissues
  ctx.fillStyle = '#64748b';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Tissue 1: Z₁', 200, centerY - 30);
  ctx.fillText('Tissue 2: Z₂', 200, centerY + 50);
  
  // Draw incident ray
  const startX = centerX - 150;
  const startY = centerY - 150;
  
  ctx.beginPath();
  ctx.strokeStyle = '#0ea5e9';
  ctx.lineWidth = 3;
  ctx.moveTo(startX, startY);
  ctx.lineTo(centerX, centerY);
  ctx.stroke();
  
  // Draw arrow for incident ray
  drawArrow(ctx, startX + (centerX - startX)/2, startY + (centerY - startY)/2, 
    Math.atan2(centerY - startY, centerX - startX), '#0ea5e9');
  
  // Draw reflected ray
  ctx.beginPath();
  ctx.strokeStyle = '#f59e0b';
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + 150, centerY - 150);
  ctx.stroke();
  
  // Draw arrow for reflected ray
  drawArrow(ctx, centerX + 75, centerY - 75, 
    Math.atan2(-75, 75), '#f59e0b');
  
  // Draw transmitted ray
  ctx.beginPath();
  ctx.strokeStyle = '#10b981';
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + 100, centerY + 80);
  ctx.stroke();
  
  // Draw arrow for transmitted ray
  drawArrow(ctx, centerX + 50, centerY + 40, 
    Math.atan2(40, 50), '#10b981');
  
  // Label the rays
  ctx.font = '12px Arial';
  ctx.fillStyle = '#0ea5e9';
  ctx.textAlign = 'left';
  ctx.fillText('Incident Wave', startX, startY - 10);
  
  ctx.fillStyle = '#f59e0b';
  ctx.fillText('Reflected Wave', centerX + 60, centerY - 160);
  
  ctx.fillStyle = '#10b981';
  ctx.fillText('Transmitted Wave', centerX + 110, centerY + 70);
  
  // Draw angles
  drawAngle(ctx, centerX, centerY, Math.PI * 3/4, Math.PI, 30, '#0ea5e9');
  drawAngle(ctx, centerX, centerY, 0, Math.PI/4, 30, '#f59e0b');
  
  ctx.font = '12px Arial';
  ctx.fillStyle = '#0ea5e9';
  ctx.fillText('θᵢ', centerX - 50, centerY - 15);
  
  ctx.fillStyle = '#f59e0b';
  ctx.fillText('θᵣ', centerX + 40, centerY - 15);
  
  ctx.fillStyle = '#10b981';
  ctx.fillText('θₜ', centerX + 40, centerY + 30);
}

function drawUltrasoundTransducer(ctx, { width = 120, height = 200 }) {
  const centerX = ctx.canvas.width / 2;
  const topY = 100;
  
  // Draw transducer body
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.roundRect(centerX - width/2, topY, width, height, 10);
  ctx.fill();
  
  // Draw transducer face
  ctx.fillStyle = '#0ea5e9';
  ctx.fillRect(centerX - width/2, topY + height - 30, width, 30);
  
  // Draw piezoelectric elements
  const elementWidth = 10;
  const elementGap = 4;
  const elementHeight = 20;
  const elementsStart = centerX - (width/2) + 10;
  const elementsEnd = centerX + (width/2) - 10;
  
  ctx.fillStyle = '#f59e0b';
  for (let x = elementsStart; x < elementsEnd; x += elementWidth + elementGap) {
    ctx.fillRect(x, topY + height - 25, elementWidth, elementHeight);
  }
  
  // Draw matching layer
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(centerX - width/2, topY + height, width, 5);
  
  // Draw acoustic lens
  ctx.fillStyle = '#0369a1';
  ctx.beginPath();
  ctx.ellipse(centerX, topY + height + 15, width/2, 10, 0, 0, Math.PI*2);
  ctx.fill();
  
  // Draw ultrasound beam
  ctx.beginPath();
  ctx.fillStyle = 'rgba(14, 165, 233, 0.2)';
  ctx.moveTo(centerX - width/2, topY + height + 20);
  ctx.lineTo(centerX - width*1.5, topY + height + 200);
  ctx.lineTo(centerX + width*1.5, topY + height + 200);
  ctx.lineTo(centerX + width/2, topY + height + 20);
  ctx.closePath();
  ctx.fill();
  
  // Add labels
  ctx.font = '12px Arial';
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'right';
  ctx.fillText('Housing', centerX - width/2 - 10, topY + height/2);
  
  ctx.textAlign = 'left';
  ctx.fillText('Piezoelectric Elements', centerX + width/2 + 10, topY + height - 15);
  
  ctx.textAlign = 'center';
  ctx.fillText('Matching Layer', centerX, topY + height + 15);
  
  ctx.fillText('Acoustic Lens', centerX, topY + height + 35);
  
  ctx.fillText('Ultrasound Beam', centerX, topY + height + 100);
}

function drawDopplerEffect(ctx, params) {
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;
  
  // Draw blood vessel
  ctx.beginPath();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 20;
  ctx.moveTo(100, centerY);
  ctx.lineTo(500, centerY);
  ctx.stroke();
  
  // Draw vessel walls
  ctx.beginPath();
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  ctx.moveTo(100, centerY - 10);
  ctx.lineTo(500, centerY - 10);
  ctx.moveTo(100, centerY + 10);
  ctx.lineTo(500, centerY + 10);
  ctx.stroke();
  
  // Draw blood cells
  ctx.fillStyle = '#b91c1c';
  for (let x = 150; x <= 450; x += 50) {
    ctx.beginPath();
    ctx.arc(x, centerY, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw velocity arrows
    drawArrow(ctx, x, centerY, 0, '#b91c1c', 15);
  }
  
  // Draw transducer
  const transducerX = centerX;
  const transducerY = centerY - 80;
  const transducerWidth = 40;
  const transducerHeight = 30;
  
  ctx.fillStyle = '#0ea5e9';
  ctx.fillRect(transducerX - transducerWidth/2, transducerY, transducerWidth, transducerHeight);
  
  // Draw ultrasound beam
  ctx.beginPath();
  ctx.fillStyle = 'rgba(14, 165, 233, 0.2)';
  ctx.moveTo(transducerX - transducerWidth/2, transducerY + transducerHeight);
  ctx.lineTo(transducerX - 30, centerY);
  ctx.lineTo(transducerX + 30, centerY);
  ctx.lineTo(transducerX + transducerWidth/2, transducerY + transducerHeight);
  ctx.closePath();
  ctx.fill();
  
  // Draw incident waves
  ctx.beginPath();
  ctx.strokeStyle = '#0ea5e9';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([2, 2]);
  
  const angle = Math.PI * 0.7;
  ctx.moveTo(transducerX, transducerY + transducerHeight);
  ctx.lineTo(centerX, centerY - 10);
  ctx.stroke();
  
  // Draw reflected waves (shifted frequency)
  ctx.beginPath();
  ctx.strokeStyle = '#10b981';
  ctx.moveTo(centerX, centerY - 10);
  ctx.lineTo(transducerX, transducerY + transducerHeight);
  ctx.stroke();
  ctx.setLineDash([]);
  
  // Add labels
  ctx.font = '12px Arial';
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  
  ctx.fillText('Transducer', transducerX, transducerY - 5);
  ctx.fillText('Blood Flow', centerX, centerY + 40);
  
  ctx.fillStyle = '#0ea5e9';
  ctx.fillText('f₀ (Transmitted Frequency)', centerX - 60, centerY - 40);
  
  ctx.fillStyle = '#10b981';
  ctx.fillText('f₁ (Shifted Frequency)', centerX + 60, centerY - 40);
  
  // Draw angle
  drawAngle(ctx, centerX, centerY - 10, Math.PI * 0.7, Math.PI * 1.3, 15, '#0f172a');
  ctx.fillStyle = '#0f172a';
  ctx.fillText('θ', centerX - 15, centerY - 20);
  
  // Draw Doppler equation
  ctx.font = 'italic 16px Arial';
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  ctx.fillText('Δf = 2f₀(v/c)cosθ', centerX, 350);
  
  // Draw legend
  const legend = [
    { color: '#0ea5e9', text: 'Transmitted Ultrasound' },
    { color: '#10b981', text: 'Reflected Ultrasound (Doppler Shifted)' },
    { color: '#b91c1c', text: 'Moving Blood Cells' }
  ];
  
  drawLegend(ctx, legend);
}

// Helper drawing functions
function drawArrow(ctx, x, y, angle, color, length = 10) {
  const headlen = 8;
  
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(length, 0);
  ctx.lineTo(length - headlen, -headlen/2);
  ctx.moveTo(length, 0);
  ctx.lineTo(length - headlen, headlen/2);
  
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
  
  ctx.restore();
}

function drawAngle(ctx, x, y, startAngle, endAngle, radius, color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.arc(x, y, radius, startAngle, endAngle);
  ctx.stroke();
}

function drawLegend(ctx, items) {
  const startX = ctx.canvas.width - 220;
  const startY = ctx.canvas.height - 80;
  const lineLength = 20;
  
  ctx.font = '12px Arial';
  ctx.textAlign = 'left';
  
  items.forEach((item, index) => {
    const y = startY + (index * 20);
    
    // Draw color sample
    ctx.strokeStyle = item.color;
    ctx.fillStyle = item.color;
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(startX + lineLength, y);
    ctx.stroke();
    
    // Draw text
    ctx.fillStyle = '#0f172a';
    ctx.fillText(item.text, startX + lineLength + 5, y + 4);
  });
}