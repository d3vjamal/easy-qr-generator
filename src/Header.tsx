import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface HeaderProps {
    locale: string;
    setLocale: (locale: string) => void;
    t: (key: string) => string;
}

const Header: React.FC<HeaderProps> = ({ locale, setLocale, t }) => {
    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/85 border-b border-border/50">
            <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 h-14">
                {/* Logo + Title */}
                <div className="flex items-center gap-2.5">
                    <div className="relative flex-shrink-0">
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 opacity-50 blur-md" />
                        <img
                            src="/logo.svg"
                            alt="Logo"
                            className="relative w-8 h-8 rounded-xl object-cover"
                        />
                    </div>
                    <span className="font-bold text-sm sm:text-base bg-gradient-to-r from-violet-600 to-indigo-500 dark:from-violet-400 dark:to-indigo-300 bg-clip-text text-transparent">
                        {t('appHeader')}
                    </span>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                    <Select onValueChange={setLocale} value={locale}>
                        <SelectTrigger className="w-[100px] h-8 rounded-full bg-muted/60 border-border/50 text-xs gap-1">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en-US">🇺🇸 English</SelectItem>
                            <SelectItem value="bn-BD">🇧🇩 বাংলা</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </header>
    );
};

export default Header;
