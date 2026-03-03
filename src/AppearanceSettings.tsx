import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Settings2 } from 'lucide-react';

interface AppearanceSettingsProps {
    t: (key: string) => string;
    size: number;
    setSize: (size: number) => void;
    level: string;
    setLevel: (level: string) => void;
}

const LEVELS = ['L', 'M', 'Q', 'H'] as const;

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
    t,
    size,
    setSize,
    level,
    setLevel,
}) => {
    return (
        <div className="space-y-5">
            <h3 className="text-sm font-semibold flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                {t('appearanceSettingsTitle')}
            </h3>

            {/* Size Slider */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-muted-foreground">{t('size')}</Label>
                    <span className="text-xs font-mono bg-muted/60 border border-border/50 px-2 py-0.5 rounded-md text-foreground">
                        {size}px
                    </span>
                </div>
                <Slider
                    value={[size]}
                    onValueChange={(value: number[]) => setSize(value[0])}
                    min={100}
                    max={500}
                    step={50}
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground/50 px-0.5">
                    <span>100px</span>
                    <span>500px</span>
                </div>
            </div>

            {/* Error Correction Level — Segmented Control */}
            <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">{t('errorCorrectionLevel')}</Label>
                <div className="grid grid-cols-4 gap-1 bg-muted/60 p-1 rounded-xl">
                    {LEVELS.map((l) => (
                        <button
                            key={l}
                            onClick={() => setLevel(l)}
                            className={`py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                                level === l
                                    ? 'bg-white dark:bg-card shadow-sm text-violet-700 dark:text-violet-400'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {l}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground/70 leading-relaxed">
                    {level === 'L' && t('levelL')}
                    {level === 'M' && t('levelM')}
                    {level === 'Q' && t('levelQ')}
                    {level === 'H' && t('levelH')}
                </p>
            </div>
        </div>
    );
};

export default AppearanceSettings;
