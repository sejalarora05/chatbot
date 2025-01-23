import React, { useEffect, useState } from 'react';

const ElevenLabsWidget = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if the custom element is already defined
    if (!customElements.get('elevenlabs-convai')) {
      const script = document.createElement('script');
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.type = "text/javascript";

      script.onload = () => {
        setScriptLoaded(true); // Set state when the script has loaded
      };

      script.onerror = () => {
        console.error("Error loading the ElevenLabs script");
      };

      document.body.appendChild(script);

      // Cleanup: remove the script when the component is unmounted
      return () => {
        document.body.removeChild(script);
      };
    } else {
      setScriptLoaded(true); // If the custom element is already registered, mark script as loaded
    }
  }, []);

  if (!scriptLoaded) {
    return <div>Loading widget...</div>; // Show a loading state until the script is loaded
  }

  return (
    <div>
      {/* Render widget only after the script has loaded */}
      <elevenlabs-convai 
        style={{
          position: 'relative',
          // zIndex: 1, // Ensure proper stacking order
          cursor: 'default', // Remove the 'move' cursor since it's no longer draggable
          top: '-29px', // Set an initial position (optional)
          left: '1px', // Set an initial position (optional)
        }} 
        agent-id="EPxGVFqU8yzqoFTUWDMw"
      ></elevenlabs-convai>
    </div>
  );
};

export default ElevenLabsWidget;
