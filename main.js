HTMLElement.prototype.getNodesByText = function (text) {
  const expr = `.//*[text()[contains(
    translate(.,
      'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
      'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя'
    ),
    '${text.toLowerCase()}'
  )]]`;    /**/
  const nodeSet = document.evaluate(expr, this, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null);
  return Array.from({ length: nodeSet.snapshotLength },
    (v, i) => nodeSet.snapshotItem(i)
  );
};

// код решения начинается здесь
const allCards  = document.querySelectorAll('.card'),
      container = document.querySelector('.container');
document.getElementById('search').addEventListener('input', evt => {
  allCards.forEach(card => card.classList.remove('search-result'));      // убираем класс, добавленный при предыдущем поиске
  const searchStr = container.dataset.search = evt.target.value.trim();  // заносим поисковую строку в data-атрибут, чтобы магия скрытия карточек в CSS работала
  if (!searchStr.length) return;
  for (const el of container.getNodesByText(searchStr)) {  // в цикле по найденным элементам...
    const card = el.closest('.card');                      // ...находим родительскую карточку элемента...
    if (card) card.classList.add('search-result');         // ...и добавляем ей класс со стилем "видимости"
  }
});
