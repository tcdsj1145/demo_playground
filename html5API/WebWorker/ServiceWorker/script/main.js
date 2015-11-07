var img = document.createElement('img');
var inp = document.getElementById('inp');

var loadFile = function (event) {
  var file = event.target.files[0];
  inp.style.display = 'none';
  showImage(file);
};

var showImage = function (file) {
  img.src = URL.createObjectURL(file);
  document.body.style['background-image'] = 'none';
};

var color = [
  '219,69,53,0.8',
  '240,108,7,0.8',
  '212,202,17,0.8',
  '64,196,43,0.8',
  '19,129,135,0.8',
  '#72,49,176,0.8'
];

var createRainbow = function () {
  var can = document.createElement('canvas'),
      ctx = can.getContext('2d'),
      w = img.width,
      h = img.height,
      l = Math.ceil(h/6),
      i;
  can.width = w;
  can.height = h;
  ctx.drawImage(img,0,0);
  ctx.globalCompositeOperation="darken";
  for (i = 0; i < 6; i++) {
    ctx.fillStyle = 'rgba(' + color[i] + ')';
    ctx.fillRect(0, i * l, w, l);
  }
  document.body.appendChild(can);
};
if(img && inp){
  img.addEventListener('load', createRainbow);
  inp.addEventListener('change', loadFile);
}
