export const createImageDiv = (imageObject) => {
    const html = `
        <div class="photo-card">
            <a href="${imageObject.largeImageURL}"><img src="${imageObject.webformatURL}" alt="${imageObject.tags}" loading="lazy" /></a>
            <div class="info">
                <div class="info-item">
                    <b>Likes</b>
                    <p>${imageObject.likes}</p>
                </div>
                <div class="info-item">
                    <b>Views</b>
                    <p>${imageObject.views}</p>
                </div>
                <div class="info-item">
                    <b>Comments</b>
                    <p>${imageObject.comments}</p>
                </div>
                <div class="info-item">
                    <b>Downloads</b>
                    <p>${imageObject.downloads}</p>
                </div>
            </div>
        </div>
    `;
    return html;
}