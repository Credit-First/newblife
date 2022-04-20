import * as React from 'react';

function footerSection() {
    return (
        <>
            <footer id='footer' className='footer bg-black'>
                <div className='footer-container text-white flex justify-between items-center pt-16 px-12 '>
                    <div className='infos'>
                        {/* <img className='w-[280px]' src={'/images/logo.png'} /> */}
                        <div className='text-5xl'>Newblife</div>
                    </div>
                    <div className="right flex items-center justify-center ">
                        <div className="social flex">
                            <div className="link border border-main border-solid w-16 h-16 mr-8 drop-shadow shadow-main ease-linear transition-all">
                                <a href="https://www.instagram.com/newblife_nft" rel="noopener noreferrer" target="_blank" className="insta row">.</a>
                            </div>
                            <div className="link border border-main border-solid w-16 h-16 mr-8 drop-shadow shadow-main ease-linear transition-all">
                                <a href="https://twitter.com/newblifesNFTs" target="_blank" rel="noopener noreferrer" className="twitter row">.</a>
                            </div>
                            <div className="link border border-main border-solid w-16 h-16 mr-8 drop-shadow shadow-main ease-linear transition-all">
                                <a href="https://discord.com/invite/XzHc5M93B4" target="_blank" rel="noopener noreferrer" className="discord row">.</a>
                            </div>
                            <div className="link border border-main border-solid w-16 h-16 mr-8 drop-shadow shadow-main ease-linear transition-all"><a href="https://t.me/newblifesNFTs" target="_blank" rel="noopener noreferrer" className="tele row">.</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default footerSection;