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
    const setCursor = (cursorUrl) => {
      // We check if the target is interactive and apply the pointer cursor if so.
      // This is a fallback for the CSS, but the CSS !important rule should take precedence.
      const target = event.target;
      if (target && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button'))) {
          document.body.style.cursor = `url(${CURSOR_POINTER}), auto`;
          return;
      }
      document.body.style.cursor = `url(${cursorUrl}), auto`;
    };

    const handleMouseDown = (e) => {
      const target = e.target;
      // Do not change cursor if clicking on an interactive element, let CSS handle it.
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
          return;
      }

      switch (e.button) {
        case 0: // Left click
          setCursor(CURSOR_LEFT_CLICK);
          break;
        case 2: // Right click
          setCursor(CURSOR_RIGHT_CLICK);
          break;
        default:
          break;
      }
    };

    const handleMouseUp = (e) => {
        const target = e.target;
        // Revert to the default cursor on mouse up
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
            setCursor(CURSOR_POINTER);
        } else {
            setCursor(CURSOR_DEFAULT);
        }
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