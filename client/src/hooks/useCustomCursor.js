import { useEffect, useRef } from 'react';
import leftClickImg from '../assets/left-click.png';
import rightClickImg from '../assets/right-click.png';

const useCustomCursor = () => {
  const clickImageRef = useRef(null);

  useEffect(() => {
    const handleMouseDown = (e) => {
      // Remove any existing image
      if (clickImageRef.current) {
        clickImageRef.current.remove();
      }

      const img = document.createElement('img');
      img.style.position = 'fixed';
      img.style.left = `${e.clientX - 30}px`; // Adjust position to center the image on the cursor
      img.style.top = `${e.clientY - 30}px`;
      img.style.pointerEvents = 'none'; // Make the image non-interactive
      img.style.zIndex = '10000'; // Ensure it's on top

      if (e.button === 0) { // Left click
        img.src = leftClickImg;
      } else if (e.button === 2) { // Right click
        img.src = rightClickImg;
      } else {
        return; // Do nothing for other buttons
      }

      document.body.appendChild(img);
      clickImageRef.current = img;
    };

    const handleMouseUp = () => {
      if (clickImageRef.current) {
        clickImageRef.current.remove();
        clickImageRef.current = null;
      }
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('contextmenu', handleContextMenu);


    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('contextmenu', handleContextMenu);

      if (clickImageRef.current) {
        clickImageRef.current.remove();
      }
    };
  }, []);
};

export default useCustomCursor;