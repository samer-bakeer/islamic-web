import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Compass, MapPin, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  completed: boolean;
}

export function PrayerTimes() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [adhanEnabled, setAdhanEnabled] = useState(true);
  const [location, setLocation] = useState('New York, USA');

  // Mock prayer times (in real app, fetch from Aladhan.io API)
  const [prayers, setPrayers] = useState<PrayerTime[]>([
    { name: 'Fajr', arabicName: 'الفجر', time: '05:30 AM', completed: true },
    { name: 'Dhuhr', arabicName: 'الظهر', time: '12:45 PM', completed: true },
    { name: 'Asr', arabicName: 'العصر', time: '03:30 PM', completed: false },
    { name: 'Maghrib', arabicName: 'المغرب', time: '06:15 PM', completed: false },
    { name: 'Isha', arabicName: 'العشاء', time: '08:00 PM', completed: false }
  ]);

  const [qiblaDirection, setQiblaDirection] = useState(58); // degrees from North

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getNextPrayer = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    for (const prayer of prayers) {
      const [time, period] = prayer.time.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let prayerMinutes = hours * 60 + minutes;
      
      if (period === 'PM' && hours !== 12) prayerMinutes += 12 * 60;
      if (period === 'AM' && hours === 12) prayerMinutes -= 12 * 60;
      
      if (prayerMinutes > currentMinutes) {
        const diff = prayerMinutes - currentMinutes;
        const diffHours = Math.floor(diff / 60);
        const diffMinutes = diff % 60;
        return { prayer, timeLeft: `${diffHours}h ${diffMinutes}m` };
      }
    }
    return { prayer: prayers[0], timeLeft: 'غداً' };
  };

  const nextPrayer = getNextPrayer();

  const togglePrayerCompletion = (index: number) => {
    const newPrayers = [...prayers];
    newPrayers[index].completed = !newPrayers[index].completed;
    setPrayers(newPrayers);
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Compass className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1>أوقات الصلاة</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {currentTime.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {/* Next Prayer */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-primary/30">
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">الصلاة القادمة</p>
          <h2 className="text-3xl arabic-text">{nextPrayer.prayer.arabicName}</h2>
          <p className="text-2xl">{nextPrayer.prayer.time}</p>
          <Badge variant="secondary" className="text-sm">
            بعد {nextPrayer.timeLeft}
          </Badge>
        </div>
      </Card>

      {/* Prayer Times List */}
      <Card className="p-6">
        <h3 className="mb-4">مواقيت اليوم</h3>
        <div className="space-y-3">
          {prayers.map((prayer, index) => (
            <div
              key={prayer.name}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                prayer.completed ? 'bg-primary/5 border-primary/30' : 'bg-muted/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={prayer.completed}
                  onChange={() => togglePrayerCompletion(index)}
                  className="w-5 h-5 rounded border-primary text-primary focus:ring-primary"
                />
                <div>
                  <p className="arabic-text">{prayer.arabicName}</p>
                  <p className="text-xs text-muted-foreground">{prayer.name}</p>
                </div>
              </div>
              <p className={prayer.completed ? 'text-primary' : ''}>{prayer.time}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Qibla Compass */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Compass className="w-5 h-5" />
          اتجاه القبلة
        </h3>
        <div className="relative w-64 h-64 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 flex items-center justify-center">
            <div 
              className="w-full h-full rounded-full relative"
              style={{ transform: `rotate(${qiblaDirection}deg)` }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-primary origin-bottom">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-primary"></div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">اتجاه القبلة</p>
                <p className="text-2xl">{qiblaDirection}°</p>
              </div>
            </div>
          </div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">N</div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">S</div>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">W</div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">E</div>
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-6">
        <h3 className="mb-4">الإعدادات</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <Label htmlFor="adhan" className="arabic-text">تشغيل الأذان</Label>
            </div>
            <Switch
              id="adhan"
              checked={adhanEnabled}
              onCheckedChange={setAdhanEnabled}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="arabic-text">صوت المؤذن</Label>
            <p className="text-sm text-muted-foreground">مشاري راشد العفاسي</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
