import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calculator, Info } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function ZakatCalculator() {
  const [assets, setAssets] = useState({
    cash: '',
    gold: '',
    silver: '',
    business: '',
    stocks: ''
  });
  const [nisab, setNisab] = useState('gold'); // gold or silver
  const [zakatAmount, setZakatAmount] = useState<number | null>(null);

  // Approximate values (should be updated regularly)
  const nisabValues = {
    gold: 85 * 350, // 85 grams of gold at ~$350/gram = $29,750
    silver: 595 * 20 // 595 grams of silver at ~$20/gram = $11,900
  };

  const calculateZakat = () => {
    const total = 
      (parseFloat(assets.cash) || 0) +
      (parseFloat(assets.gold) || 0) +
      (parseFloat(assets.silver) || 0) +
      (parseFloat(assets.business) || 0) +
      (parseFloat(assets.stocks) || 0);

    const nisabThreshold = nisabValues[nisab as keyof typeof nisabValues];

    if (total >= nisabThreshold) {
      setZakatAmount(total * 0.025); // 2.5%
    } else {
      setZakatAmount(0);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1>حاسبة الزكاة</h1>
          <p className="text-sm text-muted-foreground">احسب زكاتك بدقة وفقاً للأحكام الإسلامية</p>
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="arabic-text">
          الزكاة واجبة على كل مسلم بالغ عاقل يملك النصاب لمدة عام قمري كامل. النصاب هو الحد الأدنى من المال الذي يجب عليك امتلاكه لدفع الزكاة.
        </AlertDescription>
      </Alert>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="nisab" className="arabic-text">اختر نصاب الزكاة</Label>
            <Select value={nisab} onValueChange={setNisab}>
              <SelectTrigger id="nisab" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gold">نصاب الذهب (85 جرام)</SelectItem>
                <SelectItem value="silver">نصاب الفضة (595 جرام)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-2">
              القيمة التقريبية للنصاب: ${nisabValues[nisab as keyof typeof nisabValues].toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="cash" className="arabic-text">النقد (بالدولار)</Label>
              <Input
                id="cash"
                type="number"
                placeholder="0.00"
                value={assets.cash}
                onChange={(e) => setAssets({ ...assets, cash: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="gold" className="arabic-text">قيمة الذهب (بالدولار)</Label>
              <Input
                id="gold"
                type="number"
                placeholder="0.00"
                value={assets.gold}
                onChange={(e) => setAssets({ ...assets, gold: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="silver" className="arabic-text">قيمة الفضة (بالدولار)</Label>
              <Input
                id="silver"
                type="number"
                placeholder="0.00"
                value={assets.silver}
                onChange={(e) => setAssets({ ...assets, silver: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="business" className="arabic-text">أصول التجارة (بالدولار)</Label>
              <Input
                id="business"
                type="number"
                placeholder="0.00"
                value={assets.business}
                onChange={(e) => setAssets({ ...assets, business: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="stocks" className="arabic-text">الأسهم والاستثمارات (بالدولار)</Label>
              <Input
                id="stocks"
                type="number"
                placeholder="0.00"
                value={assets.stocks}
                onChange={(e) => setAssets({ ...assets, stocks: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>

          <Button onClick={calculateZakat} className="w-full">
            احسب الزكاة
          </Button>
        </div>
      </Card>

      {zakatAmount !== null && (
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
          <div className="text-center space-y-4">
            <h2>مبلغ الزكاة المستحق</h2>
            {zakatAmount > 0 ? (
              <>
                <p className="text-4xl text-primary">${zakatAmount.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground arabic-text">
                  هذا المبلغ يمثل 2.5% من إجمالي أصولك
                </p>
                <div className="p-4 bg-background/50 rounded-lg">
                  <p className="text-sm text-muted-foreground arabic-text">
                    يمكنك دفع الزكاة للفقراء والمساكين والمستحقين الثمانية المذكورين في القرآن الكريم
                  </p>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground arabic-text">
                أصولك أقل من النصاب، لذلك لا تجب عليك الزكاة في الوقت الحالي
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
