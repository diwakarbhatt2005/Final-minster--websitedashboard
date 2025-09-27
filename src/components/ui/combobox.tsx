import * as React from "react";
import { Check, ChevronDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  allowCustomValues?: boolean;
  emptyMessage?: string;
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search options...",
  className,
  allowCustomValues = true,
  emptyMessage = "No options found.",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [customValue, setCustomValue] = React.useState("");

  // Find the selected option
  const selectedOption = options.find((option) => option.value === value);
  
  // Get display value
  const displayValue = selectedOption?.label || value || placeholder;

  // Filter options based on search
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (selectedValue: string) => {
    if (selectedValue === value) {
      onValueChange?.("");
    } else {
      onValueChange?.(selectedValue);
    }
    setOpen(false);
    setSearchValue("");
    setCustomValue("");
  };

  const handleAddCustom = () => {
    if (searchValue.trim() && !options.find(opt => opt.value === searchValue.trim())) {
      onValueChange?.(searchValue.trim());
      setOpen(false);
      setSearchValue("");
      setCustomValue("");
    }
  };

  const showAddCustom = allowCustomValues && 
    searchValue.trim() && 
    filteredOptions.length === 0 && 
    !options.find(opt => opt.value === searchValue.trim());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-10 px-3 py-2 text-sm",
            "input-government border-2 hover:border-primary/60 focus:border-primary",
            !value && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate text-left">
            {displayValue}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-full p-0 bg-popover border-border shadow-lg" 
        align="start"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command className="w-full">
          <CommandInput 
            placeholder={searchPlaceholder}
            value={searchValue}
            onValueChange={setSearchValue}
            className="h-10 border-none focus:ring-0"
          />
          <CommandList className="max-h-60 overflow-auto">
            <CommandEmpty>
              <div className="py-2 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
              {showAddCustom && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAddCustom}
                  className="w-full mt-2 justify-start text-left font-normal text-primary hover:text-primary-foreground hover:bg-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add "{searchValue.trim()}"
                </Button>
              )}
            </CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="truncate">{option.label}</span>
                </CommandItem>
              ))}
              {showAddCustom && filteredOptions.length > 0 && (
                <CommandItem
                  onSelect={handleAddCustom}
                  className="cursor-pointer text-primary hover:text-primary-foreground hover:bg-primary border-t border-border mt-1 pt-2"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Add "{searchValue.trim()}"</span>
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}