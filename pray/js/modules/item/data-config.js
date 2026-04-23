export function getDomReader(el) {
    return {
        imageSrc: el.dataset.img,
        imageAlt: el.dataset.imgAlt,
        title: el.dataset.title,
        description: el.dataset.description
    };
}

export const dataConfig = {
    buttonText: "Thắp hương",
    timeIcon: "bi-clock",
    locationIcon: "bi-geo-alt",
    time: "Giờ mở cửa hàng ngày",
    location: "Không gian linh thiêng, thanh tịnh",
    facebookLink: "https://www.facebook.com/ChuaHaPagoda",
    instagramLink: "https://www.instagram.com/chuahapg/",
    facebookIcon: "bi-facebook",
    instagramIcon: "bi-instagram"
}