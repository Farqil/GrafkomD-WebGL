function main()
{
  var canvas = document.getElementById("myCanvas");
  var gl = canvas.getContext("webgl");

  var vertices = [
    -0.80, 0.6, -0.68, 0.6, -0.80, -0.6,
    -0.80, -0.6, -0.68, 0.6, -0.68, -0.6,
    -0.80, 0.6, -0.15, 0.6, -0.80, 0.48,
    -0.80, 0.48, -0.15, 0.6, -0.15, 0.48,
    -0.80, 0.06, -0.15, 0.06, -0.80, -0.06,
    -0.80, -0.06, -0.15, 0.06, -0.15, -0.06,
    0.10, 0.6, 0.22, 0.6, 0.10, -0.6,
    0.10, -0.6, 0.22, 0.6, 0.22, -0.6,
    0.68, 0.6, 0.80, 0.6, 0.68, -0.6,
    0.68, -0.6, 0.80, 0.6, 0.80, -0.6,
    0.10, 0.6, 0.22, 0.6, 0.68, -0.6,
    0.22, 0.6, 0.80, -0.6, 0.68, -0.6
  ];

  const vertexShaderCode = `
    attribute vec2 aPosition;
    void main()
    {
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }`;

  const fragmentShaderCode = `
    precision mediump float;
    uniform vec4 uColor;
    void main()
    {
      gl_FragColor = uColor;
    }`;

  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  var aPosition = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  var uColor = gl.getUniformLocation(program, "uColor");

  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.uniform4f(uColor, 1.0, 0.5, 0.0, 1.0);
  gl.drawArrays(gl.TRIANGLES, 0, 18);

  gl.uniform4f(uColor, 0.0, 0.6, 0.9, 1.0);
  gl.drawArrays(gl.TRIANGLES, 18, 18);
}