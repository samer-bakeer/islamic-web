import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { BookOpen, Clock, Heart, Star, Sparkles, Moon, Sun } from 'lucide-react';

interface HomeProps {
  userProgress: {
    quranProgress: number;
    adhkarStreak: number;
    totalGoodDeeds: number;
  };
}

export function Home({ userProgress }: HomeProps) {
  const [greeting, setGreeting] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour >= 4 && hour < 12) {
      setGreeting('صباح الخير');
      setMessage('هل بدأت يومك بالذكر؟ 🌸');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('مساء النور');
      setMessage('لا تنسى أذكار المساء 🌅');
    } else {
      setGreeting('مساء الهدوء');
      setMessage('لا تنسى أذكار المساء 🌙');
    }
  }, []);

  const achievements = [
    { 
      name: 'قارئ القرآن', 
      description: 'أكمل 10 أجزاء',
      earned: userProgress.quranProgress >= 10,
      icon: BookOpen
    },
    { 
      name: 'ذاكر مستمر', 
      description: 'سلسلة 7 أيام من الأذكار',
      earned: userProgress.adhkarStreak >= 7,
      icon: Sparkles
    },
    { 
      name: 'محب العمل الصالح', 
      description: 'أكمل 50 عملاً صالحاً',
      earned: userProgress.totalGoodDeeds >= 50,
      icon: Heart
    }
  ];

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Daily Greeting */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-primary/20">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            {new Date().getHours() < 17 ? (
              <Sun className="w-8 h-8 text-primary" />
            ) : (
              <Moon className="w-8 h-8 text-accent" />
            )}
          </div>
          <h1 className="text-3xl arabic-text">{greeting}</h1>
          <p className="text-muted-foreground arabic-text">{message}</p>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">تقدم القرآن</p>
              <p className="text-2xl">{userProgress.quranProgress}/30</p>
            </div>
          </div>
          <Progress value={(userProgress.quranProgress / 30) * 100} className="mt-4" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">سلسلة الأذكار</p>
              <p className="text-2xl">{userProgress.adhkarStreak} أيام</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <Heart className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">أعمال صالحة</p>
              <p className="text-2xl">{userProgress.totalGoodDeeds}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-primary" />
          <h2>الإنجازات</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${
                achievement.earned
                  ? 'bg-primary/5 border-primary/30'
                  : 'bg-muted/30 border-border opacity-50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <achievement.icon className={`w-6 h-6 ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                {achievement.earned && <Badge variant="default" className="text-xs">تم الإنجاز</Badge>}
              </div>
              <h3 className="text-sm arabic-text">{achievement.name}</h3>
              <p className="text-xs text-muted-foreground arabic-text mt-1">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Today's Verse */}
      <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="space-y-4">
          <h3 className="text-center">آية اليوم</h3>
          <p className="text-xl arabic-text text-center leading-relaxed">
            إِنَّ مَعَ الْعُسْرِ يُسْرًا
          </p>
          <p className="text-center text-sm text-muted-foreground">
            "فإن مع العسر يسرا" - سورة الشرح، الآية 6
          </p>
          <div className="p-4 bg-background/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              كيف يمكنك تطبيق هذه الآية في حياتك اليوم؟
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
