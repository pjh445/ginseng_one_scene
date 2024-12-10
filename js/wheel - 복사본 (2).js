document.addEventListener("DOMContentLoaded", ()=>{

    const smoothScroll = document.getElementById('smoothScroll');
    const sections = [...document.querySelectorAll('section')];
    const buttons = [...document.querySelectorAll('#position button')];        

    smoothScroll.addEventListener('scroll', () => {
        let x = -1; // 활성화된 버튼 인덱스 초기값
        buttons.forEach((button, index) => {
            if (button.classList.contains('active')) {
                x = index; // 현재 활성화된 버튼의 인덱스 저장
            }
            button.classList.remove('active'); // 모든 버튼 비활성화
        });

        // `x`를 다음 인덱스로 증가시키고 범위 제한
        x++;
        if (x >= buttons.length) {
            x = 0; // 마지막 버튼 다음엔 첫 번째 버튼으로 순환
        }

        // 증가된 `x`에 해당하는 버튼 활성화
        buttons[x].classList.add('active');
    });

});////////////////////all end