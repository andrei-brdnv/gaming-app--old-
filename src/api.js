const base_url = 'https://api.rawg.io/api/'
const API_KEY = '9307925324dd4460b3b0cb9406e1d559'

const getCurrentMonth = () => {
    const month = new Date().getMonth() + 1;

    if (month < 10) {
        return `0${month}`
    } else {
        return month
    }
}

const getCurrentDay = () => {
    const day = new Date().getDate();

    if (day < 10) {
        return `0${day}`
    } else {
        return day
    }
}

const currentYear = new Date().getFullYear()
const currentMonth = getCurrentMonth()
const currentDay = getCurrentDay()
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`

const popular_games = `games?key=${API_KEY}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const upcoming_games = `games?key=${API_KEY}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
const newGames = `games?key=${API_KEY}&dates=${lastYear},${currentDate}&ordering=-released&page_size=10`;

export const popularGamesURL = () => `${base_url}${popular_games}`;
export const upcomingGamesURL = () => `${base_url}${upcoming_games}`;
export const newGamesURL = () => `${base_url}${newGames}`;

export const gameDetailURL = (game_id) => `${base_url}games/${game_id}?key=${API_KEY}`;
export const gameScreenshotURL = (game_id) => `${base_url}games/${game_id}/screenshots?key=${API_KEY}`;
export const searchGameURL = (game_name) => `${base_url}games?key=${API_KEY}&search=${game_name}&page-size=10`;
export const gameMovieURL = (game_id) => `${base_url}games/${game_id}/movies?key=${API_KEY}`;
export const gameSeriesURL = (game_id) => `${base_url}games/${game_id}/game-series?key=${API_KEY}`;