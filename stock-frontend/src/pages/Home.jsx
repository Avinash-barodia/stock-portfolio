import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../utils/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MarketUpdate } from '../components/MarketUpdate';
import { CryptoUpdates } from '../components/CryptoUpdates';
import { NewsCard } from '../components/NewsCard';
import { Footer } from '../components/Footer';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Watchlist } from '../components/dashboard/Watchlist';
import { AccountSummary } from '../components/dashboard/AccountSummary';
import { QuickTrade } from '../components/dashboard/QuickTrade';
import { PortfolioHero } from '../components/dashboard/PortfolioHero';
import { CardSkeleton, TableSkeleton } from '../components/ui/Skeleton';

export const Home = () => {
  const token = useSelector((state) => state.user?.token);
  const navigate = useNavigate();
  
  const [activeWatchlist, setActiveWatchlist] = useState(0); // 0=Crypto, 1=Stocks
  const [watchlistData, setWatchlistData] = useState([]);
  const [isLoadingWatchlist, setIsLoadingWatchlist] = useState(true);
  const [stockWatchlistData, setStockWatchlistData] = useState(['TCS', 'RELIANCE', 'INFY', 'HDFCBANK', 'WIPRO']);
  const [portfolioStats, setPortfolioStats] = useState({ invested: 0, worth: 0, profit: 0, percent: 0 });
  const [news, setNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState('');

  // Fetch Watchlist Crypto Data
  useEffect(() => {
    const fetchWatchlist = async () => {
      setIsLoadingWatchlist(true);
      try {
        const symbols = ['BTCUSDT','ETHUSDT','ADAUSDT','DOGEUSDT', 'SOLUSDT', 'XRPUSDT'];
        const promises = symbols.map(sym => axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${sym}`));
        const results = await Promise.all(promises);
        setWatchlistData(results.map(r => r.data));
      } catch (err) {
        console.error('Watchlist fetch error:', err);
      } finally {
        setIsLoadingWatchlist(false);
      }
    };
    fetchWatchlist();
  }, []);

  // Fetch Portfolio if logged in
  useEffect(() => {
    if (token) {
      const fetchPortfolio = async () => {
        try {
          const res = await api.get('/getStocks', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const assets = res.data.data.map(el => el.data);
          let inv = 0; let worth = 0;
          assets.forEach(el => {
            inv += parseFloat(el.buyingPrice);
            worth += parseFloat(el.currentPrice);
          });
          let profit = worth - inv;
          let percent = inv > 0 ? (profit / inv) * 100 : 0;
          setPortfolioStats({ invested: inv, worth: worth, profit: profit, percent: percent.toFixed(2) });
        } catch (err) {
          console.error('Error fetching portfolio stats', err);
        }
      };
      fetchPortfolio();
    }
  }, [token]);

  // Fetch News
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoadingNews(true);
      try {
        const res = await axios.get('https://newsapi.org/v2/top-headlines?q=crypto&apiKey=8075c84ab48e4466afb3804ee54f0039');
        setNews(res.data.articles ? res.data.articles.slice(0, 3) : []);
      } catch (err) {
        console.error('Error fetching news', err);
      } finally {
        setIsLoadingNews(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <DashboardLayout
      leftSidebar={
        <Watchlist 
          data={activeWatchlist === 0 ? watchlistData : stockWatchlistData}
          active={activeWatchlist} 
          setActive={setActiveWatchlist} 
          onQuickBuy={(sym) => setSelectedSymbol(sym)}
        />
      }
      rightSidebar={
        <div className="flex flex-col h-full gap-y-6">
          <AccountSummary {...portfolioStats} />
          <QuickTrade selectedSymbol={selectedSymbol} />
        </div>
      }
    >
      {/* Center Column Content */}
      <div className="flex flex-col gap-y-6 pb-10">
        
        {/* Header Section - Submerged for Hierarchy */}
        <div className="flex justify-between items-end px-1 opacity-80 hover:opacity-100 transition-premium">
          <div>
            <h1 className="text-xl font-black tracking-widest mb-1 text-text-secondary uppercase">Pulse Dashboard</h1>
            <p className="text-text-secondary/60 text-xs font-bold uppercase tracking-wider">Trading Interface v2.0 • Live</p>
          </div>
          {!token && (
            <button 
              onClick={() => navigate('/login')}
              className="bg-primary-blue hover:bg-primary-blue/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary-blue/20 btn-premium active-depress"
            >
              Sign In to Trade
            </button>
          )}
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-12 gap-6">
                
            {/* Portfolio Hero Section - The Primary Focus */}
            <section className="col-span-12">
                <PortfolioHero stats={portfolioStats} />
            </section>

            {/* Market Overview Section - Market Indicators */}
            <section className="col-span-12">
                <MarketUpdate />
            </section>

            {/* Top Movers Section - Enhanced with Sparklines */}
            <section className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card-premium p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-x-2">
                          <div className="w-1.5 h-1.5 bg-profit rounded-full animate-pulse"></div>
                          <h2 className="text-sm font-black uppercase tracking-widest text-text-secondary">Top Gainers</h2>
                        </div>
                        <span className="text-[10px] font-bold text-text-secondary/50 uppercase">24h Change</span>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        {isLoadingWatchlist ? <TableSkeleton rows={3} /> : (
                          watchlistData.sort((a,b) => b.priceChangePercent - a.priceChangePercent).slice(0, 3).map((item, i) => (
                              <div key={i} className="flex justify-between items-center group cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-premium border border-transparent hover:border-profit/20" onClick={() => navigate(`/technical/${item.symbol}`)}>
                                  <div className="flex items-center gap-x-4">
                                    <span className="font-black text-sm group-hover:text-profit transition-premium">{item.symbol.replace("USDT","")}</span>
                                    <div className="w-16 h-6 opacity-40 group-hover:opacity-100 transition-premium">
                                      <WatchlistSparkline data={item.symbol} color="var(--profit)" />
                                    </div>
                                  </div>
                                  <span className="text-profit font-black text-sm bg-profit/5 px-2 py-1 rounded-lg">+{parseFloat(item.priceChangePercent).toFixed(2)}%</span>
                              </div>
                          ))
                        )}
                    </div>
                </div>
                
                <div className="glass-card-premium p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-x-2">
                          <div className="w-1.5 h-1.5 bg-loss rounded-full animate-pulse"></div>
                          <h2 className="text-sm font-black uppercase tracking-widest text-text-secondary">Top Losers</h2>
                        </div>
                        <span className="text-[10px] font-bold text-text-secondary/50 uppercase">24h Change</span>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        {isLoadingWatchlist ? <TableSkeleton rows={3} /> : (
                          watchlistData.sort((a,b) => a.priceChangePercent - b.priceChangePercent).slice(0, 3).map((item, i) => (
                              <div key={i} className="flex justify-between items-center group cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-premium border border-transparent hover:border-loss/20" onClick={() => navigate(`/technical/${item.symbol}`)}>
                                  <div className="flex items-center gap-x-4">
                                    <span className="font-black text-sm group-hover:text-loss transition-premium">{item.symbol.replace("USDT","")}</span>
                                    <div className="w-16 h-6 opacity-40 group-hover:opacity-100 transition-premium">
                                      <WatchlistSparkline data={item.symbol} color="var(--loss)" />
                                    </div>
                                  </div>
                                  <span className="text-loss font-black text-sm bg-loss/5 px-2 py-1 rounded-lg">{parseFloat(item.priceChangePercent).toFixed(2)}%</span>
                              </div>
                          ))
                        )}
                    </div>
                </div>
            </section>

            {/* News Section */}
            {news && news.length > 0 && (
                <section className="col-span-12 surface-premium p-6">
                    <div className="flex items-center justify-between mb-6 px-1">
                        <h2 className="text-xl font-bold tracking-tight text-white">Latest Market Insights</h2>
                        <button 
                          className="text-xs font-bold text-text-secondary hover:text-white transition-colors"
                          onClick={() => navigate('/updates')}
                        >
                          View All
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoadingNews ? (
                          <>
                            <CardSkeleton /><CardSkeleton /><CardSkeleton />
                          </>
                        ) : (
                          news.slice(0, 6).map((item, index) => (
                              <NewsCard data={item} key={index} />
                          ))
                        )}
                    </div>
                </section>
            )}
        </div>
      </div>
    </DashboardLayout>
  );
};
