// Данные приложения «Маршрут»
const TRIP = {
  title: "Лиссабон и океан",
  dates: { start: "2025-09-12", end: "2025-09-18" },
  daysCount: 7,
  route: ["Лиссабон", "Кашкайш", "Синтра", "Эрисейра", "океан", "Лиссабон"],
  budgetTotal: 180000
};

const PACE_CONFIG = {
  calm: {
    label: "Спокойно",
    hint: "Больше времени на отдых и неспешные прогулки.",
    costMultiplier: 0.9,
    forecastDelta: -10000
  },
  busy: {
    label: "Насыщенно",
    hint: "Максимум впечатлений: экскурсии и активности каждый день.",
    costMultiplier: 1.15,
    forecastDelta: 15000
  }
};

// Отдельные события для режимов "Спокойно" и "Насыщенно"
const DAYS_BY_PACE = {
  calm: [
    {
      id: 0,
      dayNum: 1,
      city: "Лиссабон",
      dateLabel: "12 сентября",
      events: [
        { id: "d0-c1", time: "10:00", title: "Прилёт в Лиссабон", category: "перелёт", cost: 22500, bookingRef: "b-flight" },
        { id: "d0-c2", time: "15:00", title: "Заселение в отель", category: "размещение", cost: 18000, bookingRef: "b-hotel" },
        { id: "d0-c3", time: "18:00", title: "Спокойная прогулка по району", category: "другое", cost: 0, bookingRef: null }
      ]
    },
    {
      id: 1,
      dayNum: 2,
      city: "Кашкайш",
      dateLabel: "13 сентября",
      events: [
        { id: "d1-c1", time: "11:00", title: "Переезд в Кашкайш", category: "транспорт", cost: 2250, bookingRef: null },
        { id: "d1-c2", time: "14:00", title: "Отдых на пляже", category: "другое", cost: 0, bookingRef: null },
        { id: "d1-c3", time: "17:00", title: "Лёгкий ужин", category: "питание", cost: 3150, bookingRef: null }
      ]
    },
    {
      id: 2,
      dayNum: 3,
      city: "Синтра",
      dateLabel: "14 сентября",
      events: [
        { id: "d2-c1", time: "12:00", title: "Неспешная прогулка по Синтре", category: "другое", cost: 0, bookingRef: null },
        { id: "d2-c2", time: "15:00", title: "Чай в кафе", category: "питание", cost: 900, bookingRef: null }
      ]
    },
    {
      id: 3,
      dayNum: 4,
      city: "Эрисейра",
      dateLabel: "15 сентября",
      events: [
        { id: "d3-c1", time: "11:00", title: "Поездка в Эрисейру", category: "транспорт", cost: 1080, bookingRef: "b-train" },
        { id: "d3-c2", time: "16:00", title: "Отдых у океана", category: "другое", cost: 0, bookingRef: null }
      ]
    },
    {
      id: 4,
      dayNum: 5,
      city: "океан",
      dateLabel: "16 сентября",
      events: [
        { id: "d4-c1", time: "10:00", title: "Спокойная прогулка у берега", category: "другое", cost: 0, bookingRef: null },
        { id: "d4-c2", time: "15:00", title: "Пикник", category: "питание", cost: 1350, bookingRef: null }
      ]
    },
    {
      id: 5,
      dayNum: 6,
      city: "Лиссабон",
      dateLabel: "17 сентября",
      events: [
        { id: "d5-c1", time: "12:00", title: "Свободное время", category: "другое", cost: 0, bookingRef: null },
        { id: "d5-c2", time: "18:00", title: "Прощальный ужин", category: "питание", cost: 3600, bookingRef: null }
      ]
    },
    {
      id: 6,
      dayNum: 7,
      city: "Лиссабон",
      dateLabel: "18 сентября",
      events: [
        { id: "d6-c1", time: "09:00", title: "Завтрак в отеле", category: "питание", cost: 0, bookingRef: "b-hotel" },
        { id: "d6-c2", time: "12:00", title: "Проверка из отеля", category: "размещение", cost: 0, bookingRef: "b-hotel" },
        { id: "d6-c3", time: "15:00", title: "Вылет домой", category: "перелёт", cost: 0, bookingRef: "b-flight" }
      ]
    }
  ],
  busy: [
    {
      id: 0,
      dayNum: 1,
      city: "Лиссабон",
      dateLabel: "12 сентября",
      events: [
        { id: "d0-b1", time: "10:00", title: "Прилёт в Лиссабон", category: "перелёт", cost: 28750, bookingRef: "b-flight" },
        { id: "d0-b2", time: "14:00", title: "Заселение в отель", category: "размещение", cost: 23000, bookingRef: "b-hotel" },
        { id: "d0-b3", time: "16:00", title: "Обзорная экскурсия по городу", category: "экскурсия", cost: 5750, bookingRef: null },
        { id: "d0-b4", time: "19:00", title: "Ужин с фадо", category: "питание", cost: 4600, bookingRef: null }
      ]
    },
    {
      id: 1,
      dayNum: 2,
      city: "Кашкайш",
      dateLabel: "13 сентября",
      events: [
        { id: "d1-b1", time: "09:00", title: "Переезд в Кашкайш", category: "транспорт", cost: 2875, bookingRef: null },
        { id: "d1-b2", time: "11:00", title: "Экскурсия по мысу Рока", category: "экскурсия", cost: 3450, bookingRef: null },
        { id: "d1-b3", time: "15:00", title: "Обед с видом на океан", category: "питание", cost: 4025, bookingRef: null },
        { id: "d1-b4", time: "18:00", title: "Прогулка по набережной", category: "другое", cost: 0, bookingRef: null }
      ]
    },
    {
      id: 2,
      dayNum: 3,
      city: "Синтра",
      dateLabel: "14 сентября",
      events: [
        { id: "d2-b1", time: "09:00", title: "Экскурсия в Синтру", category: "экскурсия", cost: 5750, bookingRef: "b-exc" },
        { id: "d2-b2", time: "12:00", title: "Дворец Пена", category: "экскурсия", cost: 1725, bookingRef: null },
        { id: "d2-b3", time: "15:00", title: "Квинта да Регалейра", category: "экскурсия", cost: 1150, bookingRef: null },
        { id: "d2-b4", time: "18:00", title: "Возвращение в отель", category: "транспорт", cost: 1150, bookingRef: null }
      ]
    },
    {
      id: 3,
      dayNum: 4,
      city: "Эрисейра",
      dateLabel: "15 сентября",
      events: [
        { id: "d3-b1", time: "09:00", title: "Поездка в Эрисейру", category: "транспорт", cost: 1380, bookingRef: "b-train" },
        { id: "d3-b2", time: "11:00", title: "Занятие по сёрфингу", category: "другое", cost: 4600, bookingRef: null },
        { id: "d3-b3", time: "15:00", title: "Обед у океана", category: "питание", cost: 2875, bookingRef: null },
        { id: "d3-b4", time: "19:00", title: "Вечерний пикник", category: "питание", cost: 2300, bookingRef: null }
      ]
    },
    {
      id: 4,
      dayNum: 5,
      city: "океан",
      dateLabel: "16 сентября",
      events: [
        { id: "d4-b1", time: "09:00", title: "Прогулка по скалистому берегу", category: "другое", cost: 0, bookingRef: null },
        { id: "d4-b2", time: "12:00", title: "Фотопрогулка", category: "другое", cost: 0, bookingRef: null },
        { id: "d4-b3", time: "15:00", title: "Пикник на природе", category: "питание", cost: 1725, bookingRef: null },
        { id: "d4-b4", time: "18:00", title: "Закат у океана", category: "другое", cost: 0, bookingRef: null }
      ]
    },
    {
      id: 5,
      dayNum: 6,
      city: "Лиссабон",
      dateLabel: "17 сентября",
      events: [
        { id: "d5-b1", time: "11:00", title: "Шопинг в районе Байша", category: "другое", cost: 9200, bookingRef: null },
        { id: "d5-b2", time: "15:00", title: "Экскурсия по монастырю", category: "экскурсия", cost: 2300, bookingRef: null },
        { id: "d5-b3", time: "18:00", title: "Коктейль на террасе", category: "питание", cost: 1725, bookingRef: null },
        { id: "d5-b4", time: "21:00", title: "Прощальный ужин", category: "питание", cost: 4600, bookingRef: null }
      ]
    },
    {
      id: 6,
      dayNum: 7,
      city: "Лиссабон",
      dateLabel: "18 сентября",
      events: [
        { id: "d6-b1", time: "09:00", title: "Завтрак в отеле", category: "питание", cost: 0, bookingRef: "b-hotel" },
        { id: "d6-b2", time: "11:00", title: "Последняя прогулка по городу", category: "другое", cost: 0, bookingRef: null },
        { id: "d6-b3", time: "12:00", title: "Проверка из отеля", category: "размещение", cost: 0, bookingRef: "b-hotel" },
        { id: "d6-b4", time: "15:00", title: "Вылет домой", category: "перелёт", cost: 0, bookingRef: "b-flight" }
      ]
    }
  ]
};

const BOOKINGS_INITIAL = [
  { id: "b-flight", type: "перелёт", title: "Перелёт Москва–Лиссабон", details: "Рейс демонстрационный", status: "не подтверждено" },
  { id: "b-hotel", type: "отель", title: "Отель в Лиссабоне", details: "Центр, демонстрационный", status: "не подтверждено" },
  { id: "b-train", type: "поезд", title: "Поезд/трансфер", details: "Маршрутный трансфер", status: "подтверждено" },
  { id: "b-exc", type: "экскурсия", title: "Экскурсия в Синтру", details: "Групповая", status: "не подтверждено" }
];

const CHECKLIST_INITIAL = {
  documents: [
    { id: "c1", text: "Паспорт", checked: false },
    { id: "c2", text: "Виза/страховка", checked: false },
    { id: "c3", text: "Билеты", checked: false }
  ],
  money: [
    { id: "c4", text: "Карты", checked: false },
    { id: "c5", text: "Наличные евро", checked: false }
  ],
  things: [
    { id: "c6", text: "Одежда", checked: false },
    { id: "c7", text: "Обувь", checked: false },
    { id: "c8", text: "Гигиена", checked: false }
  ],
  health: [
    { id: "c9", text: "Аптечка", checked: false },
    { id: "c10", text: "Средства защиты", checked: false }
  ]
};

const BUDGET_CATEGORIES_BASE = [
  { key: "flight", label: "Перелёт", amount: 25000 },
  { key: "hotel", label: "Отель", amount: 80000 },
  { key: "train", label: "Транспорт", amount: 15000 },
  { key: "excursion", label: "Экскурсии", amount: 20000 },
  { key: "food", label: "Питание", amount: 25000 },
  { key: "other", label: "Прочее", amount: 15000 }
];

let state = {
  pace: "calm",
  activeDayIndex: 0,
  bookings: JSON.parse(JSON.stringify(BOOKINGS_INITIAL)),
  checklist: JSON.parse(JSON.stringify(CHECKLIST_INITIAL)),
  uiState: "success"
};

// Инициализация из localStorage
function initFromStorage() {
  try {
    const savedBookings = localStorage.getItem("routePlanner.bookings");
    if (savedBookings) {
      state.bookings = JSON.parse(savedBookings);
    }
    const savedChecklist = localStorage.getItem("routePlanner.checklist");
    if (savedChecklist) {
      state.checklist = JSON.parse(savedChecklist);
    }
    const savedPace = localStorage.getItem("routePlanner.pace");
    if (savedPace === "calm" || savedPace === "busy") {
      state.pace = savedPace;
    }
  } catch (e) {
    // Игнорируем ошибки парсинга
  }
}

// Сохранение в localStorage
function saveBookings() {
  try {
    localStorage.setItem("routePlanner.bookings", JSON.stringify(state.bookings));
  } catch (e) {}
}

function saveChecklist() {
  try {
    localStorage.setItem("routePlanner.checklist", JSON.stringify(state.checklist));
  } catch (e) {}
}

function savePace() {
  try {
    localStorage.setItem("routePlanner.pace", state.pace);
  } catch (e) {}
}

// Расчет обратного отсчета до ближайшего наступления даты поездки.
// Демонстрационные даты не привязаны к конкретному году, поэтому отсчет
// всегда показывает дни до следующего 12 сентября.
function getNextTripStart() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const nextStart = new Date(TRIP.dates.start + "T00:00:00");
  nextStart.setFullYear(now.getFullYear());
  if (nextStart < now) {
    nextStart.setFullYear(now.getFullYear() + 1);
  }
  return nextStart;
}

function updateCountdown() {
  const countdownEl = document.getElementById("countdownValue");
  if (!countdownEl) return;
  const startDate = getNextTripStart();
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffTime = startDate - now;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > 0) {
    countdownEl.textContent = diffDays + " дн.";
  } else if (diffDays === 0) {
    countdownEl.textContent = "Сегодня";
  } else {
    countdownEl.textContent = "Скоро";
  }
}

// Дата выбранного дня маршрута (без привязки к году).
function getDayDate(dayIndex) {
  const date = new Date(TRIP.dates.start + "T00:00:00");
  date.setDate(date.getDate() + dayIndex);
  return date;
}

// Ближайшее событие выбранного дня и следующая задача чек-листа.
function renderMobileToday() {
  const daysData = DAYS_BY_PACE[state.pace] || [];
  const day = daysData[state.activeDayIndex] || daysData[0] || null;

  const dayEl = document.getElementById("mobileTodayDay");
  const titleEl = document.getElementById("mobileTodayEventTitle");
  const timeEl = document.getElementById("mobileTodayEventTime");
  const placeEl = document.getElementById("mobileTodayEventPlace");
  const statusEl = document.getElementById("mobileTodayEventStatus");
  const taskEl = document.getElementById("mobileTodayTask");
  if (!dayEl || !titleEl || !timeEl || !placeEl || !statusEl || !taskEl) return;

  if (!day) {
    dayEl.textContent = "Маршрут не выбран";
    titleEl.textContent = "Нет событий";
    timeEl.textContent = "—";
    placeEl.textContent = "—";
    statusEl.textContent = "—";
    statusEl.className = "mobile-today__status none";
    taskEl.textContent = "Нет задач";
    return;
  }

  dayEl.textContent = `День ${day.dayNum} • ${day.city} • ${day.dateLabel}`;

  const events = day.events || [];
  let event = events[0] || null;

  // Если выбранный день совпадает с сегодняшним, показываем ближайшее
  // по времени событие, а не первое за день.
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  if (getDayDate(state.activeDayIndex).getTime() === today.getTime()) {
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    event =
      events.find((item) => {
        const [hours, minutes] = item.time.split(":").map(Number);
        return hours * 60 + minutes >= nowMinutes;
      }) ||
      events[events.length - 1] ||
      null;
  }

  if (!event) {
    titleEl.textContent = "В этот день нет событий";
    timeEl.textContent = "—";
    placeEl.textContent = day.city;
    statusEl.textContent = "Свободный день";
    statusEl.className = "mobile-today__status none";
  } else {
    titleEl.textContent = event.title;
    timeEl.textContent = event.time;
    placeEl.textContent = day.city;

    const booking = event.bookingRef
      ? state.bookings.find((item) => item.id === event.bookingRef)
      : null;
    if (booking && booking.status === "подтверждено") {
      statusEl.textContent = "Бронирование подтверждено";
      statusEl.className = "mobile-today__status confirmed";
    } else if (booking) {
      statusEl.textContent = "Бронирование не подтверждено";
      statusEl.className = "mobile-today__status pending";
    } else {
      statusEl.textContent = "Без бронирования";
      statusEl.className = "mobile-today__status none";
    }
  }

  const categories = ["documents", "money", "things", "health"];
  let nextTask = null;
  categories.some((key) => {
    const items = state.checklist[key] || [];
    nextTask = items.find((item) => !item.checked) || null;
    return Boolean(nextTask);
  });
  taskEl.textContent = nextTask ? nextTask.text : "Все задачи выполнены";
}

// Рендер дней
function renderDaysTabs() {
  const tabsContainer = document.getElementById("daysTabs");
  if (!tabsContainer) return;
  tabsContainer.innerHTML = "";
  const daysData = DAYS_BY_PACE[state.pace] || [];
  daysData.forEach((day, idx) => {
    const btn = document.createElement("button");
    btn.className = "day-tab" + (idx === state.activeDayIndex ? " active" : "");
    btn.textContent = `День ${day.dayNum} • ${day.city} • ${day.dateLabel}`;
    btn.type = "button";
    btn.addEventListener("click", () => {
      state.activeDayIndex = idx;
      // Сбрасываем демо-состояние пустого дня при переключении
      const demoEmpty = document.querySelector('.demo-panel .demo-btn[data-demo="empty"]');
      if (demoEmpty) demoEmpty.classList.remove('active');
      renderAll();
    });
    tabsContainer.appendChild(btn);
  });
}

// Получить события для дня
function getEventsForDay(dayIndex) {
  const daysData = DAYS_BY_PACE[state.pace] || [];
  const day = daysData[dayIndex];
  if (!day) return [];
  return day.events;
}

// Рендер событий
function renderEvents() {
  const daysData = DAYS_BY_PACE[state.pace] || [];
  const day = daysData[state.activeDayIndex];
  const dayCityEl = document.getElementById("dayCity");
  const dayDateEl = document.getElementById("dayDate");
  const eventsListEl = document.getElementById("eventsList");
  const eventsEmptyEl = document.getElementById("eventsEmpty");
  
  if (dayCityEl && day) dayCityEl.textContent = day.city;
  if (dayDateEl && day) dayDateEl.textContent = day.dateLabel;
  
  // Обработка состояний
  const routeLoading = document.getElementById("routeLoading");
  const routeError = document.getElementById("routeError");
  const routeEmpty = document.getElementById("routeEmpty");
  const routeContent = document.getElementById("routeContent");
  
  if (routeLoading) routeLoading.style.display = "none";
  if (routeError) routeError.style.display = "none";
  if (routeEmpty) routeEmpty.style.display = "none";
  if (routeContent) routeContent.style.display = "block";
  
  if (state.uiState === "loading") {
    if (routeLoading) routeLoading.style.display = "flex";
    if (routeContent) routeContent.style.display = "none";
    return;
  }
  
  if (state.uiState === "error") {
    if (routeError) routeError.style.display = "flex";
    if (routeContent) routeContent.style.display = "none";
    return;
  }
  
  if (state.uiState === "empty") {
    if (routeEmpty) routeEmpty.style.display = "flex";
    if (routeContent) routeContent.style.display = "none";
    return;
  }
  
  // success состояние
  if (!day) {
    if (eventsEmptyEl) eventsEmptyEl.style.display = "block";
    if (eventsListEl) eventsListEl.innerHTML = "";
    if (eventsListEl) eventsListEl.style.display = "none";
    return;
  }
  
  const events = getEventsForDay(state.activeDayIndex);
  if (eventsListEl) eventsListEl.innerHTML = "";
  
  if (events.length === 0) {
    if (eventsEmptyEl) eventsEmptyEl.style.display = "block";
    if (eventsListEl) eventsListEl.style.display = "none";
    return;
  }
  
  if (eventsEmptyEl) eventsEmptyEl.style.display = "none";
  if (eventsListEl) eventsListEl.style.display = "flex";
  
  events.forEach((ev) => {
    const card = document.createElement("div");
    card.className = "event-card";
    
    let statusClass = "none";
    let statusText = "—";
    if (ev.bookingRef) {
      const booking = state.bookings.find((b) => b.id === ev.bookingRef);
      if (booking) {
        if (booking.status === "подтверждено") {
          statusClass = "confirmed";
          statusText = "подтверждено";
        } else {
          statusClass = "pending";
          statusText = "не подтверждено";
        }
      }
    }
    
    card.innerHTML = `
      <div class="event-time">${ev.time}</div>
      <div class="event-info">
        <div class="event-title">${escapeHtml(ev.title)}</div>
        <div class="event-meta">
          <span class="event-category">${escapeHtml(ev.category)}</span>
        </div>
      </div>
      <div class="event-cost">${ev.cost > 0 ? ev.cost.toLocaleString("ru-RU") + " ₽" : "0 ₽"}</div>
      <div class="event-status ${statusClass}">${statusText}</div>
    `;
    if (eventsListEl) eventsListEl.appendChild(card);
  });
}

// Рендер темпа
function renderPace() {
  const paceBtns = document.querySelectorAll(".pace-btn");
  paceBtns.forEach((btn) => {
    if (btn.dataset.pace === state.pace) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  
  const paceCfg = PACE_CONFIG[state.pace];
  const hintEl = document.getElementById("paceHint");
  if (hintEl) hintEl.textContent = paceCfg.hint;
  
  // Расчет стоимости дня
  const events = getEventsForDay(state.activeDayIndex);
  let dayCost = 0;
  events.forEach((ev) => {
    dayCost += ev.cost;
  });
  const dayCostEl = document.getElementById("dayCost");
  if (dayCostEl) dayCostEl.textContent = dayCost.toLocaleString("ru-RU");
  
  // Расчет прогноза бюджета
  let totalForecast = 0;
  const daysData = DAYS_BY_PACE[state.pace] || [];
  daysData.forEach((day) => {
    day.events.forEach((ev) => {
      totalForecast += ev.cost;
    });
  });
  totalForecast += paceCfg.forecastDelta;
  if (totalForecast < 0) totalForecast = 0;
  const forecastEl = document.getElementById("forecastExpenses");
  if (forecastEl) forecastEl.textContent = totalForecast.toLocaleString("ru-RU");
}

// Рендер бюджета
function renderBudget() {
  const paceCfg = PACE_CONFIG[state.pace];
  let plannedSum = 0;
  const categories = [];
  BUDGET_CATEGORIES_BASE.forEach((cat) => {
    let amount = Math.round(cat.amount * paceCfg.costMultiplier);
    plannedSum += amount;
    categories.push({ ...cat, amount });
  });
  
  const plannedEl = document.getElementById("plannedSum");
  const remainingEl = document.getElementById("remainingSum");
  if (plannedEl) plannedEl.textContent = plannedSum.toLocaleString("ru-RU") + " ₽";
  const remaining = TRIP.budgetTotal - plannedSum;
  if (remainingEl) remainingEl.textContent = remaining.toLocaleString("ru-RU") + " ₽";
  
  const progress = Math.min(100, Math.max(0, (plannedSum / TRIP.budgetTotal) * 100));
  const progressFill = document.getElementById("budgetProgressFill");
  const progressLabel = document.getElementById("budgetProgressLabel");
  if (progressFill) progressFill.style.width = progress + "%";
  if (progressLabel) progressLabel.textContent = Math.round(progress) + "%";
  
  const categoriesList = document.getElementById("budgetCategoriesList");
  if (categoriesList) {
    categoriesList.innerHTML = "";
    categories.forEach((cat) => {
      const item = document.createElement("div");
      item.className = "budget-category";
      item.innerHTML = `
        <span class="budget-category__name">${escapeHtml(cat.label)}</span>
        <span class="budget-category__amount">${cat.amount.toLocaleString("ru-RU")} ₽</span>
      `;
      categoriesList.appendChild(item);
    });
  }
}

// Рендер бронирований
function renderBookings() {
  const bookingsList = document.getElementById("bookingsList");
  if (!bookingsList) return;
  bookingsList.innerHTML = "";
  state.bookings.forEach((booking) => {
    const card = document.createElement("div");
    card.className = "booking-card" + (booking.status === "подтверждено" ? " confirmed" : "");
    
    card.innerHTML = `
      <div class="booking-card__header">
        <div class="booking-card__title">${escapeHtml(booking.title)}</div>
        <span class="booking-card__type">${escapeHtml(booking.type)}</span>
      </div>
      <div class="booking-card__details">${escapeHtml(booking.details)}</div>
      <div class="booking-card__status ${booking.status === "подтверждено" ? "confirmed" : "pending"}">
        Статус: ${booking.status}
      </div>
      ${booking.status === "не подтверждено" ? `<button class="booking-card__confirm" data-booking-id="${booking.id}" type="button">Подтвердить</button>` : ""}
    `;
    bookingsList.appendChild(card);
  });
  
  bookingsList.querySelectorAll(".booking-card__confirm").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.bookingId;
      const booking = state.bookings.find((b) => b.id === id);
      if (booking && booking.status === "не подтверждено") {
        booking.status = "подтверждено";
        saveBookings();
        renderAll();
        showToast("Бронирование подтверждено");
      }
    });
  });
}

// Рендер чек-листа
function renderChecklist() {
  const container = document.getElementById("checklistContainer");
  if (!container) return;
  container.innerHTML = "";
  
  const categories = [
    { key: "documents", title: "Документы" },
    { key: "money", title: "Деньги" },
    { key: "things", title: "Вещи" },
    { key: "health", title: "Здоровье" }
  ];
  
  categories.forEach((cat) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "checklist__category";
    
    const titleDiv = document.createElement("div");
    titleDiv.className = "checklist__category-title";
    titleDiv.textContent = cat.title;
    categoryDiv.appendChild(titleDiv);
    
    const itemsDiv = document.createElement("div");
    itemsDiv.className = "checklist__items";
    
    if (state.checklist[cat.key]) {
      state.checklist[cat.key].forEach((item) => {
        const itemLabel = document.createElement("label");
        itemLabel.className = "checklist__item";
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checklist__checkbox";
        checkbox.checked = item.checked;
        checkbox.dataset.category = cat.key;
        checkbox.dataset.itemId = item.id;
        checkbox.addEventListener("change", () => {
          const category = checkbox.dataset.category;
          const itemId = checkbox.dataset.itemId;
          const foundItem = state.checklist[category].find((i) => i.id === itemId);
          if (foundItem) {
            foundItem.checked = checkbox.checked;
            saveChecklist();
            renderChecklist();
            renderMobileToday();
          }
        });
        
        const textSpan = document.createElement("span");
        textSpan.className = "checklist__text";
        textSpan.textContent = item.text;
        
        itemLabel.appendChild(checkbox);
        itemLabel.appendChild(textSpan);
        itemsDiv.appendChild(itemLabel);
      });
    }
    
    categoryDiv.appendChild(itemsDiv);
    container.appendChild(categoryDiv);
  });
  
  // Прогресс чек-листа
  renderChecklistProgress();
}

function renderChecklistProgress() {
  const progressText = document.getElementById("checklistProgressText");
  const progressFill = document.getElementById("checklistProgressFill");
  if (!progressText || !progressFill) return;
  
  let total = 0;
  let checked = 0;
  Object.values(state.checklist).forEach((categoryItems) => {
    if (Array.isArray(categoryItems)) {
      categoryItems.forEach((item) => {
        total++;
        if (item.checked) checked++;
      });
    }
  });
  
  progressText.textContent = checked + "/" + total;
  const percent = total === 0 ? 0 : (checked / total) * 100;
  progressFill.style.width = percent + "%";
}

// Показ уведомления
function showToast(message) {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Нижняя навигация мобильного режима.
function setupBottomNav() {
  const targets = {
    today: "mobileToday",
    route: "route-days",
    budget: "budget",
    prepare: "checklist"
  };

  document.querySelectorAll(".bottom-nav__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = targets[btn.dataset.nav];
      if (!targetId) return;

      document.querySelectorAll(".bottom-nav__btn").forEach((item) => {
        item.classList.toggle("active", item === btn);
      });

      const target = document.getElementById(targetId);
      if (!target) return;
      if (btn.dataset.nav === "today") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// Обработчики событий
function setupEventListeners() {
  // Переключение темпа
  document.querySelectorAll(".pace-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.pace = btn.dataset.pace;
      savePace();
      // Сброс активного дня при смене темпа
      state.activeDayIndex = 0;
      renderAll();
    });
  });
  
  // Кнопка сброса
  const resetBtn = document.getElementById("resetDataBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      state.bookings = JSON.parse(JSON.stringify(BOOKINGS_INITIAL));
      state.checklist = JSON.parse(JSON.stringify(CHECKLIST_INITIAL));
      state.pace = "calm";
      state.activeDayIndex = 0;
      state.uiState = "success";
      saveBookings();
      saveChecklist();
      savePace();
      renderAll();
      showToast("Учебные данные сброшены");
    });
  }
  
  // Кнопка Повторить в ошибке
  const retryBtn = document.getElementById("routeRetryBtn");
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      state.uiState = "success";
      renderAll();
    });
  }
  
  // Панель демо состояний
  const demoPanel = document.getElementById("demoPanel");
  const demoPanelHeader = document.getElementById("demoPanelHeader");
  const demoPanelToggle = document.getElementById("demoPanelToggle");
  if (demoPanelHeader) {
    demoPanelHeader.addEventListener("click", () => {
      demoPanel.classList.toggle("collapsed");
      if (demoPanel.classList.contains("collapsed")) {
        if (demoPanelToggle) demoPanelToggle.textContent = "+";
      } else {
        if (demoPanelToggle) demoPanelToggle.textContent = "−";
      }
    });
  }
  
  document.querySelectorAll(".demo-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const demoState = btn.dataset.demo;
      if (demoState === "loading") {
        state.uiState = "loading";
      } else if (demoState === "error") {
        state.uiState = "error";
      } else if (demoState === "empty") {
        state.uiState = "empty";
      } else if (demoState === "success") {
        state.uiState = "success";
      }
      renderAll();
    });
  });
}

// Рендер всего
function renderAll() {
  renderDaysTabs();
  renderEvents();
  renderPace();
  renderBudget();
  renderBookings();
  renderChecklist();
  renderMobileToday();
}

// Инициализация
function init() {
  initFromStorage();
  setupEventListeners();
  setupBottomNav();
  updateCountdown();
  setInterval(updateCountdown, 60000);
  renderAll();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
