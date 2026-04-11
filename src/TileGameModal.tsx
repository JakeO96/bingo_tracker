import { ChevronDownIcon } from '@heroicons/react/24/solid';
import type { GameBoardTileData } from '../shared/types/bingo'
import { cn } from './utils';
import { useState } from 'react';
import GoalModal from './GoalModal';

type TileGameModalProps =  {
  tile: GameBoardTileData;
  onClose: () => void;
}


export default function TileGameModal({ tile, onClose }: TileGameModalProps) {

  const [activeGoalIndex, setActiveGoalIndex] = useState<number | null>(null)

  return (
    <div 
      className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4'
    > {/* container for editor form */}
      <div className='w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-md shadow-2xl shadow-black bg-[#e5e7eb]'>
        <div className='flex justify-center items-center p-4'>
          <h2 className='font-medium'>{tile.title}</h2>
        </div>
          <div className="min-h-0 flex flex-1 flex-col justify-start">
            {tile.goals.map((goal, index) => (
              <div className='w-full'>
                <button
                  type='button'
                  key={goal.id ?? index} 
                  className="min-h-0 cursor-pointer w-full"
                  onClick={() => setActiveGoalIndex(activeGoalIndex === index ? null : index)}
                >
                  <div className="min-h-0 grid grid-cols-[1fr_auto] items-end bg-gray-300 p-3">
                    <p className={cn(
                        "min-w-0 leading-tight text-slate-600 flex items-center",
                        goal.isComplete && "bg-emerald-200"
                      )}
                    >
                      <ChevronDownIcon className='h-5 w-3 mr-2'/>
                      {goal.text}
                    </p>
                    <p className="leading-tight tracking-tight text-slate-500 whitespace-nowrap">
                      {`${goal.points} points`} 
                    </p>
                  </div>
                </button>
                {activeGoalIndex === index && (
                  <GoalModal goal={tile.goals[activeGoalIndex]} />
                )}
                {index < tile.goals.length - 1 && (
                  <div className="my-0.5 h-px w-full" />
                )}
              </div>

            ))}
          </div>
        <div className='flex justify-center items-center p-4'>
          <button 
          
            type="button"
            onClick={onClose} 
            className="w-1/3 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-emerald-500 
            mt-5 text-sm font-semibold text-white transition duration-200 hover:cursor-pointer 
            hover:brightness-120 focus:outline-none focus:ring-2 focus:ring-emerald-200 active:scale-[0.98]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}