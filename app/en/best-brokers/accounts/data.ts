export const ACCOUNT_PAGE_SLUGS = [
  "cent",
  "standard",
  "raw-spread",
] as const;

export type AccountPageSlug = (typeof ACCOUNT_PAGE_SLUGS)[number];

export type AccountPageFeature = {
  title: string;
  description: string;
};

export type AccountPageComparisonRow = {
  label: string;
  currentAccount: string;
  cent: string;
  standard: string;
  rawSpread: string;
};

export type AccountPageFAQ = {
  question: string;
  answer: string;
};

export type AccountPageContent = {
  slug: AccountPageSlug;

  /**
   * Possible values stored in broker_accounts.account_type.
   * These aliases are used when matching accounts from Supabase.
   */
  accountTypeAliases: string[];

  /**
   * Fallback keywords used to match account_name when account_type
   * is missing or inconsistently classified.
   */
  accountNameKeywords: string[];

  seo: {
    title: string;
    description: string;
    canonical: string;
    keywords: string[];
  };

  breadcrumbLabel: string;
  badge: string;

  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryStatLabel: string;
    primaryStatValue: string;
    secondaryStatLabel: string;
    secondaryStatValue: string;
  };

  editorSummary: {
    title: string;
    paragraphs: string[];
    highlights: string[];
  };

  definition: {
    title: string;
    paragraphs: string[];
  };

  howItWorks: {
    title: string;
    description: string;
    steps: AccountPageFeature[];
  };

  selectionFactors: {
    title: string;
    description: string;
    items: AccountPageFeature[];
  };

  comparisonTable: {
    title: string;
    description: string;
    columns: {
      broker: string;
      account: string;
      spread: string;
      commission: string;
      minDeposit: string;
      execution: string;
      islamic: string;
      rating: string;
      action: string;
    };
  };

  brokerAnalysis: {
    title: string;
    description: string;
    maximumBrokers: number;
  };

  advantages: {
    title: string;
    items: AccountPageFeature[];
  };

  disadvantages: {
    title: string;
    items: AccountPageFeature[];
  };

  suitableFor: {
    title: string;
    description: string;
    items: string[];
  };

  notSuitableFor: {
    title: string;
    description: string;
    items: string[];
  };

  accountComparison: {
    title: string;
    description: string;
    rows: AccountPageComparisonRow[];
  };

  costExample: {
    title: string;
    description: string;
    note: string;
  };

  methodology: {
    title: string;
    introduction: string;
    factors: AccountPageFeature[];
    disclaimer: string;
  };

  faq: AccountPageFAQ[];

  relatedPages: {
    title: string;
    links: {
      label: string;
      href: string;
      description: string;
    }[];
  };

  cta: {
    title: string;
    description: string;
    buttonLabel: string;
  };
};

export const accountPages: Record<AccountPageSlug, AccountPageContent> = {
  cent: {
    slug: "cent",

    accountTypeAliases: [
      "cent",
      "standard cent",
      "cent account",
      "micro cent",
      "micro",
      "micro account",
    ],

    accountNameKeywords: [
      "cent",
      "standard cent",
      "micro cent",
      "micro",
      "micro account",
      "cent trading account",
      "micro trading account",
    ],

    seo: {
      title: "Best Forex Brokers With Cent Accounts in 2026",
      description:
        "Compare the best forex brokers with cent and micro accounts by minimum deposit, spreads, regulation, Islamic account availability and trading conditions.",
      canonical:
        "https://brokeralarab.com/en/best-brokers/accounts/cent",
      keywords: [
        "best cent account forex brokers",
        "best forex brokers with cent accounts",
        "cent account forex brokers",
        "best micro account forex brokers",
        "forex cent account",
        "micro forex account",
        "cent account for beginners",
        "low deposit cent account",
        "best cent trading account",
        "cent account broker",
        "micro account broker",
        "forex brokers for small accounts",
      ],
    },

    breadcrumbLabel: "Cent Accounts",
    badge: "Designed for smaller trade sizes",

    hero: {
      eyebrow: "Forex Account Comparison",
      title: "Best Forex Brokers With Cent Accounts",
      description:
        "Compare regulated forex brokers offering cent or micro accounts, with a focus on minimum deposit, typical spreads, trade size, execution quality and Islamic account availability.",
      primaryStatLabel: "Best suited to",
      primaryStatValue: "New traders",
      secondaryStatLabel: "Trade size",
      secondaryStatValue: "Smaller positions",
    },

    editorSummary: {
      title: "What to Know Before Choosing a Cent Account",
      paragraphs: [
        "A cent account is a real-money forex account that displays the balance in cents and usually supports smaller position sizes than a standard account. It can be useful for traders moving beyond a demo account, testing a broker with limited capital or trialling a strategy under live market conditions.",
        "The words “Cent” or “Micro” do not automatically mean low-cost or low-risk. Before opening an account, compare typical spreads, minimum trade size, execution quality, regulation, deposit and withdrawal methods, platform access and the terms of any swap-free option.",
      ],
      highlights: [
        "Useful for gaining live-market experience with limited capital.",
        "Smaller position sizes can make risk control more flexible.",
        "Compare execution and total trading costs, not the account name alone.",
      ],
    },

    definition: {
      title: "What Is a Cent Account in Forex?",
      paragraphs: [
        "A cent account is a live forex trading account where the balance is displayed in cents rather than full currency units. For example, a $10 deposit may appear as 1,000 cents, while the underlying monetary value remains $10.",
        "The main benefit is not the larger-looking balance. It is the ability to place smaller trades, which can help traders test execution, platforms and risk-management rules without committing a large amount of capital.",
        "Unlike a demo account, profits and losses are real. This means a cent account can provide a more realistic experience of slippage, order execution and trading psychology.",
      ],
    },

    howItWorks: {
      title: "How Does a Cent Account Work?",
      description:
        "Exact conditions vary by broker, but most cent accounts follow the same basic structure:",
      steps: [
        {
          title: "Deposit a Small Amount",
          description:
            "Fund the account with real money, subject to the broker’s minimum deposit rules.",
        },
        {
          title: "Balance Displayed in Cents",
          description:
            "The platform displays the account balance in cents rather than full currency units.",
        },
        {
          title: "Trade Smaller Position Sizes",
          description:
            "Cent accounts often support smaller contract sizes, reducing the monetary impact of each price move.",
        },
        {
          title: "Apply Real Risk Management",
          description:
            "Profits and losses are real, so position sizing and maximum risk per trade still matter.",
        },
      ],
    },

    selectionFactors: {
      title: "How We Choose the Best Cent Account Brokers",
      description:
        "Offering a cent account is not enough. We compare the conditions that matter most in live trading:",
      items: [
        {
          title: "Regulation and Legal Entity",
          description:
            "We review the regulator and legal entity that will actually hold the client account.",
        },
        {
          title: "Minimum Deposit",
          description:
            "We compare the amount needed to start and the availability of practical funding methods.",
        },
        {
          title: "Minimum Trade Size",
          description:
            "Smaller minimum position sizes generally provide more flexibility when controlling risk.",
        },
        {
          title: "Typical Spread",
          description:
            "Where available, we prioritize typical or average spreads over marketing claims such as “from” spreads.",
        },
        {
          title: "Execution Quality",
          description:
            "Order speed, slippage and platform stability matter when testing scalping or automated strategies.",
        },
        {
          title: "Swap-Free Availability",
          description:
            "We check whether an Islamic account is available and whether administrative fees may apply.",
        },
      ],
    },

    comparisonTable: {
      title: "Best Cent Account Forex Brokers Compared",
      description:
        "Compare eligible cent and micro accounts by spread, commission, minimum deposit, execution, swap-free availability and account score.",
      columns: {
        broker: "Broker",
        account: "Account",
        spread: "Spread",
        commission: "Commission",
        minDeposit: "Min. Deposit",
        execution: "Execution",
        islamic: "Swap-Free",
        rating: "Account Score",
        action: "Details",
      },
    },

    brokerAnalysis: {
      title: "In-Depth Analysis of the Top Cent Accounts",
      description:
        "We explain why each leading account ranked where it did, including its strongest feature, key limitation and most suitable type of trader.",
      maximumBrokers: 5,
    },

    advantages: {
      title: "Advantages of Cent Accounts",
      items: [
        {
          title: "Lower Capital Requirement",
          description:
            "A trader can gain live-market experience without committing a large deposit.",
        },
        {
          title: "Smaller Position Sizes",
          description:
            "Smaller contracts can make it easier to control risk in monetary terms.",
        },
        {
          title: "A Step Beyond Demo Trading",
          description:
            "A cent account introduces real execution and trading psychology while keeping exposure limited.",
        },
        {
          title: "Strategy Testing",
          description:
            "It can be used to test a manual strategy or expert advisor with limited financial exposure.",
        },
      ],
    },

    disadvantages: {
      title: "Disadvantages of Cent Accounts",
      items: [
        {
          title: "Limited Broker Choice",
          description:
            "Not every forex broker offers cent accounts, and naming conventions vary.",
        },
        {
          title: "Spreads May Be Higher",
          description:
            "Some cent accounts have wider spreads than Raw Spread or commission-based accounts.",
        },
        {
          title: "Fewer Tradable Instruments",
          description:
            "Certain cent accounts provide access to a narrower range of markets.",
        },
        {
          title: "Position and Order Limits",
          description:
            "Brokers may restrict maximum trade size, open positions or total account exposure.",
        },
      ],
    },

        suitableFor: {
      title: "Who Should Consider a Cent Account?",
      description:
        "A Cent account may be a practical choice for:",
      items: [
        "Traders who have completed the demo-account stage and want live-market experience.",
        "Beginners who want to test a forex broker before making a larger deposit.",
        "Traders testing a new strategy with limited real capital.",
        "Traders who need access to very small position sizes.",
        "Anyone practising risk management and trading discipline with lower exposure.",
      ],
    },

    notSuitableFor: {
      title: "Who Should Avoid a Cent Account?",
      description:
        "A different account type may be more suitable for:",
      items: [
        "Traders using large professional position sizes.",
        "Traders seeking the lowest possible spread and commission.",
        "High-frequency traders executing a large number of daily trades.",
        "Traders requiring a very broad selection of financial instruments.",
        "Experienced traders needing institutional-style pricing or advanced liquidity access.",
      ],
    },

    accountComparison: {
      title: "Cent vs Standard vs Raw Spread Accounts",
      description:
        "Compare Cent, Standard and Raw Spread accounts by target user, trade size, pricing model, ease of use and suitability for frequent trading.",
      rows: [
        {
          label: "Best For",
          currentAccount: "Beginners and testing",
          cent: "Beginners and testing",
          standard: "Most retail traders",
          rawSpread: "Active and experienced traders",
        },
        {
          label: "Position Size",
          currentAccount: "Very small",
          cent: "Very small",
          standard: "Standard",
          rawSpread: "Standard",
        },
        {
          label: "Pricing Model",
          currentAccount: "Usually spread-only",
          cent: "Usually spread-only",
          standard: "Cost built into spread",
          rawSpread: "Low spread plus commission",
        },
        {
          label: "Ease of Use",
          currentAccount: "High",
          cent: "High",
          standard: "High",
          rawSpread: "Requires cost calculation",
        },
        {
          label: "Frequent Trading",
          currentAccount: "Suitable for testing",
          cent: "Suitable for testing",
          standard: "Generally suitable",
          rawSpread: "Often the strongest option",
        },
      ],
    },

    costExample: {
      title: "Is a Cent Account Cheaper Than a Standard Account?",
      description:
        "Not necessarily. A cent account reduces trade size and the amount exposed to market risk, but it does not guarantee lower trading costs. Compare the typical spread, commission and any account-specific fees.",
      note:
        "Actual costs depend on the instrument, trading session, liquidity, market conditions and legal entity.",
    },

    methodology: {
      title: "How We Rank Cent Account Brokers",
      introduction:
        "We do not rank brokers by brand recognition alone. The score reflects how suitable each account is for a trader specifically looking for a cent or micro account.",
      factors: [
        {
          title: "Broker Quality and Regulation",
          description:
            "We review licensing, transparency, legal entities and the broker’s overall trading environment.",
        },
        {
          title: "Capital Flexibility",
          description:
            "We compare minimum deposit, minimum trade size and practical position-sizing flexibility.",
        },
        {
          title: "Trading Costs",
          description:
            "We assess spreads, commissions and any additional account charges.",
        },
        {
          title: "Account Quality",
          description:
            "We consider platforms, execution, instruments, swap-free availability and beginner suitability.",
        },
      ],
      disclaimer:
        "Rankings are analytical and account conditions may change. Verify the broker’s official terms and the legal entity available in your country before depositing.",
    },

    faq: [
      {
        question: "What is the best cent account for beginners?",
        answer:
          "The best option combines a well-regulated broker, a practical minimum deposit, small trade sizes, transparent spreads and suitable funding methods. No single account is best for every trader.",
      },
      {
        question: "Is a cent account a real trading account?",
        answer:
          "Yes. A cent account uses real money, and profits and losses are real. It differs from a demo account, which uses virtual funds.",
      },
      {
        question: "How much money do I need to open a cent account?",
        answer:
          "The minimum varies by broker. Some allow very small deposits, but the account should still be funded well enough to use sensible position sizing and avoid excessive leverage.",
      },
      {
        question: "Can you make money with a cent account?",
        answer:
          "A cent account can generate profits or losses like any live account. Because position sizes are usually smaller, the monetary value of results is often limited.",
      },
      {
        question: "Are cent accounts good for scalping?",
        answer:
          "It depends on the spread, execution quality and broker rules. A cent account may be useful for testing, while a Raw Spread account may be more cost-efficient for frequent scalping.",
      },
      {
        question: "Can a cent account be swap-free?",
        answer:
          "Some brokers offer swap-free cent accounts. Eligibility, grace periods and administrative fees can vary by broker and legal entity.",
      },
      {
        question: "What is the difference between a cent account and a demo account?",
        answer:
          "A demo account uses virtual money. A cent account uses real funds, displays the balance in cents and usually allows smaller live position sizes.",
      },
    ],

    relatedPages: {
      title: "Related Pages",
      links: [
        {
          label: "Best Standard Account Forex Brokers",
          href: "/en/best-brokers/accounts/standard",
          description:
            "Compare straightforward Standard accounts designed for a broad range of retail traders.",
        },
        {
          label: "Best Raw Spread Forex Brokers",
          href: "/en/best-brokers/accounts/raw-spread",
          description:
            "Compare low-spread accounts with separate commission pricing.",
        },
        {
          label: "Lowest Spread Forex Brokers",
          href: "/en/lowest-spread-brokers",
          description:
            "Compare forex brokers offering competitive spreads and total trading costs.",
        },
      ],
    },

    cta: {
      title: "Compare Cent Accounts Before You Open One",
      description:
        "Review each account’s costs, regulation, execution and legal entity before funding a live account.",
      buttonLabel: "View Comparison Table",
    },
  },

  standard: {
    slug: "standard",

    accountTypeAliases: [
      "standard",
      "standard account",
      "classic",
      "classic account",
    ],

    accountNameKeywords: [
      "standard",
      "standard account",
      "classic",
      "classic account",
      "retail account",
    ],

    seo: {
      title: "Best Standard Account Forex Brokers in 2026",
      description:
        "Compare the best Standard account forex brokers by typical spread, minimum deposit, regulation, execution, platforms and swap-free availability.",
      canonical:
        "https://brokeralarab.com/en/best-brokers/accounts/standard",
      keywords: [
        "best standard account forex brokers",
        "best forex brokers with standard accounts",
        "standard forex account",
        "best standard trading account",
        "standard account broker",
        "forex standard account comparison",
        "commission free forex account",
        "best forex account for beginners",
        "standard vs raw spread account",
        "standard account minimum deposit",
      ],
    },

    breadcrumbLabel: "Standard Accounts",
    badge: "A straightforward choice for most traders",

    hero: {
      eyebrow: "Forex Account Comparison",
      title: "Best Standard Account Forex Brokers",
      description:
        "Compare Standard forex accounts by typical spreads, minimum deposit, execution quality, regulation, platform access and swap-free availability.",
      primaryStatLabel: "Best suited to",
      primaryStatValue: "Most retail traders",
      secondaryStatLabel: "Pricing model",
      secondaryStatValue: "Spread-based",
    },

    editorSummary: {
      title: "What to Know Before Choosing a Standard Account",
      paragraphs: [
        "A Standard account is the core retail account offered by many forex brokers. Currency-trading costs are usually built into the spread rather than charged as a separate commission, making the pricing model easier to understand for beginners and intermediate traders.",
        "Standard accounts can still differ significantly between brokers. Compare typical spreads, minimum deposit, execution and slippage, regulation, available platforms, tradable instruments and swap-free terms instead of relying on labels such as “commission-free.”",
      ],
      highlights: [
        "Straightforward pricing for beginner and intermediate traders.",
        "FX trading often has no separate commission, but the cost remains inside the spread.",
        "Typical spread and execution quality matter more than the lowest advertised spread.",
      ],
    },

    definition: {
      title: "What Is a Standard Forex Account?",
      paragraphs: [
        "A Standard account is the conventional retail trading account offered by most forex brokers. The broker generally adds its markup to the difference between the bid and ask price instead of charging a separate commission on every currency trade.",
        "This structure makes trading costs easier to see because the spread is displayed directly on the platform. However, spreads may be wider than those available on Raw Spread or commission-based accounts.",
        "Standard accounts vary in minimum deposit, leverage, instruments, platform availability and execution policy. The account itself should be assessed rather than relying on the word “Standard.”",
      ],
    },

    howItWorks: {
      title: "How Does a Standard Forex Account Work?",
      description:
        "Most Standard accounts use a relatively simple spread-based pricing model:",
      steps: [
        {
          title: "Open and Fund the Account",
          description:
            "Complete verification, select the Standard account and meet the applicable minimum deposit.",
        },
        {
          title: "View Bid and Ask Prices",
          description:
            "The broker’s trading cost is usually included in the difference between the buy and sell price.",
        },
        {
          title: "Trade Without a Separate FX Commission",
          description:
            "Many Standard accounts do not charge a separate commission on currency pairs.",
        },
        {
          title: "Profit and Loss Reflect the Spread",
          description:
            "A new position normally starts slightly negative because the spread and other applicable costs are included.",
        },
      ],
    },

    selectionFactors: {
      title: "How We Choose the Best Standard Forex Accounts",
      description:
        "We compare real account conditions rather than ranking brokers by popularity alone:",
      items: [
        {
          title: "Typical Spread",
          description:
            "Typical or average spread data is more useful than a temporary “from” spread.",
        },
        {
          title: "Minimum Deposit",
          description:
            "We balance affordability with the overall quality of the account and broker services.",
        },
        {
          title: "Execution and Slippage",
          description:
            "Execution speed, price quality and slippage can materially affect the real cost of trading.",
        },
        {
          title: "Regulation",
          description:
            "We assess the regulator and legal entity through which the client account is opened.",
        },
        {
          title: "Trading Platforms",
          description:
            "We review MT4, MT5, proprietary platforms and the range of trading tools available.",
        },
        {
          title: "Swap-Free Terms",
          description:
            "We check Islamic account availability and any replacement administrative fees.",
        },
      ],
    },

    comparisonTable: {
      title: "Best Standard Account Forex Brokers Compared",
      description:
        "Compare leading Standard accounts by trading cost, minimum deposit, execution, regulation, swap-free availability and account score.",
      columns: {
        broker: "Broker",
        account: "Account",
        spread: "Spread",
        commission: "Commission",
        minDeposit: "Min. Deposit",
        execution: "Execution",
        islamic: "Swap-Free",
        rating: "Account Score",
        action: "Details",
      },
    },

    brokerAnalysis: {
      title: "In-Depth Analysis of the Best Standard Accounts",
      description:
        "We explain why each leading account ranked where it did, who it suits and the most important strength and limitation to consider.",
      maximumBrokers: 5,
    },

    advantages: {
      title: "Advantages of Standard Accounts",
      items: [
        {
          title: "Straightforward Trading Costs",
          description:
            "The main cost is generally built into the spread, making it easier to estimate.",
        },
        {
          title: "Widely Available",
          description:
            "Standard accounts are offered by a large number of regulated forex brokers.",
        },
        {
          title: "Suitable for Multiple Trading Styles",
          description:
            "Depending on broker conditions, they can support day, swing and longer-term trading.",
        },
        {
          title: "Usually No Separate FX Commission",
          description:
            "This reduces the number of cost components a trader must calculate on each currency trade.",
        },
      ],
    },

    disadvantages: {
      title: "Disadvantages of Standard Accounts",
      items: [
        {
          title: "Spreads May Be Wider",
          description:
            "The spread can be wider than on Raw Spread accounts aimed at active traders.",
        },
        {
          title: "Pricing Can Be Less Transparent",
          description:
            "A broker markup embedded in the spread may make exact cost comparisons more difficult.",
        },
        {
          title: "Spreads Can Widen",
          description:
            "Spreads may expand during news releases, rollover periods or low-liquidity conditions.",
        },
        {
          title: "Not Always Ideal for High-Frequency Scalping",
          description:
            "A wider spread can become expensive when a strategy executes many trades.",
        },
      ],
    },

        suitableFor: {
      title: "Who Should Consider a Standard Account?",
      description:
        "A Standard account may be a practical choice for:",
      items: [
        "Beginners who want a simple and widely available pricing model.",
        "Intermediate traders who do not execute hundreds of trades.",
        "Traders who prefer not to calculate a separate commission per trade.",
        "Day and swing traders using moderate trading frequency.",
        "Traders who want broad platform and instrument access.",
      ],
    },

    notSuitableFor: {
      title: "Who Should Avoid a Standard Account?",
      description:
        "A different account type may be more efficient for:",
      items: [
        "High-frequency scalpers who need the narrowest possible spreads.",
        "Automated trading systems that execute a large number of orders.",
        "Traders who prefer spread and commission to be shown separately.",
        "Experienced traders seeking Raw Spread or commission-based pricing.",
        "Beginners testing the market with very small position sizes.",
      ],
    },

    accountComparison: {
      title: "Standard vs Cent vs Raw Spread Accounts",
      description:
        "Compare Standard, Cent and Raw Spread accounts by position size, pricing model, ease of cost calculation and suitability for scalping.",
      rows: [
        {
          label: "Best For",
          currentAccount: "Most retail traders",
          cent: "Beginners and testing",
          standard: "Most retail traders",
          rawSpread: "Active and experienced traders",
        },
        {
          label: "Position Size",
          currentAccount: "Standard",
          cent: "Very small",
          standard: "Standard",
          rawSpread: "Standard",
        },
        {
          label: "Pricing Model",
          currentAccount: "Cost built into spread",
          cent: "Usually spread-only",
          standard: "Cost built into spread",
          rawSpread: "Low spread plus commission",
        },
        {
          label: "Cost Calculation",
          currentAccount: "Easy",
          cent: "Easy",
          standard: "Easy",
          rawSpread: "Moderate",
        },
        {
          label: "Scalping Suitability",
          currentAccount: "Depends on spread",
          cent: "Limited or suitable for testing",
          standard: "Moderate",
          rawSpread: "Often high",
        },
      ],
    },

    costExample: {
      title: "Is a Standard Account Really Commission-Free?",
      description:
        "When a broker advertises a Standard account as commission-free, it usually means there is no separate FX commission. The broker is still compensated through the spread, so the full cost of the trade must be compared.",
      note:
        "Some instruments, including shares or certain crypto CFDs, may still carry commission even when currency trading is commission-free.",
    },

    methodology: {
      title: "How We Rank Standard Account Brokers",
      introduction:
        "The ranking reflects the quality of the Standard account itself together with broker safety and execution, rather than the broker’s overall brand score alone.",
      factors: [
        {
          title: "Broker Quality and Regulation",
          description:
            "We review safety, transparency, regulators and the legal entities serving clients.",
        },
        {
          title: "Typical Trading Cost",
          description:
            "We compare spreads, commissions and any account-specific charges.",
        },
        {
          title: "Minimum Deposit",
          description:
            "We assess account accessibility in relation to the quality of its conditions.",
        },
        {
          title: "Platforms and Execution",
          description:
            "We consider platform quality, execution, slippage and instrument range.",
        },
        {
          title: "Trader Suitability",
          description:
            "We assess whether the account is practical for beginners, day traders and intermediate users.",
        },
      ],
      disclaimer:
        "Account conditions may vary by country, legal entity and instrument. Check the broker’s official documents before opening or funding an account.",
    },

    faq: [
      {
        question: "What is a Standard account in forex?",
        answer:
          "It is the main retail account offered by many forex brokers. Currency-trading costs are usually built into the spread instead of charged as a separate commission.",
      },
      {
        question: "Is a Standard forex account good for beginners?",
        answer:
          "Often yes. The pricing structure is relatively simple and the account type is widely available, but sensible leverage and risk management are still essential.",
      },
      {
        question: "Does a Standard account charge commission?",
        answer:
          "Many brokers do not charge a separate commission on currency pairs, but the broker’s markup is normally included in the spread.",
      },
      {
        question: "What is the minimum deposit for a Standard account?",
        answer:
          "It varies by broker. Some allow a low starting deposit, while others require a higher amount depending on the account and legal entity.",
      },
      {
        question: "Which is better: Standard or Raw Spread?",
        answer:
          "A Standard account is simpler for many traders. A Raw Spread account may be cheaper for active traders when the combined spread and commission are lower.",
      },
      {
        question: "Is a Standard account suitable for scalping?",
        answer:
          "It can be, provided the spread and execution are competitive. A Raw Spread account may be more efficient for strategies placing a large number of trades.",
      },
      {
        question: "Can a Standard account be swap-free?",
        answer:
          "Many brokers offer swap-free Standard accounts, but grace periods, eligibility and administrative fees vary.",
      },
    ],

    relatedPages: {
      title: "Related Pages",
      links: [
        {
          label: "Best Forex Brokers",
          href: "/en/best-brokers",
          description:
            "Compare leading forex brokers by regulation, costs, platforms and overall trading conditions.",
        },
        {
          label: "Compare Forex Brokers",
          href: "/en/compare",
          description:
            "Compare broker accounts, fees, minimum deposits and platforms side by side.",
        },
        {
          label: "Lowest Spread Forex Brokers",
          href: "/en/lowest-spread-brokers",
          description:
            "Find brokers offering competitive spreads and lower total trading costs.",
        },
      ],
    },

    cta: {
      title: "Choose a Standard Account Based on Real Trading Costs",
      description:
        "Compare spreads, minimum deposit, execution and regulation before opening an account.",
      buttonLabel: "Compare Accounts",
    },
  },

  "raw-spread": {
    slug: "raw-spread",

    accountTypeAliases: [
      "raw",
      "raw spread",
      "raw account",
      "raw pricing",
      "zero spread",
    ],

    accountNameKeywords: [
      "raw",
      "raw spread",
      "raw account",
      "raw pricing",
      "zero",
      "zero spread",
      "ecn",
    ],

    seo: {
      title: "Best Raw Spread Forex Brokers in 2026",
      description:
        "Compare the best Raw Spread forex brokers by average spread, commission, minimum deposit, execution, regulation and swap-free availability.",
      canonical:
        "https://brokeralarab.com/en/best-brokers/accounts/raw-spread",
      keywords: [
        "best raw spread forex brokers",
        "best raw spread account",
        "raw spread forex brokers",
        "lowest spread forex account",
        "best forex broker for scalping",
        "raw account forex broker",
        "zero spread forex broker",
        "ecn forex account",
        "low spread forex brokers",
        "raw spread vs standard account",
        "commission based forex account",
      ],
    },

    breadcrumbLabel: "Raw Spread Accounts",
    badge: "Low-spread pricing for active traders",

    hero: {
      eyebrow: "Forex Account Comparison",
      title: "Best Raw Spread Forex Brokers",
      description:
        "Compare Raw Spread accounts by typical spread, commission, minimum deposit, execution quality, regulation and swap-free availability.",
      primaryStatLabel: "Best suited to",
      primaryStatValue: "Active traders",
      secondaryStatLabel: "Pricing model",
      secondaryStatValue: "Spread + commission",
    },

    editorSummary: {
      title: "What to Know Before Choosing a Raw Spread Account",
      paragraphs: [
        "A Raw Spread account is designed for active traders who prioritize narrow spreads and more transparent transaction costs. It typically provides pricing close to the broker’s underlying liquidity feeds while charging a separate commission.",
        "A spread advertised as “from 0.0 pips” does not reveal the full trading cost. Compare the typical spread plus the round-turn commission, then consider execution, slippage, minimum deposit, regulation and swap-free conditions under the legal entity available in your country.",
      ],
      highlights: [
        "Often suitable for scalping, active day trading and automated systems.",
        "The true cost is the spread plus the full commission.",
        "Execution and slippage may matter as much as the advertised spread.",
      ],
    },

    definition: {
      title: "What Is a Raw Spread Account?",
      paragraphs: [
        "A Raw Spread account is a forex trading account where the broker offers pricing close to quotes received from liquidity providers and charges a separate commission for executing trades.",
        "Spreads may start from 0.0 pips on selected pairs under certain market conditions, but the average spread does not remain at zero. Pricing changes with liquidity, trading session, news and the instrument traded.",
        "This account type is common among scalpers, active day traders and algorithmic traders because narrower spreads can matter when many trades are executed.",
      ],
    },

    howItWorks: {
      title: "How Does a Raw Spread Account Work?",
      description:
        "The total trading cost is usually divided into two main components:",
      steps: [
        {
          title: "Low Market-Based Spread",
          description:
            "The broker displays a bid-ask spread close to available liquidity-provider pricing.",
        },
        {
          title: "Separate Commission",
          description:
            "A fixed or variable commission is charged per lot, per side or per round turn.",
        },
        {
          title: "Trade Execution",
          description:
            "The final result is influenced by execution speed, slippage and liquidity at the time of the order.",
        },
        {
          title: "Calculate the Full Cost",
          description:
            "Add the spread, full commission and any other charges to estimate the real cost of the trade.",
        },
      ],
    },

    selectionFactors: {
      title: "How We Choose the Best Raw Spread Accounts",
      description:
        "The ranking focuses on the quality of the account itself, not only the broker’s overall rating:",
      items: [
        {
          title: "Typical Spread",
          description:
            "Average or typical spreads provide a more realistic view than a minimum spread of 0.0 pips.",
        },
        {
          title: "Commission Rate",
          description:
            "We verify whether commission is quoted per side, per lot or for the full round turn.",
        },
        {
          title: "All-In Trading Cost",
          description:
            "We compare the combined spread and commission on commonly traded currency pairs.",
        },
        {
          title: "Execution Quality",
          description:
            "We review execution model, speed, slippage and any requote policy.",
        },
        {
          title: "Regulation",
          description:
            "Low-cost pricing does not compensate for weak oversight or an unclear legal entity.",
        },
        {
          title: "Minimum Deposit",
          description:
            "We compare the capital required to access the account against the quality of its pricing.",
        },
      ],
    },

    comparisonTable: {
      title: "Best Raw Spread Forex Brokers Compared",
      description:
        "Compare leading Raw Spread accounts by average spread, commission, minimum deposit, execution, regulation, swap-free availability and account score.",
      columns: {
        broker: "Broker",
        account: "Account",
        spread: "Avg. Spread",
        commission: "Commission",
        minDeposit: "Min. Deposit",
        execution: "Execution",
        islamic: "Swap-Free",
        rating: "Account Score",
        action: "Details",
      },
    },

    brokerAnalysis: {
      title: "In-Depth Analysis of the Best Raw Spread Accounts",
      description:
        "We explain why each account earned its ranking and how commission, spread, minimum deposit, execution and regulation affect its overall value.",
      maximumBrokers: 5,
    },

    advantages: {
      title: "Advantages of Raw Spread Accounts",
      items: [
        {
          title: "Narrower Spreads",
          description:
            "Spreads may be lower than on Standard accounts during normal liquidity conditions.",
        },
        {
          title: "More Transparent Cost Structure",
          description:
            "Spread and commission are shown separately, helping traders analyse strategy costs.",
        },
        {
          title: "Useful for Scalping",
          description:
            "Lower spreads can benefit strategies targeting small price movements.",
        },
        {
          title: "Suitable for Automated Trading",
          description:
            "The account can suit expert advisors and algorithms that execute many trades.",
        },
      ],
    },

    disadvantages: {
      title: "Disadvantages of Raw Spread Accounts",
      items: [
        {
          title: "Separate Commission",
          description:
            "The commission must be added to the spread to calculate the full trading cost.",
        },
        {
          title: "Higher Minimum Deposit in Some Cases",
          description:
            "Some brokers require more capital than they do for a Standard account.",
        },
        {
          title: "Spreads Remain Variable",
          description:
            "Spreads can widen sharply during news events, rollover or low liquidity.",
        },
        {
          title: "Not Always the Cheapest Option",
          description:
            "A high commission can make a Standard account cheaper for certain trading styles.",
        },
      ],
    },

        suitableFor: {
      title: "Who Should Consider a Raw Spread Account?",
      description:
        "A Raw Spread account may be a practical choice for:",
      items: [
        "Scalpers who rely on narrow spreads and fast execution.",
        "Active day traders placing multiple trades during each session.",
        "Expert advisor and algorithmic trading users.",
        "Traders who execute a high number of orders.",
        "Experienced traders who can calculate spread, commission and total cost per trade.",
      ],
    },

    notSuitableFor: {
      title: "Who Should Avoid a Raw Spread Account?",
      description:
        "A Standard or Cent account may be simpler for:",
      items: [
        "Beginners who do not yet understand commission calculations.",
        "Traders placing only a small number of longer-term trades.",
        "Traders who prefer one simple spread-based trading cost.",
        "Traders starting with a very small deposit.",
        "Long-term traders who do not need ultra-low spreads.",
      ],
    },

    accountComparison: {
      title: "Raw Spread vs Standard vs Cent Accounts",
      description:
        "Compare Raw Spread, Standard and Cent accounts by pricing model, cost calculation, scalping suitability and expected deposit level.",
      rows: [
        {
          label: "Best For",
          currentAccount: "Active and experienced traders",
          cent: "Beginners and testing",
          standard: "Most retail traders",
          rawSpread: "Active and experienced traders",
        },
        {
          label: "Pricing Model",
          currentAccount: "Low spread plus commission",
          cent: "Usually spread-only",
          standard: "Cost built into spread",
          rawSpread: "Low spread plus commission",
        },
        {
          label: "Cost Calculation",
          currentAccount: "Moderate",
          cent: "Easy",
          standard: "Easy",
          rawSpread: "Moderate",
        },
        {
          label: "Scalping Suitability",
          currentAccount: "Often high",
          cent: "Useful for testing",
          standard: "Depends on spread",
          rawSpread: "Often high",
        },
        {
          label: "Expected Deposit",
          currentAccount: "Often medium",
          cent: "Usually low",
          standard: "Low to medium",
          rawSpread: "Often medium",
        },
      ],
    },

    costExample: {
      title: "How Do You Calculate Raw Spread Trading Costs?",
      description:
        "The real cost is not the spread alone. Add the typical spread to the full commission charged for opening and closing the trade, then consider slippage and overnight financing where applicable.",
      note:
        "Check whether the advertised commission is quoted per side or as a round-turn amount, because brokers present commission differently.",
    },

    methodology: {
      title: "How We Rank Raw Spread Accounts",
      introduction:
        "We score the account itself as well as broker quality, giving substantial weight to all-in trading cost, regulation and execution instead of relying on the advertised minimum spread.",
      factors: [
        {
          title: "Broker Rating — 30%",
          description:
            "Reflects the broker’s overall quality, platforms, services, support and trading environment.",
        },
        {
          title: "Typical Spread — 25%",
          description:
            "We prioritize average spread data where available instead of relying on a minimum quote.",
        },
        {
          title: "Commission — 20%",
          description:
            "We assess the commission rate, calculation method and effect on all-in trading cost.",
        },
        {
          title: "Safety — 15%",
          description:
            "We review regulation, transparency and the legal entities available to clients.",
        },
        {
          title: "Minimum Deposit — 10%",
          description:
            "We compare account accessibility without giving deposit size more weight than pricing and execution quality.",
        },
      ],
      disclaimer:
        "Rankings are based on available data. Spreads, commission and execution can change with market conditions, legal entity and client location. Verify current terms on the broker’s official website.",
    },

    faq: [
      {
        question: "What is a Raw Spread account?",
        answer:
          "It is a forex account that offers pricing close to market spreads and charges a separate commission based on trading volume.",
      },
      {
        question: "Is the spread always zero on a Raw Spread account?",
        answer:
          "No. It may start from 0.0 pips on selected pairs in certain conditions, but spreads are variable and do not remain at zero.",
      },
      {
        question: "How do I find the cheapest Raw Spread account?",
        answer:
          "Compare the typical spread plus the full commission. Do not rank accounts by the minimum advertised spread alone.",
      },
      {
        question: "Is a Raw Spread account suitable for beginners?",
        answer:
          "It can be used by beginners, but the trader must understand commission and total-cost calculations. A Standard account may be easier at the start.",
      },
      {
        question: "Is Raw Spread the same as ECN?",
        answer:
          "Not necessarily. Raw Spread describes a pricing structure, while ECN refers to a specific execution and market-access model. The word “Raw” alone does not prove true ECN execution.",
      },
      {
        question: "Is a Raw Spread account better for scalping?",
        answer:
          "Often yes, because spreads may be lower. However, commission, execution speed, slippage and the broker’s scalping policy must also be considered.",
      },
      {
        question: "Can a Raw Spread account be swap-free?",
        answer:
          "Some brokers offer swap-free Raw Spread accounts, but conditions and administrative fees may vary by broker and legal entity.",
      },
      {
        question: "Which is better: Raw Spread or Standard?",
        answer:
          "It depends on trade frequency and position size. Raw Spread may be cheaper for active traders, while Standard is often simpler for lower-frequency trading.",
      },
    ],

    relatedPages: {
      title: "Related Pages",
      links: [
        {
          label: "Best Forex Brokers",
          href: "/en/best-brokers",
          description:
            "Compare leading forex brokers by regulation, pricing, execution and platforms.",
        },
        {
          label: "Compare Forex Brokers",
          href: "/en/compare",
          description:
            "Compare broker accounts, fees, platforms and minimum deposits side by side.",
        },
        {
          label: "Lowest Spread Forex Brokers",
          href: "/en/lowest-spread-brokers",
          description:
            "Compare brokers offering narrow spreads and competitive all-in trading costs.",
        },
      ],
    },

    cta: {
      title: "Do Not Choose a Raw Spread Account by Spread Alone",
      description:
        "Compare typical spread, commission, execution and regulation to identify the strongest all-in value.",
      buttonLabel: "View Comparison Table",
    },
  },
};

export function isAccountPageSlug(
  slug: string,
): slug is AccountPageSlug {
  return ACCOUNT_PAGE_SLUGS.includes(slug as AccountPageSlug);
}

export function getAccountPageContent(
  slug: string,
): AccountPageContent | null {
  if (!isAccountPageSlug(slug)) {
    return null;
  }

  return accountPages[slug];
}

export function normalizeAccountValue(value?: string | null): string {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

export function matchesAccountPage(
  page: AccountPageContent,
  accountType?: string | null,
  accountName?: string | null,
): boolean {
  const normalizedType = normalizeAccountValue(accountType);
  const normalizedName = normalizeAccountValue(accountName);

  const matchesType = page.accountTypeAliases.some((alias) => {
    const normalizedAlias = normalizeAccountValue(alias);

    return (
      normalizedType === normalizedAlias ||
      normalizedType.includes(normalizedAlias)
    );
  });

  const matchesName = page.accountNameKeywords.some((keyword) => {
    const normalizedKeyword = normalizeAccountValue(keyword);

    return normalizedName.includes(normalizedKeyword);
  });

  return matchesType || matchesName;
}