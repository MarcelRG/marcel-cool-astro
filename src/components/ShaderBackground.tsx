import React, { useEffect, useState } from "react";

const ShaderBackground: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [MeshGradient, setMeshGradient] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadShader = async () => {
      try {
        const { MeshGradient: MG } = await import(
          "@paper-design/shaders-react"
        );
        setMeshGradient(() => MG);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load shader:", error);
        setIsLoaded(true); // Still set as loaded to show fallback
      }
    };

    loadShader();
  }, []);

  if (!isLoaded || !MeshGradient) {
    return (
      <div className="min-h-screen flex items-center justify-center overflow-hidden p-4 bg-orange-200">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden p-4 relative">
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#5100ff", "#00ff80", "#ffcc00", "#ea00ff"]}
        speed={1.0}
        wireframe={false}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ShaderBackground;
