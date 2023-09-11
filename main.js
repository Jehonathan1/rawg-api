import express from 'express';

const app = express();

// ---------------------------------------------------------------------------------------------------------------------------------------------------
const newsData = {
  en: {
    normal: [
    "Likud rejects Board of Deputies of British Jews' criticism of Smotrich visit", 
    "Covid in Israel: 36,835 new cases, 1,123 serious cases", 
    "Russian Olympic skater Valieva tested positive for banned drug - reports", 
    "BIDEN 'PROFOUNDLY DISAPPOINTED' BY US SENATE'S FAILURE TO ADVANCE VOTING RIGHTS", 
    "VALNEVA SAYS EARLY STUDIES SHOW COVID-19 VACCINE EFFECTIVE AGAINST OMICRON"
  ],
    breaking: [
    "UK's Prince William makes climate-focused visit to United Arab Emirates", 
    "US envoy John Kerry presses Mexico on climate, energy reforms", 
    "Unilever annual profit climbs to nearly $7 billion", 
    "TELENOR PARTNERS WITH AMAZON TO MODERNIZE SYSTEMS, OFFER SERVICES", 
    "TWO RUSSIAN COSMONAUTS TAKE SEVEN-HOUR SPACEWALK"
    ]
  },
  fr: {
    normal: [
    "L'Irak doit encore 1,6 milliard de dollars à l'Iran pour ses importations de gaz", 
    "Moins de la moitié de la population mondiale a vécu en démocratie en 2021 (étude)", 
    "Israël: le directeur du ministère des AE s'est rendu en Turquie pour préparer une éventuelle rencontre Erdogan-Herzog", 
    "France : La police disperse les convois anti-pass sur les Champs-Élysées", 
    "Mobilisation contre les mesures sanitaires en France: 32.100 manifestants dont près de 7.600 à Paris"],
    breaking: [
    "Moins de la moitié de la population mondiale a vécu en démocratie en 2021 (étude)", 
    "Royaume-Uni: 2.255 incidents antisémites ont été recensés en 2021", 
    "Israël/Coronavirus: le nombre de cas graves continue de baisser", 
    "La marine russe dit avoir chassé un sous-marin américain de ses eaux, Washington dément", 
    "Le secrétaire général de l'OCDE en visite en Israël cette semaine"
    ]
  },
  he: {
    normal: [
      'משרד הביטחון הרוסי: יירטנו שני מל"טים אוקראינים בשמי מחוז בלגורוד, אין נפגעים',
      'דיווחים בג\'נין: חילופי אש עם צה"ל בעיר, ככל הנראה במהלך מעצר מבוקש',
      'ראש האופוזיציה לפיד מגיב לאייכלר: "בשל קדושת זכרם של קורבנות השואה מציע לכולם להתעלם מדבריו"',
      'חשד לרצח: גבר בן 59 נורה למוות באזור התעשייה בעכו',
      'בלשכת נתניהו הגיבו על הודעת בן גביר: "ההחלטה בענייני אסירים ביטחוניים תתקבל רק על ידי רה"מ והקבינט"'
    ],
    breaking: [
      'ראש הממשלה נתניהו ייפגש בסן פרנסיסקו עם איש העסקים אילון מאסק',
      'שר הבריאות משה ארבל הציע למקבילו המרוקאי סיוע בצוותי רפואה ובציוד רפואי בצל אסון רעידת האדמה',
      'נבחרת קנדה ניצחה את ארצות הברית 118:127 במשחק על המקום השלישי באליפות העולם בכדורסל',
      'תל אביב: בן 30 נפצע בינוני בתקרית אלימה ברחוב נווה שאנן בעיר',
      'נשיא טורקיה ארדואן ונשיא מצרים א-סיסי נפגשו בשולי פסגת ה-G20 - פגישת עבודה מדינית ראשונה מזה כעשור'
    ]
  },
  ar: {
    normal: [
    "البيت الأبيض: استمرار أنشطة إيران النووية سيجعل مع المستحيل العودة إلى الاتفاق النووي معها", 
    "لافروف: التهديدات والانذارات بشأن أوكرانيا لا تؤدي إلى أي نتيجة", 
    "رئيس الوزراء الليبي عبد الحميد الدبيبة ينجو من محاولة اغتيال", 
    "العثور على جثة أحد الطيارَين اليابانيين المفقودَين منذ الشهر الماضي", 
    "الأزمة الأوكرانية: أكثر من 12 دولة دعت مواطنيها إلى مغادرة اوكرانيا"
    ],
    breaking: [
    "ماكرون أبلغ بايدن بمضمون مشاوراته مع الرئيسين الروسي والأوكراني", 
    "ماكرون أبلغ بايدن بمضمون مشاوراته مع الرئيسين الروسي والأوكراني", 
    "قائد الجيش الألماني ينهي الأربعاء زيارة لإسرائيل", 
    "روسيا تعلن طرد غواصة أميركية من مياهها في المحيط الهادئ وواشنطن تنفي", 
    "الرئيس الألماني فرانك شتاينماير يستعد لإعادة انتخابه الأحد لولاية ثانية متتالية"
  ]
  },
}
// Generate XML for each news item
const generateXML = (lang, status) => {
  let data = '<rss xmlns:media="http://search.luppo.com/fake/" xmlns:dc="http://live.org/elements/5.6/" version="2.0">';
  data += '<channel><title>Fake News - xmlNews</title><link/>';
  
  const newsList = newsData[lang]?.[status] || [];
  
  for (const feed of newsList) {
    data += `<item>
      <description>&lt;fakeapi name="${lang}_${status}"/&gt;</description>
      <title><![CDATA[ ${feed.toUpperCase()} ]]></title>
      <link/>
      <pubDate>Thu, 20 Jan 2022 10:26:00 GMT</pubDate>
    </item>`;
  }
  
  data += '</channel></rss>';
  return data;
};

// All News
app.get('/fakeapi/:lang/:status', (req, res) => {
  const { lang, status } = req.params;
  
  if (!newsData[lang] || !newsData[lang][status]) {
    res.status(400).send('Invalid language or status');
    return;
  }

  const data = generateXML(lang, status);
  res.header("Content-Type", "text/xml");
  res.status(200).send(data);
});

// Run app
const port = 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});