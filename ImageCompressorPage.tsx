import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Upload, Download } from "lucide-react";
import { toast } from "sonner";

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setCompressedImage(null);
    }
  };

  const compressImage = () => {
    if (!file) {
      toast.error("Please select an image first");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                setCompressedSize(blob.size);
                const url = URL.createObjectURL(blob);
                setCompressedImage(url);
                toast.success("Image compressed successfully!");
              }
            },
            "image/jpeg",
            quality / 100
          );
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const downloadCompressed = () => {
    if (compressedImage) {
      const a = document.createElement("a");
      a.href = compressedImage;
      a.download = `compressed-${file?.name || "image.jpg"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success("Image downloaded!");
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Image Compressor</h1>
            <p className="text-foreground/70 text-lg">
              Compress images without losing quality. Reduce file size for faster uploads and better web performance.
            </p>
          </div>

          {/* Tool Card */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            {/* File Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Select Image</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-input"
                />
                <label htmlFor="image-input" className="cursor-pointer block">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-foreground font-semibold">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG, GIF, WebP (Max 50MB)</p>
                </label>
              </div>
              {file && (
                <p className="text-sm text-foreground/70">
                  Selected: {file.name} ({formatBytes(file.size)})
                </p>
              )}
            </div>

            {/* Quality Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-primary">Compression Quality</label>
                <span className="text-lg font-bold text-accent">{quality}%</span>
              </div>
              <Slider
                value={[quality]}
                onValueChange={(value) => setQuality(value[0])}
                min={10}
                max={100}
                step={1}
              />
              <p className="text-xs text-muted-foreground">Higher = Better quality, Larger file size</p>
            </div>

            {/* Compress Button */}
            <Button
              onClick={compressImage}
              disabled={!file}
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Compress Image
            </Button>

            {/* Results */}
            {compressedImage && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 border border-border rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Original Size</p>
                    <p className="text-lg font-bold text-primary">{formatBytes(originalSize)}</p>
                  </div>
                  <div className="bg-secondary/50 border border-border rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Compressed Size</p>
                    <p className="text-lg font-bold text-accent">{formatBytes(compressedSize)}</p>
                  </div>
                </div>

                <div className="bg-secondary/50 border border-border rounded-lg p-4 text-center">
                  <p className="text-sm text-foreground/70 mb-2">Reduction</p>
                  <p className="text-2xl font-bold text-accent">
                    {Math.round(((originalSize - compressedSize) / originalSize) * 100)}%
                  </p>
                </div>

                <div className="border border-border rounded-lg overflow-hidden">
                  <img src={compressedImage} alt="Compressed" className="w-full h-auto" />
                </div>

                <Button
                  onClick={downloadCompressed}
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Compressed Image
                </Button>
              </div>
            )}
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-secondary/20 border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Image Compression Tips</h2>
            <ul className="space-y-2 text-foreground/70">
              <li>• Start with 80% quality for good balance between size and quality</li>
              <li>• Use lower quality (60-70%) for web images and social media</li>
              <li>• Keep quality above 85% for print or professional use</li>
              <li>• Compression works best with JPEG format</li>
              <li>• PNG format may not compress as much as JPEG</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
