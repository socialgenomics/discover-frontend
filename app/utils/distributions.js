
export function poisson(expectvalue){

  var n = 0;
  var limit = Math.exp(-expectvalue);
  var x = Math.random();

  while(x > limit){
    n++;
    x *= Math.random();
  }
  return n;
}
