import { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleColorChange = (color) => {
    onChange(color.hex);
  };

  return (
    <div className="relative" ref={pickerRef}>
      <div
        className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => setShowPicker(!showPicker)}
      />
      {showPicker && (
        <div className="absolute mt-2 z-10">
          <SketchPicker color={color} onChangeComplete={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
