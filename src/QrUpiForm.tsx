import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, User, MessageSquare, IndianRupee } from 'lucide-react';

interface UPIInfo {
    upiId: string;
    amount: string;
    recipientName: string;
    note: string;
}

interface QrUpiFormProps {
    t: (key: string) => string;
    upiInfo: UPIInfo;
    setUpiInfo: React.Dispatch<React.SetStateAction<UPIInfo>>;
    validateUpiId: (upiId: string) => boolean;
    validateAmount: (amount: string) => boolean;
    handleAmountChange: (value: string) => void;
}

const QrUpiForm: React.FC<QrUpiFormProps> = ({ t, upiInfo, setUpiInfo, validateUpiId, validateAmount, handleAmountChange }) => {
    return (
        <div className="space-y-3">
            <div className="space-y-1.5">
                <Label htmlFor="upiId" className="text-sm font-medium">{t('upiId')}</Label>
                <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="text"
                        id="upiId"
                        value={upiInfo.upiId}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpiInfo({ ...upiInfo, upiId: e.target.value })}
                        placeholder={t('upiIdPlaceholder')}
                        className="pl-9"
                    />
                </div>
                {upiInfo.upiId && !validateUpiId(upiInfo.upiId) && (
                    <p className="text-destructive text-xs">{t('upiIdHelp')}</p>
                )}
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="recipientName" className="text-sm font-medium">{t('recipientName')}</Label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="text"
                        id="recipientName"
                        value={upiInfo.recipientName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpiInfo({ ...upiInfo, recipientName: e.target.value })}
                        placeholder={t('recipientNamePlaceholder')}
                        className="pl-9"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="amount" className="text-sm font-medium">{t('amount')}</Label>
                <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="text"
                        id="amount"
                        value={upiInfo.amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAmountChange(e.target.value)}
                        placeholder={t('amountPlaceholder')}
                        className="pl-9"
                    />
                </div>
                {upiInfo.amount && !validateAmount(upiInfo.amount) && (
                    <p className="text-destructive text-xs">{t('amountHelp')}</p>
                )}
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="note" className="text-sm font-medium">{t('paymentNote')}</Label>
                <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="text"
                        id="note"
                        value={upiInfo.note}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpiInfo({ ...upiInfo, note: e.target.value })}
                        placeholder={t('paymentNotePlaceholder')}
                        className="pl-9"
                    />
                </div>
                <p className="text-xs text-muted-foreground">{t('paymentNoteHelp')}</p>
            </div>
        </div>
    );
};

export default QrUpiForm;
