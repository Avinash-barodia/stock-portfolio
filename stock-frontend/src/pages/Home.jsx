import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    const fetchCryptoData = async () => {
      setIsLoadingWatchlist(true);
      try {
        const symbols = ['BTCUSDT','ETHUSDT','ADAUSDT','DOGEUSDT', 'SOLUSDT', 'XRPUSDT'];
        const promises = symbols.map(sym => axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${sym}`));
        const results = await Promise.all(promises);
        setWatchlistData(results.map(r => r.data));
      } catch (err) {
        console.error('Error fetching Binance data', err);
      } finally {
        setIsLoadingWatchlist(false);
      }
    };
    fetchCryptoData();
  }, []);

  // Fetch Portfolio if logged in
  useEffect(() => {
    if (token) {
      const fetchPortfolio = async () => {
        try {
          const res = await axios.get('/api/v1/getStocks', {
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
        <div className="flex flex-col h-full bg-secondary">
          <AccountSummary {...portfolioStats} />
          <QuickTrade selectedSymbol={selectedSymbol} />
        </div>
      }
    >
      {/* Center Column Content */}
      <div className="flex flex-col gap-y-8 pb-10">
        
        {/* Header Section */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-text-primary">Market Overview</h1>
            <p className="text-text-secondary">Track global markets, news, and your portfolio in real-time.</p>
          </div>
          {!token && (
            <button 
              onClick={() => navigate('/login')}
              className="bg-primary-blue hover:bg-primary-blue/90 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-lg shadow-primary-blue/20"
            >
              Sign In to Trade
            </button>
          )}
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-12 gap-6">
                
            {/* Market Overview Section */}
            <section className="col-span-12">
                <MarketUpdate />
            </section>

            {/* Top Movers/Gainers/Losers Section */}
            <section className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card-premium p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold tracking-tight text-profit">Top Gainers</h2>
                        <span className="text-xs font-bold text-text-secondary">24h Change</span>
                    </div>
                    <div className="flex flex-col gap-y-4">
                        {isLoadingWatchlist ? <TableSkeleton rows={3} /> : (
                          watchlistData.sort((a,b) => b.priceChangePercent - a.priceChangePercent).slice(0, 3).map((item, i) => (
                              <div key={i} className="flex justify-between items-center group cursor-pointer btn-premium" onClick={() => navigate(`/technical/${item.symbol}`)}>
                                  <span className="font-bold text-sm group-hover:text-primary-blue">{item.symbol.replace("USDT","")}</span>
                                  <span className="text-profit font-bold text-sm">+{parseFloat(item.priceChangePercent).toFixed(2)}%</span>
                              </div>
                          ))
                        )}
                    </div>
                </div>
                
                <div className="glass-card-premium p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold tracking-tight text-loss">Top Losers</h2>
                        <span className="text-xs font-bold text-text-secondary">24h Change</span>
                    </div>
                    <div className="flex flex-col gap-y-4">
                        {isLoadingWatchlist ? <TableSkeleton rows={3} /> : (
                          watchlistData.sort((a,b) => a.priceChangePercent - b.priceChangePercent).slice(0, 3).map((item, i) => (
                              <div key={i} className="flex justify-between items-center group cursor-pointer btn-premium" onClick={() => navigate(`/technical/${item.symbol}`)}>
                                  <span className="font-bold text-sm group-hover:text-primary-blue">{item.symbol.replace("USDT","")}</span>
                                  <span className="text-loss font-bold text-sm">{parseFloat(item.priceChangePercent).toFixed(2)}%</span>
                              </div>
                          ))
                        )}
                    </div>
                </div>
            </section>

            {/* News Section */}
            {news && news.length > 0 && (
                <section className="col-span-12">
                    <div className="flex items-center justify-between mb-6 px-1">
                        <h2 className="text-xl font-bold tracking-tight">Latest Market Insights</h2>
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
