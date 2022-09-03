module.exports = class CourseDto {
    id
    name
    image
    lessionCount

    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.image = this.getStorageLink(model.image)
        this.lessionCount = model.Lession.length
    }

    getStorageLink(link) {
        const storageUrl = process.env.STORAGE_URL + '/storage/uploads'
        return storageUrl + link
    }
} 