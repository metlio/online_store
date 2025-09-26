import { useEffect } from 'react';

// This hook now only manages adding/removing CSS classes to the body.
// All cursor image logic is handled by cursor.css.

const useCustomCursor = () => {
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.button === 0) { // Left click
        document.body.classList.add('left-click');
      } else if (e.button === 2) { // Right click
        document.body.classList.add('right-click');
      }
    };

    const handleMouseUp = () => {
      // Remove both classes on mouse up, regardless of which button was pressed.
      document.body.classList.remove('left-click');
      document.body.classList.remove('right-click');
    };

    const preventContextMenu = (e) => e.preventDefault();

    // Add event listeners
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('contextmenu', preventContextMenu);

    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('contextmenu', preventContextMenu);
      // Ensure classes are removed on cleanup
      document.body.classList.remove('left-click', 'right-click');
    };
  }, []); // Empty dependency array ensures this effect runs only once.
};

export default useCustomCursor;