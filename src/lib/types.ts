type Base = { unified: string; image: string; native: string };

export type TEmoji = Base & {
  name: string;
  short_name: string;
  short_names: string[];
  text: string | null;
  skin_variations?: { [key: string]: Base };
  category: string;
  sort_order: number;
};
