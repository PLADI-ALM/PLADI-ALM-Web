export const getImgKey = (imgUrl) => {
    if (imgUrl !== null)
        return imgUrl.split('amazonaws.com/')[1]
    else return null
}