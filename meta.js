const initslider = () =>{

    const imageList = document.querySelector(".slider-wrapper .image-list")
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button")
    const sliderScrollBar = document.querySelector(".container .slider-scrollbar")
    const scrollbarThumb = sliderScrollBar.querySelector(".scrollbar-thumb")
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener("mousedown" , (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft

        const hendleMouseMove = (e) => {
            const deltaX = e.clientX - startX
            const newThumbPosition = thumbPosition + deltaX

            const maxThumbPosition = sliderScrollBar.getBoundingClientRect().width - scrollbarThumb.offsetWidth

            const boundedPosition = Math.max(0 , Math.min(maxThumbPosition , newThumbPosition))
            const scrollPosition = (boundedPosition / maxThumbPosition) *  maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`
            imageList.scrollLeft = scrollPosition;
        } 

        const hendleMouseUp = () => {
            document.removeEventListener("mousemove" , hendleMouseMove)
            document.removeEventListener("mouseup" , hendleMouseUp)
        }

        document.addEventListener("mousemove" , hendleMouseMove)
        document.addEventListener("mouseup" , hendleMouseUp)
    });

//button slide

    slideButtons.forEach(button => {
        button.addEventListener("click" , () =>{
            const direction = button.id === "prev-slide" ? -1 : 1 ;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount , behavior: "smooth"})
        })
    });

    const hendleSlideButton = () =>{
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollBar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }


    imageList.addEventListener("scroll" ,() =>{
        hendleSlideButton()
        updateScrollThumbPosition()
    })
}

window.addEventListener("load", initslider)