import * as React from 'react';
import clsx from 'clsx';

const text = [
    {
        title: 'How to get one or more Newblife NFT?',
        content: 'You will be able to purchase a Newblife NFT from our website when the public sale goes live December 24th at 3 PM EST. Once you Mint your Newblife, a Randomly selected NFT will be delivered to your Metamask or Bifrost wallet. You will then be able to see it or sale it on our marketplace.'
    },
    {
        title: 'What is the total supply of Newblife NFTs?',
        content: "There will be 4444 Newblife NFTs on each of the 4 blockchains. Once all Newblifes have been sold, you'll only be able to buy a Newblife on a marketplace for a higher price then mint price."
    },
    // {
    //     title: 'How to buy a Newblife NFT?',
    //     content: '<p>To buy a Newblife NFT when the public sale goes live on December 24th at 3pm EST, you will need the specific coin from the blockchain you desire to buy from. $AVAX For Avalanche, $Matic for Polygon, $BNB for Binance Smart Chain and $SGB For Songbird.</p>' + 
    //             '<p>You Can Purchase Songbird from Bitrue, $AVAX From Coinbase, $BNB From Binance, and $Matic from Coinbase. Some of these coins are offered on other exchanges as well. Once you are ready to Mint you will click on the "Mint" button that will appear on our website when the public sale goes live!</p>'
    // },
    // {
    //     title: 'Will there be a Whitelist?',
    //     content: 'Yes, Whitelisted individuals will be allowed to purchase 1 hour before the public sale with a max of 10 Newblifes per wallet.'
    // },
    // {
    //     title: 'Are there secondary sale royalties?',
    //     content: 'Yes, 10% of the secondary sales will be deducted in royalties to fund the projects roadmaps, marketing and pay our team to ensure steady growth and secure profit for every holder.'
    // },
    // {
    //     title: 'What does holding a Newblife get me?',
    //     content: 'The Newblifes will be minted on 4 different blockchains. Owning a Newblife will give you the chance to Yield our native currency $NewblifeCoin, which can be traded for Fiat or used to purchase NFTs or other items listed in the marketplace.'
    // },
    // {
    //     title: 'What is the Metaverse?',
    //     content: 'The Metaverse is the World 3.0. The word refers to a shared virtual reality where everything and anything can be bought and sold just like on the markets, using cryptocurrency. The Newblifes will soon make a unique entrance into the Metaverse, through gaming and custom avatars.'
    // }
]
function FaqsSection() {
    const [seletedDiv, setSelecteDiv] = React.useState(0);
    const handleClick = (id: any) => () => {
        setSelecteDiv(id)
    }
    return (
        <>
            <div id='faqs' className='faqs mb-32'>
                <div className='header w-full flex justify-center items-center mb-12' data-aos="zoom-out">
                    <div className='text-5xl text-white'>FAQs</div>
                </div>
                {
                    text.map((item: any, key: any) => {
                        return (
                            <div key={key} className={clsx('faqs-wrapper mx-12 my-4 my-auto rounded-xl border border-main overflow-hidden ease-linear transition-all', seletedDiv == key ? 'active' : '')}>
                                <button role="button" className='relative w-full flex flex-col flex-1 overflow-hidden items-stretch justify-center bg-transparent border-transparent text-left border-0 p-0 cursor-pointer border-solid' onClick={handleClick(key)}>
                                    <div className="faq-qs flex justify-between items-center p-4" data-aos="fade-up" >
                                        <div className="faq-title w-[98%] text-xl pr-8 text-white">
                                            {item.title}
                                        </div>
                                        <span className={clsx("faq-arrow bg-main rounded-full w-8 h-8 flex items-center justify-center origin-center ease-linear transition-all", seletedDiv == key ? '-rotate-90' : 'rotate-90')}>
                                            <img className="faq-arrow-icon w-4 h-4" src="/images/right-arrow.png" alt="right" />
                                        </span>
                                    </div>
                                </button>
                                <div className={clsx("faqs-answer text-white overflow-hidden border-white ease-linear transition-all p-6 border-t", seletedDiv == key ? '' : 'hidden')}>
                                    <p>
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default FaqsSection;