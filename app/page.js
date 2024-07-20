'use client'
require('dotenv').config();

import './style.css';
import Image from 'next/image';
import { ethlogo, linealogo, celologo, maticlogo, blastlogo, optimismlogo, arbitrumlogo, zksynclogo, starknetlogo, bnblogo } from '../lib/logos';
import Links from './link';
import { useState, useEffect } from 'react';

const Home = () => {
  const [activeItem, setActiveItem] = useState('Portfolio');
  const [content, setContent] = useState(null);
  const [walletBalance, setWalletBalance] = useState({
    balanceInEth: '0.00',
    balanceInLinea: '0.00',
    balanceInCelo: '0.00',
    balanceInUsdEth: '0.00',
    balanceInUsdCelo: '0.00',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Clear session storage on page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('walletBalance');
    }
  }, []);

  const fetchWalletBalance = async (address) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/getWalletBalance?address=${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setWalletBalance(data);
      sessionStorage.setItem('walletBalance', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      setError('Error fetching wallet balance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const address = '0xBA2bf37711917b963a245906Ad290aD79Bc27B69';
    const storedBalance = sessionStorage.getItem('walletBalance');
    if (!storedBalance) {
      fetchWalletBalance(address);
    } else {
      setWalletBalance(JSON.parse(storedBalance));
    }
  }, []);

  useEffect(() => {
    switch (activeItem) {
      case 'Portfolio':
        setContent(
          <div className="article">
            <header><h2 className="h2 article-title">Portfolio</h2></header>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div>
                <h3 className="totalassests">Total Assests: {walletBalance.totalassets}</h3>
                <div className="wallet-balances">



                <div className="balance">
                <Image className="logo-image" src={ethlogo} alt="Ethereum Logo" width={100} height={100} />
                <p className="balance-crypto">ETH: {walletBalance.balanceInEth} ETH</p>
                <p className="balance-usd">(${walletBalance.balanceInUsdEth})</p>
                </div>

                <div className="balance">
                <Image className="logo-image" src={linealogo} alt="Linea Logo" width={100} height={100} />
                <p className="balance-crypto">Linea: {walletBalance.balanceInLinea} ETH</p>
                <p className="balance-usd">(${walletBalance.balanceInUsdLinea})</p>
                </div>

                <div className="balance">
                <Image className="logo-image" src={celologo} alt="Celo Logo" width={100} height={100} />
                <p className="balance-crypto">Celo: {walletBalance.balanceInCelo} CELO</p>
                <p className="balance-usd">(${walletBalance.balanceInUsdCelo})</p>
                </div>

                <div className="balance">
                <Image className="logo-image" src={maticlogo} alt="Matic Logo" width={100} height={100} />
                <p className="balance-crypto">MATIC: {walletBalance.balanceInMatic} MATIC</p>
                <p className="balance-usd">(${walletBalance.balanceInUsdMatic})</p>
                </div>

                <div className="balance">
                <Image className="logo-image" src={blastlogo} alt="Blast Logo" width={100} height={50} />
                <p className="balance-crypto">BLAST: {walletBalance.balanceInBlast} BLAST</p>
                <p className="balance-usd">(${walletBalance.balanceInUsdBlast})</p>
                </div>

                <div className="balance">
                <Image className="logo-image" src={optimismlogo} alt="Optimism Logo" width={100} height={100} />
                <p className="balance-crypto">OP: {walletBalance.balanceInOptimism} OP</p>
                <p className="balance-usd">(${walletBalance.balanceInUsdOptimism})</p>
                </div>

                <div className="balance">
                <Image className="logo-image" src={arbitrumlogo} alt="Arbitrum Logo" width={100} height={100} />
                <p className="balance-crypto">ARB: {walletBalance.balanceInArbitrum} ARB</p>
                <p className="balance-usd">(${walletBalance.balanceInUsdArbitrum})</p>
                </div>
                <div className="balance">
                <Image className="logo-image" src={zksynclogo} alt="Zksync Logo" width={100} height={100} />
                <p className="balance-crypto">ZK: {walletBalance.balanceInZksync} ZK</p>
                <p className="balance-usd">(${walletBalance.balanceInUsdZksync})</p>
                </div>

                {/*<div className="balance">
                <Image className="logo-image" src={starknetlogo} alt="Starknet Logo" width={100} height={100} />
                <p className="balance-crypto">STRK: {walletBalance.balanceInStarknet} ETH</p>
                <p className="balance-usd">(${walletBalance.balanceInUsdStarknet})</p>
                 </div>*/}

                <div className="balance">
                <Image className="logo-image" src={bnblogo} alt="BNB Logo" width={100} height={100} />
                <p className="balance-crypto">BNB: {walletBalance.balanceInBnb} BNB</p>
                <p className="balance-usd">(${walletBalance.balanceInUsdBnb})</p>
                </div>



                </div>
              </div>
            )}
          </div>
        );
        break;
      case 'About':
        setContent(
          <article className="about" data-page="about">
            <header>
              <h2 className="h2 article-title">About me</h2>
            </header>
            <section className="about-text">
              <p>
              I&apos;m a lazy and poor airdrop farmer. And as we are in the era of Web3:
                Data War, I won&apos;t say not much about me.
              </p>
              <p>
                You are welcome to visit my site, where I have put some of the recent
                projects I am doing and join to farm airdrop. Of course, DO YOUR OWN
                RESEARCH before joining into anything.
              </p>
            </section>
          </article>
        );
        break;
      case 'Projects':
        setContent(
          <div className='resume article'>
            <h2 className="h2 article-title">Projects</h2>
            <section className="carousel">
        <div className="carousel-container">
            <div className="carousel-track">
                <div className="carousel-item"><Image src="/layer3.svg" alt="Layer3" width={100} height={50} /></div>
                <div className="carousel-item"><Image src="/immutable.svg" alt="Immutable" width={100} height={50} /></div>
                <div className="carousel-item"><Image src="/allo.png" alt="Allo" width={100} height={30} /></div>
                <div className="carousel-item"><Image src="/azcoiner.webp" alt="Azcoiner" width={100} height={30} /></div>
                <div className="carousel-item"><Image src="/bondex.svg" alt="Bondex" width={100} height={50} /></div>
                <div className="carousel-item"><Image src="/cvex.svg" alt="Cvex" width={100} height={50} /></div>
                <div className="carousel-item"><Image src="/shardeum.svg" alt="Shardeum" width={100} height={50} /></div>
                <div className="carousel-item"><Image src="/tabi.svg" alt="Tabi" width={100} height={50} /></div>
                <div className="carousel-item"><Image src="/particle.png" alt="Particle" width={200} height={50} /></div>
               
                <div className="carousel-item"><Image src="/layer3.svg" alt="Layer3" width={100} height={50} /></div>
                <div className="carousel-item"><Image src="/immutable.svg" alt="Immutable" width={100} height={50} /></div>
                <div className="carousel-item"><Image src="/allo.png" alt="Allo" width={100} height={30} /></div>
                <div className="carousel-item"><Image src="/azcoiner.webp" alt="Azcoiner" width={100} height={30} /></div>
                <div className="carousel-item"><Image src="/bondex.svg" alt="Bondex" width={100} height={50} /></div>
                <div className="carousel-item"><Image src="/cvex.svg" alt="Cvex" width={100} height={50} /></div>
                <div className="carousel-item"><Image src="/shardeum.svg" alt="Shardeum" width={100} height={50} /></div>
                <div className="carousel-item"><Image src="/tabi.svg" alt="Tabi" width={100} height={50} /></div>
                <div className="carousel-item"><Image src="/particle.png" alt="Particle" width={200} height={50} /></div>
               
            </div>
        </div>
        <p className="coming-soon">More projects coming soon...</p>
    </section>

            
          </div>
        );
        break;
      case 'Blog':
        setContent(
          <div className='blog article'>
            <h2 className="h2 article-title">BLOG</h2>
            <p style={{ color: 'white' }}>No Blogs as of now</p>
          </div>
        );
        break;
      case 'Contact':
        setContent(
          <div className='contact article'>
            <h2 className="h2 article-title">Contact</h2>
                <div className="mail-ids">
                  <a href="mailto:0xba2bf37711917b963a245906ad290ad79bc27b69@dmail.ai">
                    <Image src="/dmail.svg" alt="Dmail" width={100} height={50} />
                  </a>
                  <a href="mailto:0xba2bf37711917b963a245906ad290ad79bc27b69@ethermail.io">
                    <Image src="/ethermail.svg" alt="Dmail" width={150} height={70} />
                  </a>
                </div>
          </div>
        );
        break;
      default:
        setContent(
          <div>
            <h2>Portfolio</h2>
            <p>This is the Portfolio content.</p>
          </div>
        );
    }
  }, [activeItem, loading, error, walletBalance]);

  return (
    
      
    <main>
  {/*
- #SIDEBAR
    */}
    <Links />
  <aside className="sidebar" data-sidebar="">
    <div className="sidebar-info">
      <figure className="avatar-box">
        <Image
          src="/images/my-avatar.png"
          alt="Richard hanrick"
          width={80}
        />
      </figure>
      <div className="info-content">
        <h1 className="name" title="Richard hanrick">
          sknaim.eth
        </h1>
        <p className="title">Airdrop Farmer</p>
      </div>
      <button className="info_more-btn" data-sidebar-btn="">
        <span>Show Contacts</span>
        <Image className="ion-icon" src="/chevron-down.svg" alt="Chevron-Down" width={50} height={30} />
      </button>
    </div>
    <div className="sidebar-info_more">
      <div className="separator" />
      <ul className="contacts-list">
        <li className="contact-item">
          <div className="icon-box">
          <Image className="ion-icon" src="/mail-outline.svg" alt="mail-outline" width={50} height={30} />
          </div>
          <div className="contact-info">
            <p className="contact-title">Email</p>
            <a href="mailto:0xba2bf37711917b963a245906ad290ad79bc27b69@dmail.ai" className="contact-link">
              0xba2bf37711917b963a245906ad290ad79bc27b69@dmail.ai
            </a>
          </div>
        </li>
        <li className="contact-item">
          <div className="icon-box">
          <Image className="ion-icon" src="/calendar-outline.svg" alt="calendar-outline" width={50} height={30} />
          </div>
          <div className="contact-info">
            <p className="contact-title">Birthday</p>
            <time dateTime="1982-06-23">June 23, 1982</time>
          </div>
        </li>
        <li className="contact-item">
          <div className="icon-box">
          <Image className="ion-icon" src="/location-outline.svg" alt="location-outline" width={50} height={30} />
          </div>
          <div className="contact-info">
            <p className="contact-title">Location</p>
            <address>Behind you</address>
          </div>
        </li>
      </ul>
      <div className="separator" />
      <ul className="social-list">
        <li className="social-item">
          <a href="#" className="social-link">
          <Image className="ion-icon" src="/logo-facebook.svg" alt="facebook" width={50} height={30} />
          </a>
        </li>
        <li className="social-item">
          <a href="#" className="social-link">
          <Image className="ion-icon" src="/logo-twitter.svg" alt="twitter" width={50} height={30} />
          </a>
        </li>
        <li className="social-item">
          <a href="#" className="social-link">
          <Image className="ion-icon" src="/logo-instagram.svg" alt="instagram" width={50} height={30} />
          </a>
        </li>
      </ul>
    </div>
  </aside>
  {/*
- #main-content
    */}
  <div className="main-content">
    {/*
  - #NAVBAR
*/}
    <div>
    <nav className="navbar">
        <ul className="navbar-list">
          {['Portfolio', 'About', 'Projects', 'Blog', 'Contact'].map((item) => (
            <li key={item} className="navbar-item">
              <button
                className={`navbar-link ${activeItem === item ? 'active' : ''}`}
                data-nav-link=""
                onClick={() => setActiveItem(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="content">
        {content}
      </div>
      </div>
    
  
  </div>
<script noModule src="https://unpkg.com/ion-icons@7.1.0/dist/ion-icons/ion-icons.js" async></script>
</main>
);
}

export default Home;
