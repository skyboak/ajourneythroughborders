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
                        en: 'Sword Dance',
                        ar: 'العرضة السعودية'
                    },
                    description: {
                        he: 'ריקוד החרבות (עַרְצָ\'ה) הוא ריקוד מסורתי סעודי שמבוצע במהלך חגיגות ואירועים חשובים. הרקדנים נושאים חרבות ומבצעים תנועות מתואמות בליווי תופים ושירה.',
                        en: 'The Sword Dance (Ardah) is a traditional Saudi dance performed during celebrations and important events. Dancers carry swords and perform coordinated movements accompanied by drums and singing.',
                        ar: 'العرضة السعودية هي رقصة تقليدية تُؤدى خلال الاحتفالات والمناسبات الهامة. يحمل الراقصون السيوف ويؤدون حركات منسقة بمصاحبة الطبول والغناء.'
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
                        he: 'מירוצי גמלים',
                        en: 'Camel Racing',
                        ar: 'سباق الهجن'
                    },
                    description: {
                        he: 'מירוצי גמלים הם ספורט פופולרי מאוד בערב הסעודית. הגמלים רצים במהירויות של עד 65 קמ"ש! היום משתמשים ברובוטים קטנים כרוכבים במקום ילדים.',
                        en: 'Camel racing is a very popular sport in Saudi Arabia. Camels can run at speeds of up to 65 km/h! Today, small robots are used as jockeys instead of children.',
                        ar: 'سباق الهجن رياضة شعبية جداً في المملكة العربية السعودية. يمكن للإبل أن تركض بسرعات تصل إلى 65 كم/ساعة! اليوم، تُستخدم روبوتات صغيرة كفرسان بدلاً من الأطفال.'
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
                        he: 'קפה סעודי מסורתי',
                        en: 'Traditional Saudi Coffee',
                        ar: 'القهوة السعودية'
                    },
                    description: {
                        he: 'הקפה הסעודי (קהווה) מוגש באירועים חשובים ולאורחים כסימן לכבוד. הוא מוכן עם תבלינים כמו הל וזעפרן, ומוגש בכוסות קטנות מיוחדות.',
                        en: 'Saudi coffee (Qahwa) is served at important events and to guests as a sign of respect. It is prepared with spices like cardamom and saffron, and served in special small cups.',
                        ar: 'القهوة السعودية (قهوة) تُقدم في المناسبات الهامة وللضيوف كعلامة احترام. تُحضر مع التوابل مثل الهيل والزعفران، وتُقدم في أكواب صغيرة خاصة.'
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
                        he: 'קבוצת אל נאסר',
                        en: 'Al-Nassr Team',
                        ar: 'نادي النصر'
                    },
                    description: {
                        he: 'אל נאסר היא אחת מקבוצות הכדורגל המפורסמות ביותר בסעודיה. הקבוצה זכתה באליפות רבות, והכוכב כריסטיאנו רונאלדו משחק בה כיום!',
                        en: 'Al-Nassr is one of the most famous football teams in Saudi Arabia. The team has won many championships, and the star Cristiano Ronaldo currently plays for it!',
                        ar: 'نادي النصر هو أحد أشهر أندية كرة القدم في المملكة العربية السعودية. فاز النادي بالعديد من البطولات، ويلعب له النجم كريستيانو رونالدو حالياً!'
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
                        he: 'ציד בעזרת בז הוא מסורת עתיקה בערב הסעודית. הבזים מאולפים לצוד ארנבות וציפורים. זהו ספורט יוקרתי והבזים יכולים לעלות הרבה מאוד כסף!',
                        en: 'Falconry is an ancient tradition in Saudi Arabia. Falcons are trained to hunt rabbits and birds. It is a prestigious sport and falcons can cost a lot of money!',
                        ar: 'الصيد بالصقور تقليد قديم في المملكة العربية السعودية. يتم تدريب الصقور على صيد الأرانب والطيور. إنها رياضة مرموقة ويمكن أن تكلف الصقور الكثير من المال!'
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
                        he: 'פטרה היא עיר עתיקה ומפורסמת שנחצבה בסלע האדום. היא נבנתה על ידי הנבטים לפני למעלה מ-2000 שנה והיא אחד משבעת פלאי העולם!',
                        en: 'Petra is an ancient and famous city carved into red rock. It was built by the Nabataeans over 2000 years ago and is one of the Seven Wonders of the World!',
                        ar: 'البتراء مدينة قديمة ومشهورة منحوتة في الصخر الأحمر. بناها الأنباط قبل أكثر من 2000 عام وهي إحدى عجائب الدنيا السبع!'
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
                        he: 'ראם ירדני',
                        en: 'Jordanian Ram',
                        ar: 'الكبش الأردني'
                    },
                    description: {
                        he: 'הראם הירדני הוא סמל לאומי של ירדן. זהו בעל חיים חזק ויפה שחי באזורים ההרריים והמדבריים של המדינה.',
                        en: 'The Jordanian ram is a national symbol of Jordan. It is a strong and beautiful animal that lives in the mountainous and desert areas of the country.',
                        ar: 'الكبش الأردني هو رمز وطني للأردن. إنه حيوان قوي وجميل يعيش في المناطق الجبلية والصحراوية في البلاد.'
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
                        he: 'מסק זיתים',
                        en: 'Olive Press',
                        ar: 'معصرة زيتون'
                    },
                    description: {
                        he: 'מסק הזיתים המסורתי משמש לייצור שמן זית. ירדן מפורסמת בעצי הזית שלה ובשמן הזית האיכותי שמופק מהם.',
                        en: 'The traditional olive press is used to produce olive oil. Jordan is famous for its olive trees and the high-quality olive oil extracted from them.',
                        ar: 'تُستخدم معصرة الزيتون التقليدية لإنتاج زيت الزيتون. الأردن مشهور بأشجار الزيتون وزيت الزيتون عالي الجودة المستخرج منها.'
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
                        he: 'הציפור הלאומית',
                        en: 'The National Bird',
                        ar: 'الطائر الوطني'
                    },
                    description: {
                        he: 'הסיני (Sinai Rosefinch) הוא הציפור הלאומית של ירדן. זוהי ציפור קטנה ויפה עם נוצות צבעוניות שחיה באזורים ההרריים.',
                        en: 'The Sinai Rosefinch is the national bird of Jordan. It is a small and beautiful bird with colorful feathers that lives in mountainous areas.',
                        ar: 'وردية سيناء هو الطائر الوطني للأردن. إنه طائر صغير وجميل بريش ملون يعيش في المناطق الجبلية.'
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
                        ar: 'السوسن الأسود'
                    },
                    description: {
                        he: 'האירוס השחור הוא הפרח הלאומי של ירדן. זהו פרח נדיר ויפהפה בצבע סגול-שחור כהה שצומח באזורים ההרריים.',
                        en: 'The Black Iris is the national flower of Jordan. It is a rare and beautiful flower with a dark purple-black color that grows in mountainous areas.',
                        ar: 'السوسن الأسود هو الزهرة الوطنية للأردن. إنها زهرة نادرة وجميلة ذات لون أرجواني-أسود داكن تنمو في المناطق الجبلية.'
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
                        he: 'דוכן פלאפל',
                        en: 'Falafel Stand',
                        ar: 'كشك فلافل'
                    },
                    description: {
                        he: 'הפלאפל הוא אחד המאכלים הפופולריים ביותר בישראל! זהו כדור מטוגן עשוי מחומוס או פול, ומוגש בפיתה עם סלטים וטחינה.',
                        en: 'Falafel is one of the most popular foods in Israel! It is a fried ball made from chickpeas or fava beans, served in pita with salads and tahini.',
                        ar: 'الفلافل هو أحد الأطعمة الأكثر شعبية في إسرائيل! إنها كرة مقلية مصنوعة من الحمص أو الفول، تُقدم في خبز البيتا مع السلطات والطحينة.'
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
                        he: 'דוכיפת',
                        en: 'Hoopoe',
                        ar: 'الهدهد'
                    },
                    description: {
                        he: 'הדוכיפת היא הציפור הלאומית של ישראל! היא מזוהה בקלות בזכות כתר הנוצות המרשים שלה ובצבעים היפים - כתום, שחור ולבן.',
                        en: 'The Hoopoe is the national bird of Israel! It is easily recognized by its impressive feather crown and beautiful colors - orange, black and white.',
                        ar: 'الهدهد هو الطائر الوطني لإسرائيل! يمكن التعرف عليه بسهولة من خلال تاج الريش المثير للإعجاب والألوان الجميلة - البرتقالي والأسود والأبيض.'
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
                        he: 'מצעד הגאווה',
                        en: 'Pride Parade',
                        ar: 'مسيرة الفخر'
                    },
                    description: {
                        he: 'מצעד הגאווה בתל אביב הוא אחד האירועים הגדולים והצבעוניים ביותר בישראל. אלפי אנשים מגיעים לחגוג יחד בכבוד, שוויון ואהבה.',
                        en: 'The Pride Parade in Tel Aviv is one of the largest and most colorful events in Israel. Thousands of people come to celebrate together in dignity, equality and love.',
                        ar: 'مسيرة الفخر في تل أبيب هي واحدة من أكبر الأحداث وأكثرها بهجة في إسرائيل. يأتي آلاف الأشخاص للاحتفال معًا بالكرامة والمساواة والحب.'
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
                        he: 'הכלנית היא פרח אדום יפהפה שפורח בחורף ובאביב בכל רחבי ישראל. היא סמל של הטבע הישראלי ואפשר למצוא אותה בשדות ובגבעות.',
                        en: 'The Anemone is a beautiful red flower that blooms in winter and spring throughout Israel. It is a symbol of Israeli nature and can be found in fields and hills.',
                        ar: 'شقائق النعمان زهرة حمراء جميلة تتفتح في الشتاء والربيع في جميع أنحاء إسرائيل. إنها رمز للطبيعة الإسرائيلية ويمكن العثور عليها في الحقول والتلال.'
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
                        he: 'חנוכיה',
                        en: 'Hanukkiah',
                        ar: 'شمعدان حانوكا'
                    },
                    description: {
                        he: 'החנוכיה היא פמוט מיוחד עם תשעה קנים שמדליקים בחג החנוכה. כל ערב מדליקים נר נוסף, עד שבלילה האחרון כל הנרות בוערים יחד!',
                        en: 'The Hanukkiah is a special candelabra with nine branches lit during Hanukkah. Each evening an additional candle is lit, until on the last night all candles burn together!',
                        ar: 'الحانوكية هي شمعدان خاص بتسعة فروع يُضاء خلال عيد الحانوكا. كل مساء يتم إضاءة شمعة إضافية، حتى في الليلة الأخيرة تحترق جميع الشموع معًا!'
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
                        he: 'דוב סורי חום',
                        en: 'Syrian Brown Bear',
                        ar: 'الدب البني السوري'
                    },
                    description: {
                        he: 'הדוב הסורי החום הוא תת-מין נדיר של הדוב החום שחי באזורי ההרים של סוריה. זהו בעל חיים מרשים וחזק שצריך הגנה מיוחדת.',
                        en: 'The Syrian Brown Bear is a rare subspecies of brown bear that lives in the mountainous areas of Syria. It is an impressive and strong animal that needs special protection.',
                        ar: 'الدب البني السوري هو نوع فرعي نادر من الدب البني يعيش في المناطق الجبلية في سوريا. إنه حيوان مثير للإعجاب وقوي يحتاج إلى حماية خاصة.'
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
                        he: 'דוכן שווארמה',
                        en: 'Shawarma Stand',
                        ar: 'كشك شاورما'
                    },
                    description: {
                        he: 'השווארמה היא אחד המאכלים המפורסמים ביותר שמקורם בסוריה! זהו בשר מתובל שצלוי על שיפוד אנכי ומוגש בפיתה או לאפה עם סלטים.',
                        en: 'Shawarma is one of the most famous foods originating from Syria! It is seasoned meat roasted on a vertical spit and served in pita or laffa with salads.',
                        ar: 'الشاورما هي واحدة من أشهر الأطعمة التي نشأت في سوريا! إنها لحم متبل يُشوى على سيخ عمودي ويُقدم في خبز البيتا أو اللافا مع السلطات.'
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
                        he: 'החרמון הסורי',
                        en: 'Mount Hermon (Syrian Side)',
                        ar: 'جبل الشيخ السوري'
                    },
                    description: {
                        he: 'הר החרמון הוא ההר הגבוה ביותר באזור, ומכוסה שלג בחורף. החלק הסורי של ההר מציע נופים מדהימים של רמת הגולן והסביבה.',
                        en: 'Mount Hermon is the highest mountain in the region, covered with snow in winter. The Syrian side of the mountain offers stunning views of the Golan Heights and surroundings.',
                        ar: 'جبل الشيخ (حرمون) هو أعلى جبل في المنطقة، ومغطى بالثلوج في الشتاء. يوفر الجانب السوري من الجبل مناظر خلابة لهضبة الجولان والمناطق المحيطة.'
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
                        he: 'העוד הוא כלי נגינה מיתרי מסורתי שמאוד פופולרי במוזיקה הערבית. יש לו צליל עמוק ועשיר, והוא נחשב למלך כלי הנגינה במזרח התיכון.',
                        en: 'The Oud is a traditional stringed musical instrument very popular in Arabic music. It has a deep and rich sound, and is considered the king of Middle Eastern instruments.',
                        ar: 'العود هو آلة موسيقية وترية تقليدية شائعة جدًا في الموسيقى العربية. له صوت عميق وغني، ويُعتبر ملك الآلات الموسيقية في الشرق الأوسط.'
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
                        he: 'ריקוד הדאבקה',
                        en: 'Dabke Dance',
                        ar: 'رقصة الدبكة'
                    },
                    description: {
                        he: 'הדאבקה היא ריקוד עממי מסורתי סורי שבו הרקדנים מחזיקים ידיים ורוקדים בשורה. זהו ריקוד אנרגטי ושמח שמבוצע בחתונות ובחגיגות.',
                        en: 'Dabke is a traditional Syrian folk dance where dancers hold hands and dance in a line. It is an energetic and joyful dance performed at weddings and celebrations.',
                        ar: 'الدبكة هي رقصة شعبية سورية تقليدية حيث يمسك الراقصون بالأيدي ويرقصون في صف. إنها رقصة حيوية ومبهجة تُؤدى في الأعراس والاحتفالات.'
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
                    title: 'על רכבת החיג\'אז',
                    text: 'הרכבת החיג\'אזית הייתה רכבת היסטורית שעברה בין ערב הסעודית, ירדן, ישראל וסוריה. היא פעלה בין השנים 1908-1918 בתקופת האימפריה העות\'מאנית ושימשה לתחבורה והובלה במשך עשרות שנים והייתה חלק חשוב מההיסטוריה של האזור. הרכבת אפשרה דו-קיום באזור בין כל התושבים, וכולם נעו בחופשיות ממקום למקום. חשוב לדעת: בתקופה שהרכבת פעלה, כל האזור היה חלק מאימפריה אחת ולא היו הגבולות והמדינות שאנחנו מכירים היום. המשחק שלנו מבוסס על קו הרכבת ההיסטורי, אבל משקף את המציאות של ימינו - עם המדינות והגבולות המודרניים שקיימים כיום.',
                    button: 'יאללה למשחק!'
                },
                howToPlay: {
                    title: 'איך משחקים?',
                    text: 'בכל שלב תראו תמונה גדולה ממדינה אחת. משימתכם היא למצוא את כל הפריטים המיוחדים שמסומנים בעיגול בצד. לחצו על הפריט כשאתם מוצאים אותו, ותלמדו עליו עוד! השתמשו בגלגל העכבר כדי להתקרב ובגרירה כדי לנוע בתמונה.',
                    button: 'המשך'
                },
                about: {
                    title: 'על רכבת החיג\'אז',
                    text: 'רכבת החיג\'אז נבנתה בין 1900-1908 על ידי הסולטן העות\'מאני. המסילה התחילה בדמשק שבסוריה והגיעה עד למדינה בחצי האי ערב. היא שימשה אלפי עולי רגל בדרכם למכה, ועברה דרך נופים מדהימים ומדינות שונות.',
                    button: 'בואו נתחיל!'
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
                    title: 'The Hejaz Railway',
                    text: 'The Hejaz Railway was a historic railway that passed through Saudi Arabia, Jordan, Israel, and Syria. It operated between 1908-1918 during the Ottoman Empire period and served for transportation and shipping for decades, playing an important part of the region\'s history. The railway enabled coexistence in the region among all residents, and everyone moved freely from place to place. Important note: During the time the railway operated, the entire area was part of one empire and the borders and countries we know today did not exist. Our game is based on the historic railway route, but reflects today\'s reality - with the modern countries and borders that exist now.',
                    button: 'Let\'s Play!'
                },
                howToPlay: {
                    title: 'How to Play?',
                    text: 'In each stage, you will see a large image from one country. Your task is to find all the special items marked in the circle on the side. Click on an item when you find it, and learn more about it! Use the mouse wheel to zoom and drag to move around the image.',
                    button: 'Continue'
                },
                about: {
                    title: 'About the Hejaz Railway',
                    text: 'The Hejaz Railway was built between 1900-1908 by the Ottoman Sultan. The track started in Damascus, Syria and reached the Arabian Peninsula. It served thousands of pilgrims on their way to Mecca, and passed through stunning landscapes and different countries.',
                    button: 'Let\'s Start!'
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
                    title: 'سكة حديد الحجاز',
                    text: 'كانت سكة حديد الحجاز خط سكة حديد تاريخي مر عبر المملكة العربية السعودية والأردن وإسرائيل وسوريا. عملت بين عامي 1908-1918 خلال فترة الإمبراطورية العثمانية واستُخدمت للنقل والشحن لعدة عقود وكانت جزءاً مهماً من تاريخ المنطقة. أتاحت السكة الحديدية التعايش في المنطقة بين جميع السكان، وتنقل الجميع بحرية من مكان إلى آخر. من المهم أن نعرف: في الفترة التي عملت فيها السكة الحديدية، كانت المنطقة بأكملها جزءاً من إمبراطورية واحدة ولم تكن هناك الحدود والدول التي نعرفها اليوم. لعبتنا مبنية على خط السكة الحديدية التاريخي، لكنها تعكس واقع اليوم - مع الدول والحدود الحديثة الموجودة حالياً.',
                    button: 'يلا نلعب!'
                },
                howToPlay: {
                    title: 'كيف تلعب؟',
                    text: 'في كل مرحلة، سترى صورة كبيرة من بلد واحد. مهمتك هي العثور على جميع العناصر الخاصة المحددة في الدائرة على الجانب. انقر على عنصر عندما تجده، وتعلم المزيد عنه! استخدم عجلة الماوس للتكبير والسحب للتنقل في الصورة.',
                    button: 'متابعة'
                },
                about: {
                    title: 'عن سكة حديد الحجاز',
                    text: 'تم بناء سكة حديد الحجاز بين عامي 1900-1908 من قبل السلطان العثماني. بدأ المسار في دمشق، سوريا ووصل إلى شبه الجزيرة العربية. خدمت آلاف الحجاج في طريقهم إلى مكة، ومرت عبر مناظر طبيعية خلابة ودول مختلفة.',
                    button: 'لنبدأ!'
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
