import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const C = {
  obsidian:  "#000000",
  onyx:      "#0A0A0A",
  onyxLight: "#111111",
  champagne: "#FFFFFF",
  ivory:     "#F7F7F7",
  brass:     "#B8922A",
  brassL:    "#C9A84C",
  rouge:     "#5C0000",
  muted:     "#888888",
  mutedL:    "#AAAAAA",
  paper:     "#FFFFFF",
  surface:   "#FFFFFF",
  surface2:  "#F5F5F5",
  text:      "#000000",
  textSoft:  "#555555",
  line:      "#E0E0E0",
  shadow:    "rgba(0,0,0,.06)",
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const COUNTRIES = [
  { name:"UAE",    flagUrl:"https://flagcdn.com/w40/ae.png", domain:"khadlaj.ae" },
  { name:"Saudi",  flagUrl:"https://flagcdn.com/w40/sa.png", domain:"khadlaj.sa" },
  { name:"Kuwait", flagUrl:"https://flagcdn.com/w40/kw.png", domain:"khadlaj.kw" },
  { name:"Bahrain",flagUrl:"https://flagcdn.com/w40/bh.png", domain:"khadlaj.bh" },
  { name:"Global", flagUrl:"global", domain:"khadlaj-perfumes.com" },
];

const PAYMENTS = ["Visa","Mastercard","Apple Pay","Google Pay","Tabby","Tamara","PayTabs","PayPal"];

const NAV_LINKS = ["Collections","Best Sellers","New Arrivals","Gift Sets","Our Story","Contact"];

const SCENT_RIBBON = ["Oud","Amber","Musk","Rose","Sandalwood","Saffron","Vanilla","Bergamot",
  "Patchouli","Jasmine","Neroli","Cedarwood","Vetiver","Iris","Benzoin","Agarwood","Frankincense"];

const STATS = [
  { v:"1997", l:"Year Founded" },
  { v:"400+", l:"Unique Fragrances" },
  { v:"30+",  l:"Countries" },
  { v:"1",    l:"Master Perfumer" },
];

const PRODUCTS = [
  // ── Local products (own images) ──
  { id:13, name:"Island",               col:"Master Perfumery", price:150, size:"100ml Extrait", badge:"Best Seller", gender:"Unisex", notes:["Marine","Amber","Oud"],        img:"./assets/images/products/island_bottle_perfect.jpg" },
  { id:14, name:"Cream Velvet",         col:"Master Perfumery", price:130, size:"100ml Extrait",      badge:"Best Seller", gender:"Unisex", notes:["Cream","Velvet","Musk"],        img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cream_Velvet_03.jpg?v=1736149481" },
  { id:15, name:"Cloud Candy",          col:"Atyaab",           price:325, size:"Gift Set",      badge:null,          gender:"Her",    notes:["Peach","Musk","Vanilla"],       img:"./assets/images/gifsets/cloudcandy_gift_user.png",     images:["./assets/images/gifsets/cloudcandy_gift_user.png","./assets/images/gifsets/cloudcandy_gift_user.png","./assets/images/products/cloud-candy-open-box.png","./assets/images/products/cloud-candy-back-box.png"] },
  { id:16, name:"Strawberry Shake",     col:"Atyaab",           price:295, size:"100ml EDP",     badge:null,          gender:"Her",    notes:["Strawberry","Musk","Vanilla"],  img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/STRAWBERRY_SHAKE-03.jpg?v=1764228432" },
  { id:17, name:"Biscotti Date Toffee", col:"Lafede",           price:315, size:"100ml EDP",     badge:"New",         gender:"Unisex", notes:["Date","Coffee","Gourmand"],     img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Biscotti_Date_Toffee-3.jpg?v=1776407655" },
  { id:18, name:"Biscotti Melon Musk",  col:"Lafede",           price:315, size:"100ml EDP",     badge:"New",         gender:"Unisex", notes:["Melon","Musk","Cream"],         img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Bleu_Glace_02.jpg?v=1738325363" },
  { id:19, name:"Uno Intimo",           col:"Lafede",           price:285, size:"100ml EDP",     badge:null,          gender:"Her",    notes:["Rose","Musk","Peony"],          img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/UNO_INTIMO_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1966036.jpg?v=1722412332" },
  { id:20, name:"Shahi Oud",            col:"Master Perfumery", price:360, size:"100ml EDP",     badge:null,          gender:"Unisex", notes:["Oud","Amber","Saffron"],        img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SHAHI_OUD_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965925.jpg?v=1722412108" },
  { id:21, name:"Bleu Glacé",           col:"Atyaab",           price:275, size:"100ml EDP",     badge:"New",         gender:"Unisex", notes:["Marine","Bergamot","Musk"],     img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Bleu_Glace_02.jpg?v=1738325363" },
  // ── Live products from khadlaj-perfumes.com ──
  { id:200, name:"Saraya",              col:"Master Perfumery", price:105, size:"60ml Extrait",  badge:"New",         gender:"Unisex", notes:["Amber","Bergamot","Vetiver"],   img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_3.png?v=1781332291" },
  { id:201, name:"Nafais Sharq Gift Set",col:"Atyaab",          price:150, size:"Gift Set",      badge:null,          gender:"Her",    notes:["Rose","Amber","Musk"],          img:"./assets/images/gifsets/nafais_gift_user.png" },

  { id:203, name:"Zayaan Silver",       col:"Atyaab",           price:150, size:"100ml EDP",     badge:"New",         gender:"Him",    notes:["Citrus","Lavender","Sandalwood"],img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Zayan_Silver-3.jpg?v=1776430400" },
  { id:204, name:"Ihthiraam",           col:"Master Perfumery", price:150, size:"60ml Extrait",  badge:"New",         gender:"Unisex", notes:["Bergamot","Oud","Musk"],        img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1775636549" },
  { id:205, name:"Qarar",               col:"Master Perfumery", price:150, size:"60ml Extrait",  badge:"New",         gender:"Unisex", notes:["Oud","Leather","Vetiver"],      img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qarar-3.jpg?v=1775637258" },
  { id:206, name:"Icon",                col:"Atyaab",           price:130, size:"100ml EDP",     badge:"Best Seller", gender:"Him",    notes:["Bergamot","Lavender","Amber"],  img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.1.jpg?v=1773206615" },
  { id:207, name:"Intoxicate Mystique", col:"Lafede",           price:150, size:"100ml Extrait", badge:null,          gender:"Him",    notes:["Musk","Vetiver","Vanilla"],     img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.3.png?v=1772518819" },
  { id:208, name:"Panache",             col:"Master Perfumery", price:200, size:"100ml Extrait", badge:"Best Seller", gender:"Her",    notes:["Vanilla","Sandalwood","Musk"],  img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_1_jpg_c97c705a-aebf-4bf9-a621-f11b565e765d.jpg?v=1771333282" },
  { id:209, name:"Onyx Silver",         col:"Atyaab",           price:125, size:"100ml EDP",     badge:"New",         gender:"Unisex", notes:["Bergamot","Patchouli","Tonka"], img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OnyxSilver3.jpg?v=1769502676" },
  { id:210, name:"Nuha Bon Bon",        col:"Atyaab",           price:85,  size:"85ml EDP",      badge:"New",         gender:"Her",    notes:["Strawberry","Vanilla","Musk"],  img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NUHA_BON_BON-03.jpg?v=1768477660" },
  { id:211, name:"Sawaar",              col:"Master Perfumery", price:200, size:"100ml Extrait", badge:"Best Seller", gender:"Her",    notes:["Vanilla","Sandalwood","Amber"], img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SAWAAR-03.jpg?v=1764151207" },
  { id:212, name:"Onyx",                col:"Atyaab",           price:125, size:"100ml EDP",     badge:"Best Seller", gender:"Him",    notes:["Cardamom","Sandalwood","Tonka"],img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-03.jpg?v=1762324228" },
  { id:213, name:"Shiyaaka",            col:"Master Perfumery", price:65,  size:"100ml EDP",     badge:"Best Seller", gender:"Him",    notes:["Bergamot","Vetiver","Cardamom"],img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.1.jpg?v=1782717568" },
  { id:214, name:"Nafais Magrib",       col:"Atyaab",           price:110, size:"100ml EDP",     badge:"New",         gender:"Unisex", notes:["Citrus","Marine","Musk"],       img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais_Magrib-3.jpg?v=1761115886" },
  { id:215, name:"Island Gift Set",     col:"Master Perfumery", price:179, size:"Gift Set",      badge:null,          gender:"Unisex", notes:["Marine","Amber","Musk"],        img:"./assets/images/gifsets/island_gift_user.png" },
  { id:216, name:"Cream Velvet Gift Set",col:"Master Perfumery",price:160, size:"Gift Set",      badge:null,          gender:"Unisex", notes:["Cream","Velvet","Musk"],        img:"./assets/images/gifsets/creamvelvet_gift_user.png" },

  { id:22, name:"Hareem Al Sultan",     col:"Atyaab",           price:195, size:"75ml EDP",      badge:null,          gender:"Her",    notes:["Rose","Amber","Musk"],          img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SHAHI_OUD_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965925.jpg?v=1722412108" },
  { id:23, name:"Shiyaaka Shadow",      col:"Master Perfumery", price:340, size:"100ml EDP",     badge:"Limited",     gender:"Him",    notes:["Oud","Leather","Vetiver"],      img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka_Shadow-3.jpg?v=1751436642" },

  // ── New Best Sellers (requested list additions) ──
  { id:301, name:"Island Dreams",       col:"Master Perfumery", price:150, size:"100ml EDP",     badge:"Best Seller", gender:"Her",    notes:["Coconut","Vanilla","Musk"],     img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island_Dreams-3.jpg?v=1754913321" },
  { id:302, name:"Ria",                 col:"Lafede",           price:125, size:"100ml EDP",     badge:"Best Seller", gender:"Her",    notes:["Rose","Jasmine","Amber"],       img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ria-3.jpg?v=1760188227" },
  { id:303, name:"Pure Musk Pure Blend",col:"Atyaab",           price:200, size:"100ml EDP",     badge:"Best Seller", gender:"Unisex", notes:["White Musk","Clean","Iris"],    img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MUSK_PURE_MUSK_BLEND_CREATION_OF_IQBAL_60_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965450.jpg?v=1722411181" },
  { id:304, name:"Musk Ice",            col:"Atyaab",           price:150, size:"100ml EDP",     badge:"Best Seller", gender:"Unisex", notes:["Mint","Ice","White Musk"],      img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Musk_Ice_03.jpg?v=1771398752" },
  { id:305, name:"Karus",               col:"Lafede",           price:150, size:"100ml EDP",     badge:"Best Seller", gender:"Him",    notes:["Oud","Leather","Incense"],      img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KARUS_OUD_FIRE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964843.jpg?v=1722409981" },
];

const GIFT_SETS = [
  { id:5,  name:"Cloud Candy Gift Set",          price:169, pieces:3, img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy3.jpg?v=1767169755",          desc:"A soft peach-pink gift set with a playful, feminine profile and premium presentation." },
  { id:6,  name:"Strawberry Shake Gift Set",      price:295, pieces:2, img:"./assets/images/gifsets/strawberry-shake-giftset.png",                                                               desc:"A playful rose-pink set with a feminine, candy-like finish." },
  { id:7,  name:"Biscotti Date Toffee Gift Set",  price:315, pieces:2, img:"./assets/images/gifsets/biscotti-date-toffee-giftset.png",                                                           desc:"A warm gourmand set with rich coffee, date, and caramel styling." },
  { id:8,  name:"Biscotti Melon Musk Gift Set",   price:315, pieces:2, img:"./assets/images/gifsets/biscotti-melon-musk-giftset.png",                                                            desc:"A soft pastel presentation for a fresh melon and musk composition." },
  { id:9,  name:"Uno Intimo Gift Set",            price:285, pieces:2, img:"./assets/images/gifsets/uno-intimo-giftset.png",                                                                     desc:"An elegant, polished set with a refined feminine profile." },
  { id:10, name:"Bleu Glacé Gift Set",            price:275, pieces:2, img:"./assets/images/gifsets/blue-glace-giftset.png",                                                                     desc:"A crisp blue presentation with a clean, modern freshness." },
  { id:11, name:"Shahi Oud Gift Set",             price:360, pieces:2, img:"./assets/images/gifsets/shahi-oud-giftset.png",                                                                      desc:"A bold black-and-gold gift set with a rich oud signature." },
  { id:12, name:"Island Gift Set",               price:179, pieces:3, img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island3.jpg?v=1767168724",              desc:"The signature Island scent in a luxury gift trio for him and her." },
  { id:13, name:"Cream Velvet Gift Set",          price:160, pieces:3, img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-3.jpg?v=1779352383",        desc:"Buttery caramel and warm vanilla in a beautifully curated gift set." },
  { id:14, name:"Nafais Sharq Gift Set",          price:150, pieces:3, img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-3.jpg?v=1779352739",      desc:"Rich florals, warm woods, and timeless Arabian allure." },
];

const REVIEWS = [
  { name:"Reem Al Hashimi",  country:"UAE",    stars:5, text:"The richest oud I've ever worn. Lasts 14+ hours on my skin. Khadlaj has a customer for life." },
  { name:"Hamad Al Dosari",  country:"Bahrain",stars:5, text:"Bakhoor Noir is absolutely extraordinary. Authentic Arabian soul with a French elegance." },
  { name:"Priya Nair",       country:"Dubai",  stars:5, text:"Ordered the Discovery Set as a gift — my friend was blown away by the packaging and quality." },
  { name:"Mohammed Al Ghamdi",country:"KSA",   stars:5, text:"Been using Khadlaj for 6 years. Every year the quality gets better. Rose Taifi is a masterpiece." },
];

const COLLECTIONS_DATA = [
  { name:"Atyaab", tagline:"Everyday Luxury", img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NUHA_BON_BON-03.jpg?v=1768477660", desc:"Accessible, wearable scents for every moment. The Atyaab line brings refined Arabian perfumery into daily life without compromise." },
  { name:"Lafede", tagline:"Bold & Characterful", img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.3.png?v=1772518819", desc:"Intensely expressive fragrances that command attention. Lafede is for those who make their presence felt before they enter the room." },
  { name:"Master Perfumery", tagline:"The Pinnacle of Craft", img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1775636549", desc:"The finest expressions from our founder's private atelier. Rare ingredients, extraordinary sillage, and a story in every bottle." },
];

const TEAM = [
  {
    name:"Mohamed Iqbal Abdul Sattar",
    role:"Founder & Master Perfumer",
    img:"./assets/images/people/founder-mohamed-iqbal.png",
    bio:"With over 45 years of experience in perfumery, Mohamed Iqbal Abdul Sattar is the esteemed founder and master perfumer of Khadlaj Perfumes. He is recognized for creating cherished and opulent fragrances including Hareem Al Sultan, Bukhoor Al Bahaar, and the luxurious Oud Pure and Musk Pure ranges. His expertise spans exquisite natural essences and meticulously crafted synthetic compounds, with a deep passion for Musk, Ruh Gulaab, oud, and vetiver.",
  },
];

const REELS = [
  {
    id: "7602275376135408918",
    title: "Hareem Al Sultan Gold Review",
    caption: "The viral sensation on #perfumetok. Does it live up to the hype?",
    tag: "Viral on TikTok",
    price: 195,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy1.jpg?v=1767169755"
  },
  {
    id: "7614741288168066334",
    title: "Panache First Impressions",
    caption: "A gorgeous creamy floral gourmand. Completely blind buy safe!",
    tag: "First Impressions",
    price: 200,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island1.jpg?v=1767168752"
  },
  {
    id: "7639701570875165985",
    title: "Shiyaaka Silver - Affordable Niche?",
    caption: "This smells 10x more expensive than it is. Unbelievable quality.",
    tag: "Hidden Gem",
    price: 126,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SHAHI_OUD_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965925.jpg?v=1722412108"
  },
  {
    id: "7608773049986469134",
    title: "Island Extrait Layering Combo",
    caption: "How I layer Khadlaj Island for a 24-hour scent bubble.",
    tag: "Layering Tip",
    price: 355,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/UNO_INTIMO_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1966036.jpg?v=1722412332"
  },
  {
    id: "7643796160100191496",
    title: "Zayaan Silver Unboxing",
    caption: "The packaging on this is insane. Luxury on a budget.",
    tag: "Unboxing",
    price: 150,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Bleu_Glace_02.jpg?v=1738325363"
  },
  {
    id: "7602275376135408918",
    title: "Cream Velvet - Compliment Getter",
    caption: "Wore this today and got stopped 3 times. Must have for gourmand lovers.",
    tag: "Review",
    price: 345,
    img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-3.jpg?v=1779352383"
  }
];

const SOCIAL_LINKS = {
  tiktok: "https://www.tiktok.com/@khadlaj.uk",
};
const CATEGORIES = ["All","Best Sellers","New","For Him","For Her","Unisex","Atyaab","Lafede","Master Perfumery"];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:#fff;color:#000;font-family:'Montserrat',sans-serif;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-track{background:#fff;}
  ::-webkit-scrollbar-thumb{background:#000;}
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .disp{font-family:'Cinzel',serif;}
  .mono{font-family:'Montserrat',sans-serif;}

  /* YSL-style primary button: solid black */
  .btn-gold{
    background:#000;color:#fff;border:1px solid #000;
    padding:14px 32px;
    font-family:'Montserrat',sans-serif;font-weight:500;font-size:11px;
    letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;
    transition:background .22s,color .22s;
  }
  .btn-gold:hover{background:#B8922A;border-color:#B8922A;color:#fff;}

  /* ghost = outlined black */
  .btn-ghost{
    background:transparent;color:#000;border:1px solid #000;
    padding:13px 28px;
    font-family:'Montserrat',sans-serif;font-weight:400;font-size:11px;
    letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;
    transition:all .22s;
  }
  .btn-ghost:hover{background:#000;color:#fff;}

  .gold-line{width:40px;height:1px;background:#B8922A;margin:0 auto;}
  .eyebrow{font-size:10px;letter-spacing:4px;color:#B8922A;text-transform:uppercase;font-family:'Montserrat',sans-serif;}

  /* Product card — YSL-style: no lift, just a clean image reveal */
  .card-lift{transition:opacity .25s;}
  .card-lift:hover{opacity:.94;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
  .fu{animation:fadeUp .65s ease both;}

  @keyframes ribbonScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
  .ribbon-inner{display:flex;animation:ribbonScroll 32s linear infinite;width:max-content;}

  .reel-track{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 4px 14px;-webkit-overflow-scrolling:touch;}
  .reel-track::-webkit-scrollbar{height:3px;}
  .reel-track::-webkit-scrollbar-track{background:#000;}
  .reel-track::-webkit-scrollbar-thumb{background:#B8922A;}
  .reel-card{scroll-snap-align:start;flex:0 0 min(330px,82vw);text-decoration:none;color:inherit;}
  .reel-badge{backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}

  /* Hide TikTok iframe scrollbars */
  iframe{scrolling:no;overflow:hidden;}
  .tiktok-card{overflow:hidden;position:relative;}
  .tiktok-card iframe{pointer-events:none;border:none;overflow:hidden;}

  input,textarea{font-family:'Montserrat',sans-serif;}

  /* New arrivals horizontal scroll */
  .new-scroll::-webkit-scrollbar{height:2px;}
  .new-scroll::-webkit-scrollbar-track{background:#F0EDE8;}
  .new-scroll::-webkit-scrollbar-thumb{background:#000;}

  /* Newsletter popup */
  @keyframes popIn{from{opacity:0;transform:translateY(24px) scale(.97);}to{opacity:1;transform:translateY(0) scale(1);}}
  .popup-in{animation:popIn .4s cubic-bezier(.34,1.56,.64,1) both;}

  /* Floating pulse */
  @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(184,146,42,.4);}50%{box-shadow:0 0 0 10px rgba(184,146,42,0);}}
  .pulse{animation:pulse 2.5s infinite;}

  /* Gold shimmer on hover */
  @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
  .shimmer-text{
    background:linear-gradient(90deg,#B8922A 0%,#F0D080 40%,#B8922A 60%,#D4AF5A 100%);
    background-size:200% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmer 3s linear infinite;
  }

  /* ── Mobile responsive ── */
  @media(max-width:900px){
    .hide-mob{display:none!important;}
    .grid-4{grid-template-columns:repeat(2,1fr)!important;}
    .grid-3{grid-template-columns:1fr!important;}
    .hero-split{grid-template-columns:1fr!important;}
    .hero-img-wrap{height:320px!important;min-height:unset!important;}
    .grid-2{grid-template-columns:1fr!important;}

    /* Hero adjustments — tablet */
    .hero-section { height: 80vh !important; min-height: 520px !important; }
    .hero-text-container { padding: 60px 40px 40px !important; max-width: 100% !important; }
    .hero-headline { font-size: 38px !important; }
  }
  @media(max-width:600px){
    .grid-4{grid-template-columns:repeat(2,1fr)!important;}
    .grid-3{grid-template-columns:1fr!important;}
    .grid-2{grid-template-columns:1fr!important;}
    .new-scroll > div{flex:0 0 78vw!important;}
    .reel-card{flex:0 0 88vw!important;}

    /* Hero — mobile phones */
    .hero-section {
      height: 100svh !important;
      min-height: -webkit-fill-available !important;
    }
    .hero-video { object-position: center center !important; }
    .hero-text-container {
      padding: 24px 20px 32px !important;
      max-width: 100% !important;
      justify-content: flex-end !important;
    }
    .hero-headline { font-size: 30px !important; line-height: 1.15 !important; margin-bottom: 10px !important; }
    .hero-subtitle { font-size: 13px !important; line-height: 1.6 !important; max-width: 100% !important; margin-bottom: 16px !important; }
    .hero-stats-row { gap: 10px !important; padding-top: 10px !important; flex-wrap: wrap !important; }
    .hero-stat-item { padding-right: 10px !important; margin-right: 10px !important; }
  }
  @media(max-width:480px){
    .grid-4{grid-template-columns:repeat(2,1fr)!important;}
    .popup-in{grid-template-columns:1fr!important;}

    .hero-section { height: 100svh !important; }
    .hero-headline { font-size: 26px !important; letter-spacing: 0 !important; }
    .hero-cta-row { flex-direction: column !important; gap: 8px !important; width: 100% !important; }
    .hero-cta-row button { width: 100% !important; text-align: center !important; justify-content: center !important; }
    .hero-stats-row { border-top: none !important; padding-top: 0 !important; }
    .hero-stat-item { border-right: none !important; flex: 1 1 40% !important; margin-right: 0 !important; padding-right: 0 !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════════ */
function StarRating({ n=5, color=C.brass }){
  return <span style={{color,fontSize:13,letterSpacing:1}}>{"★".repeat(n)}{"☆".repeat(5-n)}</span>;
}

function ProductCard({ p, onView }){
  const [hov, setHov] = useState(false);
  const notes = p.notes || [];
  const noteColors = ["#C8A96E","#9C7B50","#B8866A","#7A9E8A","#8B7EAA","#B06A6A","#6A8BAA","#A09060"];

  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      onClick={()=>onView(p)}
      style={{
        background:"transparent",
        display:"flex",
        flexDirection:"column",
        position:"relative",
        cursor:"pointer",
        border: "none",
        transition:"transform .4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {p.badge && (
        <span style={{
          position:"absolute", top:12, left:12, zIndex:3,
          background: p.badge==="Limited" ? "#5C0000" : p.badge==="New" ? "#B8922A" : "#000",
          color:"#fff", fontSize:8, letterSpacing:2.5,
          padding:"4px 10px", fontWeight:700, textTransform:"uppercase",
          fontFamily:"'Montserrat',sans-serif",
        }}>{p.badge}</span>
      )}
      <div style={{ position:"relative", aspectRatio:"1/1", overflow:"hidden", background:"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <img
          src={p.img} alt={p.name} loading="lazy"
          style={{
            width:"95%", height:"95%", objectFit:"contain",
            mixBlendMode:"multiply", filter:"contrast(1.05) brightness(1.04)",
            transition:"transform .8s cubic-bezier(0.25, 1, 0.25, 1)",
            transform: hov ? "scale(1.08)" : "scale(1)",
          }}
        />
        <div style={{
          position:"absolute", bottom:0, left:0, right:0,
          padding:"15px", display:"flex", justifyContent:"center",
          transition:"all .4s cubic-bezier(0.25, 1, 0.25, 1)",
          transform: hov ? "translateY(0)" : "translateY(20px)",
          opacity: hov ? 1 : 0, zIndex:10
        }}>
          <button style={{
            width:"100%", background:"#111", color:"#fff", border:"none", 
            padding:"12px", fontSize:10, letterSpacing:2, fontWeight:500, 
            cursor:"pointer", textTransform:"uppercase",
            fontFamily:"'Montserrat',sans-serif", transition:"background .3s"
          }}
          onMouseEnter={(e)=>e.target.style.background="#444"}
          onMouseLeave={(e)=>e.target.style.background="#111"}
          >
            Quick View
          </button>
        </div>
      </div>
      <div style={{padding:"16px 10px 18px", flex:1, display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center"}}>
        <p style={{fontSize:8, letterSpacing:3, color:"#B8922A", textTransform:"uppercase", marginBottom:6, fontFamily:"'Montserrat',sans-serif", fontWeight:600}}>{p.col}</p>
        <h3 style={{fontSize:13, fontWeight:700, color:"#000", lineHeight:1.3, marginBottom:4, textTransform:"uppercase", letterSpacing:1, fontFamily:"'Montserrat',sans-serif"}}>{p.name}</h3>
        <p style={{fontSize:11, color:"#999", marginBottom:10, fontFamily:"'Montserrat',sans-serif", letterSpacing:.4}}>{p.size}</p>
        {notes.length > 0 && (
          <div style={{display:"flex", flexWrap:"wrap", gap:5, marginBottom:12, justifyContent:"center"}}>
            {notes.map((n, i) => (
              <span key={n} style={{display:"inline-flex", alignItems:"center", gap:4, padding:"3px 8px", background:"#F5F5F5", fontSize:8, letterSpacing:1, color:"#666", textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif"}}>
                <span style={{width:5, height:5, borderRadius:"50%", background: noteColors[i % noteColors.length], flexShrink:0, display:"inline-block"}}/>
                {n}
              </span>
            ))}
          </div>
        )}
        <div style={{marginTop:"auto", width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:6, paddingTop:12, borderTop:"1px solid #F0F0F0"}}>
          <div style={{display:"flex", alignItems:"center", gap:4, justifyContent:"center"}}>
            <span style={{color:"#C8A96E", fontSize:11, letterSpacing:1}}>{"★".repeat(5)}</span>
            <span style={{fontSize:9, color:"#aaa", fontFamily:"'Montserrat',sans-serif"}}>(905)</span>
          </div>
          <p style={{fontSize:15, fontWeight:700, color:"#000", fontFamily:"'Montserrat',sans-serif"}}>AED {p.price}</p>
        </div>
      </div>
    </div>
  );
}
function SectionHeader({ eyebrow, title, sub, light=false }){
  return (
    <div style={{textAlign:"center",marginBottom:52}}>
      <p className="eyebrow" style={{marginBottom:14,color:"#B8922A"}}>{eyebrow}</p>
      <h2 className="disp" style={{fontSize:"clamp(28px,3.8vw,52px)",fontWeight:300,color: light ? "#fff" : "#000",lineHeight:1.15,letterSpacing:"-0.5px",marginBottom:sub?14:0}}>{title}</h2>
      {sub && <p style={{color: light ? "rgba(255,255,255,0.7)" : "#777",fontSize:14,maxWidth:500,margin:"0 auto",lineHeight:1.8,fontFamily:"'Montserrat',sans-serif"}}>{sub}</p>}
      <div className="gold-line" style={{marginTop:22}}/>
    </div>
  );
}

function TikTokCard({ t }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex:"0 0 320px",
        height: 520,
        position: "relative",
        background:"#000",
        borderRadius: 16,
        overflow:"hidden",
        display:"flex",
        flexDirection:"column",
        justifyContent: "flex-end",
        scrollSnapAlign: "center",
        transform: hov ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hov ? "0 24px 48px rgba(0,0,0,.15)" : "0 8px 24px rgba(0,0,0,.06)",
        transition: "all .4s cubic-bezier(.25,.8,.25,1)",
      }}
    >
      {/* Playable TikTok Iframe */}
      <iframe
        src={`https://www.tiktok.com/embed/v2/${t.id}`}
        scrolling="no" 
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", 
          border: "none", zIndex: 1, pointerEvents: hov ? "auto" : "none",
          transform: hov ? "scale(1.02)" : "scale(1)",
          transition: "transform .6s ease"
        }}
        allow="encrypted-media"
        allowFullScreen
        title={t.title}
      />

      {/* Gradient Overlay (Disabled pointer events so user can click video controls) */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%)",
        pointerEvents: "none"
      }}/>

      {/* Content (Disabled pointer events so user can click Play on the iframe) */}
      <div style={{position: "relative", zIndex: 3, padding: "30px 24px", color: "#fff", pointerEvents: "none"}}>
        <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:20}}>
          <div style={{width:48, height:48, borderRadius:"50%", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:6}}>
            <img src={t.img} alt="" style={{width:"100%", height:"100%", objectFit:"contain", mixBlendMode:"multiply", filter:"contrast(1.05) brightness(1.04)"}}/>
          </div>
          <div>
            <p style={{fontSize:9, letterSpacing:2.5, textTransform:"uppercase", color:"#C1A46A", fontFamily:"'Montserrat',sans-serif", marginBottom:4}}>{t.tag || "Trending"}</p>
            <p style={{fontSize:18, fontWeight:500, fontFamily:"'Montserrat',sans-serif", lineHeight:1, color:"#fff"}}>{t.title}</p>
          </div>
        </div>
        
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:"1px solid rgba(255,255,255,0.15)", paddingTop:16}}>
          <p style={{fontSize:16, fontWeight:700, fontFamily:"'Montserrat',sans-serif", color:"#fff"}}>AED {t.price?.toFixed(2)}</p>
          <span style={{fontSize:11, letterSpacing:2, textTransform:"uppercase", fontWeight:700, fontFamily:"'Montserrat',sans-serif", display:"flex", alignItems:"center", gap:6, color:"#fff"}}>
            Shop Now <span>&rarr;</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: HOME
═══════════════════════════════════════════════════════════════ */
function HomePage({ setPage, addToCart, setViewProduct }){
  const [activeCat, setActiveCat] = useState("Best Sellers");
  const [hov, setHov] = useState(null);

  const filtered = PRODUCTS.filter(p=>{
    if(activeCat==="All") return true;
    if(activeCat==="Best Sellers") return p.badge==="Best Seller";
    if(activeCat==="New") return p.badge==="New";
    if(activeCat==="For Him") return p.gender==="Him";
    if(activeCat==="For Her") return p.gender==="Her";
    if(activeCat==="Unisex") return p.gender==="Unisex";
    return p.col===activeCat;
  }).slice(0,12);

  return (
    <>
      {/* ── HERO VIDEO ── */}
      <section className="hero-section" style={{position:"relative",width:"100%",height:"100svh",minHeight:"500px",overflow:"hidden",background:"#0a0a0a"}}>
        <video
          className="hero-video"
          ref={el=>{if(el){el.muted=true;el.play().catch(()=>{});}}}
          autoPlay muted loop playsInline preload="auto"
          style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",display:"block",opacity:.8}}
        >
          <source src="./video/new-video.mp4" type="video/mp4"/>
        </video>

        {/* Layered gradient: dark at bottom, transparent at top */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.1) 0%,rgba(0,0,0,.0) 30%,rgba(0,0,0,.6) 70%,rgba(0,0,0,.92) 100%)",pointerEvents:"none"}}/>
        {/* Side vignette */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(0,0,0,.4) 0%,transparent 55%)",pointerEvents:"none"}}/>



      </section>

      {/* ── SCENT RIBBON ── */}
      <div style={{overflow:"hidden",background:"#FAFAFA",padding:"20px 0", borderTop:"1px solid #E8E4DC", borderBottom:"1px solid #E8E4DC"}}>
        <div className="ribbon-inner">
          {[...SCENT_RIBBON,...SCENT_RIBBON,...SCENT_RIBBON].map((n,i)=>(
            <span key={i} style={{padding:"0 32px",fontSize:10,letterSpacing:4,color:i%4===0?"#C1A46A":"#777",textTransform:"uppercase",whiteSpace:"nowrap",fontFamily:"'Montserrat',sans-serif"}}>{n}</span>
          ))}
        </div>
      </div>


      {/* ── FEATURED PRODUCTS ── */}
      <section style={{padding:"0 5% 104px",background:"#fff"}}>
        <div style={{paddingTop:96,marginBottom:52,display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
          <div>
            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:14}}>Featured Fragrances</p>
            <h2 className="disp" style={{fontSize:"clamp(32px,4vw,54px)",fontWeight:300,color:"#000",lineHeight:1.05,letterSpacing:-1}}>Discover Your<br/><em style={{fontStyle:"italic",color:"#B8922A"}}>Signature Scent</em></h2>
          </div>
          <button className="btn-ghost" style={{flexShrink:0}} onClick={()=>setPage("collections")}>View All</button>
        </div>

        {/* Category pills */}
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,marginBottom:48,borderBottom:"1px solid #E8E4DC"}}>
          {CATEGORIES.map(c=>(
            <button key={c} onClick={()=>setActiveCat(c)}
              style={{
                background:"transparent",color:activeCat===c?"#000":"#777",
                border:"none",
                borderBottom: activeCat===c ? "1px solid #000" : "1px solid transparent",
                padding:"10px 18px 12px",fontSize:10,letterSpacing:2,cursor:"pointer",whiteSpace:"nowrap",
                fontWeight:activeCat===c?600:400,transition:"all .2s",textTransform:"uppercase",
                fontFamily:"'Montserrat',sans-serif",
              }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24,alignItems:"start"}} className="grid-4">
          {filtered.map(p=>(
            <ProductCard key={p.id} p={p} onView={(prod)=>{setViewProduct(prod);setPage("product");}} onCart={addToCart}/>
          ))}
        </div>
      </section>

      {/* ── TIKTOK REELS ── */}
      <section style={{padding:"80px 5%",background:"#000"}}>
        <div style={{marginBottom:48,textAlign:"center"}}>
          <div style={{width:40,height:1,background:"#B8922A",margin:"0 auto 16px"}}/>
          <p style={{fontSize:8,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:12}}>@KhadlajPerfumes</p>
          <h2 className="disp" style={{fontSize:"clamp(24px,3vw,42px)",fontWeight:300,color:"#fff",letterSpacing:-0.5,marginBottom:10,lineHeight:1.2}}>
            Watch Us on TikTok
          </h2>
          <p style={{color:"rgba(255,255,255,.5)",fontSize:12,fontFamily:"'Montserrat',sans-serif",letterSpacing:0.3}}>
            Real fragrances. Real stories. Follow us for the latest drops.
          </p>
        </div>

        {/* Actual TikTok video embeds */}
        <div 
          className="reel-track hide-scrollbar"
          style={{
            display:"flex", gap:20, overflowX:"auto", scrollSnapType:"x mandatory",
            padding:"10px 5% 30px", margin:"0 -5%", scrollBehavior:"smooth"
          }}
        >
          {REELS.map((t, idx) => (
            <TikTokCard key={idx} t={t} />
          ))}
        </div>

        <div style={{textAlign:"center",marginTop:44}}>
          <a
            href={SOCIAL_LINKS.tiktok}
            target="_blank"
            rel="noreferrer"
            style={{
              display:"inline-flex",alignItems:"center",gap:10,
              border:"1px solid rgba(255,255,255,.25)",
              color:"#fff",padding:"13px 32px",
              fontSize:10,letterSpacing:3,textTransform:"uppercase",
              textDecoration:"none",fontFamily:"'Montserrat',sans-serif",
              transition:"all .2s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.background="#B8922A";e.currentTarget.style.borderColor="#B8922A";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(255,255,255,.25)";}}
          >
            ▶ Follow on TikTok
          </a>
        </div>
      </section>

      {/* ── MASTER PERFUMERY EDITORIAL ── */}
      <section style={{position:"relative",overflow:"hidden",zIndex:0,background:"#000",padding:"0"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",minHeight:"550px"}} className="hero-split">
          {/* Left Text Column */}
          <div style={{padding:"80px 8% 80px 8%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <h2 className="disp" style={{fontSize:"clamp(32px,4.5vw,54px)",fontWeight:300,lineHeight:1.1,marginBottom:20,color:"#fff",letterSpacing:-1.5}}>
              The Art of Arabic &amp;<br/><em style={{color:"#B8922A",fontStyle:"italic"}}>French Perfumery</em>
            </h2>
            <p style={{color:"rgba(255,255,255,.6)",lineHeight:1.85,fontSize:14,marginBottom:36,maxWidth:440,fontFamily:"'Montserrat',sans-serif"}}>
              Founded by Mohamed Iqbal Abdul Sattar — each creation blends the ancient soul of Arabian oud with the precision of French fragrance tradition.
            </p>
            <div>
              <button className="btn-gold" style={{borderColor:"#fff",background:"#fff",color:"#000"}} onClick={()=>setPage("story")}>Meet the Perfumers</button>
            </div>
          </div>
          {/* Right Image Column */}
          <div style={{position:"relative",overflow:"hidden",minHeight:"350px"}}>
            <img 
              src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1775636549" 
              alt="Khadlaj Master Perfumery"
              style={{
                width:"100%",
                height:"100%",
                objectFit:"cover",
                position:"absolute",
                top:0,
                left:0,
                transition:"transform 0.8s ease"
              }}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            />
          </div>
        </div>
      </section>

      {/* ── WHY KHADLAJ — Trust strip ── */}
      <section style={{background:"#fff",borderTop:"1px solid #E8E4DC",borderBottom:"1px solid #E8E4DC",padding:"80px 5%",position:"relative",zIndex:1}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24,textAlign:"center"}} className="grid-4">
          {[
            {
              icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B8922A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="rgba(184,146,42,0.03)" /><path d="M12 22V12" /><path d="M12 12c2-2.5 4-3 5-5-2 .5-4.5 2-5 5z" fill="rgba(184,146,42,0.1)" /><path d="M12 12c-2-2.5-4-3-5-5 2 .5 4.5 2 5 5z" fill="rgba(184,146,42,0.1)" /><path d="M12 15c1.5-1.5 3-1.8 3.8-3-.8.3-2.2 1-3.8 3z" /><path d="M12 15c-1.5-1.5-3-1.8-3.8-3 .8.3 2.2 1 3.8 3z" /></svg>,
              title:"Natural Ingredients",
              desc:"Taif roses, Cambodian oud, French iris — ethically sourced"
            },
            {
              icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B8922A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="rgba(184,146,42,0.03)" /><polygon points="12 6 13.5 9.5 17 9.5 14 11.5 15.5 15 12 13 8.5 15 10 11.5 7 9.5 10.5 9.5 12 6" fill="rgba(184,146,42,0.15)" /></svg>,
              title:"Award-Winning",
              desc:"Recognised fragrance house since 1997 across 30+ countries"
            },
            {
              icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B8922A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="rgba(184,146,42,0.03)" /><rect x="6" y="8" width="8" height="6" rx="1" fill="rgba(184,146,42,0.1)" /><path d="M14 9h3l2 2v3h-5V9z" /><circle cx="8.5" cy="16.5" r="1.5" fill="#B8922A" /><circle cx="15.5" cy="16.5" r="1.5" fill="#B8922A" /></svg>,
              title:"Free UAE Delivery",
              desc:"Complimentary shipping on orders above AED 150"
            },
            {
              icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B8922A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="rgba(184,146,42,0.03)" /><rect x="6" y="8" width="12" height="8" rx="1" fill="rgba(184,146,42,0.1)" /><path d="M6 11h12M12 8v8" /><path d="M12 8c-.8-1-2.2-1.5-2.2-.5s1.2 1 2.2.5c.8-1 2.2-1.5 2.2-.5s-1.2 1-2.2.5z" /></svg>,
              title:"Luxury Packaging",
              desc:"Every order arrives gift-ready in premium Khadlaj packaging"
            },
          ].map((item,i)=>(
            <div key={item.title} style={{
              padding:"40px 28px",
              background:"#FCFBFA",
              border:"1px solid #F0ECE6",
              transition:"all .3s cubic-bezier(0.25, 0.8, 0.25, 1)",
            }}
            onMouseEnter={e=>{
              e.currentTarget.style.transform="translateY(-6px)";
              e.currentTarget.style.borderColor="#B8922A";
              e.currentTarget.style.boxShadow="0 16px 36px rgba(184,146,42,0.08)";
            }}
            onMouseLeave={e=>{
              e.currentTarget.style.transform="translateY(0)";
              e.currentTarget.style.borderColor="#F0ECE6";
              e.currentTarget.style.boxShadow="none";
            }}
            >
              <div style={{marginBottom:22,display:"flex",justifyContent:"center"}}>{item.icon}</div>
              <p style={{fontSize:11,fontWeight:700,color:"#111",letterSpacing:2,fontFamily:"'Montserrat',sans-serif",marginBottom:12,textTransform:"uppercase"}}>{item.title}</p>
              <p style={{fontSize:12,color:"#777",lineHeight:1.7,fontFamily:"'Montserrat',sans-serif",maxWidth:220,margin:"0 auto"}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section style={{padding:"96px 5%",background:"#fff",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:40}}>
          <div>
            <div style={{width:32,height:1,background:"#B8922A",marginBottom:16}}/>
            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:10}}>Just Dropped</p>
            <h2 className="disp" style={{fontSize:"clamp(28px,3.5vw,50px)",fontWeight:300,color:"#000",letterSpacing:-1,lineHeight:1.05}}>
              New <em style={{fontStyle:"italic",color:"#B8922A"}}>Arrivals</em>
            </h2>
          </div>
          <button className="btn-ghost" style={{flexShrink:0}} onClick={()=>{setActiveCat("New");setPage("collections");}}>View All New</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}} className="grid-4">
          {PRODUCTS.filter(p=>p.badge==="New").slice(0,4).map(p=>(
            <ProductCard key={p.id} p={p} onView={(prod)=>{setViewProduct(prod);setPage("product");}} />
          ))}
        </div>
      </section>

      {/* ── GIFT SETS ── */}
      <section style={{padding:"96px 5%",background:"#fff",borderTop:"1px solid #E8E4DC"}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:60}}>
          <div>
            <div style={{width:32,height:1,background:"#B8922A",marginBottom:18}}/>
            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:12}}>Gifting</p>
            <h2 className="disp" style={{fontSize:"clamp(30px,3.8vw,52px)",fontWeight:300,color:"#000",lineHeight:1,letterSpacing:-1}}>
              Curated<br/><em style={{fontStyle:"italic",color:"#B8922A"}}>Gift Collections</em>
            </h2>
          </div>
          <button className="btn-ghost" style={{flexShrink:0}} onClick={()=>setPage("gifts")}>View All Gifts</button>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}} className="grid-4">
          {PRODUCTS.filter(p=>p.size==="Gift Set").slice(0,4).map(p=>(
            <ProductCard key={p.id} p={p} onView={(prod)=>{setViewProduct(prod);setPage("product");}} />
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}


      {/* ── TESTIMONIALS ── */}
      <section style={{background:"#000",padding:"96px 5%"}}>
        <SectionHeader eyebrow="Reviews" title="Loved Across the Gulf" light={true} />
        <div className="grid-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"rgba(255,255,255,.15)"}}>
          {REVIEWS.map((r,i)=>(
            <div key={i} style={{background:"#000",padding:"48px 32px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
              <StarRating n={r.stars} color="#B8922A"/>
              <p className="disp" style={{fontSize:14,color:"rgba(255,255,255,0.85)",lineHeight:1.8,margin:"24px 0",fontStyle:"italic",fontWeight:300}}>"{r.text}"</p>
              <div style={{marginTop:"auto"}}>
                <p style={{fontSize:9,fontWeight:600,color:"#fff",letterSpacing:2,fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase"}}>{r.name}</p>
                <p style={{fontSize:8,letterSpacing:4,color:"#B8922A",marginTop:6,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif"}}>{r.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── KHADLAJ WORLD GRID ── */}
      <section style={{padding:"0 5% 96px",background:"#fff"}}>
        <div style={{textAlign:"center",paddingTop:96,marginBottom:52}}>
          <div style={{width:40,height:1,background:"#B8922A",margin:"0 auto 20px"}}/>
          <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:16}}>@KhadlajPerfumes</p>
          <h2 className="disp" style={{fontSize:"clamp(28px,3.5vw,50px)",fontWeight:300,color:"#000",letterSpacing:-0.5,lineHeight:1.1,marginBottom:20}}>
            Feel the World of <em style={{fontStyle:"italic",color:"#B8922A"}}>Khadlaj</em>
          </h2>
          <p style={{fontSize:13,color:"#888",fontFamily:"'Montserrat',sans-serif",letterSpacing:.3,marginBottom:28,maxWidth:420,margin:"0 auto 28px"}}>
            Real moments. Real fragrance. Follow us for the latest drops and stories.
          </p>
          <a
            href={SOCIAL_LINKS.tiktok}
            target="_blank" rel="noreferrer"
            style={{
              display:"inline-flex",alignItems:"center",gap:8,
              border:"1px solid #000",color:"#000",background:"transparent",
              padding:"11px 28px",fontSize:9,letterSpacing:2.5,
              textTransform:"uppercase",textDecoration:"none",
              fontFamily:"'Montserrat',sans-serif",transition:"all .22s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.background="#000";e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#000";}}
          >Follow Us</a>
        </div>

        {/* Mosaic grid — varying sizes for editorial feel */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gridTemplateRows:"auto",gap:3}}>

          {/* Large — spans 2 cols 2 rows */}
          <div style={{gridColumn:"1/3",gridRow:"1/3",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>
            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1775636549"
              alt="Ihthiraam" loading="lazy"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transition:"transform .6s ease"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            />
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px",background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}>
              <p style={{color:"#B8922A",fontSize:8,letterSpacing:2.5,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:3}}>Master Perfumery</p>
              <p className="disp" style={{color:"#fff",fontSize:18,fontWeight:300}}>Ihthiraam</p>
            </div>
          </div>

          {/* Medium top-middle */}
          <div style={{gridColumn:"3/5",gridRow:"1/2",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>
            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.3.png?v=1772518819"
              alt="Intoxicate Mystique" loading="lazy"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transition:"transform .6s ease",aspectRatio:"1/1"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            />
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"14px 16px",background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}>
              <p className="disp" style={{color:"#fff",fontSize:15,fontWeight:300}}>Intoxicate Mystique</p>
            </div>
          </div>

          {/* Tall right — spans 2 rows */}
          <div style={{gridColumn:"5/7",gridRow:"1/3",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>
            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_1_jpg_c97c705a-aebf-4bf9-a621-f11b565e765d.jpg?v=1771333282"
              alt="Angel Dust" loading="lazy"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",transition:"transform .6s ease"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            />
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px",background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}>
              <p style={{color:"#B8922A",fontSize:8,letterSpacing:2.5,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:3}}>Master Perfumery</p>
              <p className="disp" style={{color:"#fff",fontSize:18,fontWeight:300}}>Angel Dust</p>
            </div>
          </div>

          {/* Bottom-middle left */}
          <div style={{gridColumn:"3/4",gridRow:"2/3",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>
            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-03.jpg?v=1762324228"
              alt="Onyx Gold" loading="lazy"
              style={{width:"100%",height:"100%",objectFit:"cover",aspectRatio:"1/1",transition:"transform .6s ease"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            />
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 14px",background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}>
              <p className="disp" style={{color:"#fff",fontSize:13,fontWeight:300}}>Onyx Gold</p>
            </div>
          </div>

          {/* Bottom-middle right */}
          <div style={{gridColumn:"4/5",gridRow:"2/3",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>
            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/shiyaaka-snow.png?v=1781615422"
              alt="Shiyaaka Snow" loading="lazy"
              style={{width:"100%",height:"100%",objectFit:"cover",aspectRatio:"1/1",transition:"transform .6s ease"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            />
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 14px",background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}>
              <p className="disp" style={{color:"#fff",fontSize:13,fontWeight:300}}>Shiyaaka Snow</p>
            </div>
          </div>

          {/* Bottom full row — 3 equal */}
          {[
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_3.png?v=1781332291",name:"Saraya"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SAWAAR-03.jpg?v=1764151207",name:"Sawaar Vanille Blanc"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais_Magrib-3.jpg?v=1761115886",name:"Nafais Magrib"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qarar-3.jpg?v=1775637258",name:"Qarar"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Zayan_Silver-3.jpg?v=1776430400",name:"Zayaan Silver"},
            {src:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.1.jpg?v=1773206615",name:"Icon"},
          ].map((item,i)=>(
            <div key={item.name} style={{gridColumn:`${i+1}/${i+2}`,gridRow:"3/4",position:"relative",overflow:"hidden",cursor:"pointer",background:"#F5F3EF"}}>
              <img src={item.src} alt={item.name} loading="lazy"
                style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",aspectRatio:"1/1",transition:"transform .6s ease"}}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.08)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
              />
              <div
                style={{position:"absolute",inset:0,background:"rgba(0,0,0,0)",transition:"background .3s",display:"flex",alignItems:"flex-end",padding:"10px"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,.45)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(0,0,0,0)"}
              >
                <p className="disp" style={{color:"#fff",fontSize:12,fontWeight:300,opacity:0,transition:"opacity .3s"}}
                  onMouseEnter={e=>e.currentTarget.style.opacity="1"}
                >{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: COLLECTIONS
═══════════════════════════════════════════════════════════════ */
function CollectionsPage({ addToCart, setViewProduct, setPage }){
  const [activeCat, setActiveCat] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [priceMax, setPriceMax] = useState(800);

  let filtered = PRODUCTS.filter(p=>{
    if(activeCat==="All") return true;
    if(activeCat==="Best Sellers") return p.badge==="Best Seller";
    if(activeCat==="New") return p.badge==="New";
    if(activeCat==="For Him") return p.gender==="Him";
    if(activeCat==="For Her") return p.gender==="Her";
    if(activeCat==="Unisex") return p.gender==="Unisex";
    return p.col===activeCat;
  }).filter(p=>p.price<=priceMax);

  if(sortBy==="price-asc") filtered=[...filtered].sort((a,b)=>a.price-b.price);
  if(sortBy==="price-desc") filtered=[...filtered].sort((a,b)=>b.price-a.price);

  return (
    <div style={{background:"#fff"}}>

      {/* ── Hero Banner ── */}
      <div style={{position:"relative",height:"clamp(300px,38vw,500px)",overflow:"hidden",background:"#000"}}>
        {/* Background collage of product images */}
        <div style={{position:"absolute",inset:0,display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:2,opacity:.5}}>
          {[
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_3.png?v=1781332291",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1775636549",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.3.png?v=1772518819",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-03.jpg?v=1762324228",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/shiyaaka-snow.png?v=1781615422",
          ].map((src,i)=>(
            <div key={i} style={{overflow:"hidden",height:"100%"}}>
              <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
            </div>
          ))}
        </div>
        {/* Gradient overlay */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(0,0,0,.85) 0%,rgba(0,0,0,.65) 50%,rgba(0,0,0,.80) 100%)"}}/>

        {/* Text content */}
        <div style={{
          position:"absolute",inset:0,
          display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",
          padding:"0 5%",textAlign:"center",
        }}>
          <div style={{width:40,height:1,background:"#B8922A",marginBottom:24}}/>
          <p style={{fontSize:9,letterSpacing:6,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:16}}>
            Khadlaj · Est. 1997
          </p>
          <h1 className="disp" style={{
            fontSize:"clamp(42px,6vw,88px)",fontWeight:300,
            color:"#fff",lineHeight:.95,letterSpacing:-2,marginBottom:20,
          }}>
            All Fragrances
          </h1>
          <p style={{
            color:"rgba(255,255,255,.6)",fontSize:14,
            fontFamily:"'Montserrat',sans-serif",letterSpacing:.5,
            marginBottom:32,
          }}>
            {PRODUCTS.length} unique creations — from everyday luxury to rare extrait
          </p>
          {/* Live category quick-links */}
          <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
            {["Best Sellers","New","For Him","For Her","Unisex"].map(c=>(
              <button
                key={c}
                onClick={()=>setActiveCat(c)}
                style={{
                  background:"transparent",color:"rgba(255,255,255,.75)",
                  border:"1px solid rgba(255,255,255,.3)",
                  padding:"7px 18px",fontSize:9,letterSpacing:2,
                  textTransform:"uppercase",cursor:"pointer",
                  fontFamily:"'Montserrat',sans-serif",
                  transition:"all .2s",
                }}
                onMouseEnter={e=>{e.currentTarget.style.background="#B8922A";e.currentTarget.style.borderColor="#B8922A";e.currentTarget.style.color="#fff";}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(255,255,255,.3)";e.currentTarget.style.color="rgba(255,255,255,.75)";}}
              >{c}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filters bar ── */}
      <div style={{
        background:"#fff",borderBottom:"1px solid #E8E4DC",
        padding:"20px 5%",
        display:"flex",gap:12,alignItems:"center",flexWrap:"wrap",
        position:"sticky",top:0,zIndex:50,
        boxShadow:"0 2px 12px rgba(0,0,0,.05)",
      }}>
        {/* Category tabs */}
        <div style={{display:"flex",gap:0,flex:1,flexWrap:"wrap",borderRight:"1px solid #E0E0E0",paddingRight:16,marginRight:4}}>
          {CATEGORIES.map(c=>(
            <button key={c} onClick={()=>setActiveCat(c)}
              style={{
                background:"transparent",
                color: activeCat===c ? "#000" : "#888",
                border:"none",
                borderBottom: activeCat===c ? "1px solid #000" : "1px solid transparent",
                padding:"8px 14px 10px",fontSize:10,letterSpacing:1.5,
                cursor:"pointer",whiteSpace:"nowrap",
                fontWeight: activeCat===c ? 700 : 400,
                transition:"all .18s",textTransform:"uppercase",
                fontFamily:"'Montserrat',sans-serif",
              }}>{c}</button>
          ))}
        </div>
        {/* Sort + Price */}
        <div style={{display:"flex",gap:12,alignItems:"center",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:10,color:"#888",letterSpacing:1,fontFamily:"'Montserrat',sans-serif",whiteSpace:"nowrap"}}>Max AED {priceMax}</span>
            <input type="range" min={50} max={800} value={priceMax} onChange={e=>setPriceMax(+e.target.value)}
              style={{width:90,accentColor:"#000"}}/>
          </div>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
            style={{
              background:"#fff",color:"#000",
              border:"1px solid #E0E0E0",
              padding:"8px 14px",fontSize:10,cursor:"pointer",
              letterSpacing:1,fontFamily:"'Montserrat',sans-serif",
              outline:"none",
            }}>
            <option value="default">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>
      </div>

      {/* ── Products Grid ── */}
      <div style={{padding:"20px 5% 80px"}}>
        <p style={{
          fontSize:10,color:"#999",marginBottom:32,
          letterSpacing:2,fontFamily:"'Montserrat',sans-serif",
          textTransform:"uppercase",
        }}>{filtered.length} fragrances found</p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24,alignItems:"start"}} className="grid-4">
          {filtered.map(p=>(
            <ProductCard key={p.id} p={p} onView={(prod)=>{setViewProduct(prod);setPage("product");}} onCart={addToCart}/>
          ))}
        </div>

        {filtered.length===0 && (
          <div style={{textAlign:"center",padding:"96px 0"}}>
            <p className="disp" style={{fontSize:36,fontWeight:300,color:"#000",marginBottom:12}}>No fragrances found</p>
            <p style={{fontSize:13,color:"#888",fontFamily:"'Montserrat',sans-serif"}}>Try adjusting the filters above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: PRODUCT DETAIL
═══════════════════════════════════════════════════════════════ */
function Accordion({ title, children, defaultOpen=false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{borderBottom:"1px solid #E8E4DC"}}>
      <button 
        onClick={()=>setOpen(!open)}
        style={{
          width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"20px 0", background:"transparent", border:"none", cursor:"pointer",
          fontSize:12, letterSpacing:2, textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif",
          fontWeight:600, color:"#111"
        }}
      >
        <span>{title}</span>
        <span style={{fontSize:18, fontWeight:300}}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{paddingBottom:24, fontSize:14, color:"#555", lineHeight:1.8, fontFamily:"'Montserrat',sans-serif"}}>
          {children}
        </div>
      )}
    </div>
  );
}

function ProductPage({ product, addToCart, setPage, setViewProduct }){
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const related = PRODUCTS.filter(p=>p.col===product.col && p.id!==product.id).slice(0,3);
  
  // If no images array exists, provide the main image plus some high-quality Khadlaj lifestyle images 
  // to ensure the scrollable stacked gallery looks professional and populated.
  const thumbs = product.images?.length > 1 ? product.images : [
    product.img,
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy1.jpg?v=1767169755",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-3.jpg?v=1779352739",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Zayan_Silver-3.jpg?v=1776430400"
  ];

  useEffect(()=>{
    setActiveImg(0);
    window.scrollTo(0,0);
  }, [product.id]);

  const handleAdd = () => {
    for(let i=0;i<qty;i++) addToCart(product);
    setAdded(true);
    setTimeout(()=>setAdded(false),2200);
  };

  return (
    <div style={{background:"#fff", minHeight:"100vh"}}>
      
      {/* ── Breadcrumbs ── */}
      <div style={{padding:"32px 5% 0", maxWidth:1440, margin:"0 auto", fontSize:10, letterSpacing:1.5, textTransform:"uppercase", color:"#888", fontFamily:"'Montserrat',sans-serif"}}>
        <span style={{cursor:"pointer", color:"#111"}} onClick={()=>setPage("home")}>Home</span>
        <span style={{margin:"0 12px"}}>|</span>
        <span style={{cursor:"pointer", color:"#111"}} onClick={()=>setPage("collections")}>Collections</span>
        <span style={{margin:"0 12px"}}>|</span>
        <span>{product.name}</span>
      </div>

      {/* ── Main Product Section ── */}
      <div style={{maxWidth:1440, margin:"0 auto", padding:"40px 5% 120px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(40px, 8vw, 100px)",alignItems:"start"}} className="grid-2">
          
          {/* ── Left: Image Gallery (Scrollable Stack) ── */}
          <div style={{display:"flex", flexDirection:"column", gap:16}}>
            {thumbs.map((t, i) => (
              <div key={i} style={{width:"100%", aspectRatio:"1/1", display:"flex", alignItems:"center", justifyContent:"center", background:"transparent"}}>
                 <img src={t} alt={`${product.name} - ${i+1}`} style={{width:"85%", height:"85%", objectFit:"contain", mixBlendMode:"multiply", filter:"contrast(1.05) brightness(1.04)", transition:"opacity .3s"}}/>
              </div>
            ))}
          </div>

          {/* ── Right: Product Details (Sticky) ── */}
          <div style={{paddingTop:8, maxWidth:540, position:"sticky", top:120, alignSelf:"start"}}>
             {/* EYEBROW */}
             <p style={{fontSize:10, letterSpacing:3, color:"#111", textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif", marginBottom:16}}>Khadlaj Perfumes</p>
             
             {/* TITLE */}
             <h1 className="disp" style={{fontSize:"clamp(36px, 4.5vw, 52px)", fontWeight:300, color:"#000", lineHeight:1.05, letterSpacing:"-0.5px", textTransform:"uppercase", marginBottom:16}}>
               {product.name}
             </h1>

             {/* REVIEWS */}
             <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:24}}>
               <StarRating n={5} color="#111" />
               <span style={{fontSize:13, color:"#555", fontFamily:"'Montserrat',sans-serif", borderBottom:"1px solid #ccc", cursor:"pointer", paddingBottom:2}}>4.9 rating (55 reviews)</span>
             </div>

             {/* PRICE */}
             <p style={{fontSize:24, fontWeight:400, color:"#111", fontFamily:"'Montserrat',sans-serif", marginBottom:8}}>AED {product.price.toFixed(2)}</p>
             <p style={{fontSize:12, color:"#777", fontFamily:"'Montserrat',sans-serif", marginBottom:40}}>Tax included. Shipping calculated at checkout.</p>

             {/* VARIANT / SIZE */}
             <div style={{marginBottom:40}}>
               <p style={{fontSize:11, letterSpacing:1.5, textTransform:"uppercase", color:"#111", fontFamily:"'Montserrat',sans-serif", marginBottom:12, fontWeight:600}}>Size</p>
               <button style={{border:"1px solid #111", background:"#fff", color:"#111", padding:"12px 28px", fontSize:12, letterSpacing:1.5, fontFamily:"'Montserrat',sans-serif", cursor:"default"}}>
                 {product.size}
               </button>
             </div>

             {/* ACTIONS (Qty + Add to Cart) */}
             <div style={{display:"flex", gap:16, marginBottom:32, flexWrap:"wrap"}}>
               {/* Quantity */}
               <div style={{display:"flex", alignItems:"center", border:"1px solid #E8E4DC", width:130, height:56}}>
                  <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{flex:1, height:"100%", border:"none", background:"transparent", fontSize:20, cursor:"pointer", color:"#555"}}>−</button>
                  <span style={{flex:1, textAlign:"center", fontSize:15, fontFamily:"'Montserrat',sans-serif"}}>{qty}</span>
                  <button onClick={()=>setQty(q=>q+1)} style={{flex:1, height:"100%", border:"none", background:"transparent", fontSize:20, cursor:"pointer", color:"#555"}}>+</button>
               </div>
               
               {/* Add to Bag (Minimalist Black) */}
               <button 
                 onClick={handleAdd} 
                 style={{
                   flex:1, minWidth:200, height:56, background:"#111", color:"#fff", border:"none", 
                   fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", 
                   fontFamily:"'Montserrat',sans-serif", cursor:"pointer", transition:"background .2s"
                 }} 
                 onMouseEnter={e=>e.currentTarget.style.background="#333"} 
                 onMouseLeave={e=>e.currentTarget.style.background="#111"}
               >
                 {added ? "Added to Bag" : "Add to Bag"}
               </button>
             </div>

             {/* TRUST BADGES */}
             <div style={{display:"flex", gap:24, marginBottom:48, paddingTop:24, borderTop:"1px solid #E8E4DC"}}>
               <div style={{display:"flex", alignItems:"center", gap:8, fontSize:10, color:"#555", fontFamily:"'Montserrat',sans-serif", textTransform:"uppercase", letterSpacing:1.5}}>
                 <span style={{fontSize:14}}>✓</span> Authentic
               </div>
               <div style={{display:"flex", alignItems:"center", gap:8, fontSize:10, color:"#555", fontFamily:"'Montserrat',sans-serif", textTransform:"uppercase", letterSpacing:1.5}}>
                 <span style={{fontSize:14}}>✓</span> Secure Check
               </div>
               <div style={{display:"flex", alignItems:"center", gap:8, fontSize:10, color:"#555", fontFamily:"'Montserrat',sans-serif", textTransform:"uppercase", letterSpacing:1.5}}>
                 <span style={{fontSize:14}}>✓</span> Fast Ship
               </div>
             </div>

             {/* ACCORDIONS */}
             <div>
               <Accordion title="Description" defaultOpen>
                 <p style={{marginBottom:12}}>Experience the timeless elegance of {product.name}. Crafted with precision and the finest ingredients, this fragrance is a true testament to the art of Arabian perfumery.</p>
                 {product.desc && <p>{product.desc}</p>}
               </Accordion>
               
               <Accordion title="Fragrance Notes">
                  {product.notes && product.notes.length > 0 ? (
                    <ul style={{paddingLeft:16, margin:0, display:"flex", flexDirection:"column", gap:8}}>
                      {product.notes.map(n=><li key={n}>{n}</li>)}
                    </ul>
                  ) : (
                    <p>A harmonious blend of signature Khadlaj notes crafted for a lasting impression.</p>
                  )}
               </Accordion>

               <Accordion title="Shipping & Returns">
                 <p>Orders are processed within 1-2 business days. Free shipping on all orders over AED 200 within the UAE. International shipping rates apply and will be calculated at checkout.</p>
               </Accordion>
             </div>
          </div>
        </div>
      </div>

      {/* ── Related Products ── */}
      {related.length>0 && (
        <div style={{padding:"0 5% 104px"}}>
          <SectionHeader eyebrow="◈ · Handpicked For You" title="You May Also Like" light/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:32,alignItems:"start"}} className="grid-3">
            {related.map(p=>(
              <ProductCard key={p.id} p={p} onView={(prod)=>{if(setViewProduct){setViewProduct(prod);setPage("product");}}} onCart={addToCart}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: GIFT SETS
═══════════════════════════════════════════════════════════════ */
function GiftsPage({ addToCart, setViewProduct, setPage }){
  // Pull gift set products directly from PRODUCTS array (size === "Gift Set")
  const giftProducts = PRODUCTS.filter(p => p.size === "Gift Set");

  return (
    <div style={{background:"#fff"}}>

      {/* ── Hero Banner ── */}
      <div style={{position:"relative",height:"clamp(280px,38vw,480px)",overflow:"hidden",background:"#000"}}>
        <img
          src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy1.jpg?v=1767169755"
          alt="Gift Sets"
          style={{width:"100%",height:"100%",objectFit:"cover",opacity:.55}}
        />
        <div style={{
          position:"absolute",inset:0,
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
          padding:"0 5%",textAlign:"center",
        }}>
          <div style={{width:40,height:1,background:"#B8922A",marginBottom:24}}/>
          <p style={{fontSize:9,letterSpacing:6,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:16}}>Khadlaj Gifting</p>
          <h1 className="disp" style={{fontSize:"clamp(38px,6vw,80px)",fontWeight:300,color:"#fff",lineHeight:1,letterSpacing:-2,marginBottom:16}}>
            The Gift of<br/><em style={{fontStyle:"italic",color:"#B8922A"}}>Authentic Fragrance</em>
          </h1>
          <p style={{color:"rgba(255,255,255,.65)",maxWidth:480,lineHeight:1.8,fontSize:14,fontFamily:"'Montserrat',sans-serif"}}>
            Every Khadlaj gift set arrives in premium packaging — a luxury experience from first glance.
          </p>
        </div>
      </div>

      {/* ── Live Gift Set Products (from PRODUCTS) ── */}
      <section style={{padding:"80px 5%",background:"#fff"}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:52}}>
          <div>
            <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:12}}>Curated Collections</p>
            <h2 className="disp" style={{fontSize:"clamp(28px,3.5vw,50px)",fontWeight:300,color:"#000",letterSpacing:-1,lineHeight:1.05}}>
              Gift Sets &amp; <em style={{fontStyle:"italic",color:"#B8922A"}}>Bundles</em>
            </h2>
          </div>
          <p style={{fontSize:12,color:"#888",fontFamily:"'Montserrat',sans-serif"}}>{giftProducts.length} gift sets available</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24,alignItems:"start"}} className="grid-4">
          {giftProducts.map(p=>(
            <ProductCard key={p.id} p={p} onView={(prod)=>{if(setViewProduct){setViewProduct(prod);setPage("product");}}} onCart={addToCart}/>
          ))}
        </div>
      </section>

      {/* ── Build Your Own CTA ── */}
      <section style={{background:"#000",padding:"80px 5%",textAlign:"center"}}>
        <div style={{maxWidth:580,margin:"0 auto"}}>
          <div style={{width:40,height:1,background:"#B8922A",margin:"0 auto 32px"}}/>
          <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:16}}>Custom Orders</p>
          <h2 className="disp" style={{fontSize:"clamp(30px,4vw,56px)",fontWeight:300,color:"#fff",marginBottom:16,letterSpacing:-1}}>Build Your Own Gift Box</h2>
          <p style={{color:"rgba(255,255,255,.55)",fontSize:14,maxWidth:460,margin:"0 auto 40px",lineHeight:1.85,fontFamily:"'Montserrat',sans-serif"}}>
            Choose any 2–6 fragrances and we'll present them in our signature gift packaging. Perfect for corporate gifting or weddings.
          </p>
          <button className="btn-gold" style={{fontSize:10,padding:"15px 44px",letterSpacing:3}}>Start Building</button>
          <div style={{width:40,height:1,background:"#B8922A",margin:"32px auto 0"}}/>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: OUR STORY
═══════════════════════════════════════════════════════════════ */
function StoryPage(){
  return (
    <div style={{background:"#fff"}}>

      {/* ── Hero Banner ── */}
      <div style={{position:"relative",height:"clamp(340px,45vw,560px)",overflow:"hidden",background:"#000"}}>
        {/* Split background — founder photo left, perfume bottles right */}
        <div style={{position:"absolute",inset:0,display:"grid",gridTemplateColumns:"1fr 1fr"}}>
          <div style={{overflow:"hidden"}}>
            <img src="./assets/images/people/founder-mohamed-iqbal.png" alt=""
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",opacity:.6}}/>
          </div>
          <div style={{overflow:"hidden",background:"#0A0A0A"}}>
            <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1775636549" alt=""
              style={{width:"100%",height:"100%",objectFit:"cover",opacity:.4}}/>
          </div>
        </div>
        {/* Unified dark overlay */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(0,0,0,.75) 0%,rgba(0,0,0,.55) 50%,rgba(0,0,0,.70) 100%)"}}/>
        {/* Content */}
        <div style={{
          position:"absolute",inset:0,
          display:"flex",flexDirection:"column",
          justifyContent:"flex-end",
          padding:"0 6% 56px",
        }}>
          <div style={{width:40,height:1,background:"#B8922A",marginBottom:20}}/>
          <p style={{fontSize:9,letterSpacing:6,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:14}}>
            Family-Owned · UAE · Est. 1997
          </p>
          <h1 className="disp" style={{
            fontSize:"clamp(48px,7vw,96px)",fontWeight:300,
            color:"#fff",lineHeight:.92,letterSpacing:-3,marginBottom:20,
          }}>
            Our Story
          </h1>
          <p style={{color:"rgba(255,255,255,.6)",fontSize:14,maxWidth:480,lineHeight:1.8,fontFamily:"'Montserrat',sans-serif"}}>
            45 years of mastery. One family. 400+ fragrances that define Arabian perfumery.
          </p>
        </div>
      </div>

      <div style={{padding:"80px 5%"}}>
        {/* Founder story */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center",marginBottom:88}} className="hero-split">
          <div>
            <p className="eyebrow" style={{marginBottom:16}}>◈ · The Beginning</p>
            <h2 className="disp" style={{fontSize:"clamp(30px,4vw,52px)",fontWeight:300,lineHeight:1.2,marginBottom:24}}>
              Founder and Master Perfumer
            </h2>
            <p style={{color:C.muted,lineHeight:1.9,fontSize:15,marginBottom:20}}>
              Mohamed Iqbal Abdul Sattar, with over 45 years of experience in perfumery, is the esteemed founder and master perfumer of Khadlaj Perfumes.
            </p>
            <p style={{color:C.muted,lineHeight:1.9,fontSize:15,marginBottom:32}}>
              He is recognized for his creation of some of our most cherished and opulent fragrances, including the iconic Hareem Al Sultan, Bukhoor Al Bahaar, and the luxurious Oud Pure and Musk Pure ranges. Mohamed’s unparalleled expertise encompasses both exquisite natural essences and meticulously crafted synthetic compounds, with an ardent passion for Musk, Ruh Gulaab, oud, and vetiver.
            </p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}}>
              {STATS.map(s=>(
                <div key={s.v} style={{border:`1px solid ${C.brass}28`,padding:"20px 22px"}}>
                  <p className="disp" style={{fontSize:36,fontWeight:600,color:C.brass}}>{s.v}</p>
                  <p className="eyebrow" style={{color:C.muted,marginTop:4}}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{position:"relative",aspectRatio:"4/5",overflow:"hidden"}}>
            <img src="./assets/images/people/founder-mohamed-iqbal.png"
              alt="Mohamed Iqbal Abdul Sattar" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
            <div style={{position:"absolute",bottom:0,left:0,right:0,background:`linear-gradient(to top,${C.obsidian}EE 0%,transparent 60%)`,padding:"28px 24px"}}>
              <p className="disp" style={{fontSize:22,color:C.champagne}}>Mohamed Iqbal Abdul Sattar</p>
              <p className="eyebrow" style={{color:C.brass,marginTop:4}}>Founder & Master Perfumer</p>
            </div>
          </div>
        </div>

        {/* Managing Director */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center",marginBottom:88}} className="hero-split">
          <div style={{position:"relative",aspectRatio:"4/5",overflow:"hidden"}}>
            <img src="./assets/images/people/managing-director-asif.png"
              alt="Asif Mohamed Iqbal Katchi" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
            <div style={{position:"absolute",bottom:0,left:0,right:0,background:`linear-gradient(to top,${C.obsidian}EE 0%,transparent 60%)`,padding:"28px 24px"}}>
              <p className="disp" style={{fontSize:22,color:C.champagne}}>Asif Mohamed Iqbal Katchi</p>
              <p className="eyebrow" style={{color:C.brass,marginTop:4}}>Managing Director</p>
            </div>
          </div>
          <div>
            <p className="eyebrow" style={{marginBottom:16}}>? � Leadership</p>
            <h2 className="disp" style={{fontSize:"clamp(30px,4vw,52px)",fontWeight:300,lineHeight:1.2,marginBottom:24}}>
              Managing Director
            </h2>
            <p style={{color:C.muted,lineHeight:1.9,fontSize:15,marginBottom:20}}>
              Asif Mohamed Iqbal Katchi brings over 18 years of profound experience and carries forward the illustrious legacy of his father, Mohamed Iqbal, with a clear commitment to excellence in every endeavor.
            </p>
            <p style={{color:C.muted,lineHeight:1.9,fontSize:15,marginBottom:20}}>
              His visionary and creatively driven leadership is focused on making Khadlaj a luxurious, trusted name in fragrance, synonymous with reliability, innovation, and a celebrated household presence across the industry.
            </p>
            <p style={{color:C.muted,lineHeight:1.9,fontSize:15,marginBottom:32}}>
              Known for anticipating challenges with an agile and proactive mindset, Mr. Asif has helped navigate Khadlaj through dynamic market shifts while strengthening the company�s position as a leader in perfumery craftsmanship and luxury.
            </p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}}>
              {[
                {v:"18+", l:"Years of Experience"},
                {v:"1", l:"Legacy to Lead"},
              ].map(s=>(
                <div key={s.v} style={{border:`1px solid ${C.brass}28`,padding:"20px 22px"}}>
                  <p className="disp" style={{fontSize:36,fontWeight:600,color:C.brass}}>{s.v}</p>
                  <p className="eyebrow" style={{color:C.muted,marginTop:4}}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Lifestyle editorial */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:48,marginBottom:0}}>
          {[
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_3.png?v=1781332291",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.3.png?v=1772518819",
            "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_1_jpg_c97c705a-aebf-4bf9-a621-f11b565e765d.jpg?v=1771333282",
          ].map((src,i)=>(
            <div key={i} style={{aspectRatio:"4/5",overflow:"hidden"}}>
              <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: CONTACT
═══════════════════════════════════════════════════════════════ */
function ContactPage(){
  const [form, setForm] = useState({name:"",email:"",subject:"",message:""});
  const [sent, setSent] = useState(false);
  const handle = () => { setSent(true); setForm({name:"",email:"",subject:"",message:""}); };

  return (
    <div style={{background:"#fff"}}>

      {/* ── Hero Banner ── */}
      <div style={{position:"relative",height:"clamp(280px,36vw,440px)",overflow:"hidden",background:"#000"}}>
        <img
          src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Zayan_Silver-3.jpg?v=1776430400"
          alt="Contact"
          style={{width:"100%",height:"100%",objectFit:"cover",opacity:.4}}
        />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(0,0,0,.80) 0%,rgba(0,0,0,.50) 60%,rgba(0,0,0,.65) 100%)"}}/>
        <div style={{
          position:"absolute",inset:0,
          display:"flex",flexDirection:"column",
          justifyContent:"flex-end",
          padding:"0 6% 52px",
        }}>
          <div style={{width:40,height:1,background:"#B8922A",marginBottom:20}}/>
          <p style={{fontSize:9,letterSpacing:6,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:14}}>
            Get in Touch
          </p>
          <h1 className="disp" style={{
            fontSize:"clamp(44px,6vw,84px)",fontWeight:300,
            color:"#fff",lineHeight:.92,letterSpacing:-2,marginBottom:16,
          }}>Contact Us</h1>
          <p style={{color:"rgba(255,255,255,.55)",fontSize:13,maxWidth:420,lineHeight:1.8,fontFamily:"'Montserrat',sans-serif"}}>
            Our team is ready to assist — whether you're a customer, retailer, or gifting partner.
          </p>
        </div>
      </div>

      <div style={{padding:"80px 5% 96px",display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:64}} className="hero-split">
        {/* Info */}
        <div>
          <div style={{width:32,height:1,background:"#B8922A",marginBottom:20}}/>
          <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:14}}>Reach Us</p>
          <h2 className="disp" style={{fontSize:"clamp(28px,3vw,44px)",fontWeight:300,marginBottom:24,lineHeight:1.1,color:"#000",letterSpacing:-1}}>We'd Love to Hear From You</h2>
          <p style={{color:"#777",lineHeight:1.85,fontSize:14,marginBottom:36,fontFamily:"'Montserrat',sans-serif"}}>
            Whether you're a fragrance enthusiast, a retail partner, or a gifting client — our team is here to help.
          </p>
          {[
            ["📍","Address","Dubai, United Arab Emirates"],
            ["📞","Phone","+971 4 000 0000"],
            ["✉️","Email","hello@khadlaj-perfumes.com"],
            ["⏰","Hours","Mon–Sat: 9am–6pm GST"],
          ].map(([icon,label,val])=>(
            <div key={label} style={{display:"flex",gap:18,marginBottom:22,paddingBottom:22,borderBottom:"1px solid #F0EBE3"}}>
              <span style={{fontSize:20,flexShrink:0,marginTop:2}}>{icon}</span>
              <div>
                <p style={{fontSize:9,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:4}}>{label}</p>
                <p style={{fontSize:14,color:"#333",fontFamily:"'Montserrat',sans-serif"}}>{val}</p>
              </div>
            </div>
          ))}
          <div style={{marginTop:32}}>
            <p style={{fontSize:9,letterSpacing:3,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:16}}>Follow Us</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {[
                ["Instagram","https://www.instagram.com/khadlajperfumes"],
                ["TikTok",SOCIAL_LINKS.tiktok],
                ["Facebook","https://www.facebook.com/"],
                ["YouTube","https://www.youtube.com/"],
              ].map(([s,href])=>(
                <a key={s} href={href} target="_blank" rel="noreferrer"
                  style={{
                    border:"1px solid #000",color:"#000",
                    padding:"9px 16px",fontSize:9,letterSpacing:2,
                    cursor:"pointer",textDecoration:"none",
                    fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase",
                    transition:"all .2s",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.background="#000";e.currentTarget.style.color="#fff";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#000";}}
                >{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{background:"#000",padding:"44px 40px"}}>
          {sent ? (
            <div style={{textAlign:"center",padding:"60px 0"}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:"#B8922A",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:22,color:"#fff"}}>✓</div>
              <h3 className="disp" style={{fontSize:32,color:"#fff",margin:"0 0 12px",fontWeight:300}}>Message Sent</h3>
              <p style={{color:"rgba(255,255,255,.5)",fontSize:13,fontFamily:"'Montserrat',sans-serif"}}>We'll get back to you within 24 hours.</p>
              <button className="btn-ghost" onClick={()=>setSent(false)} style={{marginTop:32,color:"#fff",borderColor:"rgba(255,255,255,.3)"}}>Send Another</button>
            </div>
          ) : (
            <>
              <div style={{width:32,height:1,background:"#B8922A",marginBottom:20}}/>
              <h3 className="disp" style={{fontSize:28,fontWeight:300,color:"#fff",marginBottom:32,letterSpacing:-0.5}}>Send a Message</h3>
              {[["Name","name","text"],["Email","email","email"],["Subject","subject","text"]].map(([label,key,type])=>(
                <div key={key} style={{marginBottom:18}}>
                  <label style={{fontSize:9,letterSpacing:2.5,color:"rgba(255,255,255,.4)",display:"block",marginBottom:8,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif"}}>{label}</label>
                  <input type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}
                    style={{
                      width:"100%",background:"rgba(255,255,255,.05)",
                      border:"1px solid rgba(255,255,255,.12)",
                      borderBottom:"1px solid rgba(255,255,255,.3)",
                      color:"#fff",padding:"12px 0",fontSize:14,outline:"none",
                      fontFamily:"'Montserrat',sans-serif",
                    }}/>
                </div>
              ))}
              <div style={{marginBottom:28}}>
                <label style={{fontSize:9,letterSpacing:2.5,color:"rgba(255,255,255,.4)",display:"block",marginBottom:8,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif"}}>Message</label>
                <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={5}
                  style={{
                    width:"100%",background:"rgba(255,255,255,.05)",
                    border:"1px solid rgba(255,255,255,.12)",
                    borderBottom:"1px solid rgba(255,255,255,.3)",
                    color:"#fff",padding:"12px 0",fontSize:14,outline:"none",
                    resize:"vertical",fontFamily:"'Montserrat',sans-serif",
                  }}/>
              </div>
              <button
                onClick={handle}
                style={{
                  width:"100%",background:"#B8922A",color:"#fff",
                  border:"none",padding:"16px",fontSize:10,
                  letterSpacing:3,textTransform:"uppercase",cursor:"pointer",
                  fontFamily:"'Montserrat',sans-serif",fontWeight:600,
                  transition:"opacity .2s",
                }}
                onMouseEnter={e=>e.currentTarget.style.opacity=".85"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}
              >Send Message</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════ */
function Navbar({ page, setPage, cartCount }){
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (!q.trim()) { setSearchResults([]); return; }
    var lower = q.toLowerCase();
    var results = PRODUCTS.filter(function(p) {
      return p.name.toLowerCase().includes(lower) ||
        p.col.toLowerCase().includes(lower) ||
        (p.notes||[]).some(function(n){ return n.toLowerCase().includes(lower); }) ||
        (p.gender||"").toLowerCase().includes(lower);
    }).slice(0, 8);
    setSearchResults(results);
  };

  return (
    <>
      {/* ── Search Overlay ── */}
      {searchOpen && (
        <div style={{position:"fixed",inset:0,zIndex:500,background:"rgba(255,255,255,.98)",display:"flex",flexDirection:"column",padding:"0 5%"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,borderBottom:"2px solid #000",padding:"28px 0 18px"}}>
            <span style={{fontSize:20,color:"#888"}}>⌕</span>
            <input autoFocus type="text" value={searchQuery} onChange={e=>handleSearch(e.target.value)}
              placeholder="Search fragrances, collections, notes..."
              style={{flex:1,border:"none",outline:"none",fontSize:"clamp(16px,2.5vw,26px)",fontFamily:"'Cinzel',serif",fontWeight:300,color:"#000",background:"transparent"}}
            />
            <button onClick={()=>{setSearchOpen(false);setSearchQuery("");setSearchResults([]);}}
              style={{background:"none",border:"none",fontSize:28,cursor:"pointer",color:"#000",fontWeight:300,lineHeight:1}}>×</button>
          </div>
          <div style={{flex:1,overflowY:"auto",paddingTop:24}}>
            {searchQuery && searchResults.length===0 && (
              <div style={{textAlign:"center",paddingTop:64}}>
                <p className="disp" style={{fontSize:28,fontWeight:300,color:"#000",marginBottom:8}}>No results for "{searchQuery}"</p>
                <p style={{fontSize:13,color:"#888",fontFamily:"'Montserrat',sans-serif"}}>Try "oud", "musk", "gift"...</p>
              </div>
            )}
            {searchResults.length>0 && (
              <>
                <p style={{fontSize:9,letterSpacing:4,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:20}}>{searchResults.length} results for "{searchQuery}"</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:48}} className="grid-3">
                  {searchResults.map(p=>(
                    <div key={p.id} onClick={()=>{setSearchOpen(false);setSearchQuery("");setSearchResults([]);setPage("product");}} style={{cursor:"pointer"}}>
                      <div style={{position:"relative",aspectRatio:"3/4",overflow:"hidden",background:"#F7F5F2"}}>
                        <img src={p.img} alt={p.name} loading="lazy" style={{width:"100%",height:"100%",objectFit:"contain",padding:"16px"}}/>
                        <div style={{height:2,position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(90deg,#B8922A,#D4AF5A,#B8922A)"}}/>
                        {p.badge&&<span style={{position:"absolute",top:10,left:10,background:p.badge==="New"?"#B8922A":p.badge==="Limited"?"#5C0000":"#000",color:"#fff",fontSize:8,letterSpacing:2,padding:"3px 8px",fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase"}}>{p.badge}</span>}
                      </div>
                      <div style={{padding:"10px 6px 14px"}}>
                        <p style={{fontSize:9,color:"#B8922A",letterSpacing:3,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:3}}>{p.col}</p>
                        <p style={{fontSize:12,fontWeight:700,color:"#000",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:4,lineHeight:1.2}}>{p.name}</p>
                        <p style={{fontSize:13,fontWeight:700,color:"#000",fontFamily:"'Montserrat',sans-serif"}}>AED {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {!searchQuery && (
              <div>
                <p style={{fontSize:9,letterSpacing:4,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:16}}>Popular Searches</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:32}}>
                  {["Oud","Musk","Gift Set","New Arrivals","For Her","For Him","Amber","Island"].map(s=>(
                    <button key={s} onClick={()=>handleSearch(s)}
                      style={{background:"#F7F5F2",border:"1px solid #E8E4DC",padding:"8px 16px",fontSize:12,color:"#333",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",transition:"all .2s"}}
                      onMouseEnter={e=>{e.currentTarget.style.background="#000";e.currentTarget.style.color="#fff";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="#F7F5F2";e.currentTarget.style.color="#333";}}
                    >{s}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Announcement bar ── */}
      <div style={{background:"#0a0a0a",color:"#fff",textAlign:"center",padding:"8px 16px",fontSize:"8.5px",letterSpacing:"4px",fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase",borderBottom:"1px solid rgba(184,146,42,0.15)"}}>
        <span style={{color:"#B8922A",marginRight:8,fontWeight:600}}>✦</span>
        REGISTER NOW & RECEIVE 10% OFF — CODE: <span style={{color:"#B8922A",fontWeight:700}}>10OFF</span>
        <span style={{color:"#B8922A",marginLeft:8,fontWeight:600}}>✦</span>
      </div>

      {/* ── Main nav ── */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,.96)",backdropFilter:"blur(15px)",borderBottom:"1px solid #f0f0f0"}}>
        <div style={{padding:"0 6%"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",alignItems:"center",padding:"16px 0",gap:16}}>
            {/* Left utility */}
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <div style={{display:"flex",gap:4,alignItems:"center"}} className="hide-mob">
                {COUNTRIES.map(c=>(
                  <div key={c.name} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px",background:"transparent",cursor:"pointer",transition:"all .25s ease",opacity:0.75}}
                    onMouseEnter={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="scale(1.05)";}}
                    onMouseLeave={e=>{e.currentTarget.style.opacity="0.75";e.currentTarget.style.transform="scale(1)";}}
                  >
                    {c.flagUrl === "global" ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:"#111"}}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    ) : (
                      <img src={c.flagUrl} alt="" style={{width:16,height:11,objectFit:"cover",borderRadius:1}} />
                    )}
                    <span style={{fontSize:"8px",color:"#111",fontFamily:"'Montserrat',sans-serif",fontWeight:600,letterSpacing:"1px",textTransform:"uppercase"}}>{c.name}</span>
                  </div>
                ))}
              </div>
              <span className="mob-search-left" style={{cursor:"pointer",display:"flex",alignItems:"center"}} onClick={()=>setSearchOpen(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
            </div>
            {/* Logo */}
            <div onClick={()=>setPage("home")} style={{cursor:"pointer",textAlign:"center",userSelect:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <img
                src="https://khadlaj-perfumes.com/cdn/shop/files/Khadlaj_logo_2026--2_160x.png?v=1773752104"
                alt="Khadlaj Perfumes"
                style={{height:"clamp(60px,7.5vw,90px)",width:"auto",objectFit:"contain",display:"block",maxWidth:240,transition:"transform 0.3s ease"}}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
              />
            </div>
            {/* Right icons */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:24}}>
              <span className="hide-mob" style={{fontSize:"8.5px",letterSpacing:"2.5px",color:"#111",textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:600,transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#B8922A"} onMouseLeave={e=>e.target.style.color="#111"} onClick={()=>setPage("contact")}>Sign Up</span>
              <span className="hide-mob" style={{cursor:"pointer",display:"flex",alignItems:"center",transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"} onClick={()=>setSearchOpen(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <div onClick={()=>setPage("collections")} style={{position:"relative",cursor:"pointer",transition:"transform .2s ease"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                {cartCount>0 && (
                  <span style={{position:"absolute",top:-5,right:-7,background:"#B8922A",color:"#fff",borderRadius:"50%",width:14,height:14,fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontFamily:"'Montserrat',sans-serif"}}>{cartCount}</span>
                )}
              </div>
              {/* Hamburger — mobile only */}
              <button
                onClick={()=>setMobileMenuOpen(o=>!o)}
                style={{display:"none",background:"none",border:"none",cursor:"pointer",padding:"4px",flexDirection:"column",gap:5,justifyContent:"center",alignItems:"center"}}
                className="mob-burger"
                aria-label="Menu"
              >
                <span style={{display:"block",width:20,height:1.5,background:"#000",transition:"all .25s"}}/>
                <span style={{display:"block",width:20,height:1.5,background:"#000",transition:"all .25s"}}/>
                <span style={{display:"block",width:14,height:1.5,background:"#000",transition:"all .25s"}}/>
              </button>
            </div>
          </div>
          <div className="hide-mob" style={{display:"flex",justifyContent:"center",gap:40,paddingBottom:16,fontSize:"12px",letterSpacing:"1.5px",textTransform:"uppercase",color:"#111",fontFamily:"'Montserrat',sans-serif",fontWeight:600}}>
            {[["Offers","collections"],["Bestsellers","collections"],["New In","collections"],["Gifts","gifts"],["Perfume","collections"],["Our Story","story"],["Contact","contact"]].map(([label,pg])=>(
              <span key={label} onClick={()=>setPage(pg)} style={{cursor:"pointer",paddingBottom:4,borderBottom:page===pg?"1px solid #B8922A":"1px solid transparent",color:page===pg?"#B8922A":"#111",transition:"all .25s ease"}}
                onMouseEnter={e=>{e.currentTarget.style.color="#B8922A";e.currentTarget.style.borderBottomColor="#B8922A";}}
                onMouseLeave={e=>{e.currentTarget.style.color=page===pg?"#B8922A":"#111";e.currentTarget.style.borderBottomColor=page===pg?"#B8922A":"transparent";}}
              >{label}</span>
            ))}
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileMenuOpen && (
          <div style={{
            background:"#fff",
            borderTop:"1px solid #E0E0E0",
            padding:"8px 0 20px",
            position:"absolute",top:"100%",left:0,right:0,
            zIndex:200,
            boxShadow:"0 8px 32px rgba(0,0,0,.12)",
          }}>
            {[["Offers","collections"],["Bestsellers","collections"],["New In","collections"],["Gift Sets","gifts"],["All Fragrances","collections"],["Our Story","story"],["Contact","contact"]].map(([label,pg])=>(
              <div
                key={label}
                onClick={()=>{setPage(pg);setMobileMenuOpen(false);}}
                style={{
                  padding:"14px 6%",
                  fontSize:11,letterSpacing:2.5,
                  textTransform:"uppercase",
                  color:"#000",cursor:"pointer",
                  fontFamily:"'Montserrat',sans-serif",
                  borderBottom:"1px solid #F0EBE3",
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                }}
              >
                {label}
                <span style={{color:"#B8922A",fontSize:12}}>→</span>
              </div>
            ))}
            <div style={{padding:"14px 6% 0",display:"flex",gap:12,flexWrap:"wrap"}}>
              {[["Instagram","https://www.instagram.com/khadlajperfumes"],["TikTok",SOCIAL_LINKS.tiktok]].map(([s,href])=>(
                <a key={s} href={href} target="_blank" rel="noreferrer"
                  style={{fontSize:9,letterSpacing:2,color:"#888",border:"1px solid #E0E0E0",padding:"7px 14px",textDecoration:"none",fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase"}}>
                  {s}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <style>{`.mob-burger{display:none!important;}@media(max-width:900px){.mob-burger{display:flex!important;}.mob-search-left{display:inline-block!important;}}@media(min-width:901px){.mob-search-left{display:none!important;}}`}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function Footer({ setPage }){
  return (
    <footer style={{background:"#fff",borderTop:"1px solid #E8E4DC"}}>
      {/* Newsletter */}
      <div style={{background:"#0a0a0a",padding:"80px 5%",textAlign:"center",borderBottom:"1px solid rgba(184,146,42,0.2)"}}>
        <div style={{width:32,height:1,background:"#B8922A",margin:"0 auto 20px"}}/>
        <p style={{fontSize:9,letterSpacing:5,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:16,fontWeight:600}}>Stay Inspired</p>
        <h2 className="disp" style={{fontSize:"clamp(28px,3.5vw,46px)",fontWeight:300,marginBottom:14,color:"#fff",letterSpacing:"-0.5px"}}>Join the Khadlaj Circle</h2>
        <p style={{color:"rgba(255,255,255,.5)",fontSize:13,marginBottom:36,fontFamily:"'Montserrat',sans-serif",maxWidth:400,margin:"0 auto 36px",lineHeight:1.7}}>New launches, exclusive offers, and fragrance stories — direct to your inbox.</p>
        <div style={{display:"flex",gap:0,maxWidth:420,margin:"0 auto",justifyContent:"center"}}>
          <input type="email" placeholder="Your email address"
            style={{flex:1,background:"transparent",border:"1px solid rgba(255,255,255,.20)",borderRight:"none",color:"#fff",padding:"14px 20px",fontSize:12,outline:"none",fontFamily:"'Montserrat',sans-serif",letterSpacing:.5,transition:"border-color .3s"}}
            onFocus={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.4)"}
            onBlur={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.2)"}
          />
          <button style={{background:"#B8922A",border:"none",color:"#fff",padding:"14px 32px",fontSize:9,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:600,whiteSpace:"nowrap",transition:"background .3s"}}
            onMouseEnter={e=>e.currentTarget.style.background="#C9A84C"}
            onMouseLeave={e=>e.currentTarget.style.background="#B8922A"}
          >Subscribe</button>
        </div>
      </div>

      {/* Links */}
      <div style={{background:"#FAF9F6",padding:"80px 6% 48px",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:48,borderTop:"1px solid #f0f0f0"}} className="grid-3">
        <div>
          <img
            src="https://khadlaj-perfumes.com/cdn/shop/files/Khadlaj_logo_2026--2_160x.png?v=1773752104"
            alt="Khadlaj Perfumes"
            style={{height:84,width:"auto",objectFit:"contain",display:"block",marginBottom:24}}
          />
          <p style={{fontSize:"8px",letterSpacing:3.5,color:"#B8922A",fontFamily:"'Montserrat',sans-serif",marginBottom:16,textTransform:"uppercase",fontWeight:700}}>Perfumes · UAE · Est. 1997</p>
          <p style={{fontSize:13,color:"#555",lineHeight:1.85,maxWidth:260,marginBottom:32,fontFamily:"'Montserrat',sans-serif"}}>Family-owned UAE perfume house. Authentic Arabian &amp; French fragrance artistry since 1997.</p>
          
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {COUNTRIES.map(c=>(
              <div key={c.name} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",border:"1px solid #e5e5e5",background:"#fff",cursor:"pointer",transition:"all .2s ease"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#000";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#e5e5e5";}}
              >
                {c.flagUrl === "global" ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:"#222"}}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                ) : (
                  <img src={c.flagUrl} alt="" style={{width:16,height:11,objectFit:"cover",borderRadius:1}} />
                )}
                <span style={{fontSize:9,color:"#222",fontFamily:"'Montserrat',sans-serif",fontWeight:600}}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={{fontSize:"8.5px",letterSpacing:2.5,color:"#000",textTransform:"uppercase",marginBottom:24,fontFamily:"'Montserrat',sans-serif",fontWeight:700}}>Collections</p>
          {["Atyaab","Lafede","Master Perfumery","Gift Sets","New Arrivals","Best Sellers"].map(l=>(
            <p key={l} onClick={()=>setPage("collections")} style={{fontSize:12,color:"#555",marginBottom:14,cursor:"pointer",fontFamily:"'Montserrat',sans-serif",letterSpacing:.5,transition:"all .25s ease"}}
              onMouseEnter={e=>e.target.style.color="#B8922A"} onMouseLeave={e=>e.target.style.color="#555"}>{l}</p>
          ))}
        </div>
        <div>
          <p style={{fontSize:"8.5px",letterSpacing:2.5,color:"#000",textTransform:"uppercase",marginBottom:24,fontFamily:"'Montserrat',sans-serif",fontWeight:700}}>Company</p>
          {[["Our Story","story"],["Contact Us","contact"],["Find a Store","contact"],["Careers","contact"],["Press","contact"]].map(([l,pg])=>(
            <p key={l} onClick={()=>setPage(pg)} style={{fontSize:12,color:"#555",marginBottom:14,cursor:"pointer",fontFamily:"'Montserrat',sans-serif",letterSpacing:.5,transition:"all .25s ease"}}
              onMouseEnter={e=>e.target.style.color="#B8922A"} onMouseLeave={e=>e.target.style.color="#555"}>{l}</p>
          ))}
        </div>
        <div>
          <p style={{fontSize:"8.5px",letterSpacing:2.5,color:"#000",textTransform:"uppercase",marginBottom:24,fontFamily:"'Montserrat',sans-serif",fontWeight:700}}>Support</p>
          {["Shipping & Returns","FAQ","Track My Order","Fragrance Guide","Gift Wrapping"].map(l=>(
            <p key={l} style={{fontSize:12,color:"#555",marginBottom:14,cursor:"pointer",fontFamily:"'Montserrat',sans-serif",letterSpacing:.5,transition:"all .25s ease"}}
              onMouseEnter={e=>e.target.style.color="#B8922A"} onMouseLeave={e=>e.target.style.color="#555"}>{l}</p>
          ))}
          <div style={{marginTop:32,paddingTop:24,borderTop:"1px solid #e5e5e5"}}>
            <p style={{fontSize:"8px",letterSpacing:2.5,color:"#000",textTransform:"uppercase",marginBottom:14,fontFamily:"'Montserrat',sans-serif",fontWeight:700}}>Ships With</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {["DHL","Aramex","EMX"].map(s=>(
                <span key={s} style={{border:"1px solid #e5e5e5",padding:"4px 12px",fontSize:9,color:"#444",fontFamily:"'Montserrat',sans-serif",letterSpacing:1,background:"#fff",borderRadius:1}}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{background:"#fff",borderTop:"1px solid #E8E4DC",padding:"20px 5%",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12,fontSize:9,color:"#888",letterSpacing:1.5,fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase"}}>
        <p>© 2025 Khadlaj Perfumes LLC. All rights reserved. UAE.</p>
        <div style={{display:"flex",gap:24}}>
          {["Privacy Policy","Terms of Use","Cookie Settings"].map(l=>(
            <span key={l} style={{cursor:"pointer",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#B8922A"} onMouseLeave={e=>e.target.style.color="#888"}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
/* ═══════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════ */
export default function App(){
  const [page, setPage] = useState("home");
  const [cartCount, setCartCount] = useState(0);
  const [viewProduct, setViewProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupEmail, setPopupEmail] = useState("");
  const [popupDone, setPopupDone] = useState(false);

  const addToCart = () => setCartCount(c=>c+1);

  useEffect(()=>{
    const t = setTimeout(()=>setShowPopup(true), 6000);
    return ()=>clearTimeout(t);
  },[]);

  useEffect(()=>{ window.scrollTo({top:0,behavior:"smooth"}); },[page]);

  const renderPage = () => {
    switch(page){
      case "home":        return <HomePage setPage={setPage} addToCart={addToCart} setViewProduct={setViewProduct}/>;
      case "collections": return <CollectionsPage addToCart={addToCart} setViewProduct={setViewProduct} setPage={setPage}/>;
      case "product":     return viewProduct ? <ProductPage product={viewProduct} addToCart={addToCart} setPage={setPage} setViewProduct={setViewProduct}/> : <CollectionsPage addToCart={addToCart} setViewProduct={setViewProduct} setPage={setPage}/>;
      case "gifts":       return <GiftsPage addToCart={addToCart} setViewProduct={setViewProduct} setPage={setPage}/>;
      case "story":       return <StoryPage/>;
      case "contact":     return <ContactPage/>;
      default:            return <HomePage setPage={setPage} addToCart={addToCart} setViewProduct={setViewProduct}/>;
    }
  };

  return (
    <div style={{fontFamily:"'Montserrat',sans-serif",background:"#fff",color:"#000",minHeight:"100vh",overflowX:"hidden"}}>
      <style>{GLOBAL_CSS}</style>
      <Navbar page={page} setPage={setPage} cartCount={cartCount}/>
      <main>{renderPage()}</main>
      <Footer setPage={setPage}/>

      {/* ── Floating Shop button ── */}
      {page==="home" && (
        <button
          className="pulse"
          onClick={()=>setPage("collections")}
          style={{
            position:"fixed",bottom:32,right:32,zIndex:200,
            background:"#000",color:"#fff",
            width:58,height:58,borderRadius:"50%",
            border:"none",cursor:"pointer",
            boxShadow:"0 8px 28px rgba(0,0,0,.25)",
            fontSize:22,transition:"background .2s,transform .2s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.background="#B8922A";e.currentTarget.style.transform="scale(1.12)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="#000";e.currentTarget.style.transform="scale(1)";}}
          title="Shop Now"
        >🛍</button>
      )}

      {/* ── Newsletter Popup ── */}
      {showPopup && !popupDone && (
        <div
          style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.6)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}
          onClick={()=>setShowPopup(false)}
        >
          <div
            className="popup-in"
            onClick={e=>e.stopPropagation()}
            style={{
              background:"#fff",maxWidth:520,width:"100%",
              display:"grid",gridTemplateColumns:"1fr 1fr",
              overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,.3)",
              position:"relative",
            }}
          >
            <button onClick={()=>setShowPopup(false)} style={{position:"absolute",top:14,right:14,background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#000",zIndex:1,lineHeight:1,fontWeight:300}}>×</button>
            {/* Left image */}
            <div style={{position:"relative",minHeight:340,overflow:"hidden"}}>
              <img src="https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy1.jpg?v=1767169755" alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.35)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:24}}>
                <p className="shimmer-text" style={{fontSize:30,fontFamily:"'Cinzel',serif",fontWeight:300,lineHeight:1.1}}>10% Off<br/>First Order</p>
              </div>
            </div>
            {/* Right form */}
            <div style={{padding:"40px 28px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div style={{width:28,height:1,background:"#B8922A",marginBottom:16}}/>
              <p style={{fontSize:9,letterSpacing:4,color:"#B8922A",textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",marginBottom:12}}>Welcome</p>
              <h3 className="disp" style={{fontSize:24,fontWeight:300,color:"#000",marginBottom:10,lineHeight:1.15,letterSpacing:-.5}}>Join the Khadlaj Circle</h3>
              <p style={{fontSize:12,color:"#888",lineHeight:1.7,fontFamily:"'Montserrat',sans-serif",marginBottom:24}}>Subscribe &amp; get <strong style={{color:"#000"}}>10% off</strong> your first order plus early access to new launches.</p>
              <input type="email" placeholder="Your email address" value={popupEmail} onChange={e=>setPopupEmail(e.target.value)}
                style={{width:"100%",border:"none",borderBottom:"1px solid #000",padding:"10px 0",fontSize:13,outline:"none",fontFamily:"'Montserrat',sans-serif",marginBottom:16,background:"transparent"}}/>
              <button
                onClick={()=>{setPopupDone(true);setShowPopup(false);}}
                style={{width:"100%",background:"#000",color:"#fff",border:"none",padding:"14px",fontSize:10,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:600,transition:"background .2s"}}
                onMouseEnter={e=>e.currentTarget.style.background="#B8922A"}
                onMouseLeave={e=>e.currentTarget.style.background="#000"}
              >Claim 10% Off</button>
              <p onClick={()=>setShowPopup(false)} style={{fontSize:11,color:"#bbb",textAlign:"center",marginTop:12,cursor:"pointer",fontFamily:"'Montserrat',sans-serif",textDecoration:"underline"}}>No thanks</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}






