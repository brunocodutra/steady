function V(value){
  return new numeric.T(
    [[1, 0, value.mag*Math.cos(value.ang*Math.PI/180)], [0, 1, 0], [0, 0, 1]],
    [[0, 0, value.mag*Math.sin(value.ang*Math.PI/180)], [0, 0, 0], [0, 0, 0]]
  );
}

function Is(value){
  return new numeric.T(
    [[1, 0, 0], [0, 1, value.mag*Math.cos(value.ang*Math.PI/180)], [0, 0, 1]],
    [[0, 0, 0], [0, 0, value.mag*Math.sin(value.ang*Math.PI/180)], [0, 0, 0]]
  );
}

function Z(value){
  return new numeric.T(
    [[1, -value.mag*Math.cos(value.ang*Math.PI/180), 0], [0, 1, 0], [0, 0, 1]],
    [[0, -value.mag*Math.sin(value.ang*Math.PI/180), 0], [0, 0, 0], [0, 0, 0]]
  );
}

function Zs(value){
  if(value.mag != 0)
    return new numeric.T(
      [[1, 0, 0], [-Math.cos(-value.ang*Math.PI/180)/value.mag, 1, 0], [0, 0, 1]],
      [[0, 0, 0], [-Math.sin(-value.ang*Math.PI/180)/value.mag, 0, 0], [0, 0, 0]]
    );
  else
    return new numeric.T(
      [[1, 0, 0], [0, 1E-9, 0], [0, 0, 1]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    );
}

function Xformer(value){
  var n = value.mag;
  if(n == 0)
    n += 1E-9;
  
  return new numeric.T(
    [[1/n, 0, 0], [0, n, 0], [0, 0, 1]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  );
}