import { useEffect, useRef, useState } from "react"

const A = `assets`

const icons = {
  qr: `${A}/314c7.svg`,
  chevron: `${A}/cff17.svg`,
  home: `${A}/0bc5c.svg`,
  offers: `${A}/930c9.svg`,
  menu: `${A}/8987f.svg`,
  cartChip: `${A}/8e88d.svg`,
  profile: `${A}/c51e9.svg`,
  bigfestLogo: `${A}/c1f3c.svg`,
  bigfestWordmark: `${A}/ea048.svg`,
  dayCard: `${A}/15d35.svg`,
  secretCard: `${A}/cbb7c.svg`,
  dayFooter: `${A}/dae01.svg`,
  secretFooter: `${A}/db533.svg`,
  chicken: `${A}/8a1a1.png`,
  arrow: `${A}/11f6c.svg`,
  orders: `${A}/af122.svg`,
  offersOn: `${A}/2d375.svg`,
  minus: `${A}/7ef00.svg`,
  plus: `${A}/6200e.svg`,
  plusWhite: `${A}/3c100.svg`,
  homeOff: `${A}/93cec.svg`,
  menuOn: `${A}/cf2ce.svg`,
}

const banners = [`${A}/be510.png`, `${A}/54062.png`, `${A}/b6e66.png`]
const products = {
  roll: `${A}/c7596.png`,
  salad: `${A}/9e119.png`,
  pie: `${A}/b38da.png`,
}

const catalogSections = [
  {
    id: "combo",
    title: "Комбо",
    items: [
      ["big-hit-bacon-combo", "Биг Хит Бекон Комбо", "518 ₽", "combo-1.png"],
      ["big-hit-combo", "Биг Хит Комбо", "472 ₽", "combo-2.png"],
      ["big-special-combo", "Биг Спешиал Комбо", "598 ₽", "combo-3.png"],
      ["grand-combo", "Гранд Комбо", "527 ₽", "combo-4.png"],
      ["roll-combo", "Ролл Комбо", "567 ₽", "combo-5.png"],
      ["chicken-hit-combo", "Чикен Хит Комбо", "358 ₽", "combo-6.png"],
      ["chicken-premier-combo", "Чикен Премьер Комбо", "468 ₽", "combo-7.png"],
    ],
  },
  {
    id: "drinks",
    title: "Напитки",
    items: [
      ["cola", "Добрый Кола", "166 ₽", "242eb.png"],
      ["cola-zero", "Добрый Кола без сахара", "166 ₽", "242eb.png"],
      ["orange", "Добрый Апельсин", "166 ₽", "b958a.png"],
      ["lemon", "Лимон-Лайм", "166 ₽", "27948.png"],
      ["orange-two", "Добрый Апельсин", "166 ₽", "b958a.png"],
      ["lemon-two", "Лимон-Лайм", "166 ₽", "27948.png"],
    ],
  },
  {
    id: "burgers",
    title: "Бургеры и роллы",
    items: [
      ["caesar-roll", "Цезарь ролл", "278 ₽", "67d13.png"],
      ["fish-roll", "Фиш ролл", "421 ₽", "fb9ca.png"],
      ["big-hit", "Биг Хит", "280 ₽", "eaa9e.png"],
      ["big-chicken", "Биг Чикен Бургер", "362 ₽", "9943e.png"],
      ["cheeseburger", "Чизбургер", "100 ₽", "0d3ec.png"],
      ["hamburger", "Гамбургер", "95 ₽", "d9b78.png"],
      ["big-special", "Биг Спешиал", "399 ₽", "67c6b.png"],
      ["chickenburger", "Чикенбургер", "97 ₽", "2c7b0.png"],
      ["chicken-premier", "Чикен Премьер", "247 ₽", "d160e.png"],
      ["fishburger", "Фишбургер", "344 ₽", "1c28f.png"],
    ],
  },
  {
    id: "snacks",
    title: "Картофель и снеки",
    items: [
      ["fries", "Картофель Фри", "184 ₽", "ac91d.png"],
      ["wedges", "Картофель по-деревенски", "145 ₽", "59550.png"],
      ["cheese-sticks", "Сырные палочки Моцарелла", "362 ₽", "53779.png"],
      ["double-fries", "Картофель Фри Двойной", "202 ₽", "d85e4.png"],
      ["strips", "Стрипсы", "190 ₽", "1feb6.png"],
      ["shrimps", "Большие Креветки", "394 ₽", "c6593.png"],
    ],
  },
  {
    id: "sauces",
    title: "Соусы",
    items: [
      ["cheese-sauce", "Сырный соус", "49 ₽", "18bf2.png"],
      ["ketchup", "Кетчуп", "41 ₽", "824b6.png"],
      ["mustard", "Горчица", "49 ₽", "1ca0d.png"],
      ["sweet-sour", "Кисло-сладкий", "51 ₽", "f1d9f.png"],
    ],
  },
] as const

type CatalogItem = typeof catalogSections[number]["items"][number]

const catalogPrices = Object.fromEntries(
  catalogSections.flatMap((section) =>
    section.items.map(([id, , price]) => [
      id,
      Number(price.replace(/\D/g, "")),
    ]),
  ),
)

const preloadSources = Array.from(
  new Set([
    ...Object.values(icons),
    ...banners,
    ...Object.values(products),
    ...catalogSections.flatMap((section) =>
      section.items.map(([, , , image]) => `${A}/${image}`),
    ),
    ...[
      "ce98a.png",
      "d6794.png",
      "29db4.png",
      "bd5fb.png",
      "6fa8a.png",
      "8b2f9.png",
      "c6eda.svg",
      "daa68.png",
      "4f32f.svg",
      "ff137.svg",
      "003c8.svg",
      "b0cfc.svg",
      "e7582.svg",
      "d89a3.svg",
      "87ea4.svg",
      "87e6f.svg",
      "efe4d.svg",
      "aa8b6.svg",
      "59108.svg",
    ].map((file) => `${A}/${file}`),
  ]),
)

function NavItem({
  icon,
  label,
  active = false,
  onClick,
  badge,
}: {
  icon: string
  label: string
  active?: boolean
  onClick?: () => void
  badge?: number
}) {
  return (
    <button
      className={`flex min-w-0 flex-1 flex-col items-center justify-center py-1 ${
        active ? "font-semibold text-[#264f36]" : "text-[#adadad]"
      }`}
      onClick={onClick}
      type="button"
    >
      <span className="relative flex h-8 w-8 items-center justify-center">
        <img alt="" src={icon} />
        {!!badge && (
          <span className="absolute -right-1 -top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-[#ee7203] px-1 text-[10px] font-semibold leading-4 text-white">
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </span>
      <span className="text-[12px] leading-[14px]">{label}</span>
    </button>
  )
}

function AddressHeader() {
  return (
    <header className="flex h-14 gap-2">
      <button
        aria-label="Открыть QR-код"
        className="flex w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f9f9f9]"
        type="button"
      >
        <img alt="" className="h-12 w-12" src={icons.qr} />
      </button>
      <button
        className="flex min-w-0 flex-1 items-center rounded-2xl bg-[#f9f9f9] px-4 text-left"
        type="button"
      >
        <span className="min-w-0 flex-1 text-[14px] leading-4">
          <strong className="block font-semibold">В предприятии</strong>
          <span className="block truncate">ул. Новодмитровская, 77с2</span>
        </span>
        <img alt="" className="h-6 w-6" src={icons.chevron} />
      </button>
    </header>
  )
}

function HomeScreen() {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let currentIndex = 0
    const interval = window.setInterval(() => {
      const carousel = carouselRef.current
      if (!carousel) return

      currentIndex = (currentIndex + 1) % banners.length
      const nextCard = carousel.children[
        currentIndex
      ] as HTMLElement | undefined
      if (!nextCard) return

      carousel.scrollTo({
        left: nextCard.offsetLeft - carousel.offsetLeft,
        behavior: "smooth",
      })
    }, 8000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="h-dvh flex-none overflow-y-auto px-4 pb-[92px] pt-4">
      <header className="sticky top-0 z-40 flex h-14 gap-2 bg-white before:absolute before:-left-4 before:-right-4 before:-top-4 before:h-4 before:bg-white before:content-['']">
        <button
          aria-label="Открыть QR-код"
          className="flex w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f9f9f9]"
          type="button"
        >
          <img alt="" className="h-12 w-12" src={icons.qr} />
        </button>
        <button
          className="flex min-w-0 flex-1 items-center rounded-2xl bg-[#f9f9f9] px-4 text-left"
          type="button"
        >
          <span className="min-w-0 flex-1 text-[14px] leading-4">
            <strong className="block font-semibold">В предприятии</strong>
            <span className="block truncate">ул. Новодмитровская, 77с2</span>
          </span>
          <img alt="" className="h-6 w-6" src={icons.chevron} />
        </button>
      </header>

      <div
        className="mt-4 flex snap-x gap-2 overflow-x-auto rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        ref={carouselRef}
      >
        {banners.map((banner, index) => (
          <article
            className="relative aspect-[342/389] w-[calc(100%-16px)] shrink-0 snap-start overflow-hidden rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,.07)]"
            key={banner}
          >
            <img
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              src={banner}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[55%] via-black/30 via-[72%] to-black/60" />
            {index === 0 && (
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[16px] leading-5">
                  Попробуй новкинки этой зимы
                </p>
                <h1 className="mt-1 max-w-[280px] text-[24px] font-semibold leading-7">
                  Закажи у нас в точке или доставку!
                </h1>
              </div>
            )}
          </article>
        ))}
      </div>

      <section className="relative mt-4 h-[244px] overflow-hidden rounded-2xl bg-[#bee5fa]">
        <div className="absolute left-4 top-4 h-[49px] w-[178px]">
          <img
            alt=""
            className="absolute inset-0 h-full w-full"
            src={icons.bigfestLogo}
          />
          <img
            alt="БИГФЕСТ"
            className="absolute inset-x-[9%] bottom-[14%] top-[20%] h-auto w-[83%]"
            src={icons.bigfestWordmark}
          />
        </div>
        <button
          className="absolute right-4 top-[26px] rounded-2xl bg-white/40 px-3 py-2 text-[12px] leading-[14px]"
          type="button"
        >
          Как участвовать?
        </button>

        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
          <button className="relative h-[152px] text-left" type="button">
            <img
              alt=""
              className="absolute left-0 top-0 h-[95px] w-full"
              src={icons.dayCard}
            />
            <span className="absolute left-4 top-2 z-10 text-[10px] leading-[14px] text-[#ee7203]">
              Акция дня
            </span>
            <img
              alt=""
              className="absolute left-[22px] top-0 z-10 h-[94px] w-[94px] object-contain"
              src={icons.chicken}
            />
            <span className="absolute right-[18px] top-[25px] z-20 text-[16px] font-semibold">
              135<small className="text-[10px]">₽</small>
            </span>
            <img
              alt=""
              className="absolute bottom-0 left-0 h-[57px] w-full"
              src={icons.dayFooter}
            />
            <span className="absolute bottom-3 left-4 z-10 w-[105px] text-[12px] leading-[14px]">
              Успей получить до 23:59
            </span>
            <img
              alt=""
              className="absolute bottom-4 right-4 z-10 h-6 w-3"
              src={icons.arrow}
            />
          </button>

          <button className="relative h-[152px] text-left" type="button">
            <img
              alt=""
              className="absolute left-0 top-0 h-[95px] w-full"
              src={icons.secretCard}
            />
            <span className="absolute left-4 top-[20px] z-10 text-[24px] font-semibold leading-7">
              Сюрприз
              <br />
              дня
            </span>
            <img
              alt=""
              className="absolute bottom-0 left-0 h-[57px] w-full"
              src={icons.secretFooter}
            />
            <span className="absolute bottom-3 left-4 z-10 w-[105px] text-[12px] leading-[14px]">
              Успей получить до 23:59
            </span>
            <img
              alt=""
              className="absolute bottom-4 right-4 z-10 h-6 w-3"
              src={icons.arrow}
            />
          </button>
        </div>
      </section>

      <h1 className="mb-2 mt-4 text-[24px] font-semibold leading-7">Акции</h1>
      <div className="flex flex-col gap-2">
        <OfferCard
          image="ce98a.png"
          napkin
          price="95"
          title="Наггетсы (6 шт.) всего за 95 рублей"
        />
        <OfferCard
          image="d6794.png"
          napkin
          price="75"
          title="Пирожок Вишневый всего за 75 рублей!"
        />
        <OfferCard image="29db4.png" price="80" title="Картофель Фри (мал.)" />
      </div>
    </section>
  )
}

function OfferBottomSheet({
  title,
  price,
  image,
  napkin,
  onClose,
}: {
  title: string
  price: string
  image: string
  napkin: boolean
  onClose: () => void
}) {
  const panelRef = useRef<HTMLElement>(null)
  const swipeStartY = useRef<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)

  return (
    <div className="sheet-overlay fixed inset-0 z-[110] flex items-end justify-center bg-black/40">
      <button
        aria-label="Закрыть акцию"
        className="absolute inset-0"
        onClick={onClose}
        type="button"
      />
      <section
        aria-modal="true"
        className="sheet-panel relative flex h-[calc(100dvh-48px)] w-full max-w-[720px] flex-col overflow-hidden rounded-t-[24px] bg-white"
        onTouchEnd={() => {
          if (swipeStartY.current === null) return
          swipeStartY.current = null
          if (dragOffset > 100) onClose()
          else setDragOffset(0)
        }}
        onTouchMove={(event) => {
          if (swipeStartY.current === null) return
          setDragOffset(
            Math.max(0, event.touches[0].clientY - swipeStartY.current),
          )
        }}
        onTouchStart={(event) => {
          const panelTop = panelRef.current?.getBoundingClientRect().top ?? 0
          const touchY = event.touches[0].clientY
          if (touchY - panelTop <= 180) swipeStartY.current = touchY
        }}
        ref={panelRef}
        role="dialog"
        style={
          dragOffset > 0
            ? {
                transform: `translateY(${dragOffset}px)`,
                transition: "none",
              }
            : undefined
        }
      >
        <div className="flex justify-center pb-3 pt-2">
          <span className="h-[5px] w-[50px] rounded-full bg-[#292929]/10" />
        </div>

        <div className="overflow-y-auto px-4 pb-24">
          <article className="relative flex h-[200px] overflow-hidden rounded-bl-lg rounded-br-2xl rounded-tl-lg rounded-tr-2xl bg-[#f9f9f9]">
            <div className="h-full w-2 shrink-0 rounded-l-2xl bg-[#ee7203]" />
            <div className="flex min-w-0 flex-1 justify-between">
              <div className="flex min-w-0 flex-1 flex-col justify-between py-4 pl-4">
                <div>
                  <h2 className="max-w-[190px] text-[17px] font-semibold leading-5">
                    {title}
                  </h2>
                  <p className="mt-1 text-[13px] leading-4">Ждем тебя!</p>
                </div>
                <p className="text-[12px] leading-[14px] text-[#adadad]">
                  Истекает через 14 дней
                </p>
              </div>
              <div className="relative h-[200px] w-[120px] shrink-0">
                <span className="absolute right-4 top-6 z-20 flex h-[51px] w-[51px] items-center justify-center rounded-full bg-[#fb471f] text-[16px] font-semibold text-white">
                  {price}
                  <small className="text-[12px]">₽</small>
                </span>
                {napkin && (
                  <img
                    alt=""
                    className="absolute left-[-17px] top-[89px] h-[62px] w-[155px] object-contain"
                    src={`${A}/bd5fb.png`}
                  />
                )}
                <img
                  alt=""
                  className={`absolute object-contain ${
                    napkin
                      ? "left-[6px] top-[75px] h-[76px] w-[109px]"
                      : "left-[5px] top-10 h-[120px] w-[120px]"
                  }`}
                  src={`${A}/${image}`}
                />
              </div>
            </div>
            <span className="absolute -left-1.5 top-[94px] h-3 w-3 rounded-full bg-white" />
          </article>

          <p className="mt-2 text-[14px] leading-4 text-[#adadad]">Описание</p>
          <div className="mt-2 rounded-2xl bg-[#f9f9f9] p-4 text-[16px] leading-5">
            Предъяви QR-код в терминале самообслуживания, на кассе или используй
            в мобильном заказе и получи продукт по специальной цене. Акция
            доступна в период действия Основного Меню. Акцией можно
            воспользоваться несколько раз во время срока действия. В одном
            заказе нельзя использовать несколько одинаковых акций. Акция не
            действует в доставке.
          </div>

          <div className="mt-3 flex h-14 items-center gap-2 rounded-2xl bg-[#f9f9f9] p-4">
            <img alt="" src={`${A}/efe4d.svg`} />
            <span className="text-[16px] leading-5">Основной зал, Авто</span>
          </div>
          <button
            className="mt-2 flex h-14 w-full items-center gap-2 rounded-2xl bg-[#f9f9f9] p-4 text-left"
            type="button"
          >
            <img alt="" src={`${A}/aa8b6.svg`} />
            <span className="flex-1 text-[16px] leading-5">
              Полные правила акции
            </span>
            <img alt="" src={`${A}/59108.svg`} />
          </button>
          <p className="mt-3 text-[14px] leading-4 text-[#adadad]">
            Акция доступна в данных предприятиях
          </p>
          <div className="mt-2 flex items-center justify-between rounded-2xl bg-[#f9f9f9] p-4">
            <span className="text-[16px] leading-5">Шереметьевская, 20</span>
            <span className="text-[14px] text-[#ee7203]">1,7 км</span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-white px-4 pb-4 pt-3">
          <button
            className="h-13 w-full rounded-full bg-[#ee7203] px-4 text-[16px] leading-5 text-white"
            onClick={onClose}
            type="button"
          >
            Добавить
          </button>
        </div>
      </section>
    </div>
  )
}

function OfferCard({
  title,
  price,
  image,
  napkin = false,
}: {
  title: string
  price: string
  image: string
  napkin?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <article
        className="relative flex h-[200px] cursor-pointer overflow-hidden rounded-bl-lg rounded-br-2xl rounded-tl-lg rounded-tr-2xl bg-[#f9f9f9]"
        onClick={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") setIsOpen(true)
        }}
        role="button"
        tabIndex={0}
      >
        <div className="h-full w-2 shrink-0 rounded-l-2xl bg-[#ee7203]" />
        <div className="flex min-w-0 flex-1 justify-between">
          <div className="flex min-w-0 flex-1 flex-col justify-between py-4 pl-4">
            <div>
              <h2 className="max-w-[180px] text-[17px] font-bold leading-5">
                {title}
              </h2>
              <p className="mt-1 text-[13px] leading-4">Ждем тебя!</p>
            </div>
            <p className="text-[12px] leading-[14px] text-[#adadad]">
              Истекает через 14 дней
            </p>
          </div>
          <div className="relative h-[200px] w-[120px] shrink-0">
            <span className="absolute right-4 top-6 z-20 flex h-[51px] w-[51px] items-center justify-center rounded-full bg-[#fb471f] text-[16px] font-semibold text-white">
              {price}
              <small className="text-[12px]">₽</small>
            </span>
            {napkin && (
              <img
                alt=""
                className="absolute left-[-17px] top-[89px] h-[62px] w-[155px] object-contain"
                src={`${A}/bd5fb.png`}
              />
            )}
            <img
              alt=""
              className={`absolute object-contain ${
                napkin
                  ? "left-[6px] top-[75px] h-[76px] w-[109px]"
                  : "left-[5px] top-10 h-[120px] w-[120px]"
              }`}
              src={`${A}/${image}`}
            />
          </div>
        </div>
        <span className="absolute -left-1.5 top-[94px] h-3 w-3 rounded-full bg-white" />
      </article>
      {isOpen && (
        <OfferBottomSheet
          image={image}
          napkin={napkin}
          onClose={() => setIsOpen(false)}
          price={price}
          title={title}
        />
      )}
    </>
  )
}

function OffersScreen() {
  return (
    <section className="h-dvh flex-none overflow-y-auto px-4 pb-[92px] pt-4">
      <header className="sticky top-0 z-40 flex h-14 gap-2 bg-white before:absolute before:-left-4 before:-right-4 before:-top-4 before:h-4 before:bg-white before:content-['']">
        <button
          aria-label="Открыть QR-код"
          className="flex w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f9f9f9]"
          type="button"
        >
          <img alt="" className="h-12 w-12" src={icons.qr} />
        </button>
        <button
          className="flex min-w-0 flex-1 items-center rounded-2xl bg-[#f9f9f9] px-4 text-left"
          type="button"
        >
          <span className="min-w-0 flex-1 text-[14px] leading-4">
            <strong className="block font-semibold">В предприятии</strong>
            <span className="block truncate">ул. Новодмитровская, 77с2</span>
          </span>
          <img alt="" className="h-6 w-6" src={icons.chevron} />
        </button>
      </header>

      <div className="mt-2 flex h-14 items-center rounded-[20px] bg-[#f9f9f9] px-4">
        <input
          aria-label="Промокод"
          className="min-w-0 flex-1 bg-transparent text-[16px] leading-5 outline-none placeholder:text-[#adadad]"
          placeholder="Введите промокод"
        />
        <button className="text-[16px] leading-6 text-[#0079ca]" type="button">
          Применить
        </button>
      </div>

      <h1 className="mb-2 mt-2 text-[24px] font-semibold leading-7">Акции</h1>
      <div className="flex flex-col gap-2">
        <OfferCard
          image="ce98a.png"
          napkin
          price="95"
          title="Наггетсы (6 шт.) всего за 95 рублей"
        />
        <OfferCard
          image="d6794.png"
          napkin
          price="75"
          title="Пирожок Вишневый всего за 75 рублей!"
        />
        <OfferCard image="29db4.png" price="80" title="Картофель Фри (мал.)" />
      </div>
    </section>
  )
}

function Chip({
  children,
  active = false,
}: {
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <button
      className={`flex h-8 shrink-0 items-center gap-1 rounded-full px-3 text-[14px] leading-4 ${
        active ? "bg-[#ee7203] text-white" : "bg-[#f4f4f4]"
      }`}
      type="button"
    >
      {children}
    </button>
  )
}

function ProductCard({
  image,
  title,
  price,
  count,
  onAdd,
  onRemove,
}: {
  image: string
  title: React.ReactNode
  price: string
  count: number
  onAdd: () => void
  onRemove: () => void
}) {
  return (
    <article className="relative flex h-[252px] min-w-0 flex-col items-center justify-between rounded-2xl bg-white px-[14px] pb-[14px] shadow-[0_5px_10px_rgba(0,0,0,.07)]">
      <span className="absolute left-[14px] top-[14px] z-10 rounded-full bg-[#e2458e] px-[6px] pb-[2px] pt-[3px] text-[10px] font-semibold leading-[14px] text-white">
        НОВИНКА
      </span>
      <div className="flex flex-col items-center gap-1">
        <img alt="" className="h-[138px] w-[138px] object-cover" src={image} />
        <div className="text-center text-[16px] leading-5">{title}</div>
        {count > 0 && (
          <div className="text-center text-[11px] leading-[15px] text-[#adadad]">
            {price}
          </div>
        )}
      </div>
      {count > 0 ? (
        <div className="flex items-center justify-center gap-[10px]">
          <button
            aria-label="Убрать одну позицию"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f4f4f4]"
            onClick={onRemove}
            type="button"
          >
            <img alt="" src={icons.minus} />
          </button>
          <strong className="min-w-3 text-center text-[16px] leading-5">
            {count}
          </strong>
          <button
            aria-label="Добавить ещё одну позицию"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f4f4f4]"
            onClick={onAdd}
            type="button"
          >
            <img alt="" src={icons.plus} />
          </button>
        </div>
      ) : (
        <div className="flex w-full items-center justify-between">
          <strong className="text-[16px] leading-5">{price}</strong>
          <button
            aria-label="Добавить в корзину"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ee7203]"
            onClick={onAdd}
            type="button"
          >
            <img alt="" src={icons.plusWhite} />
          </button>
        </div>
      )}
    </article>
  )
}

function CatalogCard({
  item,
  count,
  changeQuantity,
  openProduct,
}: {
  item: CatalogItem
  count: number
  changeQuantity: (id: string, delta: number) => void
  openProduct: (item: CatalogItem) => void
}) {
  const [id, title, price, image] = item

  return (
    <article
      className="flex h-[252px] min-w-0 cursor-pointer flex-col items-center justify-between rounded-2xl bg-white px-[14px] pb-[14px] shadow-[0_5px_10px_rgba(0,0,0,.07)]"
      onClick={() => openProduct(item)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          openProduct(item)
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex w-full flex-col items-center">
        <div className="relative h-[138px] w-[138px] overflow-hidden">
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-contain"
            src={`${A}/${image}`}
          />
        </div>
        <p className="min-h-10 text-center text-[16px] leading-5">{title}</p>
        {count > 0 && (
          <p className="text-[11px] leading-[15px] text-[#adadad]">{price}</p>
        )}
      </div>
      {count > 0 ? (
        <div className="flex items-center gap-[10px]">
          <button
            aria-label="Убрать одну позицию"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f4f4f4]"
            onClick={(event) => {
              event.stopPropagation()
              changeQuantity(id, -1)
            }}
            type="button"
          >
            <img alt="" src={icons.minus} />
          </button>
          <strong className="min-w-3 text-center text-[16px] leading-5">
            {count}
          </strong>
          <button
            aria-label="Добавить ещё одну позицию"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f4f4f4]"
            onClick={(event) => {
              event.stopPropagation()
              openProduct(item)
            }}
            type="button"
          >
            <img alt="" src={icons.plus} />
          </button>
        </div>
      ) : (
        <div className="flex w-full items-center justify-between">
          <strong className="text-[16px] leading-5">{price}</strong>
          <button
            aria-label="Добавить в корзину"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ee7203]"
            onClick={(event) => {
              event.stopPropagation()
              openProduct(item)
            }}
            type="button"
          >
            <img alt="" src={icons.plusWhite} />
          </button>
        </div>
      )}
    </article>
  )
}

function ProductBottomSheet({
  item,
  quantity,
  setQuantity,
  onAdd,
  onClose,
}: {
  item: CatalogItem
  quantity: number
  setQuantity: (quantity: number) => void
  onAdd: () => void
  onClose: () => void
}) {
  const [, title, price, image] = item
  const isCombo = item[0].endsWith("-combo")
  const unitPrice = Number(price.replace(/\D/g, ""))
  const panelRef = useRef<HTMLElement>(null)
  const swipeStartY = useRef<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const options = [
    ["6fa8a.png", "Картофель Фри Средний"],
    ["8b2f9.png", "Питьевая вода Черноголовка газированная 0,5"],
    ["c6eda.svg", "Выбери Продукт на выбор"],
    ["daa68.png", "Выбери Соус"],
  ]
  const description = isCombo
    ? "Комбо состоит из основного продукта, картофеля на выбор и напитка на выбор. Цена Комбо может меняться в зависимости от комплектации."
    : item[0].includes("cola") ||
        item[0].includes("orange") ||
        item[0].includes("lemon")
      ? `Освежающий ${title.toLowerCase()} с ярким вкусом — отличный выбор к любимому блюду.`
      : item[0].includes("fries") ||
          item[0].includes("wedges") ||
          item[0].includes("strips") ||
          item[0].includes("sticks") ||
          item[0].includes("shrimps")
        ? `${title} — горячая и хрустящая закуска, которую удобно взять отдельно или дополнить ею заказ.`
        : item[0].includes("sauce") ||
            item[0].includes("ketchup") ||
            item[0].includes("mustard") ||
            item[0].includes("sweet")
          ? `${title} дополнит блюдо насыщенным вкусом и сделает каждый кусочек ещё аппетитнее.`
          : `${title} приготовлен из отборных ингредиентов и подаётся специально для сытного перекуса.`

  return (
    <div className="sheet-overlay fixed inset-0 z-[100] flex items-end justify-center bg-black/40">
      <button
        aria-label="Закрыть"
        className="absolute inset-0"
        onClick={onClose}
        type="button"
      />
      <section
        aria-modal="true"
        className="sheet-panel relative flex h-[calc(100dvh-48px)] w-full max-w-[720px] flex-col overflow-hidden rounded-t-[24px] bg-white"
        onTouchEnd={() => {
          if (swipeStartY.current === null) return
          swipeStartY.current = null
          if (dragOffset > 100) onClose()
          else setDragOffset(0)
        }}
        onTouchMove={(event) => {
          if (swipeStartY.current === null) return
          setDragOffset(
            Math.max(0, event.touches[0].clientY - swipeStartY.current),
          )
        }}
        onTouchStart={(event) => {
          const panelTop = panelRef.current?.getBoundingClientRect().top ?? 0
          const touchY = event.touches[0].clientY
          if (touchY - panelTop <= 180) swipeStartY.current = touchY
        }}
        ref={panelRef}
        role="dialog"
        style={
          dragOffset > 0
            ? {
                transform: `translateY(${dragOffset}px)`,
                transition: "none",
              }
            : undefined
        }
      >
        <div className="flex justify-center pb-3 pt-2">
          <span className="h-[5px] w-[50px] rounded-full bg-[#292929]/10" />
        </div>

        <div className="overflow-y-auto px-4 pb-24">
          <div className="flex justify-center">
            <img
              alt=""
              className="h-[220px] w-[220px] object-contain"
              src={`${A}/${image}`}
            />
          </div>

          <div className="mt-5">
            <h2 className="text-[20px] font-semibold leading-[22px]">
              {title}
            </h2>
            <p className="mt-2 text-[16px] leading-5">{description}</p>
          </div>

          {isCombo && (
            <>
              <p className="mt-5 text-[16px] leading-5 text-[#adadad]">
                Выберите четыре опции
              </p>
              <div className="mt-[10px] flex flex-col gap-2">
                {options.map(([icon, label]) => (
                  <button
                    className="flex min-h-[76px] w-full items-center gap-2 rounded-2xl bg-[#f9f9f9] p-4 text-left"
                    key={label}
                    type="button"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center">
                      <img
                        alt=""
                        className="max-h-11 max-w-11 object-contain"
                        src={`${A}/${icon}`}
                      />
                    </span>
                    <span className="min-w-0 flex-1 text-[16px] leading-5">
                      {label}
                    </span>
                    <img alt="" src={`${A}/4f32f.svg`} />
                  </button>
                ))}
              </div>
            </>
          )}

          <p className="mt-5 text-[16px] leading-5 text-[#adadad]">
            Включает данные продукты
          </p>
          <div className="mt-[10px] flex min-h-[76px] items-center gap-2 rounded-2xl bg-[#f9f9f9] p-4">
            <img
              alt=""
              className="h-11 w-11 object-contain"
              src={`${A}/${image}`}
            />
            <span className="text-[16px] leading-5">
              {isCombo ? title.replace(" Комбо", "") : title}
            </span>
            <img alt="" className="ml-auto" src={`${A}/4f32f.svg`} />
          </div>
          {!isCombo && (
            <button
              className="mt-5 flex h-14 w-full items-center gap-2 rounded-2xl bg-[#f9f9f9] p-4 text-left"
              type="button"
            >
              <img alt="" src={`${A}/b0cfc.svg`} />
              <span className="flex-1 text-[16px] leading-5">О продукте</span>
              <img alt="" src={`${A}/e7582.svg`} />
            </button>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-white px-4 pb-4 pt-3">
          <div className="flex shrink-0 items-center gap-[10px]">
            <button
              aria-label="Уменьшить количество"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e9e9e9]"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              type="button"
            >
              <img alt="" src={`${A}/ff137.svg`} />
            </button>
            <strong className="min-w-4 text-center text-[20px] leading-[22px]">
              {quantity}
            </strong>
            <button
              aria-label="Увеличить количество"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e9e9e9]"
              onClick={() => setQuantity(quantity + 1)}
              type="button"
            >
              <img alt="" src={`${A}/003c8.svg`} />
            </button>
          </div>
          <button
            className="flex h-11 min-w-0 flex-1 items-center justify-between rounded-full bg-[#ee7203] px-4 text-[16px] leading-5 text-white"
            onClick={onAdd}
            type="button"
          >
            <span>Добавить</span>
            <span>{unitPrice * quantity} ₽</span>
          </button>
        </div>
      </section>
    </div>
  )
}

function CartBottomSheet({
  cart,
  total,
  changeQuantity,
  onClose,
}: {
  cart: Record<string, number>
  total: number
  changeQuantity: (id: string, delta: number) => void
  onClose: () => void
}) {
  const panelRef = useRef<HTMLElement>(null)
  const swipeStartY = useRef<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const [orderComplete, setOrderComplete] = useState(false)
  const items = catalogSections
    .flatMap((section) => section.items)
    .filter(([id]) => (cart[id] ?? 0) > 0)

  return (
    <div className="sheet-overlay fixed inset-0 z-[110] flex items-end justify-center bg-black/40">
      <button
        aria-label="Закрыть корзину"
        className="absolute inset-0"
        onClick={onClose}
        type="button"
      />
      <section
        aria-modal="true"
        className="sheet-panel relative flex h-[calc(100dvh-48px)] w-full max-w-[720px] flex-col overflow-hidden rounded-t-[24px] bg-white"
        onTouchEnd={() => {
          if (swipeStartY.current === null) return
          swipeStartY.current = null
          if (dragOffset > 100) onClose()
          else setDragOffset(0)
        }}
        onTouchMove={(event) => {
          if (swipeStartY.current === null) return
          setDragOffset(
            Math.max(0, event.touches[0].clientY - swipeStartY.current),
          )
        }}
        onTouchStart={(event) => {
          const panelTop = panelRef.current?.getBoundingClientRect().top ?? 0
          const touchY = event.touches[0].clientY
          if (touchY - panelTop <= 160) swipeStartY.current = touchY
        }}
        ref={panelRef}
        role="dialog"
        style={
          dragOffset > 0
            ? {
                transform: `translateY(${dragOffset}px)`,
                transition: "none",
              }
            : undefined
        }
      >
        <div className="flex justify-center pb-3 pt-2">
          <span className="h-[5px] w-[50px] rounded-full bg-[#292929]/10" />
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto px-4 pb-24">
          {items.map(([id, title, price, image]) => {
            const quantity = cart[id] ?? 0
            const unitPrice = Number(price.replace(/\D/g, ""))
            const isCombo = id.endsWith("-combo")

            return (
              <article
                className="flex min-h-[142px] items-center gap-3 rounded-2xl bg-[#f9f9f9] p-4"
                key={id}
              >
                <img
                  alt=""
                  className="h-[112px] w-[132px] shrink-0 object-contain"
                  src={`${A}/${image}`}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <h2 className="text-[16px] font-semibold leading-5">
                    {title}
                  </h2>
                  <button
                    className="flex items-center gap-1 text-left text-[14px] leading-4"
                    type="button"
                  >
                    <img alt="" src={`${A}/d89a3.svg`} />
                    Изменить ингредиенты
                  </button>
                  {isCombo && (
                    <button
                      className="flex items-center gap-1 text-left text-[14px] leading-4"
                      type="button"
                    >
                      <img alt="" src={`${A}/87ea4.svg`} />
                      Собрать комбо
                    </button>
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-[10px]">
                      <button
                        aria-label="Уменьшить количество"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e9e9e9]"
                        onClick={() => changeQuantity(id, -1)}
                        type="button"
                      >
                        <img alt="" src={icons.minus} />
                      </button>
                      <strong className="min-w-3 text-center text-[16px] leading-5">
                        {quantity}
                      </strong>
                      <button
                        aria-label="Увеличить количество"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e9e9e9]"
                        onClick={() => changeQuantity(id, 1)}
                        type="button"
                      >
                        <img alt="" src={`${A}/87e6f.svg`} />
                      </button>
                    </div>
                    <strong className="whitespace-nowrap text-[16px] leading-5">
                      {unitPrice * quantity} ₽
                    </strong>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-white px-4 pb-4 pt-3">
          <button
            className="flex h-13 w-full items-center justify-between rounded-full bg-[#ee7203] px-4 text-[16px] leading-5 text-white"
            onClick={() => setOrderComplete(true)}
            type="button"
          >
            <span>Оформить заказ</span>
            <span>{total} ₽</span>
          </button>
        </div>
        {orderComplete && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-t-[24px] bg-white px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#264f36]">
              <span className="h-6 w-10 -rotate-45 border-b-[5px] border-l-[5px] border-white" />
            </div>
            <h2 className="mt-6 text-[24px] font-semibold leading-7">
              Заказ оформлен
            </h2>
            <p className="mt-2 max-w-[280px] text-[16px] leading-5 text-[#777]">
              Спасибо! Мы уже начали готовить ваш заказ.
            </p>
            <button
              className="mt-8 h-11 min-w-[180px] rounded-full bg-[#ee7203] px-6 text-[16px] text-white"
              onClick={onClose}
              type="button"
            >
              Готово
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

function MenuScreen({
  cart,
  changeQuantity,
}: {
  cart: Record<string, number>
  changeQuantity: (id: string, delta: number) => void
}) {
  const scrollRef = useRef<HTMLElement>(null)
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [activeSection, setActiveSection] = useState("combo")
  const [selectedProduct, setSelectedProduct] = useState<CatalogItem | null>(
    null,
  )
  const [productQuantity, setProductQuantity] = useState(1)

  const openProduct = (item: CatalogItem) => {
    setSelectedProduct(item)
    setProductQuantity(Math.max(1, cart[item[0]] ?? 1))
  }

  const addProduct = () => {
    if (!selectedProduct) return
    const id = selectedProduct[0]
    changeQuantity(id, productQuantity - (cart[id] ?? 0))
    setSelectedProduct(null)
  }

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { root, rootMargin: "-105px 0px -72% 0px", threshold: 0 },
    )

    catalogSections.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const chip = chipRefs.current[activeSection]
    const chipList = chip?.parentElement
    if (!chip || !chipList) return

    chipList.scrollTo({
      left: chip.offsetLeft - (chipList.clientWidth - chip.clientWidth) / 2,
      behavior: "smooth",
    })
  }, [activeSection])

  return (
    <section
      className="h-dvh flex-none overflow-y-auto px-4 pb-[92px] pt-4"
      ref={scrollRef}
    >
      <header className="sticky top-0 z-40 flex h-14 gap-2 bg-white before:absolute before:-left-4 before:-right-4 before:-top-4 before:h-4 before:bg-white before:content-['']">
        <button
          aria-label="Открыть QR-код"
          className="flex w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f9f9f9]"
          type="button"
        >
          <img alt="" className="h-12 w-12" src={icons.qr} />
        </button>
        <button
          className="flex min-w-0 flex-1 items-center rounded-2xl bg-[#f9f9f9] px-4 text-left"
          type="button"
        >
          <span className="min-w-0 flex-1 text-[14px] leading-4">
            <strong className="block font-semibold">В предприятии</strong>
            <span className="block truncate">ул. Новодмитровская, 77с2</span>
          </span>
          <img alt="" className="h-6 w-6" src={icons.chevron} />
        </button>
      </header>
      <div className="sticky top-14 z-30 -mx-4 mt-3 bg-white px-4 py-2">
        <div className="flex gap-[6px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {catalogSections.map(({ id, title }) => (
            <button
              className={`h-8 shrink-0 rounded-full px-3 text-[14px] leading-4 ${
                activeSection === id
                  ? "bg-[#ee7203] text-white"
                  : "bg-[#f4f4f4] text-[#292929]"
              }`}
              key={id}
              onClick={() => {
                const container = scrollRef.current
                const target = document.getElementById(id)
                if (!container || !target) return

                setActiveSection(id)
                container.scrollTo({
                  top:
                    container.scrollTop +
                    target.getBoundingClientRect().top -
                    container.getBoundingClientRect().top -
                    104,
                  behavior: "smooth",
                })
              }}
              ref={(node) => {
                chipRefs.current[id] = node
              }}
              type="button"
            >
              {title}
            </button>
          ))}
        </div>
      </div>
      {catalogSections.map(({ id, title, items }) => (
        <section className="scroll-mt-12 pt-3" id={id} key={id}>
          <h1 className="mb-3 text-[16px] font-semibold leading-5">{title}</h1>
          <div className="grid grid-cols-2 gap-2">
            {items.map((item) => (
              <CatalogCard
                changeQuantity={changeQuantity}
                count={cart[item[0]] ?? 0}
                item={item}
                key={item[0]}
                openProduct={openProduct}
              />
            ))}
          </div>
        </section>
      ))}
      {selectedProduct && (
        <ProductBottomSheet
          item={selectedProduct}
          onAdd={addProduct}
          onClose={() => setSelectedProduct(null)}
          quantity={productQuantity}
          setQuantity={setProductQuantity}
        />
      )}
    </section>
  )
}

export default function App() {
  const [screen, setScreen] = useState<"home" | "offers" | "menu">("home")
  const [cart, setCart] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0,
  )
  const cartTotal = Object.entries(cart).reduce(
    (total, [id, quantity]) => total + (catalogPrices[id] ?? 0) * quantity,
    0,
  )

  const changeQuantity = (id: string, delta: number) => {
    setCart((current) => ({
      ...current,
      [id]: Math.max(0, (current[id] ?? 0) + delta),
    }))
  }

  useEffect(() => {
    if (cartCount === 0) setCartOpen(false)
  }, [cartCount])

  useEffect(() => {
    let active = true
    let completed = 0

    const markComplete = () => {
      completed += 1
      if (!active) return
      setLoadProgress(Math.round((completed / preloadSources.length) * 100))
    }

    const requests = preloadSources.map(
      (source) =>
        new Promise<void>((resolve) => {
          const image = new Image()
          image.onload = () => {
            markComplete()
            resolve()
          }
          image.onerror = () => {
            markComplete()
            resolve()
          }
          image.src = source
        }),
    )

    Promise.all(requests).then(() => {
      if (!active) return
      setLoadProgress(100)
      window.setTimeout(() => active && setIsReady(true), 200)
    })

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="min-h-dvh bg-white text-[#292929]">
      <div className="mx-auto flex min-h-dvh w-full max-w-[720px] flex-col">
        {screen === "home" && <HomeScreen />}
        {screen === "offers" && <OffersScreen />}
        {screen === "menu" && (
          <MenuScreen cart={cart} changeQuantity={changeQuantity} />
        )}

        {cartCount > 0 && (
          <div className="pointer-events-none fixed inset-x-0 bottom-[86px] z-50 mx-auto flex w-full max-w-[720px] justify-end px-4 py-[3px]">
            <button
              className="pointer-events-auto flex h-fit w-fit items-center justify-center gap-x-1.5 gap-y-1 rounded-full bg-[#ff5f00] px-5 py-3 font-semibold leading-4 text-white shadow-[0_0_5.8px_#ff5f00]"
              onClick={() => setCartOpen(true)}
              type="button"
            >
              <img alt="" src={icons.cartChip} />
              <span className="font-['Tasty_Gothic'] text-[18px]">
                {cartTotal} ₽
              </span>
            </button>
          </div>
        )}

        <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto flex h-[76px] w-full max-w-[720px] items-start justify-between rounded-t-2xl bg-white px-4 pt-1 shadow-[0_-2px_3px_rgba(0,0,0,.08)]">
          <NavItem
            active={screen === "home"}
            icon={screen === "home" ? icons.home : icons.homeOff}
            label="Главная"
            onClick={() => setScreen("home")}
          />
          <NavItem
            active={screen === "offers"}
            icon={screen === "offers" ? icons.offersOn : icons.offers}
            label="Акции"
            onClick={() => setScreen("offers")}
          />
          <NavItem
            active={screen === "menu"}
            icon={screen === "menu" ? icons.menuOn : icons.menu}
            label="Меню"
            onClick={() => setScreen("menu")}
          />
          <NavItem icon={icons.profile} label="Профиль" />
        </nav>

        {cartOpen && cartCount > 0 && (
          <CartBottomSheet
            cart={cart}
            changeQuantity={changeQuantity}
            onClose={() => setCartOpen(false)}
            total={cartTotal}
          />
        )}
      </div>
      {!isReady && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#ee7203] px-8 text-white">
          <div className="w-full max-w-[320px]">
            <p className="text-center text-[18px] font-semibold leading-6">
              Загрузка
            </p>
            <p className="mt-3 text-center text-[56px] font-semibold leading-none">
              {loadProgress}%
            </p>
            <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-200 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
