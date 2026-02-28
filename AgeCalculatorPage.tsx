import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const today = new Date();
    const birth = new Date(birthDate);

    if (birth > today) {
      alert("Birth date cannot be in the future");
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Age Calculator</h1>
            <p className="text-foreground/70 text-lg">
              Calculate your exact age in years, months, and days. Find out how old you are from any date.
            </p>
          </div>

          {/* Tool Card */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            {/* Date Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">Date of Birth</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg bg-secondary/50 text-foreground"
                />
                <Button
                  onClick={calculateAge}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Age Display */}
            {age && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-accent">{age.years}</div>
                    <div className="text-sm text-foreground/70">Years</div>
                  </div>
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-accent">{age.months}</div>
                    <div className="text-sm text-foreground/70">Months</div>
                  </div>
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-accent">{age.days}</div>
                    <div className="text-sm text-foreground/70">Days</div>
                  </div>
                </div>

                <div className="bg-secondary/50 border border-border rounded-lg p-4 text-center">
                  <p className="text-foreground/70 text-sm mb-2">Total Age</p>
                  <p className="text-2xl font-bold text-primary">
                    {age.years} years, {age.months} months, and {age.days} days
                  </p>
                </div>
              </div>
            )}

            {/* Calculate Button */}
            <Button
              onClick={calculateAge}
              disabled={!birthDate}
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Calculate Age
            </Button>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-secondary/20 border border-border rounded-lg p-6">
              <h3 className="font-bold text-primary mb-2">Accurate Calculation</h3>
              <p className="text-foreground/70 text-sm">
                Get your exact age down to the day with our precise age calculator.
              </p>
            </div>
            <div className="bg-secondary/20 border border-border rounded-lg p-6">
              <h3 className="font-bold text-primary mb-2">Instant Results</h3>
              <p className="text-foreground/70 text-sm">
                See your age in years, months, and days instantly.
              </p>
            </div>
            <div className="bg-secondary/20 border border-border rounded-lg p-6">
              <h3 className="font-bold text-primary mb-2">Free & Easy</h3>
              <p className="text-foreground/70 text-sm">
                No registration needed. Use our age calculator anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
