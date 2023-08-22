import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TEmoji } from "@/lib/types";
import {
  Smile,
  User,
  Cat,
  Coffee,
  Ship,
  Gamepad2,
  Lightbulb,
  Flag,
  Hash,
  LucideIcon
} from "lucide-react";
import { HTMLAttributes, useEffect, useMemo, useState } from "react";
import groupBy from "lodash/groupBy";
import { EMOJI_IMAGES_PATH } from "@/lib/constants";

const CATEGORY_KEYS: ReadonlyArray<string> = [
  "Smileys & Emotion",
  "People & Body",
  "Animals & Nature",
  "Food & Drink",
  "Travel & Places",
  "Activities",
  "Objects",
  "Symbols",
  "Flags"
];

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Smileys & Emotion": Smile,
  "People & Body": User,
  "Animals & Nature": Cat,
  "Food & Drink": Coffee,
  "Travel & Places": Ship,
  Activities: Gamepad2,
  Objects: Lightbulb,
  Symbols: Hash,
  Flags: Flag
};

const Icon = ({
  icon,
  ...rest
}: { icon: LucideIcon } & HTMLAttributes<SVGElement>) => {
  const Component = icon || "svg";

  return <Component {...rest} />;
};

type EmojiProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  emoji: TEmoji;
};
const Emoji = ({ emoji, ...rest }: EmojiProps) => (
  <button {...rest} className="w-8 h-8 rounded-md">
    <img
      src={`${EMOJI_IMAGES_PATH}/32/${emoji.image}`}
      className="w-8 h-8"
      alt={`${emoji.name} emoji`}
      loading="lazy"
    />
  </button>
);

type EmojiMenuProps = {
  onSelect?: (emoji: TEmoji) => unknown;
};
function EmojiMenu({ onSelect }: EmojiMenuProps) {
  const [baseEmojis, setBaseEmojis] = useState<TEmoji[]>([]);

  useEffect(() => {
    import("../assets/emojis.json").then((res) => {
      setBaseEmojis(res.default as TEmoji[]);
    });
  }, []);

  const emojis = useMemo(() => {
    if (baseEmojis.length === 0) {
      return null;
    }

    return groupBy(baseEmojis, "category");
  }, [baseEmojis]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Smile />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full h-60 overflow-hidden p-0" side="top">
        <Tabs className="flex flex-col h-full" defaultValue={CATEGORY_KEYS[0]}>
          <TabsList className="w-full bg-transparent p-0">
            {CATEGORY_KEYS.map((category) => (
              <TabsTrigger
                key={`${category}-content`}
                value={category}
                title={category}
                className="flex-1 border-b-2 data-[state=active]:border-cyan-500 rounded-none"
              >
                <Icon icon={CATEGORY_ICONS[category]} className="w-5 h-5" />
              </TabsTrigger>
            ))}
          </TabsList>
          {CATEGORY_KEYS.map((category) => (
            <TabsContent
              key={`${category}-content`}
              asChild
              className="mt-0 p-2 pr-2.5"
              value={category}
            >
              <ScrollArea type="auto">
                {emojis && (
                  <div className="w-full grid place-items-center gap-x-1 gap-y-2 grid-cols-7">
                    {emojis[category].map((emoji) => (
                      <Emoji
                        key={emoji.short_name}
                        emoji={emoji}
                        onClick={() => {
                          if (onSelect) {
                            onSelect(emoji);
                          }
                        }}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}

export default EmojiMenu;
