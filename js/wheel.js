document.addEventListener("DOMContentLoaded", () => {
    const smoothScroll = document.getElementById("smoothScroll");
    const buttons = [...document.querySelectorAll('#position button')];
    let x = 0; // 현재 활성화된 버튼의 인덱스    
    
    let zz = false; //wheel 무력화    
    smoothScroll.addEventListener('wheel', e => { 

        e.preventDefault();  //wheel 무력화

        //zz 가 true라면 return되겠지만 현재의 zz false이므로 return 안됨.
        if( zz ) return;

        zz = true; //wheel 가능해졌으므로 wheel 작동한다.

        setTimeout(()=>{ zz = false; }, 300);


        //스크롤을 내릴때 
        console.log( e.deltaY ); //100 또는 -100   
        if (e.deltaY > 0) {            
            //x가 3보다 커질수 없다
            x = Math.min(x + 1 , 3 ); // 3은 버튼의 갯수-1한 값.            
        } 
        //스크롤을 올릴때
        else if (e.deltaY < 0) {    
            //x가 0보다 작을 수 없다       
            x = Math.max(x - 1, 0 );//index의 시작값은 0            
        }
        
        buttons.forEach( (i, j) => {
            if (j === x) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });
        scene( x );
      
        /*
        scrollIntoView() 메서드는 특정 요소가 화면에 보이도록 스크롤을 이동시키는 메서드입니다. 이 메서드는 요소의 상위 컨테이너를 스크롤하는 것이 아니라, 요소 자체를 스크롤합니다. 이 메서드를 호출하면 해당 요소가 현재 뷰포트에 보이도록 스크롤됩니다.
        */
    });
    /*************/
    const scene =  z => {
        const sections = document.querySelectorAll('#smoothScroll>section')[ z ];
        sections.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    /*************/
    buttons.forEach( i  => {
        i.addEventListener('click', e =>{ 

            buttons.forEach( j => {
                j.classList.remove('active');
            });
            e.target.classList.add('active');
            const num = buttons.indexOf( e.target );

            //스크롤을 내릴때 
            console.log( e.deltaY ); //100 또는 -100   
            x = num;            
            scene( x );
        });
    });

});//////////////////all end
