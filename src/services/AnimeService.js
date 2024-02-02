
const getDailyAnime = async () => {
  const timeout = 5000
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  const options = {
    method: 'GET',
    signal: controller.signal,
    cache: 'no-store'
  }

  try {
    const res = await fetch(process.env.BASE_FETCH_URL + '/daily', options)
    clearTimeout(timeoutId)

    if (!res.ok) 
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    

    const data = await res.json()
    return data
  } catch (err) {
    console.log({
      type: 'GET_DAILY_ANIME',
      err: err
    })

    return null 
  }
}

const getAllAnime = async () => {
  const timeout = 5000
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  const options = {
    method: 'GET',
    signal: controller.signal,
    cache: 'no-store'
  }

  try {
    const res = await fetch(process.env.BASE_FETCH_URL + '/anime-list', options)
    const data = await res.json()
    clearTimeout(timeoutId)

    if (!res.ok) 
      throw new Error(`Error: ${res.status} ${res.statusText}`);

    const SET_IDS = new Set()

    const formatData = data.map(x=> {
      if (SET_IDS.has(x['idx-id']))
        return null
      SET_IDS.add(x['idx-id'])

      return {
        id: x['idx-id'],
        romanji: x['idx-ro'],
        english: x['idx-en']
      }
    })

    return formatData.filter(x=> x !== null)
  } catch (err) {
    console.log({
      type: 'GET_ALL_ANIMES',
      err: err
    })
    return null
  }
}

const getAnimeById = async (idAnime) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_FETCH_URL+`/anime-info-by-id?id=${idAnime}`)
    const data = await res.json()
  
    return data
  } catch (err) {
    console.log({
      type: 'GET_ANIME_BY_ID',
      err: err
    })
    return null
  }
}

const saveGuess = async (animeId, guessCount, guessType = 'daily', correctAnswer) => {
  const currentDate = new Date()
  const formatDate = currentDate.toISOString().split('T')[0]

  const body = {
    "anime_id": animeId,
    "n_try": guessCount,
    "try_date": formatDate,
    "guess_type": guessType,
    "win": correctAnswer
  }

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_FETCH_URL+'/save-guess',{
                              method: 'POST',
                              body: body
                            }) 
  } catch (err) {
    console.log(err)
    return null
  }
}

export {
  getDailyAnime,
  getAllAnime,
  getAnimeById
}