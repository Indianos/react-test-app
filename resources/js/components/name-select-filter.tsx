import { Button } from '@/components/ui/button';
import { ArrowDownIcon } from '@/components/ui/custom-icons';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NameSelectFilterProps {
    available: string[];
    selected: string;
    onChange: (value: string) => void;
}

export default function NameSelectFilter(props: NameSelectFilterProps) {
    const [selecting, setSelecting] = useState<boolean>(false);

    return (
        <DropdownMenu onOpenChange={setSelecting} open={selecting}>
            <DropdownMenuTrigger asChild={true}>
                <Button
                    variant="outline"
                    size="lg"
                    className={cn(
                        'flex cursor-pointer justify-between text-muted-foreground hover:border-primary hover:text-muted-foreground xl:w-40',
                        props.selected || selecting ? 'border-primary' : '',
                    )}
                >
                    Name
                    <ArrowDownIcon style={{ width: '10px', height: '5px' }} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                sideOffset={8}
                align="start"
                className="max-h-[25vh] overflow-auto p-2"
            >
                {props.available.map((name) => (
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => props.onChange(name)}
                        key={name}
                    >
                        {name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
