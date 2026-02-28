import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Download, Copy } from "lucide-react";
import { toast } from "sonner";

export default function QRCodeGeneratorPage() {
  const [input, setInput] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [size, setSize] = useState(300);

  useEffect(() => {
    if (input) {
      generateQRCode();
    }
  }, [size]);

  const generateQRCode = () => {
    if (!input.trim()) {
      toast.error("Please enter text or URL");
      return;
    }

    const encodedInput = encodeURIComponent(input);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedInput}`;
    setQrCode(qrUrl);
    toast.success("QR Code generated!");
  };

  const downloadQRCode = () => {
    if (qrCode) {
      const a = document.createElement("a");
      a.href = qrCode;
      a.download = "qr-code.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success("QR Code downloaded!");
    }
  };

  const copyQRLink = () => {
    if (qrCode) {
      navigator.clipboard.writeText(qrCode);
      toast.success("QR Code link copied!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">QR Code Generator</h1>
            <p className="text-foreground/70 text-lg">
              Generate QR codes from text, URLs, and more. Create scannable QR codes for marketing and sharing.
            </p>
          </div>

          {/* Tool Card */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            {/* Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Text or URL</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text, URL, email, phone number, or any data..."
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground resize-none h-20"
              />
            </div>

            {/* Size Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-primary">QR Code Size</label>
                <span className="text-lg font-bold text-accent">{size}px</span>
              </div>
              <input
                type="range"
                min="200"
                max="1000"
                step="50"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateQRCode}
              disabled={!input.trim()}
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Generate QR Code
            </Button>

            {/* QR Code Display */}
            {qrCode && (
              <div className="space-y-4">
                <div className="bg-white border border-border rounded-lg p-6 flex justify-center">
                  <img src={qrCode} alt="QR Code" className="max-w-full" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={downloadQRCode}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={copyQRLink}
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Use Cases */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-primary mb-4">QR Code Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary/20 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">📱 Mobile Marketing</h3>
                <p className="text-sm text-foreground/70">Direct customers to websites, apps, or promotions</p>
              </div>
              <div className="bg-secondary/20 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">📧 Contact Information</h3>
                <p className="text-sm text-foreground/70">Share email, phone, or vCard details instantly</p>
              </div>
              <div className="bg-secondary/20 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">🎫 Event Tickets</h3>
                <p className="text-sm text-foreground/70">Generate codes for event registration and check-in</p>
              </div>
              <div className="bg-secondary/20 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">📦 Product Tracking</h3>
                <p className="text-sm text-foreground/70">Link products to detailed information or reviews</p>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-secondary/20 border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-primary mb-4">QR Code Tips</h2>
            <ul className="space-y-2 text-foreground/70">
              <li>• Use larger sizes (500px+) for print materials</li>
              <li>• Test your QR code before sharing it</li>
              <li>• Ensure good contrast between foreground and background</li>
              <li>• Include a call-to-action near the QR code</li>
              <li>• QR codes can encode URLs, text, emails, phone numbers, and more</li>
              <li>• Most smartphones can scan QR codes with the camera app</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
