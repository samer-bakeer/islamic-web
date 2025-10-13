import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { BookOpen, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';

const sampleVerses = [
  {
    surah: 'الفاتحة',
    surahNumber: 1,
    verse: 1,
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
    tafsir: 'البسملة هي افتتاح كل عمل صالح، وفيها استعانة بالله وتبرك باسمه'
  },
  {
    surah: 'الفاتحة',
    surahNumber: 1,
    verse: 2,
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    translation: 'All praise is due to Allah, Lord of the worlds.',
    tafsir: 'الحمد لله على جميع نعمه الظاهرة والباطنة، فهو رب العالمين ومدبر أمورهم'
  },
  {
    surah: 'الفاتحة',
    surahNumber: 1,
    verse: 3,
    arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
    translation: 'The Entirely Merciful, the Especially Merciful.',
    tafsir: 'الرحمن الرحيم: صفتان من صفات الله تعالى تدلان على سعة رحمته'
  },
  {
    surah: 'الفاتحة',
    surahNumber: 1,
    verse: 4,
    arabic: 'مَالِكِ يَوْمِ الدِّينِ',
    translation: 'Sovereign of the Day of Recompense.',
    tafsir: 'هو المالك يوم القيامة، يوم الجزاء والحساب'
  },
  {
    surah: 'الفاتحة',
    surahNumber: 1,
    verse: 5,
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    translation: 'It is You we worship and You we ask for help.',
    tafsir: 'هذه الآية تجمع بين التوحيد والاستعانة بالله وحده'
  }
];

export function QuranReader() {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dailyProgress, setDailyProgress] = useState(5); // verses read today
  const dailyGoal = 20; // verses per day

  const handleNext = () => {
    if (currentVerse < sampleVerses.length - 1) {
      setCurrentVerse(currentVerse + 1);
      setDailyProgress(Math.min(dailyProgress + 1, dailyGoal));
    }
  };

  const handlePrevious = () => {
    if (currentVerse > 0) {
      setCurrentVerse(currentVerse - 1);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1>قارئ القرآن</h1>
          <p className="text-sm text-muted-foreground">اقرأ القرآن الكريم مع التفسير والتلاوة</p>
        </div>
      </div>

      {/* Daily Reading Progress */}
      <Card className="p-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm arabic-text">هدف القراءة اليومي</p>
            <p className="text-sm">{dailyProgress}/{dailyGoal} آيات</p>
          </div>
          <Progress value={(dailyProgress / dailyGoal) * 100} />
          <p className="text-xs text-muted-foreground">
            استمر! أنت على بعد {dailyGoal - dailyProgress} آية من إكمال هدفك اليومي
          </p>
        </div>
      </Card>

      {/* Verse Display */}
      <Card className="p-8">
        <Tabs defaultValue="verse" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="verse">الآية</TabsTrigger>
            <TabsTrigger value="tafsir">التفسير</TabsTrigger>
          </TabsList>
          
          <TabsContent value="verse" className="space-y-6 mt-6">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                سورة {sampleVerses[currentVerse].surah} - الآية {sampleVerses[currentVerse].verse}
              </p>
              <p className="text-3xl arabic-text leading-relaxed py-8">
                {sampleVerses[currentVerse].arabic}
              </p>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                {sampleVerses[currentVerse].translation}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="tafsir" className="mt-6">
            <ScrollArea className="h-[300px]">
              <div className="space-y-4 p-4">
                <h3 className="arabic-text">التفسير الموجز</h3>
                <p className="text-muted-foreground arabic-text leading-relaxed">
                  {sampleVerses[currentVerse].tafsir}
                </p>
                <div className="p-4 bg-accent/10 rounded-lg mt-4">
                  <p className="text-sm">
                    💭 كيف يمكنك تطبيق هذه الآية في حياتك اليوم؟
                  </p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Audio Controls */}
        <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t">
          <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentVerse === 0}>
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button size="icon" onClick={togglePlay} className="w-14 h-14">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleNext} 
            disabled={currentVerse === sampleVerses.length - 1}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Quick Navigation */}
      <Card className="p-6">
        <h3 className="mb-4">التنقل السريع</h3>
        <div className="grid grid-cols-5 gap-2">
          {sampleVerses.map((verse, index) => (
            <Button
              key={index}
              variant={currentVerse === index ? 'default' : 'outline'}
              onClick={() => setCurrentVerse(index)}
              className="aspect-square"
            >
              {verse.verse}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
