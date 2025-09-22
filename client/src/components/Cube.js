import React, {useState} from 'react';

//let f='red';
var r_col="#"+((1<<24)*Math.random()|0).toString(16);
var r_col2="#"+((1<<24)*Math.random()|0).toString(16);
var r_col3="#"+((1<<24)*Math.random()|0).toString(16);

function Cube () {

    const [colors, setColors] = useState(true);

    const handleToggle = () => {
        setColors((current) => !current);
      };
    
      setTimeout(() => {

        function get_random_color() {
        r_col = "#"+((1<<24)*Math.random()|0).toString(16);
        return r_col;
        }
        get_random_color();

        function get_random_color2() {
            r_col2 = "#"+((1<<24)*Math.random()|0).toString(16);
            return r_col2;
            }
            get_random_color2();

            function get_random_color3() {
                r_col3 = "#"+((1<<24)*Math.random()|0).toString(16);
                return r_col3;
                }
                get_random_color3();
    }, 1000);
    
    return(
        <div>
            <div style={{userSelect:'none',fontWeight:'700',lineHeight: '1em', letterSpacing:'-0.2rem', color:`${r_col}`}} onClick={handleToggle}>Selected works</div>
            <div style={{userSelect:'none',fontWeight:'600',lineHeight: '1em', letterSpacing:'-0.2rem'}} onClick={handleToggle}>Selected works</div>
            <div style={{userSelect:'none',fontWeight:'500',lineHeight: '1em', letterSpacing:'-0.2rem', color:`${r_col2}`}} onClick={handleToggle}>Selected works</div>
            <div style={{userSelect:'none',fontWeight:'400',lineHeight: '1em', letterSpacing:'-0.2rem'}} onClick={handleToggle}>Selected works</div>
            <div style={{userSelect:'none',fontWeight:'300',lineHeight: '1em', letterSpacing:'-0.2rem', color:`${r_col3}`}} onClick={handleToggle}>Selected works</div>
        </div>
    )
}

export default Cube;