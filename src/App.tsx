import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Compass,
  Users,
  Trophy,
  MapPin
} from 'lucide-react';
import { statesData } from './data/statesData';
import { usaMapDimensions } from './data/usaMapDimensions';
import { statesFactsData, StateFacts } from './data/statesFactsData';

interface GameState {
  stateStatus: Record<string, 'visited' | 'unexplored'>;
  selectedStateId: string | null;
}

const initialGameState: GameState = {
  stateStatus: {},
  selectedStateId: null,
};

const territoriesList = [
  {
    id: "AS",
    name: "American Samoa",
    map: (
      <svg viewBox="0 0 100 60" className="w-20 h-12 text-teal-400 fill-teal-500/10 stroke-current stroke-[1.5] transition-all duration-300 group-hover:fill-teal-500/20">
        <path d="M 10,25 C 20,20 28,30 38,26 C 45,22 55,24 60,30 C 65,24 72,26 78,32 C 85,28 92,34 90,38 C 84,40 76,36 68,34 C 60,32 50,36 42,34 C 32,32 22,36 12,28 Z" />
        <circle cx="94" cy="38" r="1.5" className="fill-teal-400" />
        <path d="M 75,12 C 78,12 80,15 77,16 Z" />
        <circle cx="86" cy="14" r="2.2" />
      </svg>
    )
  },
  {
    id: "GU",
    name: "Guam",
    map: (
      <svg viewBox="0 0 60 100" className="w-12 h-18 text-teal-400 fill-teal-500/10 stroke-current stroke-[1.5] transition-all duration-300 group-hover:fill-teal-500/20">
        <path d="M 32,15 C 38,18 42,28 40,40 C 37,50 34,58 36,68 C 38,78 34,84 28,82 C 24,80 22,70 24,60 C 26,50 22,38 24,28 C 26,18 28,15 32,15 Z" />
      </svg>
    )
  },
  {
    id: "MP",
    name: "Northern Mariana Islands",
    map: (
      <svg viewBox="0 0 60 100" className="w-12 h-18 text-teal-400 fill-teal-500/10 stroke-current stroke-[1.5] transition-all duration-300 group-hover:fill-teal-500/20">
        <path d="M 42,22 C 46,20 48,28 44,34 C 41,38 39,35 42,22 Z" />
        <path d="M 39,42 C 42,42 41,48 38,50 C 36,48 36,44 39,42 Z" />
        <path d="M 24,68 C 29,66 32,70 28,73 C 24,73 22,70 24,68 Z" />
        <path d="M 42,22 L 25,10" className="stroke-dashed stroke-[0.8] opacity-35" />
        <circle cx="25" cy="10" r="1.5" />
      </svg>
    )
  },
  {
    id: "PR",
    name: "Puerto Rico",
    map: (
      <svg viewBox="0 0 120 60" className="w-24 h-12 text-teal-400 fill-teal-500/10 stroke-current stroke-[1.5] transition-all duration-300 group-hover:fill-teal-500/20">
        <path d="M 12,22 L 88,22 C 92,26 90,34 88,38 L 12,38 C 10,34 8,26 12,22 Z" />
        <path d="M 98,24 C 101,23 102,26 99,27 Z" />
        <path d="M 96,35 C 102,34 104,37 98,38 Z" />
      </svg>
    )
  },
  {
    id: "VI",
    name: "U.S. Virgin Islands",
    map: (
      <svg viewBox="0 0 100 80" className="w-20 h-16 text-teal-400 fill-teal-500/10 stroke-current stroke-[1.5] transition-all duration-300 group-hover:fill-teal-500/20">
        <path d="M 15,22 C 22,20 28,24 35,22 C 32,25 22,26 15,22 Z" />
        <path d="M 42,23 C 46,21 48,25 45,26 Z" />
        <path d="M 25,55 C 45,51 60,54 55,58 C 40,60 30,58 25,55 Z" />
      </svg>
    )
  }
];

export default function App() {
  const [game, setGame] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem('us_states_explorer_state_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          stateStatus: parsed.stateStatus || {},
          selectedStateId: parsed.selectedStateId || null,
        };
      }
    } catch (e) {
      // ignore
    }
    return initialGameState;
  });

  const [enlargedImage, setEnlargedImage] = useState<{ url: string; title: string } | null>(null);

  // Active detail view (cities, universities, knownThings)
  const [activeDetailsSection, setActiveDetailsSection] = useState<'cities' | 'universities' | 'knownThings' | null>(null);

  // Ref to the sidebar scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('us_states_explorer_state_v2', JSON.stringify(game));
  }, [game]);

  // Collapse sections when active state changes
  useEffect(() => {
    setActiveDetailsSection(null);
  }, [game.selectedStateId]);

  // Auto-scroll to bottom of sidebar when a section is opened
  useEffect(() => {
    if (activeDetailsSection && scrollContainerRef.current) {
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            top: scrollContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 80); // Small delay to allow element DOM expansion
    }
  }, [activeDetailsSection]);

  // Active state data lookup
  const activeState = useMemo(() => {
    if (!game.selectedStateId) return null;
    return statesData.find(s => s.id === game.selectedStateId) || null;
  }, [game.selectedStateId]);

  // Active state facts lookup with normalized punctuation-insensitive matching
  const activeFacts = useMemo<StateFacts | null>(() => {
    if (!activeState) return null;
    const cleanName = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return statesFactsData.find(f => cleanName(f.state) === cleanName(activeState.name)) || null;
  }, [activeState]);

  // Click on a state on the map
  const handleStateClick = (stateId: string) => {
    setEnlargedImage(null);
    setGame(prev => {
      // Mark as visited automatically when clicked
      return {
        ...prev,
        selectedStateId: stateId,
        stateStatus: {
          ...prev.stateStatus,
          [stateId]: 'visited'
        }
      };
    });
  };

  // Toggle visited status manually
  const toggleVisited = () => {
    if (!game.selectedStateId) return;
    setGame(prev => {
      const stateId = prev.selectedStateId!;
      const currentStatus = prev.stateStatus[stateId] || 'unexplored';
      const newStatus = currentStatus === 'visited' ? 'unexplored' : 'visited';
      return {
        ...prev,
        stateStatus: {
          ...prev.stateStatus,
          [stateId]: newStatus
        }
      };
    });
  };

  // Reset progress (clear visited list)
  const resetProgress = () => {
    if (window.confirm("Are you sure you want to clear all visited states?")) {
      setGame(initialGameState);
    }
  };

  const isStateVisited = game.selectedStateId ? (game.stateStatus[game.selectedStateId] === 'visited') : false;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-slate-100 selection:bg-slate-900/30">
      
      {/* Main Body */}
      <main className="flex-1 flex flex-col lg:flex-row p-3 sm:p-6 gap-4 sm:gap-6 max-w-7xl mx-auto w-full pt-4 sm:pt-6">
        
        {/* Left Column (Header Left + Map + Territories) */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Header Left Box */}
          <div className="border border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl mb-4 flex items-center gap-3 shadow-lg">
            <img 
              src="logo.jpg" 
              alt="William H. Chan Educational Games" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-teal-500/30 shadow-lg shadow-teal-500/5 animate-pulse"
              style={{ animationDuration: '4s' }}
            />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                US States Explorer
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Interactive Geography & Academics Guide</p>
            </div>
          </div>

          {/* Map Column Box */}
          <section className="flex-1 flex flex-col bg-slate-900/40 border border-slate-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-2xl relative min-h-[300px] sm:min-h-[400px]">
            
            {/* Header row to prevent legend overlapping */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              {/* Flag Icon & Title/Instruction */}
              <div className="flex items-start gap-2.5">
                <svg width="60" height="33" viewBox="0 0 108 60" className="drop-shadow-md overflow-visible mt-0.5">
                  <g>
                    <rect width="108" height="60" fill="#B22234" rx="1.5" />
                    <rect y="4.62" width="108" height="4.62" fill="#ffffff" />
                    <rect y="13.85" width="108" height="4.62" fill="#ffffff" />
                    <rect y="23.08" width="108" height="4.62" fill="#ffffff" />
                    <rect y="32.31" width="108" height="4.62" fill="#ffffff" />
                    <rect y="41.54" width="108" height="4.62" fill="#ffffff" />
                    <rect y="50.77" width="108" height="4.62" fill="#ffffff" />
                    <rect width="46.5" height="32.31" fill="#3C3B6E" rx="1.5" />
                    {Array.from({ length: 9 }).map((_, rowIndex) => {
                      const isEvenRow = rowIndex % 2 === 0;
                      const starCount = isEvenRow ? 6 : 5;
                      const y = 3.23 + rowIndex * 3.23;
                      const colWidth = 46.5 / 6;

                      return Array.from({ length: starCount }).map((_, starIndex) => {
                        const x = isEvenRow 
                          ? colWidth / 2 + starIndex * colWidth
                          : colWidth + starIndex * colWidth;

                        return (
                          <polygon 
                            key={`star-${rowIndex}-${starIndex}`}
                            points="0,-0.7 0.2,-0.2 0.7,-0.2 0.3,0.1 0.45,0.6 0,0.3 -0.45,0.6 -0.3,0.1 -0.7,-0.2 -0.2,-0.2"
                            transform={`translate(${x}, ${y})`}
                            fill="#ffffff"
                          />
                        );
                      });
                    })}
                  </g>
                </svg>
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-tight text-slate-200">US Interactive Map</span>
                  <span className="text-[10px] font-medium text-slate-400 mt-0.5">
                    Click any state to explore facts, capitals & universities
                  </span>
                </div>
              </div>

              {/* Map Legend & Reset */}
              <div className="flex items-center justify-between gap-3 bg-slate-900/50 p-2 rounded-lg border border-slate-800 text-xs font-medium self-start sm:self-auto min-w-[220px]">
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1e3a8a] border border-blue-400/40 block"></span>
                    <span className="text-[10px] text-slate-300">Active</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-400/40 block"></span>
                    <span className="text-[10px] text-slate-300">Visited</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700 block"></span>
                    <span className="text-[10px] text-slate-300">Unexplored</span>
                  </div>
                </div>
                {Object.keys(game.stateStatus).length > 0 && (
                  <button 
                    onClick={resetProgress}
                    className="text-[9px] font-bold text-rose-400 hover:text-rose-300 transition-colors uppercase tracking-wider pl-2 border-l border-slate-800"
                  >
                    Reset map
                  </button>
                )}
              </div>

            </div>

            {/* Selector Dropdown for devices without hover/svg click */}
            <div className="block md:hidden w-full mb-3">
              <select
                id="state-select"
                value={game.selectedStateId || ''}
                onChange={(e) => {
                  if (e.target.value) {
                    handleStateClick(e.target.value);
                  }
                }}
                className="w-full bg-slate-800 text-slate-100 border border-slate-700 rounded-lg py-2 px-3 text-sm font-semibold focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled>-- Can't tap? Select a State here --</option>
                {statesData.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name} ({state.id})
                  </option>
                ))}
              </select>
            </div>

            {/* SVG Map */}
            <div className="flex-1 flex items-center justify-center p-2">
              <svg 
                viewBox="0 0 960 593" 
                className="w-full h-auto max-h-[500px] drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
              >
                {Object.entries(usaMapDimensions).map(([id, state]) => {
                  const isVisited = game.stateStatus[id] === 'visited';
                  const isSelected = game.selectedStateId === id;

                  let fillClass = 'fill-slate-800 hover:fill-slate-750 stroke-[#c0c0c0] stroke-[1.2]';
                  if (isSelected) {
                    fillClass = 'fill-[#1e3a8a] hover:fill-[#1e3a8a]/90 stroke-blue-200 stroke-[2]';
                  } else if (isVisited) {
                    fillClass = 'fill-emerald-600/80 hover:fill-emerald-500/80 stroke-[#c0c0c0] stroke-[1.2]';
                  }

                  return (
                    <path
                      key={id}
                      d={state.dimensions}
                      className={`transition-all duration-300 cursor-pointer ${fillClass}`}
                      onClick={() => handleStateClick(id)}
                    >
                      <title>{state.name}</title>
                    </path>
                  );
                })}
              </svg>
            </div>

            <div className="border-t border-slate-800/80 mt-1 mb-2 mx-2"></div>

            {/* Territories */}
            <div className="flex flex-col gap-2 px-4 pb-2">
              <div>
                <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-teal-400">❖</span> U.S. Territories
                </h4>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {territoriesList.map((t) => {
                  const isSelected = game.selectedStateId === t.id;
                  const isVisited = game.stateStatus[t.id] === 'visited';
                  
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleStateClick(t.id)}
                      className={`group flex flex-col items-center justify-between p-2 rounded-xl border transition-all duration-300 min-h-[120px] outline-none ${
                        isSelected
                          ? 'border-blue-400 bg-blue-500/10 shadow-lg shadow-blue-500/5'
                          : isVisited
                            ? 'border-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10'
                            : 'border-slate-850 bg-slate-900/30 hover:bg-slate-900/50 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex-1 flex items-center justify-center p-1">
                        {t.map}
                      </div>
                      <div className="text-center mt-1 w-full">
                        <span className="text-[10px] font-bold text-white block truncate leading-tight">
                          {t.name}
                        </span>
                        <span className={`text-[7px] font-black block mt-0.5 uppercase tracking-wider leading-none ${
                          isVisited ? 'text-emerald-400' : 'text-teal-400'
                        }`}>
                          {isVisited ? 'Visited' : 'Territory'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </section>
        </div>

        {/* Right Column (Header Right + Info Column) */}
        <div className="w-full lg:w-96 flex flex-col">
          
          {/* Header Right Box (State Name & Status) */}
          <div className="border border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl mb-4 min-h-[90px] sm:min-h-[114px] flex flex-col justify-center relative overflow-hidden shadow-lg">
            {activeState ? (
              <>
                <div className="absolute top-2 right-3 bg-slate-800 px-2 py-0.5 rounded text-[9px] font-bold text-slate-400 border border-slate-700">
                  {activeState.id}
                </div>
                <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight truncate pr-10">
                  {activeState.name}
                </h2>
                <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
                  <span className="text-xs text-slate-400 font-semibold">Status:</span>
                  <button 
                    onClick={toggleVisited}
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5 transition-all ${
                      isStateVisited
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {isStateVisited ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block animate-pulse"></span>
                        Visited
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500 block"></span>
                        Unexplored
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-400">Select a State on Map</h2>
                <p className="text-[10px] text-slate-500 mt-0.5">Click any state to view its information</p>
              </div>
            )}
          </div>

          {/* Info Column Content */}
          <aside 
            ref={scrollContainerRef}
            className="flex-1 flex flex-col bg-slate-900/60 border border-slate-800/80 rounded-xl sm:rounded-2xl overflow-y-auto max-h-[calc(100vh-250px)] lg:max-h-[calc(100vh-210px)] shadow-2xl"
          >
            
            {activeFacts ? (
              <div className="p-5 flex flex-col gap-5">
                
                {/* 1. State Flag */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">1. State Flag</span>
                  <div 
                    onClick={() => setEnlargedImage({ url: activeFacts.flagUrl, title: `${activeState?.name || ''} State Flag` })}
                    className="w-full h-32 rounded-xl overflow-hidden border border-slate-850 bg-slate-955/40 flex items-center justify-center p-2 cursor-zoom-in hover:scale-[1.02] hover:border-teal-500/50 transition-all duration-300 group relative shadow-inner"
                  >
                    <img 
                      src={activeFacts.flagUrl} 
                      alt={`${activeState?.name || ''} flag`} 
                      className="max-w-full max-h-full object-contain shadow-sm rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'logo.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                      <span className="text-[9px] font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/50">Click to Zoom</span>
                    </div>
                  </div>
                </div>

                {/* 2. State Seal */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">2. State Seal</span>
                  <div 
                    onClick={() => setEnlargedImage({ url: activeFacts.sealUrl, title: `${activeState?.name || ''} State Seal` })}
                    className="w-full h-32 rounded-xl overflow-hidden border border-slate-850 bg-slate-955/40 flex items-center justify-center p-2 cursor-zoom-in hover:scale-[1.02] hover:border-teal-500/50 transition-all duration-300 group relative shadow-inner"
                  >
                    <img 
                      src={activeFacts.sealUrl} 
                      alt={`${activeState?.name || ''} seal`} 
                      className="max-w-full max-h-full object-contain shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'logo.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                      <span className="text-[9px] font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/50">Click to Zoom</span>
                    </div>
                  </div>
                </div>

                {/* Retained: State Nickname & Demographics */}
                {activeFacts.nickname && (
                  <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/5 p-4 rounded-xl border border-amber-500/20">
                    <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">State Nickname</div>
                    <div className="text-lg font-black text-white italic mt-0.5">"{activeFacts.nickname}"</div>
                    {activeFacts.population !== undefined && (
                      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Users className="w-4 h-4 text-amber-500" />
                          <span className="text-xs font-semibold">Population</span>
                        </div>
                        <span className="text-sm font-bold text-white">{activeFacts.population.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Retained: Symbols Grid */}
                {activeFacts.flower && (
                  <div className="flex flex-col gap-2">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Official State Symbols</h5>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-800/30 p-2.5 rounded-lg border border-slate-800/60 flex items-center gap-2">
                        <span className="text-xl">🌸</span>
                        <div className="overflow-hidden">
                          <span className="text-[8px] text-slate-400 block font-bold uppercase">Flower</span>
                          <span className="text-xs text-white font-semibold truncate block" title={activeFacts.flower}>{activeFacts.flower}</span>
                        </div>
                      </div>
                      <div className="bg-slate-800/30 p-2.5 rounded-lg border border-slate-800/60 flex items-center gap-2">
                        <span className="text-xl">🐦</span>
                        <div className="overflow-hidden">
                          <span className="text-[8px] text-slate-400 block font-bold uppercase">Bird</span>
                          <span className="text-xs text-white font-semibold truncate block" title={activeFacts.bird}>{activeFacts.bird}</span>
                        </div>
                      </div>
                      <div className="bg-slate-800/30 p-2.5 rounded-lg border border-slate-800/60 flex items-center gap-2">
                        <span className="text-xl">🌲</span>
                        <div className="overflow-hidden">
                          <span className="text-[8px] text-slate-400 block font-bold uppercase">Tree</span>
                          <span className="text-xs text-white font-semibold truncate block" title={activeFacts.tree}>{activeFacts.tree}</span>
                        </div>
                      </div>
                      <div className="bg-slate-800/30 p-2.5 rounded-lg border border-slate-800/60 flex items-center gap-2">
                        <span className="text-xl">🐻</span>
                        <div className="overflow-hidden">
                          <span className="text-[8px] text-slate-400 block font-bold uppercase">Animal</span>
                          <span className="text-xs text-white font-semibold truncate block" title={activeFacts.animal}>{activeFacts.animal}</span>
                        </div>
                      </div>
                      <div className="bg-slate-800/30 p-2.5 rounded-lg border border-slate-800/60 flex items-center gap-2">
                        <span className="text-xl">🪨</span>
                        <div className="overflow-hidden">
                          <span className="text-[8px] text-slate-400 block font-bold uppercase">Rock</span>
                          <span className="text-xs text-white font-semibold truncate block" title={activeFacts.rock}>{activeFacts.rock}</span>
                        </div>
                      </div>
                      <div className="bg-slate-800/30 p-2.5 rounded-lg border border-slate-800/60 flex items-center gap-2">
                        <span className="text-xl">🎵</span>
                        <div className="overflow-hidden">
                          <span className="text-[8px] text-slate-400 block font-bold uppercase">Song</span>
                          <span className="text-xs text-white font-semibold truncate block" title={activeFacts.song}>{activeFacts.song}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Retained: Culture & Sports Cards */}
                <div className="flex flex-col gap-3">
                  {/* Oldest Restaurant */}
                  {activeFacts.oldestRestaurant && (
                    <div className="bg-slate-800/30 p-3.5 rounded-xl border border-slate-800/60 flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-rose-500 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Oldest Restaurant</span>
                        <span className="text-sm font-bold text-white block mt-0.5">{activeFacts.oldestRestaurant.name}</span>
                        <span className="text-xs text-slate-400 block mt-0.5">Located in {activeFacts.oldestRestaurant.city}</span>
                      </div>
                    </div>
                  )}

                  {/* Sports Teams */}
                  {activeFacts.sports && (activeFacts.sports.nba.length > 0 || activeFacts.sports.nfl.length > 0 || activeFacts.sports.mlb.length > 0) && (
                    <div className="bg-slate-800/30 p-3.5 rounded-xl border border-slate-800/60 flex items-start gap-3">
                      <Trophy className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <div className="w-full">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Major Sports Teams</span>
                        <div className="flex flex-col gap-1.5 mt-2">
                          {activeFacts.sports.nfl.length > 0 && (
                            <div className="text-xs">
                              <span className="font-bold text-amber-500 mr-1.5">NFL:</span>
                              <span className="text-slate-200 font-semibold">{activeFacts.sports.nfl.join(', ')}</span>
                            </div>
                          )}
                          {activeFacts.sports.nba.length > 0 && (
                            <div className="text-xs">
                              <span className="font-bold text-sky-500 mr-1.5">NBA:</span>
                              <span className="text-slate-200 font-semibold">{activeFacts.sports.nba.join(', ')}</span>
                            </div>
                          )}
                          {activeFacts.sports.mlb.length > 0 && (
                            <div className="text-xs">
                              <span className="font-bold text-emerald-500 mr-1.5">MLB:</span>
                              <span className="text-slate-200 font-semibold">{activeFacts.sports.mlb.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3 Icons Badge Row - Bottom right tab-bar */}
                <div className="border-t border-slate-850 pt-4 flex flex-col gap-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Explore Details</span>
                  
                  <div className="flex items-center justify-around gap-4 bg-slate-800/20 p-3 rounded-xl border border-slate-800/50">
                    
                    {/* Cities Button */}
                    <button 
                      onClick={() => setActiveDetailsSection(prev => prev === 'cities' ? null : 'cities')}
                      className={`flex flex-col items-center gap-1.5 transition-all duration-300 focus:outline-none ${
                        activeDetailsSection === 'cities' 
                          ? 'scale-110 opacity-100' 
                          : 'opacity-65 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      <img 
                        src="top_5_cities.jpg" 
                        alt="Top Cities" 
                        className={`w-12 h-12 rounded-full object-cover border-2 shadow-lg transition-all ${
                          activeDetailsSection === 'cities' ? 'border-amber-400 shadow-amber-400/20' : 'border-slate-700'
                        }`}
                      />
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-300">Cities</span>
                    </button>

                    {/* Universities Button */}
                    <button 
                      onClick={() => setActiveDetailsSection(prev => prev === 'universities' ? null : 'universities')}
                      className={`flex flex-col items-center gap-1.5 transition-all duration-300 focus:outline-none ${
                        activeDetailsSection === 'universities' 
                          ? 'scale-110 opacity-100' 
                          : 'opacity-65 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      <img 
                        src="top_5_universities.jpg" 
                        alt="Top Universities" 
                        className={`w-12 h-12 rounded-full object-cover border-2 shadow-lg transition-all ${
                          activeDetailsSection === 'universities' ? 'border-sky-400 shadow-sky-400/20' : 'border-slate-700'
                        }`}
                      />
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-300">Colleges</span>
                    </button>

                    {/* Known Things Button */}
                    <button 
                      onClick={() => setActiveDetailsSection(prev => prev === 'knownThings' ? null : 'knownThings')}
                      className={`flex flex-col items-center gap-1.5 transition-all duration-300 focus:outline-none ${
                        activeDetailsSection === 'knownThings' 
                          ? 'scale-110 opacity-100' 
                          : 'opacity-65 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      <img 
                        src="top_5_known_things.jpg" 
                        alt="Top Known Things" 
                        className={`w-12 h-12 rounded-full object-cover border-2 shadow-lg transition-all ${
                          activeDetailsSection === 'knownThings' ? 'border-emerald-400 shadow-emerald-400/20' : 'border-slate-700'
                        }`}
                      />
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-300">Facts</span>
                    </button>

                  </div>
                </div>

                {/* Details Display area based on active icon button */}
                {activeDetailsSection === 'cities' && activeFacts.topCities && activeFacts.topCities.length > 0 && (
                  <div className="bg-slate-800/40 p-4 rounded-xl border-2 border-amber-500/40 shadow-lg shadow-amber-550/5 animate-fadeIn">
                    <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-wider mb-3 border-b border-slate-800 pb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 block animate-pulse"></span>
                      Top Cities
                    </h4>
                    <ul className="flex flex-col gap-1.5">
                      {activeFacts.topCities.map((city, idx) => (
                        <li key={city} className="bg-slate-850/40 p-2 rounded-lg border border-slate-850/60 flex items-center gap-2.5">
                          <span className="w-4.5 h-4.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-[9px] font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-[11px] text-slate-200 font-semibold">{city}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeDetailsSection === 'universities' && activeFacts.topUniversities && activeFacts.topUniversities.length > 0 && (
                  <div className="bg-slate-800/40 p-4 rounded-xl border-2 border-sky-500/40 shadow-lg shadow-sky-550/5 animate-fadeIn">
                    <h4 className="text-[10px] font-black text-sky-400 uppercase tracking-wider mb-3 border-b border-slate-800 pb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 block animate-pulse"></span>
                      Top Universities
                    </h4>
                    <ul className="flex flex-col gap-1.5">
                      {activeFacts.topUniversities.map((uni, idx) => (
                        <li key={uni} className="bg-slate-850/40 p-2 rounded-lg border border-slate-850/60 flex items-center gap-2.5">
                          <span className="w-4.5 h-4.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center text-[9px] font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-[11px] text-slate-200 font-semibold">{uni}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeDetailsSection === 'knownThings' && activeFacts.knownThings && activeFacts.knownThings.length > 0 && (
                  <div className="bg-slate-800/40 p-4 rounded-xl border-2 border-emerald-500/40 shadow-lg shadow-emerald-550/5 animate-fadeIn">
                    <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-wider mb-3 border-b border-slate-800 pb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block animate-pulse"></span>
                      Top 5 Known Things
                    </h4>
                    <ul className="flex flex-col gap-1.5">
                      {activeFacts.knownThings.map((thing, idx) => (
                        <li key={thing} className="bg-slate-850/40 p-2 rounded-lg border border-slate-850/60 flex items-start gap-2.5">
                          <span className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-[9px] font-bold mt-0.5 flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-[11px] text-slate-200 font-semibold leading-snug">{thing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12 px-4">
                <div className="bg-slate-800/40 p-4 rounded-full border border-slate-800 text-slate-400">
                  <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">No State Selected</h4>
                  <p className="text-xs text-slate-400 mt-2 max-w-[240px] mx-auto leading-relaxed">
                    Choose a state on the interactive map to review its flag, seal, top cities, top universities, and top 5 known facts!
                  </p>
                </div>
              </div>
            )}

          </aside>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-amber-600/20 bg-slate-950/40 backdrop-blur-md py-4 px-4 sm:py-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left text-xs text-amber-950 font-semibold mt-auto gap-4">
        <p>© 2026 US States Explorer Game. Fully functional client-side educational platform.</p>
        <span 
          style={{ fontFamily: '"Arial Narrow", Arial, sans-serif', fontStretch: 'condensed', letterSpacing: '0.05em' }}
          className="text-sm font-black uppercase tracking-wider text-amber-950"
        >
          WILLIAMHCHANSTUDIO
        </span>
      </footer>

      {/* Enlarged Image Modal */}
      {enlargedImage && (
        <div 
          onClick={() => setEnlargedImage(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 max-w-3xl w-full flex flex-col items-center gap-4 shadow-2xl relative cursor-default"
          >
            <button 
              onClick={() => setEnlargedImage(null)}
              className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white p-1.5 rounded-lg border border-slate-700/50 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <h4 className="text-lg font-black text-white tracking-tight mr-8">{enlargedImage.title}</h4>
            
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 w-full h-[60vh] flex items-center justify-center overflow-hidden">
              <img 
                src={enlargedImage.url} 
                alt={enlargedImage.title} 
                className="max-w-full max-h-full object-contain animate-fadeIn"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'logo.jpg';
                }}
              />
            </div>

            <button 
              onClick={() => setEnlargedImage(null)}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl border border-slate-700/60 font-semibold text-xs transition-all shadow-md"
            >
              Close Overlay
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
