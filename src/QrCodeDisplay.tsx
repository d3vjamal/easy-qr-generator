import React from 'react';
import { Download, Copy, Check, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QrCodeDisplayProps {
    qrData: string;
    qrRef: React.RefObject<HTMLDivElement | null>;
    onDownload: () => void;
    onCopy: () => void;
    copied: boolean;
    t: (key: string) => string;
}

const QrCodeDisplay: React.FC<QrCodeDisplayProps> = ({ qrData, qrRef, onDownload, onCopy, copied, t }) => {
    return (
        <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-border/60 flex items-center justify-between">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    QR Preview
                </h3>
                {qrData && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Ready
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="p-5">
                {/* QR container — always in DOM so qrRef is never null when effect fires */}
                <div style={{ display: qrData ? 'block' : 'none' }}>
                    <div className="space-y-4">
                        {/* QR with glow ring */}
                        <div className="flex justify-center">
                            <div className="relative p-[3px] rounded-2xl bg-gradient-to-br from-violet-500/40 via-indigo-500/30 to-violet-500/40 animate-pulse-glow">
                                <div className="bg-card rounded-[14px] p-3">
                                    <div
                                        ref={qrRef}
                                        className="flex justify-center [&>canvas]:!w-full [&>canvas]:!h-auto max-w-[260px] mx-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground text-center">
                            {t('scanQrCode')}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Button
                                onClick={onDownload}
                                className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 shadow-md shadow-violet-500/25 gap-1.5"
                            >
                                <Download className="w-4 h-4" />
                                {t('download')}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={onCopy}
                                className="flex-1 gap-1.5"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 text-emerald-500" />
                                        {t('copied')}
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        {t('copyData')}
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Placeholder — shown only when no data */}
                {!qrData && (
                    <div className="flex flex-col items-center justify-center py-14 space-y-4">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-border/60 flex items-center justify-center bg-muted/20">
                                <div className="grid grid-cols-3 gap-1">
                                    {[...Array(9)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-5 h-5 rounded-sm bg-border/50 animate-pulse"
                                            style={{ animationDelay: `${i * 80}ms` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground text-center max-w-[180px] leading-relaxed">
                            {t('fillFormPrompt')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QrCodeDisplay;
