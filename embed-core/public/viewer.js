var socket = io();

const sources = {}
for (id of ['a','b','c','d']){
    let el = document.createElement('iframe');
    document.body.appendChild(el);
    sources[id] = {
        url:    'https://jonasjohansson.github.io/embed/toolkit/three/',
        left:   true,
        center: false,
        right:  false,
        top:    false,
        index:  0,
        iframe: el,
    };
}

const iframes = document.querySelectorAll('iframe');

var gui = new dat.GUI();
let size = Object.keys(sources).length;

for (let prop in sources){
    const folder = gui.addFolder(prop);
    var source = sources[prop];
    var iframe = source.iframe;
    folder.add(source, 'url').listen().onChange((val)=>{
        iframe.src = val;
    });
    folder.add(source, 'left').listen().onChange((val)=>{
        iframe.classList.toggle('left',val);
    });
    folder.add(source, 'center').listen().onChange((val)=>{
        iframe.classList.toggle('center',val);
    });
    folder.add(source, 'right').listen().onChange((val)=>{
        iframe.classList.toggle('right',val);
    });
    folder.add(source, 'top').listen().onChange((val)=>{
        iframe.classList.toggle('top',val);
    });
    folder.add(source, 'index',0,size,1).listen().onChange((val)=>{
        iframe.style.zIndex = val;
    });
    iframe.src = source.url;
    iframe.classList.toggle('left',source.left);
    iframe.classList.toggle('center',source.center);
    iframe.classList.toggle('right',source.right);
    iframe.classList.toggle('top',source.top);
    iframe.style.zIndex = source.index;
    folder.open();
}

socket.on('load', function (data) {
    load(data);
});

load = (experience) => {
    console.log(gui.__folders.a.__controllers[0].setValue(experience.url));
    document.body.classList.add('loading');
    console.log('Loading',experience.title)
    setTimeout(()=>{
        document.body.classList.remove('loading');
        console.log('Loading complete')
    },1000);
}