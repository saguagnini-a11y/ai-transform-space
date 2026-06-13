import { useState } from "react";
import { ZoneShell } from "../components/ZoneShell";

interface OpenTextZoneProps {
  zone: number;
  prompt: string;
  placeholder: string;
  advanceLabel: string;
  initialValue: string;
  onAdvance: (value: string) => void;
}

/* Zones 1 and 2: a single open text field. No word limit, no minimum —
   the player writes what they know. */
export function OpenTextZone({
  zone,
  prompt,
  placeholder,
  advanceLabel,
  initialValue,
  onAdvance,
}: OpenTextZoneProps) {
  const [value, setValue] = useState(initialValue);
  return (
    <ZoneShell
      zone={zone}
      prompt={prompt}
      advanceLabel={advanceLabel}
      canAdvance={true}
      onAdvance={() => onAdvance(value.trim())}
    >
      <textarea
        className="field-input min-h-[180px] resize-y"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
    </ZoneShell>
  );
}
