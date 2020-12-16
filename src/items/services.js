/**
 * items: [] contains one or more objects:
 * {
      name,         -> string, service name, appears in dropdown and report, required
      hasQuantity,  -> boolean, adds quantity input field and number to report
      hasHours,     -> boolean, adds hours input field and number to report
      defaultCost,  -> number, default cost for this service
    }
 */

const common = {
  name: 'Общие',
  items: [
    {
      name: 'Светильники',
      hasQuantity: true,
      hasHours: true,
      defaultCost: 3,
    },
    {
      name: 'Локейшн скаутинг',
      hasQuantity: true,
      hasHours: true,
    },
    {
      name: 'Блокинг - перестановка, композиция',
      hasQuantity: true,
      hasHours: true,
    },
    {
      name: 'Логистика',
    },
    {
      name: 'Экспедиция',
    },
    {
      name: 'Доп. расходы',
    }
  ]
}

const video = {
  name: 'Видеосъемка',
  items: [
    {
      name: 'Камеры',
      hasQuantity: true,
      hasHours: true,
    },
    {
      name: 'Бэкстейдж',
      hasHours: true,
    },
    {
      name: 'Рации',
      hasQuantity: true,
      hasHours: true,
    },
    {
      name: 'Слайдер',
      hasQuantity: true,
      hasHours: true,
    },
    {
      name: 'Гимбал',
      hasQuantity: true,
      hasHours: true,
    },
    {
      name: 'Репитиция',
      hasHours: true,
    },
    {
      name: 'Оператор',
      hasHours: true,
    },
  ]
}

const audio = {
  name: 'Аудиозапись',
  items: [
    {
      name: 'Петлички',
      hasQuantity: true,
      hasHours: true,
    },
    {
      name: 'Boom mics or other',
      hasQuantity: true,
      hasHours: true,
    },
    {
      name: 'Озвучивание',
      hasHours: true,
    },
    {
      name: 'Звукорежиссер',
      hasHours: true,
    },
    {
      name: 'Чистка звука',
      hasHours: true,
    },
  ]
}

const editing = {
  name: 'Монтаж',
  items: [
    {
      name: 'Титры',
      hasHours: true,
    },
    {
      name: 'Моушн Графикс',
      hasHours: true,
    },
    {
      name: 'Сведение мультикамер',
      hasHours: true,
    },
    {
      name: 'Кеинг',
      hasHours: true,
    },
    {
      name: 'Монтажер',
      hasHours: true,
    },
  ]
}

const drone = {
  name: 'Аэросъемка',
  items: [
    {
      name: 'Пилот',
      hasHours: true,
    },
  ]
}

const stream = {
  name: 'Прямая трансляция',
  items: [
    {
      name: 'Рестрим',
      hasHours: true,
    },
    {
      name: 'Стилизация - титры, рамки',
      hasHours: true,
    },
    {
      name: 'Беспроводной стрим',
      hasHours: true,
    },
    {
      name: 'Тест',
      hasHours: true,
    },
    {
      name: 'Техник',
      hasHours: true,
    },
    {
      name: 'Оператор прямого эфира',
      hasHours: true,
    },
  ]
}

const bridge = {
  name: 'Телемост',
  items: [
    {
      name: 'Количество участников',
      hasHours: true,
    }
  ]
}

const studio = {
  name: 'Студия',
  items: [
    {
      name: 'Аренда студии',
      hasHours: true,
    },
    {
      name: 'Хромакей',
      hasHours: true,
    }
  ]
}

const photo = {
  name: 'Фотосъемка',
  items: [
    {
      name: 'Фотограф',
      hasHours: true,
    }
  ]
}

const services = [common, video, audio, editing, drone, stream, bridge, studio, photo]

export const addNewItemText = '+ Добавить'

export default services
