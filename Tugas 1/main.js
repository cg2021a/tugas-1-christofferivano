function main(){
    /**
     * @type {HTMLCanvasElement} canvas
    */
    
    var canvas = document.getElementById("myCanvas");

    /**
     * @type {WebGLRenderingContext} gl
    */
    var gl = canvas.getContext("webgl");
    
    var vertexShaderCode = `
    attribute vec2 vertPosition;
    attribute vec4 vertColor;
    varying vec4 v_Color;
    uniform mat4 object;
    void main(){
        v_Color = vertColor;
      gl_Position = object * vec4(vertPosition, 0.0, 2.0);
    }`;

    var fragmentShaderCode = `
    precision mediump float;
    varying vec4 v_Color;
    void main(){
        gl_FragColor = vec4(0.755, 0, 0, 1.0);
    }`;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderCode)
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.validateProgram(program);
    if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error("ERROR validating program!", gl.getProgramInfoLog(program));
        return;
    }

    var vertices = [],
        vertCount = 2;

    // benda 1
	box = [
		0.5,0,
		0.5,-1,
		-0.5,-1,
		-0.5,0,
		-0.5,-1,
		0,0.25
		]
    vertices = vertices.concat(box);
    vertices = vertices.concat(box);
    for (var i=0.0; i<=360; i+=1) {
      // degrees to radians
      var j = i * Math.PI / 180;
      // X Y Z
        if (i<=180)
        {
            var vert1 = [
              Math.sin(j)*0.5,
              Math.cos(j)*0.5,
              // 0,
            ];
            var vert2 = [
              0,
              0,
              // 0,
            ];
            
        }
        else
        {
            var vert1 = [
                Math.sin(j)*0.5,
                Math.cos(j)*0.5,
                // 0,
              ];
              var vert2 = [
                0,
                0,
                // 0,
              ];
        }
        vertices = vertices.concat(vert1);
        vertices = vertices.concat(vert2);
    }
    for (var i=90; i<=270; i+=1) {
        // degrees to radians
        var j = i * Math.PI / 180 ;
        // X Y Z
          if (i<=180)
          {
              var vert1 = [
                Math.sin(j)*0.5,
                -1 + Math.cos(j)*0.5,
                // 0,
              ];
              var vert2 = [
                0,
                -1,
                // 0,
              ];
              
          }
          else
          {
              var vert1 = [
                   Math.sin(j)*0.5,
                  -1 + Math.cos(j)*0.5,
                  // 0,
                ];
                var vert2 = [
                    0,
                    -1,
                  // 0,
                ];
          }
          vertices = vertices.concat(vert1);
          vertices = vertices.concat(vert2);
      }

    var n = vertices.length / vertCount;

    let color = []

    for (let i = 0; i < n/2 - 3; i++) {
        let r = 1;
        let g = 1;
        let b = 1;
        for (let j = 0; j < 3; j++) {
            color.push(r);
            color.push(g);
            color.push(b);
            // color.push(0.124);
        }
    }

    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer(
        positionAttribLocation, // attribut location
        vertCount, // number of elements per attribute
        gl.FLOAT, // type of elements
        gl.FALSE,
        0, // size of an individual vertex
        0 // offset from the beginning of a single vertex to this attribute
    );
    gl.enableVertexAttribArray(positionAttribLocation);

    var colorBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);

    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
        colorAttribLocation, // attribut location
        vertCount, // number of elements per attribute
        gl.FLOAT, // type of elements
        gl.FALSE,
        0, // size of an individual vertex
        0 // offset from the beginning of a single vertex to this attribute
    );
    gl.enableVertexAttribArray(colorAttribLocation);

    let dy = 0;
    let speed = 0.0091;

    function render()
    {
        gl.clearColor(0, 0, 0, 0.5);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        if(dy >= 0.72 || dy <= -0.6) {
            speed = speed * -1;
        }
         dy += speed;
         let leftObject = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            -0.5, 0.0, 0.0, 1.0
        ]
    
        const object = gl.getUniformLocation(program, "object");
        gl.uniformMatrix4fv(object, false, leftObject);
    
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
         rightObject = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.5, dy, 0.0, 1.0
        ]
    
        gl.uniformMatrix4fv(object, false, rightObject);
    
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

        requestAnimationFrame(render);
    }
    render();
}
