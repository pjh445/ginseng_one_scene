document.addEventListener("DOMContentLoaded", () => {
    const smoothScroll = document.getElementById("smoothScroll");
    const buttons = [...document.querySelectorAll('#position button')];
    let x = 0; // 현재 활성화된 버튼의 인덱스    
    
    let zz = false; //wheel 무력화   
    const ev = ['wheel']

    smoothScroll.addEventListener('wheel', e => { 
        e.preventDefault();  //wheel 무력화
        if( zz ) return;
        zz = true; //wheel 가능해졌으므로 wheel 작동한다.
        setTimeout(()=>{ zz = false; }, 300);

        //스크롤을 내릴때 
        console.log( e.deltaY ); //100 또는 -100   
        if (e.deltaY > 0) {            
            x = Math.min(x + 1 , 3 ); // 3은 버튼의 갯수-1한 값.            
        } 
        //스크롤을 올릴때
        else if (e.deltaY < 0) {    
            x = Math.max(x - 1, 0 ); //index의 시작값은 0            
        }
        
        buttons.forEach( (i, j) => {
            if (j === x) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });
        scene( x );
    });

    /*************/  
    smoothScroll.addEventListener('touchstart', handleTouchStart, false);        
    smoothScroll.addEventListener('touchmove', handleTouchMove, false);

    let xDown = null;                                                        
    let yDown = null;

    function handleTouchStart(evt) {
        const firstTouch = evt.touches[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                

    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        let xUp = evt.touches[0].clientX;                                    
        let yUp = evt.touches[0].clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/* most significant */
            if ( xDiff > 0 ) {
                /* left swipe */ 
                x = Math.min(x + 1 , 3 );                
            } else {
                /* right swipe */
                x = Math.max(x - 1, 0 );                
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* up swipe */ 
                x = Math.min(x + 1 , 3 );
            } else { 
                /* down swipe */
                x = Math.max(x - 1, 0 );
            }                                                                 
        }
        buttons.forEach( (i, j) => {
            if (j === x) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });
        scene( x );

        /* reset values */
        xDown = null;
        yDown = null;                                             
    };

    const scene =  z => {
        const sections = document.querySelectorAll('#smoothScroll>section')[ z ];
        sections.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    buttons.forEach( i  => {
        i.addEventListener('click', e =>{ 
            buttons.forEach( j => {
                j.classList.remove('active');
            });
            e.target.classList.add('active');
            const num = buttons.indexOf( e.target );
            x = num;            
            scene( x );
        });
    });
});//////////////////all end
