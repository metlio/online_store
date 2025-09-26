import { useEffect, useRef } from 'react';

// URLs provided by the user
const CURSOR_DEFAULT = 'https://i.postimg.cc/W3VXrbXS/pp.png';
const CURSOR_LEFT_CLICK = 'https://i.postimg.cc/CKC6c6rF/1.png';
const CURSOR_RIGHT_CLICK = 'https://i.postimg.cc/PJzrkdCY/p1.png';
const CURSOR_POINTER = 'https://i.postimg.cc/CKn93Bbm/123343.png'; // New cursor for links/buttons

// Named function for the context menu handler to ensure it can be removed correctly
const preventContextMenu = (e) => e.preventDefault();

const useCustomCursor = () => {
  // Use a ref to store the current cursor state ('default', 'left', 'right')
  const cursorState = useRef('default');

  const setCursor = (cursorUrl) => {
    document.body.style.cursor = `url(${cursorUrl}), auto`;
  };

  useEffect(() => {
    const handleMouseDown = (e) => {
      const target = e.target;

      // If clicking on a link or button, let handleMouseMove manage the cursor.
      // Just prevent the click state from being activated.
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        cursorState.current = 'default'; // Reset state on click of interactive element
        return;
      }

      if (e.button === 0) { // Left click
        if (cursorState.current === 'left') {
          cursorState.current = 'default';
          setCursor(CURSOR_DEFAULT);
        } else {
          cursorState.current = 'left';
          setCursor(CURSOR_LEFT_CLICK);
        }
      } else if (e.button === 2) { // Right click
        if (cursorState.current === 'right') {
          cursorState.current = 'default';
          setCursor(CURSOR_DEFAULT);
        } else {
          cursorState.current = 'right';
          setCursor(CURSOR_RIGHT_CLICK);
        }
      }
    };

    const handleMouseMove = (e) => {
        const target = e.target;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
            // Use the new pointer cursor when hovering over links/buttons
            setCursor(CURSOR_POINTER);
        } else {
            // When moving off an interactive element, restore the correct cursor based on the stored state
            switch (cursorState.current) {
                case 'left':
                    setCursor(CURSOR_LEFT_CLICK);
                    break;
                case 'right':
                    setCursor(CURSOR_RIGHT_CLICK);
                    break;
                default:
                    setCursor(CURSOR_DEFAULT);
                    break;
            }
        }
    };

    // Set initial cursor
    setCursor(CURSOR_DEFAULT);

    // Add all event listeners
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('contextmenu', preventContextMenu);

    // Cleanup function to remove listeners and reset cursor
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.body.style.cursor = 'auto'; // Reset to default browser cursor
    };
  }, []); // Empty dependency array ensures this effect runs only once.

};

export default useCustomCursor;