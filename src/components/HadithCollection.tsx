import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { BookMarked, Search, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';

interface Hadith {
  id: number;
  arabic: string;
  translation: string;
  narrator: string;
  source: string;
  topic: string;
}

const hadithCollection: Hadith[] = [
  {
    id: 1,
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    translation: 'Actions are judged by intentions, and every person will be rewarded according to their intention.',
    narrator: 'عمر بن الخطاب',
    source: 'صحيح البخاري',
    topic: 'sincerity'
  },
  {
    id: 2,
    arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    translation: 'Whoever believes in Allah and the Last Day should speak good or remain silent.',
    narrator: 'أبو هريرة',
    source: 'صحيح البخاري',
    topic: 'speech'
  },
  {
    id: 3,
    arabic: 'الدِّينُ النَّصِيحَةُ',
    translation: 'Religion is sincerity and sincere advice.',
    narrator: 'تميم الداري',
    source: 'صحيح مسلم',
    topic: 'sincerity'
  },
  {
    id: 4,
    arabic: 'لا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    translation: 'None of you truly believes until he loves for his brother what he loves for himself.',
    narrator: 'أنس بن مالك',
    source: 'صحيح البخاري',
    topic: 'brotherhood'
  },
  {
    id: 5,
    arabic: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',
    translation: 'A Muslim is one from whose tongue and hand other Muslims are safe.',
    narrator: 'عبد الله بن عمرو',
    source: 'صحيح البخاري',
    topic: 'character'
  },
  {
    id: 6,
    arabic: 'مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ',
    translation: 'The believers in their mutual kindness, compassion, and sympathy are just like one body.',
    narrator: 'النعمان بن بشير',
    source: 'صحيح مسلم',
    topic: 'brotherhood'
  },
  {
    id: 7,
    arabic: 'مَنْ صَلَّى الْبَرْدَيْنِ دَخَلَ الْجَنَّةَ',
    translation: 'Whoever prays the two cool prayers (Fajr and Asr) will enter Paradise.',
    narrator: 'أبو موسى الأشعري',
    source: 'صحيح البخاري',
    topic: 'prayer'
  },
  {
    id: 8,
    arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    translation: 'The best among you are those who learn the Quran and teach it.',
    narrator: 'عثمان بن عفان',
    source: 'صحيح البخاري',
    topic: 'knowledge'
  }
];

const topics = [
  { id: 'all', name: 'الكل', nameEn: 'All' },
  { id: 'sincerity', name: 'الإخلاص', nameEn: 'Sincerity' },
  { id: 'prayer', name: 'الصلاة', nameEn: 'Prayer' },
  { id: 'character', name: 'الأخلاق', nameEn: 'Character' },
  { id: 'brotherhood', name: 'الأخوة', nameEn: 'Brotherhood' },
  { id: 'knowledge', name: 'العلم', nameEn: 'Knowledge' },
  { id: 'speech', name: 'الكلام', nameEn: 'Speech' }
];

export function HadithCollection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [savedHadiths, setSavedHadiths] = useState<Set<number>>(new Set());

  const toggleSave = (id: number) => {
    const newSaved = new Set(savedHadiths);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSavedHadiths(newSaved);
  };

  const filteredHadiths = hadithCollection.filter(hadith => {
    const matchesTopic = selectedTopic === 'all' || hadith.topic === selectedTopic;
    const matchesSearch = 
      hadith.arabic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hadith.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hadith.narrator.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <BookMarked className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1>مجموعة الأحاديث</h1>
          <p className="text-sm text-muted-foreground">أحاديث صحيحة من البخاري ومسلم</p>
        </div>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="ابحث في الأحاديث..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Topics */}
      <Tabs value={selectedTopic} onValueChange={setSelectedTopic} className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="inline-flex w-max">
            {topics.map(topic => (
              <TabsTrigger key={topic.id} value={topic.id} className="arabic-text">
                {topic.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>

        <TabsContent value={selectedTopic} className="space-y-4 mt-6">
          {filteredHadiths.length === 0 ? (
            <Card className="p-12">
              <div className="text-center text-muted-foreground">
                <p>لم يتم العثور على أحاديث</p>
              </div>
            </Card>
          ) : (
            filteredHadiths.map(hadith => (
              <Card key={hadith.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-4">
                      <p className="text-xl arabic-text leading-relaxed">
                        {hadith.arabic}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {hadith.translation}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSave(hadith.id)}
                      className={savedHadiths.has(hadith.id) ? 'text-destructive' : ''}
                    >
                      <Heart 
                        className="w-5 h-5" 
                        fill={savedHadiths.has(hadith.id) ? 'currentColor' : 'none'}
                      />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <Badge variant="outline" className="arabic-text">
                      الراوي: {hadith.narrator}
                    </Badge>
                    <Badge variant="secondary">
                      {hadith.source}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Stats */}
      <Card className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl text-primary">{hadithCollection.length}</p>
            <p className="text-sm text-muted-foreground">إجمالي الأحاديث</p>
          </div>
          <div>
            <p className="text-2xl text-accent">{filteredHadiths.length}</p>
            <p className="text-sm text-muted-foreground">نتائج البحث</p>
          </div>
          <div>
            <p className="text-2xl text-secondary">{savedHadiths.size}</p>
            <p className="text-sm text-muted-foreground">المحفوظة</p>
          </div>
          <div>
            <p className="text-2xl text-primary">{topics.length - 1}</p>
            <p className="text-sm text-muted-foreground">المواضيع</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
