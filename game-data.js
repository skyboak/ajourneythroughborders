// ============================================
// GAME DATA - Hejaz Railway Educational Game
// עודכן עם שמות קבצי המוזיקה הנכונים
// ============================================

// Original design resolution for position coordinates
// The positions were defined for this image size
const DESIGN_WIDTH = 1050;
const DESIGN_HEIGHT = 600;

const GAME_DATA = {
    stages: {
        saudi: {
            name: {
                he: 'ערב הסעודית',
                en: 'Saudi Arabia',
                ar: 'المملكة العربية السعودية'
            },
            image: 'saudi.jpg',
            music: 'ערב_הסעודית_מוזיקה.mp3',
            items: [
                {
                    id: 'sword_dance',
                    name: {
                        he: 'ריקוד החרבות',
                        en: 'The Sword Dance',
                        ar: 'رقصة السيوف'
                    },
                    description: {
                        he: 'ריקוד החרבות, הידוע בשם "ערדה", הוא ריקוד מסורתי מרהיב וגאה המבוצע בערב הסעודית במהלך חגיגות ואירועים חשובים. הריקוד, שמקורו בזמנים עתיקים כטקס לפני קרב, הפך לביטוי תרבותי של אומץ, גאווה ואחדות. הרקדנים, הלבושים בבגדים לבנים מסורתיים, עומדים בשורות ומניפים חרבות בתנועות מתואמות ומדויקות, תוך ביצוע תנועות קפיצה וריקוד קצביות. הריקוד מלווה בתיפוף עוצמתי ובשירה מסורתית, היוצרים אווירה חגיגית ומרגשת. בראש השורה עומד בדרך כלל מנהיג או אורח מכובד, המחזיק דגל ומוביל את הריקוד. הערדה מבטאת את הגאווה הלאומית והמורשת ההיסטורית של ערב הסעודית.',
                        en: 'The sword dance, known as "Ardah," is a spectacular and proud traditional dance performed in Saudi Arabia during celebrations and important events. The dance, which originated in ancient times as a pre-battle ritual, has become a cultural expression of courage, pride, and unity. The dancers, dressed in traditional white clothing, stand in rows and wave swords in synchronized and precise movements, while performing rhythmic jumping and dancing motions. The dance is accompanied by powerful drumming and traditional singing, creating a festive and exhilarating atmosphere. At the head of the line usually stands a leader or honored guest, holding a flag and leading the dance. The Ardah embodies the national pride and historical heritage of Saudi Arabia.',
                        ar: 'رقصة السيوف، المعروفة باسم "العرضة"، هي رقصة تقليدية مهيبة وفخورة تُؤدّى في المملكة العربية السعودية خلال الاحتفالات والمناسبات المهمة. الرقصة، التي نشأت في العصور القديمة كطقس قبل المعركة، أصبحت تعبيرًا ثقافيًا عن الشجاعة والفخر والوحدة. الراقصون، الذين يرتدون ملابس بيضاء تقليدية، يقفون في صفوف ويلوّحون بالسيوف بحركات متناسقة ودقيقة، مع أداء حركات قفز ورقص إيقاعية. تُصاحب الرقصة قرع طبول قوي وغناء تقليدي، ممّا يخلق أجواءً احتفالية ومثيرة. في مقدمة الصف يقف عادةً قائد أو ضيف مُكرَّم، يحمل راية ويقود الرقصة. العرضة تُعبّر عن الفخر الوطني والتراث التاريخي للمملكة العربية السعودية.'
                    },
                    image: 'ריקוד_החרבות.jpg',
                    position: {
                        x: 12,
                        y: 106,
                        w: 102,
                        h: 75
                    }
                },
                {
                    id: 'camel_racing',
                    name: {
                        he: 'מרוצי גמלים',
                        en: 'Camel Racing',
                        ar: 'سباقات الهجن'
                    },
                    description: {
                        he: 'מרוצי גמלים הם ספורט מסורתי ומרגש בערב הסעודית, המשלב את העבר ההיסטורי עם ההווה המודרני. במשך מאות שנים, הגמלים היו חלק חשוב מחיי המדבר והבדואים, ושימשו להובלה, למסחר ולמלחמה. כיום, מרוצי גמלים הפכו לאירוע לאומי גדול שמושך אלפי צופים ומשתתפים מכל רחבי הארץ. הגמלים רצים במהירויות מרשימות על מסלולים מדבריים, ובעליהם מטפלים בהם בקפידה ומאמנים אותם כמו ספורטאים אמיתיים. המרוצים כוללים פרסים גדולים והם חגיגה של המורשת התרבותית הסעודית, כאשר משפחות שלמות מגיעות לצפות, לעודד ולחגוג יחד. זוהי דרך מיוחדת שבה ערב הסעודית שומרת על המסורות שלה ומכבדת את הקשר ההיסטורי שלה עם המדבר והגמלים.',
                        en: 'Camel racing is a traditional and thrilling sport in Saudi Arabia, blending the historical past with the modern present. For hundreds of years, camels were an essential part of desert and Bedouin life, used for transportation, trade, and warfare. Today, camel racing has become a major national event that attracts thousands of spectators and participants from across the country. The camels run at impressive speeds on desert tracks, and their owners care for them and train them like professional athletes. The races feature large prizes and are a celebration of Saudi cultural heritage, with entire families come to watch, cheer, and celebrate together. This is a special way in which Saudi Arabia preserves its traditions and honors its historical connection to the desert and camels.',
                        ar: 'سباقات الهجن هي رياضة تقليدية ومثيرة في المملكة العربية السعودية، تجمع بين الماضي التاريخي والحاضر الحديث. على مدى مئات السنين، كانت الإبل جزءًا مهمًا من حياة الصحراء والبدو، واستُخدمت للنقل والتجارة والحرب. اليوم، أصبحت سباقات الهجن حدثًا وطنيًا كبيرًا يجذب آلاف المتفرجين والمشاركين من جميع أنحاء البلاد. تركض الإبل بسرعات مذهلة على مضامير صحراوية، ويعتني أصحابها بها بعناية فائقة ويدرّبونها كرياضيين حقيقيين. تشمل السباقات جوائز كبيرة وهي احتفال بالتراث الثقافي السعودي، حيث تأتي عائلات بأكملها للمشاهدة والتشجيع والاحتفال معًا. هذه طريقة مميزة تحافظ بها المملكة العربية السعودية على تقاليدها وتُكرّم ارتباطها التاريخي بالصحراء والإبل.'
                    },
                    image: 'מירוצי_גמלים.jpg',
                    position: {
                        x: 650,
                        y: 222,
                        w: 382,
                        h: 87
                    }
                },
                {
                    id: 'saudi_coffee',
                    name: {
                        he: 'קפה מסורתי',
                        en: 'Traditional Coffee',
                        ar: 'القهوة التقليدية'
                    },
                    description: {
                        he: 'הקפה הסעודי המסורתי הוא הרבה יותר ממשקה – הוא סמל של הכנסת אורחים, כבוד וידידות בתרבות הסעודית. הקפה, הנקרא "קהווה", מוכן בצורה מיוחדת עם תבלינים כמו הל, זעפרן וציפורן, ומוגש בכוסות קטנות ומעוטרות הנקראות פינג\'אן. במשך מאות שנים, הגשת קפה לאורחים היא מסורת חשובה המבטאת כבוד וברכת הבית. המארח מחזיק דַלָּה – קנקן מסורתי ארוך עם פיה מעוקלת – וממלא את הפינג\'אנים של האורחים בתנועה אלגנטית. לצד הקפה מוגשים בדרך כלל תמרים מתוקים, המאזנים את הטעם המר של הקפה. טקס הקפה הסעודי אינו רק שתיית משקה, אלא זמן לשיחה, לחיבור חברתי ולחגיגת מסורת עתיקה.',
                        en: 'Traditional Saudi coffee is much more than a beverage – it is a symbol of hospitality, respect, and friendship in Saudi culture. The coffee, called "qahwa," is prepared in a special way with spices such as cardamom, saffron, and cloves, and is served in small, decorated cups called finjan. For hundreds of years, serving coffee to guests has been an important tradition that expresses respect and blessings of the home. The host holds a dallah – a traditional long pot with a curved spout – and fills the guests\' finjans with an elegant motion. Alongside the coffee, sweet dates are usually served, which balance the bitter taste of the coffee. The Saudi coffee ceremony is not just about drinking a beverage, but a time for conversation, social connection, and celebration of an ancient tradition.',
                        ar: 'القهوة السعودية التقليدية هي أكثر بكثير من مجرد مشروب – إنها رمز للضيافة والاحترام والصداقة في الثقافة السعودية. القهوة، التي تُسمّى "قهوة"، تُحضَّر بطريقة خاصة مع توابل مثل الهيل والزعفران والقرنفل، وتُقدَّم في فناجين صغيرة ومزخرفة. على مدى مئات السنين، كانت تقديم القهوة للضيوف تقليدًا مهمًا يُعبّر عن الاحترام وبركة البيت. يحمل المُضيف الدلّة – إبريق تقليدي طويل ذو صنبور منحنٍ – ويملأ فناجين الضيوف بحركة أنيقة. إلى جانب القهوة، تُقدَّم عادةً تمور حلوة تُوازن الطعم المرّ للقهوة. طقس القهوة السعودي ليس مجرد شرب مشروب، بل هو وقت للحديث والتواصل الاجتماعي والاحتفاء بتقليد عريق.'
                    },
                    image: 'קפה_סעודי_מסורתי.jpg',
                    position: {
                        x: 474,
                        y: 70,
                        w: 71,
                        h: 67
                    }
                },
                {
                    id: 'al_nassr',
                    name: {
                        he: 'קבוצת כדורגל אל-נאסר',
                        en: 'Al-Nassr Football Club',
                        ar: 'النصر'
                    },
                    description: {
                        he: 'אל-נאסר הוא אחד ממועדוני הכדורגל הגדולים והמפורסמים ביותר בערב הסעודית, עם היסטוריה עשירה של אליפויות והישגים. המועדון, שנוסד בשנת 1955, מתגאה באוהדים נלהבים שממלאים את האצטדיון בכל משחק בצהוב וכחול, צבעי הקבוצה. בשנת 2023 קרה משהו היסטורי – כריסטיאנו רונאלדו, אחד משחקני הכדורגל הגדולים בכל הזמנים, הצטרף לאל-נאסר! ההתרגשות בערב הסעודית הייתה עצומה – אלפי אוהדים הגיעו לקבל את פניו, והמשחקים שלו מושכים קהל אדיר שרוצה לראות את הכוכב מקרוב. המעבר של רונאלדו שם את הליגה הסעודית על מפת העולם והביא תשומת לב בינלאומית לכדורגל במדינה.',
                        en: 'Al-Nassr is one of the largest and most famous football clubs in Saudi Arabia, with a rich history of championships and achievements. The club, founded in 1955, boasts passionate fans who fill the stadium at every match wearing yellow and blue, the team\'s colors. In 2023, something historic happened – Cristiano Ronaldo, one of the greatest football players of all time, joined Al-Nassr! The excitement in Saudi Arabia was immense – thousands of fans came to welcome him, and his matches drew huge crowds eager to see the star up close. Ronaldo\'s transfer put the Saudi league on the world map and brought international attention to football in the country.',
                        ar: 'النصر هو أحد أكبر وأشهر أندية كرة القدم في المملكة العربية السعودية، ويملك تاريخًا حافلًا بالبطولات والإنجازات. النادي، الذي تأسس عام 1955، يفتخر بجماهير متحمسة تملأ الملعب في كل مباراة بالأصفر والأزرق، ألوان الفريق. في عام 2023 حدث شيء تاريخي – كريستيانو رونالدو، أحد أعظم لاعبي كرة القدم على مرّ العصور، انضمّ إلى النصر! كان الحماس في المملكة العربية السعودية هائلًا – آلاف المشجعين جاؤوا لاستقباله، ومبارياته تجذب جماهير غفيرة تريد رؤية النجم عن قرب. انتقال رونالدو وضع الدوري السعودي على خارطة العالم وجلب اهتمامًا دوليًا بكرة القدم في المملكة.'
                    },
                    image: 'קבוצת_אל_נאסר.jpg',
                    position: {
                        x: 850,
                        y: 385,
                        w: 78,
                        h: 89
                    }
                },
                {
                    id: 'falconry',
                    name: {
                        he: 'ציד בעזרת בז',
                        en: 'Falconry',
                        ar: 'الصيد بالصقور'
                    },
                    description: {
                        he: 'ציד בעזרת בזים הוא אומנות עתיקה ומכובדת מאוד בערב הסעודית, המועברת מדור לדור במשך מאות שנים. הבז הוא עוף דורס מרשים שבעבר היה חיוני לציידי המדבר, ועזר להם לצוד ארנבות וציפורים למאכל. כיום, אילוף וציד עם בזים הפכו לספורט מסורתי ותחביב יוקרתי המבטא מעמד ומומחיות. הבזים יושבים על יד המאלף המוגנת בכפפה מיוחדת, ומאומנים לצאת לציד ולחזור אל המאלף. תהליך האילוף דורש סבלנות רבה וקשר מיוחד בין האדם לציפור. בערב הסעודית מתקיימים תחרויות ופסטיבלים של בזים, המציגים את יופי הציפורים ואת מיומנות הציידים. זהו חלק חשוב מהמורשת התרבותית הסעודית המכבדת את הקשר בין האדם, הטבע והמדבר.',
                        en: 'Falconry is an ancient and highly respected art in Saudi Arabia, passed down from generation to generation for hundreds of years. The falcon is an impressive bird of prey that was once essential to desert hunters, helping them catch rabbits and birds for food. Today, training and hunting with falcons has become a traditional sport and prestigious hobby that signifies high status and expertise. The falcons perch on the trainer\'s hand, protected by a special glove, and are trained to go out hunting and return to their handler. The training process requires great patience and a unique bond between human and bird. In Saudi Arabia, falcon competitions and festivals are held to showcase the beauty of the birds and the skill of the hunters. This is an important part of Saudi cultural heritage that honors the connection between humans, nature, and the desert.',
                        ar: 'الصيد بالصقور هو فنّ عريق ومحترم جدًا في المملكة العربية السعودية، يُتوارث من جيل إلى جيل منذ مئات السنين. الصقر هو طائر جارح مهيب كان في الماضي ضروريًا لصيادي الصحراء، وساعدهم في اصطياد الأرانب والطيور للطعام. اليوم، أصبح ترويض الصقور والصيد بها رياضة تقليدية وهواية راقية تعبّر عن المكانة والخبرة. تجلس الصقور على يد المدرّب المحميّة بقفاز خاص، وتُدرَّب على الخروج للصيد والعودة إلى المدرّب. تتطلب عملية الترويض صبرًا كبيرًا ورابطة خاصة بين الإنسان والطائر. تُقام في المملكة العربية السعودية مسابقات ومهرجانات للصقور، تُبرز جمال الطيور ومهارة الصيادين. هذا جزء مهم من التراث الثقافي السعودي الذي يُكرّم العلاقة بين الإنسان والطبيعة والصحراء.'
                    },
                    image: 'ציד_בעזרת_בז.jpg',
                    position: {
                        x: 248,
                        y: 78,
                        w: 37,
                        h: 61
                    }
                }
            ]
        },
        jordan: {
            name: {
                he: 'ירדן',
                en: 'Jordan',
                ar: 'الأردن'
            },
            image: 'Jorden.jpg',
            music: 'ירדן_מוזיקה.mp3',
            items: [
                {
                    id: 'petra',
                    name: {
                        he: 'פטרה',
                        en: 'Petra',
                        ar: 'البتراء'
                    },
                    description: {
                        he: 'פטרה היא אחד הסמלים האיקוניים והמוכרים ביותר של ירדן ושל המורשת ההיסטורית העשירה שלה. העיר העתיקה, שנחצבה בצוקי אבן חול ורודה לפני יותר מאלפיים שנה, נבנתה על ידי הנבטים ושימשה כמרכז חשוב למסחר ותרבות. האדריכלות הייחודית החצובה בסלע, המעברים הנסתרים והחזיתות המונומנטליות של פטרה משקפים יצירתיות אנושית, מיומנות הנדסית וקשר עמוק לנוף הטבעי. כיום, פטרה עומדת כסמל לעומק ההיסטורי של ירדן, לגאווה התרבותית ולמסורת הארוכה שלה כנקודת מפגש בין תרבויות שונות.',
                        en: 'Petra is one of the most iconic and recognizable symbols of Jordan and its rich historical heritage. The ancient city, carved into pink sandstone cliffs over two thousand years ago, was built by the Nabataeans and served as an important center for trade and culture. Petra\'s unique rock-cut architecture, hidden passages, and monumental façades reflect human creativity, engineering skills, and a deep connection to the natural landscape. Today, Petra stands as a symbol of Jordan\'s historical depth, cultural pride, and its long tradition as a meeting point between different civilizations.',
                        ar: 'البتراء هي أحد أكثر الرموز شهرةً وتميّزًا في الأردن وتراثها التاريخي الغني. المدينة القديمة، التي نُحتت في صخور الحجر الرملي الوردي قبل أكثر من ألفي عام، بناها الأنباط وكانت مركزًا مهمًا للتجارة والثقافة. العمارة الفريدة المنحوتة في الصخر والممرات الخفية والواجهات الضخمة في البتراء تعكس الإبداع البشري والمهارة الهندسية والارتباط العميق بالمشهد الطبيعي. اليوم، تقف البتراء رمزًا للعمق التاريخي للأردن والفخر الثقافي وتقاليدها العريقة كنقطة التقاء بين حضارات مختلفة.'
                    },
                    image: 'פטרה.jpg',
                    position: {
                        x: 470,
                        y: 10,
                        w: 222,
                        h: 137
                    }
                },
                {
                    id: 'ram_jordani',
                    name: {
                        he: 'ראם',
                        en: 'Arabian Oryx',
                        ar: 'المها العربي'
                    },
                    description: {
                        he: 'הראם הערבי הוא סמל עוצמתי של נוף המדבר וחיות הבר של ירדן. הראם, שהיה פעם בסכנת הכחדה, הפך לסמל של שימור והתחדשות באזור. עם פרוותו הלבנה וקרניו הארוכות והישרות, הוא מותאם היטב לחיי המדבר ולתנאים קיצוניים. הראם מייצג כוח, סיבולת ויכולת לשרוד ולשגשג בסביבות קשות, ומשקף את הקשר העמוק בין הטבע לתרבות בירדן.',
                        en: 'The Arabian oryx is a powerful symbol of Jordan\'s desert landscape and wildlife. Once endangered, the oryx has become a symbol of conservation and renewal in the region. With its white coat and long, straight horns, it is well adapted to desert life and extreme conditions. The oryx represents strength, endurance, and the ability to survive and thrive in harsh environments, reflecting the deep connection between nature and culture in Jordan.',
                        ar: 'المها العربي هو رمز قوي لمشهد الصحراء والحياة البرية في الأردن. المها، الذي كان يومًا ما مهدّدًا بالانقراض، أصبح رمزًا للحفاظ على البيئة والتجدّد في المنطقة. بفرائه الأبيض وقرونه الطويلة والمستقيمة، يتكيّف جيدًا مع حياة الصحراء والظروف القاسية. يُمثّل المها القوة والتحمل والقدرة على البقاء والازدهار في البيئات القاسية، ويعكس العلاقة العميقة بين الطبيعة والثقافة في الأردن.'
                    },
                    image: 'ראם_ירדני.jpg',
                    position: {
                        x: 312,
                        y: 94,
                        w: 71,
                        h: 71
                    }
                },
                {
                    id: 'olive_press',
                    name: {
                        he: 'בתי בד',
                        en: 'Olive Presses',
                        ar: 'معاصر الزيتون'
                    },
                    description: {
                        he: 'בתי הבד בירדן הם סמל חזק לחיים מסורתיים, חקלאות וחיי קהילה. במשך מאות שנים, ייצור שמן זית היה חלק חיוני מהתרבות המקומית, הכלכלה והמטבח. תהליך כבישת הזיתים היה לעתים קרובות פעילות קהילתית, שהפגישה משפחות וכפרים בעונת הקטיף. בית הבד מייצג המשכיות, עבודה משותפת וקשר עמוק בין האנשים לאדמה.',
                        en: 'Olive presses in Jordan are a powerful symbol of traditional life, agriculture, and community. For hundreds of years, olive oil production has been a vital part of local culture, economy, and cuisine. The process of pressing olives was often a communal activity, bringing families and villages together during the harvest season. The olive press represents continuity, shared labor, and a deep connection between people and the land.',
                        ar: 'معاصر الزيتون في الأردن هي رمز قوي للحياة التقليدية والزراعة والحياة المجتمعية. على مدى مئات السنين، كان إنتاج زيت الزيتون جزءًا حيويًا من الثقافة المحلية والاقتصاد والمطبخ. كانت عملية عصر الزيتون في كثير من الأحيان نشاطًا جماعيًا يجمع العائلات والقرى في موسم القطاف. تُمثّل معصرة الزيتون الاستمرارية والعمل المشترك والارتباط العميق بين الناس والأرض.'
                    },
                    image: 'מסק_זיתים.jpg',
                    position: {
                        x: 178,
                        y: 120,
                        w: 76,
                        h: 94
                    }
                },
                {
                    id: 'national_bird',
                    name: {
                        he: 'ורדית',
                        en: 'Rosefinch',
                        ar: 'العصفور الوردي'
                    },
                    description: {
                        he: 'הורדית היא ציפור קטנה וצבעונית הנמצאת בחלקים מהמזרח התיכון, כולל ירדן. הורדית, הידועה בגווני הוורוד והאדום הרכים שלה, מוסיפה צבע וחיים לסביבה הטבעית. כציפור נודדת, היא מסמלת תנועה, חיבור בין אזורים ואת עולם הטבע המשותף החוצה גבולות. הורדית מייצגת את הרעיון שהטבע קיים מעבר לגבולות שיצר האדם.',
                        en: 'The rosefinch is a small and colorful bird found in parts of the Middle East, including Jordan. Known for its soft pink and red tones, the rosefinch adds color and life to the natural environment. As a migratory bird, it symbolizes movement, connection between regions, and the shared natural world that crosses borders. The rosefinch represents the idea that nature exists beyond the boundaries created by humans.',
                        ar: 'العصفور الوردي هو طائر صغير وملوّن يوجد في أجزاء من الشرق الأوسط، بما في ذلك الأردن. يُعرف العصفور الوردي بدرجات اللون الوردي والأحمر الناعمة، ويُضيف لونًا وحياةً للبيئة الطبيعية. كطائر مهاجر، يرمز إلى الحركة والترابط بين المناطق وعالم الطبيعة المشترك الذي يعبر الحدود. يُمثّل العصفور الوردي فكرة أن الطبيعة موجودة بعيدًا عن الحدود التي صنعها الإنسان.'
                    },
                    image: 'הציפור_הלאומית.jpg',
                    position: {
                        x: 332,
                        y: 191,
                        w: 47,
                        h: 94
                    }
                },
                {
                    id: 'black_iris',
                    name: {
                        he: 'אירוס שחור',
                        en: 'Black Iris',
                        ar: 'السوسنة السوداء'
                    },
                    description: {
                        he: 'האירוס השחור הוא הפרח הלאומי של ירדן ואחד מסמלי הטבע הייחודיים ביותר של המדינה. הפרח הנדיר והמרשים הזה פורח באביב וגדל בעיקר בגבעות ובשולי המדבר של ירדן. צבעו הכהה והעמוק גורם לו לבלוט בין פרחי בר אחרים והפך אותו לסמל של מסתורין, חוסן ויופי טבעי. האירוס השחור משקף את העושר והייחודיות של הנוף הטבעי של ירדן.',
                        en: 'The black iris is the national flower of Jordan and one of the country\'s most unique natural symbols. This rare and striking flower blooms in spring and grows mainly in the hills and desert edges of Jordan. Its deep, dark color makes it stand out among other wildflowers and has turned it into a symbol of mystery, resilience, and natural beauty. The black iris reflects the richness and uniqueness of Jordan\'s natural landscape.',
                        ar: 'السوسنة السوداء هي الزهرة الوطنية للأردن وأحد أكثر رموز الطبيعة تميّزًا في البلاد. هذه الزهرة النادرة والمذهلة تتفتّح في الربيع وتنمو بشكل رئيسي في التلال وأطراف الصحراء في الأردن. لونها الداكن والعميق يجعلها تبرز بين الزهور البرية الأخرى وحوّلها إلى رمز للغموض والصمود والجمال الطبيعي. تعكس السوسنة السوداء ثراء وتفرّد المشهد الطبيعي في الأردن.'
                    },
                    image: 'אירוס_שחור.jpg',
                    position: {
                        x: 462,
                        y: 270,
                        w: 30,
                        h: 38
                    }
                }
            ]
        },
        israel: {
            name: {
                he: 'ישראל',
                en: 'Israel',
                ar: 'إسرائيل'
            },
            image: 'Israel.jpg',
            music: 'ישראל_מוזיקה.mp3',
            items: [
                {
                    id: 'falafel_stand',
                    name: {
                        he: 'פלאפל',
                        en: 'Falafel',
                        ar: 'الفلافل'
                    },
                    description: {
                        he: 'הפלאפל הוא הרבה יותר מסתם אוכל טעים – הוא חלק מהסיפור של ישראל! המאכל הזה הגיע לארץ עם משפחות שעלו מארצות ערב והמזרח התיכון, והפך לאוכל שכולם אוהבים – ילדים, הורים, סבים וסבתות. פלאפליות הן מקומות מיוחדים שבהם כולם נפגשים יחד, בוחרים את הסלטים האהובים עליהם ונהנים מהטעם הטוב. כל אחד בישראל חושב שהוא יודע איפה הפלאפל הכי טעים, וזה יוצר ויכוחים מצחיקים וידידותיים בין אנשים. הפלאפל מלמד אותנו שאוכל טוב ופשוט יכול לחבר את כולם, לא משנה מאיפה באנו או מי אנחנו.',
                        en: 'Falafel is much more than just tasty food – it\'s part of Israel\'s story! This dish came to the country with families who immigrated from Arab countries and the Middle East, and became a food that everyone loves – children, parents, grandparents, and grandmothers. Falafel stands are special places where everyone gathers together, chooses their favorite salads, and enjoys the delicious taste. Everyone in Israel thinks they know where to find the tastiest falafel, which creates funny and friendly debates among people. Falafel teaches us that good, simple food can bring everyone together, no matter where we came from or who we are.',
                        ar: 'الفلافل هو أكثر بكثير من مجرد طعام لذيذ – إنه جزء من قصة إسرائيل! وصل هذا الطعام إلى البلاد مع العائلات التي هاجرت من الدول العربية والشرق الأوسط، وأصبح طعامًا يحبه الجميع – الأطفال، الآباء، الأجداد والجدات. محلات الفلافل هي أماكن مميزة يلتقي فيها الجميع معًا، يختارون السلطات المفضلة لديهم ويستمتعون بالطعم الطيب. كل شخص في إسرائيل يظن أنه يعرف أين الفلافل الألذ، وهذا يخلق نقاشات مضحكة وودية بين الناس. الفلافل يعلمنا أن الطعام الجيد والبسيط يمكن أن يجمع الجميع معًا، بغض النظر من أين أتينا أو من نحن.'
                    },
                    image: 'דוכן_פלאפל.jpg',
                    position: {
                        x: 399,
                        y: 69,
                        w: 122,
                        h: 148
                    }
                },
                {
                    id: 'hoopoe',
                    name: {
                        he: 'הדוכיפת',
                        en: 'The Hoopoe',
                        ar: 'الهُدهُد'
                    },
                    description: {
                        he: 'הדוכיפת היא ציפור הלאום של ישראל. זוהי ציפור קטנה וצבעונית, בעלת ציצית נוצות בולטת על ראשה ופסים שחורים-לבנים על כנפיה. הדוכיפת נפוצה בכל רחבי ישראל כציפור מקננת, בעיקר באזורים חקלאיים ופתוחים, והיא נחשבת לידידת האדם בשל התנהגותה הסקרנית. הציפור מוזכרת גם במקורות יהודיים עתיקים ובספרות המקראית, דבר המחזק את הקשר התרבותי שלה לארץ ישראל. בחירתה כסמל לאומי משקפת את הקשר בין הטבע, המורשת ההיסטורית והזהות הישראלית המודרנית.',
                        en: 'The hoopoe is the national bird of Israel. It is a small and colorful bird, distinguished by a prominent crest of feathers on its head and black-and-white stripes on its wings. The hoopoe is found throughout Israel as a nesting bird, particularly in agricultural and open areas, and is considered friendly to humans due to its curious behavior. The bird is also mentioned in ancient Jewish sources and biblical literature, which strengthens its cultural connection to the Land of Israel. Its selection as a national symbol reflects the bond between nature, historical heritage, and modern Israeli identity.',
                        ar: 'الهُدهُد هو الطائر الوطني لإسرائيل. وهو طائر صغير وملوّن، يتميّز بعُرف من الريش بارز على رأسه وخطوط سوداء وبيضاء على جناحيه. ينتشر الهُدهُد في جميع أنحاء إسرائيل كطائر مُعشّش، خاصةً في المناطق الزراعية والمفتوحة، ويُعتبر صديقًا للإنسان بسبب سلوكه الفضولي. يُذكر هذا الطائر أيضًا في المصادر اليهودية القديمة والأدب التوراتي، ممّا يُعزّز ارتباطه الثقافي بأرض إسرائيل. اختياره رمزًا وطنيًا يعكس العلاقة بين الطبيعة والتراث التاريخي والهُويّة الإسرائيلية الحديثة.'
                    },
                    image: 'דוכיפת.jpg',
                    position: {
                        x: 303,
                        y: 153,
                        w: 38,
                        h: 28
                    }
                },
                {
                    id: 'pride_parade',
                    name: {
                        he: 'מצעד הגאווה בתל אביב',
                        en: 'Tel Aviv Pride Parade',
                        ar: 'مسيرة الفخر في تل أبيب'
                    },
                    description: {
                        he: 'מצעד הגאווה בתל אביב הוא אחד האירועים הגדולים והצבעוניים ביותר בישראל, המתקיים מדי שנה בחודש יוני ומושך מאות אלפי משתתפים מישראל ומרחבי העולם. המצעד, שהחל בשנות התשעים כאירוע קטן יחסית, הפך לסמל של הסובלנות והפתיחות של תל אביב ומיקם את העיר כאחת מבירות הגאווה המובילות בעולם. האירוע משלב מסרים של שוויון זכויות, קבלה ומאבק למען קהילת הלהט"ב, יחד עם חגיגה צבעונית של מוזיקה, ריקודים ושמחה ברחובות העיר.',
                        en: 'The Tel Aviv Pride Parade is one of the largest and most colorful events in Israel, held annually in June and attracting hundreds of thousands of participants from Israel and around the world. The parade, which began in the 1990s as a relatively small event, has become a symbol of Tel Aviv\'s tolerance and openness, positioning the city as one of the leading pride capitals in the world. The event combines messages of equal rights, acceptance, and advocacy for the LGBTQ+ community, along with a colorful celebration of music, dance, and joy in the city streets.',
                        ar: 'مسيرة الفخر في تل أبيب هي من أكبر الفعاليات وأكثرها ألوانًا في إسرائيل، تُقام سنويًا في شهر يونيو وتجذب مئات الآلاف من المشاركين من إسرائيل ومن جميع أنحاء العالم. المسيرة، التي بدأت في التسعينيات كفعالية صغيرة نسبيًا، أصبحت رمزًا للتسامح والانفتاح في تل أبيب ووضعت المدينة كواحدة من عواصم الفخر الرائدة في العالم. تجمع الفعالية بين رسائل المساواة في الحقوق والقبول والنضال من أجل مجتمع الميم، إلى جانب احتفال ملوّن بالموسيقى والرقص والفرح.'
                    },
                    image: 'מצעד_הגאווה.jpg',
                    position: {
                        x: 694,
                        y: 194,
                        w: 80,
                        h: 90
                    }
                },
                {
                    id: 'anemone',
                    name: {
                        he: 'כלנית',
                        en: 'Anemone',
                        ar: 'شقائق النعمان'
                    },
                    description: {
                        he: 'הכלנית היא אחד מסמלי הטבע והנוף הבולטים ביותר בישראל, והיא חלק בלתי נפרד מהזהות התרבותית והלאומית. הפרח האדום, הפורח בחודשי החורף והאביב ומבשר את תחילת עונת הפריחה, מכסה שטחים נרחבים בצפון ובדרום הארץ וצובע את השדות והגבעות באדום עז. הכלנית זכתה למעמד מיוחד בתרבות הישראלית – היא מופיעה בשירים, בספרות ילדים ובאמנות, ונחשבת לסמל של התחדשות, תקווה וחיבור לארץ.',
                        en: 'The anemone is one of the most prominent symbols of nature and landscape in Israel, and an integral part of the cultural and national identity. The red flower, which blooms during the winter and spring months and marks the beginning of the blooming season, covers vast areas in the north and south of the country, painting the fields and hills in vivid red. The anemone has earned a special place in Israeli culture – it appears in songs, children\'s literature, and art, and is regarded as a symbol of renewal, hope, and connection to the land.',
                        ar: 'شقائق النعمان هي من أبرز رموز الطبيعة والمناظر الطبيعية في إسرائيل، وهي جزء لا يتجزّأ من الهُويّة الثقافية والوطنية. الزهرة الحمراء، التي تتفتّح في أشهر الشتاء والربيع وتُبشّر ببداية موسم الإزهار، تُغطّي مساحات واسعة في شمال البلاد وجنوبها وتصبغ الحقول والتلال بالأحمر القاني. حظيت شقائق النعمان بمكانة خاصة في الثقافة الإسرائيلية – فهي تظهر في الأغاني وأدب الأطفال والفنون، وتُعتبر رمزًا للتجدّد والأمل والارتباط بالأرض.'
                    },
                    image: 'כלנית.jpg',
                    position: {
                        x: 398,
                        y: 376,
                        w: 19,
                        h: 24
                    }
                },
                {
                    id: 'hanukkiah',
                    name: {
                        he: 'חנוכייה',
                        en: 'Hanukkiah',
                        ar: 'حنوكيا'
                    },
                    description: {
                        he: 'החנוכייה היא מסמלי היהדות המרכזיים, והיא משמשת להדלקת נרות בחג החנוכה. בחנוכייה תשעה נרות – שמונה נרות שמדליקים נר אחד בכל לילה משמונת ימי החג, ונר נוסף הנקרא "שמש" שבאמצעותו מדליקים את שאר הנרות. הדלקת הנרות מציינת את נס פך השמן ואת ניצחון המכבים, סיפור של אמונה וגבורה. את החנוכייה נהוג להציג בחלונות הבתים ובמקומות ציבוריים, והיא מסמלת את ניצחון האור על החושך ואת העברת המסורת מדור לדור.',
                        en: 'The Hanukkiah is one of the main symbols of Judaism, used for lighting candles during the holiday of Hanukkah. The Hanukkiah holds nine candles – eight candles that are lit one each night throughout the eight days of the holiday, and an additional candle called the "shamash" which is used to light the other candles. The candle lighting commemorates the miracle of the oil jug and the victory of the Maccabees, a story of faith and heroism. It is customary to display the Hanukkiah in home windows and public spaces, and it symbolizes the triumph of light over darkness and the tradition which is passed from generation to generation.',
                        ar: 'الحنوكيا هي من أبرز رموز اليهودية، وتُستخدم لإضاءة الشموع في عيد الحانوكا. تحتوي الحنوكيا على تسع شموع – ثماني شموع تُضاء واحدة كل ليلة من ليالي العيد الثماني، وشمعة إضافية تُسمى "شماش" تُستخدم لإضاءة الشموع الأخرى. إضاءة الشموع تُخلّد معجزة جرة الزيت وانتصار المكابيين، وهي قصة إيمان وبطولة. من المعتاد عرض الحنوكيا في نوافذ البيوت وفي الأماكن العامة، وهي ترمز إلى انتصار النور على الظلام ونقل التراث من جيل إلى جيل.'
                    },
                    image: 'חנוכיה.jpg',
                    position: {
                        x: 299,
                        y: 437,
                        w: 37,
                        h: 28
                    }
                }
            ]
        },
        syria: {
            name: {
                he: 'סוריה',
                en: 'Syria',
                ar: 'سوريا'
            },
            image: 'Syria.jpg',
            music: 'סוריה_מוזיקה.mp3',
            items: [
                {
                    id: 'syrian_brown_bear',
                    name: {
                        he: 'דוב חום סורי',
                        en: 'Syrian Brown Bear',
                        ar: 'الدب البني السوري'
                    },
                    description: {
                        he: 'הדוב החום הסורי הוא תת-מין של הדוב החום שהיה מקורו ההיסטורי בהרי סוריה והמזרח התיכון הרחב. למרות שהוא כיום נדיר ביותר או נכחד מהטבע הסורי בשל אובדן בתי גידול וציד, הוא נותר סמל עוצמתי למגוון חיות הבר של האזור. זהו הקטן מבין תת-מיני הדוב החום והוא מופיע לעתים קרובות בפולקלור המקומי וברשומות היסטוריות.',
                        en: 'The Syrian brown bear is a subspecies of the brown bear that was historically native to the mountains of Syria and the wider Middle East. Although it is now extremely rare or extinct from Syrian wilderness due to habitat loss and hunting, it remains a powerful symbol of the region\'s wildlife diversity. It is the smallest of the brown bear subspecies and frequently appears in local folklore and historical records.',
                        ar: 'الدب البني السوري هو سلالة فرعية من الدب البني كان موطنه الأصلي تاريخيًا في جبال سوريا والشرق الأوسط الأوسع. على الرغم من أنه أصبح اليوم نادرًا جدًا أو منقرضًا من البرية السورية بسبب فقدان الموائل والصيد، إلا أنه يبقى رمزًا قويًا لتنوع الحياة البرية في المنطقة. وهو الأصغر بين سلالات الدب البني الفرعية ويظهر كثيرًا في الفولكلور المحلي والسجلات التاريخية.'
                    },
                    image: 'דוב_סורי_חום.jpg',
                    position: {
                        x: 770,
                        y: 127,
                        w: 90,
                        h: 68
                    }
                },
                {
                    id: 'shawarma_stand',
                    name: {
                        he: 'שווארמה',
                        en: 'Shawarma',
                        ar: 'الشاورما'
                    },
                    description: {
                        he: 'למרות שהיא נהנית בכל רחבי המזרח התיכון, השווארמה הסורית נחשבת בעיני רבים מחובבי אוכל לסטנדרט הזהב. השפים הסורים מפורסמים בתערובות התבלינים הייחודיות שלהם ובטכניקת הגשת הבשר בלחם שטוח דק ופריך עם הרבה טוּם (רוטב שום). מאז התפשטות הגולה הסורית בעולם, חנויות שווארמה "בסגנון דמשקאי" הפכו לסימן היכר של אוכל רחוב איכותי ברחבי העולם.',
                        en: 'While enjoyed throughout the Middle East, Syrian shawarma is considered by many food enthusiasts to be the gold standard. Syrian chefs are renowned for their unique spice blends and their technique of serving the meat in thin, crispy flatbread with generous amounts of toum (garlic sauce). Since the Syrian diaspora has spread around the world, "Damascene-style" shawarma shops have become a hallmark of quality street food worldwide.',
                        ar: 'على الرغم من أنها تُستمتع في جميع أنحاء الشرق الأوسط، تُعتبر الشاورما السورية في نظر كثير من عشّاق الطعام المعيار الذهبي. يشتهر الطهاة السوريون بخلطات التوابل الفريدة لديهم وبتقنية تقديم اللحم في خبز رقيق ومقرمش مع الكثير من التوم (صلصة الثوم). منذ انتشار الشتات السوري في العالم، أصبحت محلات الشاورما "على الطريقة الدمشقية" علامة مميزة لطعام الشارع الراقي حول العالم.'
                    },
                    image: 'דוכן_שווארמה.jpg',
                    position: {
                        x: 569,
                        y: 330,
                        w: 142,
                        h: 147
                    }
                },
                {
                    id: 'mount_hermon_syrian',
                    name: {
                        he: 'הר ג\'בל א-שייך\'',
                        en: 'Jabal al-Sheikh',
                        ar: 'جبل الشيخ'
                    },
                    description: {
                        he: 'ג\'בל א-שייך\' או כמו שמכונה בעברית הר החרמון. הוא רכס הרים מרשים השוכן על הגבול בין סוריה ללבנון, כאשר פסגותיו הגבוהות ביותר נמצאות תחת ריבונות סורית. עבור הסורים, זהו ציון דרך גיאוגרפי ואסטרטגי חיוני, הידוע בשם "הר השייך\'" בשל פסגותיו מכוסות השלג. הוא משמש כמקור מים חיוני לאזור והוא אתר בעל חשיבות היסטורית וסמלית עמוקה.',
                        en: 'Jabal al-Sheikh, is a majestic mountain range situated on the border between Syria and Lebanon, with its highest peaks under Syrian sovereignty. For Syrians, it is a vital geographical and strategic landmark, known as the "Mountain of the Sheikh" due to its snowy peaks. It serves as a crucial water source for the region and is a site of deep historical and symbolic significance.',
                        ar: 'جبل الشيخ هو سلسلة جبال مهيبة تقع على الحدود بين سوريا ولبنان، وقممه الأعلى تقع تحت السيادة السورية. بالنسبة للسوريين، يُعدّ معلمًا جغرافيًا واستراتيجيًا حيويًا، ويُعرف باسم "جبل الشيخ" بسبب قممه المكسوة بالثلوج. يُعتبر مصدرًا حيويًا للمياه في المنطقة وهو موقع ذو أهمية تاريخية ورمزية عميقة.'
                    },
                    image: 'החרמון_הסורי.jpg',
                    position: {
                        x: 713,
                        y: 11,
                        w: 323,
                        h: 100
                    }
                },
                {
                    id: 'oud',
                    name: {
                        he: 'עוד',
                        en: 'Oud',
                        ar: 'العود'
                    },
                    description: {
                        he: 'העוּד הוא כלי נגינה מרכזי במוזיקה המסורתית הסורית, ומכונה לעתים קרובות "מלך הכלים". סוריה, ובמיוחד דמשק, ידועה בעולם בזכות אומני העוּד המומחים שלה, היוצרים את כלי הנגינה בצורת האגס הזה בדיוק מדהים. העוּד הוא עמוד השדרה של הוַאסְלַה הסורית (סוויטה מוזיקלית מסורתית), ומספק את המנגינות הנוגעות ללב המגדירות את המורשת האמנותית העשירה של המדינה.',
                        en: 'The oud is a main musical instrument in traditional Syrian music, often referred to as the "King of Instruments." Syria, and Damascus in particular, is known worldwide for its master oud craftsmen, who create this pear-shaped instrument with remarkable precision. The oud is the backbone of the Syrian Wasla (a traditional musical suite), providing the heartfelt melodies that define the country\'s rich artistic heritage.',
                        ar: 'العود هو آلة موسيقية محورية في الموسيقى السورية التقليدية، ويُطلق عليه في كثير من الأحيان "ملك الآلات". سوريا، وخاصةً دمشق، مشهورة عالميًا بفضل صنّاع العود المهرة فيها، الذين يصنعون هذه الآلة الموسيقية ذات الشكل الكمثري بدقة مذهلة. العود هو العمود الفقري للوصلة السورية (سويتة موسيقية تقليدية)، ويُقدّم الألحان المؤثرة التي تُعرّف التراث الفني الغني للبلاد.'
                    },
                    image: 'עוד.jpg',
                    position: {
                        x: 294,
                        y: 214,
                        w: 57,
                        h: 80
                    }
                },
                {
                    id: 'dabke_dance',
                    name: {
                        he: 'ריקוד הדבקה',
                        en: 'Dabke Dance',
                        ar: 'رقصة الدبكة'
                    },
                    description: {
                        he: 'הדבקה היא ריקוד עם לבנטיני מסורתי המשמש כלב הפועם של החגיגות הסוריות, במיוחד חתונות. זהו ריקוד שורה ומעגל אנרגטי שבו המשתתפים משלבים זרועות ורוקעים על הקרקע בדפוסים קצביים. בסוריה, הדבקה מייצגת אחדות חברתית וגאוות קהילה, כאשר אזורים שונים מציגים לעתים קרובות גרסאות ייחודיות משלהם לצעדים.',
                        en: 'Dabke is a traditional Levantine folk dance that serves as the heartbeat of Syrian celebrations, especially weddings. It is an energetic row and circle dance in which participants link arms and stomp the ground in rhythmic patterns. In Syria, dabke represents social unity and community pride, with different regions often showcasing their own unique variations of the dance.',
                        ar: 'الدبكة هي رقصة شعبية شامية تقليدية تُعتبر نبض الاحتفالات السورية، وخاصةً الأعراس. إنها رقصة صف ودائرة مفعمة بالحيوية، حيث يتشابك المشاركون بالأذرع ويدقّون الأرض بأنماط إيقاعية. في سوريا، تُمثّل الدبكة الوحدة الاجتماعية وفخر المجتمع، حيث تعرض مناطق مختلفة في كثير من الأحيان نسخها الفريدة من الخطوات.'
                    },
                    image: 'ריקוד_הדאבקה.jpg',
                    position: {
                        x: 36,
                        y: 150,
                        w: 133,
                        h: 83
                    }
                }
            ]
        }
    },
    
    translations: {
        he: {
            welcome: 'ברוכים הבאים למסע ברכבת החיג\'אז',
            instructions: 'מצא את כל הפריטים בתמונה!',
            found: 'מצאת!',
            // notFound: 'נסה שוב',
            complete: 'כל הכבוד! סיימת את השלב',
            continue: 'המשך',
            searchFor: 'חפש את:',
            itemsFound: 'פריטים שנמצאו',
            close: 'סגור',
            zoom: 'זום',
            // wrongItem: 'לא נכון, נסה שוב',
            congratulations: 'כל הכבוד!',
            stageComplete: 'סיימת את השלב!',
            nextStage: 'המשך לשלב הבא',
            sendPostcard: 'שלח גלויה',
            enterName: 'אנא הזן את שמך כדי להתחיל',
            yourName: 'השם שלך',
            nameRequired: 'נא להזין שם',
            nameTooShort: 'השם קצר מדי (לפחות 2 תווים)',
            nameTooLong: 'השם ארוך מדי (עד 20 תווים)',
            inappropriateContent: 'התוכן לא מתאים, אנא נסה שוב',
            noUsers: 'אין משתמשים זמינים',
            selectRecipient: 'בחר נמען',
            writeMessage: 'כתוב הודעה',
            messagePlaceholder: 'כתוב כאן את ההודעה שלך...',
            cancel: 'ביטול',
            send: 'שלח',
            messageTooShort: 'ההודעה קצרה מדי (לפחות 5 תווים)',
            messageTooLong: 'ההודעה ארוכה מדי (עד 500 תווים)',
            postcardSent: 'הגלויה נשלחה בהצלחה!',
            postcardTitle: 'שלח גלויה מ',
            myPostcards: 'הגלויות שלי',
            noPostcards: 'אין לך גלויות עדיין',
            from: 'מאת',
            stage: 'שלב',
            back: 'חזור',
            reply: 'השב',
            downloadOffline: 'לחץ כאן להורדת והדפסת השלב',
            stageArrival: {
                title: 'הגעת לשלב',
                start: 'התחל',
                countries: {
                    saudi: 'ערב הסעודית',
                    jordan: 'ירדן',
                    israel: 'ישראל',
                    syria: 'סוריה'
                }
            },
            splash: {
                welcome: {
                    title: 'ברוכים הבאים!',
                    text: 'צאו למסע מרתק לאורך המסילה ההיסטורית שחיברה את המזרח התיכון.',
                    button: 'בואו נתחיל!'
                },
                about: {
                    title: 'על רכבת החיג\'אז',
                    text: 'הרכבת החיג\'אזית הייתה רכבת היסטורית שעברה בין ערב הסעודית, ירדן, ישראל וסוריה. היא פעלה בין השנים 1908-1918 בתקופת האימפריה העות\'מאנית ושימשה לתחבורה והובלה במשך עשרות שנים והייתה חלק חשוב מההיסטוריה של האזור. הרכבת אפשרה דו-קיום באזור בין כל התושבים, וכולם נעו בחופשיות ממקום למקום. חשוב לדעת: בתקופה שהרכבת פעלה, כל האזור היה חלק מאימפריה אחת ולא היו הגבולות והמדינות שאנחנו מכירים היום. המשחק שלנו מבוסס על קו הרכבת ההיסטורי, אבל משקף את המציאות של ימינו - עם המדינות והגבולות המודרניים שקיימים כיום.',
                    button: 'המשך'
                },
                howToPlay: {
                    title: 'איך משחקים?',
                    text: 'בכל שלב תצטרכו למצוא 5 אלמנטים מיוחדים. השתמשו בעכבר כדי להזיז את התמונה ולחפש את האלמנט המוצג בצד. לחצו על האלמנט כשאתם מוצאים אותו!',
                    button: 'הבנתי!'
                }
            }
        },
        en: {
            welcome: 'Welcome to the Hejaz Railway Journey',
            instructions: 'Find all items in the image!',
            found: 'Found it!',
            notFound: 'Try again',
            complete: 'Well done! You completed the stage',
            continue: 'Continue',
            searchFor: 'Search for:',
            itemsFound: 'Items found',
            close: 'Close',
            zoom: 'Zoom',
            // wrongItem: 'Wrong, try again',
            congratulations: 'Congratulations!',
            stageComplete: 'Stage Complete!',
            nextStage: 'Continue to Next Stage',
            sendPostcard: 'Send Postcard',
            enterName: 'Please enter your name to begin',
            yourName: 'Your Name',
            nameRequired: 'Please enter a name',
            nameTooShort: 'Name too short (at least 2 characters)',
            nameTooLong: 'Name too long (up to 20 characters)',
            inappropriateContent: 'Inappropriate content, please try again',
            noUsers: 'No users available',
            selectRecipient: 'Select Recipient',
            writeMessage: 'Write Message',
            messagePlaceholder: 'Write your message here...',
            cancel: 'Cancel',
            send: 'Send',
            messageTooShort: 'Message too short (at least 5 characters)',
            messageTooLong: 'Message too long (up to 500 characters)',
            postcardSent: 'Postcard sent successfully!',
            postcardTitle: 'Send Postcard from',
            myPostcards: 'My Postcards',
            noPostcards: 'You don\'t have any postcards yet',
            from: 'From',
            stage: 'Stage',
            back: 'Back',
            reply: 'Reply',
            downloadOffline: 'Click here to download and print this level',
            stageArrival: {
                title: 'You\'ve reached Stage',
                start: 'Start',
                countries: {
                    saudi: 'Saudi Arabia',
                    jordan: 'Jordan',
                    israel: 'Israel',
                    syria: 'Syria'
                }
            },
            splash: {
                welcome: {
                    title: 'Welcome!',
                    text: 'Embark on a fascinating journey along the historic railway that connected the Middle East.',
                    button: 'Let\'s Begin!'
                },
                about: {
                    title: 'The Hejaz Railway',
                    text: 'The Hejaz Railway was a historic railway that passed through Saudi Arabia, Jordan, Israel, and Syria. It operated between 1908-1918 during the Ottoman Empire period and served for transportation and shipping for decades, playing an important part of the region\'s history. The railway enabled coexistence in the region among all residents, and everyone moved freely from place to place. Important note: During the time the railway operated, the entire area was part of one empire and the borders and countries we know today did not exist. Our game is based on the historic railway route, but reflects today\'s reality - with the modern countries and borders that exist now.',
                    button: 'Continue'
                },
                howToPlay: {
                    title: 'How to Play?',
                    text: 'In each level, you\'ll need to find 5 special elements. Use your mouse to move the image and search for the element shown on the side. Click on the element when you find it!',
                    button: 'Got It!'
                }
            }
        },
        ar: {
            welcome: 'مرحباً بكم في رحلة سكة حديد الحجاز',
            instructions: 'ابحث عن جميع العناصر في الصورة!',
            found: 'وجدته!',
            notFound: 'حاول مرة أخرى',
            complete: 'أحسنت! لقد أكملت المرحلة',
            continue: 'متابعة',
            searchFor: 'ابحث عن:',
            itemsFound: 'العناصر الموجودة',
            close: 'إغلاق',
            zoom: 'تكبير',
            // wrongItem: 'خطأ، حاول مرة أخرى',
            congratulations: 'تهانينا!',
            stageComplete: 'المرحلة مكتملة!',
            nextStage: 'الانتقال إلى المرحلة التالية',
            sendPostcard: 'إرسال بطاقة بريدية',
            enterName: 'الرجاء إدخال اسمك للبدء',
            yourName: 'اسمك',
            nameRequired: 'الرجاء إدخال اسم',
            nameTooShort: 'الاسم قصير جداً (حرفان على الأقل)',
            nameTooLong: 'الاسم طويل جداً (حتى 20 حرفاً)',
            inappropriateContent: 'محتوى غير لائق، يرجى المحاولة مرة أخرى',
            noUsers: 'لا يوجد مستخدمون متاحون',
            selectRecipient: 'اختر المستلم',
            writeMessage: 'اكتب رسالة',
            messagePlaceholder: 'اكتب رسالتك هنا...',
            cancel: 'إلغاء',
            send: 'إرسال',
            messageTooShort: 'الرسالة قصيرة جداً (5 أحرف على الأقل)',
            messageTooLong: 'الرسالة طويلة جداً (حتى 500 حرف)',
            postcardSent: 'تم إرسال البطاقة البريدية بنجاح!',
            postcardTitle: 'إرسال بطاقة بريدية من',
            myPostcards: 'بطاقاتي البريدية',
            noPostcards: 'ليس لديك بطاقات بريدية بعد',
            from: 'من',
            stage: 'مرحلة',
            back: 'رجوع',
            reply: 'رد',
            downloadOffline: 'اضغط هنا لتحميل وطباعة المرحلة',
            stageArrival: {
                title: 'وصلت للمرحلة',
                start: 'ابدأ',
                countries: {
                    saudi: 'السعودية',
                    jordan: 'الأردن',
                    israel: 'إسرائيل',
                    syria: 'سوريا'
                }
            },
            splash: {
                welcome: {
                    title: 'مرحبًا!',
                    text: 'انطلقوا في رحلة مثيرة على طول الخط الحديدي التاريخي الذي ربط الشرق الأوسط.',
                    button: 'هيا نبدأ!'
                },
                about: {
                    title: 'سكة حديد الحجاز',
                    text: 'كانت سكة حديد الحجاز خط سكة حديد تاريخي مر عبر المملكة العربية السعودية والأردن وإسرائيل وسوريا. عملت بين عامي 1908-1918 خلال فترة الإمبراطورية العثمانية واستُخدمت للنقل والشحن لعدة عقود وكانت جزءاً مهماً من تاريخ المنطقة. أتاحت السكة الحديدية التعايش في المنطقة بين جميع السكان، وتنقل الجميع بحرية من مكان إلى آخر. من المهم أن نعرف: في الفترة التي عملت فيها السكة الحديدية، كانت المنطقة بأكملها جزءاً من إمبراطورية واحدة ولم تكن هناك الحدود والدول التي نعرفها اليوم. لعبتنا مبنية على خط السكة الحديدية التاريخي، لكنها تعكس واقع اليوم - مع الدول والحدود الحديثة الموجودة حالياً.',
                    button: 'متابعة'
                },
                howToPlay: {
                    title: 'كيف نلعب؟',
                    text: 'في كل مرحلة ستحتاجون إلى إيجاد 5 عناصر مميزة. استخدموا الفأرة لتحريك الصورة والبحث عن العنصر المعروض على الجانب. اضغطوا على العنصر عندما تجدونه!',
                    button: 'فهمت!'
                }
            }
        }
    }
};

// Make globally accessible
window.GAME_DATA = GAME_DATA;

// ============================================
// GAME STATE
// ============================================

const gameState = {
    currentLanguage: 'he',
    currentStage: 'saudi',
    foundItems: [],
    currentSearchItem: 0,
    soundEnabled: true,
    stageComplete: false,
    completedStages: [],
    splashIndex: 0,
    currentUser: null,
    fromStageComplete: false,
    showingItemInfo: false
};

// Stage transition videos mapping - language dependent
// These are the transition cutaways between stages
function getStageTransitionVideo(stageNumber, lang) {
    const basePath = 'מעברים/';
    const langFolder = {
        'he': 'עברית/',
        'en': 'אנגלית/',
        'ar': 'ערבית/'
    };
    
    const videoFiles = {
        'he': {
            1: 'מעבר שלב עברית -_1.mp4',
            2: 'מעבר שלב עברית -_2.mp4',
            3: 'מעבר שלב עברית -_3.mp4',
            4: 'מעבר שלב עברית -_4.mp4'
        },
        'en': {
            1: 'מעבר שלב אנגלית1 -.mp4',
            2: 'מעבר שלב אנגלית2 -.mp4',
            3: 'מעבר שלב אנגלית3 -.mp4',
            4: 'מעבר שלב אנגלית4 -.mp4'
        },
        'ar': {
            1: 'מעבר שלب ערבית1 -.mp4',
            2: 'מעבר שלב ערבית -_2.mp4',
            3: 'מעבר שלב ערבית -3.mp4',
            4: 'מעבר שלב ערבית -_4.mp4'
        }
    };
    
    const folder = langFolder[lang] || langFolder['he'];
    const files = videoFiles[lang] || videoFiles['he'];
    const file = files[stageNumber];
    
    return basePath + folder + file;
}

// Stage intro videos (when entering a stage for the first time)
const STAGE_VIDEOS = {
    'saudi': 'ערב_הסעודית.mp4',
    'jordan': 'ירדן.mp4',
    'israel': 'ישראל.mp4',
    'syria': 'סוריה.mp4'
};

// Make globally accessible
window.gameState = gameState;
window.STAGE_VIDEOS = STAGE_VIDEOS;
window.getStageTransitionVideo = getStageTransitionVideo;

console.log('✅ Game data and state initialized with correct music file names');
