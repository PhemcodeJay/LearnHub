// courses.ts
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'reading';
  completed: boolean;
  content?: string; // Added for lesson content
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  enrolled: number;
  rating: number;
  reviews: number;
  price: number;
  instructor: {
    name: string;
    avatar: string;
    title: string;
  };
  tags: string[];
  modules: Module[];
  isEnrolled?: boolean;
  progress?: number;
}

export const categories = [
  'All',
  'Derivatives Trading',
  'Blockchain Technology',
  'DeFi',
  'Web3 Development',
  'NFT Markets',
  'Technical Analysis',
  'Risk Management',
  'Crypto Fundamentals',
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Derivatives Trading: Futures, Swaps & Advanced Strategies',
    description: 'Master cryptocurrency derivatives trading from fundamentals to advanced strategies. Learn futures contracts, swaps, arbitrage techniques, and risk management in volatile crypto markets.',
    shortDescription: 'Complete guide to crypto derivatives and advanced trading strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop',
    category: 'Derivatives Trading',
    difficulty: 'Advanced',
    duration: '12 weeks',
    lessons: 64,
    enrolled: 2847,
    rating: 4.9,
    reviews: 723,
    price: 249.99,
    instructor: {
      name: 'Dr. Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop',
      title: 'Ex-Goldman Sachs Derivatives Trader',
    },
    tags: ['Futures', 'Swaps', 'Leverage', 'Hedging', 'Arbitrage', 'Risk Management'],
    modules: [
      {
        id: 'm1',
        title: 'Foundations of Derivatives Trading',
        lessons: [
          { 
            id: 'l1', 
            title: 'Introduction to Cryptocurrency Derivatives', 
            duration: '18:30', 
            type: 'video', 
            completed: false,
            content: 'Derivatives trading represents a dynamic realm within cryptocurrency markets, offering a spectrum of sophisticated instruments that derive their value from underlying assets like cryptocurrencies. From futures to swaps, derivatives trading provides a platform for traders to engage in advanced strategies, including arbitrage and speculation on price movements.'
          },
          { 
            id: 'l2', 
            title: 'Understanding Derivatives: Financial Contracts Explained', 
            duration: '22:15', 
            type: 'video', 
            completed: false,
            content: 'Derivatives are financial contracts whose value is derived from the performance of an underlying asset, such as a cryptocurrency. These contracts enable traders to speculate on price movements, hedge against risks, or gain exposure to assets without owning them outright.'
          },
          { 
            id: 'l3', 
            title: 'Spot Market vs. Derivatives Market', 
            duration: '20:45', 
            type: 'video', 
            completed: false,
            content: 'Understanding the key differences between spot trading (buying/selling actual assets) and derivatives trading (contracts based on asset value). Learn when to use each market and how they complement each other in a complete trading strategy.'
          },
          { 
            id: 'l4', 
            title: 'Market Participants and Liquidity Providers', 
            duration: '16:20', 
            type: 'video', 
            completed: false,
            content: 'Explore the roles of different market participants: hedgers, speculators, arbitrageurs, and market makers. Understand how they contribute to market liquidity and efficiency.'
          },
          { 
            id: 'l5', 
            title: 'Module 1 Quiz: Derivatives Fundamentals', 
            duration: '15:00', 
            type: 'quiz', 
            completed: false 
          },
        ],
      },
      {
        id: 'm2',
        title: 'Futures Contracts Mastery',
        lessons: [
          { 
            id: 'l6', 
            title: 'Futures Contracts: Definition and Mechanics', 
            duration: '25:30', 
            type: 'video', 
            completed: false,
            content: 'Futures contracts obligate traders to buy or sell a specified amount of cryptocurrency at a predetermined price and date in the future. They provide opportunities for speculation and hedging against price fluctuations.'
          },
          { 
            id: 'l7', 
            title: 'Perpetual Futures vs. Dated Futures', 
            duration: '28:20', 
            type: 'video', 
            completed: false,
            content: 'Compare perpetual futures (no expiration date) with traditional dated futures. Learn the mechanics of perpetual swaps, including funding rates and how they maintain price alignment with spot markets.'
          },
          { 
            id: 'l8', 
            title: 'Funding Rates Explained: Longs Paying Shorts', 
            duration: '32:15', 
            type: 'video', 
            completed: false,
            content: 'Deep dive into funding rates - periodic payments between long and short positions that keep perpetual futures prices anchored to spot prices. Learn to calculate and predict funding rate changes.'
          },
          { 
            id: 'l9', 
            title: 'Contango and Backwardation in Crypto Markets', 
            duration: '24:40', 
            type: 'video', 
            completed: false,
            content: 'Understand market conditions: contango (futures price > spot price) and backwardation (futures price < spot price). Learn what these conditions reveal about market sentiment and potential trading opportunities.'
          },
          { 
            id: 'l10', 
            title: 'Calendar Spreads and Term Structure', 
            duration: '26:50', 
            type: 'video', 
            completed: false,
            content: 'Advanced futures strategies using different expiration dates. Learn to construct calendar spreads and analyze the term structure of futures prices for arbitrage opportunities.'
          },
          { 
            id: 'l11', 
            title: 'Module 2 Quiz: Futures Trading', 
            duration: '15:00', 
            type: 'quiz', 
            completed: false 
          },
        ],
      },
      {
        id: 'm3',
        title: 'Swaps and Forwards',
        lessons: [
          { 
            id: 'l12', 
            title: 'Cryptocurrency Swaps: An Overview', 
            duration: '22:10', 
            type: 'video', 
            completed: false,
            content: 'Swaps are agreements between two parties to exchange cash flows or other financial instruments based on the price movements of cryptocurrencies. Common types include interest rate swaps and total return swaps.'
          },
          { 
            id: 'l13', 
            title: 'Interest Rate Swaps in Crypto Lending', 
            duration: '24:30', 
            type: 'video', 
            completed: false,
            content: 'Explore how interest rate swaps work in cryptocurrency lending markets. Learn to exchange variable rates for fixed rates to manage borrowing costs in DeFi protocols.'
          },
          { 
            id: 'l14', 
            title: 'Total Return Swaps: Synthetic Exposure', 
            duration: '26:45', 
            type: 'video', 
            completed: false,
            content: 'Total return swaps allow traders to gain economic exposure to an asset without owning it. Learn how institutions use these instruments for synthetic positions and tax efficiency.'
          },
          { 
            id: 'l15', 
            title: 'Forward Contracts: Customized Agreements', 
            duration: '23:20', 
            type: 'video', 
            completed: false,
            content: 'Forward contracts are similar to futures contracts but are customized agreements between two parties to buy or sell a cryptocurrency at a specified price and date in the future. They offer flexibility in terms of contract terms and settlement dates.'
          },
          { 
            id: 'l16', 
            title: 'OTC Forwards vs. Exchange-Traded Futures', 
            duration: '21:35', 
            type: 'video', 
            completed: false,
            content: 'Compare over-the-counter (OTC) forwards with exchange-traded futures. Understand counterparty risk, customization benefits, and when to use each instrument type.'
          },
          { 
            id: 'l17', 
            title: 'Module 3 Quiz: Swaps and Forwards', 
            duration: '15:00', 
            type: 'quiz', 
            completed: false 
          },
        ],
      },
      {
        id: 'm4',
        title: 'Advanced Trading Strategies',
        lessons: [
          { 
            id: 'l18', 
            title: 'Sophisticated Strategies in Derivatives Trading', 
            duration: '28:40', 
            type: 'video', 
            completed: false,
            content: 'Derivatives trading allows for the implementation of complex trading strategies, including arbitrage, speculation, and risk management techniques. Explore the full spectrum of possibilities.'
          },
          { 
            id: 'l19', 
            title: 'Arbitrage Opportunities Across Markets', 
            duration: '32:15', 
            type: 'video', 
            completed: false,
            content: 'Learn to identify and execute arbitrage trades: basis trading (spot vs. futures), triangular arbitrage, cross-exchange arbitrage, and funding rate arbitrage.'
          },
          { 
            id: 'l20', 
            title: 'Speculation: Directional and Volatility Trading', 
            duration: '26:50', 
            type: 'video', 
            completed: false,
            content: 'Master speculation techniques using derivatives. Learn directional bets on price movements and volatility strategies that profit from market uncertainty regardless of direction.'
          },
          { 
            id: 'l21', 
            title: 'Leverage: Amplifying Profits and Losses', 
            duration: '24:30', 
            type: 'video', 
            completed: false,
            content: 'Derivatives trading often involves the use of leverage, which amplifies both potential profits and losses. Understand leverage ratios, margin requirements, and liquidation risks.'
          },
          { 
            id: 'l22', 
            title: 'Risk Management in Leveraged Trading', 
            duration: '29:45', 
            type: 'video', 
            completed: false,
            content: 'Essential risk management practices for leveraged trading: position sizing, stop-losses, take-profits, portfolio diversification, and stress testing your strategies.'
          },
          { 
            id: 'l23', 
            title: 'Module 4 Quiz: Advanced Strategies', 
            duration: '15:00', 
            type: 'quiz', 
            completed: false 
          },
        ],
      },
      {
        id: 'm5',
        title: 'Risk Management and Hedging',
        lessons: [
          { 
            id: 'l24', 
            title: 'Risk Management Through Derivatives', 
            duration: '22:20', 
            type: 'video', 
            completed: false,
            content: 'Derivatives enable traders to hedge against risks associated with cryptocurrency price fluctuations, reducing exposure to market volatility. Learn fundamental hedging principles.'
          },
          { 
            id: 'l25', 
            title: 'Portfolio Hedging Strategies', 
            duration: '26:35', 
            type: 'video', 
            completed: false,
            content: 'Build comprehensive hedging strategies for crypto portfolios. Use futures, options, and swaps to protect against downside risk while maintaining upside potential.'
          },
          { 
            id: 'l26', 
            title: 'Delta Hedging and Gamma Risk', 
            duration: '31:20', 
            type: 'video', 
            completed: false,
            content: 'Advanced hedging concepts: delta hedging to neutralize directional exposure, and managing gamma risk as positions become nonlinear with options and leveraged futures.'
          },
          { 
            id: 'l27', 
            title: 'Counterparty Risk in Derivatives', 
            duration: '19:45', 
            type: 'video', 
            completed: false,
            content: 'Understanding and mitigating counterparty risk in derivatives trading. Evaluate exchange solvency, insurance funds, and the importance of regulated platforms.'
          },
          { 
            id: 'l28', 
            title: 'Module 5 Quiz: Risk Management', 
            duration: '15:00', 
            type: 'quiz', 
            completed: false 
          },
        ],
      },
      {
        id: 'm6',
        title: 'Market Efficiency and Liquidity',
        lessons: [
          { 
            id: 'l29', 
            title: 'Derivatives Markets and Price Discovery', 
            duration: '21:30', 
            type: 'video', 
            completed: false,
            content: 'Derivatives markets contribute to price discovery and market efficiency by providing liquidity and facilitating risk transfer among market participants.'
          },
          { 
            id: 'l30', 
            title: 'Enhanced Liquidity Through Derivatives', 
            duration: '23:45', 
            type: 'video', 
            completed: false,
            content: 'Derivatives markets add liquidity to cryptocurrency ecosystems, allowing traders to enter and exit positions with ease. Understand order books, market depth, and slippage.'
          },
          { 
            id: 'l31', 
            title: 'Market Efficiency and Informational Flow', 
            duration: '24:20', 
            type: 'video', 
            completed: false,
            content: 'How derivatives markets improve overall market efficiency through price signals, arbitrage correction, and information aggregation from diverse participants.'
          },
          { 
            id: 'l32', 
            title: 'Module 6 Quiz: Market Efficiency', 
            duration: '15:00', 
            type: 'quiz', 
            completed: false 
          },
        ],
      },
      {
        id: 'm7',
        title: 'Portfolio Diversification',
        lessons: [
          { 
            id: 'l33', 
            title: 'Diversification Through Derivatives', 
            duration: '20:15', 
            type: 'video', 
            completed: false,
            content: 'Derivatives trading provides opportunities for diversification beyond spot trading, enabling traders to explore alternative investment strategies.'
          },
          { 
            id: 'l34', 
            title: 'Adding Derivatives to Your Portfolio', 
            duration: '22:40', 
            type: 'video', 
            completed: false,
            content: 'Practical guide to incorporating derivatives into existing crypto portfolios. Learn allocation strategies, correlation benefits, and risk-adjusted return optimization.'
          },
          { 
            id: 'l35', 
            title: 'Alternative Investment Strategies with Swaps', 
            duration: '25:30', 
            type: 'video', 
            completed: false,
            content: 'Explore unique investment strategies made possible through swaps: synthetic assets, yield enhancement, and structured products in DeFi ecosystems.'
          },
          { 
            id: 'l36', 
            title: 'Module 7 Quiz: Portfolio Diversification', 
            duration: '15:00', 
            type: 'quiz', 
            completed: false 
          },
        ],
      },
      {
        id: 'm8',
        title: 'Practical Implementation',
        lessons: [
          { 
            id: 'l37', 
            title: 'Setting Up Derivatives Trading Accounts', 
            duration: '18:45', 
            type: 'video', 
            completed: false,
            content: 'Step-by-step guide to setting up accounts on major derivatives exchanges: Binance Futures, Bybit, Deribit, and OKX. KYC requirements, API setup, and security best practices.'
          },
          { 
            id: 'l38', 
            title: 'Exchange Comparison: Features and Fees', 
            duration: '26:10', 
            type: 'video', 
            completed: false,
            content: 'Comprehensive comparison of leading derivatives exchanges: trading fees, maker/taker rebates, available instruments, leverage limits, and unique features.'
          },
          { 
            id: 'l39', 
            title: 'Trading Interface Walkthrough', 
            duration: '24:35', 
            type: 'video', 
            completed: false,
            content: 'Hands-on tour of derivatives trading interfaces. Learn to read order books, place advanced orders (stop-loss, take-profit, trailing stops), and monitor positions.'
          },
          { 
            id: 'l40', 
            title: 'API Trading and Automation', 
            duration: '29:20', 
            type: 'video', 
            completed: false,
            content: 'Introduction to algorithmic trading with derivatives exchanges. API documentation, rate limits, WebSocket connections, and building basic trading bots.'
          },
          { 
            id: 'l41', 
            title: 'Module 8 Quiz: Practical Implementation', 
            duration: '15:00', 
            type: 'quiz', 
            completed: false 
          },
        ],
      },
      {
        id: 'm9',
        title: 'Regulatory and Tax Considerations',
        lessons: [
          { 
            id: 'l42', 
            title: 'Global Regulatory Landscape for Derivatives', 
            duration: '23:30', 
            type: 'video', 
            completed: false,
            content: 'Understand the regulatory environment for cryptocurrency derivatives across major jurisdictions: US (CFTC), EU (MiCA), Asia, and offshore centers.'
          },
          { 
            id: 'l43', 
            title: 'Tax Implications of Derivatives Trading', 
            duration: '27:45', 
            type: 'video', 
            completed: false,
            content: 'Navigate tax treatment of derivatives trades: capital gains vs. income, wash sale rules, constructive sales, and reporting requirements in different countries.'
          },
          { 
            id: 'l44', 
            title: 'Compliance and Record Keeping', 
            duration: '21:15', 
            type: 'video', 
            completed: false,
            content: 'Best practices for compliance and record keeping: transaction logs, P&L tracking, tax documentation, and working with crypto tax software.'
          },
          { 
            id: 'l45', 
            title: 'Module 9 Quiz: Regulations and Taxes', 
            duration: '15:00', 
            type: 'quiz', 
            completed: false 
          },
        ],
      },
      {
        id: 'm10',
        title: 'Course Conclusion and Next Steps',
        lessons: [
          { 
            id: 'l46', 
            title: 'Course Summary: Key Takeaways', 
            duration: '16:40', 
            type: 'video', 
            completed: false,
            content: 'Derivatives trading opens new avenues for exploration and innovation in cryptocurrency markets, offering a diverse array of instruments and strategies for traders to engage with.'
          },
          { 
            id: 'l47', 
            title: 'Building Your Trading Plan', 
            duration: '19:30', 
            type: 'video', 
            completed: false,
            content: 'Create a personalized trading plan incorporating derivatives. Define goals, risk tolerance, strategy selection, position sizing, and performance review metrics.'
          },
          { 
            id: 'l48', 
            title: 'Continuous Learning and Community', 
            duration: '14:25', 
            type: 'video', 
            completed: false,
            content: 'Embrace the opportunities of derivatives trading, but do so with diligence and a comprehensive understanding of market dynamics. Join trading communities, follow experts, and continue learning.'
          },
          { 
            id: 'l49', 
            title: 'Final Assessment: Derivatives Trading Certification', 
            duration: '45:00', 
            type: 'quiz', 
            completed: false 
          },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '2',
    title: 'Blockchain Fundamentals: From Basics to Smart Contracts',
    description: 'Master blockchain technology from the ground up. Learn consensus mechanisms, cryptography, smart contract development, and real-world applications across industries.',
    shortDescription: 'Complete foundation in blockchain technology and development.',
    thumbnail: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop',
    category: 'Blockchain Technology',
    difficulty: 'Beginner',
    duration: '8 weeks',
    lessons: 42,
    enrolled: 5678,
    rating: 4.8,
    reviews: 1243,
    price: 149.99,
    instructor: {
      name: 'Dr. Sarah Williams',
      avatar: 'https://images.unsplash.com/photo-1494790108777-466d68e3a5c3?w=400&auto=format&fit=crop',
      title: 'Blockchain Researcher, MIT',
    },
    tags: ['Cryptography', 'Consensus', 'Smart Contracts', 'Ethereum'],
    modules: [
      {
        id: 'm1',
        title: 'Blockchain Basics',
        lessons: [
          { id: 'l1', title: 'What is Blockchain?', duration: '18:30', type: 'video', completed: false },
          { id: 'l2', title: 'Cryptographic Hashing', duration: '22:15', type: 'video', completed: false },
          { id: 'l3', title: 'Public-Key Cryptography', duration: '24:30', type: 'video', completed: false },
          { id: 'l4', title: 'Block Structure and Mining', duration: '20:45', type: 'video', completed: false },
        ],
      },
      {
        id: 'm2',
        title: 'Consensus Mechanisms',
        lessons: [
          { id: 'l5', title: 'Proof of Work Explained', duration: '26:20', type: 'video', completed: false },
          { id: 'l6', title: 'Proof of Stake and Variations', duration: '28:40', type: 'video', completed: false },
          { id: 'l7', title: 'Delegated Proof of Stake', duration: '22:15', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '3',
    title: 'DeFi Masterclass: Lending, Borrowing & Yield Farming',
    description: 'Dive deep into Decentralized Finance. Master lending protocols, borrowing strategies, liquidity provision, yield farming optimization, and risk assessment in DeFi ecosystems.',
    shortDescription: 'Master decentralized finance protocols and strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1622790698140-94e30457eb12?w=800&auto=format&fit=crop',
    category: 'DeFi',
    difficulty: 'Intermediate',
    duration: '10 weeks',
    lessons: 56,
    enrolled: 4321,
    rating: 4.7,
    reviews: 876,
    price: 179.99,
    instructor: {
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop',
      title: 'DeFi Protocol Developer',
    },
    tags: ['Lending', 'Liquidity', 'Yield Farming', 'AMM'],
    modules: [
      {
        id: 'm1',
        title: 'DeFi Foundations',
        lessons: [
          { id: 'l1', title: 'What is Decentralized Finance?', duration: '20:30', type: 'video', completed: false },
          { id: 'l2', title: 'Smart Contract Basics for DeFi', duration: '25:45', type: 'video', completed: false },
          { id: 'l3', title: 'Wallets and Private Keys', duration: '18:20', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '4',
    title: 'Technical Analysis for Crypto Traders',
    description: 'Master chart reading, indicators, and patterns specific to cryptocurrency markets. Learn to identify trends, entry/exit points, and develop profitable trading strategies.',
    shortDescription: 'Professional technical analysis for crypto trading.',
    thumbnail: 'https://images.unsplash.com/photo-1642790551116-18e150f248e9?w=800&auto=format&fit=crop',
    category: 'Technical Analysis',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    lessons: 48,
    enrolled: 3892,
    rating: 4.8,
    reviews: 654,
    price: 129.99,
    instructor: {
      name: 'James Liu',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop',
      title: 'Crypto Trading Analyst',
    },
    tags: ['Charts', 'Indicators', 'Patterns', 'Trend Analysis'],
    modules: [
      {
        id: 'm1',
        title: 'Charting Fundamentals',
        lessons: [
          { id: 'l1', title: 'Candlestick Patterns', duration: '22:30', type: 'video', completed: false },
          { id: 'l2', title: 'Support and Resistance', duration: '20:15', type: 'video', completed: false },
          { id: 'l3', title: 'Trend Lines and Channels', duration: '24:45', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '5',
    title: 'Web3 Development: DApps from Zero to Hero',
    description: 'Build full-stack decentralized applications. Master Solidity, smart contract development, frontend integration with Web3, and deployment to mainnet.',
    shortDescription: 'Complete Web3 development bootcamp.',
    thumbnail: 'https://images.unsplash.com/photo-1639322537228-f71034b2cde1?w=800&auto=format&fit=crop',
    category: 'Web3 Development',
    difficulty: 'Advanced',
    duration: '14 weeks',
    lessons: 84,
    enrolled: 2156,
    rating: 4.9,
    reviews: 432,
    price: 299.99,
    instructor: {
      name: 'Michael Okonkwo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
      title: 'Lead Blockchain Developer',
    },
    tags: ['Solidity', 'Ethereum', 'Smart Contracts', 'DApps'],
    modules: [
      {
        id: 'm1',
        title: 'Ethereum Fundamentals',
        lessons: [
          { id: 'l1', title: 'Ethereum Virtual Machine', duration: '26:30', type: 'video', completed: false },
          { id: 'l2', title: 'Gas and Transactions', duration: '24:15', type: 'video', completed: false },
          { id: 'l3', title: 'Development Environment Setup', duration: '32:45', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '6',
    title: 'NFT Markets: Trading, Valuation & Creation',
    description: 'Navigate the NFT ecosystem with confidence. Learn valuation methodologies, trading strategies, collection analysis, and the complete NFT creation process.',
    shortDescription: 'Master NFT trading, valuation, and creation.',
    thumbnail: 'https://images.unsplash.com/1638913972694-1949e5120f2a?w=800&auto=format&fit=crop',
    category: 'NFT Markets',
    difficulty: 'Intermediate',
    duration: '6 weeks',
    lessons: 38,
    enrolled: 3245,
    rating: 4.6,
    reviews: 543,
    price: 99.99,
    instructor: {
      name: 'Sophie Anderson',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop',
      title: 'NFT Collector & Analyst',
    },
    tags: ['NFTs', 'Trading', 'Valuation', 'Marketplaces'],
    modules: [
      {
        id: 'm1',
        title: 'NFT Fundamentals',
        lessons: [
          { id: 'l1', title: 'What Are NFTs?', duration: '16:30', type: 'video', completed: false },
          { id: 'l2', title: 'ERC-721 and ERC-1155 Standards', duration: '22:45', type: 'video', completed: false },
          { id: 'l3', title: 'NFT Marketplaces Overview', duration: '20:15', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '7',
    title: 'Crypto Portfolio Management & Risk',
    description: 'Build and manage professional cryptocurrency portfolios. Learn allocation strategies, risk metrics, rebalancing techniques, and institutional-grade risk management.',
    shortDescription: 'Professional portfolio management for crypto assets.',
    thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3913a7?w=800&auto=format&fit=crop',
    category: 'Risk Management',
    difficulty: 'Advanced',
    duration: '8 weeks',
    lessons: 46,
    enrolled: 1876,
    rating: 4.8,
    reviews: 321,
    price: 189.99,
    instructor: {
      name: 'Robert Taylor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop',
      title: 'Crypto Fund Manager',
    },
    tags: ['Portfolio', 'Risk Management', 'Allocation', 'Rebalancing'],
    modules: [
      {
        id: 'm1',
        title: 'Portfolio Theory for Crypto',
        lessons: [
          { id: 'l1', title: 'Modern Portfolio Theory', duration: '24:30', type: 'video', completed: false },
          { id: 'l2', title: 'Crypto Asset Correlations', duration: '26:15', type: 'video', completed: false },
          { id: 'l3', title: 'Risk-Adjusted Returns', duration: '22:45', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '8',
    title: 'Cryptocurrency Fundamentals for Beginners',
    description: 'Start your crypto journey with confidence. Learn what cryptocurrency is, how blockchain works, buying/selling basics, wallet security, and avoiding common scams.',
    shortDescription: 'Complete introduction to cryptocurrency for newcomers.',
    thumbnail: 'https://images.unsplash.com/photo-1621501011947-5c1c23c8c8f7?w=800&auto=format&fit=crop',
    category: 'Crypto Fundamentals',
    difficulty: 'Beginner',
    duration: '4 weeks',
    lessons: 24,
    enrolled: 8923,
    rating: 4.7,
    reviews: 1543,
    price: 49.99,
    instructor: {
      name: 'Jessica Park',
      avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&auto=format&fit=crop',
      title: 'Crypto Educator',
    },
    tags: ['Bitcoin', 'Ethereum', 'Wallets', 'Security'],
    modules: [
      {
        id: 'm1',
        title: 'Getting Started',
        lessons: [
          { id: 'l1', title: 'What is Cryptocurrency?', duration: '15:30', type: 'video', completed: false },
          { id: 'l2', title: 'Bitcoin and Ethereum Explained', duration: '18:45', type: 'video', completed: false },
          { id: 'l3', title: 'Setting Up Your First Wallet', duration: '22:20', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '9',
    title: 'Crypto Derivatives: Options Trading Strategies',
    description: 'Master cryptocurrency options trading. Learn pricing models, volatility trading, covered calls, protective puts, and advanced multi-leg strategies for any market condition.',
    shortDescription: 'Advanced options strategies for crypto markets.',
    thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3913a7?w=800&auto=format&fit=crop',
    category: 'Derivatives Trading',
    difficulty: 'Advanced',
    duration: '10 weeks',
    lessons: 58,
    enrolled: 1432,
    rating: 4.9,
    reviews: 287,
    price: 219.99,
    instructor: {
      name: 'Thomas Wright',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop',
      title: 'Options Trading Specialist',
    },
    tags: ['Options', 'Volatility', 'Greeks', 'Hedging'],
    modules: [
      {
        id: 'm1',
        title: 'Options Fundamentals',
        lessons: [
          { id: 'l1', title: 'Call and Put Options Explained', duration: '24:30', type: 'video', completed: false },
          { id: 'l2', title: 'Option Pricing Models', duration: '28:45', type: 'video', completed: false },
          { id: 'l3', title: 'Implied vs. Historical Volatility', duration: '26:20', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '10',
    title: 'Layer 2 Scaling Solutions',
    description: 'Deep dive into Ethereum scaling. Master rollups (Optimistic and ZK), sidechains, state channels, and understand the future of blockchain scalability.',
    shortDescription: 'Comprehensive guide to blockchain scaling technologies.',
    thumbnail: 'https://images.unsplash.com/photo-1639322537228-f71034b2cde1?w=800&auto=format&fit=crop',
    category: 'Blockchain Technology',
    difficulty: 'Advanced',
    duration: '8 weeks',
    lessons: 44,
    enrolled: 1654,
    rating: 4.8,
    reviews: 298,
    price: 169.99,
    instructor: {
      name: 'Dr. Vitali Petrov',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&auto=format&fit=crop',
      title: 'Blockchain Researcher',
    },
    tags: ['Rollups', 'Sidechains', 'ZK-proofs', 'Scaling'],
    modules: [
      {
        id: 'm1',
        title: 'Scaling Fundamentals',
        lessons: [
          { id: 'l1', title: 'The Blockchain Trilemma', duration: '20:30', type: 'video', completed: false },
          { id: 'l2', title: 'Layer 1 vs. Layer 2', duration: '22:45', type: 'video', completed: false },
          { id: 'l3', title: 'State Channels Explained', duration: '24:15', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '11',
    title: 'Crypto Security: Protecting Your Assets',
    description: 'Essential security practices for cryptocurrency holders. Learn cold storage, multi-signature wallets, hardware security modules, and how to avoid hacks and scams.',
    shortDescription: 'Professional-grade security for crypto assets.',
    thumbnail: 'https://images.unsplash.com/photo-1639322537228-f71034b2cde1?w=800&auto=format&fit=crop',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '6 weeks',
    lessons: 36,
    enrolled: 4231,
    rating: 4.9,
    reviews: 876,
    price: 89.99,
    instructor: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop',
      title: 'Blockchain Security Expert',
    },
    tags: ['Hardware Wallets', 'Multisig', 'OpSec', 'Scams'],
    modules: [
      {
        id: 'm1',
        title: 'Security Fundamentals',
        lessons: [
          { id: 'l1', title: 'Common Crypto Scams', duration: '22:30', type: 'video', completed: false },
          { id: 'l2', title: 'Hardware Wallet Setup', duration: '26:45', type: 'video', completed: false },
          { id: 'l3', title: 'Multi-Signature Wallets', duration: '24:20', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
  {
    id: '12',
    title: 'Algorithmic Trading with Python',
    description: 'Build automated trading bots for cryptocurrency markets. Learn market data APIs, strategy backtesting, execution algorithms, and risk management for automated systems.',
    shortDescription: 'Build and deploy crypto trading bots.',
    thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3913a7?w=800&auto=format&fit=crop',
    category: 'Technical Analysis',
    difficulty: 'Advanced',
    duration: '12 weeks',
    lessons: 72,
    enrolled: 1876,
    rating: 4.8,
    reviews: 354,
    price: 249.99,
    instructor: {
      name: 'Daniel Kim',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop',
      title: 'Quantitative Trader',
    },
    tags: ['Python', 'Bots', 'APIs', 'Backtesting'],
    modules: [
      {
        id: 'm1',
        title: 'Python for Trading',
        lessons: [
          { id: 'l1', title: 'Exchange APIs with Python', duration: '28:30', type: 'video', completed: false },
          { id: 'l2', title: 'Real-time Data Streaming', duration: '32:45', type: 'video', completed: false },
          { id: 'l3', title: 'Order Execution Logic', duration: '30:20', type: 'video', completed: false },
        ],
      },
    ],
    isEnrolled: false,
    progress: 0,
  },
];

// Export additional utility functions
export const getCoursesByCategory = (category: string) => {
  if (category === 'All') return courses;
  return courses.filter(course => course.category === category);
};

export const getCourseById = (id: string) => {
  return courses.find(course => course.id === id);
};

export const searchCourses = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return courses.filter(course => 
    course.title.toLowerCase().includes(lowercaseQuery) ||
    course.description.toLowerCase().includes(lowercaseQuery) ||
    course.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    course.instructor.name.toLowerCase().includes(lowercaseQuery)
  );
};

export const getFeaturedCourses = (count: number = 3) => {
  return [...courses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
};

export const getTrendingCourses = (count: number = 4) => {
  return [...courses]
    .sort((a, b) => b.enrolled - a.enrolled)
    .slice(0, count);
};