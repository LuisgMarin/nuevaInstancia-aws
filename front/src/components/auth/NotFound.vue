<template>
    <div id="error_404">
        <div class="noise"></div>
            <div class="overlay"></div>
            <div class="terminal">
            <h1>Error <span class="errorcode">404</span></h1>
            <p class="output">La pagina que esta intentando acceder no esta disponible</p>
            <p class="output">Por favor revise el link para poder seguir en el sistemas.</p>
            <p class="output">Buena suerte.</p>
            </div>
    </div>
</template>

<script>
export default {
name: 'logout',
    methods:{
        salir()
        {
            this.$parent._data.template='not_found'
        }
    },
    mounted:function()
    {
        this.salir();
    }
}
</script>

<style>


html #error_404{
  min-height: 100%;
}

body #error_404{
  box-sizing: border-box;
  height: 100%;
  background-color: #000000;
  background-image: radial-gradient(#11581E, #041607), url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Inconsolata', Helvetica, sans-serif;
  font-size: 1.5rem;
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1ex rgba(51, 255, 51, 1),
      0 0 2px rgba(255, 255, 255, 0.8);
}

#error_404 .noise {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: .02;
}

#error_404 .overlay {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background:
      repeating-linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0) 100%);
  background-size: auto 4px;
  z-index: 1;
}

#error_404 .overlay::before {
  content: "";
  pointer-events: none;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      0deg,
      transparent 0%,
      rgba(32, 128, 32, 0.2) 2%,
      rgba(32, 128, 32, 0.8) 3%,
      rgba(32, 128, 32, 0.2) 3%,
      transparent 100%);
  background-repeat: no-repeat;
  animation: scan 7.5s linear 0s infinite;
}

@keyframes scan {
  0%        { background-position: 0 -100vh; }
  35%, 100% { background-position: 0 100vh; }
}

#error_404 .terminal {
  box-sizing: inherit;
  position: absolute;
  height: 100%;
  width: 1000px;
  max-width: 100%;
  padding: 4rem;
  text-transform: uppercase;
}

#error_404 .output {
  color: rgba(128, 255, 128, 0.8);
  text-shadow:
      0 0 1px rgba(51, 255, 51, 0.4),
      0 0 2px rgba(255, 255, 255, 0.8);
}

#error_404 .output::before {
  content: "> ";
}

#error_404 a {
  color: #fff;
  text-decoration: none;
}

#error_404 a::before {
  content: "[";
}

#error_404 a::after {
  content: "]";
}

#error_404 .errorcode {
  color: white;
}
</style>