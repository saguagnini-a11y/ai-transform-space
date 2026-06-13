import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSupabase } from '../lib/supabase';
import '../styles/mario.css';

const WORLD_COLORS = ['#E52521', '#5C94FC', '#4CAF50', '#FBD000'];
const DOT_PALETTE = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD'];

const WORLD_LABELS = ['YOUR CONTEXT', 'THE DIG', 'HIDDEN BLOCKS', 'FIELD REPORT'];

const WorldMap: React.FC = () => {
  const navigate = useNavigate();
  const playerId = localStorage.getItem('game_player_id');
  const [players, setPlayers] = useState<{ id: string; world: number }[]>([]);

  useEffect(() => {
    if (!playerId) { navigate('/game'); return; }

    const fetchPlayers = async () => {
      const { data } = await gameSupabase.from('players').select('id, world');
      if (data) setPlayers(data);
    };
    fetchPlayers();

    const channel = gameSupabase
      .channel('world-map-players')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'players' }, fetchPlayers)
      .subscribe();

    return () => { gameSupabase.removeChannel(channel); };
  }, [playerId, navigate]);

  const dotsAtWorld = (worldNum: number) =>
    players.filter((p) => p.world === worldNum && p.id !== playerId);

  const myWorld = players.find((p) => p.id === playerId)?.world ?? 1;

  return (
    <div
      className="game-screen"
      style={{
        background: '#7CC35C',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 20px',
        gap: 32,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 className="mario-font" style={{ fontSize: '1rem', color: 'var(--white)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)', marginBottom: 8 }}>
          WORLD MAP
        </h1>
        <p className="vt323-font" style={{ fontSize: '1.4rem', color: 'var(--black)', background: 'rgba(255,255,255,0.7)', padding: '4px 12px' }}>
          21 players. 21 problems. Yours is in there somewhere.
        </p>
      </div>

      {/* Map path */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          alignItems: 'center',
          width: '100%',
          maxWidth: 480,
        }}
      >
        {[1, 2, 3, 4].map((worldNum) => (
          <div key={worldNum} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            {/* Dots above */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', minHeight: 24 }}>
              {dotsAtWorld(worldNum).map((p, i) => (
                <div
                  key={p.id}
                  className="player-dot"
                  style={{ background: DOT_PALETTE[i % DOT_PALETTE.length] }}
                  title="Someone in your cohort"
                />
              ))}
              {myWorld === worldNum && (
                <div
                  title="You"
                  style={{
                    width: 24,
                    height: 24,
                    background: 'var(--mario-red)',
                    boxShadow: '-2px 0 0 var(--black), 2px 0 0 var(--black), 0 -2px 0 var(--black), 0 2px 0 var(--black)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                  }}
                >
                  M
                </div>
              )}
            </div>

            {/* World node */}
            <button
              className={`world-node ${worldNum < myWorld ? 'complete' : worldNum > myWorld ? 'locked' : ''}`}
              style={{ background: worldNum <= myWorld ? WORLD_COLORS[worldNum - 1] : '#666' }}
              onClick={() => worldNum === myWorld && navigate(`/game/world/${worldNum}`)}
              disabled={worldNum !== myWorld}
            >
              {worldNum < myWorld ? '✓' : worldNum}
            </button>

            <span className="mario-font" style={{ fontSize: '0.45rem', color: 'var(--white)', textShadow: '2px 2px 0 rgba(0,0,0,0.7)' }}>
              {WORLD_LABELS[worldNum - 1]}
            </span>

            {/* Path connector */}
            {worldNum < 4 && (
              <div style={{ borderLeft: '4px dotted var(--coin-gold)', height: 24, opacity: 0.8 }} />
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        className="mario-btn mario-btn-red"
        onClick={() => navigate(`/game/world/${myWorld}`)}
        style={{ marginTop: 16 }}
      >
        ENTER WORLD {myWorld} ▶
      </button>
    </div>
  );
};

export default WorldMap;
