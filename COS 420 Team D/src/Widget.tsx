import { useState, useEffect, MouseEvent } from "react";
import "./Widget.css";
import Baseball from "./Baseball";
import Hockey from "./Hockey";

/*
    The widget component gets fed its data from the individual components like baseball and hockey.
    These components handle their own formatting and functionality.
    
    If adding more components dont worry about the many functions handling the mouse and dragging,
    Just worry about adding them to the return statement and the import statement at the top.
*/


// Formatting and Functionality for the widget component
function Widget({
  initialPosition,
  widgetType,
  gridSize,
  freeCells,
  onMove,
}: {
  initialPosition: { x: number; y: number };
  widgetType: "Baseball" | "Hockey";
  gridSize: number;
  freeCells: Set<string>;
  onMove: (oldCell: string, newCell: string) => void;
}) {
  const [position, setPosition] = useState<{ x: number; y: number }>(initialPosition);
  const [dragging, setDragging] = useState<boolean>(false);
  const [rel, setRel] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const getGridCell = (x: number, y: number) => {
    const gridX = Math.floor(x / gridSize);
    const gridY = Math.floor(y / gridSize);
    return `${gridX},${gridY}`;
  };

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
    setRel({
      x: e.pageX - position.x,
      y: e.pageY - position.y,
    });
  };

  const onMouseMove = (e: globalThis.MouseEvent) => {
    if (!dragging) return;

    const newX = e.pageX - rel.x;
    const newY = e.pageY - rel.y;

    const snappedX = Math.round(newX / gridSize) * gridSize;
    const snappedY = Math.round(newY / gridSize) * gridSize;

    const newCell = getGridCell(snappedX, snappedY);
    const oldCell = getGridCell(position.x, position.y);

    if (!freeCells.has(newCell) || newCell === oldCell) {
      setPosition({ x: snappedX, y: snappedY });
      if (newCell !== oldCell) {
        onMove(oldCell, newCell);
      }
    }
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  },);
  
  // Don't worry about the stuff above its just functionality that doens't need to be changed
  return (
    <div
      id="mydiv"
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: dragging ? "grabbing" : "grab",
      }}
    >
      <div id="mydivheader" style={{ cursor: "move" }}>
        {widgetType} Widget
      </div>
      <div id="mydivcontent" style={{ width: "200px", height: "200px" }}>
        {widgetType === "Baseball" && <Baseball />}
        {widgetType === "Hockey" && <Hockey />}
        {/* Add more widget types as needed */}
      </div>
    </div>
  );
}

export default Widget;
