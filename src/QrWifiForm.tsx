import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Wifi, Lock, KeyRound } from 'lucide-react';

interface WifiInfo {
    ssid: string;
    encryption: string;
    password?: string;
}

interface QrWifiFormProps {
    t: (key: string) => string;
    wifiInfo: WifiInfo;
    setWifiInfo: (info: WifiInfo) => void;
}

const QrWifiForm: React.FC<QrWifiFormProps> = ({ t, wifiInfo, setWifiInfo }) => {
    return (
        <div className="space-y-3">
            <div className="space-y-1.5">
                <Label htmlFor="ssid" className="text-sm font-medium">{t('ssid')}</Label>
                <div className="relative">
                    <Wifi className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="text"
                        id="ssid"
                        value={wifiInfo.ssid}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWifiInfo({ ...wifiInfo, ssid: e.target.value })}
                        placeholder={t('ssidPlaceholder')}
                        className="pl-9"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="encryption" className="text-sm font-medium">{t('encryption')}</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
                    <Select
                        onValueChange={(value: string) => setWifiInfo({ ...wifiInfo, encryption: value })}
                        value={wifiInfo.encryption}
                    >
                        <SelectTrigger className="w-full pl-9">
                            <SelectValue placeholder={t('encryption')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="WPA">WPA / WPA2</SelectItem>
                            <SelectItem value="WEP">WEP</SelectItem>
                            <SelectItem value="nopass">None</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {wifiInfo.encryption !== 'nopass' && (
                <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-sm font-medium">{t('password')}</Label>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            type="password"
                            id="password"
                            value={wifiInfo.password || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWifiInfo({ ...wifiInfo, password: e.target.value })}
                            placeholder={t('passwordPlaceholder')}
                            className="pl-9"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default QrWifiForm;
