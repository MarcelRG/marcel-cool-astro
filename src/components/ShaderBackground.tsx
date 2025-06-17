import React, { useEffect, useState, useCallback, memo } from "react";

interface ShaderBackgroundProps {
  children: React.ReactNode;
}

const ShaderBackground: React.FC<ShaderBackgroundProps> = memo(
  ({ children }) => {
    const [MeshGradient, setMeshGradient] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const loadShader = useCallback(async () => {
      try {
        const { MeshGradient: MG } = await import(
          "@paper-design/shaders-react"
        );
        setMeshGradient(() => MG);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load shader:", error);
        setHasError(true);
        setIsLoaded(true); // Still set as loaded to show fallback
      }
    }, []);

    useEffect(() => {
      // Only load if not already loaded or errored
      if (!isLoaded && !hasError) {
        loadShader();
      }
    }, [loadShader, isLoaded, hasError]);

    // Fallback UI with consistent styling
    if (!isLoaded || !MeshGradient || hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center overflow-hidden p-4 bg-gradient-to-br from-orange-200 via-pink-200 to-purple-200">
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
  }
);

ShaderBackground.displayName = "ShaderBackground";

export default ShaderBackground;
