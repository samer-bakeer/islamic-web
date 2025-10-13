import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Sparkles, Sun, Moon, Clock, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Dhikr {
  arabic: string;
  transliteration: string;
  translation: string;
  count: number;
  reference: string;
}

const adhkarData = {
  morning: [
    {
      arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
      transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah",
      translation: 'We have reached the morning and the kingdom belongs to Allah, and all praise is for Allah.',
      count: 1,
      reference: 'مسلم'
    },
    {
      arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
      transliteration: "Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilaykan-nushur",
      translation: 'O Allah, by You we have reached the morning, by You we reach the evening, by You we live, by You we die, and to You is the resurrection.',
      count: 1,
      reference: 'الترمذي'
    },
    {
      arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      transliteration: "Subhan Allahi wa bihamdihi",
      translation: 'Glory is to Allah and praise is to Him.',
      count: 100,
      reference: 'البخاري'
    }
  ],
  evening: [
    {
      arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
      transliteration: "Amsayna wa amsal-mulku lillah, walhamdu lillah",
      translation: 'We have reached the evening and the kingdom belongs to Allah, and all praise is for Allah.',
      count: 1,
      reference: 'مسلم'
    },
    {
      arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَم��وتُ، وَإِلَيْكَ الْمَصِيرُ',
      transliteration: "Allahumma bika amsayna, wa bika asbahna, wa bika nahya, wa bika namutu, wa ilaykal-masir",
      translation: 'O Allah, by You we reach the evening, by You we reach the morning, by You we live, by You we die, and to You is the final return.',
      count: 1,
      reference: 'الترمذي'
    },
    {
      arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      transliteration: "Subhan Allahi wa bihamdihi",
      translation: 'Glory is to Allah and praise is to Him.',
      count: 100,
      reference: 'البخاري'
    }
  ],
  afterPrayer: [
    {
      arabic: 'سُبْحَانَ اللَّهِ',
      transliteration: "Subhan Allah",
      translation: 'Glory is to Allah.',
      count: 33,
      reference: 'متفق عليه'
    },
    {
      arabic: 'الْحَمْدُ لِلَّهِ',
      transliteration: "Alhamdulillah",
      translation: 'All praise is to Allah.',
      count: 33,
      reference: 'متفق عليه'
    },
    {
      arabic: 'اللَّهُ أَكْبَرُ',
      transliteration: "Allahu Akbar",
      translation: 'Allah is the Greatest.',
      count: 34,
      reference: 'متفق عليه'
    }
  ],
  sleep: [
    {
      arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      transliteration: "Bismika Allahumma amutu wa ahya",
      translation: 'In Your name, O Allah, I die and I live.',
      count: 1,
      reference: 'البخاري'
    },
    {
      arabic: 'اللَّهُمَّ إِنِّي أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ',
      transliteration: "Allahumma inni aslamtu nafsi ilayka, wa wajjahtu wajhi ilayka",
      translation: 'O Allah, I have submitted myself to You, and turned my face to You.',
      count: 1,
      reference: 'متفق عليه'
    }
  ]
};

export function Adhkar() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof adhkarData>('morning');
  const [counters, setCounters] = useState<{ [key: string]: number }>({});
  const [completedAdhkar, setCompletedAdhkar] = useState<Set<string>>(new Set());

  const incrementCounter = (dhikrIndex: number) => {
    const key = `${selectedCategory}-${dhikrIndex}`;
    const dhikr = adhkarData[selectedCategory][dhikrIndex];
    const currentCount = counters[key] || 0;
    
    if (currentCount < dhikr.count) {
      const newCount = currentCount + 1;
      setCounters({ ...counters, [key]: newCount });
      
      if (newCount === dhikr.count) {
        setCompletedAdhkar(new Set([...completedAdhkar, key]));
      }
    }
  };

  const resetCounter = (dhikrIndex: number) => {
    const key = `${selectedCategory}-${dhikrIndex}`;
    const newCounters = { ...counters };
    delete newCounters[key];
    setCounters(newCounters);
    
    const newCompleted = new Set(completedAdhkar);
    newCompleted.delete(key);
    setCompletedAdhkar(newCompleted);
  };

  const getProgress = () => {
    const currentAdhkar = adhkarData[selectedCategory];
    let completed = 0;
    currentAdhkar.forEach((_, index) => {
      const key = `${selectedCategory}-${index}`;
      if (completedAdhkar.has(key)) completed++;
    });
    return (completed / currentAdhkar.length) * 100;
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1>الأذكار اليومية</h1>
          <p className="text-sm text-muted-foreground">احفظ أذكارك اليومية بسهولة</p>
        </div>
      </div>

      {/* Progress */}
      <Card className="p-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm">تقدم الأذكار</p>
            <Badge variant={getProgress() === 100 ? 'default' : 'secondary'}>
              {Math.round(getProgress())}%
            </Badge>
          </div>
          <Progress value={getProgress()} />
        </div>
      </Card>

      {/* Categories */}
      <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as keyof typeof adhkarData)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="morning" className="flex items-center gap-2">
            <Sun className="w-4 h-4" />
            <span className="hidden sm:inline">الصباح</span>
          </TabsTrigger>
          <TabsTrigger value="evening" className="flex items-center gap-2">
            <Moon className="w-4 h-4" />
            <span className="hidden sm:inline">المساء</span>
          </TabsTrigger>
          <TabsTrigger value="afterPrayer" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">بعد الصلاة</span>
          </TabsTrigger>
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Moon className="w-4 h-4" />
            <span className="hidden sm:inline">النوم</span>
          </TabsTrigger>
        </TabsList>

        {Object.entries(adhkarData).map(([category, adhkar]) => (
          <TabsContent key={category} value={category} className="space-y-4 mt-6">
            {adhkar.map((dhikr, index) => {
              const key = `${category}-${index}`;
              const currentCount = counters[key] || 0;
              const isCompleted = completedAdhkar.has(key);

              return (
                <Card key={index} className={`p-6 ${isCompleted ? 'bg-primary/5 border-primary/30' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <p className="text-2xl arabic-text leading-relaxed">{dhikr.arabic}</p>
                        <p className="text-sm text-muted-foreground italic">{dhikr.transliteration}</p>
                        <p className="text-sm">{dhikr.translation}</p>
                        <Badge variant="outline" className="text-xs">
                          المرجع: {dhikr.reference}
                        </Badge>
                      </div>
                      {isCompleted && (
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20">
                          <Check className="w-6 h-6 text-primary" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t">
                      <Button
                        onClick={() => incrementCounter(index)}
                        disabled={isCompleted}
                        className="flex-1"
                        variant={isCompleted ? 'outline' : 'default'}
                      >
                        {currentCount}/{dhikr.count}
                      </Button>
                      {currentCount > 0 && (
                        <Button
                          onClick={() => resetCounter(index)}
                          variant="outline"
                          size="sm"
                        >
                          إعادة
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
