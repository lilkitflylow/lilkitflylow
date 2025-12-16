import { Stock, StockCategory, InstitutionMove, TickerItem, GuruProfile, NetworkNodeData } from './types';
import { getDynamicDate, getDynamicTime } from './utils';

// Helper: Analysis Generator
const getAnalysis = (name: string, peg: number, ev: number, cagr: number) => {
  let verdict = "";
  if (peg < 1 && cagr > 15) verdict = "显著低估";
  else if (peg < 1.2 && cagr > 15) verdict = "估值合理";
  else if (cagr > 20) verdict = "高成长溢价";
  else verdict = "估值偏高";
  
  return `${name} 2025年Q4财报前瞻：PEG ${peg}，处于${peg < 1 ? '低估' : '合理'}区间。营收CAGR ${cagr}%显示${cagr > 15 ? '强劲' : '稳健'}动力。EV/EBITDA ${ev}。评级：${verdict}。`;
};

// Helper: Stock Factory
const createStock = (
  sym: string, name: string, price: number, chg: number, cap: string, 
  pe: string, vol: string, volRatio: string, peg: string, evEbitda: string,
  revCagr: string, epsCagr: string, cashRatio: string,
  news1: string, date1: string, news2: string, date2: string,
  lastYr: number, tgt: number, sup: number, 
  high52: number, highDate: string, low52: number, lowDate: string,
  nextEarn: string, earnBrief: string,
  hero: boolean = false,
  hot: boolean = false
): Stock => ({
  sym, name, price, chg, cap, pe, vol, volRatio, peg, evEbitda,
  revCagr, epsCagr, cashRatio,
  news48h: news1, news48hDate: date1, news2w: news2, news2wDate: date2,
  lastYearPrice: lastYr, target: tgt, support: sup,
  high52w: high52, high52wDate: highDate, low52w: low52, low52wDate: lowDate,
  nextEarnings: nextEarn, earningsBrief: earnBrief,
  analysis: getAnalysis(name, parseFloat(peg), parseFloat(evEbitda), parseFloat(revCagr)),
  hero, hot
});

// Helper: Batch Generator for Sector Fillers (Real Names)
const generateRealStock = (
  sym: string, name: string, basePrice: number, 
  isHero: boolean, isHot: boolean
): Stock => {
  const safePrice = Number(basePrice); // Ensure it's a number
  const chg = (Math.random() * 4 - 1.5) + (isHot ? 2 : 0);
  const cap = isHero ? (Math.random() * 2 + 1).toFixed(1) + "T" : (Math.random() * 200 + 50).toFixed(0) + "B";
  const pe = (Math.random() * 30 + 15).toFixed(1);
  const vol = (Math.random() * 50 + 10).toFixed(0) + "亿";
  const high = safePrice * (1 + Math.random() * 0.4);
  const low = safePrice * (1 - Math.random() * 0.3);
  
  return createStock(
    sym, name, safePrice, Number(chg.toFixed(2)), cap, pe, vol, 
    (0.8 + Math.random()).toFixed(2), (1 + Math.random()).toFixed(1), (15 + Math.random()*20).toFixed(1),
    "18%", "22%", "1.5",
    `${name}宣布新的战略合作伙伴，预计带来15%营收增长。`, getDynamicDate(0),
    `机构投资者在过去两周内净增持${name}股份达5%。`, getDynamicDate(-14),
    Number((safePrice * 0.8).toFixed(2)), Number((safePrice * 1.15).toFixed(2)), Number((safePrice * 0.9).toFixed(2)),
    Number(high.toFixed(2)), getDynamicDate(-120), Number(low.toFixed(2)), getDynamicDate(-30),
    getDynamicDate(45), "现金流稳健，研发投入持续增加。",
    isHero, isHot
  );
};

// --- DATASET: 12 Real Stocks Per Sector ---

const AI_LIST = [
  { s: "NVDA", n: "英伟达", p: 245.8, h: true, hot: true },
  { s: "MSFT", n: "微软", p: 580.5, h: true, hot: false },
  { s: "GOOGL", n: "谷歌", p: 245.2, h: true, hot: false },
  { s: "TSM", n: "台积电", p: 280.0, h: true, hot: false },
  { s: "AVGO", n: "博通", p: 320.0, h: true, hot: false },
  { s: "AMD", n: "超威", p: 215.0, h: false, hot: true },
  { s: "PLTR", n: "Palantir", p: 85.0, h: false, hot: true },
  { s: "ORCL", n: "甲骨文", p: 195.0, h: false, hot: false },
  { s: "SMCI", n: "超微电脑", p: 95.0, h: false, hot: false },
  { s: "ARM", n: "ARM", p: 180.0, h: false, hot: false },
  { s: "MU", n: "美光", p: 145.0, h: false, hot: false },
  { s: "DELL", n: "戴尔", p: 165.0, h: false, hot: false },
];

const HW_LIST = [
  { s: "AAPL", n: "苹果", p: 310.5, h: true, hot: true },
  { s: "QCOM", n: "高通", p: 230.0, h: true, hot: false },
  { s: "AMAT", n: "应用材料", p: 260.0, h: true, hot: false },
  { s: "TXN", n: "德州仪器", p: 220.0, h: true, hot: false },
  { s: "LRCX", n: "泛林", p: 1100.0, h: true, hot: false },
  { s: "ADI", n: "亚德诺", p: 240.0, h: false, hot: false },
  { s: "KLAC", n: "科磊", p: 850.0, h: false, hot: false },
  { s: "NXPI", n: "恩智浦", p: 280.0, h: false, hot: false },
  { s: "INTC", n: "英特尔", p: 28.5, h: false, hot: true },
  { s: "HPQ", n: "惠普", p: 45.0, h: false, hot: false },
  { s: "STM", n: "意法半导体", p: 55.0, h: false, hot: false },
  { s: "SONY", n: "索尼", p: 110.0, h: false, hot: false },
];

const MED_LIST = [
  { s: "LLY", n: "礼来", p: 1250.0, h: true, hot: true },
  { s: "NVO", n: "诺和诺德", p: 155.0, h: true, hot: true },
  { s: "UNH", n: "联合健康", p: 620.0, h: true, hot: false },
  { s: "JNJ", n: "强生", p: 175.0, h: true, hot: false },
  { s: "ABBV", n: "艾伯维", p: 210.0, h: true, hot: false },
  { s: "MRK", n: "默克", p: 145.0, h: false, hot: false },
  { s: "TMO", n: "赛默飞", p: 680.0, h: false, hot: false },
  { s: "PFE", n: "辉瑞", p: 32.0, h: false, hot: false },
  { s: "AMGN", n: "安进", p: 350.0, h: false, hot: false },
  { s: "ISRG", n: "直觉外科", p: 520.0, h: false, hot: true },
  { s: "VRTX", n: "福泰制药", p: 550.0, h: false, hot: false },
  { s: "REGN", n: "再生元", p: 1100.0, h: false, hot: false },
];

const FIN_LIST = [
  { s: "JPM", n: "摩根大通", p: 260.0, h: true, hot: true },
  { s: "V", n: "威士", p: 320.0, h: true, hot: false },
  { s: "MA", n: "万事达", p: 540.0, h: true, hot: false },
  { s: "BAC", n: "美国银行", p: 48.0, h: true, hot: false },
  { s: "BLK", n: "贝莱德", p: 1100.0, h: true, hot: true },
  { s: "GS", n: "高盛", p: 580.0, h: false, hot: true },
  { s: "MS", n: "摩根士丹利", p: 120.0, h: false, hot: false },
  { s: "WFC", n: "富国银行", p: 65.0, h: false, hot: false },
  { s: "AXP", n: "美国运通", p: 290.0, h: false, hot: false },
  { s: "C", n: "花旗", p: 75.0, h: false, hot: false },
  { s: "SCHW", n: "嘉信理财", p: 85.0, h: false, hot: false },
  { s: "PYPL", n: "PayPal", p: 88.0, h: false, hot: false },
];

const EGY_LIST = [
  { s: "XOM", n: "埃克森美孚", p: 135.0, h: true, hot: false },
  { s: "CVX", n: "雪佛龙", p: 170.0, h: true, hot: false },
  { s: "SHEL", n: "壳牌", p: 80.0, h: true, hot: false },
  { s: "TTE", n: "道达尔", p: 75.0, h: true, hot: false },
  { s: "COP", n: "康菲石油", p: 125.0, h: false, hot: false },
  { s: "SLB", n: "斯伦贝谢", p: 55.0, h: false, hot: false },
  { s: "EOG", n: "EOG资源", p: 140.0, h: false, hot: false },
  { s: "BP", n: "英国石油", p: 38.0, h: false, hot: false },
  { s: "MPC", n: "马拉松原油", p: 190.0, h: false, hot: true },
  { s: "PSX", n: "Phillips 66", p: 160.0, h: false, hot: false },
  { s: "VLO", n: "瓦莱罗", p: 175.0, h: false, hot: false },
  { s: "OXY", n: "西方石油", p: 62.0, h: false, hot: true },
];

const MAT_LIST = [
  { s: "LIN", n: "林德气体", p: 520.0, h: true, hot: false },
  { s: "SHW", n: "宣伟", p: 400.0, h: true, hot: false },
  { s: "FCX", n: "自由港", p: 58.0, h: true, hot: true },
  { s: "NEM", n: "纽蒙特", p: 65.0, h: true, hot: true },
  { s: "SCCO", n: "南方铜业", p: 130.0, h: false, hot: false },
  { s: "VALE", n: "淡水河谷", p: 12.0, h: false, hot: false },
  { s: "RIO", n: "力拓", p: 72.0, h: false, hot: false },
  { s: "BHP", n: "必和必拓", p: 60.0, h: false, hot: false },
  { s: "APD", n: "空气化工", p: 310.0, h: false, hot: false },
  { s: "ECL", n: "艺康", p: 260.0, h: false, hot: false },
  { s: "DOW", n: "陶氏化学", p: 55.0, h: false, hot: false },
  { s: "DD", n: "杜邦", p: 85.0, h: false, hot: false },
];

const MFG_LIST = [
  { s: "TSLA", n: "特斯拉", p: 450.0, h: true, hot: true },
  { s: "CAT", n: "卡特彼勒", p: 420.0, h: true, hot: false },
  { s: "DE", n: "迪尔", p: 410.0, h: true, hot: false },
  { s: "GE", n: "通用电气", p: 195.0, h: true, hot: true },
  { s: "HON", n: "霍尼韦尔", p: 230.0, h: true, hot: false },
  { s: "UNP", n: "联合太平洋", p: 260.0, h: false, hot: false },
  { s: "LMT", n: "洛克希德", p: 620.0, h: false, hot: true },
  { s: "RTX", n: "雷神技术", p: 135.0, h: false, hot: false },
  { s: "BA", n: "波音", p: 180.0, h: false, hot: false },
  { s: "UPS", n: "联合包裹", p: 145.0, h: false, hot: false },
  { s: "F", n: "福特", p: 11.0, h: false, hot: false },
  { s: "GM", n: "通用汽车", p: 48.0, h: false, hot: false },
];

const CRY_LIST = [
  { s: "BTC", n: "比特币", p: 145000, h: true, hot: true },
  { s: "ETH", n: "以太坊", p: 8500, h: true, hot: true },
  { s: "SOL", n: "Solana", p: 650, h: true, hot: true },
  { s: "COIN", n: "Coinbase", p: 420.0, h: true, hot: true },
  { s: "MSTR", n: "MicroStrat", p: 2800.0, h: true, hot: true },
  { s: "HOOD", n: "Robinhood", p: 35.0, h: false, hot: false },
  { s: "MARA", n: "Marathon", p: 25.0, h: false, hot: true },
  { s: "RIOT", n: "Riot", p: 18.0, h: false, hot: false },
  { s: "CLSK", n: "CleanSpark", p: 22.0, h: false, hot: false },
  { s: "SQ", n: "Block", p: 95.0, h: false, hot: false },
  { s: "IBIT", n: "贝莱德BTC", p: 65.0, h: false, hot: false },
  { s: "CME", n: "芝商所", p: 240.0, h: false, hot: false },
];

// Function to hydrate lists into full objects
const hydrate = (list: any[]): Stock[] => {
  return list.map(item => generateRealStock(item.s, item.n, item.p, item.h, item.hot));
};

export const STOCKS: Record<StockCategory, Stock[]> = {
  "智算": hydrate(AI_LIST),
  "硬件": hydrate(HW_LIST),
  "医药": hydrate(MED_LIST),
  "金控": hydrate(FIN_LIST),
  "能源": hydrate(EGY_LIST),
  "材料": hydrate(MAT_LIST),
  "制造": hydrate(MFG_LIST),
  "加密": hydrate(CRY_LIST),
};

// --- GURUS DATA ---
export const GURUS: GuruProfile[] = [
  {
    id: "g1",
    name: "沃伦·巴菲特",
    title: "伯克希尔哈撒韦",
    avatar: "W",
    desc: "价值投资教父，2025年继续减持苹果，转向能源与公用事业。",
    aum: "$980B",
    return1y: "+18.5%",
    topHolding: "Apple (AAPL)",
    holdings: [
      { symbol: "AAPL", name: "苹果", percent: 22.1, color: "#A3AAAE" },
      { symbol: "OXY", name: "西方石油", percent: 18.5, color: "#000000" },
      { symbol: "CVX", name: "雪佛龙", percent: 12.2, color: "#00539B" },
      { symbol: "KO", name: "可口可乐", percent: 9.5, color: "#F40009" },
      { symbol: "AXP", name: "美国运通", percent: 8.8, color: "#006FCF" }
    ]
  },
  {
    id: "g2",
    name: "凯瑟琳·伍德",
    title: "ARK Invest",
    avatar: "K",
    desc: "2025年押注通用人工智能与太空探索，基金业绩强势反弹。",
    aum: "$45B",
    return1y: "+65.2%",
    topHolding: "Tesla (TSLA)",
    holdings: [
      { symbol: "TSLA", name: "特斯拉", percent: 18.5, color: "#CC0000" },
      { symbol: "PLTR", name: "Palantir", percent: 12.8, color: "#000000" },
      { symbol: "COIN", name: "Coinbase", percent: 10.2, color: "#0052FF" },
      { symbol: "RKLB", name: "Rocket Lab", percent: 8.5, color: "#000000" },
      { symbol: "CRSP", name: "CRISPR", percent: 6.5, color: "#96BF48" }
    ]
  },
  {
    id: "g3",
    name: "南希·佩洛西",
    title: "国会山",
    avatar: "N",
    desc: "精准交易者，2025年提前布局AI监管受益股与网络安全。",
    aum: "$350M",
    return1y: "+88.4%",
    topHolding: "Nvidia (NVDA)",
    holdings: [
      { symbol: "NVDA", name: "英伟达", percent: 32.0, color: "#76B900" },
      { symbol: "MSFT", name: "微软", percent: 20.5, color: "#F25022" },
      { symbol: "PANW", name: "Palo Alto", percent: 15.0, color: "#FA582D" },
      { symbol: "AVGO", name: "博通", percent: 12.5, color: "#CC092F" },
      { symbol: "CRWD", name: "CrowdStrike", percent: 8.0, color: "#FC0000" }
    ]
  },
  {
    id: "g4",
    name: "贝莱德智投",
    title: "BlackRock IBIT",
    avatar: "B",
    desc: "全球最大数字资产ETF管理者，持续增持BTC。",
    aum: "$85B",
    return1y: "+112%",
    topHolding: "Bitcoin (BTC)",
    holdings: [
      { symbol: "BTC", name: "比特币", percent: 99.5, color: "#F7931A" },
      { symbol: "USD", name: "现金", percent: 0.5, color: "#85bb65" }
    ]
  },
  {
    id: "g5",
    name: "迈克尔·布里",
    title: "Scion Asset",
    avatar: "M",
    desc: "大空头，2025年做空商业地产与消费信贷。",
    aum: "$2.5B",
    return1y: "+12.1%",
    topHolding: "Puts on SPY",
    holdings: [
      { symbol: "BABA", name: "阿里巴巴", percent: 15.0, color: "#FF6600" },
      { symbol: "JD", name: "京东", percent: 12.0, color: "#E1251B" },
      { symbol: "GOOG", name: "谷歌(空)", percent: 10.0, color: "#4285F4" },
      { symbol: "Booking", name: "Booking", percent: 8.0, color: "#003580" },
      { symbol: "GEO", name: "Geo Group", percent: 6.0, color: "#2E3192" }
    ]
  }
];

export const INSTITUTION_MOVES: InstitutionMove[] = [
  { name: "佩洛西", action: "行权NVDA期权", trend: "up", time: getDynamicDate(0) },
  { name: "木头姐", action: "加仓Coinbase", trend: "up", time: getDynamicDate(-1) },
  { name: "巴菲特", action: "减持美国银行", trend: "down", time: getDynamicDate(-3) },
  { name: "贝莱德", action: "IBIT净流入$10B", trend: "up", time: getDynamicDate(0) },
  { name: "桥水", action: "增持新兴市场", trend: "up", time: getDynamicDate(-5) }
];

export const TICKER_ITEMS: TickerItem[] = [
  { text: "美联储主席：2026年通胀目标有望维持在2%以下。", time: getDynamicTime(-30) },
  { text: "英伟达发布Rubin Ultra芯片，算力提升3倍。", time: getDynamicTime(-60) },
  { text: "比特币突破14.5万美元，再创历史新高。", time: getDynamicTime(-15) },
  { text: "特斯拉Robotaxi获准在全美高速公路行驶。", time: getDynamicTime(-120) },
  { text: "苹果WWDC定档，或发布首款AR隐形眼镜。", time: getDynamicDate(-1) },
  { text: "SpaceX星舰实现地月往返常态化运输。", time: getDynamicDate(-2) }
];

export const NETWORK_NODES: NetworkNodeData[] = [
  {
    title: "核心算力层",
    content: ["英伟达 (NVDA)", "台积电 (TSM)", "AMD (AMD)"]
  },
  {
    title: "高速互连",
    content: ["博通 (AVGO)", "迈威尔 (MRVL)", "Coherent (COHR)"]
  }
];

export const SESSION_ANALYSIS = {
  morning: "今日早盘AI板块受英伟达新品发布提振全线高开，资金大幅流入光模块与算力租赁。纳指期货一度涨超2%，市场情绪亢奋。",
  afternoon: "午后市场受美债收益率反弹影响小幅回落，但核心科技股支撑依旧强劲。医药与消费电子板块出现轮动迹象，成交量维持高位。"
};
