import { Button } from '@/components/ui/button';
import { ArrowDownIcon } from '@/components/ui/custom-icons';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

interface CategorySelectFilterProps {
    available: string[];
    selected: string[];
    add: (value: string) => void;
    remove: (value: string) => void;
}

export default function CategorySelectFilter(props: CategorySelectFilterProps) {
    const [selecting, setSelecting] = useState<boolean>(false);

    return (
        <DropdownMenu onOpenChange={setSelecting} open={selecting}>
            <DropdownMenuTrigger asChild={true}>
                <Button
                    size="lg"
                    className="flex cursor-pointer justify-between xl:w-40"
                >
                    Category
                    <ArrowDownIcon style={{ width: '10px', height: '5px' }} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                sideOffset={8}
                className="max-h-[25vh] overflow-auto p-2"
            >
                {props.available.map((name) => (
                    <DropdownMenuCheckboxItem
                        className="cursor-pointer"
                        onSelect={(event) => event.preventDefault()}
                        onCheckedChange={(isChecked) =>
                            isChecked ? props.add(name) : props.remove(name)
                        }
                        key={name}
                        checked={props.selected.includes(name)}
                    >
                        {name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
