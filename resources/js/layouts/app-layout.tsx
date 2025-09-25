import { type ReactNode } from 'react';

export default ({ children }: { children: ReactNode }) => (
    <div className="mx-auto flex min-h-screen w-full flex-col px-2 py-[32px] md:max-w-4xl 2xl:max-w-7xl">
        {children}
    </div>
);
