import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { BookOpen, Users, Heart, Swords } from 'lucide-react';
import { Button } from './ui/button';

interface Story {
  id: number;
  title: string;
  titleAr: string;
  category: string;
  excerpt: string;
  content: string;
  lesson: string;
  icon: React.ElementType;
}

const stories: Story[] = [
  {
    id: 1,
    title: 'The Kindness of Prophet Muhammad ﷺ',
    titleAr: 'رحمة النبي محمد ﷺ',
    category: 'mercy',
    excerpt: 'كان النبي ﷺ أرحم الناس',
    content: 'كان النبي محمد ﷺ مثالاً للرحمة في كل جوانب حياته. حتى مع أعدائه، كان يظهر الرحمة والعفو. عندما فتح مكة، عفا عن جميع الذين آذوه وحاربوه، قائلاً: "اذهبوا فأنتم الطلقاء".',
    lesson: 'الرحمة والعفو من أعظم الصفات التي يجب أن يتحلى بها المسلم',
    icon: Heart
  },
  {
    id: 2,
    title: 'The Patience of Prophet Ayub عليه السلام',
    titleAr: 'صبر النبي أيوب عليه السلام',
    category: 'patience',
    excerpt: 'قصة الصبر العظيم',
    content: 'ابتلى الله النبي أيوب بفقدان ماله وأولاده وصحته، ولكنه ظل صابراً شاكراً لله. لم يشتكِ ولم يتذمر، بل ظل يذكر الله ويحمده. وبعد سنوات من الصبر، رد الله عليه صحته وماله وأولاده.',
    lesson: 'الصبر على البلاء والثقة بالله من أعظم العبادات',
    icon: Heart
  },
  {
    id: 3,
    title: 'Abu Bakr As-Siddiq: The Truthful',
    titleAr: 'أبو بكر الصديق: الصديق الأول',
    category: 'companions',
    excerpt: 'أول من آمن من الرجال',
    content: 'كان أبو بكر رضي الله عنه أول من آمن من الرجال، وكان أقرب الناس إلى النبي ﷺ. لم يتردد لحظة في تصديق النبي في حادثة الإسراء والمعراج، ولذلك سمي بالصديق. أنفق كل ماله في سبيل الله ونصرة الدين.',
    lesson: 'الصدق والإيمان الراسخ أساس العلاقة مع الله',
    icon: Users
  },
  {
    id: 4,
    title: 'The Battle of Badr: First Victory',
    titleAr: 'غزوة بدر: النصر الأول',
    category: 'battles',
    excerpt: 'يوم الفرقان',
    content: 'في غزوة بدر، كان المسلمون قلة والمشركون كثرة. لكن المسلمين توكلوا على الله وصبروا، فنصرهم الله نصراً مؤزراً. كان عدد المسلمين حوالي 313 والمشركين أكثر من 1000، ولكن الله أنزل ملائكة تقاتل مع المسلمين.',
    lesson: 'النصر من عند الله، والتوكل عليه سبب للفوز',
    icon: Swords
  },
  {
    id: 5,
    title: 'Umar ibn Al-Khattab: The Just',
    titleAr: 'عمر بن الخطاب: الفاروق',
    category: 'companions',
    excerpt: 'العادل الذي فرق بين الحق والباطل',
    content: 'كان عمر رضي الله عنه مثالاً في العدل والقوة. لما أسلم، عز الإسلام وظهر المسلمون. كان يخاف منه الشيطان ويهابه الظالمون. كان ينام تحت الشجرة وهو خليفة المسلمين، لأنه ��دل فأمن فنام.',
    lesson: 'العدل والقوة في الحق من صفات القادة الحقيقيين',
    icon: Users
  },
  {
    id: 6,
    title: 'The Generosity of Uthman ibn Affan',
    titleAr: 'كرم عثمان بن عفان',
    category: 'companions',
    excerpt: 'ذو النورين',
    content: 'اشترى عثمان رضي الله عنه بئر رومة وجعلها للمسلمين، وجهز جيش العسرة بماله الخاص. كان من أكثر الصحابة كرماً وإنفاقاً في سبيل الله. لقب بذي النورين لأنه تزوج ابنتي النبي ﷺ.',
    lesson: 'الكرم والإنفاق في سبيل الله من أعظم القربات',
    icon: Users
  }
];

const categories = [
  { id: 'all', name: 'الكل', nameEn: 'All', icon: BookOpen },
  { id: 'mercy', name: 'الرحمة', nameEn: 'Mercy', icon: Heart },
  { id: 'patience', name: 'الصبر', nameEn: 'Patience', icon: Heart },
  { id: 'companions', name: 'الصحابة', nameEn: 'Companions', icon: Users },
  { id: 'battles', name: 'الغزوات', nameEn: 'Battles', icon: Swords }
];

export function PropheticStories() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const filteredStories = selectedCategory === 'all' 
    ? stories 
    : stories.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1>قصص الأنبياء والصحابة</h1>
          <p className="text-sm text-muted-foreground">قصص موثقة من السيرة النبوية</p>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => {
              setSelectedCategory(category.id);
              setSelectedStory(null);
            }}
            className="flex items-center gap-2"
          >
            <category.icon className="w-4 h-4" />
            <span className="arabic-text text-sm">{category.name}</span>
          </Button>
        ))}
      </div>

      {selectedStory ? (
        /* Story Detail */
        <Card className="p-8">
          <Button
            variant="ghost"
            onClick={() => setSelectedStory(null)}
            className="mb-6"
          >
            ← العودة للقصص
          </Button>
          
          <div className="space-y-6">
            <div className="text-center space-y-3 pb-6 border-b">
              <h2 className="text-3xl arabic-text">{selectedStory.titleAr}</h2>
              <p className="text-lg text-muted-foreground">{selectedStory.title}</p>
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-accent/5 rounded-lg">
                <p className="leading-relaxed arabic-text text-lg">
                  {selectedStory.content}
                </p>
              </div>

              <div className="p-6 bg-primary/5 rounded-lg border-l-4 border-primary">
                <h3 className="mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  العبرة والدرس
                </h3>
                <p className="text-muted-foreground arabic-text">
                  {selectedStory.lesson}
                </p>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        /* Stories List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStories.map(story => (
            <Card 
              key={story.id} 
              className="p-6 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <story.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="arabic-text mb-2">{story.titleAr}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{story.title}</p>
                    <p className="text-sm arabic-text text-muted-foreground line-clamp-2">
                      {story.excerpt}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <Badge variant="outline">
                    {categories.find(c => c.id === story.category)?.name}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    اقرأ المزيد →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Stats */}
      {!selectedStory && (
        <Card className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl text-primary">{stories.length}</p>
              <p className="text-sm text-muted-foreground">إجمالي القصص</p>
            </div>
            <div>
              <p className="text-2xl text-accent">{filteredStories.length}</p>
              <p className="text-sm text-muted-foreground">في هذا القسم</p>
            </div>
            <div>
              <p className="text-2xl text-secondary">{categories.length - 1}</p>
              <p className="text-sm text-muted-foreground">التصنيفات</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
