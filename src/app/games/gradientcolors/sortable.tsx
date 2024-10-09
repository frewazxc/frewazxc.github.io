'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface ItemProps {
  children: React.ReactNode;
  index: number;
  onMove: (prevIndex: number, nextIndex: number) => void;
  onMouseUp: () => void;
  listLength: number;
  color: string;
}

const Item: React.FC<ItemProps> = ({ children, index, onMove, onMouseUp, listLength, color }) => {
  const [left, setLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(0);

  const ref = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(index);
  const onMoveRef = useRef(onMove);
  const listLengthRef = useRef(listLength);
  const prevRectRef = useRef<DOMRect | null>(null);
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => {
    indexRef.current = index;
    onMoveRef.current = onMove;
    listLengthRef.current = listLength;
  }, [index, onMove, listLength]);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    let startX = 0;
    let delayedSetZIndexTimeoutId: NodeJS.Timeout;

    const mouseMove = (ev: MouseEvent) => {
      ev.preventDefault();
      const rect = el.getBoundingClientRect();
      prevRectRef.current = rect;

      let latestLeft = ev.clientX - startX;

      if (latestLeft > rect.height && indexRef.current < listLengthRef.current - 1) {
        onMoveRef.current(indexRef.current, indexRef.current + 1);
        latestLeft -= rect.height;
        startX += rect.height;
      } else if (latestLeft < -rect.height && indexRef.current > 0) {
        onMoveRef.current(indexRef.current, indexRef.current - 1);
        latestLeft += rect.height;
        startX -= rect.height;
      }
      setLeft(latestLeft);
    };

    const mouseUp = (ev: MouseEvent) => {
      ev.preventDefault();
      document.removeEventListener("mousemove", mouseMove);
      setLeft(0);
      setIsDragging(false);
      delayedSetZIndexTimeoutId = setTimeout(() => {
        setZIndex(0);
      }, 200);
      onMouseUp();
    };

    const mouseDown = (ev: MouseEvent) => {
      ev.preventDefault();
      clearTimeout(delayedSetZIndexTimeoutId);
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp, { once: true });
      setIsDragging(true);
      setZIndex(999);
      startX = ev.clientX;
    };

    el.addEventListener("mousedown", mouseDown);
    return () => {
      el.removeEventListener("mousedown", mouseDown);
    };
  }, []);

  useLayoutEffect(() => {
    const el = ref.current;
    if (isDragging) return;

    if (prevRectRef.current === null) {
      prevRectRef.current = el?.getBoundingClientRect() || null;
      return;
    }

    if (animationRef.current) {
      const animation = animationRef.current;
      if (animation.playState === "running") {
        animation.cancel();
      }
    }

    const latestRect = el?.getBoundingClientRect();
    if (latestRect) {
      const prevRect = prevRectRef.current;
      const deltaX = latestRect.x - prevRect.x;

      prevRectRef.current = latestRect;

    if (deltaX === 0) return;

    animationRef.current = el?.animate(
      [
        { left: `${-deltaX}px` },
        { left: `0px` }
      ],
      { duration: 200 }
    ) || null;
  }
}, [index, isDragging]);

  return (
    <div
      ref={ref}
      className="w-16 h-16 relative border-none"
      style={{
        background: color,
        padding: "10px",
        transform: isDragging ? `scale(1.01)` : `scale(1)`,
        left: `${left}px`,
        transition: "transform .2s, box-shadow .2s",
        boxShadow: isDragging
          ? "0 0 10px 2px rgba(0, 0, 0, 0.5)"
          : "0 0 0 0px rgba(0, 0, 0, 0.5)",
        zIndex: zIndex.toString()
      }}
    >
      {children}
    </div>
  );
};

interface SortableProps {
  list: { key: number; content: string }[];
  setList: React.Dispatch<React.SetStateAction<{ key: number; content: string }[]>>;
  onMouseUp: () => void;
}

interface CheckWinProps {
  key: number;
  [prop: string]: any;
}

const Sortable: React.FC<SortableProps> = ({ list, setList, onMouseUp }) => {

  return (
    <>
      {list.map((child, i) => (
        <Item
          key={child.key}
          index={i}
          listLength={list.length}
          onMove={(prevIndex, nextIndex) => {
            const newList = [...list];
            newList.splice(nextIndex, 0, newList.splice(prevIndex, 1)[0]);
            setList(newList);
          }}
          onMouseUp={onMouseUp}
          color={child.content}
        >
        </Item>
      ))}
    </>
  );
};

export default Sortable;
