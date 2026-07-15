import { useState, useMemo } from 'react';
import { 
  Compass, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  GraduationCap, 
  Building2, 
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import { statesData } from './data/statesData';
import { usaMapDimensions } from './data/usaMapDimensions';

// Helper to shuffle choices
const shuffle = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const universityMap: Record<string, string> = {
  "Arizona State University": "Tempe State University",
  "Arkansas State University": "Jonesboro State University",
  "Auburn University": "Auburn University",
  "Boise State University": "Boise State University",
  "Bowdoin College": "Bowdoin College",
  "Brigham Young University": "Brigham Young University",
  "Brown University": "Brown University",
  "Case Western Reserve University": "Case Western Reserve University",
  "Casper College": "Casper College",
  "Clemson University": "Clemson University",
  "Colorado State University": "Fort Collins State University",
  "Columbia University": "Columbia University",
  "Creighton University": "Creighton University",
  "Dartmouth College": "Dartmouth College",
  "Delaware State University": "Dover State University",
  "Duke University": "Duke University",
  "Emory University": "Emory University",
  "Florida State University": "Tallahassee State University",
  "Georgetown University": "Georgetown University",
  "Harvard University": "Harvard University",
  "Hawaii Pacific University": "Pacific University of Honolulu",
  "Indiana University Bloomington": "Bloomington University",
  "Iowa State University": "Ames State University",
  "Johns Hopkins University": "Johns Hopkins University",
  "Kansas State University": "Manhattan State University",
  "Louisiana State University": "Baton Rouge State University",
  "Macalester College": "Macalester College",
  "Marquette University": "Marquette University",
  "Marshall University": "Marshall University",
  "Massachusetts Institute of Technology": "Cambridge Institute of Technology",
  "Michigan State University": "East Lansing State University",
  "Middlebury College": "Middlebury College",
  "Mississippi State University": "Starkville State University",
  "Montana State University": "Bozeman State University",
  "New Mexico State University": "Las Cruces State University",
  "New York University": "Washington Square University",
  "North Dakota State University": "Fargo State University",
  "Northwestern University": "Northwestern University",
  "Ohio State University": "Columbus State University",
  "Oklahoma State University": "Stillwater State University",
  "Oregon State University": "Corvallis State University",
  "Penn State University": "State College University",
  "Princeton University": "Princeton University",
  "Purdue University": "Purdue University",
  "Rutgers University": "Rutgers University",
  "San Diego State University": "San Diego State University",
  "South Dakota State University": "Brookings State University",
  "Stanford University": "Stanford University",
  "Texas A&M University": "College Station University",
  "Tulane University": "Tulane University",
  "University of Alabama": "University of Tuscaloosa",
  "University of Alaska Anchorage": "University of Anchorage",
  "University of Alaska Fairbanks": "University of Fairbanks",
  "University of Arizona": "University of Tucson",
  "University of Arkansas": "University of Fayetteville",
  "University of California, Berkeley": "University of Berkeley",
  "University of Chicago": "University of Chicago",
  "University of Colorado Boulder": "University of Boulder",
  "University of Connecticut": "University of Storrs",
  "University of Delaware": "University of Newark",
  "University of Florida": "University of Gainesville",
  "University of Georgia": "University of Athens",
  "University of Hawaii at Manoa": "University of Manoa",
  "University of Idaho": "University of Moscow",
  "University of Illinois": "University of Urbana-Champaign",
  "University of Iowa": "University of Iowa City",
  "University of Kansas": "University of Lawrence",
  "University of Kentucky": "University of Lexington",
  "University of Louisville": "University of Louisville",
  "University of Maine": "University of Orono",
  "University of Maryland": "University of College Park",
  "University of Memphis": "University of Memphis",
  "University of Michigan": "University of Ann Arbor",
  "University of Minnesota": "University of Minneapolis",
  "University of Mississippi": "University of Oxford",
  "University of Missouri": "University of Columbia",
  "University of Montana": "University of Missoula",
  "University of Nebraska-Lincoln": "University of Lincoln",
  "University of Nevada Las Vegas": "University of Las Vegas",
  "University of Nevada Reno": "University of Reno",
  "University of Nevada, Las Vegas": "University of Las Vegas",
  "University of New Hampshire": "University of Durham",
  "University of New Mexico": "University of Albuquerque",
  "University of North Carolina at Chapel Hill": "University of Chapel Hill",
  "University of North Dakota": "University of Grand Forks",
  "University of Oklahoma": "University of Norman",
  "University of Oregon": "University of Eugene",
  "University of Pennsylvania": "University of Philadelphia",
  "University of Rhode Island": "University of Kingston",
  "University of South Carolina": "University of Columbia",
  "University of South Dakota": "University of Vermillion",
  "University of Tennessee": "University of Knoxville",
  "University of Texas at Austin": "University of Austin",
  "University of Utah": "University of Salt Lake City",
  "University of Vermont": "University of Burlington",
  "University of Virginia": "University of Charlottesville",
  "University of Washington": "University of Seattle",
  "University of Wisconsin-Madison": "University of Madison",
  "University of Wyoming": "University of Laramie",
  "Vanderbilt University": "Vanderbilt University",
  "Virginia Tech": "Blacksburg Institute of Technology",
  "Washington State University": "Pullman State University",
  "Washington University in St. Louis": "Washington University in Saint Louis",
  "West Virginia University": "Morgantown University",
  "Yale University": "Yale University"
};

const cleanUniversityName = (name: string): string => {
  return universityMap[name] || name;
};

type QuizMode = 'capitol' | 'university' | 'both';
type StateStatus = 'correct' | 'wrong' | 'unanswered';

interface GameState {
  score: { correct: number; total: number };
  stateStatus: Record<string, StateStatus>;
  selectedStateId: string | null;
  currentMode: QuizMode | null;
  quizStep: 'mode-select' | 'question-1' | 'question-2' | 'feedback';
  capitolChoices: string[];
  universityChoices: string[];
  selectedAnswer: string | null;
  firstQuestionPassed: boolean | null; // For 'both' mode tracking
  lastFeedback: {
    isCorrect: boolean;
    message: string;
    details: string;
  } | null;
}

const initialGameState: GameState = {
  score: { correct: 0, total: 0 },
  stateStatus: {},
  selectedStateId: null,
  currentMode: null,
  quizStep: 'mode-select',
  capitolChoices: [],
  universityChoices: [],
  selectedAnswer: null,
  firstQuestionPassed: null,
  lastFeedback: null,
};

export default function App() {
  const [game, setGame] = useState<GameState>(initialGameState);

  // Active state data lookup
  const activeState = useMemo(() => {
    if (!game.selectedStateId) return null;
    return statesData.find(s => s.id === game.selectedStateId) || null;
  }, [game.selectedStateId]);

  // Click on a state on the map
  const handleStateClick = (stateId: string) => {
    const state = statesData.find(s => s.id === stateId);
    if (!state) return;

    // Reset current quiz attempt for the clicked state
    setGame(prev => ({
      ...prev,
      selectedStateId: stateId,
      currentMode: null,
      quizStep: 'mode-select',
      selectedAnswer: null,
      firstQuestionPassed: null,
      lastFeedback: null,
    }));
  };

  // Start the quiz for the selected state
  const startQuiz = (mode: QuizMode) => {
    if (!activeState) return;

    // Build choices
    const capChoices = shuffle([
      activeState.capitol,
      activeState.topCities[0] || 'Major City A',
      activeState.topCities[1] || 'Major City B',
    ]);

    const uniChoices = shuffle([
      cleanUniversityName(activeState.inStateUniversities[0] || 'State Univ 1'),
      cleanUniversityName(activeState.inStateUniversities[1] || 'State Univ 2'),
      cleanUniversityName(activeState.outOfStateDistractor.name),
    ]);

    setGame(prev => ({
      ...prev,
      currentMode: mode,
      capitolChoices: capChoices,
      universityChoices: uniChoices,
      selectedAnswer: null,
      firstQuestionPassed: null,
      lastFeedback: null,
      quizStep: mode === 'university' ? 'question-2' : 'question-1',
    }));
  };

  // Submit answer for Capitol Quiz (Question 1)
  const submitCapitolAnswer = (answer: string) => {
    if (!activeState) return;

    const isCorrect = answer === activeState.capitol;
    const citiesStr = activeState.topCities.slice(0, 2).join(' and ');
    
    const feedback = {
      isCorrect,
      message: isCorrect ? 'Correct!' : 'Incorrect!',
      details: isCorrect
        ? `${activeState.capitol} is indeed the official capitol of ${activeState.name}, even though cities like ${citiesStr} are larger!`
        : `Nice try! The official capitol of ${activeState.name} is ${activeState.capitol}. ${answer} is a major city in the state but not the capitol.`
    };

    if (game.currentMode === 'both') {
      // In both mode, record first question result temporarily and proceed to question 2
      setGame(prev => ({
        ...prev,
        firstQuestionPassed: isCorrect,
        selectedAnswer: null,
        lastFeedback: feedback,
        quizStep: 'question-2',
      }));
    } else {
      // Single quiz mode end
      updateEndState(isCorrect, feedback);
    }
  };

  // Submit answer for University Quiz (Question 2)
  const submitUniversityAnswer = (answer: string) => {
    if (!activeState) return;

    const cleanDistractor = cleanUniversityName(activeState.outOfStateDistractor.name);
    const isCorrect = answer === cleanDistractor;
    const feedback = {
      isCorrect,
      message: isCorrect ? 'Correct!' : 'Incorrect!',
      details: isCorrect
        ? `Great job! ${answer} is located in ${activeState.outOfStateDistractor.state}, while the others are in ${activeState.name}.`
        : `Oops! ${answer} is located in ${activeState.name}, but ${cleanDistractor} is actually out-of-state in ${activeState.outOfStateDistractor.state}.`
    };

    if (game.currentMode === 'both') {
      // Combined quiz ends
      const bothCorrect = (game.firstQuestionPassed === true) && isCorrect;
      
      const combinedFeedback = {
        isCorrect: bothCorrect,
        message: bothCorrect ? 'Outstanding! Both Correct!' : 'Quiz Complete!',
        details: `${game.lastFeedback?.details} Additionally, ${feedback.details}`
      };
      
      updateEndState(bothCorrect, combinedFeedback);
    } else {
      // Single quiz mode end
      updateEndState(isCorrect, feedback);
    }
  };

  // Finalize quiz step and record scores
  const updateEndState = (
    isCorrect: boolean, 
    feedback: { isCorrect: boolean; message: string; details: string }
  ) => {
    if (!game.selectedStateId) return;

    setGame(prev => {
      const stateId = prev.selectedStateId!;
      const currentStatus = prev.stateStatus[stateId];
      
      // Only count score if they haven't answered this state correctly already, or standard increment
      const newStatus: StateStatus = isCorrect ? 'correct' : 'wrong';
      
      // If it was already answered correct, don't double count score
      const alreadyCorrect = currentStatus === 'correct';
      
      return {
        ...prev,
        score: {
          correct: prev.score.correct + (isCorrect && !alreadyCorrect ? 1 : 0),
          total: prev.score.total + (!alreadyCorrect ? 1 : 0)
        },
        stateStatus: {
          ...prev.stateStatus,
          [stateId]: newStatus
        },
        lastFeedback: feedback,
        quizStep: 'feedback'
      };
    });
  };

  // Reset the full game
  const resetGame = () => {
    setGame(initialGameState);
  };

  // Count progress
  const answeredCount = Object.keys(game.stateStatus).length;
  const correctCount = Object.values(game.stateStatus).filter(s => s === 'correct').length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-slate-100 selection:bg-slate-900/30">
      
      {/* Header Bar */}
      <header className="border-b border-amber-600/20 bg-slate-900/60 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <img 
            src="/logo.jpg" 
            alt="William H. Chan Educational Games" 
            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-xl border border-teal-500/30 shadow-lg shadow-teal-500/5 animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div>
            <h1 className="text-sm sm:text-xl font-bold tracking-tight bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              US States Explorer & Quiz
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400">Interactive Geography & Academics Guide</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Progress stats */}
          <div className="hidden md:flex gap-4">
            <div className="bg-slate-800/40 border border-slate-700/50 px-3 py-1.5 rounded-lg text-center">
              <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">States Visited</span>
              <span className="text-sm font-bold text-teal-400">{answeredCount} / 50</span>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/50 px-3 py-1.5 rounded-lg text-center">
              <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Quiz Score</span>
              <span className="text-sm font-bold text-emerald-400">
                {game.score.total > 0 ? `${Math.round((game.score.correct / game.score.total) * 100)}%` : '0%'} 
                <span className="text-xs font-normal text-slate-400 ml-1">({game.score.correct}/{game.score.total})</span>
              </span>
            </div>
          </div>

          <button 
            onClick={resetGame}
            className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-lg text-[10px] sm:text-xs font-semibold border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Reset Game
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 flex flex-col lg:flex-row p-3 sm:p-6 gap-4 sm:gap-6 max-w-7xl mx-auto w-full">
        
        {/* Map Column */}
        <section className="flex-1 flex flex-col bg-slate-900/40 border border-slate-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-2xl relative min-h-[300px] sm:min-h-[400px]">
          <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3 relative">
            {/* Top Left: American Waving Flag Icon replacing USA */}
            <div className="flex items-center gap-2">
              <svg width="108" height="60" viewBox="0 0 108 60" className="drop-shadow-md overflow-visible">
                <g>
                  {/* Red background for stripes */}
                  <rect width="108" height="60" fill="#B22234" rx="1.5" />
                  {/* White stripes */}
                  <rect y="4.62" width="108" height="4.62" fill="#ffffff" />
                  <rect y="13.85" width="108" height="4.62" fill="#ffffff" />
                  <rect y="23.08" width="108" height="4.62" fill="#ffffff" />
                  <rect y="32.31" width="108" height="4.62" fill="#ffffff" />
                  <rect y="41.54" width="108" height="4.62" fill="#ffffff" />
                  <rect y="50.77" width="108" height="4.62" fill="#ffffff" />
                  {/* Blue canton */}
                  <rect width="46.5" height="32.31" fill="#3C3B6E" rx="1.5" />
                  {/* Exact 50 Stars Canton (9 rows alternating 6 and 5 stars) */}
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
              <span className="text-lg font-bold tracking-tight text-slate-100 block md:hidden">US Map</span>
            </div>

            {/* Middle Top: Click any state... */}
            <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 text-left md:text-center">
              <p className="text-xs font-semibold text-slate-200">Click any state to start learning its capitols & universities</p>
            </div>

            {/* Map Legend */}
            <div className="flex flex-wrap gap-2 text-xs font-medium bg-slate-900/50 p-2 rounded-lg border border-slate-800 self-start md:self-auto">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#1e3a8a] border border-blue-400/40 block"></span>
                <span>Active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40 block"></span>
                <span>Correct</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/40 block"></span>
                <span>Wrong</span>
              </div>
            </div>

            {/* Mobile Dropdown Selector */}
            <div className="block md:hidden w-full mt-1">
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
          </div>

          {/* SVG Map Container */}
          <div className="flex-1 flex items-center justify-center p-2">
            <svg 
              viewBox="0 0 960 593" 
              className="w-full h-auto max-h-[550px] drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
            >
              {Object.entries(usaMapDimensions).map(([id, state]) => {
                const status = game.stateStatus[id] || 'unanswered';
                const isSelected = game.selectedStateId === id;

                // Determine coloring classes (Silver borders for states, Active in Blue)
                let fillClass = 'fill-slate-800 hover:fill-slate-700 stroke-[#c0c0c0] stroke-[1.2]';
                if (isSelected) {
                  fillClass = 'fill-[#1e3a8a] hover:fill-[#1e3a8a]/90 stroke-blue-200 stroke-[2]';
                } else if (status === 'correct') {
                  fillClass = 'fill-emerald-600/80 hover:fill-emerald-500/80 stroke-[#c0c0c0] stroke-[1.2]';
                } else if (status === 'wrong') {
                  fillClass = 'fill-rose-700/80 hover:fill-rose-600/80 stroke-[#c0c0c0] stroke-[1.2]';
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
        </section>

        {/* Sidebar Quiz Panel */}
        <aside className="w-full lg:w-96 flex flex-col bg-slate-900/60 border border-slate-800/80 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Sidebar Header */}
          <div className="bg-slate-900 px-6 py-5 border-b border-slate-800">
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
              Explorer Console
            </h3>
            <p className="text-xs text-slate-400 mt-1">Select a state on the map to begin quizzes</p>
          </div>

          {/* Sidebar Body */}
          <div className="flex-1 p-6 flex flex-col overflow-y-auto">
            {activeState ? (
              <div className="flex-1 flex flex-col gap-6">
                
                {/* State Card Title */}
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 text-center relative overflow-hidden">
                  <div className="absolute top-2 right-2 bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-400 border border-slate-700">
                    {activeState.id}
                  </div>
                  <h4 className="text-2xl font-black text-white tracking-tight">{activeState.name}</h4>
                  <p className="text-xs text-teal-400 font-semibold mt-1">Status: {
                    game.stateStatus[activeState.id] === 'correct' ? '✅ Completed' :
                    game.stateStatus[activeState.id] === 'wrong' ? '❌ Needs Practice' : '⚪ Unexplored'
                  }</p>
                </div>

                {/* Step 1: Select Quiz Mode */}
                {game.quizStep === 'mode-select' && (
                  <div className="flex-1 flex flex-col gap-4">
                    <h5 className="text-sm font-semibold text-slate-300">Choose a Challenge Mode:</h5>
                    
                    <button
                      onClick={() => startQuiz('capitol')}
                      className="w-full text-left p-4 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-teal-500/40 rounded-xl transition-all flex items-start gap-3 group"
                    >
                      <div className="bg-amber-500/10 p-2 rounded-lg text-amber-400 border border-amber-500/20 group-hover:bg-amber-500/20">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-sm text-slate-200 block group-hover:text-white">Option 1: Capitol Quiz</span>
                        <span className="text-xs text-slate-400 block mt-0.5">Guess the correct official state capitol city.</span>
                      </div>
                    </button>

                    <button
                      onClick={() => startQuiz('university')}
                      className="w-full text-left p-4 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-teal-500/40 rounded-xl transition-all flex items-start gap-3 group"
                    >
                      <div className="bg-sky-500/10 p-2 rounded-lg text-sky-400 border border-sky-500/20 group-hover:bg-sky-500/20">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-sm text-slate-200 block group-hover:text-white">Option 2: University Quiz</span>
                        <span className="text-xs text-slate-400 block mt-0.5">Identify which university is out-of-state.</span>
                      </div>
                    </button>

                    <button
                      onClick={() => startQuiz('both')}
                      className="w-full text-left p-4 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-teal-500/40 rounded-xl transition-all flex items-start gap-3 group"
                    >
                      <div className="bg-teal-500/10 p-2 rounded-lg text-teal-400 border border-teal-500/20 group-hover:bg-teal-500/20">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-sm text-slate-200 block group-hover:text-white">Combined: Both Quizzes</span>
                        <span className="text-xs text-slate-400 block mt-0.5">Test your skills on both capitols and colleges!</span>
                      </div>
                    </button>
                  </div>
                )}

                {/* Step 2: Capitol Quiz (Question 1) */}
                {game.quizStep === 'question-1' && (
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Question 1: State Capitol</span>
                      <p className="text-sm font-semibold text-slate-200 mt-1">
                        Which of these is the official Capitol of <span className="text-white underline decoration-teal-400">{activeState.name}</span>?
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        Hint: Distractor cities include large metropolitan zones like {activeState.topCities.slice(0, 2).join(' and ')}.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      {game.capitolChoices.map((choice) => (
                        <button
                          key={choice}
                          onClick={() => submitCapitolAnswer(choice)}
                          className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-650 rounded-xl border border-slate-700 text-left text-sm font-semibold hover:text-white transition-all"
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: University Quiz (Question 2) */}
                {game.quizStep === 'question-2' && (
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
                        {game.currentMode === 'both' ? 'Question 2: Out of State Distractor' : 'Question: University Quiz'}
                      </span>
                      <p className="text-sm font-semibold text-slate-200 mt-1">
                        Identify the university that is <span className="text-rose-400 font-bold">OUT OF STATE</span> (not located in {activeState.name}).
                      </p>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      {game.universityChoices.map((choice) => (
                        <button
                          key={choice}
                          onClick={() => submitUniversityAnswer(choice)}
                          className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-650 rounded-xl border border-slate-700 text-left text-sm font-semibold hover:text-white transition-all"
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Feedback Display */}
                {game.quizStep === 'feedback' && game.lastFeedback && (
                  <div className="flex-1 flex flex-col gap-5 justify-between">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-center">
                        {game.lastFeedback.isCorrect ? (
                          <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                            <CheckCircle2 className="w-12 h-12 animate-bounce" />
                          </div>
                        ) : (
                          <div className="bg-rose-500/10 p-4 rounded-full border border-rose-500/30 text-rose-400 flex items-center justify-center">
                            <XCircle className="w-12 h-12 animate-bounce" />
                          </div>
                        )}
                      </div>

                      <div className="text-center">
                        <h4 className={`text-xl font-bold ${game.lastFeedback.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {game.lastFeedback.message}
                        </h4>
                        <p className="text-sm text-slate-300 mt-3 leading-relaxed px-2">
                          {game.lastFeedback.details}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setGame(prev => ({ ...prev, quizStep: 'mode-select', lastFeedback: null }))}
                      className="w-full py-3 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-teal-500/15"
                    >
                      Choose Another Quiz
                    </button>
                  </div>
                )}

              </div>
            ) : (
              /* Initial Instruction State */
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12 px-4">
                <div className="bg-slate-800/40 p-4 rounded-full border border-slate-800 text-slate-400">
                  <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">No State Selected</h4>
                  <p className="text-xs text-slate-400 mt-2 max-w-[240px] mx-auto leading-relaxed">
                    Choose a state on the interactive map to review its details and take the quiz options!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Footer Stats */}
          <div className="bg-slate-900/60 p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              Correct: {correctCount} states
            </span>
            <span>
              Reset score above
            </span>
          </div>

        </aside>

      </main>

      {/* Footer */}
      <footer className="border-t border-amber-600/20 bg-slate-950/40 backdrop-blur-md py-4 px-4 sm:py-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left text-xs text-amber-950 font-semibold mt-auto gap-4">
        <p>© 2026 US States Explorer & Quiz Game. Fully functional client-side educational platform.</p>
        <span 
          style={{ fontFamily: '"Arial Narrow", Arial, sans-serif', fontStretch: 'condensed', letterSpacing: '0.05em' }}
          className="text-sm font-black uppercase tracking-wider text-amber-950"
        >
          WILLIAMHCHANSTUDIO
        </span>
      </footer>

    </div>
  );
}
