export function printSelfcheck() {
  console.log(`%cOnline-Store - Интернет магазин`, 'font-weight: 700; font-size: 18px');
  console.log(`https://github.com/rolling-scopes-school/tasks/blob/master/tasks/online-store/README.md\n\n`);
  console.log(`%cСамооценка:`, 'font-weight: bold;');
  console.log(`Выполнены все пункты задания.

✔️ +10 | 1. Страница с товарами содержит карточки всех товаров а также фильтры, строку поиска, поле для сортировки. Выполняются требования к вёрстке

✔️ +10 | 2. Карточка товара содержит его изображение, название, количество данного товара на складе, материалы, бренд и т.д., находится ли товар в корзине

✔️ +20 | 3. Добавление товаров в корзину
+10 | кликая по карточке с товаром или по кнопке на нем, товар можно добавлять в корзину или удалять. Карточки добавленных в корзину товаров внешне отличаются от остальных
+10 | на странице отображается количество добавленных в корзину товаров

✔️ +20 | 4. Сортировка
+ сортируются только те товары, которые в данный момент отображаются на странице
+10 | сортировка товаров по названию в возрастающем и убывающем порядке
+10 | сортировка товаров по количеству на складе в возрастающем и убывающем порядке
доп | сортировка товаров по цене в возрастающем и убывающем порядке

✔️ +30 | 5. Фильтры в указанном диапазоне от и до
+10 | фильтры по цене
+10 | фильтры по количеству на складе
+10 | для фильтрации в указанном диапазоне используется range slider с двумя ползунками. При перемещении ползунков отображается их текущее значение, разный цвет слайдера до и после ползунка

✔️ +30 | 6. Фильтры по значению
+5 | фильтры по бренду
+5 | фильтры по типу
+5 | фильтры по материалу
+5 | можно отобразить только популярные товары
+10 | можно отфильтровать товары по нескольким фильтрам одного типа

✔️ +20 | 7. Можно отфильтровать товары по нескольким фильтрам разного типа
Для нескольких фильтров разного типа отображаются только те товары, которые соответствуют всем выбранным фильтрам.
Например, можно отобразить только товары из платины. Или популярные серьги и товары ценой с ценой до 20000 руб.
Если товаров, соответствующих всем выбранным фильтрам нет, на странице выводится уведомление в человекочитаемом формате, например, "Извините, по вашему запросу товаров нет."

✔️ +20 | 8. Сброс фильтров
+10 | есть кнопка для сброса фильтров
Кнопка сбрасывает только фильтры, не влияя на порядок сортировки или товары, добавленные в избранное.
После использования кнопки фильтры остаются работоспособными
+10 | при сбросе фильтров кнопкой сброса, ползунки range slider сдвигаются к краям, значения ползунков возвращаются к первоначальным, range slider закрашивается одним цветом

✔️ +30 | 9. Сохранение настроек в local storage
+10 | выбранные пользователем фильтры, порядок сортировки, добавленные в корзину товара сохраняются при перезагрузке страницы. Есть кнопка сброса настроек, которая очищает local storage и корзину

✔️ +30 | 10. Поиск
+2 | при открытии приложения курсор находится в поле поиска
+2 | автозаполнение поля поиска отключено (нет выпадающего списка с предыдущими запросами)
+2 | есть placeholder
+2 | в поле поиска есть крестик, позволяющий очистить поле поиска
+2 | если нет совпадения последовательности букв в поисковом запросе с названием товара, выводится уведомление в человекочитаемом формате, например "Извините, совпадений не обнаружено"
+10 | при вводе поискового запроса на странице остаются только те товары, в которых есть указанные в поиске буквы в указанном порядке. При этом не обязательно, чтобы буквы были в начале слова. Регистр символов при поиске не учитывается
Поиск ведётся только среди товаров, которые в данный момент отображаются на странице.
+10 | если очистить поле поиска, на странице отображаются товары, соответствующие всем выбранным фильтрам и настройкам сортировки

 доп | Дополнительный функционал на выбор
+ верстка сделана для целого лендинга
`);
  console.log(`%cИтого: 220+/200 => 200`, 'font-weight: bold');
}
