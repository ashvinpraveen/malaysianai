"use client";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SectionLabel {
  name: string;
  top: number;
}

interface PageCardProps {
  title: string;
  route: string;
  previewSrc: string;
  sections: SectionLabel[];
  x: number;
  y: number;
  currentZoom: number;
  onNavigate: (route: string) => void;
}

const PageCard = ({ title, route, previewSrc, sections, x, y, currentZoom, onNavigate }: PageCardProps) => {
  const zoom = 0.15;
  const fullWidth = 1440;
  const fullHeight = 4800;
  // Show labels when zoom is above 0.8
  const showLabels = currentZoom > 0.8;

  return (
    <div
      className="absolute flex flex-col"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      {/* Title above card */}
      <div className="mb-6">
        <h2 className="text-4xl font-light tracking-tight text-foreground mb-1">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground/70">{route}</p>
      </div>

      {/* Page preview card */}
      <div
        className="border-2 border-border bg-background shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow relative"
        onClick={() => onNavigate(route)}
      >
        <div
          className="relative overflow-hidden w-fit"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
        >
          <div style={{ width: `${fullWidth}px`, height: `${fullHeight}px` }} className="bg-background">
            <iframe
              title={`${title} preview`}
              src={previewSrc}
              className="h-full w-full border-0"
              loading="lazy"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </div>

        {/* Section labels - only visible when zoomed in */}
        {showLabels && sections.map((label, idx) => (
          <div
            key={idx}
            className="absolute -left-[180px] bg-foreground text-white px-3 py-1 rounded text-xs font-normal transition-opacity pointer-events-none whitespace-nowrap"
            style={{
              top: `${label.top * zoom}px`,
              opacity: showLabels ? 1 : 0,
            }}
          >
            {label.name}
          </div>
        ))}

        <div className="absolute inset-0 hover:bg-blue-500/10 transition-colors pointer-events-none" />
      </div>
    </div>
  );
};

const CanvasOverview = () => {
  const router = useRouter();
  const [currentZoom, setCurrentZoom] = useState(0.6);

  const pages: Omit<PageCardProps, "x" | "y" | "currentZoom" | "onNavigate">[] = [
    {
      title: "Home",
      route: "/",
      previewSrc: "/",
      sections: [
        { name: "Navbar", top: 0 },
        { name: "Hero", top: 100 },
        { name: "Benefits", top: 900 },
        { name: "Sponsor", top: 1500 },
        { name: "Location", top: 2100 },
        { name: "Residents", top: 2700 },
        { name: "Community Partners", top: 3300 },
        { name: "CTA", top: 3900 },
        { name: "Footer", top: 4500 },
      ]
    },
    {
      title: "Apply",
      route: "/residency/apply",
      previewSrc: "/residency/apply",
      sections: [
        { name: "Navbar", top: 0 },
        { name: "ApplicationForm", top: 100 },
      ]
    },
    {
      title: "Updates",
      route: "/blog",
      previewSrc: "/blog",
      sections: [
        { name: "Navbar", top: 0 },
        { name: "BlogList", top: 100 },
      ]
    },
    {
      title: "Privacy Policy",
      route: "/privacy",
      previewSrc: "/privacy",
      sections: [
        { name: "Navbar", top: 0 },
        { name: "PrivacyContent", top: 100 },
      ]
    },
    {
      title: "Terms of Service",
      route: "/terms",
      previewSrc: "/terms",
      sections: [
        { name: "Navbar", top: 0 },
        { name: "TermsContent", top: 100 },
      ]
    },
  ];

  // Calculate single row layout
  const scale = 0.15;
  const fullWidth = 1440;
  const cardWidth = fullWidth * scale; // ~216px
  const gap = 120; // Larger gap for single row
  const startY = 100; // Starting Y position
  const canvasHeight = 3000; // Large enough to contain full-length pages

  const pagesWithPositions = pages.map((page, index) => ({
    ...page,
    x: index * (cardWidth + gap) + gap,
    y: startY,
    currentZoom,
    onNavigate: (route: string) => router.push(route),
  }));

  return (
    <div className="w-screen h-screen bg-sand overflow-hidden">
      <TransformWrapper
        initialScale={0.6}
        minScale={0.2}
        maxScale={5}
        centerOnInit={false}
        limitToBounds={false}
        panning={{ disabled: false }}
        velocityAnimation={{ disabled: false }}
        onTransformed={(ref) => {
          setCurrentZoom(ref.state.scale);
        }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Controls */}
            <div className="absolute top-6 left-6 z-50 flex gap-2">
              <Button
                onClick={() => router.push("/")}
                variant="default"
                size="sm"
                className="shadow-md"
              >
                <Home className="w-4 h-4 mr-2" />
                Exit Canvas
              </Button>
            </div>

            <div className="absolute top-6 right-6 z-50 flex gap-2">
              <Button
                onClick={() => zoomIn()}
                variant="default"
                size="sm"
                className="shadow-md"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => zoomOut()}
                variant="default"
                size="sm"
                className="shadow-md"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => resetTransform()}
                variant="default"
                size="sm"
                className="shadow-md"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Info */}
            <div className="absolute bottom-6 left-6 z-50 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
              <p className="text-sm text-muted-foreground">
                Click any page to navigate • Drag to pan • Scroll to zoom
              </p>
            </div>

            {/* Canvas */}
            <TransformComponent
              wrapperClass="w-full h-full"
              contentClass="w-full h-full"
            >
              <div
                className="relative"
                style={{
                  width: `${pages.length * (cardWidth + gap) + gap}px`,
                  height: `${canvasHeight}px`,
                  minWidth: "100vw",
                  minHeight: "100vh",
                }}
              >
                {/* Grid background */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #ddd 1px, transparent 1px),
                      linear-gradient(to bottom, #ddd 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                    opacity: 0.3,
                  }}
                />

                {/* Page cards */}
                {pagesWithPositions.map((page) => (
                  <PageCard key={page.route} {...page} />
                ))}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default CanvasOverview;
