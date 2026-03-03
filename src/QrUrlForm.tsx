import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'lucide-react';

interface QrUrlFormProps {
    t: (key: string) => string;
    urlInput: string;
    setUrlInput: React.Dispatch<React.SetStateAction<string>>;
}

const QrUrlForm: React.FC<QrUrlFormProps> = ({ t, urlInput, setUrlInput }) => {
    return (
        <div className="space-y-1.5">
            <Label htmlFor="url" className="text-sm font-medium">{t('websiteUrl')}</Label>
            <div className="relative">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                    type="text"
                    id="url"
                    placeholder={t('urlPlaceholder')}
                    value={urlInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrlInput(e.target.value)}
                    className="pl-9"
                />
            </div>
            <p className="text-xs text-muted-foreground">{t('urlHelp')}</p>
        </div>
    );
};

export default QrUrlForm;
