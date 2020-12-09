const common = {
  name: 'Общие',
  items: [
    {
      name: 'Светильники',
      canBeStacked: true,
      defaultCost: 3,
    },
    {
      name: 'Локейшн скаутинг',
      canBeStacked: true
    },
    {
      name: 'Блокинг - перестановка, композиция',
      canBeStacked: true
    },
    {
      name: 'Логистика',
      isCalculatedCost: true,
    },
    {
      name: 'Экспедиция',
      isCalculatedCost: true,
    },
    {
      name: 'Доп. расходы',
      isCalculatedCost: true,
    }
  ]
}

const video = {
  name: 'Видеосъемка',
  items: [
    {
      name: 'Камеры',
      canBeStacked: true
    },
    {
      name: 'Бэкстейдж'
    },
    {
      name: 'Рации',
      canBeStacked: true
    },
    {
      name: 'Слайдер',
      canBeStacked: true
    },
    {
      name: 'Гимбал',
      canBeStacked: true
    },
    {
      name: 'Репитиция'
    },
    {
      name: 'Оператор'
    },
  ]
}

const audio = {
  name: 'Аудиозапись',
  items: [
    {
      name: 'Петлички',
      canBeStacked: true
    },
    {
      name: 'Boom mics or other',
      canBeStacked: true
    },
    {
      name: 'Озвучивание'
    },
    {
      name: 'Звукорежиссер'
    },
    {
      name: 'Чистка звука'
    },
  ]
}

const editing = {
  name: 'Монтаж',
  items: [
    {
      name: 'Титры'
    },
    {
      name: 'Моушн Графикс'
    },
    {
      name: 'Сведение мультикамер'
    },
    {
      name: 'Кеинг'
    },
    {
      name: 'Монтажер'
    },
  ]
}

const drone = {
  name: 'Аэросъемка',
  items: [
    {
      name: 'Пилот'
    },
  ]
}

const stream = {
  name: 'Прямая трансляция',
  items: [
    {
      name: 'Рестрим',
      unit: 'шт'
    },
    {
      name: 'Стилизация - титры, рамки'
    },
    {
      name: 'Беспроводной стрим'
    },
    {
      name: 'Тест'
    },
    {
      name: 'Техник'
    },
    {
      name: 'Оператор прямого эфира'
    },
  ]
}

const bridge = {
  name: 'Телемост',
  items: [
    {
      name: 'Количество участников',
      unit: 'шт',
    }
  ]
}

const studio = {
  name: 'Аренда студии',
  items: [
    {
      name: 'Хромакей'
    }
  ]
}

const photo = {
  name: 'Фотосъемка',
  items: [
    {
      name: 'Фотограф'
    }
  ]
}

const services = [common, video, audio, editing, drone, stream, bridge, studio, photo]

export const defaultUnit = 'ч'
export default services
