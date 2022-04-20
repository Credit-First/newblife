import * as React from 'react';

interface props {
    attack: any,
    active: boolean,
    battleState: any,
    onExist: any
}
function ButtonAction({ attack, active, battleState, onExist }: props) {
    return (
        <div className='button-action flex flex-col items-center justify-center'>
            {
                battleState ? (
                    <>
                        {
                            active ? (
                                <>
                                    <button className='rounded-2xl bg-pink-600 hover:bg-pink-400 p-2 my-2 text-xl w-24' onClick={attack}>Attack</button>
                                    <button className='rounded-2xl bg-pink-600 hover:bg-pink-400 p-2 my-2 text-xl w-24'>Heal</button>
                                    <button className='rounded-2xl bg-pink-600 hover:bg-pink-400 p-2 my-2 text-xl w-24'>Turn</button>
                                    <button className='rounded-2xl bg-pink-600 hover:bg-pink-400 p-2 my-2 text-xl w-24'>Finish</button>
                                </>
                            ) : (
                                <>
                                    <div className=''>waiting for your turn...</div>
                                    <button className='rounded-2xl bg-pink-600 hover:bg-pink-400 p-2 my-2 text-xl w-24' onClick={onExist}>exist</button>
                                </>
                            )
                        }
                    </>
                ) : (
                    <>
                        Waiting for Opporsite...
                    </>
                )
            }
        </div>
    )
}

export default ButtonAction