import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSupabase } from '../lib/supabase';
import '../styles/mario.css';


const WORLDS = [
  { num: 1, label: 'YOUR\nCONTEXT', x: 108, y: 478, route: '/game/world/1' },
  { num: 2, label: 'THE\nDIG',      x: 200, y: 306, route: '/game/world/2' },
  { num: 3, label: 'FIELD\nREPORT', x: 302, y: 140, route: '/game/world/3' },
];
const WALL_NODE = { x: 302, y: 60, route: '/game/castle-wall', label: 'THE\nCHALLENGES\nWALL' };

const Tree = ({ x, y }: { x: number; y: number }) => (
  <g>
    <rect x={x - 2} y={y + 8} width={4} height={10} fill="#6B3A22" />
    <circle cx={x} cy={y + 5} r={10} fill="#1E7A1E" />
    <circle cx={x} cy={y} r={8} fill="#2A9E2A" />
  </g>
);

const Castle = ({ x, y }: { x: number; y: number }) => (
  <g>
    {[0, 12, 24, 36, 48].map((bx) => (
      <rect key={bx} x={x + bx} y={y - 14} width={9} height={13} fill="#8C8C8C" />
    ))}
    <rect x={x} y={y} width={57} height={36} fill="#8C8C8C" />
    <rect x={x + 20} y={y + 16} width={16} height={20} fill="#1A1A1A" />
    <rect x={x + 5} y={y + 7} width={11} height={10} fill="#1A1A1A" />
    <rect x={x + 40} y={y + 7} width={11} height={10} fill="#1A1A1A" />
  </g>
);

const WorldMap: React.FC = () => {
  const navigate = useNavigate();
  const playerId = localStorage.getItem('game_player_id');
  const [players, setPlayers] = useState<{ id: string; world: number }[]>([]);

  useEffect(() => {
    if (!playerId) { navigate('/game'); return; }
    const fetch = async () => {
      const { data } = await gameSupabase.from('players').select('id, world');
      if (data) setPlayers(data);
    };
    fetch();
    const ch = gameSupabase
      .channel('world-map-players')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'players' }, fetch)
      .subscribe();
    return () => { gameSupabase.removeChannel(ch); };
  }, [playerId, navigate]);

  const myWorld = players.find((p) => p.id === playerId)?.world ?? 1;


  return (
    <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', background: '#000', position: 'relative' }}>
      <svg
        viewBox="0 0 400 580"
        style={{ width: '100%', display: 'block' }}
        role="img"
        aria-label="World map showing 3 worlds and the Wall of Challenges"
      >
        {/* ── OCEAN ── */}
        <rect width="400" height="580" fill="#5C94FC" />
        {[100, 200, 310, 430, 530].map((y, i) => (
          <line key={i} x1="0" y1={y} x2="400" y2={y}
            stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeDasharray="18 14" />
        ))}

        {/* ── ISLAND 3 — top right (World 3 + Castle) ── */}
        {/* cliff */}
        <polygon
          points="200,192 242,165 302,153 358,154 392,168 388,202 352,216 290,220 238,210 202,198"
          fill="#7A4A22"
        />
        {/* land */}
        <polygon
          points="200,152 242,125 302,113 358,114 392,128 388,162 352,176 290,180 238,170 202,158"
          fill="#4CAF50"
        />
        {/* land highlight edge */}
        <polygon
          points="200,152 242,125 302,113 358,114 392,128 388,138 350,148 290,153 238,148 202,158"
          fill="#5DC05D"
        />
        <Tree x={218} y={127} />
        <Tree x={243} y={120} />
        <Castle x={330} y={100} />

        {/* ── ISLAND 2 — center (World 2) ── */}
        {/* cliff */}
        <polygon
          points="110,352 148,322 210,308 272,310 308,326 302,360 268,374 205,378 147,370 112,358"
          fill="#7A4A22"
        />
        {/* land */}
        <polygon
          points="110,312 148,282 210,268 272,270 308,286 302,320 268,334 205,338 147,330 112,318"
          fill="#4CAF50"
        />
        <polygon
          points="110,312 148,282 210,268 272,270 308,286 302,296 268,306 205,310 147,306 112,318"
          fill="#5DC05D"
        />
        <Tree x={133} y={284} />
        <Tree x={278} y={272} />
        <Tree x={295} y={287} />

        {/* ── ISLAND 1 — bottom left (World 1) ── */}
        {/* cliff */}
        <polygon
          points="18,532 52,504 108,492 162,494 202,510 196,540 162,556 98,558 45,550 18,540"
          fill="#7A4A22"
        />
        {/* land */}
        <polygon
          points="18,492 52,464 108,452 162,454 202,470 196,500 162,516 98,518 45,510 18,500"
          fill="#4CAF50"
        />
        <polygon
          points="18,492 52,464 108,452 162,454 202,470 196,480 160,490 98,492 45,486 18,500"
          fill="#5DC05D"
        />
        <Tree x={42} y={466} />
        <Tree x={68} y={457} />
        <Tree x={152} y={456} />
        <Tree x={175} y={465} />

        {/* ── PATH: W1 → W2 ── */}
        <path
          d="M 168,468 C 188,430 188,390 200,340"
          fill="none" stroke="#F2DCA0" strokeWidth="5"
          strokeDasharray="9 7" strokeLinecap="round"
        />
        {/* ── PATH: W2 → W3 ── */}
        <path
          d="M 200,296 C 218,258 252,210 280,168"
          fill="none" stroke="#F2DCA0" strokeWidth="5"
          strokeDasharray="9 7" strokeLinecap="round"
        />
        {/* ── PATH: W3 → Castle Wall ── */}
        <path
          d="M 302,132 L 302,78"
          fill="none" stroke="#F2DCA0" strokeWidth="5"
          strokeDasharray="9 7" strokeLinecap="round"
        />

        {/* ── WORLD NODES ── */}
        {WORLDS.map(({ num, label, x, y, route }) => {
          const done = num < myWorld;
          const curr = num === myWorld;
          const locked = num > myWorld;
          const color = done ? '#3A9E3A' : curr ? ['#E52521','#5C94FC','#FBD000'][num - 1] : '#555';
          return (
            <g key={num} style={{ cursor: curr ? 'pointer' : 'default' }}
               onClick={() => curr && navigate(route)}>
              {/* pulse ring for current */}
              {curr && <circle cx={x} cy={y} r={28} fill="none" stroke="#FFF" strokeWidth="2" opacity="0.55" />}
              {/* shadow */}
              <circle cx={x + 2} cy={y + 2} r={22} fill="rgba(0,0,0,0.35)" />
              {/* node */}
              <circle cx={x} cy={y} r={22}
                fill={color}
                stroke={curr ? '#FFF' : locked ? '#333' : '#1A1A1A'}
                strokeWidth={curr ? 3 : 2} />
              {/* number / check */}
              <text x={x} y={y + 6} textAnchor="middle"
                fontFamily="'Press Start 2P', monospace"
                fontSize={done ? '13' : '14'} fill="#FFF"
                stroke="rgba(0,0,0,0.5)" strokeWidth="0.5">
                {done ? '✓' : locked ? num : num}
              </text>
              {/* label lines */}
              {label.split('\n').map((line, li) => (
                <text key={li} x={x} y={y + 38 + li * 13} textAnchor="middle"
                  fontFamily="'Press Start 2P', monospace"
                  fontSize="5.5" fill={locked ? '#888' : '#FFF'}
                  stroke="rgba(0,0,0,0.9)" strokeWidth="2" paintOrder="stroke">
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* ── CASTLE WALL NODE ── */}
        {(() => {
          const unlocked = myWorld >= 3;
          return (
            <g style={{ cursor: unlocked ? 'pointer' : 'default' }}
               onClick={() => unlocked && navigate(WALL_NODE.route)}>
              {unlocked && (
                <circle cx={WALL_NODE.x} cy={WALL_NODE.y} r={24}
                  fill="none" stroke="#FBD000" strokeWidth="2" opacity="0.6" />
              )}
              <circle cx={WALL_NODE.x + 2} cy={WALL_NODE.y + 2} r={18} fill="rgba(0,0,0,0.35)" />
              <circle cx={WALL_NODE.x} cy={WALL_NODE.y} r={18}
                fill={unlocked ? '#E52521' : '#444'}
                stroke={unlocked ? '#FFF' : '#333'}
                strokeWidth={unlocked ? 2 : 1.5} />
              <text x={WALL_NODE.x} y={WALL_NODE.y + 4} textAnchor="middle"
                fontFamily="'Press Start 2P', monospace"
                fontSize="10" fill={unlocked ? '#FFF' : '#666'}
                stroke="rgba(0,0,0,0.5)" strokeWidth="0.5">
                🏆
              </text>
              {WALL_NODE.label.split('\n').map((line, li) => (
                <text key={li} x={WALL_NODE.x} y={WALL_NODE.y + 30 + li * 12} textAnchor="middle"
                  fontFamily="'Press Start 2P', monospace"
                  fontSize="5" fill={unlocked ? '#FBD000' : '#666'}
                  stroke="rgba(0,0,0,0.9)" strokeWidth="2" paintOrder="stroke">
                  {line}
                </text>
              ))}
            </g>
          );
        })()}

        {/* ── HUD title ── */}
        <text x="200" y="36" textAnchor="middle"
          fontFamily="'Press Start 2P', monospace"
          fontSize="11" fill="#FBD000"
          stroke="rgba(0,0,0,0.9)" strokeWidth="3" paintOrder="stroke">
          WORLD MAP
        </text>
      </svg>

      {/* CTA button below map */}
      <div style={{ padding: '16px 20px 24px', background: '#1A1A2E', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <button
          className="mario-btn mario-btn-red"
          style={{ width: '100%', maxWidth: 320 }}
          onClick={() =>
            myWorld >= 3
              ? navigate('/game/castle-wall')
              : navigate(`/game/world/${myWorld}`)
          }
        >
          {myWorld >= 3 ? 'VIEW THE WALL 🏆' : `ENTER WORLD ${myWorld} ▶`}
        </button>
      </div>
    </div>
  );
};

export default WorldMap;
