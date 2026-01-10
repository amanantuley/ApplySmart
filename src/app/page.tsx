import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';
import { FileText, Mail, BookMarked, ScanLine, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'hero-image');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <AppLogo className="h-6 w-6" />
            <span className="font-bold font-headline">ApplySmart</span>
          </Link>
          <nav className="flex items-center space-x-4 ml-auto">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tighter">
                Craft Your Future with ApplySmart
              </h1>
              <p className="text-lg text-muted-foreground">
                Build ATS-optimized resumes, generate powerful cover letters, and land your dream job with our AI-powered toolkit.
              </p>
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Start Building for Free
                </Link>
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              {heroImage && (
                 <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={600}
                    height={400}
                    className="w-full object-cover"
                    data-ai-hint={heroImage.imageHint}
                  />
              )}
            </div>
          </div>
        </section>
        <section className="py-20 bg-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">All The Tools You Need To Succeed</h2>
              <p className="text-muted-foreground mt-2">From resume building to interview prep, we've got you covered.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <FileText className="text-primary" />
                    Resume Builder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Create professional, ATS-friendly resumes with our step-by-step guide.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Mail className="text-primary" />
                    Cover Letters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Generate tailored cover letters in seconds with our AI assistant.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <BookMarked className="text-primary" />
                    SOP Builder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Craft compelling Statements of Purpose that stand out.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <ScanLine className="text-primary" />
                    ATS Checker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Optimize your documents and get a real-time ATS compliance score.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ApplySmart. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
