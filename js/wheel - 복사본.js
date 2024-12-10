document.addEventListener("DOMContentLoaded", ()=>{

    const smoothScroll = document.getElementById('smoothScroll');
    const sections = [...document.querySelectorAll('section')];
    const buttons = [...document.querySelectorAll('#position button')];        

        smoothScroll.addEventListener('scroll' , ()=>{
        //const scrollTop = smoothScroll.scrollTop;       
        let x = 0;
        buttons.forEach( ( i, j)=> {
            if( i.classList.contains('active')  == j ) {                
                x = j;              
            }            
        });
        x++;
        console.log(x);

        buttons.forEach( i => {           
            i.classList.remove('active');            
        });
        
        buttons[x].classList.add('active');
        
    });

});////////////////////all end