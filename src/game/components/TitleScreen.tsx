import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSupabase } from '../lib/supabase';
import '../styles/mario.css';

const Cloud: React.FC<{ left: string; top: string; scale?: number }> = ({ left, top, scale = 1 }) => (
  <div
    className="pixel-cloud"
    style={{
      left,
      top,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      opacity: 0.9,
    }}
  />
);

const TitleScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleStart = async () => {
    if (!name.trim()) {
      setError('ENTER YOUR NAME FIRST!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data, error: dbError } = await gameSupabase
        .from('players')
        .insert({ name: name.trim(), world: 1 })
        .select()
        .single();

      if (dbError) throw dbError;
      localStorage.setItem('game_player_id', data.id);
      localStorage.setItem('game_player_name', data.name);
      navigate('/game/world-map');
    } catch (e) {
      setError('Could not connect. Try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="game-screen"
      style={{
        background: 'var(--sky-blue)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Clouds */}
      <Cloud left="5%" top="8%" scale={2} />
      <Cloud left="25%" top="5%" scale={1.5} />
      <Cloud left="60%" top="10%" scale={2.5} />
      <Cloud left="80%" top="6%" scale={1.8} />

      {/* Ground */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: 'var(--grass-green)',
          boxShadow: 'inset 0 4px 0 0 #2E7D32',
        }}
      />

      {/* Hills */}
      {[{ left: '2%', w: 200, h: 120 }, { left: '40%', w: 280, h: 160 }, { left: '72%', w: 220, h: 130 }].map(
        (hill, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: 76,
              left: hill.left,
              width: hill.w,
              height: hill.h,
              background: '#3E8C3E',
              borderRadius: `${hill.w / 2}px ${hill.w / 2}px 0 0`,
            }}
          />
        )
      )}

      {/* Floating ? blocks */}
      {[{ left: '15%', top: '40%' }, { left: '75%', top: '38%' }, { left: '45%', top: '20%' }].map((pos, i) => (
        <div key={i} className="question-block" style={{ position: 'absolute', ...pos }} />
      ))}

      {/* Logo */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 24,
          fontFamily: 'Press Start 2P, monospace',
          fontSize: '0.5rem',
          color: 'var(--white)',
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 12px',
          boxShadow: '-2px 0 0 var(--white), 2px 0 0 var(--white), 0 -2px 0 var(--white), 0 2px 0 var(--white)',
        }}
      >
        L&D SHAKERS
      </div>

      {/* Main card */}
      <div
        style={{
          background: 'rgba(0,0,0,0.82)',
          padding: '40px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          position: 'relative',
          zIndex: 10,
          boxShadow:
            '-4px 0 0 0 var(--white), 4px 0 0 0 var(--white), 0 -4px 0 0 var(--white), 0 4px 0 0 var(--white)',
          maxWidth: 520,
          width: '90%',
        }}
      >
        <h1
          className="mario-font"
          style={{
            fontSize: 'clamp(0.9rem, 3vw, 1.4rem)',
            color: 'var(--mario-red)',
            textAlign: 'center',
            lineHeight: 2,
            margin: 0,
            textShadow: '4px 4px 0 rgba(0,0,0,0.6)',
          }}
        >
          L&D<br />PROBLEM<br />FINDER
        </h1>

        <p
          className="vt323-font"
          style={{ color: 'var(--coin-gold)', margin: 0, fontSize: '1.6rem', textAlign: 'center' }}
        >
          Find the problem worth solving
        </p>

        <div style={{ width: '100%' }}>
          <label
            className="mario-font"
            style={{ display: 'block', fontSize: '0.5rem', color: '#aaa', marginBottom: 8 }}
          >
            ENTER YOUR NAME
          </label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              className="mario-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              placeholder="PLAYER 1_"
              maxLength={30}
              autoFocus
            />
            <span
              className="blink"
              style={{
                position: 'absolute',
                right: 12,
                color: 'var(--white)',
                fontFamily: 'monospace',
                fontSize: '1.5rem',
                pointerEvents: 'none',
              }}
            >
              ▌
            </span>
          </div>
        </div>

        {error && (
          <p
            className="mario-font"
            style={{ color: 'var(--mario-red)', fontSize: '0.5rem', margin: 0, textAlign: 'center' }}
          >
            {error}
          </p>
        )}

        <button
          className="mario-btn mario-btn-red pixel-border"
          onClick={handleStart}
          disabled={loading}
          style={{ width: '100%', fontSize: '0.75rem' }}
        >
          {loading ? 'LOADING...' : 'PRESS START ▶'}
        </button>
      </div>
    </div>
  );
};

export default TitleScreen;
