
const makeMulti = function (logo) {
    let l = new String(logo)
    l = l.substring(l.indexOf("/*") + 3, l.lastIndexOf("*/"))
    return l
}
const logo = () => {
/*

 ██████╗ ██████╗ ██████╗ ███████╗███████╗██╗  ██╗███████╗███████╗██████╗ 
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝██║  ██║██╔════╝██╔════╝██╔══██╗
██║     ██║   ██║██║  ██║█████╗  ███████╗███████║█████╗  █████╗  ██████╔╝
██║     ██║   ██║██║  ██║██╔══╝  ╚════██║██╔══██║██╔══╝  ██╔══╝  ██╔═══╝ 
╚██████╗╚██████╔╝██████╔╝███████╗███████║██║  ██║███████╗███████╗██║     
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     
                                                                         
*/
    console.log("what")
}

export function printLOGO(){
    let str = makeMulti(logo);
    console.log(`%c${str} %cV1.0 Power by fun`, 'color: #2da44e', 'color: #2da44e;font-size: 0.75rem;font-style: italic;');
    console.log('%c', 'color: #2da44e;font-size: 1rem')
}
