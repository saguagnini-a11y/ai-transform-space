/* Pixel sprites rendered as SVG grids from ASCII maps — no image assets.
   Each character in the rows maps to a palette color; "." is transparent. */

interface SpriteProps {
  rows: string[];
  palette: Record<string, string>;
  scale?: number;
  className?: string;
}

export function PixelSprite({ rows, palette, scale = 4, className }: SpriteProps) {
  const h = rows.length;
  const w = Math.max(...rows.map((r) => r.length));
  return (
    <svg
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      className={`pixelated ${className ?? ""}`}
      aria-hidden="true"
    >
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch !== "." && palette[ch] ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[ch]} />
          ) : null,
        ),
      )}
    </svg>
  );
}

/* --- Terrain tiles (12x12) for the six zones --- */

const TERRAIN: Record<string, { rows: string[]; palette: Record<string, string> }> = {
  grass: {
    rows: [
      "............",
      "............",
      "....gg......",
      "..gggggg.g..",
      ".gggggggggg.",
      "gggggggggggg",
      "DDDDDDDDDDDD",
      "DdDDdDDDdDDD",
      "DDDDDDDDDDDD",
      "DDdDDDdDDdDD",
      "DDDDDDDDDDDD",
      "DDDDDDDDDDDD",
    ],
    palette: { g: "#4CAF50", D: "#7A4F2D", d: "#5C3A1E" },
  },
  desert: {
    rows: [
      "............",
      "......c.....",
      "..c...c.....",
      "..c..ccc....",
      ".ccc..c.....",
      "..c...c.....",
      "ssssssssssss",
      "sSssssSsssss",
      "ssssssssssss",
      "sssSssssSsss",
      "ssssssssssss",
      "ssssssssssss",
    ],
    palette: { s: "#D9B36C", S: "#C49A52", c: "#4CAF50" },
  },
  underground: {
    rows: [
      "rrrrrrrrrrrr",
      "rRrrrrRrrrrr",
      "rr..........",
      "r..........r",
      "r...aa.....r",
      "r..aaaa....r",
      "r...aa.....r",
      "r..........r",
      "r......aa..r",
      "r..........r",
      "rRrrrrrrRrrr",
      "rrrrrrrrrrrr",
    ],
    palette: { r: "#3A3A55", R: "#2B2B40", a: "#F5A623" },
  },
  sky: {
    rows: [
      "............",
      "...www......",
      "..wwwww.....",
      ".wwwwwww....",
      "............",
      ".......www..",
      "......wwwww.",
      "............",
      "..www.......",
      ".wwwww......",
      "............",
      "............",
    ],
    palette: { w: "#E8E4D4" },
  },
  castle: {
    rows: [
      "k.k.k.k.k.kk",
      "kkkkkkkkkkkk",
      "kkkkkkkkkkkk",
      "kkKKkkkkKKkk",
      "kkKKkkkkKKkk",
      "kkkkkkkkkkkk",
      "kkkkkddkkkkk",
      "kkkkdddkkkkk",
      "kkkkdddkkkkk",
      "kkkkdddkkkkk",
      "kkkkdddkkkkk",
      "kkkkkkkkkkkk",
    ],
    palette: { k: "#8E8E9E", K: "#1A1A2E", d: "#3D3D52" },
  },
  flag: {
    rows: [
      "..p.........",
      "..pFFFF.....",
      "..pFFFFFF...",
      "..pFFFF.....",
      "..pFF.......",
      "..p.........",
      "..p.........",
      "..p.........",
      "..p.........",
      "..p.........",
      ".ppp........",
      "ggggggggggg.",
    ],
    palette: { p: "#E8E4D4", F: "#F5A623", g: "#4CAF50" },
  },
};

export function TerrainTile({
  terrain,
  scale = 5,
  className,
}: {
  terrain: keyof typeof TERRAIN | string;
  scale?: number;
  className?: string;
}) {
  const t = TERRAIN[terrain] ?? TERRAIN.grass;
  return <PixelSprite rows={t.rows} palette={t.palette} scale={scale} className={className} />;
}

/* --- The fieldworker (you-are-here marker): explorer hat + notebook --- */

const FIELDWORKER = {
  rows: [
    "...hhhh...",
    "..hhhhhh..",
    ".hhhhhhhh.",
    "...ffff...",
    "...f@f@...",
    "...ffff...",
    "..cccccc..",
    ".c.cccc.c.",
    ".n.cccc...",
    ".nn.cc....",
    "....bb....",
    "...bb.bb..",
  ],
  palette: {
    h: "#7A4F2D",
    f: "#E0B58A",
    "@": "#1A1A2E",
    c: "#4CAF50",
    n: "#F0EAD6",
    b: "#5C3A1E",
  },
};

export function Fieldworker({ scale = 4, className }: { scale?: number; className?: string }) {
  return (
    <PixelSprite rows={FIELDWORKER.rows} palette={FIELDWORKER.palette} scale={scale} className={className} />
  );
}

/* --- Small completion flag for the world map --- */

const SMALL_FLAG = {
  rows: ["p....", "pFFF.", "pFF..", "p....", "p....", "p...."],
  palette: { p: "#F0EAD6", F: "#4CAF50" },
};

export function SmallFlag({ scale = 3, className }: { scale?: number; className?: string }) {
  return (
    <PixelSprite rows={SMALL_FLAG.rows} palette={SMALL_FLAG.palette} scale={scale} className={className} />
  );
}

/* --- Castle door for Zone 5 cards --- */

export function CastleDoor({
  color,
  scale = 4,
  className,
}: {
  color: string;
  scale?: number;
  className?: string;
}) {
  const rows = [
    "..oooo..",
    ".oooooo.",
    "oooooooo",
    "ooddddoo",
    "ooddddoo",
    "ooddddoo",
    "ooddddoo",
    "ooddddoo",
    "ooddddoo",
    "ooddHdoo",
    "ooddddoo",
    "ooddddoo",
  ];
  return (
    <PixelSprite
      rows={rows}
      palette={{ o: color, d: "#1A1A2E", H: "#F5A623" }}
      scale={scale}
      className={className}
    />
  );
}
