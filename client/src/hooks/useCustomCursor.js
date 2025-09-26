import { useEffect, useRef } from 'react';

// URLs provided by the user
const CURSOR_DEFAULT = 'https://i.postimg.cc/W3VXrbXS/pp.png';
const CURSOR_LEFT_CLICK = 'https://i.postimg.cc/CKC6c6rF/1.png';
const CURSOR_RIGHT_CLICK = 'https://i.postimg.cc/PJzrkdCY/p1.png';

// Named function for the context menu handler to ensure it can be removed correctly
const preventContextMenu = (e) => e.preventDefault();

const useCustomCursor = () => {
  // Use a ref to store the current cursor state ('default', 'left', 'right')
  // This avoids re-renders and re-running the effect on state change.
  const cursorState = useRef('default');

  const setCursor = (cursorUrl) => {
    document.body.style.cursor = `url(${cursorUrl}), auto`;
  };

  useEffect(() => {
    const handleMouseDown = (e) => {
      const target = e.target;

      // If clicking on a link or button, reset to default cursor and state
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setCursor(CURSOR_DEFAULT);
        cursorState.current = 'default';
        return; // Stop further processing
      }

      if (e.button === 0) { // Left click
        if (cursorState.current === 'left') {
          // If already in left-click state, toggle back to default
          cursorState.current = 'default';
          setCursor(CURSOR_DEFAULT);
        } else {
          // Otherwise, switch to left-click state
          cursorState.current = 'left';
          setCursor(CURSOR_LEFT_CLICK);
        }
      } else if (e.button === 2) { // Right click
        if (cursorState.current === 'right') {
          // If already in right-click state, toggle back to default
          cursorState.current = 'default';
          setCursor(CURSOR_DEFAULT);
        } else {
          // Otherwise, switch to right-click state
          cursorState.current = 'right';
          setCursor(CURSOR_RIGHT_CLICK);
        }
      }
    };

    const handleMouseMove = (e) => {
        const target = e.target;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
            setCursor(CURSOR_DEFAULT);
            cursorState.current = 'default';
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