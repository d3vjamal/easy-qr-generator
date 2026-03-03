import React, { useRef } from 'react';
import { ImageIcon, Upload, X, Check } from 'lucide-react';

interface IconPickerProps {
    t: (key: string) => string;
    selectedIcon: string | null;
    setSelectedIcon: (icon: string | null) => void;
}

const PREDEFINED_ICONS = [
    { path: '/icons/wifi.svg', label: 'WiFi' },
    { path: '/icons/whatsapp.svg', label: 'WhatsApp' },
    { path: '/icons/phone.svg', label: 'Phone' },
    { path: '/icons/email.svg', label: 'Email' },
    { path: '/icons/link.svg', label: 'Link' },
];

const PREDEFINED_PATHS = PREDEFINED_ICONS.map((i) => i.path);

const IconPicker: React.FC<IconPickerProps> = ({ t, selectedIcon, setSelectedIcon }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleIconClick = (path: string) => {
        setSelectedIcon(path === selectedIcon ? null : path);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setSelectedIcon(reader.result as string);
        reader.readAsDataURL(file);
        // reset so same file can be re-selected
        event.target.value = '';
    };

    const isCustom = selectedIcon && !PREDEFINED_PATHS.includes(selectedIcon);

    return (
        <div className="space-y-4">
            {/* Header */}
            <div>
                <h3 className="text-sm font-semibold flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    {t('iconPickerTitle')}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                    Embed a logo or icon in the center of your QR code
                </p>
            </div>

            {/* Icon grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PREDEFINED_ICONS.map(({ path, label }) => {
                    const active = selectedIcon === path;
                    return (
                        <button
                            key={path}
                            onClick={() => handleIconClick(path)}
                            className={`relative group flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all duration-150 hover:scale-[1.04] active:scale-95 ${active
                                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10 shadow-md shadow-violet-500/20'
                                    : 'border-border/60 bg-muted/30 hover:border-violet-300 dark:hover:border-violet-700/60'
                                }`}
                        >
                            {active && (
                                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center">
                                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                                </span>
                            )}
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${active ? 'bg-white dark:bg-card' : 'bg-background'
                                }`}>
                                <img src={path} alt={label} className="w-5 h-5" />
                            </div>
                            <span className={`text-[11px] font-medium leading-none ${active ? 'text-violet-600 dark:text-violet-400' : 'text-muted-foreground'
                                }`}>
                                {label}
                            </span>
                        </button>
                    );
                })}

                {/* Upload card */}
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative group flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 border-dashed transition-all duration-150 hover:scale-[1.04] active:scale-95 ${isCustom
                            ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10 shadow-md shadow-violet-500/20'
                            : 'border-border/60 bg-muted/20 hover:border-violet-400 hover:bg-violet-50/50 dark:hover:bg-violet-500/5'
                        }`}
                >
                    {isCustom && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </span>
                    )}
                    <div className="w-9 h-9 rounded-lg bg-background flex items-center justify-center">
                        {isCustom ? (
                            <img src={selectedIcon!} alt="custom" className="w-6 h-6 rounded object-contain" />
                        ) : (
                            <Upload className="w-5 h-5 text-muted-foreground group-hover:text-violet-500  transition-colors" />
                        )}
                    </div>
                    <span className={`text-[11px] font-medium leading-none ${isCustom ? 'text-violet-600 dark:text-violet-400' : 'text-muted-foreground'
                        }`}>
                        {isCustom ? 'Custom' : 'Upload'}
                    </span>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="sr-only"
                    />
                </button>
            </div>

            {/* Remove strip — only when something is selected */}
            {selectedIcon && (
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20">
                    <img
                        src={selectedIcon}
                        alt="selected"
                        className="w-7 h-7 rounded-lg border border-border/40 object-contain bg-white"
                    />
                    <p className="text-xs text-muted-foreground flex-1">{t('selectedIcon')}</p>
                    <button
                        onClick={() => setSelectedIcon(null)}
                        className="flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 transition-colors font-medium"
                    >
                        <X className="w-3 h-3" />
                        {t('removeIcon')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default IconPicker;
