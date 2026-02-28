import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Lock, Calculator, Download, Image, MessageSquare, QrCode, ArrowRight } from "lucide-react";

export default function Home() {
  const tools = [
    {
      id: "password-generator",
      name: "Password Generator",
      description: "Generate secure, random passwords with customizable length and character types. Perfect for creating strong passwords for any account.",
      icon: Lock,
      path: "/tools/password-generator",
      keywords: "password generator, random password, secure password",
    },
    {
      id: "age-calculator",
      name: "Age Calculator",
      description: "Calculate your exact age in years, months, and days. Instantly find out how old you are from any date.",
      icon: Calculator,
      path: "/tools/age-calculator",
      keywords: "age calculator, calculate age, date of birth",
    },
    {
      id: "youtube-thumbnail-downloader",
      name: "YouTube Thumbnail Downloader",
      description: "Download YouTube video thumbnails in high quality. Extract thumbnails from any YouTube video URL instantly.",
      icon: Download,
      path: "/tools/youtube-thumbnail-downloader",
      keywords: "youtube thumbnail downloader, download youtube thumbnail",
    },
    {
      id: "image-compressor",
      name: "Image Compressor",
      description: "Compress images without losing quality. Reduce file size for faster uploads and better web performance.",
      icon: Image,
      path: "/tools/image-compressor",
      keywords: "image compressor, compress image, image optimization",
    },
    {
      id: "instagram-bio-generator",
      name: "Instagram Bio Generator",
      description: "Create eye-catching Instagram bios with special characters and emojis. Stand out on Instagram with unique bio ideas.",
      icon: MessageSquare,
      path: "/tools/instagram-bio-generator",
      keywords: "instagram bio generator, bio ideas, instagram bio",
    },
    {
      id: "qr-code-generator",
      name: "QR Code Generator",
      description: "Generate QR codes from text, URLs, and more. Create scannable QR codes for marketing and sharing.",
      icon: QrCode,
      path: "/tools/qr-code-generator",
      keywords: "qr code generator, generate qr code, qr code",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              Free Online Utility Tools for Everyone
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed">
              MyTools provides 6 powerful, free online tools to help you with passwords, calculations, downloads, image optimization, social media, and QR codes. No registration required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Explore Tools
              </Button>
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Tools
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Choose from our collection of free, easy-to-use online tools designed to save you time and effort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link key={tool.id} href={tool.path}>
                  <div className="group h-full bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-accent transition-all duration-300 cursor-pointer">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1" />
                      <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        {tool.keywords}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">100%</div>
              <p className="text-foreground/70">Free to Use</p>
              <p className="text-sm text-muted-foreground mt-2">No hidden charges or premium subscriptions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">6+</div>
              <p className="text-foreground/70">Powerful Tools</p>
              <p className="text-sm text-muted-foreground mt-2">Growing collection of useful utilities</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">∞</div>
              <p className="text-foreground/70">No Limits</p>
              <p className="text-sm text-muted-foreground mt-2">Use as many times as you want</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Choose any tool above and start using it right now. No signup required.
            </p>
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Explore All Tools
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-primary mb-4">MyTools</h3>
              <p className="text-sm text-foreground/70">Free online utility tools for everyone</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><Link href="/tools/password-generator"><span className="hover:text-accent">Password Generator</span></Link></li>
                <li><Link href="/tools/age-calculator"><span className="hover:text-accent">Age Calculator</span></Link></li>
                <li><Link href="/tools/image-compressor"><span className="hover:text-accent">Image Compressor</span></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-4">More Tools</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><Link href="/tools/youtube-thumbnail-downloader"><span className="hover:text-accent">YouTube Thumbnail</span></Link></li>
                <li><Link href="/tools/instagram-bio-generator"><span className="hover:text-accent">Instagram Bio</span></Link></li>
                <li><Link href="/tools/qr-code-generator"><span className="hover:text-accent">QR Code Generator</span></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-accent">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent">Terms of Service</a></li>
                <li><a href="#" className="hover:text-accent">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-foreground/70">
            <p>&copy; 2026 MyTools. All rights reserved. Free online utility tools for developers and creators.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
