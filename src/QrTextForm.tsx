import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageSquare } from 'lucide-react';

interface QrTextFormProps {
    t: (key: string) => string;
    textInput: string;
    setTextInput: React.Dispatch<React.SetStateAction<string>>;
}

const QrTextForm: React.FC<QrTextFormProps> = ({ t, textInput, setTextInput }) => {
    return (
        <div className="space-y-1.5">
            <Label htmlFor="text" className="text-sm font-medium">{t('textContent')}</Label>
            <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                <Textarea
                    id="text"
                    placeholder={t('textPlaceholder')}
                    value={textInput}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextInput(e.target.value)}
                    rows={4}
                    className="pl-9 resize-none"
                />
            </div>
        </div>
    );
};

export default QrTextForm;
