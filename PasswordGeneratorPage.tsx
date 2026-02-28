import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (options.uppercase) chars += uppercase;
    if (options.lowercase) chars += lowercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    if (!chars) {
      toast.error("Select at least one character type");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Password Generator</h1>
            <p className="text-foreground/70 text-lg">
              Generate strong, random passwords instantly. Customize the length and character types to create secure passwords for any account.
            </p>
          </div>

          {/* Tool Card */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            {/* Password Display */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Generated Password</label>
              <div className="flex gap-2">
                <div className="flex-1 bg-secondary/50 border border-border rounded-lg p-4 font-mono text-lg text-primary break-all">
                  {password || "Click 'Generate' to create a password"}
                </div>
                <Button
                  onClick={copyToClipboard}
                  disabled={!password}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Length Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-primary">Password Length</label>
                <span className="text-lg font-bold text-accent">{length}</span>
              </div>
              <Slider
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                min={8}
                max={128}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Recommended: 12-16 characters</p>
            </div>

            {/* Character Type Options */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-primary block">Character Types</label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="uppercase"
                    checked={options.uppercase}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, uppercase: checked as boolean })
                    }
                  />
                  <label htmlFor="uppercase" className="text-foreground cursor-pointer">
                    Uppercase Letters (A-Z)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="lowercase"
                    checked={options.lowercase}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, lowercase: checked as boolean })
                    }
                  />
                  <label htmlFor="lowercase" className="text-foreground cursor-pointer">
                    Lowercase Letters (a-z)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="numbers"
                    checked={options.numbers}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, numbers: checked as boolean })
                    }
                  />
                  <label htmlFor="numbers" className="text-foreground cursor-pointer">
                    Numbers (0-9)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="symbols"
                    checked={options.symbols}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, symbols: checked as boolean })
                    }
                  />
                  <label htmlFor="symbols" className="text-foreground cursor-pointer">
                    Special Symbols (!@#$%^&*)
                  </label>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generatePassword}
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate Password
            </Button>
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-secondary/20 border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Password Security Tips</h2>
            <ul className="space-y-2 text-foreground/70">
              <li>• Use at least 12 characters for better security</li>
              <li>• Include uppercase, lowercase, numbers, and symbols</li>
              <li>• Avoid using personal information like names or birthdays</li>
              <li>• Use unique passwords for each online account</li>
              <li>• Store passwords in a secure password manager</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
