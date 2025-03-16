import { useEffect, useRef, useState } from "react";
import Quagga from "quagga";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Flashlight } from "lucide-react";

interface BarcodeScannerProps {
  onDetected: (barcode: string) => void;
}

export default function BarcodeScanner({ onDetected }: BarcodeScannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [torch, setTorch] = useState(false);
  const [hasFlash, setHasFlash] = useState(false);
  const { toast } = useToast();
  const [stream, setStream] = useState<MediaStream | null>(null);

  const toggleTorch = async () => {
    if (!stream) return;

    const track = stream.getVideoTracks()[0];

    try {
      if ('torch' in track.getCapabilities()) {
        await track.applyConstraints({
          advanced: [{ torch: !torch }]
        });
        setTorch(!torch);
      } else {
        throw new Error("Flashlight not supported");
      }
    } catch (err) {
      toast({
        title: "Flashlight Error",
        description: "Your device doesn't support flashlight control",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    let lastScanned = 0;
    const scanCooldown = 2000; // 2 seconds cooldown between scans

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: containerRef.current,
          constraints: {
            facingMode: "environment",
            aspectRatio: { min: 1, max: 2 },
          },
        },
        decoder: {
          readers: ["ean_reader", "ean_8_reader", "upc_reader"],
          multiple: false,
        },
        locate: true,
      },
      async (err) => {
        if (err) {
          toast({
            title: "Camera Error",
            description: "Could not access the camera. Please check permissions.",
            variant: "destructive",
          });
          return;
        }

        // Store the media stream for torch control
        const videoTrack = Quagga.CameraAccess.getActiveTrack();
        if (videoTrack) {
          const capabilities = videoTrack.getCapabilities();
          setHasFlash('torch' in capabilities);
          setStream(new MediaStream([videoTrack]));
        }

        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      const now = Date.now();
      if (now - lastScanned < scanCooldown) return;

      lastScanned = now;
      const code = result.codeResult.code;
      if (code) {
        onDetected(code);
      }
    });

    return () => {
      Quagga.stop();
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onDetected, toast]);

  return (
    <Card className="relative overflow-hidden">
      <div ref={containerRef} className="aspect-video w-full" />
      {hasFlash && (
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm"
          onClick={toggleTorch}
        >
          <Flashlight className={torch ? "text-yellow-500" : "text-muted-foreground"} />
        </Button>
      )}
    </Card>
  );
}