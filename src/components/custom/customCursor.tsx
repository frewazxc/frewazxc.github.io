'use client'

import { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
function hasButtonOrAnchorAncestor(element: HTMLElement | null): boolean {
  if (!element) {
    return false;
  }

  if (element.tagName === "BUTTON" || element.tagName === "A") {
    return true;
  }

  return hasButtonOrAnchorAncestor(element.parentElement);
}

export default function CustomCursor() {
  if (typeof document === "undefined") {
    return null as any;
  }

  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const spring = {
    type: "spring",
    stiffness: 50,
    damping: 10,
  };

  const initialCursorPosition = useRef(
    { x: 0, y: 0 }
  );

  const positionX = useSpring(initialCursorPosition.current.x, spring);
  const positionY = useSpring(initialCursorPosition.current.y, spring);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      // Check if the cursor is hovering a button or "A" tag element
      const isHovered =
        e.target instanceof HTMLElement &&
        (e.target.tagName === "BUTTON" ||
          e.target.tagName === "A" ||
          hasButtonOrAnchorAncestor(e.target.parentElement));
      setIsHovering(isHovered);

      // Update the position based on the cursor position
      positionX.set(e.clientX);
      positionY.set(e.clientY);

      localStorage.setItem(
        "cursorPosition",
        JSON.stringify({ x: e.clientX, y: e.clientY })
      );
    };

    // Store the initial cursor position when the component is first rendered
    initialCursorPosition.current.x = window.innerWidth / 2;
    initialCursorPosition.current.y = window.innerHeight / 2;

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      style={{
        height: 20,
        width: 20,
        position: "fixed",
        left: positionX,
        top: positionY,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        transition: "transform 0.2s ease",
        scale: isHovering ? 1.7 : 1, // Adjust scale on hovering interactive elements
        background: "#F00"
      }}
    ></motion.div>
  );
}
