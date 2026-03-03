import React, { useState, useEffect, useRef } from 'react';
import TRANSLATIONS from './TRANSLATIONS';

type TranslationDict = {
    [key: string]: { [key: string]: string };
};
const TRANSLATIONS_TYPED: TranslationDict = TRANSLATIONS;

import { Link, MessageSquare, User, CreditCard, Wifi, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QrUrlForm from './QrUrlForm';
import QrTextForm from './QrTextForm';
import QrContactForm from './QrContactForm';
import QrUpiForm from './QrUpiForm';
import QrWifiForm from './QrWifiForm';
import QrWhatsappForm from './QrWhatsappForm';
import QrCodeDisplay from './QrCodeDisplay';
import ColorPicker from './ColorPicker';
import AppearanceSettings from './AppearanceSettings';
import Header from './Header';
import IconPicker from './IconPicker';
import QRCodeStyling from 'qr-code-styling';
import AboutMePage from './AboutMePage';

interface WhatsappInfo {
    phone: string;
    message: string;
}

interface WifiInfo {
    ssid: string;
    encryption: string;
    password?: string;
}

interface ContactInfo {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    organization: string;
    url: string;
}

interface UPIInfo {
    upiId: string;
    amount: string;
    recipientName: string;
    note: string;
}

const QRCodeGenerator: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('url');
    const [qrData, setQrData] = useState<string>('');
    const [showAboutPage, setShowAboutPage] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const [locale, setLocale] = useState<string>('en-US');
    const qrContainerRef = useRef<HTMLDivElement>(null);
    const qrCodeRef = useRef<QRCodeStyling | null>(null);
    const [foregroundColor, setForegroundColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    const [size, setSize] = useState(300);
    const [level, setLevel] = useState('M');
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

    const [urlInput, setUrlInput] = useState<string>('');
    const [textInput, setTextInput] = useState<string>('');
    const [contactInfo, setContactInfo] = useState<ContactInfo>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        organization: '',
        url: ''
    });
    const [upiInfo, setUpiInfo] = useState<UPIInfo>({
        upiId: '',
        amount: '',
        recipientName: '',
        note: ''
    });
    const [wifiInfo, setWifiInfo] = useState<WifiInfo>({
        ssid: '',
        encryption: 'WPA',
        password: ''
    });
    const [whatsappInfo, setWhatsappInfo] = useState<WhatsappInfo>({
        phone: '',
        message: ''
    });

    const t = (key: string): string => {
        return TRANSLATIONS_TYPED[locale]?.[key] || TRANSLATIONS_TYPED['en-US'][key] || key;
    };

    const renderAppTitle = () => {
        const line1 = t('appTitleLine1');
        const line2 = t('appTitleLine2');
        const parts = line2.split(/(FREE)/);
        return (
            <>
                <span className="block text-foreground">{line1}</span>
                <span className="block">
                    {parts.map((part, idx) =>
                        part === 'FREE' ? (
                            <span
                                key={idx}
                                className="bg-gradient-to-r from-violet-600 to-indigo-500 dark:from-violet-400 dark:to-indigo-300 bg-clip-text text-transparent"
                            >
                                {part}
                            </span>
                        ) : (
                            <span key={idx} className="text-foreground">{part}</span>
                        )
                    )}
                </span>
            </>
        );
    };

    const validateUpiId = (upiId: string): boolean => {
        const upiPattern = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
        return upiPattern.test(upiId);
    };

    const validateAmount = (amount: string): boolean => {
        if (!amount) return true;
        const num = parseFloat(amount);
        return !isNaN(num) && num > 0;
    };

    const generateUpiUrl = (upi: UPIInfo): string => {
        if (!upi.upiId.trim()) return '';
        const params = new URLSearchParams();
        params.append('pa', upi.upiId);
        if (upi.recipientName.trim()) params.append('pn', upi.recipientName);
        if (upi.amount.trim() && validateAmount(upi.amount)) params.append('am', upi.amount);
        if (upi.note.trim()) params.append('tn', upi.note);
        params.append('cu', 'INR');
        return `upi://pay?${params.toString()}`;
    };

    const formatUrl = (url: string): string => {
        if (!url.trim()) return '';
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return 'https://' + url;
        }
        return url;
    };

    const generateVCard = (contact: ContactInfo): string => {
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.firstName} ${contact.lastName}\nN:${contact.lastName};${contact.firstName};;;\nORG:${contact.organization}\nTEL:${contact.phone}\nEMAIL:${contact.email}\nURL:${contact.url}\nEND:VCARD`;
    };

    const generateWifiString = (wifi: WifiInfo): string => {
        if (!wifi.ssid) return '';
        return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password || ''};;`;
    };

    const generateWhatsappUrl = (info: WhatsappInfo): string => {
        if (!info.phone) return '';
        const phone = info.phone.replace(/\D/g, '');
        const message = encodeURIComponent(info.message);
        return `https://wa.me/${phone}?text=${message}`;
    };

    useEffect(() => {
        qrCodeRef.current = new QRCodeStyling({
            width: size,
            height: size,
            data: qrData,
            image: selectedIcon || '',
            dotsOptions: { color: foregroundColor, type: 'rounded' },
            backgroundOptions: { color: backgroundColor },
            imageOptions: { crossOrigin: 'anonymous', margin: 5 },
            qrOptions: { errorCorrectionLevel: level as 'L' | 'M' | 'Q' | 'H' }
        });
        if (qrContainerRef.current) {
            qrCodeRef.current.append(qrContainerRef.current);
        }
    }, []);

    useEffect(() => {
        let data = '';
        switch (activeTab) {
            case 'url':
                data = formatUrl(urlInput);
                break;
            case 'text':
                data = textInput;
                break;
            case 'contact':
                if (contactInfo.firstName || contactInfo.lastName || contactInfo.phone || contactInfo.email) {
                    data = generateVCard(contactInfo);
                }
                break;
            case 'upi':
                if (upiInfo.upiId && validateUpiId(upiInfo.upiId)) {
                    data = generateUpiUrl(upiInfo);
                }
                break;
            case 'wifi':
                data = generateWifiString(wifiInfo);
                break;
            case 'whatsapp':
                data = generateWhatsappUrl(whatsappInfo);
                break;
        }

        setQrData(data);
        if (qrCodeRef.current) {
            qrCodeRef.current.update({
                data,
                width: size,
                height: size,
                dotsOptions: { color: foregroundColor },
                backgroundOptions: { color: backgroundColor },
                image: selectedIcon || '',
                qrOptions: { errorCorrectionLevel: level as 'L' | 'M' | 'Q' | 'H' }
            });
            if (qrContainerRef.current) {
                qrContainerRef.current.innerHTML = '';
                qrCodeRef.current.append(qrContainerRef.current);
            }
        }
    }, [activeTab, urlInput, textInput, contactInfo, upiInfo, wifiInfo, whatsappInfo, foregroundColor, backgroundColor, size, level, selectedIcon, qrCodeRef]);

    const downloadQRCode = (): void => {
        if (!qrData) return;
        qrCodeRef.current?.download({ name: `qr-code-${activeTab}`, extension: 'png' });
    };

    const copyToClipboard = async (): Promise<void> => {
        if (qrData) {
            try {
                await navigator.clipboard.writeText(qrData);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    const handleAmountChange = (value: string): void => {
        const cleaned = value.replace(/[^\d.]/g, '');
        setUpiInfo({ ...upiInfo, amount: cleaned });
    };

    const tabs = [
        { id: 'url', label: t('urlTab'), icon: <Link className="w-4 h-4" /> },
        { id: 'text', label: t('textTab'), icon: <MessageSquare className="w-4 h-4" /> },
        { id: 'contact', label: t('contactTab'), icon: <User className="w-4 h-4" /> },
        { id: 'upi', label: t('upiTab'), icon: <CreditCard className="w-4 h-4" /> },
        { id: 'wifi', label: t('wifiTab'), icon: <Wifi className="w-4 h-4" /> },
        { id: 'whatsapp', label: t('whatsappTab'), icon: <MessageCircle className="w-4 h-4" /> }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50/50 via-background to-indigo-50/30 dark:from-[#0c0c16] dark:via-background dark:to-[#10101e]">
            <Header locale={locale} setLocale={setLocale} t={t} />

            <div className="container mx-auto px-4 sm:px-6">
                {showAboutPage ? (
                    <div className="py-8 max-w-2xl mx-auto animate-fade-in-up">
                        <Button
                            variant="ghost"
                            onClick={() => setShowAboutPage(false)}
                            className="mb-6 -ml-2 gap-1.5 text-muted-foreground hover:text-foreground"
                        >
                            ← {t('back')}
                        </Button>
                        <AboutMePage />
                    </div>
                ) : (
                    <>
                        {/* Hero Section */}
                        <div className="text-center pt-10 pb-8 animate-fade-in-up">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-400 text-xs font-medium mb-5">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                                Free · No Login · Instant
                            </div>
                            <h1 className="font-extrabold mb-3 text-4xl sm:text-5xl tracking-tight leading-tight">
                                {renderAppTitle()}
                            </h1>
                            <p className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto">
                                {t('appDescription')}
                            </p>
                        </div>

                        {/* Main Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pb-16 items-start">

                            {/* Left Column: Form + Settings */}
                            <div className="lg:col-span-7 space-y-4">

                                {/* Tabs + Form Card */}
                                <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                                        <div className="p-3 border-b border-border/60 bg-muted/20">
                                            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto gap-1 bg-muted/70 p-1 rounded-xl">
                                                {tabs.map((tab) => (
                                                    <TabsTrigger
                                                        key={tab.id}
                                                        value={tab.id}
                                                        className="flex flex-col sm:flex-row items-center gap-1 py-2 px-1 text-xs rounded-lg font-medium
                                                            data-[state=active]:bg-white dark:data-[state=active]:bg-card
                                                            data-[state=active]:text-violet-700 dark:data-[state=active]:text-violet-400
                                                            data-[state=active]:shadow-sm
                                                            text-muted-foreground hover:text-foreground"
                                                    >
                                                        {tab.icon}
                                                        <span className="leading-none">{tab.label}</span>
                                                    </TabsTrigger>
                                                ))}
                                            </TabsList>
                                        </div>
                                        <div className="p-5">
                                            {tabs.map((tab) => (
                                                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                                                    {tab.id === 'url' && <QrUrlForm t={t} urlInput={urlInput} setUrlInput={setUrlInput} />}
                                                    {tab.id === 'text' && <QrTextForm t={t} textInput={textInput} setTextInput={setTextInput} />}
                                                    {tab.id === 'contact' && <QrContactForm t={t} contactInfo={contactInfo} setContactInfo={setContactInfo} />}
                                                    {tab.id === 'upi' && <QrUpiForm t={t} upiInfo={upiInfo} setUpiInfo={setUpiInfo} validateUpiId={validateUpiId} validateAmount={validateAmount} handleAmountChange={handleAmountChange} />}
                                                    {tab.id === 'wifi' && <QrWifiForm t={t} wifiInfo={wifiInfo} setWifiInfo={setWifiInfo} />}
                                                    {tab.id === 'whatsapp' && <QrWhatsappForm t={t} whatsappInfo={whatsappInfo} setWhatsappInfo={setWhatsappInfo} />}
                                                </TabsContent>
                                            ))}
                                        </div>
                                    </Tabs>
                                </div>

                                {/* Color Picker — desktop only */}
                                <div className="hidden md:block bg-card rounded-2xl border border-border/60 shadow-sm p-5">
                                    <ColorPicker
                                        t={t}
                                        foregroundColor={foregroundColor}
                                        setForegroundColor={setForegroundColor}
                                        backgroundColor={backgroundColor}
                                        setBackgroundColor={setBackgroundColor}
                                    />
                                </div>

                                {/* Appearance Settings */}
                                <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-5">
                                    <AppearanceSettings
                                        t={t}
                                        size={size}
                                        setSize={setSize}
                                        level={level}
                                        setLevel={setLevel}
                                    />
                                </div>

                                {/* Icon Picker */}
                                <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-5">
                                    <IconPicker
                                        t={t}
                                        selectedIcon={selectedIcon}
                                        setSelectedIcon={setSelectedIcon}
                                    />
                                </div>
                            </div>

                            {/* Right Column: Sticky QR Preview */}
                            <div className="lg:col-span-5 lg:sticky lg:top-[4.5rem] space-y-4">
                                <QrCodeDisplay
                                    qrData={qrData}
                                    qrRef={qrContainerRef}
                                    onDownload={downloadQRCode}
                                    onCopy={copyToClipboard}
                                    copied={copied}
                                    t={t}
                                />

                                {/* Color Picker — mobile only */}
                                <div className="md:hidden bg-card rounded-2xl border border-border/60 shadow-sm p-5">
                                    <ColorPicker
                                        t={t}
                                        foregroundColor={foregroundColor}
                                        setForegroundColor={setForegroundColor}
                                        backgroundColor={backgroundColor}
                                        setBackgroundColor={setBackgroundColor}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Footer */}
                <div className="text-center py-8 border-t border-border/40">
                    <p className="text-sm text-muted-foreground">{t('footerText')}</p>
                    <Button
                        variant="link"
                        onClick={() => setShowAboutPage(true)}
                        className="mt-1 text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 no-underline hover:no-underline"
                    >
                        {t('aboutButton')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QRCodeGenerator;
