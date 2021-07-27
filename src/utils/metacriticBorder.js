const metacriticBorder = (metacritic) => {
    if (metacritic === null) {
        return "not-active"
    } else if (metacritic > 75) {
        return "green"
    } else if (50 < metacritic <= 75) {
        return "yellow"
    } else {
        return "red"
    }
}

export default metacriticBorder