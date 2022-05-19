
export  function getImagesWithHttps (itemSelected){
    let imageLinkDefault = 'http://books.google.com/books/content?id=jCA_DQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api';
    let res = '';
    if (itemSelected.volumeInfo && itemSelected.volumeInfo.imageLinks && itemSelected.volumeInfo.imageLinks.thumbnail) {
        imageLinkDefault = itemSelected.volumeInfo.imageLinks.thumbnail;
    }
    res = imageLinkDefault.replace(/http/g, "https");

    return res;
}