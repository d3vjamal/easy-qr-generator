import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { ChevronDown, Palette } from 'lucide-react';

interface ColorPickerProps {
    t: (key: string) => string;
    foregroundColor: string;
    setForegroundColor: (color: string) => void;
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
    t,
    foregroundColor,
    setForegroundColor,
    backgroundColor,
    setBackgroundColor,
}) => {
    const [showFg, setShowFg] = useState(false);
    const [showBg, setShowBg] = useState(false);

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
                <Palette className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                {t('colorPickerTitle')}
            </h3>

            <div className="grid grid-cols-2 gap-3">
                {/* Foreground Color */}
                <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground font-medium">{t('foregroundColor')}</p>
                    <button
                        onClick={() => { setShowFg(!showFg); setShowBg(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/50 hover:border-violet-300 dark:hover:border-violet-700/60 transition-all text-left"
                    >
                        <span
                            className="w-5 h-5 rounded-md border border-border/40 flex-shrink-0 shadow-sm"
                            style={{ backgroundColor: foregroundColor }}
                        />
                        <span className="text-xs font-mono text-muted-foreground truncate flex-1">
                            {foregroundColor.toUpperCase()}
                        </span>
                        <ChevronDown
                            className={`w-3 h-3 text-muted-foreground/60 flex-shrink-0 transition-transform duration-200 ${showFg ? 'rotate-180' : ''}`}
                        />
                    </button>
                    {showFg && (
                        <div className="rounded-xl overflow-hidden border border-border/60 shadow-sm">
                            <SketchPicker
                                width="100%"
                                color={foregroundColor}
                                onChangeComplete={(color) => setForegroundColor(color.hex)}
                            />
                        </div>
                    )}
                </div>

                {/* Background Color */}
                <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground font-medium">{t('backgroundColor')}</p>
                    <button
                        onClick={() => { setShowBg(!showBg); setShowFg(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/50 hover:border-violet-300 dark:hover:border-violet-700/60 transition-all text-left"
                    >
                        <span
                            className="w-5 h-5 rounded-md border border-border/40 flex-shrink-0 shadow-sm"
                            style={{ backgroundColor: backgroundColor }}
                        />
                        <span className="text-xs font-mono text-muted-foreground truncate flex-1">
                            {backgroundColor.toUpperCase()}
                        </span>
                        <ChevronDown
                            className={`w-3 h-3 text-muted-foreground/60 flex-shrink-0 transition-transform duration-200 ${showBg ? 'rotate-180' : ''}`}
                        />
                    </button>
                    {showBg && (
                        <div className="rounded-xl overflow-hidden border border-border/60 shadow-sm">
                            <SketchPicker
                                width="100%"
                                color={backgroundColor}
                                onChangeComplete={(color) => setBackgroundColor(color.hex)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
