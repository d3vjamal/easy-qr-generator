import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Link, Phone, Mail, Building } from 'lucide-react';

interface ContactInfo {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    organization: string;
    url: string;
}

interface QrContactFormProps {
    t: (key: string) => string;
    contactInfo: ContactInfo;
    setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
}

const QrContactForm: React.FC<QrContactFormProps> = ({ t, contactInfo, setContactInfo }) => {
    const [errors, setErrors] = useState<Partial<ContactInfo>>({});

    const validate = (name: string, value: string) => {
        if (name === 'firstName' && !value) return t('firstNameRequired');
        if (name === 'lastName' && !value) return t('lastNameRequired');
        if (name === 'email') {
            if (!value) return t('emailRequired');
            if (!/\S+@\S+\.\S+/.test(value)) return t('emailInvalid');
        }
        if (name === 'phone') {
            if (!value) return t('phoneRequired');
            if (!/^\d{10,15}$/.test(value)) return t('phoneInvalid');
        }
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContactInfo({ ...contactInfo, [name]: value });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = validate(name, value);
        setErrors({ ...errors, [name]: error });
    };

    const fields = [
        { id: 'firstName', label: t('firstName'), placeholder: t('firstNamePlaceholder'), icon: <User className="w-4 h-4" />, type: 'text', col: true },
        { id: 'lastName', label: t('lastName'), placeholder: t('lastNamePlaceholder'), icon: <User className="w-4 h-4" />, type: 'text', col: true },
        { id: 'phone', label: t('phoneNumber'), placeholder: t('phonePlaceholder'), icon: <Phone className="w-4 h-4" />, type: 'tel', col: false },
        { id: 'email', label: t('emailAddress'), placeholder: t('emailPlaceholder'), icon: <Mail className="w-4 h-4" />, type: 'email', col: false },
        { id: 'organization', label: t('organization'), placeholder: t('organizationPlaceholder'), icon: <Building className="w-4 h-4" />, type: 'text', col: false },
        { id: 'url', label: t('website'), placeholder: t('websitePlaceholder'), icon: <Link className="w-4 h-4" />, type: 'url', col: false },
    ];

    const singleFields = fields.filter(f => !f.col);
    const colFields = fields.filter(f => f.col);

    return (
        <form className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {colFields.map((field) => (
                    <div key={field.id} className="space-y-1.5">
                        <Label htmlFor={field.id} className="text-sm font-medium">{field.label}</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                {field.icon}
                            </span>
                            <Input
                                type={field.type}
                                id={field.id}
                                name={field.id}
                                value={contactInfo[field.id as keyof ContactInfo]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={field.placeholder}
                                className="pl-9"
                            />
                        </div>
                        {errors[field.id as keyof ContactInfo] && (
                            <p className="text-destructive text-xs">{errors[field.id as keyof ContactInfo]}</p>
                        )}
                    </div>
                ))}
            </div>
            {singleFields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                    <Label htmlFor={field.id} className="text-sm font-medium">{field.label}</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {field.icon}
                        </span>
                        <Input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            value={contactInfo[field.id as keyof ContactInfo]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={field.placeholder}
                            className="pl-9"
                        />
                    </div>
                    {errors[field.id as keyof ContactInfo] && (
                        <p className="text-destructive text-xs">{errors[field.id as keyof ContactInfo]}</p>
                    )}
                </div>
            ))}
        </form>
    );
};

export default QrContactForm;
