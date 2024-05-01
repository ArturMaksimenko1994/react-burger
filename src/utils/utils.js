// Функция для получения значения куки по имени
export function getCookie(name) {
  // Ищем совпадения в cookie по переданному имени
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  // Если найдены совпадения, декодируем значение и возвращаем его
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Функция для установки куки
export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  // Если указан срок действия и он числовой, вычисляем дату истечения срока
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 20000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  // Кодируем значение куки
  value = encodeURIComponent(value);
  // Формируем строку куки с именем и значением
  let updatedCookie = name + '=' + value;
  // Добавляем опции куки, если они есть
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    // Если значение опции не равно true, добавляем его к строке куки
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

// Функция для удаления куки
export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}
