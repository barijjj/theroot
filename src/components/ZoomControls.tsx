import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  zoomLevel: number;
  minZoom: number;
  maxZoom: number;
}

const ZoomControls = ({ onZoomIn, onZoomOut, zoomLevel, minZoom, maxZoom }: ZoomControlsProps) => {
  return (
    <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-white rounded-lg shadow-lg p-2 z-20">
      <button
        onClick={onZoomOut}
        disabled={zoomLevel <= minZoom}
        className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Zoom Out"
      >
        <ZoomOut className="w-4 h-4 text-gray-600" />
      </button>
      <div className="text-sm text-gray-600 font-medium px-2">
        {Math.round(zoomLevel * 100)}%
      </div>
      <button
        onClick={onZoomIn}
        disabled={zoomLevel >= maxZoom}
        className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Zoom In"
      >
        <ZoomIn className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};

export default ZoomControls;