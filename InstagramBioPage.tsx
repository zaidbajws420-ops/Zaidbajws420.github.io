import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function InstagramBioPage() {
  const [bio, setBio] = useState("");

  const bioTemplates = [
    "✨ Living my best life 🌟",
    "🎨 Creative soul | 📸 Visual storyteller",
    "🌍 Exploring the world | 🎵 Music lover",
    "💼 Professional | 🚀 Entrepreneur",
    "📚 Bookworm | ☕ Coffee addict",
    "🏋️ Fitness enthusiast | 💪 Health focused",
    "🍕 Foodie | 🌮 Always hungry",
    "🎬 Movie buff | 🎮 Gamer",
    "🌸 Nature lover | 🏞️ Adventure seeker",
    "💻 Tech geek | 🤖 AI enthusiast",
    "🎭 Artist | 🖌️ Creative mind",
    "🌙 Night owl | ⭐ Dream chaser",
  ];

  const specialCharacters = [
    { char: "✨", name: "Sparkles" },
    { char: "🌟", name: "Star" },
    { char: "💫", name: "Dizzy" },
    { char: "⭐", name: "Star2" },
    { char: "🎨", name: "Artist" },
    { char: "🎭", name: "Theater" },
    { char: "🎪", name: "Circus" },
    { char: "🎬", name: "Movie" },
    { char: "🎮", name: "Game" },
    { char: "🎵", name: "Music" },
    { char: "🎸", name: "Guitar" },
    { char: "📸", name: "Camera" },
    { char: "📱", name: "Phone" },
    { char: "💻", name: "Computer" },
    { char: "🚀", name: "Rocket" },
    { char: "🌍", name: "Earth" },
    { char: "🌺", name: "Flower" },
    { char: "🌸", name: "Blossom" },
    { char: "☕", name: "Coffee" },
    { char: "🍕", name: "Pizza" },
  ];

  const generateRandomBio = () => {
    const randomBio = bioTemplates[Math.floor(Math.random() * bioTemplates.length)];
    setBio(randomBio);
    toast.success("Bio generated!");
  };

  const addCharacter = (char: string) => {
    setBio(bio + char);
  };

  const copyToClipboard = () => {
    if (bio) {
      navigator.clipboard.writeText(bio);
      toast.success("Bio copied to clipboard!");
    }
  };

  const clearBio = () => {
    setBio("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Instagram Bio Generator</h1>
            <p className="text-foreground/70 text-lg">
              Create eye-catching Instagram bios with special characters and emojis. Stand out on Instagram with unique bio ideas.
            </p>
          </div>

          {/* Tool Card */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            {/* Bio Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Your Instagram Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, 150))}
                placeholder="Type or generate your Instagram bio here..."
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground resize-none h-24"
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">{bio.length}/150 characters</p>
                <div className="flex gap-2">
                  <Button
                    onClick={copyToClipboard}
                    disabled={!bio}
                    size="sm"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    onClick={clearBio}
                    disabled={!bio}
                    size="sm"
                    variant="outline"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-secondary/50 border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-2">Preview</p>
              <p className="text-foreground break-words">{bio || "Your bio will appear here..."}</p>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateRandomBio}
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate Random Bio
            </Button>
          </div>

          {/* Bio Templates */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-primary mb-4">Bio Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bioTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => setBio(template)}
                  className="bg-card border border-border rounded-lg p-4 text-left hover:border-accent hover:shadow-md transition-all"
                >
                  <p className="text-foreground">{template}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Special Characters */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-primary mb-4">Special Characters & Emojis</h2>
            <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
              {specialCharacters.map((item, index) => (
                <button
                  key={index}
                  onClick={() => addCharacter(item.char)}
                  className="bg-card border border-border rounded-lg p-3 text-2xl hover:bg-accent/10 hover:border-accent transition-all"
                  title={item.name}
                >
                  {item.char}
                </button>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-secondary/20 border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Instagram Bio Tips</h2>
            <ul className="space-y-2 text-foreground/70">
              <li>• Keep it under 150 characters for full visibility</li>
              <li>• Use emojis to make your bio visually appealing</li>
              <li>• Include relevant keywords for discoverability</li>
              <li>• Add a call-to-action (Follow, Visit, etc.)</li>
              <li>• Update your bio regularly to keep it fresh</li>
              <li>• Use line breaks to organize information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
