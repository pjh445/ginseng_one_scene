document.addEventListener("DOMContentLoaded", () => {
    const smoothScroll = document.getElementById("smoothScroll");
    const buttons = [...document.querySelectorAll('#position button')];
    let x = 0; // 현재 활성화된 버튼의 인덱스    
    
    let zz = false; //wheel 무력화

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
    smoothScroll.addEventListener( 'touchstart', ts );        
    smoothScroll.addEventListener( 'touchmove', tm );
   
    let down = null;

    function ts( e ) {
        const firstTouch = e.touches[0]; //터치시작한순간의 index   
        down = firstTouch.clientY;   
    };

    function tm(e) {
        if (  ! down ) {
            return;
        }
       
        let up = e.touches[0].clientY;
        let amount = down - up;
        
        if ( amount > 0 ) {
            /* up swipe */ 
            x = Math.min(x + 1 , 3 );  //x는 이동할 각 장면의 index번호
        } else { 
            /* down swipe */
            x = Math.max(x - 1, 0 );   //x는 이동할 각 장면의 index번호
        }                                                                 
       
        buttons.forEach( (i, j) => {
            if (j === x) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });
        scene( x );

        /* 리셋 */        
        down = null;                                             
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
