import { useEffect } from 'react';

// URLs provided by the user
const CURSOR_DEFAULT = 'https://i.postimg.cc/W3VXrbXS/pp.png';
const CURSOR_LEFT_CLICK = 'https://i.postimg.cc/CKC6c6rF/1.png';
const CURSOR_RIGHT_CLICK = 'https://i.postimg.cc/PJzrkdCY/p1.png';

// Named function for the context menu handler to ensure it can be removed correctly
const preventContextMenu = (e) => e.preventDefault();

const useCustomCursor = () => {
  useEffect(() => {
    const handleMouseDown = (e) => {
      const target = e.target;
      // Do not change cursor if clicking on an interactive element; let CSS handle it.
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        return;
      }

      switch (e.button) {
        case 0: // Left click
          document.body.style.cursor = `url(${CURSOR_LEFT_CLICK}), auto`;
          break;
        case 2: // Right click
          document.body.style.cursor = `url(${CURSOR_RIGHT_CLICK}), auto`;
          break;
        default:
          break;
      }
    };

    const handleMouseUp = () => {
        // On mouse up, always revert to the default cursor.
        // The CSS rule will handle displaying the pointer cursor over interactive elements.
        document.body.style.cursor = `url(${CURSOR_DEFAULT}), auto`;
    };

    // Add all event listeners
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('contextmenu', preventContextMenu);

    // Cleanup function to remove listeners and reset cursor
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.body.style.cursor = 'auto'; // Reset to default browser cursor
    };
  }, []); // Empty dependency array ensures this effect runs only once.

};

export default useCustomCursor;