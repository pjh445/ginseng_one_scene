document.addEventListener("DOMContentLoaded", () => {
    const smoothScroll = document.getElementById("smoothScroll");
    const buttons = [...document.querySelectorAll('#position button')];
    let x = 0; // 현재 활성화된 버튼의 인덱스

    smoothScroll.addEventListener('wheel', e => {
        // 스크롤을 내릴 때
        if (e.deltaY > 0) {
            // x가 3보다 커질 수 없다
            x = Math.min(x + 1, 3); // 3은 버튼의 개수 - 1한 값.
        }
        // 스크롤을 올릴 때
        else if (e.deltaY < 0) {
            // x가 0보다 작을 수 없다
            x = Math.max(x - 1, 0); // index의 시작값은 0
        }

        buttons.forEach((i, j) => {
            if (j === x) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });
        const sections = document.querySelectorAll('#smoothScroll>section')[x];
        const sectionTop = sections.offsetTop;
        const windowHeight = window.innerHeight;
        const startPosition = sectionTop - windowHeight / 2;
        smoothScroll.scrollTo({ top: startPosition, behavior: 'smooth' });
    });
});////////////////////