import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function YouTubeThumbnailPage() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [thumbnails, setThumbnails] = useState<{ quality: string; url: string }[]>([]);

  const extractVideoId = (youtubeUrl: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = youtubeUrl.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleExtract = () => {
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    const id = extractVideoId(url);
    if (!id) {
      toast.error("Invalid YouTube URL. Please check and try again.");
      return;
    }

    setVideoId(id);
    const thumbs = [
      { quality: "Maximum Resolution (1280x720)", url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg` },
      { quality: "High Quality (480x360)", url: `https://img.youtube.com/vi/${id}/hqdefault.jpg` },
      { quality: "Medium Quality (320x180)", url: `https://img.youtube.com/vi/${id}/mqdefault.jpg` },
      { quality: "Standard Quality (120x90)", url: `https://img.youtube.com/vi/${id}/default.jpg` },
    ];
    setThumbnails(thumbs);
    toast.success("Thumbnails extracted successfully!");
  };

  const downloadImage = (imageUrl: string, quality: string) => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `youtube-thumbnail-${quality.split(" ")[0]}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Thumbnail downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">YouTube Thumbnail Downloader</h1>
            <p className="text-foreground/70 text-lg">
              Download YouTube video thumbnails in high quality. Extract thumbnails from any YouTube video URL instantly.
            </p>
          </div>

          {/* Tool Card */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            {/* URL Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">YouTube URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1 px-4 py-2 border border-border rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground"
                  onKeyPress={(e) => e.key === "Enter" && handleExtract()}
                />
                <Button
                  onClick={handleExtract}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Extract
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Paste any YouTube video URL (youtube.com, youtu.be, etc.)
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">How to use:</p>
                <p>Paste a YouTube video URL and click "Extract" to get all available thumbnail sizes.</p>
              </div>
            </div>

            {/* Thumbnails Grid */}
            {thumbnails.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-primary">Available Thumbnails</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {thumbnails.map((thumb, index) => (
                    <div key={index} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={thumb.url}
                        alt={thumb.quality}
                        className="w-full h-auto bg-secondary/50"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect fill='%23e2e8f0' width='320' height='180'/%3E%3C/svg%3E";
                        }}
                      />
                      <div className="p-4 bg-card">
                        <p className="text-sm font-semibold text-primary mb-3">{thumb.quality}</p>
                        <Button
                          onClick={() => downloadImage(thumb.url, thumb.quality)}
                          size="sm"
                          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-secondary/20 border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Tips for Using YouTube Thumbnails</h2>
            <ul className="space-y-2 text-foreground/70">
              <li>• Use high-resolution thumbnails (1280x720) for best quality</li>
              <li>• Thumbnails are public and provided by YouTube</li>
              <li>• Perfect for creating video compilations or references</li>
              <li>• Respect copyright and YouTube's terms of service</li>
              <li>• Maximum resolution may not be available for all videos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
