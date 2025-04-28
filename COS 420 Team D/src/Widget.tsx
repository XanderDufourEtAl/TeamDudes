import { useState, MouseEvent } from "react";
import "./Widget.css";
import Baseball from "./Baseball";
import Hockey from "./Hockey";

// Formatting and Functionality for the widget component
function Widget({
  initialPosition,
  widgetType,
}: {
  initialPosition: { x: number; y: number };
  widgetType: "Baseball" | "Hockey";// Add more types of tsx elements as needed
}) {
  const [position, setPosition] = useState<{ x: number; y: number }>(initialPosition);
  const [dragging, setDragging] = useState<boolean>(false);
  const [rel, setRel] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
    setRel({
      x: e.pageX - position.x,
      y: e.pageY - position.y,
    });
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - rel.x,
      y: e.clientY - rel.y,
    });
  };

  const onMouseUp = () => {
    setDragging(false);
  };
  return (
    <div
      id="mydiv"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
      }}
    >
      <div
        id="mydivheader"
        onMouseDown={onMouseDown}
        style={{ cursor: "move" }}
      >
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
