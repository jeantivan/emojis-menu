import "@/styles/index.css";
import EmojiMenu from "@/components/EmojiMenu";

import { useState } from "react";
import { TEmoji } from "./lib/types";
import { EMOJI_IMAGES_PATH } from "./lib/constants";
import { ScrollArea } from "./components/ui/scroll-area";

const EmojiList = ({ emojis }: { emojis: TEmoji[] }) => (
  <ScrollArea className="max-h-48">
    <div className="grid grid-cols-12 gap-4 h-full">
      {emojis.map((emoji) => (
        <div key={emoji.short_name} className="w-12 h-12">
          <img
            className="w-full h-full"
            src={`${EMOJI_IMAGES_PATH}/64/${emoji.image}`}
          />
        </div>
      ))}
    </div>
  </ScrollArea>
);
function App() {
  const [emojis, setEmojis] = useState<TEmoji[]>([]);
  return (
    <div className="w-screen h-screen grid bg-background">
      <div className="text-white pt-20 grid place-items-center">
        <EmojiMenu
          onSelect={(e) => {
            setEmojis([...emojis, e]);
          }}
        />
        {emojis.length > 0 && <EmojiList emojis={emojis} />}
      </div>
    </div>
  );
}

export default App;
