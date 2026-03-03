import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, MessageCircle } from 'lucide-react';

interface WhatsappInfo {
    phone: string;
    message: string;
}

interface QrWhatsappFormProps {
    t: (key: string) => string;
    whatsappInfo: WhatsappInfo;
    setWhatsappInfo: (info: WhatsappInfo) => void;
}

const QrWhatsappForm: React.FC<QrWhatsappFormProps> = ({ t, whatsappInfo, setWhatsappInfo }) => {
    return (
        <div className="space-y-3">
            <div className="space-y-1.5">
                <Label htmlFor="whatsappNumber" className="text-sm font-medium">{t('whatsappNumber')}</Label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="tel"
                        id="whatsappNumber"
                        value={whatsappInfo.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWhatsappInfo({ ...whatsappInfo, phone: e.target.value })}
                        placeholder={t('whatsappNumberPlaceholder')}
                        className="pl-9"
                    />
                </div>
                <p className="text-xs text-muted-foreground">{t('whatsappNumberHelp')}</p>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="whatsappMessage" className="text-sm font-medium">{t('whatsappMessage')}</Label>
                <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                    <Textarea
                        id="whatsappMessage"
                        value={whatsappInfo.message}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setWhatsappInfo({ ...whatsappInfo, message: e.target.value })}
                        rows={4}
                        placeholder={t('whatsappMessagePlaceholder')}
                        className="pl-9 resize-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default QrWhatsappForm;
