const formworkLanguage = (() => {
  "use strict";
  const messages = {
    "en": {
      "viewer": "Model viewer",
      "references": "References",
      "heading": "Corner kitchen",
      "subtitle": "Sink base with a right-angle bottle pull-out",
      "unitsNote": "Dimensions in millimetres",
      "plan": "Plan",
      "front": "Front",
      "drag": "Drag to orbit",
      "scroll": "Scroll to zoom",
      "pinch": "Pinch to zoom",
      "pick": "Select a panel to inspect",
      "assemblyView": "Assembly view",
      "assembled": "Assembled",
      "exploded": "Exploded",
      "dimensions": "Dimensions",
      "showLabels": "Show labels",
      "thickness": "Worktop thickness",
      "inspector": "Part inspector",
      "partsTab": "Parts",
      "notesTab": "Model notes",
      "designReferences": "Design references",
      "originals": "Original drawings and photos",
      "mm": "mm",
      "cabinet": "Interactive cabinet",
      "renderHelp": "3D cabinet. Drag to orbit, scroll or pinch to zoom, or select a part. Arrow keys rotate.",
      "camera": "Camera view",
      "expand": "Expand model view",
      "axes": "Axis directions",
      "zoomOut": "Zoom out",
      "fit": "Fit model to view",
      "zoomIn": "Zoom in",
      "controls": "Viewing controls",
      "closeRefs": "Close references",
      "title": "Corner kitchen · Formwork",
      "language": "Language",
      "copy": "Copy link",
      "copied": "Link copied",
      "copyPrompt": "Copy this link",
      "exitExpanded": "Exit expanded view",
      "clearPart": "Clear selected part",
      "cleared": "Selection cleared.",
      "assembledHint": "Assembly dimensions are shown in the assembled view.",
      "by": " by ",
      "millimetres": "millimetres",
      "worktops": "Worktops",
      "panels": "Cabinet panels",
      "fronts": "Fronts",
      "rails": "Rails",
      "part1": "Main worktop",
      "part1Desc": "The schedule gives the rectangular blank. The rear-right diagonal is reconstructed from the plan photo.",
      "part2": "Return worktop",
      "part2Desc": "The narrow worktop meets the front edge of the main worktop on the right.",
      "part3": "Outer end panel",
      "part3Desc": "Full-height decorative panel at the left end.",
      "part4": "Sink base bottom",
      "part4Desc": "Shown with four face bores on the separate bottom-panel drawing.",
      "part5": "Pull-out side",
      "part5Desc": "Two side panels run along the depth of the bottle rack. The long exposed face belongs to one of these sides.",
      "part6": "Left sink upright",
      "part6Desc": "Sink cabinet side, position 6 on the assembly drawing.",
      "part7": "Right sink upright",
      "part7Desc": "Sink cabinet side, position 7 on the assembly drawing.",
      "part8": "Blind front panel",
      "part8Desc": "Interpreted as the fixed front of the sink cabinet from the handwritten correction.",
      "part9": "Sink door A",
      "part9Desc": "One of two equal sink cabinet fronts.",
      "part10": "Sink door B",
      "part10Desc": "One of two equal sink cabinet fronts.",
      "part11": "Bottle pull-out front",
      "part11Desc": "The narrow front faces left, toward the sink doors.",
      "part13": "Sink base cross rail",
      "part13Desc": "The overwritten dimension is read provisionally as 868 mm, the clear span between two 16 mm sides.",
      "part14": "Sink top rail",
      "part14Desc": "Two top rails span the sink cabinet between its uprights.",
      "part16": "Pull-out top rail",
      "part16Desc": "Two rails span the pull-out cabinet between its uprights.",
      "part17": "Pull-out bottom",
      "part17Desc": "The 500 mm side runs perpendicular to the depth of the sink base.",
      "scheduleHeading": "From the parts schedule",
      "scheduleNote": "The 15 numbered positions account for 18 pieces. The carcass and fronts use 16 mm laminated chipboard. Both worktop pieces are listed at 38 mm thick.",
      "diagonalHeading": "Angled worktop",
      "diagonalNote": "The main blank measures 1,170 × 570 mm. The plan photo shows the diagonal but gives no endpoints. The model removes a triangle extending approximately 450 mm along the back and 500 mm along the right edge. In plan view, part of the square carcass extends past this cut, as in the reference photo. Its fit against the kitchen needs site dimensions.",
      "placementHeading": "Placement and height",
      "placementNote": "The 580 × 200 mm return meets the main worktop at the front right. The assembled model places the 820 mm end panel on the floor, with a 100 mm leg space and an overall height of 858 mm. Door gaps, leg centres, rail elevation and cabinet offsets are inferred.",
      "revisionsHeading": "Handwritten revisions",
      "revisionsNote": "Position 8 is interpreted as a 720 × 330 mm blind front. Position 13 has an overwritten width, read here as 868 mm. A loose note below the schedule appears to say 714 × 30 mm and has no identified position.",
      "hardwareHeading": "Hardware and finishes",
      "hardwareNote": "The feet are schematic. The handwritten note mentions hinges and a bottle rack. The internal rack, hinges, drilling and sink opening have insufficient geometry to model. The finish colours follow the CAD photo approximately.",
      "finished-modelLabel": "Finished model",
      "finished-modelCaption": "The designer’s CAD view shows the double doors, the projecting bottle pull-out and the full-height left end panel.",
      "parts-scheduleLabel": "Parts schedule",
      "parts-scheduleCaption": "Finished sizes, quantities and position numbers used in the model. The changes to positions 8 and 13 are discussed in Model notes.",
      "plan-photoLabel": "Plan photo",
      "plan-photoCaption": "The diagonal clips the rear-right corner of the main worktop. Its endpoints and the two cabinet offsets have no dimension lines.",
      "assemblyLabel": "Assembly",
      "assemblyCaption": "Numbered positions correspond to the printed parts schedule.",
      "exploded-drawingLabel": "Exploded drawing",
      "exploded-drawingCaption": "The original exploded view shows how the two cabinets and their rails are arranged.",
      "sink-uprightLabel": "Sink upright",
      "sink-uprightCaption": "One 704 × 500 × 16 mm upright with the designer’s drilling callouts.",
      "pull-out-sidesLabel": "Pull-out sides",
      "pull-out-sidesCaption": "Two 704 × 500 × 16 mm bottle pull-out sides.",
      "sink-base-bottomLabel": "Sink base bottom",
      "sink-base-bottomCaption": "One 900 × 500 × 16 mm bottom panel.",
      "hardware-noteLabel": "Hardware note",
      "hardware-noteCaption": "The handwritten hardware note mentions hinges and the bottle pull-out. The photos do not identify the exact rack or mounting geometry."
    },
    "ru": {
      "viewer": "Просмотр модели",
      "references": "Чертежи и фото",
      "heading": "Угловая кухня",
      "subtitle": "Тумба под мойку с бутылочницей под прямым углом",
      "unitsNote": "Размеры в миллиметрах",
      "plan": "План",
      "front": "Вид спереди",
      "drag": "Потяните, чтобы повернуть",
      "scroll": "Колесо мыши — масштаб",
      "pinch": "Масштаб — двумя пальцами",
      "pick": "Выберите деталь, чтобы увидеть размеры",
      "assemblyView": "Вид сборки",
      "assembled": "В сборе",
      "exploded": "По деталям",
      "dimensions": "Размеры",
      "showLabels": "Показать размеры",
      "thickness": "Толщина столешницы",
      "inspector": "Детали конструкции",
      "partsTab": "Детали",
      "notesTab": "Пояснения",
      "designReferences": "Чертежи и фотографии",
      "originals": "Исходные материалы проекта",
      "mm": "мм",
      "cabinet": "Интерактивная модель тумбы",
      "renderHelp": "Трёхмерная модель тумбы. Потяните, чтобы повернуть модель, или используйте клавиши со стрелками. Меняйте масштаб колесом мыши или двумя пальцами. Выберите деталь, чтобы узнать её размеры.",
      "camera": "Ракурс",
      "expand": "Развернуть модель",
      "axes": "Направления осей",
      "zoomOut": "Отдалить",
      "fit": "Показать модель целиком",
      "zoomIn": "Приблизить",
      "controls": "Настройки просмотра",
      "closeRefs": "Закрыть чертежи и фотографии",
      "title": "Угловая кухня · Formwork",
      "language": "Язык",
      "copy": "Скопировать ссылку",
      "copied": "Ссылка скопирована",
      "copyPrompt": "Скопируйте эту ссылку",
      "exitExpanded": "Свернуть модель",
      "clearPart": "Снять выделение",
      "cleared": "Выделение снято.",
      "assembledHint": "Размеры доступны в режиме «В сборе».",
      "by": " на ",
      "millimetres": "мм",
      "worktops": "Столешницы",
      "panels": "Панели корпуса",
      "fronts": "Фасады",
      "rails": "Планки",
      "part1": "Основная столешница",
      "part1Desc": "В спецификации указаны размеры прямоугольной заготовки. Скос заднего правого угла восстановлен по фотографии вида сверху.",
      "part2": "Столешница бутылочницы",
      "part2Desc": "Узкая столешница примыкает к передней кромке основной столешницы справа.",
      "part3": "Боковая фальшпанель",
      "part3Desc": "Декоративная панель во всю высоту тумбы закрывает её левый торец.",
      "part4": "Дно тумбы под мойку",
      "part4Desc": "На отдельном чертеже дна показаны четыре отверстия в пласти детали.",
      "part5": "Стойка бутылочницы",
      "part5Desc": "Две боковины расположены вдоль выдвижной корзины. Снаружи видна длинная сторона одной из них.",
      "part6": "Левая стойка тумбы под мойку",
      "part6Desc": "Боковина тумбы под мойку, позиция 6 на сборочном чертеже.",
      "part7": "Правая стойка тумбы под мойку",
      "part7Desc": "Боковина тумбы под мойку, позиция 7 на сборочном чертеже.",
      "part8": "Фальшпанель тумбы под мойку",
      "part8Desc": "По рукописной правке эта деталь принята за неподвижную фальшпанель тумбы под мойку.",
      "part9": "Фасад тумбы под мойку (А)",
      "part9Desc": "Один из двух одинаковых фасадов тумбы под мойку.",
      "part10": "Фасад тумбы под мойку (Б)",
      "part10Desc": "Один из двух одинаковых фасадов тумбы под мойку.",
      "part11": "Фасад бутылочницы",
      "part11Desc": "Узкий фасад обращён влево, к дверцам тумбы под мойку.",
      "part13": "Поперечная планка тумбы под мойку",
      "part13Desc": "Исправленный от руки размер предварительно прочитан как 868 мм. Это расстояние между двумя боковинами толщиной 16 мм.",
      "part14": "Верхняя планка тумбы под мойку",
      "part14Desc": "Две верхние планки соединяют боковины тумбы под мойку.",
      "part16": "Верхняя планка бутылочницы",
      "part16Desc": "Две верхние планки соединяют боковины бутылочницы.",
      "part17": "Дно бутылочницы",
      "part17Desc": "Сторона длиной 500 мм расположена перпендикулярно направлению глубины тумбы под мойку.",
      "scheduleHeading": "Спецификация деталей",
      "scheduleNote": "В спецификации 15 позиций и 18 деталей. Корпус и фасады выполнены из ЛДСП толщиной 16 мм. Для обеих частей столешницы указана толщина 38 мм.",
      "diagonalHeading": "Скос столешницы",
      "diagonalNote": "Размер основной заготовки — 1 170 × 570 мм. На фотографии сверху виден скос, но его концы не привязаны к размерам. В модели срезан треугольник со сторонами примерно 450 мм по задней кромке и 500 мм по правой. На плане прямоугольный угол корпуса выступает за скос, как и на исходной фотографии. Чтобы проверить прилегание к стене, нужны замеры кухни.",
      "placementHeading": "Расположение и высота",
      "placementNote": "Справа к передней кромке основной столешницы примыкает секция 580 × 200 мм. В модели боковая фальшпанель высотой 820 мм стоит на полу, высота опор составляет 100 мм, общая высота со столешницей — 858 мм. Зазоры между дверцами, положение опор, высота планок и смещения корпусов приняты ориентировочно.",
      "revisionsHeading": "Рукописные правки",
      "revisionsNote": "Позиция 8 показана как глухая фасадная панель 720 × 330 мм. Исправленный размер позиции 13 прочитан как 868 мм. Под таблицей есть пометка, похожая на «714 × 30 мм», без номера позиции.",
      "hardwareHeading": "Фурнитура и отделка",
      "hardwareNote": "Опоры показаны условно. В рукописной записке упомянуты петли и бутылочница. Для моделирования корзины, петель, присадки и выреза под мойку не хватает размеров. Цвета отделки приблизительно соответствуют фотографии исходной модели.",
      "finished-modelLabel": "Модель в сборе",
      "finished-modelCaption": "На изображении из программы проектирования видны две дверцы, выступающая секция бутылочницы и левая боковая фальшпанель во всю высоту.",
      "parts-scheduleLabel": "Спецификация",
      "parts-scheduleCaption": "Размеры готовых деталей, количество и номера позиций взяты из этой таблицы. Правки к позициям 8 и 13 разобраны в разделе «Пояснения».",
      "plan-photoLabel": "Вид сверху",
      "plan-photoCaption": "Задний правый угол основной столешницы срезан. Положение концов скоса и смещения двух корпусов на снимке не указаны.",
      "assemblyLabel": "Сборочный чертёж",
      "assemblyCaption": "Номера позиций соответствуют печатной спецификации деталей.",
      "exploded-drawingLabel": "Схема сборки",
      "exploded-drawingCaption": "На схеме показано взаимное расположение двух корпусов и соединяющих их планок.",
      "sink-uprightLabel": "Боковина тумбы",
      "sink-uprightCaption": "Одна боковина 704 × 500 × 16 мм. На чертеже обозначены отверстия для присадки.",
      "pull-out-sidesLabel": "Боковины бутылочницы",
      "pull-out-sidesCaption": "Две боковины бутылочницы размером 704 × 500 × 16 мм.",
      "sink-base-bottomLabel": "Дно тумбы",
      "sink-base-bottomCaption": "Одна деталь размером 900 × 500 × 16 мм.",
      "hardware-noteLabel": "Записка о фурнитуре",
      "hardware-noteCaption": "В записке упомянуты петли и бутылочница. Точная модель корзины и её монтажные размеры по фотографиям не определяются."
    }
  };

  const links = [...document.querySelectorAll('.languages a')];
  const shareStatus = document.getElementById('share-status');
  let language;
  let noticeTimer;

  function languageFromAddress() {
    const value = new URL(location.href).searchParams.get('lang') || '';
    return value.toLowerCase() === 'ru' ? 'ru' : 'en';
  }

  function languageUrl(code, share = false) {
    const url = new URL(location.href);
    if (url.protocol !== 'file:') {
      url.pathname = url.pathname.replace(/\/index\.html$/i, '/');
    }
    if (share) {
      url.search = '';
      url.hash = '';
    }
    url.searchParams.set('lang', code);
    return url;
  }

  function text(key) {
    return messages[language][key];
  }

  function translatePage() {
    language = languageFromAddress();
    document.documentElement.lang = language;
    const current = languageUrl(language);
    if (current.href !== location.href && location.protocol !== 'file:') {
      history.replaceState(history.state, '', current);
    }
    for (const el of document.querySelectorAll('[data-i18n]')) {
      el.textContent = text(el.dataset.i18n);
    }
    for (const el of document.querySelectorAll('[data-i18n-label]')) {
      el.setAttribute('aria-label', text(el.dataset.i18nLabel));
    }
    for (const el of document.querySelectorAll('[data-i18n-title]')) {
      el.title = text(el.dataset.i18nTitle);
    }
    for (const link of links) {
      link.href = languageUrl(link.hreflang).href;
      if (link.hreflang === language) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
    shareStatus.textContent = '';
    window.dispatchEvent(new Event('formwork-languagechange'));
  }

  for (const link of links) {
    link.addEventListener('click', event => {
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (location.protocol === 'file:') return;
      event.preventDefault();
      if (link.hreflang === language) return;
      history.pushState(null, '', link.href);
      translatePage();
    });
  }
  window.addEventListener('popstate', translatePage);

  document.getElementById('copy-link').addEventListener('click', async () => {
    const url = languageUrl(language, true).href;
    try {
      await navigator.clipboard.writeText(url);
      shareStatus.textContent = text('copied');
      clearTimeout(noticeTimer);
      noticeTimer = setTimeout(() => { shareStatus.textContent = ''; }, 2500);
    } catch {
      window.prompt(text('copyPrompt'), url);
    }
  });

  translatePage();
  return { text };
})();
