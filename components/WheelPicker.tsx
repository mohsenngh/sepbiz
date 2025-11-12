import React, { useRef, useEffect } from 'react';

interface WheelPickerProps {
  items: (string | number)[];
  onSelect: (value: string | number) => void;
  selectedValue: string | number;
}

const WheelPicker: React.FC<WheelPickerProps> = ({ items, onSelect, selectedValue }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemHeight = 40; // Corresponds to h-10 in Tailwind

  useEffect(() => {
    if (scrollRef.current) {
      const selectedIndex = items.indexOf(selectedValue);
      if (selectedIndex !== -1) {
        scrollRef.current.scrollTop = selectedIndex * itemHeight;
      }
    }
  }, [selectedValue, items, itemHeight]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const selectedIndex = Math.round(scrollTop / itemHeight);
      const selectedItem = items[selectedIndex];
      if (selectedItem !== selectedValue) {
        onSelect(selectedItem);
      }
    }
  };

  return (
    <div className="relative h-48 w-full">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
        style={{
          paddingTop: `${itemHeight * 2}px`,
          paddingBottom: `${itemHeight * 2}px`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-10 text-xl font-semibold snap-center text-gray-200"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-2/5 bg-gradient-to-b from-slate-900 to-transparent"></div>
        <div className="h-1/5 border-y-2 border-primary"></div>
        <div className="h-2/5 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>
    </div>
  );
};

export default WheelPicker;
