import React from 'react';
import type { Business } from '../../types/business';

interface CreateMarkerIconOptions {
  business: Business;
  isHovered: boolean;
  google: typeof google;
}

export const createMarkerIcon = ({
  business,
  isHovered,
  google
}: CreateMarkerIconOptions): Promise<google.maps.Icon> => {
  return new Promise((resolve) => {
    const size = isHovered ? 56 : 48;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      resolve({
        url: business.logo,
        scaledSize: new google.maps.Size(size, size),
      });
      return;
    }

    canvas.width = size * 2;
    canvas.height = (size + 24) * 2;
    ctx.scale(2, 2);

    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, (size / 2) - 2, 0, Math.PI * 2);
    ctx.fillStyle = isHovered ? '#4338CA' : '#4F46E5';
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(size / 2 - 12, size / 2 + 2);
    ctx.quadraticCurveTo(
      size / 2, size + 20,
      size / 2 + 12, size / 2 + 2
    );
    ctx.fillStyle = isHovered ? '#4338CA' : '#4F46E5';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = business.logo;

    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, (size / 2) - 6, 0, Math.PI * 2);
      ctx.clip();

      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      const imgAspect = img.width / img.height;
      let drawWidth = size - 12;
      let drawHeight = drawWidth / imgAspect;
      
      if (drawHeight > size - 12) {
        drawHeight = size - 12;
        drawWidth = drawHeight * imgAspect;
      }

      const x = (size - drawWidth) / 2;
      const y = (size - drawHeight) / 2;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
      ctx.restore();

      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 2;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      resolve({
        url: canvas.toDataURL(),
        scaledSize: new google.maps.Size(size, size + 24),
        anchor: new google.maps.Point(size / 2, size + 22),
      });
    };

    img.onerror = () => {
      resolve({
        url: business.logo,
        scaledSize: new google.maps.Size(size, size),
        anchor: new google.maps.Point(size / 2, size / 2),
      });
    };
  });
};