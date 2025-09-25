import AppLogo from '@/components/app-logo';
import React from 'react';

interface AppHeaderProps {
    children?: React.ReactNode;
}
export default function AppHeader({ children }: AppHeaderProps) {
    return (
        <header className="mb-12 flex h-16 items-center justify-between">
            <AppLogo />

            {children ? <div className="flex gap-2">{children}</div> : null}
        </header>
    );
}
