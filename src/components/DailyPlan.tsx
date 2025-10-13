import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Calendar, BookOpen, Sparkles, BookMarked, Trophy } from 'lucide-react';

interface PlanItem {
  id: string;
  type: 'quran' | 'adhkar' | 'hadith' | 'story';
  title: string;
  titleAr: string;
  description: string;
  duration: string;
  completed: boolean;
  timeSlot: string;
}

export function DailyPlan() {
  const [planItems, setPlanItems] = useState<PlanItem[]>([
    {
      id: '1',
      type: 'quran',
      title: 'Quran Reading',
      titleAr: 'قراءة القرآن',
      description: 'اقرأ جزء عم (صفحة واحدة)',
      duration: '10 دقائق',
      completed: false,
      timeSlot: 'بعد الفجر'
    },
    {
      id: '2',
      type: 'adhkar',
      title: 'Morning Adhkar',
      titleAr: 'أذكار الصباح',
      description: 'أكمل أذكار الصباح كاملة',
      duration: '5 دقائق',
      completed: true,
      timeSlot: 'الصباح'
    },
    {
      id: '3',
      type: 'hadith',
      title: 'Daily Hadith',
      titleAr: 'حديث اليوم',
      description: 'اقرأ وتأمل في حديث واحد',
      duration: '3 دقائق',
      completed: false,
      timeSlot: 'الظهيرة'
    },
    {
      id: '4',
      type: 'story',
      title: 'Prophetic Story',
      titleAr: 'قصة نبوية',
      description: 'اقرأ قصة من سيرة الصحابة',
      duration: '7 دقائق',
      completed: false,
      timeSlot: 'المساء'
    },
    {
      id: '5',
      type: 'adhkar',
      title: 'Evening Adhkar',
      titleAr: 'أذكار المساء',
      description: 'أكمل أذكار المساء كاملة',
      duration: '5 دقائق',
      completed: false,
      timeSlot: 'قبل المغرب'
    }
  ]);

  const toggleItem = (id: string) => {
    setPlanItems(planItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = planItems.filter(item => item.completed).length;
  const progress = (completedCount / planItems.length) * 100;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quran': return BookOpen;
      case 'adhkar': return Sparkles;
      case 'hadith': return BookMarked;
      case 'story': return BookOpen;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quran': return 'bg-primary/10 text-primary';
      case 'adhkar': return 'bg-accent/10 text-accent';
      case 'hadith': return 'bg-secondary/10 text-secondary';
      case 'story': return 'bg-primary/10 text-primary';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Calendar className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1>خطتك الروحانية اليومية</h1>
          <p className="text-sm text-muted-foreground">برنامج مخصص لك لليوم</p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-primary/30">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2>تقدم اليوم</h2>
              <p className="text-sm text-muted-foreground">
                {completedCount} من {planItems.length} مكتمل
              </p>
            </div>
            {progress === 100 && (
              <div className="flex items-center gap-2">
                <Trophy className="w-8 h-8 text-primary" />
                <Badge variant="default" className="text-sm">
                  مكتمل! 🎉
                </Badge>
              </div>
            )}
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground">
            {progress === 100 
              ? 'ممتاز! لقد أكملت خطتك اليومية. بارك الله فيك!' 
              : `استمر! باقي ${planItems.length - completedCount} من الأنشطة`}
          </p>
        </div>
      </Card>

      {/* Daily Plan Items */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          خطة اليوم
        </h3>
        
        {planItems.map((item, index) => {
          const Icon = getTypeIcon(item.type);
          
          return (
            <Card 
              key={item.id} 
              className={`p-5 transition-all ${
                item.completed 
                  ? 'bg-primary/5 border-primary/30 opacity-70' 
                  : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  id={item.id}
                  checked={item.completed}
                  onCheckedChange={() => toggleItem(item.id)}
                  className="mt-1"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className={`arabic-text mb-1 ${item.completed ? 'line-through' : ''}`}>
                        {item.titleAr}
                      </h3>
                      <p className="text-sm text-muted-foreground arabic-text">
                        {item.description}
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-full ${getTypeColor(item.type)} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>⏱️ {item.duration}</span>
                    <span>🕐 {item.timeSlot}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="mb-4">إجراءات سريعة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button variant="outline" className="justify-start">
            <Calendar className="w-4 h-4 mr-2" />
            تخصيص خطة جديدة
          </Button>
          <Button variant="outline" className="justify-start">
            <Trophy className="w-4 h-4 mr-2" />
            عرض الإنجازات
          </Button>
        </div>
      </Card>

      {/* Motivational Quote */}
      <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="text-center space-y-3">
          <Sparkles className="w-8 h-8 text-primary mx-auto" />
          <p className="text-lg arabic-text">
            "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا"
          </p>
          <p className="text-sm text-muted-foreground">
            سورة العنكبوت - الآية 69
          </p>
        </div>
      </Card>
    </div>
  );
}
