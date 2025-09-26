import { useEffect } from 'react';

// URLs provided by the user
const CURSOR_DEFAULT = 'https://i.postimg.cc/W3VXrbXS/pp.png';
const CURSOR_LEFT_CLICK = 'https://i.postimg.cc/CKC6c6rF/1.png';
const CURSOR_RIGHT_CLICK = 'https://i.postimg.cc/PJzrkdCY/p1.png';
const CURSOR_POINTER = 'https://i.postimg.cc/CKn93Bbm/123343.png';

// Named function for the context menu handler to ensure it can be removed correctly
const preventContextMenu = (e) => e.preventDefault();

const useCustomCursor = () => {
  useEffect(() => {
    // We don't need a state or ref for the cursor state anymore,
    // as we will check the element on every mouse move.

    const handleMouseDown = (e) => {
      const target = e.target;
      // If the target is a link, button, or an image that might be a link, let CSS handle it.
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.tagName === 'IMG') {
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
      // On mouse up, revert to the default cursor. handleMouseMove will adjust if it's over a link.
      document.body.style.cursor = `url(${CURSOR_DEFAULT}), auto`;
    };

    const handleMouseMove = (e) => {
      const target = e.target;
      // Force the pointer cursor on interactive elements and images.
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.tagName === 'IMG') {
        document.body.style.cursor = `url(${CURSOR_POINTER}), auto`;
      } else {
        // If not over an interactive element, ensure the default cursor is set.
        // This handles moving *off* an interactive element.
        // We check the current cursor to avoid flickering by resetting it constantly.
        if (document.body.style.cursor.includes(CURSOR_POINTER)) {
          document.body.style.cursor = `url(${CURSOR_DEFAULT}), auto`;
        }
      }
    };

    // Set the initial default cursor
    document.body.style.cursor = `url(${CURSOR_DEFAULT}), auto`;

    // Add all event listeners
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('contextmenu', preventContextMenu);

    // Cleanup function to remove listeners and reset cursor
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.body.style.cursor = 'auto'; // Reset to default browser cursor
    };
  }, []); // Empty dependency array ensures this effect runs only once.

};

export default useCustomCursor;