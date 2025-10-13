import { useState } from 'react';
import { Home } from './components/Home';
import { ZakatCalculator } from './components/ZakatCalculator';
import { QuranReader } from './components/QuranReader';
import { PrayerTimes } from './components/PrayerTimes';
import { Adhkar } from './components/Adhkar';
import { HadithCollection } from './components/HadithCollection';
import { PropheticStories } from './components/PropheticStories';
import { DailyPlan } from './components/DailyPlan';
import { Button } from './components/ui/button';
import { 
  Home as HomeIcon, 
  BookOpen, 
  Clock, 
  Sparkles, 
  BookMarked, 
  Users, 
  Calculator,
  Calendar,
  Moon,
  Sun
} from 'lucide-react';

type Page = 'home' | 'quran' | 'prayer' | 'adhkar' | 'hadith' | 'stories' | 'zakat' | 'plan';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [darkMode, setDarkMode] = useState(false);
  
  // Mock user progress data
  const userProgress = {
    quranProgress: 15, // out of 30 juz
    adhkarStreak: 7,   // days
    totalGoodDeeds: 42
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home userProgress={userProgress} />;
      case 'quran':
        return <QuranReader />;
      case 'prayer':
        return <PrayerTimes />;
      case 'adhkar':
        return <Adhkar />;
      case 'hadith':
        return <HadithCollection />;
      case 'stories':
        return <PropheticStories />;
      case 'zakat':
        return <ZakatCalculator />;
      case 'plan':
        return <DailyPlan />;
      default:
        return <Home userProgress={userProgress} />;
    }
  };

  const navItems = [
    { id: 'home' as Page, icon: HomeIcon, label: 'الرئيسية', labelEn: 'Home' },
    { id: 'plan' as Page, icon: Calendar, label: 'الخطة', labelEn: 'Plan' },
    { id: 'quran' as Page, icon: BookOpen, label: 'القرآن', labelEn: 'Quran' },
    { id: 'prayer' as Page, icon: Clock, label: 'الصلاة', labelEn: 'Prayer' },
    { id: 'adhkar' as Page, icon: Sparkles, label: 'الأذكار', labelEn: 'Adhkar' },
    { id: 'hadith' as Page, icon: BookMarked, label: 'الأحاديث', labelEn: 'Hadith' },
    { id: 'stories' as Page, icon: Users, label: 'القصص', labelEn: 'Stories' },
    { id: 'zakat' as Page, icon: Calculator, label: 'الزكاة', labelEn: 'Zakat' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl arabic-text">رفيقي الروحاني</h1>
              <p className="text-xs text-muted-foreground">دليلك اليومي للعبادة</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden md:block border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-2">
            {navItems.map(item => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                onClick={() => setCurrentPage(item.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <item.icon className="w-4 h-4" />
                <span className="arabic-text">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-20 md:pb-8">
        {renderPage()}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.slice(0, 4).map(item => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'default' : 'ghost'}
              onClick={() => setCurrentPage(item.id)}
              className="flex flex-col gap-1 h-auto py-2"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs arabic-text">{item.label}</span>
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1 p-2 pt-0">
          {navItems.slice(4).map(item => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'default' : 'ghost'}
              onClick={() => setCurrentPage(item.id)}
              className="flex flex-col gap-1 h-auto py-2"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs arabic-text">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
}
