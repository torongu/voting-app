<template>
  <div id="footer">
    <p>FreeCodeCamp Basejump | <a href="https://github.com/truong996">@ngoctruong</a></p>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({

  })
}
</script>
<style scoped>
#footer {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 64px;
  border-top: 1px solid #868686;
}

#footer a {
  text-decoration: none;
  color: #2a6496;
  cursor: pointer;
}

#footer a:hover {
  text-decoration: underline;
}

#footer p {
  line-height: 64px;
  text-align: center;
  font-size: 16px;
  margin: 0
}
</style>
